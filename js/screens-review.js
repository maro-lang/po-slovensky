/*
 * screens-review.js — Spaced review with flash cards (module "review").
 *
 * Addresses (after #/module/review):
 *   (nothing)          -> word search, today's summary (with the level
 *                         chooser All / A1 / A2 / B1), the topic decks and "My decks"
 *   deck/<id>          -> one deck: its cards; own decks can be edited here
 *   deck/<id>/<n>      -> the same deck with card number n highlighted
 *                         (where a search result leads)
 *   session            -> review session with every deck of the chosen level
 *                         (settings.reviewLevel; "all" also includes own decks)
 *   session/<deckId>   -> review session with one deck (cards due and new ones)
 *   session/<deckId>/all -> "review again": every card of the deck, even if none
 *                         is due. Only "I didn't know it" changes the schedule
 *                         (the card comes back tomorrow); the rest is free practice.
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
  function picture(emoji, fallbackText, extraClass, badgeEmoji) {
    // Two drawings: the main one plus a small hint in the corner
    // (for words without a direct picture, e.g. "lacný" = coin + down arrow).
    if (emoji && badgeEmoji) {
      return el("span", { className: "pic pic-combo " + (extraClass || ""), "aria-hidden": "true" }, [
        el("img", { className: "pic-combo__main", src: AppSRS.iconUrl(emoji), alt: "", loading: "lazy" }),
        el("img", { className: "pic-combo__badge", src: AppSRS.iconUrl(badgeEmoji), alt: "", loading: "lazy" })
      ]);
    }
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

  // ===== Review by level =====

  // Choices for the general review: every deck, or only one level's decks.
  const REVIEW_LEVELS = ["all", "A1", "A2", "B1"];

  /** The level chosen for the general review ("all" if none was chosen yet). */
  function chosenReviewLevel(data) {
    const level = data.settings.reviewLevel;
    return REVIEW_LEVELS.indexOf(level) >= 0 ? level : "all";
  }

  /**
   * Decks used by the general review. With one level chosen, only the
   * built-in decks of that level; own decks have no level, so they are
   * only included in "all".
   */
  function decksForReview(data) {
    const decks = AppSRS.allDecks(data);
    const level = chosenReviewLevel(data);
    if (level === "all") return decks;
    return decks.filter(function (deck) { return !deck.custom && deck.level === level; });
  }

  /** Joined buttons All / A1 / A2 / B1; choosing one saves it and redraws the page. */
  function buildLevelChooser(context) {
    const current = chosenReviewLevel(context.getData());
    return el("div", { className: "segmented segmented--four review-levels", role: "group", "aria-label": t("review.levelChooser") },
      REVIEW_LEVELS.map(function (level) {
        const isActive = level === current;
        return el("button", {
          type: "button",
          className: "segmented__option" + (isActive ? " segmented__option--active" : ""),
          "aria-pressed": String(isActive),
          "data-review-level": level,
          onClick: function () {
            context.getData().settings.reviewLevel = level;
            context.saveData();
            context.rerender();
          }
        }, [level === "all" ? t("review.levelAll") : level]);
      }));
  }

  // ===== Word search =====

  // Most results shown at once; with more, the learner is asked to type more letters.
  const MAX_SEARCH_RESULTS = 50;

  // Text in the search box. Kept outside the page so it is still there when
  // the learner opens a deck from a result and comes back.
  let lastSearch = "";

  /**
   * Lower case without accents or háčeks, so "zena" finds "žena",
   * "dakujem" finds "ďakujem" and "cancion" finds "canción".
   * (NFD splits "ž" into "z" + a combining mark; the marks are then removed.)
   */
  function simplify(text) {
    return String(text || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  /**
   * How well a text matches the search (lower is better), or -1 if it does not:
   * 0 = the whole text, 1 = the start of the text, 2 = the start of one of
   * its words, 3 = anywhere inside a word.
   */
  function matchRank(text, query) {
    const simple = simplify(text);
    const position = simple.indexOf(query);
    if (position < 0) return -1;
    if (simple === query) return 0;
    if (position === 0) return 1;
    // A word starts after a space, a comma, a slash, a bracket, etc.
    if (/[^a-z0-9]/.test(simple.charAt(position - 1))) return 2;
    return 3;
  }

  /**
   * Every card (of every deck, built-in and own) whose Slovak word or meaning
   * in the current language matches the search. Best matches first, then in
   * Slovak alphabetical order. Each result is { deck, card, index, rank }.
   */
  function searchCards(decks, searchText) {
    const query = simplify(searchText.trim());
    if (!query) return [];
    const results = [];
    decks.forEach(function (deck) {
      deck.cards.forEach(function (card, index) {
        const ranks = [matchRank(card.sk, query), matchRank(meaningOf(card), query)].filter(function (rank) { return rank >= 0; });
        if (ranks.length) results.push({ deck: deck, card: card, index: index, rank: Math.min.apply(null, ranks) });
      });
    });
    results.sort(function (a, b) { return a.rank - b.rank || a.card.sk.localeCompare(b.card.sk, "sk"); });
    return results;
  }

  /** One search result: drawing, word, meaning, its deck and a speaker button. */
  function searchResultRow(result, context) {
    const deck = result.deck;
    const card = result.card;
    const deckTitle = deck.title ? deck.title[lang()] : deck.name;
    return el("li", { className: "phrase-row search-hit" }, [
      card.icon ? picture(card.icon, card.sk, "pic--small", card.icon2) : null,
      // The text is a button that opens the deck at this card.
      el("button", {
        type: "button",
        className: "search-hit__open",
        onClick: function () { context.navigate("module/review/deck/" + deck.id + "/" + result.index); }
      }, [
        el("span", { className: "phrase-row__sk" }, [card.sk]),
        el("span", { className: "muted small" }, [meaningOf(card)]),
        el("span", { className: "search-hit__deck" }, [(deck.level ? deck.level + " · " : "") + deckTitle])
      ]),
      AppQuiz.speakButton(card.sk)
    ]);
  }

  /**
   * The search box and the place where its results appear. While there is
   * text in the box, the rest of the page (`pageBlocks`) is hidden so the
   * results sit right under the box, above the phone's keyboard.
   */
  function buildSearch(context, pageBlocks) {
    const decks = AppSRS.allDecks(context.getData());
    const results = el("div", { className: "search-results", "aria-live": "polite" });
    const input = el("input", {
      type: "search", id: "word-search", autocomplete: "off", spellcheck: "false",
      enterkeyhint: "search", placeholder: t("review.searchPlaceholder"),
      "aria-label": t("review.searchLabel"),
      onInput: function () { lastSearch = input.value; drawResults(); }
    });
    input.value = lastSearch;

    /** Redraws the results for the current text (and shows or hides the rest of the page). */
    function drawResults() {
      const text = input.value.trim();
      pageBlocks.forEach(function (block) { if (block) block.hidden = Boolean(text); });
      results.replaceChildren();
      if (!text) return;

      const found = searchCards(decks, text);
      if (!found.length) {
        results.append(el("p", { className: "muted search-results__count" }, [t("review.searchNone", { text: text })]));
        return;
      }
      const shown = found.slice(0, MAX_SEARCH_RESULTS);
      const countText = found.length > shown.length
        ? t("review.searchMore", { shown: shown.length, count: found.length })
        : (found.length === 1 ? t("review.searchCountOne") : t("review.searchCount", { count: found.length }));
      results.append(
        el("p", { className: "muted small search-results__count" }, [countText]),
        el("ul", { className: "card list" }, shown.map(function (result) { return searchResultRow(result, context); }))
      );
    }

    // Draw at once if the learner comes back with text already in the box.
    drawResults();
    return el("div", { className: "search-block" }, [el("div", { className: "card field" }, [input]), results]);
  }

  // ===== Start page =====

  function startPage(container, context) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const decks = AppSRS.allDecks(data);
    const reviewLevel = chosenReviewLevel(data);
    const session = AppSRS.buildSession(decksForReview(data), data);

    const deckRow = function (deck) {
      return el("li", {}, [
        el("button", { className: "list-row" + (deck.custom ? "" : AppProgress.doneClass(data, "deck:" + deck.id)), "data-deck": deck.id, onClick: function () { context.navigate("module/review/deck/" + deck.id); } }, [
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

    // Everything below the search box; hidden while a search is shown.
    const restOfPage = el("div", { className: "review-start" }, [
      el("div", { className: "card today-card" }, [
        el("p", { className: "today-card__title" }, [t("review.todayTitle")]),
        buildLevelChooser(context),
        reviewLevel === "all" ? null : el("p", { className: "muted small review-levels__note" }, [t("review.levelOnly", { level: reviewLevel })]),
        el("p", { className: "muted" }, [
          session.length ? t("review.todayCount", { count: session.length }) : t("review.nothingToday")
        ]),
        session.length ? el("button", {
          className: "btn btn--block today-card__button",
          onClick: function () { context.navigate("module/review/session"); }
        }, [icon("play"), t("review.start")]) : null
      ]),
      el("p", { className: "muted small note" }, [t("review.howItWorks", { count: AppSRS.NEW_CARDS_PER_DAY })]),
    ].concat(
      // Built-in decks, one list per level (A1, A2, B1); levels without decks are skipped.
      AppProgress.LEVELS.reduce(function (blocks, level) {
        const levelDecks = builtIn.filter(function (deck) { return deck.level === level; });
        if (levelDecks.length) {
          blocks.push(parts.sectionLabel(t("review.levelDecks", { level: level, count: levelDecks.length })),
                      el("ul", { className: "card list" }, levelDecks.map(deckRow)));
        }
        return blocks;
      }, [])
    ).concat([
      parts.sectionLabel(t("review.myDecks")),
      own.length ? el("ul", { className: "card list" }, own.map(deckRow)) : null,
      el("div", { className: "card" + (own.length ? " card--spaced" : "") }, [newDeckForm]),
      hasReadingDeck ? null : el("button", {
        className: "btn btn--secondary btn--block",
        onClick: function () { createDeck(t("review.readingDeckName"), context); }
      }, [t("review.createReadingDeck")]),
      el("p", { className: "muted small note" }, [t("review.credits")])
    ]));

    container.append(
      parts.buildHeader(t("review.title"), "home", context),
      el("section", { className: "content" }, [buildSearch(context, [restOfPage]), restOfPage]),
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

  /**
   * One deck. `foundIndex` (optional) is the number of a card to highlight
   * and scroll to, when the learner arrives from a search result.
   */
  function deckPage(container, context, deck, foundIndex) {
    const parts = AppScreens.parts;
    const data = context.getData();
    const stats = AppSRS.deckStats(deck, data);
    const title = deck.title ? deck.title[lang()] : deck.name;

    const cardRows = deck.cards.map(function (card, index) {
      const row = el("li", { className: "phrase-row" + (index === foundIndex ? " phrase-row--found" : "") }, [
        card.icon ? picture(card.icon, card.sk, "pic--small", card.icon2) : null,
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

    // With cards due or new: the normal spaced review. With nothing pending
    // (and the deck not empty): "review again" with all its cards.
    const somethingPending = stats.due + stats.fresh > 0;
    const content = [
      el("p", { className: "muted" }, [statsText(stats)]),
      el("button", {
        className: "btn btn--block",
        disabled: deck.cards.length === 0,
        onClick: function () { context.navigate("module/review/session/" + deck.id + (somethingPending ? "" : "/all")); }
      }, [icon("play"), somethingPending ? t("review.reviewDeck") : t("review.reviewAgain", { count: deck.cards.length })])
    ];
    // Built-in decks count for the level bars: they can be marked by hand too.
    if (!deck.custom) content.push(el("div", { className: "complete-row" }, [AppProgress.completeButton(context, "deck:" + deck.id)]));

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

    // Bring the searched card into view (after the page has been laid out).
    const foundRow = container.querySelector(".phrase-row--found");
    if (foundRow) requestAnimationFrame(function () { foundRow.scrollIntoView({ block: "center" }); });
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

  /** Every card of the given decks, in random order (for "review again"). */
  function allCardsShuffled(decks) {
    const entries = [];
    decks.forEach(function (deck) {
      deck.cards.forEach(function (card) { entries.push({ id: deck.id + ":" + card.sk, deck: deck, card: card }); });
    });
    for (let i = entries.length - 1; i > 0; i--) {   // Fisher-Yates shuffle
      const j = Math.floor(Math.random() * (i + 1));
      const swap = entries[i]; entries[i] = entries[j]; entries[j] = swap;
    }
    return entries;
  }

  function sessionPage(container, context, deckId, practiceAll) {
    const parts = AppScreens.parts;
    const data = context.getData();
    // One deck, or (general review) the decks of the level chosen on the start page.
    const decks = deckId ? [findDeck(deckId, context)].filter(Boolean) : decksForReview(data);
    const queue = practiceAll ? allCardsShuffled(decks) : AppSRS.buildSession(decks, data, Boolean(deckId));
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
          card.icon ? picture(card.icon, card.sk, "pic--large", card.icon2) : null,
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
        // In "review again" the schedule is only touched when the learner did
        // not know the card (it comes back tomorrow); otherwise it is practice.
        if (!practiceAll || grade === "again") {
          AppSRS.grade(entry, grade, context.getData());
          context.saveData();
        }
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
      // A deck whose cards have all been reviewed counts as completed (level bars).
      AppProgress.markLearnedDecks(context.getData());
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
      // Optional card number (from a search result); anything else is ignored.
      const foundIndex = /^\d+$/.test(subParts[2] || "") ? Number(subParts[2]) : -1;
      if (deck) { deckPage(container, context, deck, foundIndex); return; }
    } else if (page === "session") {
      sessionPage(container, context, subParts[1], subParts[2] === "all");
      return;
    }
    startPage(container, context);
  }

  window.AppModuleScreens = window.AppModuleScreens || {};
  window.AppModuleScreens.review = route;
})();
