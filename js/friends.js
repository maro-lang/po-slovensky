/*
 * friends.js — Connection with Firebase for the friends' leaderboard.
 *
 * What it does:
 *   - Loads the Firebase code (js/vendor/firebase-lite.js) only when needed,
 *     so the rest of the app stays fast and works offline.
 *   - Signs the phone in anonymously (no e-mail, no password). Firebase
 *     remembers the anonymous identity on the phone.
 *   - Uploads this learner's row (nickname, level, points, streak) and
 *     downloads the rows of the whole group.
 *
 * Where the data lives (see the access rules in herramientas/firestore.rules):
 *   groups/{groupCode}/players/{userId}
 * The group code works like a shared key: whoever knows it sees the table.
 *
 * How to use:
 *   AppFriends.newGroupCode()           -> e.g. "AHOJ-K7QM-3XPD"
 *   AppFriends.normalizeCode(text)      -> cleans a code typed by a person
 *   AppFriends.upload(data)             -> Promise; sends this learner's row
 *   AppFriends.fetchTable(code)         -> Promise of the group's rows
 *   AppFriends.leave(code)              -> Promise; deletes this learner's row
 *   AppFriends.syncSoon(data, save)     -> uploads in the background if needed
 *   AppFriends.weekId(date)             -> ISO week such as "2026-W48"
 *
 * Saved data used (see storage.js):
 *   settings.friends = { groupCode, level }
 *   progress.weekPoints / progress.weekId  -> points of the current week
 *   progress.friendsSync = { pending, lastPushedTotal }
 *
 * Depends on: js/vendor/firebase-lite.js (loaded on demand).
 */

(function () {
  "use strict";

  // ===== Configuration =====

  // Public settings of the Firebase project "po-slovensky". These values are
  // meant to be inside the app (they identify the project, they are not a
  // password); the data is protected by the access rules.
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAkMIvkmRrJD08JQPAAt9QN3vKbYvBzeIQ",
    authDomain: "po-slovensky.firebaseapp.com",
    projectId: "po-slovensky",
    storageBucket: "po-slovensky.firebasestorage.app",
    messagingSenderId: "95755242635",
    appId: "1:95755242635:web:3d43db850dd83c8d1e588e"
  };

  const SDK_URL = "js/vendor/firebase-lite.js";

  // The access rules accept at most this many new points per upload.
  const MAX_POINTS_PER_UPLOAD = 2000;

  // Letters and digits that cannot be confused when read aloud (no 0/O, 1/I/L).
  const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

  // ===== State =====

  let connection = null; // Promise of { api, db, uid } once connected
  let uploadInProgress = null; // Promise of the upload running right now, if any

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

  // ===== Group codes and weeks =====

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

  // ===== Upload and download =====

  /** The row this learner shows in the table, as the access rules expect it. */
  function buildRow(data, totalPoints, api) {
    const progress = data.progress;
    const thisWeek = weekId(new Date());
    return {
      nickname: data.settings.nickname.trim().slice(0, 20),
      level: data.settings.friends.level,
      weekPoints: progress.weekId === thisWeek ? progress.weekPoints : 0,
      weekId: thisWeek,
      totalPoints: totalPoints,
      streak: currentStreak(progress),
      updatedAt: api.serverTimestamp()
    };
  }

  /**
   * Sends this learner's row. Only one upload runs at a time: a call made
   * while another is running waits for it, then sends whatever changed
   * meanwhile. (Two uploads at once could reach the server in the wrong
   * order, and the rules refuse a total that goes down.)
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

  /**
   * Does the actual upload. The rules accept at most 2000 new points per
   * write, so a big jump (for example after weeks offline) is sent in steps.
   */
  function sendRow(data) {
    const group = data.settings.friends && data.settings.friends.groupCode;
    if (!group) return Promise.resolve();

    // Mark the changes as "being sent" now: anything that changes during the
    // upload sets `pending` again and is sent next time. On failure it is
    // restored below so nothing is lost.
    data.progress.friendsSync.pending = false;

    return connect().then(function (session) {
      const reference = session.api.doc(session.db, "groups", group, "players", session.uid);
      const sync = data.progress.friendsSync;
      const target = data.progress.totalPoints;
      let sent = sync.lastPushedTotal === null ? null : sync.lastPushedTotal;

      // First upload in this group: send everything at once (it is a "create").
      if (sent === null || sent > target) {
        return session.api.setDoc(reference, buildRow(data, target, session.api)).then(function () {
          sync.lastPushedTotal = target;
        });
      }

      // Later uploads: climb to the target in steps of at most 2000 points.
      function nextStep() {
        const stepTotal = Math.min(target, sent + MAX_POINTS_PER_UPLOAD);
        return session.api.setDoc(reference, buildRow(data, stepTotal, session.api)).then(function () {
          sent = stepTotal;
          sync.lastPushedTotal = stepTotal;
          if (sent < target) return nextStep();
        });
      }
      return nextStep();
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
   * Uploads in the background when there are points not sent yet.
   * Failures (no internet) are silent: it is retried on the next call.
   */
  function syncSoon(data, saveData) {
    const inGroup = data.settings.friends && data.settings.friends.groupCode;
    if (!inGroup || !data.progress.friendsSync.pending || !navigator.onLine) return;
    upload(data).then(saveData).catch(function (error) {
      console.warn("Leaderboard upload will be retried later.", error);
    });
  }

  // ===== Public interface =====

  window.AppFriends = {
    newGroupCode: newGroupCode,
    normalizeCode: normalizeCode,
    weekId: weekId,
    upload: upload,
    fetchTable: fetchTable,
    leave: leave,
    syncSoon: syncSoon
  };
})();
