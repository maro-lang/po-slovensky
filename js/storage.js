/*
 * storage.js — Saves and loads the learner's settings and progress on the phone.
 *
 * How to use: index.html loads this file first. Other files call
 *   AppStorage.load()            -> returns the saved data (or a fresh copy)
 *   AppStorage.save(data)        -> writes the data back to the phone
 *   AppStorage.exportToFile()    -> downloads a .json backup file
 *   AppStorage.importFromText(t) -> replaces the data with a backup's content
 *
 * Depends on: nothing. It uses the browser's localStorage, which keeps the
 * data on this phone only. Nothing here is sent to the internet.
 */

(function () {
  "use strict";

  // ===== Configuration =====

  // Key under which everything is stored in localStorage.
  const STORAGE_KEY = "po-slovensky-data";

  // Bump this number when the shape of the saved data changes, so old
  // backups can be recognised (and migrated in the future).
  const DATA_VERSION = 1;

  // ===== Default data =====

  /**
   * Returns a brand-new data object for someone who just installed the app.
   * A function (not a constant) so every caller gets its own copy.
   */
  function createDefaultData() {
    return {
      version: DATA_VERSION,
      settings: {
        baseLanguage: null, // "es" or "en"; null means "not chosen yet"
        nickname: ""
      },
      progress: {
        totalPoints: 0,
        streakDays: 0,
        lastStudyDate: null, // "YYYY-MM-DD" of the last day with study
        results: {}, // best score per exercise, e.g. { "cases-gen": { correct: 4, total: 5 } }
        cards: {}, // spaced-review state per card, e.g. { "food:chlieb": { box: 2, due: "2026-11-25" } }
        newToday: null, // { date, count }: new cards introduced today (daily limit)
        customDecks: [] // the learner's own decks: [{ id, name, icon, cards: [...] }]
      }
    };
  }

  // ===== Validation =====

  /**
   * Checks that an object looks like our saved data, so a broken or foreign
   * file cannot crash the app. Returns true or false.
   */
  function isValidData(candidate) {
    if (!candidate || typeof candidate !== "object") return false;
    if (typeof candidate.version !== "number") return false;
    if (!candidate.settings || typeof candidate.settings !== "object") return false;
    if (!candidate.progress || typeof candidate.progress !== "object") return false;

    const language = candidate.settings.baseLanguage;
    if (language !== null && language !== "es" && language !== "en") return false;

    return typeof candidate.progress.totalPoints === "number";
  }

  /**
   * Fills in any field missing from older saved data with its default value.
   * This lets new versions of the app add fields without losing progress.
   */
  function mergeWithDefaults(savedData) {
    const defaults = createDefaultData();
    return {
      version: DATA_VERSION,
      settings: Object.assign(defaults.settings, savedData.settings),
      progress: Object.assign(defaults.progress, savedData.progress)
    };
  }

  // ===== Load and save =====

  /** Reads the data from the phone. Never throws: falls back to defaults. */
  function load() {
    try {
      const rawText = window.localStorage.getItem(STORAGE_KEY);
      if (!rawText) return createDefaultData();

      const parsed = JSON.parse(rawText);
      return isValidData(parsed) ? mergeWithDefaults(parsed) : createDefaultData();
    } catch (error) {
      // localStorage can be blocked (private mode) or hold broken JSON.
      console.warn("Could not read saved data, starting fresh.", error);
      return createDefaultData();
    }
  }

  /** Writes the data to the phone. Returns true if it worked. */
  function save(data) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (error) {
      console.warn("Could not save data.", error);
      return false;
    }
  }

  // ===== Backup file (export / import) =====

  /** Downloads the current data as a .json file the learner can keep. */
  function exportToFile() {
    const data = load();
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    const fileContent = JSON.stringify(data, null, 2);
    const blob = new Blob([fileContent], { type: "application/json" });

    // A temporary invisible link is the standard way to start a download.
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "po-slovensky-progreso-" + today + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
  }

  /**
   * Replaces the saved data with the content of a backup file.
   * Returns true if the file was valid and was saved, false otherwise.
   */
  function importFromText(fileText) {
    try {
      const parsed = JSON.parse(fileText);
      if (!isValidData(parsed)) return false;
      return save(mergeWithDefaults(parsed));
    } catch (error) {
      return false;
    }
  }

  // ===== Public interface =====

  window.AppStorage = {
    load: load,
    save: save,
    exportToFile: exportToFile,
    importFromText: importFromText
  };
})();
