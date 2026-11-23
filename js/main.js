/*
 * main.js — Starts the app and moves between screens.
 *
 * What it does:
 *   1. Loads the saved data and sets the interface language.
 *   2. Reads the address after "#" (for example #/module/cases) and draws
 *      the matching screen. Using "#" addresses means the phone's back
 *      button works and no server configuration is needed.
 *   3. Registers the service worker (sw.js) so the app works offline.
 *   4. Counts the time with the app open (study-time.js) and keeps the
 *      friends' table up to date in the background (friends.js): at start,
 *      when internet comes back and when the app leaves the screen.
 *
 * Depends on: every other file in js/ (loaded before this one), sw.js and,
 * for the leaderboard, friends.js (AppFriends).
 */

(function () {
  "use strict";

  // ===== Configuration =====

  // Shown in Settings. Keep it equal to CACHE_VERSION in sw.js.
  const APP_VERSION = "0.6.7";

  // ===== State =====

  let appData = AppStorage.load();
  let offlineReady = false;

  // ===== Data helpers given to the screens =====

  /** Merges changes into the settings, saves them and applies the language. */
  function updateSettings(changes) {
    appData.settings = Object.assign({}, appData.settings, changes);
    // A new nickname must also reach the friends' table.
    if (changes.nickname !== undefined) appData.progress.friendsSync.pending = true;
    AppStorage.save(appData);
    if (changes.baseLanguage) AppText.setLanguage(changes.baseLanguage);
    syncLeaderboard(true);
  }

  /**
   * Uploads to the friends' table if something changed (silent if offline).
   * Without `force`, uploads are spaced out (see friends.js).
   */
  function syncLeaderboard(force) {
    AppFriends.syncSoon(appData, function () { AppStorage.save(appData); }, force === true);
  }

  // ===== Progress: points, streak and best scores =====

  /** "YYYY-MM-DD" of a date in the phone's own time zone. */
  function localDateText(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + month + "-" + day;
  }

  /** "YYYY-MM-DD" of yesterday. */
  function yesterdayText() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return localDateText(date);
  }

  /**
   * The streak shown on screen: the saved count if the learner studied
   * today or yesterday, otherwise 0 (the streak was broken).
   */
  function getStreak() {
    const last = appData.progress.lastStudyDate;
    const today = localDateText(new Date());
    return (last === today || last === yesterdayText()) ? appData.progress.streakDays : 0;
  }

  /**
   * Called when an exercise ends: adds the points, updates the streak
   * (first study of the day: +1 if yesterday was a study day, else 1) and
   * keeps the best score of that exercise.
   */
  function recordStudy(points, resultKey, correct, total) {
    const progress = appData.progress;
    const today = localDateText(new Date());

    if (progress.lastStudyDate !== today) {
      progress.streakDays = progress.lastStudyDate === yesterdayText() ? progress.streakDays + 1 : 1;
      progress.lastStudyDate = today;
    }
    progress.totalPoints += points;
    progress.friendsSync.pending = true; // the streak may have changed

    if (resultKey) {
      const previous = progress.results[resultKey];
      const isBetter = !previous || correct / total > previous.correct / previous.total;
      if (isBetter) progress.results[resultKey] = { correct: correct, total: total };
    }
    AppStorage.save(appData);
    syncLeaderboard(true);
  }

  /** Best score of an exercise, or null if never done. */
  function getBestResult(resultKey) {
    return appData.progress.results[resultKey] || null;
  }

  /** Re-reads the data from the phone (used after importing a backup). */
  function reloadData() {
    appData = AppStorage.load();
    if (appData.settings.baseLanguage) AppText.setLanguage(appData.settings.baseLanguage);
    renderCurrentRoute();
  }

  // ===== Navigation =====

  /** Goes to a route such as "home", "settings" or "module/cases". */
  function navigate(route) {
    const newHash = "#/" + route;
    if (window.location.hash === newHash) {
      renderCurrentRoute(); // same address: just redraw (e.g. language change)
    } else {
      window.location.hash = newHash; // triggers the "hashchange" event below
    }
  }

  /** Splits "#/module/cases" into ["module", "cases"] (special letters decoded). */
  function readRoute() {
    const route = window.location.hash.replace(/^#\/?/, ""); // drop "#" or "#/"
    return route ? route.split("/").map(decodeURIComponent) : ["home"];
  }

  /** Everything a screen needs, passed as one object. */
  function buildContext() {
    return {
      appVersion: APP_VERSION,
      getData: function () { return appData; },
      updateSettings: updateSettings,
      reloadData: reloadData,
      navigate: navigate,
      isOfflineReady: function () { return offlineReady; },
      getStreak: getStreak,
      recordStudy: recordStudy,
      getBestResult: getBestResult,
      rerender: renderCurrentRoute,
      saveData: function () { AppStorage.save(appData); },
      chooseBaseLanguage: function (languageCode) {
        updateSettings({ baseLanguage: languageCode });
        // Someone who arrived through a link (e.g. a friend's invitation)
        // continues to that page; everyone else goes home.
        if (window.location.hash.length > 2) renderCurrentRoute(); else navigate("home");
      }
    };
  }

  /** Clears the page and draws the screen that matches the address. */
  function renderCurrentRoute() {
    const container = document.getElementById("app");
    container.replaceChildren();
    window.scrollTo(0, 0);

    const context = buildContext();

    // Nobody can use the app before choosing a base language.
    if (!appData.settings.baseLanguage) {
      AppScreens.onboarding(container, context);
      return;
    }

    const parts = readRoute();
    const screenName = parts[0];

    if (screenName === "settings") {
      AppScreens.settings(container, context);
    } else if (screenName === "module" && parts[1]) {
      AppScreens.module(container, context, parts[1], parts.slice(2));
    } else {
      AppScreens.home(container, context);
    }
  }

  // ===== Offline support =====

  /**
   * Registers sw.js, which keeps a copy of the app on the phone.
   * Service workers only run over http(s), so this is skipped for file://.
   */
  function registerServiceWorker() {
    if (!("serviceWorker" in navigator) || window.location.protocol === "file:") return;

    navigator.serviceWorker.register("sw.js")
      .then(function () { return navigator.serviceWorker.ready; })
      .then(function () {
        offlineReady = true;
        // Update the Settings text if that screen is open right now.
        const statusLine = document.getElementById("offline-status");
        if (statusLine) statusLine.textContent = AppText.t("settings.offlineReady");
      })
      .catch(function (error) {
        console.warn("Offline mode could not be enabled.", error);
      });
  }

  // ===== Start =====

  if (appData.settings.baseLanguage) AppText.setLanguage(appData.settings.baseLanguage);
  window.addEventListener("hashchange", renderCurrentRoute);
  window.addEventListener("online", function () { syncLeaderboard(true); }); // internet is back
  // When the app leaves the screen, send the latest study time.
  document.addEventListener("visibilitychange", function () { if (document.hidden) syncLeaderboard(true); });
  // Decks fully reviewed before version 0.6.5 (when decks started to count) get marked now.
  if (AppProgress.markLearnedDecks(appData)) AppStorage.save(appData);
  renderCurrentRoute();
  registerServiceWorker();
  syncLeaderboard(true);

  // Count the time with the app open; each new minute may update the table
  // (spaced out to one upload every few minutes).
  /**
   * Updates the minute counters of the home screen, if it is open, so the
   * number grows while the user keeps the app on screen (no full redraw).
   */
  function refreshVisibleMinutes() {
    const todayCounter = document.querySelector('[data-live-minutes="today"]');
    if (todayCounter) todayCounter.textContent = String(AppStudyTime.minutesToday(appData));
    const weekLine = document.querySelector('[data-live-minutes="week"]');
    if (weekLine) weekLine.textContent = AppText.t("home.timeLine", { week: AppStudyTime.minutesThisWeek(appData) });
  }

  AppStudyTime.start(
    function () { return appData; },
    function () { AppStorage.save(appData); },
    // Each new minute: refresh the numbers on screen and queue an upload to the group.
    function () {
      refreshVisibleMinutes();
      appData.progress.friendsSync.pending = true;
      syncLeaderboard(false);
    }
  );
})();
