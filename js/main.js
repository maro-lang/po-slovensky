/*
 * main.js — Starts the app and moves between screens.
 *
 * What it does:
 *   1. Loads the saved data and sets the interface language.
 *   2. Reads the address after "#" (for example #/module/cases) and draws
 *      the matching screen. Using "#" addresses means the phone's back
 *      button works and no server configuration is needed.
 *   3. Registers the service worker (sw.js) so the app works offline.
 *
 * Depends on: every other file in js/ (loaded before this one) and sw.js.
 */

(function () {
  "use strict";

  // ===== Configuration =====

  // Shown in Settings. Keep it equal to CACHE_VERSION in sw.js.
  const APP_VERSION = "0.1.2";

  // ===== State =====

  let appData = AppStorage.load();
  let offlineReady = false;

  // ===== Data helpers given to the screens =====

  /** Merges changes into the settings, saves them and applies the language. */
  function updateSettings(changes) {
    appData.settings = Object.assign({}, appData.settings, changes);
    AppStorage.save(appData);
    if (changes.baseLanguage) AppText.setLanguage(changes.baseLanguage);
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

  /** Splits "#/module/cases" into ["module", "cases"]. */
  function readRoute() {
    const route = window.location.hash.replace(/^#\/?/, ""); // drop "#" or "#/"
    return route ? route.split("/") : ["home"];
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
      chooseBaseLanguage: function (languageCode) {
        updateSettings({ baseLanguage: languageCode });
        navigate("home");
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
      AppScreens.module(container, context, parts[1]);
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
  renderCurrentRoute();
  registerServiceWorker();
})();
