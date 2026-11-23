/*
 * screens-real.js — "Real Slovak": everyday scenes in Bratislava (module "real").
 *
 * Addresses (after #/module/real):
 *   (nothing)          -> list of situations
 *   <id>               -> one situation: tip, dialogue with two voices,
 *                         key words, practice and "Mark as completed"
 *   <id>/practice      -> the situation's exercises (same quiz as the lessons)
 *
 * In the dialogue, B is the learner and A is the other person. Each line can
 * be heard on its own (tap it) or the whole dialogue at once. Translations
 * start hidden, so the learner tries to understand first.
 *
 * Depends on: data/real-life.js (AppData.realLife), screens-lessons.js
 * (AppLessonQuestions), quiz.js (AppQuiz), speech.js, progress.js, ui.js,
 * i18n.js and screens.js (AppScreens.parts).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  function lang() { return AppText.getLanguage(); }

  function findSituation(situationId) {
    return AppData.realLife.SITUATIONS.find(function (situation) { return situation.id === situationId; });
  }

  // ===== List of situations =====

  function listPage(container, context) {
    const parts = AppScreens.parts;
    const data = context.getData();

    const rows = AppData.realLife.SITUATIONS.map(function (situation, index) {
      const done = AppProgress.isCompleted(data, "real:" + situation.id);
      return el("li", {}, [
        el("button", { className: "list-row" + (done ? " is-done" : ""), "data-situation": situation.id, onClick: function () { context.navigate("module/real/" + situation.id); } }, [
          el("span", { className: "chip" + (done ? " chip--done" : "") }, [String(index + 1)]),
          el("span", { className: "list-row__text" }, [
            el("span", { className: "list-row__title" }, [situation.title.sk]),
            el("span", { className: "list-row__subtitle" }, [situation.title[lang()]])
          ]),
          el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
        ])
      ]);
    });

    container.append(
      parts.buildHeader(t("real.title"), "home", context),
      el("section", { className: "content" }, [
        el("p", { className: "muted" }, [t("real.intro")]),
        parts.sectionLabel(t("real.situations")),
        el("ul", { className: "card list" }, rows)
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== One situation =====

  function situationPage(container, context, situation) {
    const parts = AppScreens.parts;
    let translationsShown = false;

    // Each line: who speaks, the Slovak text, its translation (hidden at first).
    const translationElements = [];
    const lineRows = situation.dialogue.map(function (line) {
      const translation = el("span", { className: "muted small dialogue__translation", hidden: true }, [line[lang()]]);
      translationElements.push(translation);
      return el("li", {}, [
        el("button", {
          className: "dialogue__line dialogue__line--" + line.who, type: "button",
          onClick: function () { AppSpeech.speakLines([{ who: line.who, line: line.sk }]); }
        }, [
          el("span", { className: "dialogue__who" }, [line.who === "B" ? t("real.you") : t("real.other")]),
          el("span", { className: "dialogue__text" }, [
            el("span", { className: "dialogue__sk" }, [line.sk]),
            translation
          ])
        ])
      ]);
    });

    const toggleButton = el("button", { className: "btn btn--secondary", type: "button" }, [t("real.showTranslation")]);
    toggleButton.addEventListener("click", function () {
      translationsShown = !translationsShown;
      translationElements.forEach(function (element) { element.hidden = !translationsShown; });
      toggleButton.textContent = t(translationsShown ? "real.hideTranslation" : "real.showTranslation");
    });

    const playAll = el("button", { className: "btn", type: "button", onClick: function () {
      AppSpeech.speakLines(situation.dialogue.map(function (line) { return { who: line.who, line: line.sk }; }));
    } }, [icon("play"), t("real.listenAll")]);

    const wordRows = situation.words.map(function (word) {
      return el("li", {}, [
        el("button", { className: "phrase-row phrase-row--button", type: "button", onClick: function () { AppSpeech.speak(word.sk); } }, [
          el("span", { className: "phrase-row__text" }, [
            el("span", { className: "phrase-row__sk" }, [word.sk]),
            el("span", { className: "muted small" }, [word[lang()]])
          ]),
          el("span", { className: "speak-btn", "aria-hidden": "true" }, [icon("speaker")])
        ])
      ]);
    });

    container.append(
      parts.buildHeader(situation.title.sk, "module/real", context),
      el("section", { className: "content" }, [
        el("p", { className: "muted" }, [situation.title[lang()]]),
        el("div", { className: "notice notice--info real-tip" }, [situation.tip[lang()]]),
        parts.sectionLabel(t("real.dialogue")),
        el("div", { className: "button-row" }, [playAll, toggleButton]),
        el("ul", { className: "card list dialogue card--spaced" }, lineRows),
        parts.sectionLabel(t("real.words")),
        el("ul", { className: "card list" }, wordRows),
        el("button", { className: "btn btn--block", onClick: function () { context.navigate("module/real/" + situation.id + "/practice"); } }, [icon("play"), t("lessons.practice")]),
        AppProgress.completeButton(context, "real:" + situation.id)
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Router for this module =====

  function route(container, context, subParts) {
    AppSpeech.stop();
    const situation = findSituation(subParts[0]);
    if (!situation) { listPage(container, context); return; }

    if (subParts[1] === "practice") {
      AppQuiz.start(container, context, {
        title: situation.title.sk,
        backRoute: "module/real/" + situation.id,
        resultKey: "real-" + situation.id,
        questions: AppLessonQuestions(situation)
      });
    } else {
      situationPage(container, context, situation);
    }
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.real = route;
})();
