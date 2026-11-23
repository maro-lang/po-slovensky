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
 *        type "listen"  : hear a Slovak word, choose what it is (options are
 *                         either one list, e.g. digits, or one list per language)
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
    },

    // ===== Unit 4: family and the verb mať =====
    {
      id: "a1-4",
      level: "A1",
      number: 4,
      title: { sk: "Rodina", es: "La familia", en: "Family" },
      intro: {
        es: "Hablar de tu familia y el segundo verbo clave: mať (tener).",
        en: "Talk about your family, plus the second key verb: mať (to have)."
      },
      phrases: [
        { sk: "Mám brata a sestru.", es: "Tengo un hermano y una hermana.", en: "I have a brother and a sister." },
        { sk: "Máš deti?", es: "¿Tienes hijos?", en: "Do you have children?" },
        { sk: "Nemám deti.", es: "No tengo hijos.", en: "I don't have children." },
        { sk: "Toto je moja mama.", es: "Esta es mi mamá.", en: "This is my mum." },
        { sk: "Toto je môj otec.", es: "Este es mi padre.", en: "This is my father." },
        { sk: "Koľko máš rokov?", es: "¿Cuántos años tienes?", en: "How old are you?" },
        { sk: "Mám tridsať rokov.", es: "Tengo treinta años.", en: "I'm thirty." },
        { sk: "Moji rodičia bývajú v Argentíne.", es: "Mis padres viven en Argentina.", en: "My parents live in Argentina." }
      ],
      grammar: {
        title: { sk: "mať", es: "El verbo mať (tener)", en: "The verb mať (to have)" },
        rows: [
          { sk: "ja mám", es: "yo tengo", en: "I have" },
          { sk: "ty máš", es: "tú tienes", en: "you have" },
          { sk: "on, ona, ono má", es: "él, ella tiene", en: "he, she, it has" },
          { sk: "my máme", es: "nosotros tenemos", en: "we have" },
          { sk: "vy máte", es: "ustedes tienen / usted tiene", en: "you have (plural or formal)" },
          { sk: "oni, ony majú", es: "ellos, ellas tienen", en: "they have" }
        ]
      },
      note: {
        es: "Para negar se pega «ne» al verbo: mám → nemám. La edad se dice con mať, como en castellano: «Mám tridsať rokov».",
        en: "To make it negative, attach «ne» to the verb: mám → nemám. Age is said with mať (to have): «Mám tridsať rokov» (I have thirty years)."
      },
      exercises: [
        { type: "fill", sk: "Ja ___ brata.", options: ["mám", "máš", "má", "majú"], answer: 0 },
        { type: "fill", sk: "My ___ veľkú rodinu.", options: ["máme", "máte", "mám", "má"], answer: 0 },
        { type: "fill", sk: "Oni ___ dve deti.", options: ["majú", "máme", "má", "máš"], answer: 0 },
        { type: "fill", sk: "___ ty deti?", options: ["Máš", "Mám", "Máte", "Majú"], answer: 0 },
        { type: "meaning", sk: "Koľko máš rokov?",
          options: { es: ["¿Cuántos años tienes?", "¿Cuántos hermanos tienes?", "¿Tienes hijos?", "¿Cómo te llamas?"],
                     en: ["How old are you?", "How many siblings do you have?", "Do you have children?", "What's your name?"] }, answer: 0 },
        { type: "say", prompt: { es: "«No tengo hijos»", en: "«I don't have children»" },
          options: ["Nemám deti.", "Mám deti.", "Máš deti?", "Nemá deti."], answer: 0 }
      ]
    },

    // ===== Unit 5: days and time =====
    {
      id: "a1-5",
      level: "A1",
      number: 5,
      title: { sk: "Dni a hodiny", es: "Días y horas", en: "Days and time" },
      intro: {
        es: "Los días de la semana, hoy, mañana, ayer, y cómo decir la hora.",
        en: "The days of the week, today, tomorrow, yesterday, and how to tell the time."
      },
      phrases: [
        { sk: "pondelok", es: "lunes", en: "Monday" },
        { sk: "utorok", es: "martes", en: "Tuesday" },
        { sk: "streda", es: "miércoles", en: "Wednesday" },
        { sk: "štvrtok", es: "jueves", en: "Thursday" },
        { sk: "piatok", es: "viernes", en: "Friday" },
        { sk: "sobota", es: "sábado", en: "Saturday" },
        { sk: "nedeľa", es: "domingo", en: "Sunday" },
        { sk: "dnes, zajtra, včera", es: "hoy, mañana, ayer", en: "today, tomorrow, yesterday" },
        { sk: "V pondelok pracujem.", es: "El lunes trabajo.", en: "On Monday I work." },
        { sk: "Koľko je hodín?", es: "¿Qué hora es?", en: "What time is it?" },
        { sk: "Je jedna hodina.", es: "Es la una.", en: "It's one o'clock." },
        { sk: "Sú tri hodiny.", es: "Son las tres.", en: "It's three o'clock." },
        { sk: "Je päť hodín.", es: "Son las cinco.", en: "It's five o'clock." }
      ],
      note: {
        es: "«El lunes» se dice con v + acusativo: v pondelok, v stredu, v sobotu, v nedeľu. Con la hora cambia la forma: 1 → je jedna hodina; 2, 3, 4 → sú … hodiny; 5 o más → je … hodín.",
        en: "«On Monday» is v + accusative: v pondelok, v stredu, v sobotu, v nedeľu. The hour changes form: 1 → je jedna hodina; 2, 3, 4 → sú … hodiny; 5 or more → je … hodín."
      },
      exercises: [
        { type: "listen", sk: "streda",
          options: { es: ["miércoles", "jueves", "sábado", "martes"], en: ["Wednesday", "Thursday", "Saturday", "Tuesday"] }, answer: 0 },
        { type: "say", prompt: { es: "¿Cómo se dice «viernes»?", en: "How do you say «Friday»?" },
          options: ["piatok", "pondelok", "štvrtok", "sobota"], answer: 0 },
        { type: "fill", sk: "V ___ idem na výlet. (sobota)", options: ["sobotu", "sobota", "soboty", "sobote"], answer: 0 },
        { type: "fill", sk: "Sú dve ___.", options: ["hodiny", "hodín", "hodina", "hodinou"], answer: 0 },
        { type: "fill", sk: "Je šesť ___.", options: ["hodín", "hodiny", "hodina", "hodinu"], answer: 0 },
        { type: "meaning", sk: "zajtra",
          options: { es: ["mañana", "ayer", "hoy", "la semana"], en: ["tomorrow", "yesterday", "today", "the week"] }, answer: 0 }
      ]
    },

    // ===== Unit 6: at the restaurant =====
    {
      id: "a1-6",
      level: "A1",
      number: 6,
      title: { sk: "V reštaurácii", es: "En el restaurante", en: "At the restaurant" },
      intro: {
        es: "Pedir, preguntar el precio y pagar en un restaurante o un café.",
        en: "Order, ask the price and pay in a restaurant or café."
      },
      phrases: [
        { sk: "Je tu voľné?", es: "¿Está libre (este lugar)?", en: "Is this seat free?" },
        { sk: "Máte jedálny lístok?", es: "¿Tiene la carta?", en: "Do you have a menu?" },
        { sk: "Dám si polievku.", es: "Voy a tomar una sopa.", en: "I'll have the soup." },
        { sk: "Prosím si kávu.", es: "Un café, por favor.", en: "A coffee, please." },
        { sk: "Koľko to stojí?", es: "¿Cuánto cuesta?", en: "How much is it?" },
        { sk: "Účet, prosím.", es: "La cuenta, por favor.", en: "The bill, please." },
        { sk: "Platím kartou.", es: "Pago con tarjeta.", en: "I'm paying by card." },
        { sk: "Dobrú chuť!", es: "¡Buen provecho!", en: "Enjoy your meal!" },
        { sk: "Na zdravie!", es: "¡Salud!", en: "Cheers!" },
        { sk: "Bolo to výborné.", es: "Estuvo excelente.", en: "It was excellent." }
      ],
      note: {
        es: "Al pedir, lo que pides va en acusativo: káva → «Prosím si kávu», polievka → «Dám si polievku».",
        en: "When ordering, what you ask for is in the accusative: káva → «Prosím si kávu», polievka → «Dám si polievku»."
      },
      exercises: [
        { type: "say", prompt: { es: "Quieres pagar:", en: "You want to pay:" },
          options: ["Účet, prosím.", "Dobrú chuť!", "Je tu voľné?", "Na zdravie!"], answer: 0 },
        { type: "meaning", sk: "Koľko to stojí?",
          options: { es: ["¿Cuánto cuesta?", "¿Qué hora es?", "¿Está libre?", "¿Tiene la carta?"],
                     en: ["How much is it?", "What time is it?", "Is this seat free?", "Do you have a menu?"] }, answer: 0 },
        { type: "fill", sk: "Prosím si ___. (káva)", options: ["kávu", "káva", "kávy", "káve"], answer: 0 },
        { type: "fill", sk: "Dám si ___. (polievka)", options: ["polievku", "polievka", "polievky", "polievke"], answer: 0 },
        { type: "say", prompt: { es: "Antes de comer se dice:", en: "Before eating you say:" },
          options: ["Dobrú chuť!", "Na zdravie!", "Dovidenia!", "Prepáčte."], answer: 0 },
        { type: "listen", sk: "Platím kartou.",
          options: { es: ["Pago con tarjeta.", "Pago en efectivo.", "La cuenta, por favor.", "¿Cuánto cuesta?"],
                     en: ["I'm paying by card.", "I'm paying in cash.", "The bill, please.", "How much is it?"] }, answer: 0 }
      ]
    }
  ];

  window.AppData.lessons = { UNITS: UNITS };
})();
