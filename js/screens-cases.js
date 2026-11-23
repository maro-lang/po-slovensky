/*
 * screens-cases.js — Screens of the case workshop (module "cases").
 *
 * Addresses (after #/module/cases):
 *   (nothing)        -> start page: the six cases, the tables, practice
 *   case/<id>        -> one case: questions, use, examples, prepositions,
 *                       singular endings of the 12 models
 *   models           -> list of the 12 declension models
 *   model/<id>       -> full table (singular and plural) of one model
 *   practice         -> exercise with all cases mixed
 *   practice/<id>    -> exercise with one case only
 *
 * Every case has its own colour (classes .case-nom, .case-gen…, defined in
 * css/styles.css) and keeps it everywhere: badges, endings, tables.
 *
 * Depends on: data/cases.js (AppData.cases), ui.js, i18n.js, speech.js,
 * screens.js (AppScreens.parts) and quiz.js (AppQuiz).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;
  const DATA = AppData.cases;

  // ===== Small builders =====

  /** Current interface language ("es" or "en"). */
  function lang() { return AppText.getLanguage(); }

  /** Coloured square with the case number, e.g. "2" in purple for the genitive. */
  function caseBadge(caseId, large) {
    return el("span", { className: "case-badge case-" + caseId + (large ? " case-badge--large" : ""), "aria-hidden": "true" },
      [String(DATA.CASES[caseId].number)]);
  }

  /**
   * Shows a table form such as "chlap|ovi": the stem in normal text and the
   * ending in the colour of its case.
   */
  function formWithEnding(form, caseId) {
    const pieces = form.split("|");
    return el("span", { className: "form" }, [
      pieces[0],
      pieces[1] ? el("span", { className: "ending case-text-" + caseId }, [pieces[1]]) : null
    ]);
  }

  /** A Slovak phrase with its translation and a button to hear it. */
  function phraseRow(skText, translation) {
    return el("li", { className: "phrase-row" }, [
      el("div", { className: "phrase-row__text" }, [
        el("span", { className: "phrase-row__sk" }, [skText]),
        el("span", { className: "muted small" }, [translation])
      ]),
      AppQuiz.speakButton(skText)
    ]);
  }

  /**
   * A tappable row of a list (title, subtitle, chevron).
   * doneKey (optional): progress section of the row; if completed, the row gets a thin outline.
   */
  function linkRow(leftPart, title, subtitle, route, context, doneKey) {
    const doneClass = doneKey ? AppProgress.doneClass(context.getData(), doneKey) : "";
    return el("li", {}, [
      el("button", { className: "list-row" + doneClass, onClick: function () { context.navigate(route); } }, [
        leftPart,
        el("span", { className: "list-row__text" }, [
          el("span", { className: "list-row__title" }, [title]),
          subtitle ? el("span", { className: "list-row__subtitle" }, [subtitle]) : null
        ]),
        el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
      ])
    ]);
  }

  // ===== Start page =====

  function startPage(container, context) {
    const parts = AppScreens.parts;

    const caseRows = DATA.ORDER.map(function (caseId) {
      const info = DATA.CASES[caseId];
      return linkRow(caseBadge(caseId), info.name[lang()] + " · " + info.sk, info.questions.sk, "module/cases/case/" + caseId, context, "case:" + caseId);
    });

    const best = context.getBestResult("cases-all");

    container.append(
      parts.buildHeader(t("cases.title"), "home", context),
      el("section", { className: "content" }, [
        el("p", { className: "muted" }, [t("cases.intro")]),
        parts.sectionLabel(t("cases.sixCases")),
        el("ul", { className: "card list" }, caseRows),
        el("p", { className: "muted small note" }, [t("cases.vocativeNote")]),
        parts.sectionLabel(t("cases.tablesTitle")),
        el("ul", { className: "card list" }, [
          linkRow(el("span", { className: "chip" }, [icon("table")]), t("cases.models"), t("cases.modelsHint"), "module/cases/models", context)
        ]),
        parts.sectionLabel(t("common.practice")),
        el("ul", { className: "card list" }, [
          linkRow(el("span", { className: "chip" }, [icon("play")]), t("cases.practiceAll"),
            best ? t("common.bestScore", { correct: best.correct, total: best.total }) : t("cases.practiceAllHint"),
            "module/cases/practice", context)
        ])
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== One case =====

  function casePage(container, context, caseId) {
    const parts = AppScreens.parts;
    const info = DATA.CASES[caseId];
    if (!info) { context.navigate("module/cases"); return; }

    // Singular form of every model in this case, ending coloured.
    const caseIndex = DATA.ORDER.indexOf(caseId);
    const endingRows = DATA.PARADIGMS.map(function (model) {
      return el("tr", {}, [
        el("td", { className: "muted small" }, [model.id]),
        el("td", {}, [formWithEnding(model.sg[caseIndex], caseId)])
      ]);
    });

    const prepositionList = info.prepositions.length
      ? el("ul", { className: "card list" }, info.prepositions.map(function (prep) {
          return el("li", { className: "prep-row" }, [
            el("span", { className: "prep-row__sk case-text-" + caseId }, [prep.sk]),
            el("span", { className: "muted" }, [prep[lang()]])
          ]);
        }))
      : el("p", { className: "muted" }, [t("cases.noPrepositions")]);

    const best = context.getBestResult("cases-" + caseId);

    container.append(
      parts.buildHeader(info.name[lang()], "module/cases", context),
      el("section", { className: "content" }, [
        el("div", { className: "case-hero case-" + caseId }, [
          caseBadge(caseId, true),
          el("div", {}, [
            el("p", { className: "case-hero__sk" }, [info.sk]),
            el("p", { className: "case-hero__questions" }, [info.questions.sk])
          ])
        ]),
        parts.sectionLabel(t("cases.use")),
        el("div", { className: "card field" }, [el("p", {}, [info.use[lang()]])]),
        parts.sectionLabel(t("cases.examples")),
        el("ul", { className: "card list" }, info.examples.map(function (example) {
          return phraseRow(example.sk, example[lang()]);
        })),
        parts.sectionLabel(t("cases.prepositions")),
        prepositionList,
        parts.sectionLabel(t("cases.endings")),
        el("div", { className: "card" }, [el("table", { className: "table" }, [el("tbody", {}, endingRows)])]),
        el("button", {
          className: "btn btn--block",
          onClick: function () { context.navigate("module/cases/practice/" + caseId); }
        }, [icon("play"), t("cases.practiceThis", { name: info.name[lang()].toLowerCase() })]),
        best ? el("p", { className: "muted small center" }, [t("common.bestScore", { correct: best.correct, total: best.total })]) : null,
        AppProgress.completeButton(context, "case:" + caseId)
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Models (declension tables) =====

  function modelsPage(container, context) {
    const parts = AppScreens.parts;
    const sections = [];

    // One group per gender, in the order masculine animate, inanimate, feminine, neuter.
    Object.keys(DATA.GENDERS).forEach(function (genderId) {
      const models = DATA.PARADIGMS.filter(function (model) { return model.gender === genderId; });
      sections.push(parts.sectionLabel(DATA.GENDERS[genderId][lang()]));
      sections.push(el("ul", { className: "card list" }, models.map(function (model) {
        return linkRow(el("span", { className: "chip chip--word" }, [model.id.slice(0, 3)]),
          model.id, model.hint[lang()] + " · " + model.alsoLike.sk, "module/cases/model/" + model.id, context);
      })));
    });

    container.append(
      parts.buildHeader(t("cases.models"), "module/cases", context),
      el("section", { className: "content" }, [el("p", { className: "muted" }, [t("cases.modelsIntro")])].concat(sections)),
      parts.buildBottomNav("home", context)
    );
  }

  function modelPage(container, context, modelId) {
    const parts = AppScreens.parts;
    const model = DATA.PARADIGMS.find(function (item) { return item.id === modelId; });
    if (!model) { context.navigate("module/cases/models"); return; }

    const rows = DATA.ORDER.map(function (caseId, index) {
      return el("tr", {}, [
        el("th", { scope: "row" }, [
          el("span", { className: "table-case" }, [caseBadge(caseId), el("span", { className: "small" }, [DATA.CASES[caseId].questions.sk])])
        ]),
        el("td", {}, [formWithEnding(model.sg[index], caseId)]),
        el("td", {}, [formWithEnding(model.pl[index], caseId)])
      ]);
    });

    container.append(
      parts.buildHeader(model.id, "module/cases/models", context),
      el("section", { className: "content" }, [
        el("p", { className: "muted" }, [DATA.GENDERS[model.gender][lang()] + " · " + model.hint[lang()]]),
        el("div", { className: "card table-card" }, [
          el("table", { className: "table table--model" }, [
            el("thead", {}, [el("tr", {}, [
              el("th", {}, [""]),
              el("th", {}, [t("cases.singular")]),
              el("th", {}, [t("cases.plural")])
            ])]),
            el("tbody", {}, rows)
          ])
        ]),
        el("p", { className: "muted small note" }, [t("cases.alsoLike") + " " + model.alsoLike.sk])
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Practice =====

  /** Turns the exercise sentences into quiz questions, optionally for one case. */
  function buildQuestions(onlyCaseId) {
    const chosen = DATA.EXERCISES.filter(function (exercise) {
      return !onlyCaseId || exercise.answerCase === onlyCaseId;
    });

    return chosen.map(function (exercise) {
      const answer = exercise.forms[DATA.ORDER.indexOf(exercise.answerCase)];
      // Distinct wrong forms (some cases share the same form), at most 3.
      const wrongForms = AppQuiz.shuffled(exercise.forms.filter(function (form, index, all) {
        return form !== answer && all.indexOf(form) === index;
      })).slice(0, 3);
      const caseInfo = DATA.CASES[exercise.answerCase];

      return {
        prompt: t("cases.exercisePrompt", { noun: exercise.noun }),
        skText: exercise.sk,
        options: [answer].concat(wrongForms),
        answerIndex: 0,
        slovakOptions: true,
        afterAnswer: {
          sk: exercise.sk.replace("___", answer),
          text: exercise[lang()] + " — " + caseInfo.name[lang()] + " (" + caseInfo.questions.sk + ")"
        }
      };
    });
  }

  function practicePage(container, context, caseId) {
    const validCase = caseId && DATA.CASES[caseId] ? caseId : null;
    AppQuiz.start(container, context, {
      title: validCase ? DATA.CASES[validCase].name[lang()] : t("cases.practiceAll"),
      backRoute: validCase ? "module/cases/case/" + validCase : "module/cases",
      resultKey: validCase ? "cases-" + validCase : "cases-all",
      questions: validCase ? buildQuestions(validCase) : AppQuiz.shuffled(buildQuestions(null)).slice(0, 10)
    });
  }

  // ===== Router for this module =====

  /** Called by screens.js with the parts of the address after "module/cases". */
  function route(container, context, subParts) {
    const page = subParts[0];
    if (page === "case") casePage(container, context, subParts[1]);
    else if (page === "models") modelsPage(container, context);
    else if (page === "model") modelPage(container, context, subParts[1] || "");
    else if (page === "practice") practicePage(container, context, subParts[1]);
    else startPage(container, context);
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.cases = route;
})();
