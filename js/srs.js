/*
 * srs.js — Spaced repetition: decides which cards to review today and
 * when each card comes back.
 *
 * The method (a "Leitner box" system, like a simple Anki):
 *   - Every card sits in a box from 0 (new, never studied) to 6.
 *   - "I knew it"     -> moves up one box; it comes back after that box's
 *                        interval (1, 3, 7, 14, 30, 60 days).
 *   - "Hard"          -> stays in its box; comes back after half the interval.
 *   - "I didn't know" -> back to box 1; comes back later in the same session
 *                        and again tomorrow.
 *   - At most NEW_CARDS_PER_DAY new cards are introduced each day.
 *
 * How to use:
 *   AppSRS.allDecks(data)                 -> built-in decks + the learner's own
 *   AppSRS.deckStats(deck, data)          -> { due, fresh, learned, total }
 *   AppSRS.buildSession(decks, data, oneDeck) -> list of cards to review now
 *   AppSRS.grade(card, "known"|"hard"|"again", data) -> updates the card's state
 *   AppSRS.iconUrl(emoji)                 -> path of the card's OpenMoji drawing
 *   AppSRS.dailyPhrases(dateText, count)  -> the phrases of the day
 *
 * Saved data (inside data.progress, see storage.js):
 *   cards       -> { "<card id>": { box: 2, due: "2026-11-25" } }
 *   newToday    -> { date: "2026-11-23", count: 4 } new cards introduced today
 *   customDecks -> the learner's own decks
 *
 * Depends on: data/vocabulary.js and data/lessons-a1.js (AppData).
 */

(function () {
  "use strict";

  // ===== Configuration =====

  const INTERVAL_DAYS = [0, 1, 3, 7, 14, 30, 60]; // index = box number
  const LAST_BOX = INTERVAL_DAYS.length - 1;
  const NEW_CARDS_PER_DAY = 10;

  // ===== Dates (as "YYYY-MM-DD" text in the phone's time zone) =====

  function dateText(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return date.getFullYear() + "-" + month + "-" + day;
  }

  function today() { return dateText(new Date()); }

  function addDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return dateText(date);
  }

  // ===== Decks and cards =====

  /** Unique id of a card: "<deck id>:<Slovak word>". */
  function cardId(deck, card) { return deck.id + ":" + card.sk; }

  /** Built-in decks followed by the learner's own decks. */
  function allDecks(data) {
    return AppData.vocabulary.DECKS.concat(data.progress.customDecks.map(function (deck) {
      return Object.assign({ custom: true }, deck);
    }));
  }

  /** Saved state of a card, or a "new card" state if never studied. */
  function stateOf(id, data) {
    return data.progress.cards[id] || { box: 0, due: null };
  }

  /** How many cards of a deck are due, new, and already learned. */
  function deckStats(deck, data) {
    const now = today();
    const stats = { due: 0, fresh: 0, learned: 0, total: deck.cards.length };
    deck.cards.forEach(function (card) {
      const state = stateOf(cardId(deck, card), data);
      if (state.box === 0) stats.fresh++;
      else if (state.due <= now) stats.due++;
      else stats.learned++;
    });
    return stats;
  }

  /** How many new cards can still be introduced today. */
  function newCardsLeftToday(data) {
    const record = data.progress.newToday;
    const usedToday = record && record.date === today() ? record.count : 0;
    return Math.max(0, NEW_CARDS_PER_DAY - usedToday);
  }

  /**
   * Cards to review now: every due card of the given decks, then new cards
   * up to today's limit. Each entry is { id, deck, card }.
   * `oneDeck` = true when the learner opened a single deck: then up to
   * NEW_CARDS_PER_DAY new cards of that deck are offered even if the daily
   * limit was already used elsewhere (they chose to study that deck).
   */
  function buildSession(decks, data, oneDeck) {
    const now = today();
    const due = [];
    const fresh = [];

    decks.forEach(function (deck) {
      deck.cards.forEach(function (card) {
        const id = cardId(deck, card);
        const state = stateOf(id, data);
        if (state.box === 0) fresh.push({ id: id, deck: deck, card: card });
        else if (state.due <= now) due.push({ id: id, deck: deck, card: card });
      });
    });

    const newLimit = oneDeck ? NEW_CARDS_PER_DAY : newCardsLeftToday(data);
    return due.concat(fresh.slice(0, newLimit));
  }

  /** Records the learner's answer for one card and schedules its next review. */
  function grade(entry, answer, data) {
    const progress = data.progress;
    const state = stateOf(entry.id, data);

    // Count new cards introduced today (for the daily limit).
    if (state.box === 0) {
      const record = progress.newToday && progress.newToday.date === today() ? progress.newToday : { date: today(), count: 0 };
      record.count++;
      progress.newToday = record;
    }

    let box;
    let due;
    if (answer === "known") {
      box = Math.min(state.box + 1, LAST_BOX);
      due = addDays(INTERVAL_DAYS[box]);
    } else if (answer === "hard") {
      box = Math.max(state.box, 1);
      due = addDays(Math.max(1, Math.floor(INTERVAL_DAYS[box] / 2)));
    } else {
      box = 1;
      due = addDays(1);
    }
    progress.cards[entry.id] = { box: box, due: due };
  }

  // ===== Pictures =====

  /**
   * Path of the OpenMoji drawing for an emoji: its code points in hex,
   * joined by "-", leaving out FE0F. Must match herramientas/copy_icons.py.
   */
  function iconUrl(emoji) {
    const codes = Array.from(emoji)
      .map(function (char) { return char.codePointAt(0); })
      .filter(function (code) { return code !== 0xFE0F; })
      .map(function (code) { return code.toString(16).toUpperCase(); });
    return "img/openmoji/" + codes.join("-") + ".svg";
  }

  // ===== Phrases of the day =====

  /** Every example sentence of the decks and every lesson phrase that is a sentence. */
  function phrasePool() {
    const pool = [];
    AppData.vocabulary.DECKS.forEach(function (deck) {
      deck.cards.forEach(function (card) { pool.push(card.ex); });
    });
    AppData.lessons.UNITS.forEach(function (unit) {
      unit.phrases.forEach(function (phrase) {
        // Only full sentences (they end in . ! or ?), not single words or numbers.
        if (/[.!?]$/.test(phrase.sk)) pool.push(phrase);
      });
    });
    return pool;
  }

  /**
   * The phrases of a given day: the same all day, different the next day.
   * A simple number made from the date picks the starting point in the pool.
   */
  function dailyPhrases(day, count) {
    const pool = phrasePool();
    const digits = Number(day.replace(/-/g, "")); // "2026-11-23" -> 20261123
    const step = 37; // a prime step spreads the picks across the whole pool
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(pool[(digits * 7 + i * step) % pool.length]);
    }
    return result;
  }

  // ===== Public interface =====

  window.AppSRS = {
    NEW_CARDS_PER_DAY: NEW_CARDS_PER_DAY,
    today: today,
    cardId: cardId,
    allDecks: allDecks,
    deckStats: deckStats,
    buildSession: buildSession,
    grade: grade,
    iconUrl: iconUrl,
    dailyPhrases: dailyPhrases
  };
})();
