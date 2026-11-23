/*
 * quiz.js — Shared multiple-choice exercise screen (used by the case
 * workshop and by the lessons).
 *
 * How to use:
 *   AppQuiz.start(container, context, {
 *     title: "Práctica",            // shown in the header
 *     backRoute: "module/cases",    // where the back arrow and "Back" go
 *     resultKey: "cases-all",       // name under which the best score is saved
 *     questions: [ {
 *       prompt: "Elige la forma…",  // instruction in the base language
 *       skText: "Idem do ___.",     // Slovak text shown big (optional)
 *       audioText: "sedem",         // if set, a big "Listen" button plays it
 *       options: ["mesta", "meste"],
 *       answerIndex: 0,             // which option is right (before shuffling)
 *       slovakOptions: true,        // options are Slovak: tap-to-hear after answering
 *       afterAnswer: { sk: "Idem do mesta.", text: "Voy a la ciudad." } // optional
 *     } ]
 *   })
 *
 * Every right answer is worth POINTS_PER_ANSWER points, given at the end.
 *
 * Depends on: ui.js (AppUI), i18n.js (AppText), speech.js (AppSpeech),
 * screens.js (AppScreens.parts for the header and navigation bar).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  // ===== Configuration =====

  const POINTS_PER_ANSWER = 10;

  // ===== Helpers =====

  /** Returns a shuffled copy of an array (Fisher–Yates shuffle). */
  function shuffled(items) {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temporary = copy[i];
      copy[i] = copy[j];
      copy[j] = temporary;
    }
    return copy;
  }

  /** A round button that reads a Slovak text aloud. */
  function speakButton(skText, extraClass) {
    return el("button", {
      className: "speak-btn" + (extraClass ? " " + extraClass : ""),
      type: "button",
      "aria-label": t("common.listen"),
      onClick: function (event) {
        event.stopPropagation(); // do not trigger the row or option behind it
        AppSpeech.speak(skText);
      }
    }, [icon("speaker")]);
  }

  // ===== Quiz flow =====

  /** Starts a quiz: shows the questions one by one, then the result. */
  function start(container, context, settings) {
    const parts = AppScreens.parts;

    // Shuffle the question order, and the options inside each question,
    // remembering where the right answer ends up.
    const questions = shuffled(settings.questions).map(function (question) {
      const order = shuffled(question.options.map(function (_, index) { return index; }));
      return Object.assign({}, question, {
        options: order.map(function (index) { return question.options[index]; }),
        answerIndex: order.indexOf(question.answerIndex)
      });
    });

    let currentIndex = 0;
    let correctCount = 0;

    // The header and bottom bar stay; only the body changes between questions.
    const body = el("section", { className: "content quiz" });
    container.append(
      parts.buildHeader(settings.title, settings.backRoute, context),
      body,
      parts.buildBottomNav("home", context)
    );

    /** Draws the current question. */
    function showQuestion() {
      const question = questions[currentIndex];
      body.replaceChildren();

      // Progress bar: how far through the quiz we are.
      const percent = Math.round((currentIndex / questions.length) * 100);
      body.append(
        el("div", { className: "quiz__progress", role: "progressbar", "aria-valuenow": String(percent), "aria-valuemin": "0", "aria-valuemax": "100" }, [
          el("div", { className: "quiz__progress-fill", style: "width:" + percent + "%" })
        ]),
        el("p", { className: "muted small" }, [t("common.question", { n: currentIndex + 1, total: questions.length })])
      );

      // The prompt: instruction, Slovak text and/or a listen button.
      const promptCard = el("div", { className: "card quiz__prompt" }, [
        el("p", { className: "muted" }, [question.prompt])
      ]);
      if (question.audioText) {
        promptCard.append(el("button", {
          className: "btn quiz__listen",
          type: "button",
          onClick: function () { AppSpeech.speak(question.audioText); }
        }, [icon("play"), t("common.listen")]));
      }
      if (question.skText) {
        promptCard.append(el("p", { className: "sk-text" }, [question.skText]));
      }
      body.append(promptCard);

      // The options. After one is chosen, all are locked and coloured.
      const feedbackArea = el("div", { className: "quiz__feedback" });
      const optionButtons = question.options.map(function (optionText, optionIndex) {
        return el("button", {
          className: "option" + (question.slovakOptions ? " option--sk" : ""),
          type: "button",
          onClick: function () { answer(optionIndex); }
        }, [optionText]);
      });
      body.append(el("div", { className: "quiz__options" }, optionButtons), feedbackArea);

      if (question.audioText) AppSpeech.speak(question.audioText); // play once on arrival

      /** Marks the chosen option, shows the explanation and the "Next" button. */
      function answer(chosenIndex) {
        const isRight = chosenIndex === question.answerIndex;
        if (isRight) correctCount++;

        optionButtons.forEach(function (button, index) {
          button.disabled = true;
          if (index === question.answerIndex) button.classList.add("option--correct");
          else if (index === chosenIndex) button.classList.add("option--wrong");
        });

        const rightText = question.options[question.answerIndex];
        const verdict = isRight
          ? t("common.correct")
          : t("common.incorrect", { answer: rightText });

        const feedback = el("div", { className: "card quiz__explanation " + (isRight ? "is-right" : "is-wrong") }, [
          el("p", { className: "quiz__verdict" }, [verdict])
        ]);
        if (question.afterAnswer) {
          feedback.append(el("div", { className: "phrase-row" }, [
            el("div", { className: "phrase-row__text" }, [
              el("span", { className: "phrase-row__sk" }, [question.afterAnswer.sk]),
              el("span", { className: "muted small" }, [question.afterAnswer.text])
            ]),
            speakButton(question.afterAnswer.sk)
          ]));
          AppSpeech.speak(question.afterAnswer.sk);
        }

        const isLast = currentIndex === questions.length - 1;
        feedback.append(el("button", {
          className: "btn quiz__next",
          type: "button",
          onClick: function () {
            if (isLast) {
              showResult();
            } else {
              currentIndex++;
              showQuestion();
              window.scrollTo(0, 0);
            }
          }
        }, [isLast ? t("common.finish") : t("common.next")]));

        feedbackArea.append(feedback);
        feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }

    /** Shows the score, gives the points and offers to repeat. */
    function showResult() {
      const points = correctCount * POINTS_PER_ANSWER;
      context.recordStudy(points, settings.resultKey, correctCount, questions.length);

      body.replaceChildren(
        el("div", { className: "card quiz__result" }, [
          el("p", { className: "quiz__score" }, [t("common.score", { correct: correctCount, total: questions.length })]),
          el("p", { className: "quiz__points" }, [t("common.pointsEarned", { points: points })]),
          el("div", { className: "button-row" }, [
            el("button", { className: "btn btn--secondary", type: "button", onClick: function () { context.navigate(settings.backRoute); } }, [t("common.back")]),
            el("button", { className: "btn", type: "button", onClick: function () { context.rerender(); } }, [t("common.retry")])
          ])
        ])
      );
    }

    showQuestion();
  }

  window.AppQuiz = {
    start: start,
    speakButton: speakButton,
    shuffled: shuffled
  };
})();
