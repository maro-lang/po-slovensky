/*
 * study-time.js — Counts how long the app is open each day.
 *
 * Rule (chosen by the user): time counts whenever the app is on screen,
 * even if nobody touches it. It stops when the app goes to the background
 * or the phone's screen turns off (the page is then "hidden").
 *
 * How to use (from main.js):
 *   AppStudyTime.start(getData, saveData, onNewMinute)
 *   AppStudyTime.minutesToday(data)
 *   AppStudyTime.minutesThisWeek(data)   -> Monday to today
 *
 * Saved data: progress.studySeconds = { "2026-11-23": 1520, … }, only the
 * last 14 days are kept.
 *
 * Depends on: friends.js (AppFriends.weekId, to know which days are this week).
 */

(function () {
  "use strict";

  // ===== Configuration =====

  const TICK_MS = 10000; // how often the time is added up
  // A tick never adds more than this, so a phone that slept with the page
  // "visible" (it happens on some Android versions) does not add hours.
  const MAX_TICK_SECONDS = 20;
  const DAYS_KEPT = 14;

  // ===== State =====

  let lastTick = null; // time of the last count, or null while hidden

  // ===== Dates =====

  /** "YYYY-MM-DD" of a date in the phone's own time zone. */
  function dayText(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  /** Turns "YYYY-MM-DD" back into a local date (noon, to avoid time-zone edges). */
  function parseDay(text) {
    const parts = text.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2], 12);
  }

  function secondsLog(data) {
    if (!data.progress.studySeconds) data.progress.studySeconds = {};
    return data.progress.studySeconds;
  }

  // ===== Reading the totals =====

  function minutesToday(data) {
    return Math.floor((secondsLog(data)[dayText(new Date())] || 0) / 60);
  }

  function minutesThisWeek(data) {
    const thisWeek = AppFriends.weekId(new Date());
    const log = secondsLog(data);
    const seconds = Object.keys(log).reduce(function (sum, day) {
      return AppFriends.weekId(parseDay(day)) === thisWeek ? sum + log[day] : sum;
    }, 0);
    return Math.floor(seconds / 60);
  }

  /** Deletes days older than DAYS_KEPT so the saved data stays small. */
  function forgetOldDays(log) {
    const oldest = new Date();
    oldest.setDate(oldest.getDate() - DAYS_KEPT);
    const limit = dayText(oldest);
    Object.keys(log).forEach(function (day) { if (day < limit) delete log[day]; });
  }

  // ===== Counting =====

  /**
   * Starts counting. `onNewMinute` runs each time today's total passes a
   * whole minute (used to refresh the friends' table now and then).
   */
  function start(getData, saveData, onNewMinute) {
    /**
     * Adds the seconds since the last tick to today's total. `closing` is
     * true for the last count when the app leaves the screen.
     */
    function tick(closing) {
      if (document.hidden && !closing) { lastTick = null; return; }
      const now = Date.now();
      if (lastTick !== null) {
        const seconds = Math.min((now - lastTick) / 1000, MAX_TICK_SECONDS);
        const data = getData();
        const log = secondsLog(data);
        const today = dayText(new Date());
        const minutesBefore = Math.floor((log[today] || 0) / 60);
        log[today] = Math.round((log[today] || 0) + seconds);
        forgetOldDays(log);
        saveData();
        if (Math.floor(log[today] / 60) > minutesBefore && onNewMinute) onNewMinute();
      }
      lastTick = now;
    }

    // When the app comes back to the screen, start a fresh count (the time
    // away does not count); when it leaves, add what was left.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { tick(true); lastTick = null; } else { lastTick = Date.now(); }
    });

    lastTick = document.hidden ? null : Date.now();
    setInterval(function () { tick(false); }, TICK_MS);
  }

  window.AppStudyTime = {
    start: start,
    minutesToday: minutesToday,
    minutesThisWeek: minutesThisWeek
  };
})();
