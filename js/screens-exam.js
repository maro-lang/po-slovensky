/*
 * screens-exam.js — A2 mock exams with a timer (module "exam").
 *
 * Addresses (after #/module/exam):
 *   (nothing)              -> how the real exam works and the list of mock tests
 *   test/<id>              -> one test: its four parts, last result of each, total
 *   test/<id>/<partId>     -> one part with its timer: reading, listening, grammar
 *                             (B1 only), writing, speaking
 *
 * How each part is scored:
 *   reading, listening, grammar -> automatically (right answers / questions)
 *   writing, speaking  -> self-check: the learner compares with the model answer
 *                         and ticks the checklist; percent = ticked / total
 * Results are saved in progress.exams[testId][partId] and the average of the
 * parts done goes to progress.lastExam (shown in the friends' table).
 *
 * Depends on: data/exam-a2.js (AppData.exams), ui.js, i18n.js, speech.js,
 * screens.js (AppScreens.parts) and quiz.js (AppQuiz.shuffled, speakButton).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  // ===== Configuration =====

  const LEVELS = ["A1", "A2", "B1"]; // order of the groups on the start page
  const MAX_PLAYS = 2; // each recording can be heard twice, as in the real exam
  const POINTS_PER_RIGHT_ANSWER = 10;
  const CHOICE_LETTERS = ["a", "b", "c", "d"];

  // ===== State =====

  // The countdown of the part on screen. Stopped whenever another screen is drawn.
  let activeTimer = null;

  function stopTimer() {
    if (activeTimer) clearInterval(activeTimer);
    activeTimer = null;
  }

  // ===== Data helpers =====

  function lang() { return AppText.getLanguage(); }

  function findTest(testId) {
    return AppData.exams.TESTS.find(function (test) { return test.id === testId; });
  }

  function findPart(test, partId) {
    return test.parts.find(function (part) { return part.id === partId; });
  }

  /** The saved results of one test (created empty if missing). */
  function testResults(context, testId) {
    const progress = context.getData().progress;
    if (!progress.exams) progress.exams = {};
    if (!progress.exams[testId]) progress.exams[testId] = {};
    return progress.exams[testId];
  }

  /** Average of the parts of a test done so far: { percent, partsDone, partsTotal } or null. */
  function testSummary(results, test) {
    const done = test.parts.filter(function (part) { return results[part.id]; });
    if (!done.length) return null;
    const sum = done.reduce(function (total, part) { return total + results[part.id].percent; }, 0);
    return { percent: Math.round(sum / done.length), partsDone: done.length, partsTotal: test.parts.length };
  }

  /** Saves the result of a part and updates the "last exam" shown to friends. */
  function savePartResult(context, test, partId, percent) {
    const results = testResults(context, test.id);
    results[partId] = { percent: percent, date: new Date().toISOString().slice(0, 10) };
    const summary = testSummary(results, test);
    const progress = context.getData().progress;
    progress.lastExam = {
      testId: test.id, level: test.level, percent: summary.percent,
      partsDone: summary.partsDone, partsTotal: summary.partsTotal, date: results[partId].date
    };
    if (progress.friendsSync) progress.friendsSync.pending = true; // the friends' table shows it
    context.saveData();
    AppFriends.syncSoon(context.getData(), context.saveData, true);
  }

  /** "68 %" with a colour class: pass (≥ 60 %) or not yet. */
  function percentBadge(percent) {
    const passed = percent >= AppData.exams.PASS_PERCENT;
    return el("span", { className: "score-badge " + (passed ? "score-badge--pass" : "score-badge--fail") }, [percent + " %"]);
  }

  /** "mm:ss" from a number of seconds. */
  function clockText(seconds) {
    const safe = Math.max(0, seconds);
    return String(Math.floor(safe / 60)).padStart(2, "0") + ":" + String(safe % 60).padStart(2, "0");
  }

  /** Counts the words of a text written by the learner. */
  function countWords(text) {
    return (text.match(/\p{L}+/gu) || []).length;
  }

  // ===== Start page =====

  function startPage(container, context) {
    const parts = AppScreens.parts;

    /** One row of the list: number, name, parts done and average. */
    function testRow(test) {
      const summary = testSummary(testResults(context, test.id), test);
      const finished = summary && summary.partsDone === summary.partsTotal;
      return el("li", {}, [
        el("button", { className: "list-row", "data-test": test.id, onClick: function () { context.navigate("module/exam/test/" + test.id); } }, [
          el("span", { className: "chip" + (finished ? " chip--done" : "") }, [String(test.number)]),
          el("span", { className: "list-row__text" }, [
            el("span", { className: "list-row__title" }, [t("exam.testTitle", { level: test.level, n: test.number })]),
            el("span", { className: "list-row__subtitle" }, [summary ? t("exam.partsDone", { done: summary.partsDone, total: summary.partsTotal }) : t("exam.notStarted")])
          ]),
          summary ? percentBadge(summary.percent) : null,
          el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
        ])
      ]);
    }

    // One group per level, each with a note on where its format comes from.
    const groups = [];
    LEVELS.forEach(function (level) {
      const tests = AppData.exams.TESTS.filter(function (test) { return test.level === level; });
      if (!tests.length) return;
      groups.push(
        parts.sectionLabel(t("exam.levelTitle", { level: level })),
        el("p", { className: "muted small exam-level-note" }, [t("exam.format." + level)]),
        el("ul", { className: "card list" }, tests.map(testRow))
      );
    });

    container.append(
      parts.buildHeader(t("exam.title"), "home", context),
      el("section", { className: "content" }, [
        el("div", { className: "card field" }, [
          el("p", { className: "today-card__title" }, [t("exam.realTitle")]),
          el("p", { className: "muted" }, [t("exam.realBody")]),
          el("p", { className: "muted small note-inline" }, [t("exam.passNote", { percent: AppData.exams.PASS_PERCENT })])
        ]),
      ].concat(groups, [
        el("p", { className: "muted small note" }, [t("exam.moreSoon")])
      ])),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== One test: its parts =====

  function testPage(container, context, test) {
    const parts = AppScreens.parts;
    const results = testResults(context, test.id);
    const summary = testSummary(results, test);

    const partRows = test.parts.map(function (part) {
      const partId = part.id;
      const result = results[partId];
      return el("li", {}, [
        el("button", { className: "list-row", "data-part": partId, onClick: function () { context.navigate("module/exam/test/" + test.id + "/" + partId); } }, [
          el("span", { className: "list-row__text" }, [
            el("span", { className: "list-row__title" }, [t("exam.part." + partId)]),
            el("span", { className: "list-row__subtitle" }, [
              t("exam.minutes", { minutes: part.minutes }) + " · " + t(partId === "writing" || partId === "speaking" ? "exam.selfScored" : "exam.autoScored")
            ])
          ]),
          result ? percentBadge(result.percent) : null,
          el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
        ])
      ]);
    });

    const summaryCard = summary ? el("div", { className: "card field exam-summary" }, [
      el("p", { className: "muted small" }, [t("exam.average", { done: summary.partsDone, total: summary.partsTotal })]),
      el("p", { className: "exam-summary__value" }, [percentBadge(summary.percent)]),
      el("p", { className: "muted small" }, [t(summary.percent >= AppData.exams.PASS_PERCENT ? "exam.goodSign" : "exam.keepGoing")])
    ]) : null;

    container.append(
      parts.buildHeader(t("exam.testTitle", { level: test.level, n: test.number }), "module/exam", context),
      el("section", { className: "content" }, [
        el("p", { className: "muted" }, [t("exam.testIntro")]),
        summaryCard,
        parts.sectionLabel(t("exam.parts")),
        el("ul", { className: "card list" }, partRows)
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Shared builders for the parts =====

  /** Sticky bar with the countdown. When it reaches 0, onTimeUp runs once. */
  function timerBar(minutes, onTimeUp) {
    let secondsLeft = minutes * 60;
    const clock = el("span", { className: "exam-timer__clock" }, [clockText(secondsLeft)]);
    const bar = el("div", { className: "exam-timer", role: "timer" }, [icon("clock"), clock]);

    stopTimer();
    activeTimer = setInterval(function () {
      secondsLeft--;
      clock.textContent = clockText(secondsLeft);
      if (secondsLeft === 60) bar.classList.add("exam-timer--warning");
      if (secondsLeft <= 0) {
        stopTimer();
        bar.classList.add("exam-timer--over");
        onTimeUp();
      }
    }, 1000);

    return {
      element: bar,
      stop: function () { stopTimer(); bar.classList.add("exam-timer--stopped"); }
    };
  }

  /** A card with a reading text, line breaks kept. */
  function textCard(text) {
    return el("div", { className: "card field exam-text" }, text.split("\n").map(function (paragraph) {
      return el("p", {}, [paragraph]);
    }));
  }

  /**
   * "Listen" button for a recording, limited to MAX_PLAYS. After the part is
   * handed in, `unlock()` lets the learner replay it freely.
   */
  function playButton(lines) {
    let playsLeft = MAX_PLAYS;
    let unlimited = false;
    const button = el("button", { className: "btn btn--secondary exam-play", type: "button" });

    function label() {
      button.replaceChildren(icon("play"), unlimited ? t("common.listen") : t("exam.listenLeft", { count: playsLeft }));
      button.disabled = !unlimited && playsLeft <= 0;
    }
    button.addEventListener("click", function () {
      if (!unlimited) playsLeft--;
      label();
      AppSpeech.speakLines(lines);
    });
    label();
    return { element: button, unlock: function () { unlimited = true; label(); } };
  }

  /** Text of a recording, shown after handing in. */
  function transcript(lines) {
    return el("div", { className: "exam-transcript" }, lines.map(function (entry) {
      return el("p", {}, [el("strong", {}, [entry.who + ": "]), entry.line]);
    }));
  }

  // ===== Reading and listening (scored automatically) =====

  /**
   * Draws a reading or listening part. Every item keeps the learner's choice
   * until "Hand in"; then answers are marked and the score is saved.
   */
  function objectivePart(container, context, test, part) {
    const parts = AppScreens.parts;
    const isListening = part.id === "listening";
    const questions = []; // { optionButtons, rightButton, chosen, item }
    const players = [];
    const transcripts = [];
    let handedIn = false;

    const body = el("section", { className: "content exam-part" });

    /** One question with its option buttons (shuffled). */
    function questionBlock(item, number, isTrueFalse) {
      const record = { chosen: null, optionButtons: [], rightButton: null };
      const choices = isTrueFalse
        ? [{ text: t("exam.true"), isRight: item.answer === true }, { text: t("exam.false"), isRight: item.answer === false }]
        : AppQuiz.shuffled(item.options.map(function (text, index) { return { text: text, isRight: index === item.answer }; }));

      const optionsRow = el("div", { className: "exam-options" + (isTrueFalse ? " exam-options--two" : "") });
      choices.forEach(function (choice, index) {
        const letter = isTrueFalse ? "" : CHOICE_LETTERS[index] + ") ";
        const button = el("button", { className: "option option--sk", type: "button" }, [letter + choice.text]);
        button.addEventListener("click", function () {
          if (handedIn) return;
          record.optionButtons.forEach(function (b) { b.classList.remove("option--chosen"); });
          button.classList.add("option--chosen");
          record.chosen = choice;
        });
        record.optionButtons.push(button);
        if (choice.isRight) record.rightButton = button;
        optionsRow.append(button);
      });
      questions.push(record);

      const children = [];
      if (item.text) children.push(el("p", { className: "exam-notice" }, [item.text]));
      if (item.audio) {
        const player = playButton(item.audio);
        players.push(player);
        children.push(player.element);
        const hidden = transcript(item.audio);
        hidden.hidden = true;
        transcripts.push(hidden);
        children.push(hidden);
      }
      children.push(el("p", { className: "exam-question" }, [number + ". " + (item.question || item.sk)]), optionsRow);
      return el("div", { className: "card field exam-item" }, children);
    }

    let number = 0;
    part.tasks.forEach(function (task) {
      body.append(el("p", { className: "exam-instruction" }, [task.instruction[lang()]]));
      if (task.text) body.append(textCard(task.text));
      if (task.audio) {
        const player = playButton(task.audio);
        players.push(player);
        const hidden = transcript(task.audio);
        hidden.hidden = true;
        transcripts.push(hidden);
        body.append(el("div", { className: "card field" }, [player.element, hidden]));
      }
      task.items.forEach(function (item) {
        number++;
        body.append(questionBlock(item, number, task.kind === "truefalse"));
      });
    });

    const resultArea = el("div");
    const handInButton = el("button", { className: "btn btn--block", type: "button", onClick: handIn }, [t("exam.handIn")]);
    body.append(handInButton, resultArea);

    /** Marks every answer, shows the score and saves it. */
    function handIn() {
      if (handedIn) return;
      handedIn = true;
      timer.stop();
      AppSpeech.stop();

      let right = 0;
      questions.forEach(function (record) {
        record.optionButtons.forEach(function (button) { button.disabled = true; });
        record.rightButton.classList.add("option--correct");
        if (record.chosen && record.chosen.isRight) right++;
        else if (record.chosen) record.optionButtons.find(function (b) { return b.classList.contains("option--chosen"); }).classList.add("option--wrong");
        // From now on only right (green) and wrong (red) are shown.
        record.optionButtons.forEach(function (button) { button.classList.remove("option--chosen"); });
      });
      players.forEach(function (player) { player.unlock(); });
      transcripts.forEach(function (box) { box.hidden = false; });

      const percent = Math.round((right / questions.length) * 100);
      savePartResult(context, test, part.id, percent);
      context.recordStudy(right * POINTS_PER_RIGHT_ANSWER, "exam-" + test.id + "-" + part.id, right, questions.length);

      handInButton.remove();
      resultArea.replaceChildren(el("div", { className: "card quiz__result" }, [
        el("p", { className: "quiz__score" }, [t("common.score", { correct: right, total: questions.length })]),
        el("p", {}, [percentBadge(percent)]),
        el("p", { className: "muted small" }, [t(isListening ? "exam.reviewListening" : "exam.reviewReading")]),
        el("button", { className: "btn btn--block", type: "button", onClick: function () { context.navigate("module/exam/test/" + test.id); } }, [t("exam.backToTest")])
      ]));
      resultArea.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const timer = timerBar(part.minutes, function () {
      AppUI.showToast(t("exam.timeUp"));
      handIn();
    });

    container.append(
      parts.buildHeader(t("exam.part." + part.id), "module/exam/test/" + test.id, context),
      timer.element,
      body,
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Self-check (writing and speaking) =====

  /**
   * Checklist with tick boxes and a "Save" button. The percent is the share
   * of boxes ticked; it is saved as the result of the part.
   */
  function selfCheckCard(context, test, part, checklist, onSaved) {
    const boxes = checklist.map(function (entry, index) {
      const box = el("input", { type: "checkbox", id: "check-" + index });
      return { box: box, row: el("label", { className: "check-row", for: "check-" + index }, [box, el("span", {}, [entry[lang()]])]) };
    });
    const saveButton = el("button", { className: "btn btn--block", type: "button" }, [t("exam.saveSelfCheck")]);
    saveButton.addEventListener("click", function () {
      const ticked = boxes.filter(function (b) { return b.box.checked; }).length;
      const percent = Math.round((ticked / boxes.length) * 100);
      savePartResult(context, test, part.id, percent);
      context.recordStudy(ticked * POINTS_PER_RIGHT_ANSWER, "exam-" + test.id + "-" + part.id, ticked, boxes.length);
      boxes.forEach(function (b) { b.box.disabled = true; });
      saveButton.remove();
      onSaved(percent);
    });
    return el("div", { className: "card field" }, [
      el("p", { className: "today-card__title" }, [t("exam.selfCheckTitle")]),
      el("p", { className: "muted small" }, [t("exam.selfCheckHint")]),
      el("div", { className: "check-list" }, boxes.map(function (b) { return b.row; })),
      saveButton
    ]);
  }

  /** Result card shown after saving a self-check. */
  function savedCard(context, test, percent) {
    return el("div", { className: "card quiz__result" }, [
      el("p", {}, [percentBadge(percent)]),
      el("button", { className: "btn btn--block", type: "button", onClick: function () { context.navigate("module/exam/test/" + test.id); } }, [t("exam.backToTest")])
    ]);
  }

  /** A model answer: text (line breaks kept) and a button to hear it. */
  function modelAnswer(text) {
    return el("div", { className: "exam-model" }, [
      el("div", { className: "exam-model__head" }, [el("span", { className: "muted small" }, [t("exam.model")]), AppQuiz.speakButton(text.replace(/\n/g, " "))]),
      el("div", {}, text.split("\n").map(function (line) { return el("p", { className: "sk-cell" }, [line]); }))
    ]);
  }

  // ===== Writing =====

  function writingPart(container, context, test, part) {
    const parts = AppScreens.parts;
    const results = testResults(context, test.id);
    const savedTexts = results.writingTexts || [];
    const body = el("section", { className: "content exam-part" });
    const textAreas = [];
    const afterAreas = [];
    let handedIn = false;

    part.tasks.forEach(function (task, index) {
      const counter = el("p", { className: "muted small exam-counter" });
      const area = el("textarea", { className: "exam-textarea", rows: "7", lang: "sk", spellcheck: "false", "aria-label": t("exam.yourText") });
      area.value = savedTexts[index] || "";

      /** Shows "23 words (20–35)" and marks it when out of range. */
      function updateCounter() {
        const words = countWords(area.value);
        counter.textContent = t("exam.wordCount", { words: words, min: task.minWords, max: task.maxWords });
        counter.classList.toggle("exam-counter--off", words < task.minWords || words > task.maxWords);
      }
      area.addEventListener("input", updateCounter);
      updateCounter();
      textAreas.push(area);

      const after = el("div");
      afterAreas.push(after);
      body.append(
        el("p", { className: "exam-instruction" }, [task.instruction[lang()]]),
        el("div", { className: "card field" }, [area, counter]),
        after
      );
    });

    const resultArea = el("div");
    const handInButton = el("button", { className: "btn btn--block", type: "button", onClick: handIn }, [t("exam.handIn")]);
    body.append(handInButton, resultArea);

    /** Locks the texts, keeps them, and shows the models and the checklist. */
    function handIn() {
      if (handedIn) return;
      handedIn = true;
      timer.stop();
      results.writingTexts = textAreas.map(function (area) { return area.value; });
      context.saveData();

      textAreas.forEach(function (area) { area.readOnly = true; });
      part.tasks.forEach(function (task, index) { afterAreas[index].append(el("div", { className: "card field" }, [modelAnswer(task.model)])); });

      const checklist = [];
      part.tasks.forEach(function (task) { task.checklist.forEach(function (entry) { checklist.push(entry); }); });
      handInButton.remove();
      resultArea.append(selfCheckCard(context, test, part, checklist, function (percent) {
        resultArea.append(savedCard(context, test, percent));
      }));
      afterAreas[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const timer = timerBar(part.minutes, function () {
      AppUI.showToast(t("exam.timeUp"));
      handIn();
    });

    container.append(
      parts.buildHeader(t("exam.part.writing"), "module/exam/test/" + test.id, context),
      timer.element,
      body,
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Speaking =====

  /** Button that reveals a model answer when tapped. */
  function revealModel(text) {
    const holder = el("div");
    const button = el("button", { className: "btn btn--secondary exam-reveal", type: "button" }, [t("exam.showModel")]);
    button.addEventListener("click", function () { button.replaceWith(modelAnswer(text)); });
    holder.append(button);
    return holder;
  }

  /** "Start talking" button with its own countdown (does not end the part). */
  function talkTimer(seconds) {
    const button = el("button", { className: "btn exam-talk", type: "button" }, [icon("clock"), t("exam.startTalking", { time: clockText(seconds) })]);
    let interval = null;
    button.addEventListener("click", function () {
      if (interval) return;
      let left = seconds;
      button.disabled = true;
      interval = setInterval(function () {
        left--;
        button.replaceChildren(icon("clock"), clockText(left));
        if (left <= 0) {
          clearInterval(interval);
          button.replaceChildren(t("exam.timeDone"));
        }
      }, 1000);
    });
    return button;
  }

  function speakingPart(container, context, test, part) {
    const parts = AppScreens.parts;
    const body = el("section", { className: "content exam-part" });

    part.tasks.forEach(function (task) {
      body.append(el("p", { className: "exam-instruction" }, [task.instruction[lang()]]));

      if (task.kind === "questions") {
        task.items.forEach(function (item, index) {
          body.append(el("div", { className: "card field exam-item" }, [
            el("div", { className: "exam-model__head" }, [
              el("p", { className: "exam-question" }, [(index + 1) + ". " + item.question]),
              AppQuiz.speakButton(item.question)
            ]),
            revealModel(item.model)
          ]));
        });
      } else if (task.kind === "monologue") {
        body.append(el("div", { className: "card field exam-item" }, [
          el("p", { className: "sk-text" }, [task.topic]),
          el("ul", { className: "exam-prompts" }, task.prompts.map(function (prompt) { return el("li", {}, [prompt]); })),
          talkTimer(task.seconds),
          revealModel(task.model)
        ]));
      } else if (task.kind === "roleplay") {
        // The examiner's lines are heard one by one; the text stays hidden until asked.
        task.turns.forEach(function (turn, index) {
          const lineText = el("p", { className: "exam-question", hidden: true }, [turn.line]);
          const showText = el("button", { className: "link-btn", type: "button" }, [t("exam.showText")]);
          showText.addEventListener("click", function () { lineText.hidden = false; showText.remove(); });
          body.append(el("div", { className: "card field exam-item" }, [
            el("div", { className: "exam-model__head" }, [
              el("span", { className: "muted small" }, [t("exam.examinerLine", { n: index + 1 })]),
              AppQuiz.speakButton(turn.line)
            ]),
            lineText,
            showText,
            revealModel(turn.model)
          ]));
        });
      }
    });

    const resultArea = el("div");
    resultArea.append(selfCheckCard(context, test, part, part.checklist, function (percent) {
      timer.stop();
      resultArea.append(savedCard(context, test, percent));
    }));
    body.append(resultArea);

    // In the oral part the time is a guide: when it ends, nothing is locked.
    const timer = timerBar(part.minutes, function () { AppUI.showToast(t("exam.timeUp")); });

    container.append(
      parts.buildHeader(t("exam.part.speaking"), "module/exam/test/" + test.id, context),
      timer.element,
      body,
      parts.buildBottomNav("home", context)
    );
  }

  // ===== Router for this module =====

  function route(container, context, subParts) {
    stopTimer(); // a part left half-way stops counting
    AppSpeech.stop();

    if (subParts[0] === "test") {
      const test = findTest(subParts[1]);
      if (test) {
        const part = subParts[2] ? findPart(test, subParts[2]) : null;
        if (!part) { testPage(container, context, test); return; }
        if (part.id === "writing") writingPart(container, context, test, part);
        else if (part.id === "speaking") speakingPart(container, context, test, part);
        else objectivePart(container, context, test, part);
        return;
      }
    }
    startPage(container, context);
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.exam = route;

  // Leaving the exam module (e.g. with the bottom bar) also stops the timer.
  window.addEventListener("hashchange", function () {
    if (window.location.hash.indexOf("#/module/exam") !== 0) { stopTimer(); AppSpeech.stop(); }
  });
})();
