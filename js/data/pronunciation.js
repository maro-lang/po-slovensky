/*
 * data/pronunciation.js — Content of the pronunciation module.
 *
 * What it holds: AppData.pronunciation.SECTIONS, a list of topics. Each
 * topic has a title and a short rule in Spanish and English, plus example
 * words. Tapping a word in the app reads it aloud with the phone's
 * Slovak voice (see js/speech.js).
 *
 * Conventions: Slovak text is always in a field called `sk`, so the
 * quality-check script can find it. `sounds` is an optional hint of how
 * a word sounds, written with Spanish/English spelling in mind.
 *
 * Depends on: nothing. Used by js/screens-pronunciation.js.
 */

window.AppData = window.AppData || {};

(function () {
  "use strict";

  const SECTIONS = [
    {
      id: "stress",
      symbol: "Ó",
      title: { es: "El acento", en: "Stress" },
      rule: {
        es: "El acento cae siempre en la primera sílaba, sin excepción. La tilde (´) no marca el acento: marca una vocal larga.",
        en: "Stress always falls on the first syllable, with no exceptions. The accent mark (´) does not show stress: it shows a long vowel."
      },
      words: [
        { sk: "Bratislava", es: "Bratislava", en: "Bratislava", sounds: "BRA-ti-sla-va" },
        { sk: "ďakujem", es: "gracias", en: "thank you", sounds: "ĎA-ku-jem" },
        { sk: "dovidenia", es: "adiós", en: "goodbye", sounds: "DO-vi-de-nia" },
        { sk: "raňajky", es: "desayuno", en: "breakfast", sounds: "RA-ňaj-ky" }
      ]
    },
    {
      id: "long-vowels",
      symbol: "á",
      title: { es: "Vocales largas", en: "Long vowels" },
      rule: {
        es: "La tilde (dĺžeň) alarga la vocal: á, é, í, ó, ú, ý duran casi el doble. Cambia el significado: compara los pares.",
        en: "The accent mark (dĺžeň) makes a vowel long: á, é, í, ó, ú, ý last about twice as long. It changes the meaning: compare the pairs."
      },
      words: [
        { sk: "pas", es: "pasaporte", en: "passport" },
        { sk: "pás", es: "cinturón, franja", en: "belt, strip" },
        { sk: "sud", es: "barril", en: "barrel" },
        { sk: "súd", es: "tribunal", en: "court" }
      ]
    },
    {
      id: "soft-consonants",
      symbol: "č",
      title: { es: "Consonantes con mäkčeň", en: "Consonants with mäkčeň" },
      rule: {
        es: "El signo ˇ (mäkčeň) cambia el sonido: č como «ch», š como «sh» inglesa, ž como la «j» francesa, y ď, ť, ň, ľ suenan suaves, con la lengua pegada al paladar.",
        en: "The ˇ sign (mäkčeň) changes the sound: č as «ch», š as «sh», ž as the «s» in «pleasure», and ď, ť, ň, ľ are soft, with the tongue against the palate."
      },
      words: [
        { sk: "čaj", es: "té", en: "tea" },
        { sk: "šálka", es: "taza", en: "cup" },
        { sk: "žena", es: "mujer", en: "woman" },
        { sk: "džús", es: "jugo", en: "juice" },
        { sk: "ďakujem", es: "gracias", en: "thank you" },
        { sk: "ťava", es: "camello", en: "camel" },
        { sk: "deň", es: "día", en: "day" },
        { sk: "ľad", es: "hielo", en: "ice" }
      ]
    },
    {
      id: "soft-before-e-i",
      symbol: "de",
      title: { es: "de, te, ne, le", en: "de, te, ne, le" },
      rule: {
        es: "Delante de e, i, í o ie, las letras d, t, n, l suenan suaves aunque no lleven ˇ: «deti» se pronuncia «ďeťi». Algunas palabras de origen extranjero son excepción.",
        en: "Before e, i, í or ie, the letters d, t, n, l are soft even without ˇ: «deti» is said «ďeťi». Some words of foreign origin are exceptions."
      },
      words: [
        { sk: "deti", es: "niños", en: "children", sounds: "ďeťi" },
        { sk: "ten", es: "ese", en: "that", sounds: "ťen" },
        { sk: "nie", es: "no", en: "no", sounds: "ňie" },
        { sk: "lietadlo", es: "avión", en: "plane", sounds: "ľietadlo" }
      ]
    },
    {
      id: "ch",
      symbol: "ch",
      title: { es: "La «ch»", en: "The «ch»" },
      rule: {
        es: "«ch» es una sola letra y suena como la «j» del castellano.",
        en: "«ch» is a single letter and sounds like the «ch» in Scottish «loch»."
      },
      words: [
        { sk: "chlieb", es: "pan", en: "bread" },
        { sk: "chcem", es: "quiero", en: "I want" },
        { sk: "ucho", es: "oreja", en: "ear" }
      ]
    },
    {
      id: "special-vowels",
      symbol: "ô",
      title: { es: "ä, ô y diptongos", en: "ä, ô and diphthongs" },
      rule: {
        es: "En el habla normal, ä suena como «e». ô suena «uo». Los diptongos ia, ie, iu se pronuncian en una sola sílaba.",
        en: "In everyday speech, ä sounds like «e». ô sounds «uo». The diphthongs ia, ie, iu are said as one syllable."
      },
      words: [
        { sk: "mäso", es: "carne", en: "meat" },
        { sk: "kôň", es: "caballo", en: "horse", sounds: "kuoň" },
        { sk: "stôl", es: "mesa", en: "table", sounds: "stuol" },
        { sk: "piatok", es: "viernes", en: "Friday" },
        { sk: "mlieko", es: "leche", en: "milk" }
      ]
    },
    {
      id: "syllabic-r-l",
      symbol: "r",
      title: { es: "Palabras sin vocales", en: "Words without vowels" },
      rule: {
        es: "La r y la l pueden funcionar como vocal y formar sílaba solas.",
        en: "r and l can act as a vowel and form a syllable on their own."
      },
      words: [
        { sk: "prst", es: "dedo", en: "finger" },
        { sk: "vlk", es: "lobo", en: "wolf" },
        { sk: "krk", es: "cuello", en: "neck" },
        { sk: "vlna", es: "ola", en: "wave" }
      ]
    },
    {
      id: "final-sounds",
      symbol: "v",
      title: { es: "Cambios al final de sílaba", en: "Changes at the end of a syllable" },
      rule: {
        es: "Al final de sílaba la v suena casi como «u», y al final de palabra b, d, z suenan como p, t, s.",
        en: "At the end of a syllable v sounds almost like «w», and at the end of a word b, d, z sound like p, t, s."
      },
      words: [
        { sk: "pravda", es: "verdad", en: "truth", sounds: "prauda" },
        { sk: "domov", es: "a casa", en: "home (to go home)", sounds: "domou" },
        { sk: "chlieb", es: "pan", en: "bread", sounds: "chliep" },
        { sk: "mráz", es: "helada", en: "frost", sounds: "mrás" }
      ]
    }
  ];

  window.AppData.pronunciation = { SECTIONS: SECTIONS };
})();
