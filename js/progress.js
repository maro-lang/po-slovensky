/*
 * progress.js — Sections the learner marks as completed, and the progress
 * of each level (A1, A2, B1) as a percentage.
 *
 * What counts as a section (and its level):
 *   lesson:<unitId>      -> every lesson unit (its level: A1 or A2)
 *   case:<caseId>        -> the 6 cases of the case workshop (A1)
 *   pron:<sectionId>     -> the 8 pronunciation sections (A1)
 *   verbs:<topicId>      -> the 6 verb topics (A2)
 *   real:<situationId>   -> the 8 real-life situations in Bratislava (B1)
 *   deck:<deckId>        -> every built-in flashcard deck (its `level` field)
 * The learner decides when a section is done, with the button
 * "Mark as completed" at the end of each one. Decks are also marked
 * automatically once every card of the deck has been reviewed at least once
 * (see markLearnedDecks).
 *
 * How to use:
 *   AppProgress.completeButton(context, "lesson:a1-1") -> the toggle button
 *   AppProgress.levelStats(data, "A2")   -> { done, total, percent } (percent null if no sections yet)
 *   AppProgress.levelBars(data)          -> element with one bar per level
 *   AppProgress.doneClass(data, key)     -> " is-done" if completed (thin outline in lists), else ""
 *   AppProgress.markLearnedDecks(data)   -> marks fully reviewed decks; returns true if something changed
 *
 * Saved data: progress.completed = { "lesson:a1-1": "2026-11-23", … } (date of completion).
 *
 * Depends on: ui.js, i18n.js and the data files (lessons, cases, pronunciation, verbs);
 * friends.js (AppFriends.syncSoon) to tell the friends' table.
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const t = AppText.t;

  const LEVELS = ["A1", "A2", "B1"];

  // ===== Sections =====

  /** Every section of the app, with the level it belongs to. */
  function allSections() {
    const sections = [];
    AppData.lessons.UNITS.forEach(function (unit) { sections.push({ key: "lesson:" + unit.id, level: unit.level }); });
    AppData.cases.ORDER.forEach(function (caseId) { sections.push({ key: "case:" + caseId, level: "A1" }); });
    AppData.pronunciation.SECTIONS.forEach(function (section) { sections.push({ key: "pron:" + section.id, level: "A1" }); });
    if (AppData.verbs) AppData.verbs.TOPICS.forEach(function (topic) { sections.push({ key: "verbs:" + topic.id, level: "A2" }); });
    if (AppData.realLife) AppData.realLife.SITUATIONS.forEach(function (situation) { sections.push({ key: "real:" + situation.id, level: "B1" }); });
    AppData.vocabulary.DECKS.forEach(function (deck) {
      if (deck.level) sections.push({ key: "deck:" + deck.id, level: deck.level });
    });
    return sections;
  }

  function completedMap(data) {
    if (!data.progress.completed) data.progress.completed = {};
    return data.progress.completed;
  }

  function isCompleted(data, key) {
    return Boolean(completedMap(data)[key]);
  }

  /** Extra CSS class for a list row or card of a completed section (a thin outline). */
  function doneClass(data, key) {
    return isCompleted(data, key) ? " is-done" : "";
  }

  /**
   * Marks as completed every built-in deck whose cards have all been reviewed
   * at least once (each card has a review state). Called at the end of a review
   * session and once at start-up (so decks reviewed before version 0.6.5 count).
   * Returns true when it marked something, so the caller can save and sync.
   */
  function markLearnedDecks(data) {
    const completed = completedMap(data);
    let changed = false;
    AppData.vocabulary.DECKS.forEach(function (deck) {
      const key = "deck:" + deck.id;
      if (completed[key] || !deck.level) return;
      const allReviewed = deck.cards.every(function (card) { return Boolean(data.progress.cards[deck.id + ":" + card.sk]); });
      if (allReviewed) { completed[key] = AppSRS.today(); changed = true; }
    });
    if (changed && data.progress.friendsSync) data.progress.friendsSync.pending = true;
    return changed;
  }

  /** How many sections of a level are done. percent is null when the level has no sections yet. */
  function levelStats(data, level) {
    const sections = allSections().filter(function (section) { return section.level === level; });
    const done = sections.filter(function (section) { return isCompleted(data, section.key); }).length;
    return { done: done, total: sections.length, percent: sections.length ? Math.round((done / sections.length) * 100) : null };
  }

  // ===== Building blocks for the screens =====

  /**
   * "Mark as completed" button. Tapping it again un-marks the section.
   * Each change is saved and sent to the friends' table.
   * onChange (optional) is called with true/false after each tap, so a
   * screen can update the look of the section (for example its outline).
   */
  function completeButton(context, key, onChange) {
    const button = el("button", { type: "button", "data-complete": key });

    function draw() {
      const done = isCompleted(context.getData(), key);
      button.className = "btn btn--block complete-btn" + (done ? " complete-btn--done" : " btn--secondary");
      button.textContent = done ? t("progress.completed") : t("progress.markCompleted");
      button.setAttribute("aria-pressed", done ? "true" : "false");
    }

    button.addEventListener("click", function () {
      const data = context.getData();
      const completed = completedMap(data);
      if (completed[key]) delete completed[key];
      else completed[key] = AppSRS.today();
      if (data.progress.friendsSync) data.progress.friendsSync.pending = true;
      context.saveData();
      draw();
      if (onChange) onChange(Boolean(completed[key]));
      AppFriends.syncSoon(data, context.saveData, true);
    });

    draw();
    return button;
  }

  /**
   * One progress bar: label, filled part and "45 % (9/20)".
   * `percent` null means the level has no content yet.
   */
  function bar(label, percent, detail) {
    const fill = el("div", { className: "level-bar__fill", style: "width:" + (percent || 0) + "%" });
    return el("div", { className: "level-bar" + (percent === null ? " level-bar--empty" : "") }, [
      el("span", { className: "level-bar__label" }, [label]),
      el("div", { className: "level-bar__track", role: "progressbar", "aria-valuenow": String(percent || 0), "aria-valuemin": "0", "aria-valuemax": "100", "aria-label": label }, [fill]),
      el("span", { className: "level-bar__value" }, [detail])
    ]);
  }

  /** The three bars (A1, A2, B1) of the learner. */
  function levelBars(data) {
    return el("div", { className: "level-bars" }, LEVELS.map(function (level) {
      const stats = levelStats(data, level);
      const detail = stats.percent === null ? t("progress.soon") : stats.percent + " % (" + stats.done + "/" + stats.total + ")";
      return bar(level, stats.percent, detail);
    }));
  }

  window.AppProgress = {
    LEVELS: LEVELS,
    allSections: allSections,
    isCompleted: isCompleted,
    doneClass: doneClass,
    markLearnedDecks: markLearnedDecks,
    levelStats: levelStats,
    completeButton: completeButton,
    bar: bar,
    levelBars: levelBars
  };
})();
