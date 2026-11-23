/*
 * data/lessons-a1.js — First units of level A1.
 *
 * What it holds: AppData.lessons.UNITS, a list of units. Each unit has:
 *   title / intro        -> name and a short explanation (es / en)
 *   phrases              -> useful phrases with translations; tapping one
 *                           in the app reads it aloud
 *   grammar (optional)   -> a small table, for example the verb byť
 *   note (optional)      -> a tip shown under the phrases
 *   exercises            -> multiple-choice questions:
 *        type "meaning" : show a Slovak phrase, choose its translation
 *        type "say"     : show a translation, choose the Slovak phrase
 *        type "fill"    : complete a Slovak sentence
 *        type "listen"  : hear a Slovak word, choose what it is
 *
 * Conventions: Slovak text is in fields called `sk` (or in `options` of
 * "say", "fill" and "listen" exercises), so the quality-check script can
 * find it. In "fill" exercises "___" marks the gap.
 *
 * Depends on: nothing. Used by js/screens-lessons.js.
 */

window.AppData = window.AppData || {};

(function () {
  "use strict";

  const UNITS = [
    // ===== Unit 1: greetings =====
    {
      id: "a1-1",
      level: "A1",
      number: 1,
      title: { sk: "Pozdravy", es: "Saludos", en: "Greetings" },
      intro: {
        es: "Cómo saludar, despedirse y agradecer, en forma informal (ty) y formal (vy).",
        en: "How to say hello, goodbye and thank you, informally (ty) and formally (vy)."
      },
      phrases: [
        { sk: "Ahoj!", es: "¡Hola! / ¡Chau! (informal)", en: "Hi! / Bye! (informal)" },
        { sk: "Dobrý deň!", es: "¡Buenos días! / ¡Buenas tardes! (formal)", en: "Hello! / Good day! (formal)" },
        { sk: "Dobré ráno!", es: "¡Buenos días! (temprano)", en: "Good morning!" },
        { sk: "Dobrý večer!", es: "¡Buenas noches! (al llegar)", en: "Good evening!" },
        { sk: "Dobrú noc!", es: "¡Buenas noches! (al irse a dormir)", en: "Good night!" },
        { sk: "Dovidenia!", es: "¡Adiós! (formal)", en: "Goodbye! (formal)" },
        { sk: "Ďakujem.", es: "Gracias.", en: "Thank you." },
        { sk: "Prosím.", es: "Por favor. / De nada.", en: "Please. / You're welcome." },
        { sk: "Prepáčte.", es: "Disculpe.", en: "Excuse me. (formal)" },
        { sk: "Áno. / Nie.", es: "Sí. / No.", en: "Yes. / No." },
        { sk: "Ako sa máš?", es: "¿Cómo estás?", en: "How are you? (informal)" },
        { sk: "Ako sa máte?", es: "¿Cómo está usted?", en: "How are you? (formal)" },
        { sk: "Mám sa dobre.", es: "Estoy bien.", en: "I'm fine." }
      ],
      note: {
        es: "Como en castellano con tú y usted, en eslovaco se tutea (tykať) a amigos y familia, y se trata de vy (vykať) a desconocidos y en el trabajo.",
        en: "Slovak has two ways to say «you»: ty for friends and family, and vy for strangers and at work (like French tu and vous)."
      },
      exercises: [
        { type: "say", prompt: { es: "¿Cómo se dice «gracias»?", en: "How do you say «thank you»?" },
          options: ["Ďakujem.", "Prosím.", "Dovidenia!", "Ahoj!"], answer: 0 },
        { type: "meaning", sk: "Dobrú noc!",
          options: { es: ["¡Buenas noches! (al irse a dormir)", "¡Buenos días!", "¡Adiós!", "¡Hola!"],
                     en: ["Good night!", "Good morning!", "Goodbye!", "Hi!"] }, answer: 0 },
        { type: "say", prompt: { es: "Te despides de un cliente:", en: "You say goodbye to a client:" },
          options: ["Dovidenia!", "Ahoj!", "Dobrú noc!", "Prosím."], answer: 0 },
        { type: "meaning", sk: "Prosím.",
          options: { es: ["Por favor / De nada", "Gracias", "Disculpe", "Sí"],
                     en: ["Please / You're welcome", "Thank you", "Excuse me", "Yes"] }, answer: 0 },
        { type: "say", prompt: { es: "Le preguntas a un desconocido cómo está:", en: "You ask a stranger how they are:" },
          options: ["Ako sa máte?", "Ako sa máš?", "Mám sa dobre.", "Prepáčte."], answer: 0 }
      ]
    },

    // ===== Unit 2: introducing yourself =====
    {
      id: "a1-2",
      level: "A1",
      number: 2,
      title: { sk: "Predstavenie", es: "Presentarse", en: "Introducing yourself" },
      intro: {
        es: "Decir cómo te llamas, de dónde eres y dónde vives. Y el verbo más importante: byť (ser / estar).",
        en: "Say your name, where you're from and where you live. Plus the key verb: byť (to be)."
      },
      phrases: [
        { sk: "Volám sa Peter.", es: "Me llamo Peter.", en: "My name is Peter." },
        { sk: "Ako sa voláš?", es: "¿Cómo te llamas?", en: "What's your name? (informal)" },
        { sk: "Ako sa voláte?", es: "¿Cómo se llama usted?", en: "What's your name? (formal)" },
        { sk: "Teší ma.", es: "Mucho gusto.", en: "Nice to meet you." },
        { sk: "Odkiaľ si?", es: "¿De dónde eres?", en: "Where are you from? (informal)" },
        { sk: "Odkiaľ ste?", es: "¿De dónde es usted?", en: "Where are you from? (formal)" },
        { sk: "Som z Argentíny.", es: "Soy de Argentina.", en: "I'm from Argentina." },
        { sk: "Som zo Španielska.", es: "Soy de España.", en: "I'm from Spain." },
        { sk: "Som z Anglicka.", es: "Soy de Inglaterra.", en: "I'm from England." },
        { sk: "Bývam v Bratislave.", es: "Vivo en Bratislava.", en: "I live in Bratislava." },
        { sk: "Hovoríte po anglicky?", es: "¿Habla inglés?", en: "Do you speak English?" },
        { sk: "Hovorím trochu po slovensky.", es: "Hablo un poco de eslovaco.", en: "I speak a little Slovak." }
      ],
      grammar: {
        title: { sk: "byť", es: "El verbo byť (ser / estar)", en: "The verb byť (to be)" },
        rows: [
          { sk: "ja som", es: "yo soy", en: "I am" },
          { sk: "ty si", es: "tú eres", en: "you are" },
          { sk: "on, ona, ono je", es: "él, ella es", en: "he, she, it is" },
          { sk: "my sme", es: "nosotros somos", en: "we are" },
          { sk: "vy ste", es: "ustedes son / usted es", en: "you are (plural or formal)" },
          { sk: "oni, ony sú", es: "ellos, ellas son", en: "they are" }
        ]
      },
      note: {
        es: "El pronombre casi siempre se omite: se dice «Som z Argentíny», no «Ja som…». Después de z / zo el país va en genitivo (Argentína → z Argentíny), como verás en el taller de casos.",
        en: "The pronoun is usually dropped: «Som z Argentíny», not «Ja som…». After z / zo the country takes the genitive (Argentína → z Argentíny), as you'll see in the case workshop."
      },
      exercises: [
        { type: "fill", sk: "Ja ___ z Argentíny.", options: ["som", "si", "je", "sú"], answer: 0 },
        { type: "fill", sk: "My ___ v Bratislave.", options: ["sme", "ste", "som", "je"], answer: 0 },
        { type: "fill", sk: "Oni ___ zo Španielska.", options: ["sú", "sme", "si", "je"], answer: 0 },
        { type: "fill", sk: "Odkiaľ ___? (ty)", options: ["si", "ste", "som", "sú"], answer: 0 },
        { type: "meaning", sk: "Teší ma.",
          options: { es: ["Mucho gusto.", "Me llamo…", "¿De dónde eres?", "Gracias."],
                     en: ["Nice to meet you.", "My name is…", "Where are you from?", "Thank you."] }, answer: 0 },
        { type: "say", prompt: { es: "«Vivo en Bratislava»", en: "«I live in Bratislava»" },
          options: ["Bývam v Bratislave.", "Som z Bratislavy.", "Volám sa Bratislava.", "Hovorím po slovensky."], answer: 0 }
      ]
    },

    // ===== Unit 3: numbers 0–10 =====
    {
      id: "a1-3",
      level: "A1",
      number: 3,
      title: { sk: "Čísla 0–10", es: "Números del 0 al 10", en: "Numbers 0–10" },
      intro: {
        es: "Los números del 0 al 10. El 1 y el 2 cambian según el género del sustantivo.",
        en: "Numbers from 0 to 10. 1 and 2 change with the gender of the noun."
      },
      phrases: [
        { sk: "nula", es: "0", en: "0" },
        { sk: "jeden, jedna, jedno", es: "1 (masc., fem., neutro)", en: "1 (masc., fem., neut.)" },
        { sk: "dva, dve", es: "2", en: "2" },
        { sk: "tri", es: "3", en: "3" },
        { sk: "štyri", es: "4", en: "4" },
        { sk: "päť", es: "5", en: "5" },
        { sk: "šesť", es: "6", en: "6" },
        { sk: "sedem", es: "7", en: "7" },
        { sk: "osem", es: "8", en: "8" },
        { sk: "deväť", es: "9", en: "9" },
        { sk: "desať", es: "10", en: "10" }
      ],
      note: {
        es: "jeden brat, jedna žena, jedno mesto. Con el 2: dva stoly (cosas masculinas), dve ženy y dve mestá (femenino y neutro), y dvaja bratia (hombres).",
        en: "jeden brat, jedna žena, jedno mesto. With 2: dva stoly (masculine things), dve ženy and dve mestá (feminine and neuter), and dvaja bratia (men)."
      },
      exercises: [
        { type: "listen", sk: "sedem", options: ["7", "8", "6", "9"], answer: 0 },
        { type: "listen", sk: "štyri", options: ["4", "3", "5", "2"], answer: 0 },
        { type: "say", prompt: { es: "¿Cómo se dice 5?", en: "How do you say 5?" },
          options: ["päť", "šesť", "štyri", "deväť"], answer: 0 },
        { type: "listen", sk: "deväť", options: ["9", "10", "5", "6"], answer: 0 },
        { type: "fill", sk: "___ ženy", options: ["dve", "dva", "dvaja", "jedna"], answer: 0 },
        { type: "say", prompt: { es: "¿Cómo se dice 10?", en: "How do you say 10?" },
          options: ["desať", "deväť", "sedem", "osem"], answer: 0 }
      ]
    }
  ];

  window.AppData.lessons = { UNITS: UNITS };
})();
