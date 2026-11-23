/*
 * screens-review.js — Spaced review with flash cards (module "review").
 *
 * Addresses (after #/module/review):
 *   (nothing)          -> today's summary, the topic decks and "My decks"
 *   deck/<id>          -> one deck: its cards; own decks can be edited here
 *   session            -> review session with every deck
 *   session/<deckId>   -> review session with one deck
 *
 * A session shows the Slovak word (with its drawing and audio); the
 * learner thinks of the meaning, reveals it and says how well they knew it.
 * Scheduling is done by js/srs.js.
 *
 * Depends on: srs.js (AppSRS), data/vocabulary.js, ui.js, i18n.js,
 * speech.js, screens.js (AppScreens.parts) and quiz.js (speakButton).
 */

(function () {
  "use strict";

  const el = AppUI.el;
  const icon = AppUI.icon;
  const t = AppText.t;

  // Points given at the end of a session, per card.
  const POINTS = { known: 5, hard: 2, again: 0 };

  function lang() { return AppText.getLanguage(); }

  // ===== Small builders =====

  /** Drawing of a card or deck, or the first letter when there is none. */
  function picture(emoji, fallbackText, extraClass) {
    if (emoji) {
      return el("img", { className: "pic " + (extraClass || ""), src: AppSRS.iconUrl(emoji), alt: "", loading: "lazy" });
    }
    return el("span", { className: "pic pic--letter " + (extraClass || ""), "aria-hidden": "true" }, [fallbackText.slice(0, 1).toUpperCase()]);
  }

  /** "12 por repasar · 3 nuevas · 20 aprendidas" for a deck. */
  function statsText(stats) {
    return t("review.statsLine", { due: stats.due, fresh: stats.fresh, learned: stats.learned });
  }

  /** Meaning of a card in the current language (own cards have one meaning for both). */
  function meaningOf(card) {
    return card[lang()] || card.es || card.en || "";
  }

  /** Finds a deck (built-in or own) by id. */
  function findDeck(deckId, context) {
    return AppSRS.allDecks(context.getData()).find(function (deck) { return deck.id === deckId; });
  }

  /**
   * A button that asks for a second tap before doing something that cannot
   * be undone (deleting), instead of a browser pop-up.
   */
  function confirmButton(label, confirmLabel, action) {
    let armed = false;
    const button = el("button", { className: "btn btn--secondary btn--danger", type: "button" }, [label]);
    button.addEventListener("click", function () {
      if (armed) { action(); return; }
      armed = true;
      button.textContent = confirmLabel;
      setTimeout(function () { armed = false; button.textContent = label; }, 4000);
    });
    return button;
  }

  // ===== Start page =====

  function startPage(container, context) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const decks = AppSRS.allDecks(data);
    const session = AppSRS.buildSession(decks, data);

    const deckRow = function (deck) {
      return el("li", {}, [
        el("button", { className: "list-row", "data-deck": deck.id, onClick: function () { context.navigate("module/review/deck/" + deck.id); } }, [
          picture(deck.icon, deck.title ? deck.title.sk : deck.name, "pic--chip"),
          el("span", { className: "list-row__text" }, [
            el("span", { className: "list-row__title" }, [deck.title ? deck.title[lang()] : deck.name]),
            el("span", { className: "list-row__subtitle" }, [statsText(AppSRS.deckStats(deck, data))])
          ]),
          el("span", { className: "list-row__chevron" }, [icon("chevronRight")])
        ])
      ]);
    };

    const builtIn = decks.filter(function (deck) { return !deck.custom; });
    const own = decks.filter(function (deck) { return deck.custom; });

    // Form to create an own deck.
    const nameInput = el("input", { type: "text", id: "new-deck-name", maxlength: "40", placeholder: t("review.newDeckPlaceholder") });
    const newDeckForm = el("form", {
      className: "field",
      onSubmit: function (event) {
        event.preventDefault();
        createDeck(nameInput.value.trim(), context);
      }
    }, [
      el("label", { for: "new-deck-name", className: "muted" }, [t("review.newDeckHint")]),
      el("div", { className: "field__row" }, [nameInput, el("button", { className: "btn", type: "submit" }, [t("review.create")])])
    ]);

    const hasReadingDeck = own.some(function (deck) { return deck.name === t("review.readingDeckName"); });

    container.append(
      parts.buildHeader(t("review.title"), "home", context),
      el("section", { className: "content" }, [
        el("div", { className: "card today-card" }, [
          el("p", { className: "today-card__title" }, [t("review.todayTitle")]),
          el("p", { className: "muted" }, [
            session.length ? t("review.todayCount", { count: session.length }) : t("review.nothingToday")
          ]),
          session.length ? el("button", {
            className: "btn btn--block today-card__button",
            onClick: function () { context.navigate("module/review/session"); }
          }, [icon("play"), t("review.start")]) : null
        ]),
        el("p", { className: "muted small note" }, [t("review.howItWorks", { count: AppSRS.NEW_CARDS_PER_DAY })]),
        parts.sectionLabel(t("review.topicDecks")),
        el("ul", { className: "card list" }, builtIn.map(deckRow)),
        parts.sectionLabel(t("review.myDecks")),
        own.length ? el("ul", { className: "card list" }, own.map(deckRow)) : null,
        el("div", { className: "card" + (own.length ? " card--spaced" : "") }, [newDeckForm]),
        hasReadingDeck ? null : el("button", {
          className: "btn btn--secondary btn--block",
          onClick: function () { createDeck(t("review.readingDeckName"), context); }
        }, [t("review.createReadingDeck")]),
        el("p", { className: "muted small note" }, [t("review.credits")])
      ]),
      parts.buildBottomNav("home", context)
    );
  }

  /** Creates an own deck and opens it. */
  function createDeck(name, context) {
    if (!name) return;
    const deck = { id: "my-" + Date.now().toString(36), name: name, icon: null, cards: [] };
    context.getData().progress.customDecks.push(deck);
    context.saveData();
    context.navigate("module/review/deck/" + deck.id);
  }

  // ===== One deck =====

  function deckPage(container, context, deck) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const stats = AppSRS.deckStats(deck, data);
    const title = deck.title ? deck.title[lang()] : deck.name;

    const cardRows = deck.cards.map(function (card, index) {
      const row = el("li", { className: "phrase-row" }, [
        card.icon ? picture(card.icon, card.sk, "pic--small") : null,
        el("div", { className: "phrase-row__text" }, [
          el("span", { className: "phrase-row__sk" }, [card.sk]),
          el("span", { className: "muted small" }, [meaningOf(card)])
        ]),
        AppQuiz.speakButton(card.sk)
      ]);
      if (deck.custom) {
        row.append(el("button", {
          className: "icon-btn",
          type: "button",
          "aria-label": t("review.deleteCard"),
          onClick: function () { deleteCard(deck.id, index, context); }
        }, ["×"]));
      }
      return row;
    });

    const content = [
      el("p", { className: "muted" }, [statsText(stats)]),
      el("button", {
        className: "btn btn--block",
        disabled: stats.due + stats.fresh === 0,
        onClick: function () { context.navigate("module/review/session/" + deck.id); }
      }, [icon("play"), t("review.reviewDeck")])
    ];

    if (deck.custom) content.push(parts.sectionLabel(t("review.addCard")), buildAddCardForm(deck, context));

    content.push(
      parts.sectionLabel(t("review.cards", { count: deck.cards.length })),
      deck.cards.length ? el("ul", { className: "card list" }, cardRows) : el("p", { className: "muted" }, [t("review.emptyDeck")])
    );

    if (deck.custom) {
      content.push(el("div", { className: "danger-zone" }, [
        confirmButton(t("review.deleteDeck"), t("review.deleteDeckConfirm"), function () {
          const progress = context.getData().progress;
          progress.customDecks = progress.customDecks.filter(function (item) { return item.id !== deck.id; });
          context.saveData();
          context.navigate("module/review");
        })
      ]));
    }

    container.append(
      parts.buildHeader(title, "module/review", context),
      el("section", { className: "content" }, content),
      parts.buildBottomNav("home", context)
    );
  }

  /** Form to add a word to an own deck: Slovak, meaning and an optional example. */
  function buildAddCardForm(deck, context) {
    const skInput = el("input", { type: "text", id: "card-sk", maxlength: "60", placeholder: t("review.skPlaceholder"), lang: "sk" });
    const meaningInput = el("input", { type: "text", id: "card-meaning", maxlength: "80", placeholder: t("review.meaningPlaceholder") });
    const exampleInput = el("input", { type: "text", id: "card-example", maxlength: "120", placeholder: t("review.examplePlaceholder"), lang: "sk" });
    const errorLine = el("p", { className: "form-error", role: "alert" });

    return el("form", {
      className: "card field stack-small",
      onSubmit: function (event) {
        event.preventDefault();
        const sk = skInput.value.trim();
        const meaning = meaningInput.value.trim();
        if (!sk || !meaning) { errorLine.textContent = t("review.fillBoth"); return; }

        const ownDeck = context.getData().progress.customDecks.find(function (item) { return item.id === deck.id; });
        if (ownDeck.cards.some(function (card) { return card.sk === sk; })) { errorLine.textContent = t("review.duplicate"); return; }

        const example = exampleInput.value.trim();
        // Own cards keep one meaning, used for both interface languages.
        ownDeck.cards.push({ sk: sk, es: meaning, en: meaning, icon: null, ex: example ? { sk: example, es: "", en: "" } : null });
        context.saveData();
        context.rerender();
        AppUI.showToast(t("review.cardAdded"));
      }
    }, [
      el("label", { for: "card-sk" }, [t("review.skLabel")]), skInput,
      el("label", { for: "card-meaning" }, [t("review.meaningLabel")]), meaningInput,
      el("label", { for: "card-example" }, [t("review.exampleLabel")]), exampleInput,
      errorLine,
      el("button", { className: "btn", type: "submit" }, [t("review.addCardButton")])
    ]);
  }

  /** Removes a card from an own deck (its review history is forgotten too). */
  function deleteCard(deckId, cardIndex, context) {
    const progress = context.getData().progress;
    const deck = progress.customDecks.find(function (item) { return item.id === deckId; });
    const removed = deck.cards.splice(cardIndex, 1)[0];
    delete progress.cards[deckId + ":" + removed.sk];
    context.saveData();
    context.rerender();
  }

  // ===== Review session =====

  function sessionPage(container, context, deckId) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const decks = deckId ? [findDeck(deckId, context)].filter(Boolean) : AppSRS.allDecks(data);
    const queue = AppSRS.buildSession(decks, data, Boolean(deckId));
    const backRoute = deckId ? "module/review/deck/" + deckId : "module/review";

    const body = el("section", { className: "content" });
    container.append(parts.buildHeader(t("review.sessionTitle"), backRoute, context), body, parts.buildBottomNav("home", context));

    if (!queue.length) {
      body.append(el("div", { className: "card quiz__result" }, [el("p", {}, [t("review.nothingToday")])]));
      return;
    }

    const repeated = new Set(); // cards already sent back once in this session
    const totalAtStart = queue.length;
    let done = 0;
    let points = 0;

    /** Shows the front of the next card (Slovak side). */
    function showCard() {
      const entry = queue[0];
      const card = entry.card;
      body.replaceChildren();

      body.append(
        el("div", { className: "quiz__progress" }, [
          el("div", { className: "quiz__progress-fill", style: "width:" + Math.round(done / (done + queue.length) * 100) + "%" })
        ]),
        el("p", { className: "muted small" }, [t("review.left", { count: queue.length })])
      );

      const genderLine = card.g ? el("span", { className: "pill" }, [t("review.gender." + card.g)]) : null;
      const back = el("div", { className: "flash__back", hidden: true }, [
        el("p", { className: "flash__meaning" }, [meaningOf(card)]),
        card.ex ? el("div", { className: "phrase-row flash__example" }, [
          el("div", { className: "phrase-row__text" }, [
            el("span", { className: "phrase-row__sk" }, [card.ex.sk]),
            card.ex[lang()] ? el("span", { className: "muted small" }, [card.ex[lang()]]) : null
          ]),
          AppQuiz.speakButton(card.ex.sk)
        ]) : null
      ]);

      const gradeButtons = el("div", { className: "grade-row", hidden: true }, [
        el("button", { className: "btn grade grade--again", type: "button", onClick: function () { answer("again"); } }, [t("review.again")]),
        el("button", { className: "btn grade grade--hard", type: "button", onClick: function () { answer("hard"); } }, [t("review.hard")]),
        el("button", { className: "btn grade grade--known", type: "button", onClick: function () { answer("known"); } }, [t("review.known")])
      ]);

      const showButton = el("button", {
        className: "btn btn--block",
        type: "button",
        onClick: function () {
          back.hidden = false;
          gradeButtons.hidden = false;
          showButton.hidden = true;
        }
      }, [t("review.show")]);

      body.append(
        el("div", { className: "card flash" }, [
          card.icon ? picture(card.icon, card.sk, "pic--large") : null,
          el("div", { className: "flash__word-row" }, [
            el("p", { className: "flash__word" }, [card.sk]),
            AppQuiz.speakButton(card.sk)
          ]),
          genderLine,
          back
        ]),
        showButton,
        gradeButtons
      );
      AppSpeech.speak(card.sk);

      /** Saves the answer and moves on. "Again" sends the card to the end once. */
      function answer(grade) {
        AppSRS.grade(entry, grade, context.getData());
        context.saveData();
        points += POINTS[grade];
        queue.shift();
        if (grade === "again" && !repeated.has(entry.id)) {
          repeated.add(entry.id);
          queue.push(entry);
        } else {
          done++;
        }
        if (queue.length) showCard(); else showEnd();
        window.scrollTo(0, 0);
      }
    }

    /** End of the session: summary and points. */
    function showEnd() {
      context.recordStudy(points, null, done, totalAtStart);
      body.replaceChildren(el("div", { className: "card quiz__result" }, [
        el("p", { className: "quiz__score" }, [t("review.finished", { count: totalAtStart })]),
        el("p", { className: "quiz__points" }, [t("common.pointsEarned", { points: points })]),
        el("button", { className: "btn btn--block", type: "button", onClick: function () { context.navigate(backRoute); } }, [t("common.back")])
      ]));
    }

    showCard();
  }

  // ===== Router for this module =====

  function route(container, context, subParts) {
    const page = subParts[0];
    if (page === "deck") {
      const deck = findDeck(subParts[1], context);
      if (deck) { deckPage(container, context, deck); return; }
    } else if (page === "session") {
      sessionPage(container, context, subParts[1]);
      return;
    }
    startPage(container, context);
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.review = route;
})();
