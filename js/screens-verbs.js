/*
 * screens-verbs.js — Verbs: grammar topics, conjugator and practice (module "verbs").
 *
 * Addresses (after #/module/verbs):
 *   (nothing)              -> the 6 topics, mixed practice and the conjugator list
 *   topic/<id>             -> one topic: explanation, table, examples with audio
 *   topic/<id>/practice    -> exercises of that topic (written ones + generated ones)
 *   verb/<infinitive>      -> one verb: present, past, future and imperative tables
 *   mix                    -> 12 questions mixed from every topic
 *
 * Generated exercises ("drills") are built from the conjugation tables in
 * data/verbs.js, so every practice round is a little different.
 *
 * Depends on: data/verbs.js (AppData.verbs), ui.js, i18n.js, speech.js,
 * screens.js (AppScreens.parts) and quiz.js (AppQuiz).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  // ===== Configuration =====

  const DRILLS_PER_TOPIC = 5; // generated questions added to a topic's practice
  const MIX_SIZE = 12; // questions in the mixed practice

  // Future auxiliary (budem + infinitive), in PERSONS order.
  const FUTURE_AUXILIARY = ["budem", "budeš", "bude", "budeme", "budete", "budú"];
  // Past-tense auxiliary, in PERSONS order (nothing in the 3rd person).
  const PAST_AUXILIARY = ["som", "si", "", "sme", "ste", ""];

  // ===== Data helpers =====

  function lang() { return AppText.getLanguage(); }
  function data() { return AppData.verbs; }

  function findTopic(topicId) {
    return data().TOPICS.find(function (topic) { return topic.id === topicId; });
  }

  function findVerb(infinitive) {
    return data().VERBS.find(function (verb) { return verb.inf === infinitive; });
  }

  /** "učiť sa" for reflexive verbs, "robiť" for the rest. */
  function fullInfinitive(verb) {
    return verb.refl ? verb.inf + " " + verb.refl : verb.inf;
  }

  /** Adds "sa"/"si" after a form when the verb is reflexive. */
  function withReflexive(form, verb) {
    return verb.refl ? form + " " + verb.refl : form;
  }

  /** Six present forms, e.g. "učím sa". */
  function presentForms(verb) {
    return verb.pres.map(function (form) { return withReflexive(form, verb); });
  }

  /**
   * Six past forms for one gender ("m" or "f"): "robil som", "robil si",
   * "robil", "robili sme", "robili ste", "robili". The auxiliary goes before
   * "sa": "učil som sa".
   */
  function pastForms(verb, gender) {
    const singular = gender === "f" ? verb.past[1] : verb.past[0];
    return PAST_AUXILIARY.map(function (auxiliary, index) {
      const participle = index < 3 ? singular : verb.past[2];
      const words = [participle, auxiliary, verb.refl].filter(Boolean);
      return words.join(" ");
    });
  }

  /**
   * Six future forms: the special list (pôjdem…), the perfective present
   * (urobím…), or budem + infinitive (budem robiť, budem sa učiť).
   */
  function futureForms(verb) {
    if (verb.fut) return verb.fut.map(function (form) { return withReflexive(form, verb); });
    if (verb.aspect === "perf") return presentForms(verb);
    return FUTURE_AUXILIARY.map(function (auxiliary) {
      return [auxiliary, verb.refl, verb.inf].filter(Boolean).join(" ");
    });
  }

  /** Picks one random item of a list. */
  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  /**
   * Builds the 4 options of a drill: the right form plus up to 3 different
   * wrong forms of the same verb (so the learner must look at the ending).
   */
  function optionsFrom(rightForm, otherForms) {
    const wrong = AppQuiz.shuffled(otherForms.filter(function (form, index, list) {
      return form !== rightForm && list.indexOf(form) === index;
    })).slice(0, 3);
    return [rightForm].concat(wrong);
  }

  // ===== Generated exercises (drills) =====

  /** "Present of «písať» for «on / ona»" -> píše. Only imperfective verbs. */
  function presentDrill() {
    const verb = pickRandom(data().VERBS.filter(function (v) { return v.aspect === "imp"; }));
    const personIndex = Math.floor(Math.random() * 6);
    const forms = presentForms(verb);
    const person = data().PERSONS[personIndex];
    return {
      prompt: t("verbs.drillPresent", { verb: fullInfinitive(verb), person: person }),
      options: optionsFrom(forms[personIndex], forms),
      answerIndex: 0,
      slovakOptions: true,
      afterAnswer: { sk: person.split(" / ")[0] + " " + forms[personIndex], text: verb[lang()] }
    };
  }

  /** "Past of «písať» for «ona»" -> písala. */
  function pastDrill() {
    const verb = pickRandom(data().VERBS);
    const subjects = [
      { label: "on", form: verb.past[0] },
      { label: "ona", form: verb.past[1] },
      { label: "oni", form: verb.past[2] }
    ];
    const subject = pickRandom(subjects);
    const others = subjects.map(function (s) { return s.form; }).concat([verb.pres[2]]);
    return {
      prompt: t("verbs.drillPast", { verb: fullInfinitive(verb), person: subject.label }),
      options: optionsFrom(withReflexive(subject.form, verb), others.map(function (f) { return withReflexive(f, verb); })),
      answerIndex: 0,
      slovakOptions: true,
      afterAnswer: { sk: subject.label + " " + withReflexive(subject.form, verb), text: verb[lang()] }
    };
  }

  const DRILLS = { present: presentDrill, past: pastDrill };

  /** Turns a written exercise of data/verbs.js into a quiz question. */
  function questionFromExercise(exercise) {
    const hint = exercise.hint ? " " + exercise.hint[lang()] : "";
    return {
      prompt: t("verbs.complete") + hint,
      skText: exercise.sk,
      options: exercise.options,
      answerIndex: exercise.answer,
      slovakOptions: true,
      afterAnswer: { sk: exercise.sk.replace("___", exercise.options[exercise.answer]), text: exercise.tr[lang()] }
    };
  }

  /** All questions of a topic: its written exercises plus generated ones. */
  function topicQuestions(topic) {
    const questions = topic.exercises.map(questionFromExercise);
    const drill = DRILLS[topic.drill];
    for (let i = 0; drill && i < DRILLS_PER_TOPIC; i++) questions.push(drill());
    return questions;
  }

  /** A random mix from every topic, plus a few drills. */
  function mixedQuestions() {
    const written = [];
    data().TOPICS.forEach(function (topic) { topic.exercises.forEach(function (x) { written.push(x); }); });
    const questions = AppQuiz.shuffled(written).slice(0, MIX_SIZE - 4).map(questionFromExercise);
    return questions.concat([presentDrill(), presentDrill(), pastDrill(), pastDrill()]);
  }

  // ===== Small builders =====

  /** A row with a Slovak text and its meaning; tapping it reads the Slovak aloud. */
  function phraseRow(skText, meaning) {
    return el("li", {}, [
      el("button", { className: "phrase-row phrase-row--button", type: "button", onClick: function () { AppSpeech.speak(skText); } }, [
        el("span", { className: "phrase-row__text" }, [
          el("span", { className: "phrase-row__sk" }, [skText]),
          meaning ? el("span", { className: "muted small" }, [meaning]) : null
        ]),
        el("span", { className: "speak-btn", "aria-hidden": "true" }, [icon("speaker")])
      ])
    ]);
  }

  /** Grey pills under a verb: aspect, group, motion. */
  function verbPills(verb) {
    const pills = [
      el("span", { className: "pill" }, [t(verb.aspect === "perf" ? "verbs.perfective" : "verbs.imperfective")]),
      el("span", { className: "pill" }, [t("verbs.group." + verb.group)])
    ];
    if (verb.motion) pills.push(el("span", { className: "pill" }, [t("verbs.motionPill")]));
    return el("div", { className: "pill-row" }, pills);
  }

  // ===== Start page =====

  function startPage(container, context) {
    const parts = AppScreens.parts;

    const topicRows = data().TOPICS.map(function (topic, index) {
      const best = context.getBestResult("verbs-" + topic.id);
      const subtitle = topic.title.sk + (best ? " · " + t("common.bestScore", { correct: best.correct, total: best.total }) : "");
      return el("li", {}, [
        el("button", { className: "list-row" + AppProgress.doneClass(context.getData(), "verbs:" + topic.id), "data-topic": topic.id, onClick: function () { context.navigate("module/verbs/topic/" + topic.id); } }, [
          el("span", { className: "chip" + (best ? " chip--done" : "") }, [String(index + 1)]),
          el("span", { className: "list-row__text" }, [
            el("span", { className: "list-row__title" }, [topic.title[lang()]]),
            el("span", { className: "list-row__subtitle" }, [subtitle])
          ]),
          el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
        ])
      ]);
    });

    // Conjugator: every verb in alphabetical order, with a search box.
    const sortedVerbs = data().VERBS.slice().sort(function (a, b) { return a.inf.localeCompare(b.inf, "sk"); });
    const verbList = el("ul", { className: "card list" });
    const searchInput = el("input", {
      type: "text", id: "verb-search", autocomplete: "off", spellcheck: "false",
      placeholder: t("verbs.searchPlaceholder"),
      onInput: function () { drawVerbList(searchInput.value); }
    });

    /** Shows the verbs whose infinitive or meaning contains the search text. */
    function drawVerbList(searchText) {
      const query = searchText.trim().toLowerCase();
      const matching = sortedVerbs.filter(function (verb) {
        return !query || fullInfinitive(verb).includes(query) || verb[lang()].toLowerCase().includes(query);
      });
      verbList.replaceChildren.apply(verbList, matching.length ? matching.map(function (verb) {
        return el("li", {}, [
          el("button", { className: "list-row list-row--compact", "data-verb": verb.inf, onClick: function () { context.navigate("module/verbs/verb/" + verb.inf); } }, [
            el("span", { className: "list-row__text" }, [
              el("span", { className: "list-row__title" }, [fullInfinitive(verb)]),
              el("span", { className: "list-row__subtitle" }, [verb[lang()]])
            ]),
            el("span", { className: "pill" }, [t(verb.aspect === "perf" ? "verbs.perfShort" : "verbs.impShort")]),
            el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
          ])
        ]);
      }) : [el("li", { className: "field muted" }, [t("verbs.noMatch")])]);
    }
    drawVerbList("");

    container.append(
      parts.buildHeader(t("verbs.title"), "home", context),
      el("section", { className: "content" }, [
        parts.sectionLabel(t("verbs.topics")),
        el("ul", { className: "card list" }, topicRows),
        el("button", { className: "btn btn--block", onClick: function () { context.navigate("module/verbs/mix"); } }, [icon("play"), t("verbs.mixPractice")]),
        parts.sectionLabel(t("verbs.conjugator", { count: data().VERBS.length })),
        el("div", { className: "card field" }, [searchInput]),
        el("div", { className: "card--spaced" }, [verbList])
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== One topic =====

  function topicPage(container, context, topic) {
    const parts = AppScreens.parts;

    container.append(
      parts.buildHeader(topic.title[lang()], "module/verbs", context),
      el("section", { className: "content" }, [
        el("p", { className: "muted" }, [topic.intro[lang()]]),
        parts.sectionLabel(topic.title.sk),
        el("div", { className: "card table-card" }, [el("table", { className: "table" }, [
          el("tbody", {}, topic.table.map(function (row) {
            return el("tr", {}, [
              el("td", { className: "sk-cell" }, [row.sk]),
              el("td", { className: "muted" }, [row[lang()]])
            ]);
          }))
        ])]),
        parts.sectionLabel(t("verbs.examples")),
        el("ul", { className: "card list" }, topic.examples.map(function (example) {
          return phraseRow(example.sk, example[lang()]);
        })),
        parts.sectionLabel(t("lessons.tip")),
        el("div", { className: "card field" }, [el("p", {}, [topic.note[lang()]])]),
        el("button", {
          className: "btn btn--block",
          onClick: function () { context.navigate("module/verbs/topic/" + topic.id + "/practice"); }
        }, [icon("play"), t("lessons.practice")]),
        AppProgress.completeButton(context, "verbs:" + topic.id)
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== One verb (conjugator) =====

  /** A titled card with six rows "person | form", each one tappable for audio. */
  function conjugationCard(title, forms, labels) {
    return [
      AppScreens.parts.sectionLabel(title),
      el("div", { className: "card table-card" }, [el("table", { className: "table conjugation" }, [
        el("tbody", {}, forms.map(function (form, index) {
          const label = labels ? labels[index] : data().PERSONS[index];
          return el("tr", { onClick: function () { AppSpeech.speak(form); } }, [
            el("td", { className: "muted conjugation__person" }, [label]),
            el("td", { className: "sk-cell" }, [form]),
            el("td", { className: "conjugation__speak" }, [AppQuiz.speakButton(form)])
          ]);
        }))
      ])])
    ];
  }

  function verbPage(container, context, verb) {
    const parts = AppScreens.parts;
    const partner = verb.partner ? findVerb(verb.partner) : null;
    const isPerfective = verb.aspect === "perf";

    const content = [
      el("div", { className: "card field verb-head" }, [
        el("div", { className: "verb-head__top" }, [
          el("p", { className: "sk-text" }, [fullInfinitive(verb)]),
          AppQuiz.speakButton(fullInfinitive(verb))
        ]),
        el("p", { className: "muted" }, [verb[lang()]]),
        verbPills(verb),
        partner ? el("button", {
          className: "btn btn--secondary partner-btn", type: "button",
          onClick: function () { context.navigate("module/verbs/verb/" + partner.inf); }
        }, [t(isPerfective ? "verbs.partnerImp" : "verbs.partnerPerf", { verb: fullInfinitive(partner) }), icon("chevronRight")]) : null
      ])
    ];

    // Perfective verbs have no real present: their "present" forms are the future.
    if (isPerfective) {
      content.push(el("p", { className: "notice notice--info" }, [t("verbs.perfNoPresent")]));
    } else {
      content.push.apply(content, conjugationCard(t("verbs.present"), presentForms(verb)));
    }
    // The past changes with the gender of the subject, so it gets two tables.
    content.push.apply(content, conjugationCard(t("verbs.pastMasc"), pastForms(verb, "m"), ["ja", "ty", "on", "my", "vy", "oni"]));
    content.push.apply(content, conjugationCard(t("verbs.pastFem"), pastForms(verb, "f"), ["ja", "ty", "ona", "my", "vy", "ony"]));
    content.push.apply(content, conjugationCard(t("verbs.future"), futureForms(verb)));
    if (verb.imper) {
      content.push.apply(content, conjugationCard(t("verbs.imperative"),
        verb.imper.map(function (form) { return withReflexive(form, verb); }), ["ty", "vy"]));
    }

    container.append(
      parts.buildHeader(fullInfinitive(verb), "module/verbs", context),
      el("section", { className: "content" }, content),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Router for this module =====

  function route(container, context, subParts) {
    const page = subParts[0];

    if (page === "topic") {
      const topic = findTopic(subParts[1]);
      if (topic && subParts[2] === "practice") {
        AppQuiz.start(container, context, {
          title: topic.title[lang()],
          backRoute: "module/verbs/topic/" + topic.id,
          resultKey: "verbs-" + topic.id,
          questions: topicQuestions(topic)
        });
        return;
      }
      if (topic) { topicPage(container, context, topic); return; }
    } else if (page === "verb") {
      const verb = findVerb(subParts[1]);
      if (verb) { verbPage(container, context, verb); return; }
    } else if (page === "mix") {
      AppQuiz.start(container, context, {
        title: t("verbs.mixPractice"),
        backRoute: "module/verbs",
        resultKey: "verbs-mix",
        questions: mixedQuestions()
      });
      return;
    }
    startPage(container, context);
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.verbs = route;
})();
