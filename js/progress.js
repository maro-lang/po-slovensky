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
 * The learner decides when a section is done, with the button
 * "Mark as completed" at the end of each one.
 *
 * How to use:
 *   AppProgress.completeButton(context, "lesson:a1-1") -> the toggle button
 *   AppProgress.levelStats(data, "A2")   -> { done, total, percent } (percent null if no sections yet)
 *   AppProgress.levelBars(data)          -> element with one bar per level
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
    return sections;
  }

  function completedMap(data) {
    if (!data.progress.completed) data.progress.completed = {};
    return data.progress.completed;
  }

  function isCompleted(data, key) {
    return Boolean(completedMap(data)[key]);
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
   */
  function completeButton(context, key) {
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
    levelStats: levelStats,
    completeButton: completeButton,
    bar: bar,
    levelBars: levelBars
  };
})();
