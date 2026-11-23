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
