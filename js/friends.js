/*
 * friends.js — Connection with Firebase for the friends' group: the progress
 * table and the group chat.
 *
 * What it does:
 *   - Loads the Firebase code (js/vendor/firebase-lite.js) only when needed,
 *     so the rest of the app stays fast and works offline.
 *   - Signs the phone in anonymously (no e-mail, no password). Firebase
 *     remembers the anonymous identity on the phone.
 *   - Uploads this learner's row and downloads the rows of the whole group.
 *   - Sends, lists and deletes chat messages of the group.
 *
 * What a row holds (see the access rules in herramientas/firestore.rules):
 *   nickname, a1 / a2 / b1 (percent of sections completed per level),
 *   todayMinutes + dayId, weekMinutes + weekId (time with the app open),
 *   examPercent + examParts (last mock exam: average and parts done, -1 = none),
 *   streak (days in a row), updatedAt (server time).
 *
 * Where the data lives:
 *   groups/{groupCode}/players/{userId}     one row per learner
 *   groups/{groupCode}/messages/{messageId} chat messages
 * The group code works like a shared key: whoever knows it can join.
 *
 * How to use:
 *   AppFriends.newGroupCode()              -> e.g. "AHOJ-K7QM-3XPD"
 *   AppFriends.normalizeCode(text)         -> cleans a code typed by a person
 *   AppFriends.upload(data)                -> Promise; sends this learner's row
 *   AppFriends.fetchTable(code)            -> Promise of the group's rows
 *   AppFriends.leave(code)                 -> Promise; deletes this learner's row
 *   AppFriends.syncSoon(data, save, force) -> uploads in the background if needed
 *   AppFriends.fetchMessages(code)         -> Promise of the last messages, oldest first
 *   AppFriends.sendMessage(code, nickname, text) -> Promise
 *   AppFriends.deleteMessage(code, id)     -> Promise
 *   AppFriends.weekId(date)                -> ISO week such as "2026-W48"
 *
 * Saved data used (see storage.js): settings.friends.groupCode,
 * progress.friendsSync.pending, plus what AppProgress, AppStudyTime and the
 * exam store.
 *
 * Depends on: js/vendor/firebase-lite.js (loaded on demand); progress.js and
 * study-time.js (only when uploading).
 */

(function () {
  "use strict";

  // ===== Configuration =====

  // Public settings of the Firebase project "po-slovensky". These values are
  // meant to be inside the app (they identify the project, they are not a
  // password); the data is protected by the access rules, and the key only
  // works from the app's own web addresses.
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAkMIvkmRrJD08JQPAAt9QN3vKbYvBzeIQ",
    authDomain: "po-slovensky.firebaseapp.com",
    projectId: "po-slovensky",
    storageBucket: "po-slovensky.firebasestorage.app",
    messagingSenderId: "95755242635",
    appId: "1:95755242635:web:3d43db850dd83c8d1e588e"
  };

  const SDK_URL = "js/vendor/firebase-lite.js";

  // Background uploads (study time ticking) happen at most this often;
  // changes the learner makes on purpose are sent at once ("force").
  const BACKGROUND_UPLOAD_MS = 5 * 60 * 1000;

  const MESSAGES_SHOWN = 50; // last messages loaded in the chat
  const MAX_MESSAGE_LENGTH = 500; // same limit as the access rules

  // Letters and digits that cannot be confused when read aloud (no 0/O, 1/I/L).
  const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

  // ===== State =====

  let connection = null; // Promise of { api, db, uid } once connected
  let uploadInProgress = null; // Promise of the upload running right now, if any
  let lastUploadAt = 0; // time of the last finished upload

  // ===== Loading Firebase and signing in =====

  /** Adds the Firebase script to the page once; resolves when it is ready. */
  function loadSdk() {
    if (window.FirebaseLite) return Promise.resolve(window.FirebaseLite);
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = SDK_URL;
      script.onload = function () { resolve(window.FirebaseLite); };
      script.onerror = function () { reject(new Error("offline")); };
      document.head.append(script);
    });
  }

  /** Connects to Firebase and signs in anonymously (only the first time). */
  function connect() {
    if (connection) return connection;

    connection = loadSdk().then(function (api) {
      const app = api.initializeApp(FIREBASE_CONFIG);
      const auth = api.getAuth(app);
      const db = api.getFirestore(app);

      // Wait until Firebase has checked whether this phone already has an identity.
      return new Promise(function (resolve, reject) {
        const stopListening = api.onAuthStateChanged(auth, function (user) {
          stopListening();
          if (user) { resolve({ api: api, db: db, uid: user.uid }); return; }
          api.signInAnonymously(auth)
            .then(function (result) { resolve({ api: api, db: db, uid: result.user.uid }); })
            .catch(reject);
        });
      });
    });

    // If it fails (no internet), allow a new attempt next time.
    connection.catch(function () { connection = null; });
    return connection;
  }

  // ===== Group codes, days and weeks =====

  /** Creates a random, easy-to-dictate group code: "AHOJ-XXXX-XXXX". */
  function newGroupCode() {
    const random = new Uint32Array(8);
    window.crypto.getRandomValues(random);
    let letters = "";
    random.forEach(function (number) { letters += CODE_ALPHABET[number % CODE_ALPHABET.length]; });
    return "AHOJ-" + letters.slice(0, 4) + "-" + letters.slice(4);
  }

  /** Cleans a typed code: capitals, no spaces; returns "" if it is not valid. */
  function normalizeCode(text) {
    const code = String(text || "").trim().toUpperCase().replace(/\s+/g, "");
    return /^[A-Z0-9-]{6,32}$/.test(code) ? code : "";
  }

  /**
   * ISO week of a date, e.g. "2026-W48". Weeks start on Monday; week 1 is
   * the one that contains the first Thursday of the year.
   */
  function weekId(date) {
    const day = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const weekday = day.getUTCDay() || 7; // Sunday counts as day 7
    day.setUTCDate(day.getUTCDate() + 4 - weekday); // move to that week's Thursday
    const yearStart = new Date(Date.UTC(day.getUTCFullYear(), 0, 1));
    const week = Math.ceil(((day - yearStart) / 86400000 + 1) / 7);
    return day.getUTCFullYear() + "-W" + String(week).padStart(2, "0");
  }

  /** "YYYY-MM-DD" of a date in the phone's own time zone. */
  function localDateText(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  /**
   * The streak to show friends: the saved count only if the learner studied
   * today or yesterday; otherwise the streak is broken and counts as 0.
   * (Same rule as getStreak() in main.js.)
   */
  function currentStreak(progress) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const last = progress.lastStudyDate;
    const isAlive = last === localDateText(new Date()) || last === localDateText(yesterday);
    return isAlive ? progress.streakDays : 0;
  }

  // ===== Upload and download of the table =====

  /** The row this learner shows in the table, as the access rules expect it. */
  function buildRow(data, api) {
    const lastExam = data.progress.lastExam;
    /** Percent of a level, 0 when the level has no sections yet. */
    function levelPercent(level) { return AppProgress.levelStats(data, level).percent || 0; }

    return {
      nickname: data.settings.nickname.trim().slice(0, 20),
      a1: levelPercent("A1"),
      a2: levelPercent("A2"),
      b1: levelPercent("B1"),
      todayMinutes: Math.min(AppStudyTime.minutesToday(data), 1440),
      dayId: localDateText(new Date()),
      weekMinutes: Math.min(AppStudyTime.minutesThisWeek(data), 10080),
      weekId: weekId(new Date()),
      examPercent: lastExam ? lastExam.percent : -1,
      examParts: lastExam ? lastExam.partsDone : 0,
      streak: currentStreak(data.progress),
      updatedAt: api.serverTimestamp()
    };
  }

  /**
   * Sends this learner's row. Only one upload runs at a time: a call made
   * while another is running waits for it, then sends whatever changed
   * meanwhile.
   */
  function upload(data) {
    if (uploadInProgress) {
      return uploadInProgress.then(function () {
        return data.progress.friendsSync.pending ? upload(data) : undefined;
      });
    }
    uploadInProgress = sendRow(data).finally(function () { uploadInProgress = null; });
    return uploadInProgress;
  }

  /** Does the actual upload. */
  function sendRow(data) {
    const group = data.settings.friends && data.settings.friends.groupCode;
    if (!group) return Promise.resolve();

    // Mark the changes as "being sent" now: anything that changes during the
    // upload sets `pending` again and is sent next time. On failure it is
    // restored below so nothing is lost.
    data.progress.friendsSync.pending = false;

    return connect().then(function (session) {
      const reference = session.api.doc(session.db, "groups", group, "players", session.uid);
      return session.api.setDoc(reference, buildRow(data, session.api));
    }).then(function () {
      lastUploadAt = Date.now();
    }).catch(function (error) {
      data.progress.friendsSync.pending = true; // try again later
      throw error;
    });
  }

  /** Downloads every row of a group, sorted later by the screen. */
  function fetchTable(groupCode) {
    return connect().then(function (session) {
      const players = session.api.collection(session.db, "groups", groupCode, "players");
      return session.api.getDocs(players).then(function (snapshot) {
        return snapshot.docs.map(function (document) {
          return Object.assign({ id: document.id, isMe: document.id === session.uid }, document.data());
        });
      });
    });
  }

  /** Deletes this learner's row from a group. */
  function leave(groupCode) {
    return connect().then(function (session) {
      return session.api.deleteDoc(session.api.doc(session.db, "groups", groupCode, "players", session.uid));
    });
  }

  /**
   * Uploads in the background when something changed. Without `force`, it
   * waits at least BACKGROUND_UPLOAD_MS since the last upload (study time
   * changes every minute). Failures (no internet) are silent: retried later.
   */
  function syncSoon(data, saveData, force) {
    const inGroup = data.settings.friends && data.settings.friends.groupCode;
    if (!inGroup || !data.progress.friendsSync || !data.progress.friendsSync.pending || !navigator.onLine) return;
    if (!force && Date.now() - lastUploadAt < BACKGROUND_UPLOAD_MS) return;
    upload(data).then(saveData).catch(function (error) {
      console.warn("Friends' table upload will be retried later.", error);
    });
  }

  // ===== Chat =====

  /** The last messages of the group, oldest first, each with `isMine`. */
  function fetchMessages(groupCode) {
    return connect().then(function (session) {
      const api = session.api;
      const messages = api.collection(session.db, "groups", groupCode, "messages");
      const newestFirst = api.query(messages, api.orderBy("createdAt", "desc"), api.limit(MESSAGES_SHOWN));
      return api.getDocs(newestFirst).then(function (snapshot) {
        return snapshot.docs.map(function (document) {
          const message = document.data();
          return {
            id: document.id,
            isMine: message.uid === session.uid,
            nickname: message.nickname,
            text: message.text,
            // A message just sent may not have the server time yet.
            date: message.createdAt && message.createdAt.toDate ? message.createdAt.toDate() : new Date()
          };
        }).reverse();
      });
    });
  }

  /** Sends a message (trimmed and cut to the allowed length). */
  function sendMessage(groupCode, nickname, text) {
    const clean = String(text).trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!clean) return Promise.resolve();
    return connect().then(function (session) {
      const messages = session.api.collection(session.db, "groups", groupCode, "messages");
      return session.api.addDoc(messages, {
        uid: session.uid,
        nickname: nickname.trim().slice(0, 20),
        text: clean,
        createdAt: session.api.serverTimestamp()
      });
    });
  }

  /** Deletes one of the learner's own messages. */
  function deleteMessage(groupCode, messageId) {
    return connect().then(function (session) {
      return session.api.deleteDoc(session.api.doc(session.db, "groups", groupCode, "messages", messageId));
    });
  }

  // ===== Public interface =====

  window.AppFriends = {
    MAX_MESSAGE_LENGTH: MAX_MESSAGE_LENGTH,
    newGroupCode: newGroupCode,
    normalizeCode: normalizeCode,
    weekId: weekId,
    upload: upload,
    fetchTable: fetchTable,
    leave: leave,
    syncSoon: syncSoon,
    fetchMessages: fetchMessages,
    sendMessage: sendMessage,
    deleteMessage: deleteMessage
  };
})();
