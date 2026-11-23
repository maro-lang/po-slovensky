/*
 * modules-list.js — The list of learning modules shown on the home screen.
 *
 * How to use: read AppModules.ALL. Each entry has
 *   id       -> short name used in the address (#/module/<id>)
 *   symbol   -> short text drawn on the module's card
 *   colorKey -> which colour from css/styles.css the card uses
 *   stage    -> stage of the plan in which the module is built
 *   title / description -> texts in Spanish (es) and English (en)
 *
 * Depends on: nothing. When a module is built, its `stage` stays as a
 * record and `ready` becomes true (stage 2: lessons, cases, pronunciation; stage 3: review; stage 4: friends).
 *
 * The stages follow the plan in caracteristicas-v1.md (one folder up).
 */

(function () {
  "use strict";

  const ALL = [
    {
      id: "lessons",
      symbol: "A1",
      colorKey: "blue",
      stage: 2,
      ready: true,
      title: { es: "Lecciones guiadas", en: "Guided lessons" },
      description: { es: "Unidades por nivel, de A1 a B1", en: "Units by level, from A1 to B1" }
    },
    {
      id: "cases",
      symbol: "Pád",
      colorKey: "purple",
      stage: 2,
      ready: true,
      title: { es: "Taller de casos", en: "Case workshop" },
      description: { es: "Los 6 casos, uno por vez", en: "The 6 cases, one at a time" }
    },
    {
      id: "pronunciation",
      symbol: "ä",
      colorKey: "teal",
      stage: 2,
      ready: true,
      title: { es: "Pronunciación", en: "Pronunciation" },
      description: { es: "Audio y diacríticos", en: "Audio and diacritics" }
    },
    {
      id: "review",
      symbol: "↻",
      colorKey: "green",
      stage: 3,
      ready: true,
      title: { es: "Repaso espaciado", en: "Spaced review" },
      description: { es: "Tarjetas con imágenes", en: "Cards with pictures" }
    },
    {
      id: "friends",
      symbol: "★",
      colorKey: "amber",
      stage: 4,
      ready: true,
      title: { es: "Progreso y amigos", en: "Progress and friends" },
      description: { es: "Tabla del grupo", en: "Group leaderboard" }
    },
    {
      id: "verbs",
      symbol: "ísť",
      colorKey: "coral",
      stage: 5,
      ready: false,
      title: { es: "Verbos", en: "Verbs" },
      description: { es: "Aspecto y movimiento", en: "Aspect and motion" }
    },
    {
      id: "exam",
      symbol: "A2",
      colorKey: "red",
      stage: 5,
      ready: false,
      title: { es: "Modo examen", en: "Exam mode" },
      description: { es: "Simulacros con tiempo", en: "Timed mock exams" }
    },
    {
      id: "real",
      symbol: "BA",
      colorKey: "pink",
      stage: 6,
      ready: false,
      title: { es: "Eslovaco real", en: "Real-life Slovak" },
      description: { es: "Situaciones de Bratislava", en: "Bratislava situations" }
    }
  ];

  /** Returns the module with the given id, or undefined if it does not exist. */
  function findById(moduleId) {
    return ALL.find(function (module) { return module.id === moduleId; });
  }

  window.AppModules = {
    ALL: ALL,
    findById: findById
  };
})();
