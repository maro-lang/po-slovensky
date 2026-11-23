/*
 * screens-lessons.js — Guided lessons (module "lessons").
 *
 * Addresses (after #/module/lessons):
 *   (nothing)              -> list of units by level
 *   <unitId>               -> one unit: phrases with audio, grammar, tip
 *   <unitId>/practice      -> the unit's exercises (quiz)
 *
 * Exercise types (see data/lessons-a1.js): "meaning", "say", "fill", "listen".
 *
 * Depends on: data/lessons-a1.js and data/lessons-a2.js (AppData.lessons), ui.js, i18n.js,
 * speech.js, screens.js (AppScreens.parts) and quiz.js (AppQuiz).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  function lang() { return AppText.getLanguage(); }

  function findUnit(unitId) {
    return AppData.lessons.UNITS.find(function (unit) { return unit.id === unitId; });
  }

  // ===== Unit list =====

  function listPage(container, context) {
    const parts = AppScreens.parts;

    /** One row of the list: number, Slovak title, meaning and best score. */
    function unitRow(unit) {
      const best = context.getBestResult("lesson-" + unit.id);
      const subtitle = unit.title[lang()] + (best ? " · " + t("common.bestScore", { correct: best.correct, total: best.total }) : "");
      return el("li", {}, [
        el("button", { className: "list-row" + AppProgress.doneClass(context.getData(), "lesson:" + unit.id), "data-unit": unit.id, onClick: function () { context.navigate("module/lessons/" + unit.id); } }, [
          el("span", { className: "chip" + (best ? " chip--done" : "") }, [String(unit.number)]),
          el("span", { className: "list-row__text" }, [
            el("span", { className: "list-row__title" }, [unit.title.sk]),
            el("span", { className: "list-row__subtitle" }, [subtitle])
          ]),
          el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
        ])
      ]);
    }

    // One group of units per level (A1, A2…), in the order they appear in the data.
    const levels = [];
    AppData.lessons.UNITS.forEach(function (unit) { if (levels.indexOf(unit.level) === -1) levels.push(unit.level); });
    const groups = [];
    levels.forEach(function (level) {
      const units = AppData.lessons.UNITS.filter(function (unit) { return unit.level === level; });
      groups.push(parts.sectionLabel(t("lessons.level", { level: level })), el("ul", { className: "card list" }, units.map(unitRow)));
    });

    container.append(
      parts.buildHeader(t("lessons.title"), "home", context),
      el("section", { className: "content" }, groups.concat([
        el("p", { className: "muted small note" }, [t("lessons.comingLevels")])
      ])),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== One unit =====

  function unitPage(container, context, unit) {
    const parts = AppScreens.parts;

    const phraseRows = unit.phrases.map(function (phrase) {
      return el("li", {}, [
        el("button", { className: "phrase-row phrase-row--button", type: "button", onClick: function () { AppSpeech.speak(phrase.sk); } }, [
          el("span", { className: "phrase-row__text" }, [
            el("span", { className: "phrase-row__sk" }, [phrase.sk]),
            el("span", { className: "muted small" }, [phrase[lang()]])
          ]),
          el("span", { className: "speak-btn", "aria-hidden": "true" }, [icon("speaker")])
        ])
      ]);
    });

    const content = [
      el("p", { className: "muted" }, [unit.intro[lang()]]),
      parts.sectionLabel(t("lessons.phrases")),
      el("ul", { className: "card list" }, phraseRows)
    ];

    if (unit.grammar) {
      content.push(
        parts.sectionLabel(unit.grammar.title[lang()]),
        el("div", { className: "card" }, [el("table", { className: "table" }, [
          el("tbody", {}, unit.grammar.rows.map(function (row) {
            return el("tr", {}, [
              el("td", { className: "sk-cell" }, [row.sk]),
              el("td", { className: "muted" }, [row[lang()]])
            ]);
          }))
        ])])
      );
    }

    if (unit.note) {
      content.push(parts.sectionLabel(t("lessons.tip")), el("div", { className: "card field" }, [el("p", {}, [unit.note[lang()]])]));
    }

    content.push(el("button", {
      className: "btn btn--block",
      onClick: function () { context.navigate("module/lessons/" + unit.id + "/practice"); }
    }, [icon("play"), t("lessons.practice")]));
    content.push(AppProgress.completeButton(context, "lesson:" + unit.id));

    container.append(
      parts.buildHeader(unit.level + " · " + t("lessons.unit", { n: unit.number }) + " · " + unit.title.sk, "module/lessons", context),
      el("section", { className: "content" }, content),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Practice =====

  /** Converts the unit's exercises into quiz questions. */
  function buildQuestions(unit) {
    return unit.exercises.map(function (exercise) {
      if (exercise.type === "meaning") {
        return {
          prompt: t("lessons.whatMeans"),
          skText: exercise.sk,
          options: exercise.options[lang()],
          answerIndex: exercise.answer
        };
      }
      if (exercise.type === "listen") {
        // Options are either a plain list (digits) or one list per language.
        const options = Array.isArray(exercise.options) ? exercise.options : exercise.options[lang()];
        return {
          prompt: t("lessons.listenChoose"),
          audioText: exercise.sk,
          options: options,
          answerIndex: exercise.answer,
          afterAnswer: { sk: exercise.sk, text: options[exercise.answer] }
        };
      }
      if (exercise.type === "fill") {
        const solved = exercise.sk.replace("___", exercise.options[exercise.answer]);
        return {
          prompt: t("lessons.complete"),
          skText: exercise.sk,
          options: exercise.options,
          answerIndex: exercise.answer,
          slovakOptions: true,
          afterAnswer: { sk: solved, text: "" }
        };
      }
      // "say": a prompt in the base language, Slovak options.
      return {
        prompt: exercise.prompt[lang()],
        options: exercise.options,
        answerIndex: exercise.answer,
        slovakOptions: true,
        afterAnswer: { sk: exercise.options[exercise.answer], text: "" }
      };
    });
  }

  // ===== Router for this module =====

  function route(container, context, subParts) {
    const unit = findUnit(subParts[0]);
    if (!unit) { listPage(container, context); return; }

    if (subParts[1] === "practice") {
      AppQuiz.start(container, context, {
        title: unit.title.sk,
        backRoute: "module/lessons/" + unit.id,
        resultKey: "lesson-" + unit.id,
        questions: buildQuestions(unit)
      });
    } else {
      unitPage(container, context, unit);
    }
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.lessons = route;

  // Shared with screens-real.js, whose exercises use the same four types.
  window.AppLessonQuestions = buildQuestions;
})();
