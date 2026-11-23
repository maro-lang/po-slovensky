/*
 * i18n.js — Interface texts in Spanish and English.
 *
 * How to use: after this file loads, call
 *   AppText.setLanguage("es")   -> chooses the interface language
 *   AppText.t("home.title")     -> returns the text in that language
 *   AppText.t("module.comingInStage", { stage: 3 }) -> fills {stage} in
 *
 * The "base language" the learner chooses is also the interface language:
 * someone who learns Slovak from English sees the whole app in English.
 *
 * Depends on: nothing.
 */

(function () {
  "use strict";

  // ===== Texts =====
  // One object per language, with the same keys in both.
  // Slovak words shown to everyone (like the app name) stay in Slovak.

  const TEXTS = {
    es: {
      "app.name": "Po slovensky",
      "app.tagline": "Eslovaco de A1 a B1",

      "onboarding.question": "¿Desde qué idioma quieres aprender eslovaco?",
      "onboarding.hint": "Puedes cambiarlo después en Ajustes.",

      "home.greeting": "Ahoj",
      "home.greetingWithName": "Ahoj, {name}",
      "home.points": "Puntos",
      "home.streak": "Racha",
      "home.days": "días",
      "home.modulesTitle": "Módulos",
      "home.subtitle": "Sigue con tu eslovaco hoy.",

      "module.comingInStage": "Llega en la etapa {stage}",
      "module.stageLabel": "Etapa {stage}",
      "module.notReadyTitle": "Todavía en construcción",
      "module.notReadyBody": "Este módulo llega en la etapa {stage} del plan. La base de la app ya funciona: idioma, ajustes y uso sin internet.",
      "common.back": "Volver",

      "settings.title": "Ajustes",
      "settings.language": "Idioma de base",
      "settings.nickname": "Apodo",
      "settings.nicknameHint": "Es el nombre que verán tus amigos en la tabla.",
      "settings.nicknamePlaceholder": "Por ejemplo: Maro",
      "settings.save": "Guardar",
      "settings.saved": "Guardado.",
      "settings.backupTitle": "Copia de seguridad del progreso",
      "settings.backupHint": "Descarga un archivo con tu progreso para no perderlo si cambias de celular.",
      "settings.export": "Descargar",
      "settings.import": "Cargar",
      "settings.importOk": "Copia cargada correctamente.",
      "settings.importFail": "Ese archivo no es una copia válida de la app.",
      "settings.aboutTitle": "Acerca de",
      "settings.version": "Versión {version}",
      "settings.offlineReady": "Lista para usar sin internet.",
      "settings.offlineNotReady": "El uso sin internet se activa al abrir la app desde su página web.",

      "common.listen": "Escuchar",
      "common.practice": "Practicar",
      "common.next": "Siguiente",
      "common.finish": "Ver resultado",
      "common.retry": "Repetir",
      "common.correct": "¡Correcto!",
      "common.incorrect": "No es correcto. La respuesta es: {answer}",
      "common.question": "Pregunta {n} de {total}",
      "common.score": "{correct} de {total} correctas",
      "common.pointsEarned": "+{points} puntos",
      "common.bestScore": "Tu mejor resultado: {correct} de {total}",

      "speech.noVoice": "Tu celular no tiene voz en eslovaco, así que el audio puede sonar mal o no sonar. En Android: Ajustes → busca «texto a voz» → Motor de Google → instala los datos de voz en eslovaco.",
      "speech.unsupported": "Este navegador no puede leer texto en voz alta.",

      "cases.title": "Taller de casos",
      "cases.intro": "En eslovaco los sustantivos cambian la terminación según su función en la frase. Hay seis casos; aquí los ves uno por uno, cada uno con su color.",
      "cases.sixCases": "Los seis casos",
      "cases.vocativeNote": "El 5.º caso, el vocativo (para llamar a alguien), casi no se usa hoy y no se incluye.",
      "cases.tablesTitle": "Tablas",
      "cases.models": "Modelos de declinación",
      "cases.modelsHint": "Las 12 tablas clásicas, en singular y plural",
      "cases.modelsIntro": "Cada sustantivo se declina como uno de estos 12 modelos. Fíjate en el género y en cómo termina la palabra.",
      "cases.practiceAll": "Practicar todos los casos",
      "cases.practiceAllHint": "10 frases mezcladas",
      "cases.use": "Para qué sirve",
      "cases.examples": "Ejemplos",
      "cases.prepositions": "Preposiciones que lo piden",
      "cases.noPrepositions": "El nominativo no va con preposiciones.",
      "cases.endings": "Forma en singular de cada modelo",
      "cases.practiceThis": "Practicar el {name}",
      "cases.singular": "Singular",
      "cases.plural": "Plural",
      "cases.alsoLike": "Se declinan igual:",
      "cases.exercisePrompt": "Elige la forma correcta de «{noun}»",

      "pron.title": "Pronunciación",
      "pron.intro": "Toca cada palabra para escucharla.",
      "pron.soundsLike": "suena «{sounds}»",

      "lessons.title": "Lecciones guiadas",
      "lessons.levelA1": "Nivel A1",
      "lessons.unit": "Unidad {n}",
      "lessons.comingLevels": "Pronto habrá más unidades de A1. A2 llega en la etapa 5 y B1 en la etapa 6.",
      "lessons.phrases": "Frases (toca para escuchar)",
      "lessons.tip": "Para tener en cuenta",
      "lessons.practice": "Practicar la unidad",
      "lessons.whatMeans": "¿Qué significa?",
      "lessons.complete": "Completa la frase",
      "lessons.listenChoose": "Escucha y elige",

      "home.phrasesTitle": "Frases del día",
      "settings.credits": "Dibujos de las tarjetas: OpenMoji (openmoji.org), licencia CC BY-SA 4.0. Fuente: Inter (SIL Open Font License).",

      "review.title": "Repaso espaciado",
      "review.todayTitle": "Para hoy",
      "review.todayCount": "{count} tarjetas para repasar (las pendientes y algunas nuevas).",
      "review.nothingToday": "No hay nada para repasar por hoy. ¡Vuelve mañana!",
      "review.start": "Empezar el repaso",
      "review.howItWorks": "Cada día se suman hasta {count} palabras nuevas. Las que sabes vuelven cada vez más espaciadas; las que te cuestan, antes.",
      "review.topicDecks": "Mazos por tema",
      "review.myDecks": "Mis mazos",
      "review.newDeckHint": "Crea un mazo con tus propias palabras",
      "review.newDeckPlaceholder": "Nombre del mazo",
      "review.create": "Crear",
      "review.readingDeckName": "Lectura",
      "review.createReadingDeck": "Crear el mazo «Lectura» (palabras del libro que lees)",
      "review.credits": "Dibujos: OpenMoji, licencia CC BY-SA 4.0.",
      "review.statsLine": "{due} para repasar · {fresh} nuevas · {learned} aprendidas",
      "review.reviewDeck": "Repasar este mazo",
      "review.cards": "Tarjetas ({count})",
      "review.emptyDeck": "Este mazo todavía no tiene tarjetas.",
      "review.addCard": "Agregar una palabra",
      "review.skLabel": "En eslovaco",
      "review.skPlaceholder": "Por ejemplo: hviezda",
      "review.meaningLabel": "Significado",
      "review.meaningPlaceholder": "Por ejemplo: estrella",
      "review.exampleLabel": "Frase de ejemplo en eslovaco (opcional)",
      "review.examplePlaceholder": "Por ejemplo: Vidím hviezdu.",
      "review.addCardButton": "Agregar",
      "review.cardAdded": "Palabra agregada.",
      "review.fillBoth": "Escribe la palabra en eslovaco y su significado.",
      "review.duplicate": "Esa palabra ya está en el mazo.",
      "review.deleteCard": "Borrar la palabra",
      "review.deleteDeck": "Borrar este mazo",
      "review.deleteDeckConfirm": "Toca otra vez para borrarlo",
      "review.sessionTitle": "Repaso",
      "review.left": "Quedan {count}",
      "review.show": "Mostrar el significado",
      "review.again": "No la sabía",
      "review.hard": "Difícil",
      "review.known": "La sabía",
      "review.finished": "¡Listo! Repasaste {count} tarjetas.",
      "review.gender.m": "masculino",
      "review.gender.f": "femenino",
      "review.gender.n": "neutro",
      "review.gender.pl": "solo plural",

      "nav.home": "Inicio",
      "nav.settings": "Ajustes"
    },

    en: {
      "app.name": "Po slovensky",
      "app.tagline": "Slovak from A1 to B1",

      "onboarding.question": "Which language do you want to learn Slovak from?",
      "onboarding.hint": "You can change it later in Settings.",

      "home.greeting": "Ahoj",
      "home.greetingWithName": "Ahoj, {name}",
      "home.points": "Points",
      "home.streak": "Streak",
      "home.days": "days",
      "home.modulesTitle": "Modules",
      "home.subtitle": "Keep up your Slovak today.",

      "module.comingInStage": "Coming in stage {stage}",
      "module.stageLabel": "Stage {stage}",
      "module.notReadyTitle": "Still under construction",
      "module.notReadyBody": "This module arrives in stage {stage} of the plan. The app's base already works: language, settings and offline use.",
      "common.back": "Back",

      "settings.title": "Settings",
      "settings.language": "Base language",
      "settings.nickname": "Nickname",
      "settings.nicknameHint": "The name your friends will see on the table.",
      "settings.nicknamePlaceholder": "For example: Maro",
      "settings.save": "Save",
      "settings.saved": "Saved.",
      "settings.backupTitle": "Progress backup",
      "settings.backupHint": "Download a file with your progress so you don't lose it if you change phones.",
      "settings.export": "Download",
      "settings.import": "Load",
      "settings.importOk": "Backup loaded.",
      "settings.importFail": "That file is not a valid backup of this app.",
      "settings.aboutTitle": "About",
      "settings.version": "Version {version}",
      "settings.offlineReady": "Ready to use offline.",
      "settings.offlineNotReady": "Offline use turns on when the app is opened from its web page.",

      "common.listen": "Listen",
      "common.practice": "Practice",
      "common.next": "Next",
      "common.finish": "See result",
      "common.retry": "Try again",
      "common.correct": "Correct!",
      "common.incorrect": "Not quite. The answer is: {answer}",
      "common.question": "Question {n} of {total}",
      "common.score": "{correct} of {total} correct",
      "common.pointsEarned": "+{points} points",
      "common.bestScore": "Your best: {correct} of {total}",

      "speech.noVoice": "Your phone has no Slovak voice, so audio may sound wrong or not play. On Android: Settings → search «text-to-speech» → Google engine → install the Slovak voice data.",
      "speech.unsupported": "This browser cannot read text aloud.",

      "cases.title": "Case workshop",
      "cases.intro": "In Slovak, nouns change their ending according to their role in the sentence. There are six cases; here you see them one by one, each with its own colour.",
      "cases.sixCases": "The six cases",
      "cases.vocativeNote": "The 5th case, the vocative (for calling someone), is hardly used today and is left out.",
      "cases.tablesTitle": "Tables",
      "cases.models": "Declension models",
      "cases.modelsHint": "The 12 classic tables, singular and plural",
      "cases.modelsIntro": "Every noun declines like one of these 12 models. Look at the gender and at how the word ends.",
      "cases.practiceAll": "Practise all the cases",
      "cases.practiceAllHint": "10 mixed sentences",
      "cases.use": "What it's for",
      "cases.examples": "Examples",
      "cases.prepositions": "Prepositions that take it",
      "cases.noPrepositions": "The nominative takes no prepositions.",
      "cases.endings": "Singular form of each model",
      "cases.practiceThis": "Practise the {name}",
      "cases.singular": "Singular",
      "cases.plural": "Plural",
      "cases.alsoLike": "Declined the same way:",
      "cases.exercisePrompt": "Choose the right form of «{noun}»",

      "pron.title": "Pronunciation",
      "pron.intro": "Tap each word to hear it.",
      "pron.soundsLike": "sounds «{sounds}»",

      "lessons.title": "Guided lessons",
      "lessons.levelA1": "Level A1",
      "lessons.unit": "Unit {n}",
      "lessons.comingLevels": "More A1 units are coming. A2 arrives in stage 5 and B1 in stage 6.",
      "lessons.phrases": "Phrases (tap to listen)",
      "lessons.tip": "Good to know",
      "lessons.practice": "Practise the unit",
      "lessons.whatMeans": "What does it mean?",
      "lessons.complete": "Complete the sentence",
      "lessons.listenChoose": "Listen and choose",

      "home.phrasesTitle": "Phrases of the day",
      "settings.credits": "Card drawings: OpenMoji (openmoji.org), licence CC BY-SA 4.0. Font: Inter (SIL Open Font License).",

      "review.title": "Spaced review",
      "review.todayTitle": "For today",
      "review.todayCount": "{count} cards to review (the ones due plus a few new).",
      "review.nothingToday": "Nothing to review today. Come back tomorrow!",
      "review.start": "Start reviewing",
      "review.howItWorks": "Up to {count} new words are added each day. The ones you know come back less and less often; the hard ones, sooner.",
      "review.topicDecks": "Topic decks",
      "review.myDecks": "My decks",
      "review.newDeckHint": "Create a deck with your own words",
      "review.newDeckPlaceholder": "Deck name",
      "review.create": "Create",
      "review.readingDeckName": "Reading",
      "review.createReadingDeck": "Create the «Reading» deck (words from the book you're reading)",
      "review.credits": "Drawings: OpenMoji, licence CC BY-SA 4.0.",
      "review.statsLine": "{due} due · {fresh} new · {learned} learned",
      "review.reviewDeck": "Review this deck",
      "review.cards": "Cards ({count})",
      "review.emptyDeck": "This deck has no cards yet.",
      "review.addCard": "Add a word",
      "review.skLabel": "In Slovak",
      "review.skPlaceholder": "For example: hviezda",
      "review.meaningLabel": "Meaning",
      "review.meaningPlaceholder": "For example: star",
      "review.exampleLabel": "Example sentence in Slovak (optional)",
      "review.examplePlaceholder": "For example: Vidím hviezdu.",
      "review.addCardButton": "Add",
      "review.cardAdded": "Word added.",
      "review.fillBoth": "Write the Slovak word and its meaning.",
      "review.duplicate": "That word is already in the deck.",
      "review.deleteCard": "Delete the word",
      "review.deleteDeck": "Delete this deck",
      "review.deleteDeckConfirm": "Tap again to delete it",
      "review.sessionTitle": "Review",
      "review.left": "{count} left",
      "review.show": "Show the meaning",
      "review.again": "Didn't know",
      "review.hard": "Hard",
      "review.known": "Knew it",
      "review.finished": "Done! You reviewed {count} cards.",
      "review.gender.m": "masculine",
      "review.gender.f": "feminine",
      "review.gender.n": "neuter",
      "review.gender.pl": "plural only",

      "nav.home": "Home",
      "nav.settings": "Settings"
    }
  };

  // Names of the base languages, written in their own language,
  // so each person recognises theirs on the first screen.
  const LANGUAGE_NAMES = {
    es: "Español",
    en: "English"
  };

  // One line under each language name on the first screen, also in its own language.
  const LANGUAGE_HINTS = {
    es: "Explicaciones en español",
    en: "Explanations in English"
  };

  // ===== State =====

  let currentLanguage = "es";

  // ===== Functions =====

  /** Chooses the interface language ("es" or "en"). Unknown codes are ignored. */
  function setLanguage(languageCode) {
    if (TEXTS[languageCode]) {
      currentLanguage = languageCode;
      document.documentElement.lang = languageCode;
    }
  }

  /**
   * Returns the text for a key in the current language.
   * Placeholders like {stage} are replaced with values from `fillIns`.
   * A missing key returns the key itself, so the gap is easy to spot.
   */
  function t(key, fillIns) {
    const text = TEXTS[currentLanguage][key] || TEXTS.es[key] || key;
    if (!fillIns) return text;

    // Replaces each {name} with fillIns.name (left as is if not given).
    return text.replace(/\{(\w+)\}/g, function (wholeMatch, name) {
      return name in fillIns ? String(fillIns[name]) : wholeMatch;
    });
  }

  // ===== Public interface =====

  /** Returns a text in a specific language, whatever the current one is. */
  function tIn(languageCode, key) {
    return (TEXTS[languageCode] && TEXTS[languageCode][key]) || key;
  }

  window.AppText = {
    setLanguage: setLanguage,
    getLanguage: function () { return currentLanguage; },
    t: t,
    tIn: tIn,
    LANGUAGE_NAMES: LANGUAGE_NAMES,
    LANGUAGE_HINTS: LANGUAGE_HINTS
  };
})();
