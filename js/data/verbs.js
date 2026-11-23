/*
 * data/verbs.js — Slovak verbs: conjugation tables, grammar topics and exercises.
 *
 * What it holds (AppData.verbs):
 *   PERSONS -> the six subject pronouns, in table order
 *   VERBS   -> about 60 common verbs. Each verb has:
 *        inf     : infinitive (without "sa"/"si")
 *        refl    : "sa" or "si" for reflexive verbs, otherwise absent
 *        es / en : meaning
 *        group   : present-tense group: "a" (-ám), "i" (-ím), "e" (-em / -iem),
 *                  "uj" (-ujem) or "irr" (irregular)
 *        aspect  : "imp" (imperfective: process, habit) or "perf" (perfective: one finished result)
 *        partner : infinitive of the other verb of the aspect pair, if it is in the list
 *        motion  : true for verbs of motion
 *        pres    : six present forms (ja, ty, on/ona, my, vy, oni) — for perfective
 *                  verbs these forms mean the FUTURE
 *        past    : past participle [masculine, feminine, plural]
 *        imper   : imperative [singular, plural], or null if rarely used
 *        fut     : six future forms, only for verbs whose future is special
 *                  (byť -> budem, ísť -> pôjdem, letieť -> poletím...)
 *   TOPICS  -> grammar lessons (present, past, future, aspect, motion, modals),
 *              each with a table, examples and its own exercises
 *
 * Conventions: Slovak text is in fields called `sk`, `pres`, `past`, `imper`,
 * `fut` and in `options`, so herramientas/check_slovak.js can check it.
 * In exercises "___" marks the gap; `tr` is the translation shown after answering;
 * `hint` (optional) is a short clue in the base language shown with the question.
 *
 * Depends on: nothing. Used by js/screens-verbs.js.
 */

window.AppData = window.AppData || {};

(function () {
  "use strict";

  // ===== Subject pronouns =====

  const PERSONS = ["ja", "ty", "on / ona", "my", "vy", "oni / ony"];

  // ===== Verbs =====
  // Grouped by present-tense pattern. Pairs of aspect stay next to each other.

  const VERBS = [
    // --- Group "a": -ám, -áš, -á, -áme, -áte, -ajú ---
    { inf: "čakať", es: "esperar", en: "to wait", group: "a", aspect: "imp", partner: "počkať",
      pres: ["čakám", "čakáš", "čaká", "čakáme", "čakáte", "čakajú"], past: ["čakal", "čakala", "čakali"], imper: ["čakaj", "čakajte"] },
    { inf: "počkať", es: "esperar (un rato)", en: "to wait (a while)", group: "a", aspect: "perf", partner: "čakať",
      pres: ["počkám", "počkáš", "počká", "počkáme", "počkáte", "počkajú"], past: ["počkal", "počkala", "počkali"], imper: ["počkaj", "počkajte"] },
    { inf: "volať", es: "llamar", en: "to call", group: "a", aspect: "imp", partner: "zavolať",
      pres: ["volám", "voláš", "volá", "voláme", "voláte", "volajú"], past: ["volal", "volala", "volali"], imper: ["volaj", "volajte"] },
    { inf: "zavolať", es: "llamar (una vez)", en: "to call (once)", group: "a", aspect: "perf", partner: "volať",
      pres: ["zavolám", "zavoláš", "zavolá", "zavoláme", "zavoláte", "zavolajú"], past: ["zavolal", "zavolala", "zavolali"], imper: ["zavolaj", "zavolajte"] },
    { inf: "čítať", es: "leer", en: "to read", group: "a", aspect: "imp", partner: "prečítať",
      pres: ["čítam", "čítaš", "číta", "čítame", "čítate", "čítajú"], past: ["čítal", "čítala", "čítali"], imper: ["čítaj", "čítajte"] },
    { inf: "prečítať", es: "leer (entero)", en: "to read (through)", group: "a", aspect: "perf", partner: "čítať",
      pres: ["prečítam", "prečítaš", "prečíta", "prečítame", "prečítate", "prečítajú"], past: ["prečítal", "prečítala", "prečítali"], imper: ["prečítaj", "prečítajte"] },
    { inf: "hľadať", es: "buscar", en: "to look for", group: "a", aspect: "imp", partner: "nájsť",
      pres: ["hľadám", "hľadáš", "hľadá", "hľadáme", "hľadáte", "hľadajú"], past: ["hľadal", "hľadala", "hľadali"], imper: ["hľadaj", "hľadajte"] },
    { inf: "mať", es: "tener", en: "to have", group: "a", aspect: "imp",
      pres: ["mám", "máš", "má", "máme", "máte", "majú"], past: ["mal", "mala", "mali"], imper: ["maj", "majte"] },
    { inf: "dávať", es: "dar (habitualmente)", en: "to give (usually)", group: "a", aspect: "imp", partner: "dať",
      pres: ["dávam", "dávaš", "dáva", "dávame", "dávate", "dávajú"], past: ["dával", "dávala", "dávali"], imper: ["dávaj", "dávajte"] },
    { inf: "dať", es: "dar (una vez)", en: "to give (once)", group: "a", aspect: "perf", partner: "dávať",
      pres: ["dám", "dáš", "dá", "dáme", "dáte", "dajú"], past: ["dal", "dala", "dali"], imper: ["daj", "dajte"] },
    { inf: "bývať", es: "vivir (residir)", en: "to live (reside)", group: "a", aspect: "imp",
      pres: ["bývam", "bývaš", "býva", "bývame", "bývate", "bývajú"], past: ["býval", "bývala", "bývali"], imper: null },
    { inf: "hrať", es: "jugar / tocar (música)", en: "to play", group: "a", aspect: "imp",
      pres: ["hrám", "hráš", "hrá", "hráme", "hráte", "hrajú"], past: ["hral", "hrala", "hrali"], imper: ["hraj", "hrajte"] },
    { inf: "poznať", es: "conocer", en: "to know (someone)", group: "a", aspect: "imp",
      pres: ["poznám", "poznáš", "pozná", "poznáme", "poznáte", "poznajú"], past: ["poznal", "poznala", "poznali"], imper: null },
    { inf: "vstávať", es: "levantarse (habitualmente)", en: "to get up (usually)", group: "a", aspect: "imp", partner: "vstať",
      pres: ["vstávam", "vstávaš", "vstáva", "vstávame", "vstávate", "vstávajú"], past: ["vstával", "vstávala", "vstávali"], imper: ["vstávaj", "vstávajte"] },
    { inf: "začínať", es: "empezar (habitualmente)", en: "to begin (usually)", group: "a", aspect: "imp", partner: "začať",
      pres: ["začínam", "začínaš", "začína", "začíname", "začínate", "začínajú"], past: ["začínal", "začínala", "začínali"], imper: null },
    { inf: "lietať", es: "volar (a menudo, ida y vuelta)", en: "to fly (often, back and forth)", group: "a", aspect: "imp", motion: true,
      pres: ["lietam", "lietaš", "lieta", "lietame", "lietate", "lietajú"], past: ["lietal", "lietala", "lietali"], imper: null },
    { inf: "behať", es: "correr (como hábito)", en: "to run (as a habit)", group: "a", aspect: "imp", motion: true,
      pres: ["behám", "beháš", "behá", "beháme", "beháte", "behajú"], past: ["behal", "behala", "behali"], imper: null },

    // --- Group "i": -ím, -íš, -í, -íme, -íte, -ia ---
    { inf: "robiť", es: "hacer", en: "to do / make", group: "i", aspect: "imp", partner: "urobiť",
      pres: ["robím", "robíš", "robí", "robíme", "robíte", "robia"], past: ["robil", "robila", "robili"], imper: ["rob", "robte"] },
    { inf: "urobiť", es: "hacer (terminar)", en: "to do / make (finish)", group: "i", aspect: "perf", partner: "robiť",
      pres: ["urobím", "urobíš", "urobí", "urobíme", "urobíte", "urobia"], past: ["urobil", "urobila", "urobili"], imper: ["urob", "urobte"] },
    { inf: "hovoriť", es: "hablar / decir", en: "to speak / say", group: "i", aspect: "imp", partner: "povedať",
      pres: ["hovorím", "hovoríš", "hovorí", "hovoríme", "hovoríte", "hovoria"], past: ["hovoril", "hovorila", "hovorili"], imper: ["hovor", "hovorte"] },
    { inf: "učiť", refl: "sa", es: "aprender / estudiar", en: "to learn / study", group: "i", aspect: "imp", partner: "naučiť",
      pres: ["učím", "učíš", "učí", "učíme", "učíte", "učia"], past: ["učil", "učila", "učili"], imper: ["uč", "učte"] },
    { inf: "naučiť", refl: "sa", es: "aprender (lograrlo)", en: "to learn (master)", group: "i", aspect: "perf", partner: "učiť",
      pres: ["naučím", "naučíš", "naučí", "naučíme", "naučíte", "naučia"], past: ["naučil", "naučila", "naučili"], imper: ["nauč", "naučte"] },
    { inf: "platiť", es: "pagar", en: "to pay", group: "i", aspect: "imp", partner: "zaplatiť",
      pres: ["platím", "platíš", "platí", "platíme", "platíte", "platia"], past: ["platil", "platila", "platili"], imper: ["plať", "plaťte"] },
    { inf: "zaplatiť", es: "pagar (una cuenta)", en: "to pay (a bill)", group: "i", aspect: "perf", partner: "platiť",
      pres: ["zaplatím", "zaplatíš", "zaplatí", "zaplatíme", "zaplatíte", "zaplatia"], past: ["zaplatil", "zaplatila", "zaplatili"], imper: ["zaplať", "zaplaťte"] },
    { inf: "kúpiť", es: "comprar (una cosa)", en: "to buy (one thing)", group: "i", aspect: "perf", partner: "kupovať",
      pres: ["kúpim", "kúpiš", "kúpi", "kúpime", "kúpite", "kúpia"], past: ["kúpil", "kúpila", "kúpili"], imper: ["kúp", "kúpte"] },
    { inf: "variť", es: "cocinar", en: "to cook", group: "i", aspect: "imp", partner: "uvariť",
      pres: ["varím", "varíš", "varí", "varíme", "varíte", "varia"], past: ["varil", "varila", "varili"], imper: ["var", "varte"] },
    { inf: "uvariť", es: "cocinar (terminar un plato)", en: "to cook (a dish)", group: "i", aspect: "perf", partner: "variť",
      pres: ["uvarím", "uvaríš", "uvarí", "uvaríme", "uvaríte", "uvaria"], past: ["uvaril", "uvarila", "uvarili"], imper: ["uvar", "uvarte"] },
    { inf: "vidieť", es: "ver", en: "to see", group: "i", aspect: "imp",
      pres: ["vidím", "vidíš", "vidí", "vidíme", "vidíte", "vidia"], past: ["videl", "videla", "videli"], imper: null },
    { inf: "musieť", es: "tener que / deber", en: "must / have to", group: "i", aspect: "imp",
      pres: ["musím", "musíš", "musí", "musíme", "musíte", "musia"], past: ["musel", "musela", "museli"], imper: null },
    { inf: "myslieť", es: "pensar", en: "to think", group: "i", aspect: "imp",
      pres: ["myslím", "myslíš", "myslí", "myslíme", "myslíte", "myslia"], past: ["myslel", "myslela", "mysleli"], imper: null },
    { inf: "spať", es: "dormir", en: "to sleep", group: "i", aspect: "imp",
      pres: ["spím", "spíš", "spí", "spíme", "spíte", "spia"], past: ["spal", "spala", "spali"], imper: ["spi", "spite"] },
    { inf: "chodiť", es: "ir (a menudo, a pie)", en: "to go (regularly, on foot)", group: "i", aspect: "imp", motion: true,
      pres: ["chodím", "chodíš", "chodí", "chodíme", "chodíte", "chodia"], past: ["chodil", "chodila", "chodili"], imper: ["choď", "choďte"] },
    { inf: "nosiť", es: "llevar (a menudo)", en: "to carry / wear (regularly)", group: "i", aspect: "imp", motion: true,
      pres: ["nosím", "nosíš", "nosí", "nosíme", "nosíte", "nosia"], past: ["nosil", "nosila", "nosili"], imper: ["nos", "noste"] },
    { inf: "voziť", es: "llevar en vehículo (a menudo)", en: "to drive someone (regularly)", group: "i", aspect: "imp", motion: true,
      pres: ["vozím", "vozíš", "vozí", "vozíme", "vozíte", "vozia"], past: ["vozil", "vozila", "vozili"], imper: null },
    { inf: "letieť", es: "volar (ahora, a un lugar)", en: "to fly (now, somewhere)", group: "i", aspect: "imp", motion: true,
      pres: ["letím", "letíš", "letí", "letíme", "letíte", "letia"], past: ["letel", "letela", "leteli"], imper: ["leť", "leťte"],
      fut: ["poletím", "poletíš", "poletí", "poletíme", "poletíte", "poletia"] },
    { inf: "bežať", es: "correr (ahora, a un lugar)", en: "to run (now, somewhere)", group: "i", aspect: "imp", motion: true,
      pres: ["bežím", "bežíš", "beží", "bežíme", "bežíte", "bežia"], past: ["bežal", "bežala", "bežali"], imper: ["bež", "bežte"],
      fut: ["pobežím", "pobežíš", "pobeží", "pobežíme", "pobežíte", "pobežia"] },

    // --- Group "e": -em / -iem, -eš / -ieš ... -ú / -ia ---
    { inf: "písať", es: "escribir", en: "to write", group: "e", aspect: "imp", partner: "napísať",
      pres: ["píšem", "píšeš", "píše", "píšeme", "píšete", "píšu"], past: ["písal", "písala", "písali"], imper: ["píš", "píšte"] },
    { inf: "napísať", es: "escribir (terminar)", en: "to write (finish)", group: "e", aspect: "perf", partner: "písať",
      pres: ["napíšem", "napíšeš", "napíše", "napíšeme", "napíšete", "napíšu"], past: ["napísal", "napísala", "napísali"], imper: ["napíš", "napíšte"] },
    { inf: "brať", es: "tomar / agarrar", en: "to take", group: "e", aspect: "imp", partner: "vziať",
      pres: ["beriem", "berieš", "berie", "berieme", "beriete", "berú"], past: ["bral", "brala", "brali"], imper: ["ber", "berte"] },
    { inf: "vziať", es: "tomar (una vez)", en: "to take (once)", group: "e", aspect: "perf", partner: "brať",
      pres: ["vezmem", "vezmeš", "vezme", "vezmeme", "vezmete", "vezmú"], past: ["vzal", "vzala", "vzali"], imper: ["vezmi", "vezmite"] },
    { inf: "piť", es: "beber", en: "to drink", group: "e", aspect: "imp", partner: "vypiť",
      pres: ["pijem", "piješ", "pije", "pijeme", "pijete", "pijú"], past: ["pil", "pila", "pili"], imper: ["pi", "pite"] },
    { inf: "vypiť", es: "beber (todo)", en: "to drink (up)", group: "e", aspect: "perf", partner: "piť",
      pres: ["vypijem", "vypiješ", "vypije", "vypijeme", "vypijete", "vypijú"], past: ["vypil", "vypila", "vypili"], imper: ["vypi", "vypite"] },
    { inf: "žiť", es: "vivir", en: "to live", group: "e", aspect: "imp",
      pres: ["žijem", "žiješ", "žije", "žijeme", "žijete", "žijú"], past: ["žil", "žila", "žili"], imper: ["ži", "žite"] },
    { inf: "začať", es: "empezar (una vez)", en: "to begin (once)", group: "e", aspect: "perf", partner: "začínať",
      pres: ["začnem", "začneš", "začne", "začneme", "začnete", "začnú"], past: ["začal", "začala", "začali"], imper: ["začni", "začnite"] },
    { inf: "vstať", es: "levantarse (una vez)", en: "to get up (once)", group: "e", aspect: "perf", partner: "vstávať",
      pres: ["vstanem", "vstaneš", "vstane", "vstaneme", "vstanete", "vstanú"], past: ["vstal", "vstala", "vstali"], imper: ["vstaň", "vstaňte"] },
    { inf: "nájsť", es: "encontrar", en: "to find", group: "e", aspect: "perf", partner: "hľadať",
      pres: ["nájdem", "nájdeš", "nájde", "nájdeme", "nájdete", "nájdu"], past: ["našiel", "našla", "našli"], imper: ["nájdi", "nájdite"] },
    { inf: "chcieť", es: "querer", en: "to want", group: "e", aspect: "imp",
      pres: ["chcem", "chceš", "chce", "chceme", "chcete", "chcú"], past: ["chcel", "chcela", "chceli"], imper: null },
    { inf: "môcť", es: "poder", en: "can / to be able", group: "e", aspect: "imp",
      pres: ["môžem", "môžeš", "môže", "môžeme", "môžete", "môžu"], past: ["mohol", "mohla", "mohli"], imper: null },
    { inf: "rozumieť", es: "entender", en: "to understand", group: "e", aspect: "imp",
      pres: ["rozumiem", "rozumieš", "rozumie", "rozumieme", "rozumiete", "rozumejú"], past: ["rozumel", "rozumela", "rozumeli"], imper: null },
    { inf: "smieť", es: "tener permiso", en: "may / to be allowed", group: "e", aspect: "imp",
      pres: ["smiem", "smieš", "smie", "smieme", "smiete", "smú"], past: ["smel", "smela", "smeli"], imper: null },
    { inf: "niesť", es: "llevar (ahora, en la mano)", en: "to carry (now)", group: "e", aspect: "imp", motion: true,
      pres: ["nesiem", "nesieš", "nesie", "nesieme", "nesiete", "nesú"], past: ["niesol", "niesla", "niesli"], imper: ["nes", "neste"],
      fut: ["ponesiem", "ponesieš", "ponesie", "ponesieme", "ponesiete", "ponesú"] },
    { inf: "viezť", es: "llevar en vehículo (ahora)", en: "to drive someone (now)", group: "e", aspect: "imp", motion: true,
      pres: ["veziem", "vezieš", "vezie", "vezieme", "veziete", "vezú"], past: ["viezol", "viezla", "viezli"], imper: ["vez", "vezte"],
      fut: ["poveziem", "povezieš", "povezie", "povezieme", "poveziete", "povezú"] },

    // --- Group "uj": -ujem, -uješ, -uje, -ujeme, -ujete, -ujú ---
    { inf: "pracovať", es: "trabajar", en: "to work", group: "uj", aspect: "imp",
      pres: ["pracujem", "pracuješ", "pracuje", "pracujeme", "pracujete", "pracujú"], past: ["pracoval", "pracovala", "pracovali"], imper: ["pracuj", "pracujte"] },
    { inf: "kupovať", es: "comprar (habitualmente)", en: "to buy (usually)", group: "uj", aspect: "imp", partner: "kúpiť",
      pres: ["kupujem", "kupuješ", "kupuje", "kupujeme", "kupujete", "kupujú"], past: ["kupoval", "kupovala", "kupovali"], imper: ["kupuj", "kupujte"] },
    { inf: "cestovať", es: "viajar", en: "to travel", group: "uj", aspect: "imp", motion: true,
      pres: ["cestujem", "cestuješ", "cestuje", "cestujeme", "cestujete", "cestujú"], past: ["cestoval", "cestovala", "cestovali"], imper: ["cestuj", "cestujte"] },
    { inf: "potrebovať", es: "necesitar", en: "to need", group: "uj", aspect: "imp",
      pres: ["potrebujem", "potrebuješ", "potrebuje", "potrebujeme", "potrebujete", "potrebujú"], past: ["potreboval", "potrebovala", "potrebovali"], imper: null },
    { inf: "študovať", es: "estudiar (una carrera)", en: "to study (at university)", group: "uj", aspect: "imp",
      pres: ["študujem", "študuješ", "študuje", "študujeme", "študujete", "študujú"], past: ["študoval", "študovala", "študovali"], imper: ["študuj", "študujte"] },
    { inf: "ďakovať", es: "agradecer", en: "to thank", group: "uj", aspect: "imp",
      pres: ["ďakujem", "ďakuješ", "ďakuje", "ďakujeme", "ďakujete", "ďakujú"], past: ["ďakoval", "ďakovala", "ďakovali"], imper: null },

    // --- Irregular ---
    { inf: "byť", es: "ser / estar", en: "to be", group: "irr", aspect: "imp",
      pres: ["som", "si", "je", "sme", "ste", "sú"], past: ["bol", "bola", "boli"], imper: ["buď", "buďte"],
      fut: ["budem", "budeš", "bude", "budeme", "budete", "budú"] },
    { inf: "ísť", es: "ir (ahora, a un lugar)", en: "to go (now, somewhere)", group: "irr", aspect: "imp", motion: true,
      pres: ["idem", "ideš", "ide", "ideme", "idete", "idú"], past: ["išiel", "išla", "išli"], imper: ["choď", "choďte"],
      fut: ["pôjdem", "pôjdeš", "pôjde", "pôjdeme", "pôjdete", "pôjdu"] },
    { inf: "prísť", es: "llegar / venir", en: "to arrive / come", group: "irr", aspect: "perf", motion: true,
      pres: ["prídem", "prídeš", "príde", "prídeme", "prídete", "prídu"], past: ["prišiel", "prišla", "prišli"], imper: ["príď", "príďte"] },
    { inf: "odísť", es: "irse / partir", en: "to leave", group: "irr", aspect: "perf", motion: true,
      pres: ["odídem", "odídeš", "odíde", "odídeme", "odídete", "odídu"], past: ["odišiel", "odišla", "odišli"], imper: ["odíď", "odíďte"] },
    { inf: "jesť", es: "comer", en: "to eat", group: "irr", aspect: "imp", partner: "zjesť",
      pres: ["jem", "ješ", "je", "jeme", "jete", "jedia"], past: ["jedol", "jedla", "jedli"], imper: ["jedz", "jedzte"] },
    { inf: "zjesť", es: "comer (todo)", en: "to eat (up)", group: "irr", aspect: "perf", partner: "jesť",
      pres: ["zjem", "zješ", "zje", "zjeme", "zjete", "zjedia"], past: ["zjedol", "zjedla", "zjedli"], imper: ["zjedz", "zjedzte"] },
    { inf: "vedieť", es: "saber", en: "to know (a fact) / can (a skill)", group: "irr", aspect: "imp",
      pres: ["viem", "vieš", "vie", "vieme", "viete", "vedia"], past: ["vedel", "vedela", "vedeli"], imper: null },
    { inf: "povedať", es: "decir (una vez)", en: "to say / tell (once)", group: "irr", aspect: "perf", partner: "hovoriť",
      pres: ["poviem", "povieš", "povie", "povieme", "poviete", "povedia"], past: ["povedal", "povedala", "povedali"], imper: ["povedz", "povedzte"] }
  ];

  // ===== Grammar topics =====
  // Each topic: title, intro, a table (rows of sk + meaning), examples with
  // audio, a tip, and exercises. `drill` names an extra exercise generator
  // in screens-verbs.js that builds questions from the VERBS tables.

  const TOPICS = [
    {
      id: "present",
      title: { sk: "Prítomný čas", es: "Presente: los 4 grupos", en: "Present tense: the 4 groups" },
      intro: {
        es: "Casi todos los verbos siguen uno de cuatro modelos. Mira la forma de «ja» y la de «oni»: con esas dos sabes el resto.",
        en: "Almost every verb follows one of four patterns. Look at the «ja» and «oni» forms: with those two you know the rest."
      },
      table: [
        { sk: "čakať → čakám, čakáš, čaká, čakáme, čakáte, čakajú", es: "grupo -ám (oni: -ajú)", en: "-ám group (oni: -ajú)" },
        { sk: "robiť → robím, robíš, robí, robíme, robíte, robia", es: "grupo -ím (oni: -ia)", en: "-ím group (oni: -ia)" },
        { sk: "písať → píšem, píšeš, píše, píšeme, píšete, píšu", es: "grupo -em / -iem (oni: -ú)", en: "-em / -iem group (oni: -ú)" },
        { sk: "pracovať → pracujem, pracuješ, pracuje, pracujeme, pracujete, pracujú", es: "grupo -ujem (verbos en -ovať)", en: "-ujem group (verbs in -ovať)" },
        { sk: "byť → som, si, je, sme, ste, sú", es: "irregular", en: "irregular" },
        { sk: "ísť → idem, ideš, ide, ideme, idete, idú", es: "irregular", en: "irregular" }
      ],
      examples: [
        { sk: "Každý deň čakám na autobus.", es: "Todos los días espero el autobús.", en: "Every day I wait for the bus." },
        { sk: "Čo robíš?", es: "¿Qué haces?", en: "What are you doing?" },
        { sk: "Píšeme e-mail.", es: "Escribimos un correo.", en: "We're writing an e-mail." },
        { sk: "Kde pracujete?", es: "¿Dónde trabaja usted?", en: "Where do you work?" }
      ],
      note: {
        es: "Los verbos en -ovať casi siempre van al grupo -ujem (cestovať → cestujem, potrebovať → potrebujem). Para la negación se pega «ne» delante: nerobím, nepíšem; con byť es «nie som».",
        en: "Verbs in -ovať almost always go to the -ujem group (cestovať → cestujem, potrebovať → potrebujem). For the negative, «ne» is joined to the front: nerobím, nepíšem; with byť it's «nie som»."
      },
      drill: "present",
      exercises: [
        { sk: "Kde ___? (ty, bývať)", options: ["bývaš", "býva", "bývam", "bývajú"], answer: 0, tr: { es: "¿Dónde vives?", en: "Where do you live?" } },
        { sk: "Oni ___ po slovensky. (hovoriť)", options: ["hovoria", "hovorí", "hovoríme", "hovorím"], answer: 0, tr: { es: "Ellos hablan eslovaco.", en: "They speak Slovak." } },
        { sk: "My ___ v banke. (pracovať)", options: ["pracujeme", "pracujete", "pracujú", "pracuje"], answer: 0, tr: { es: "Trabajamos en un banco.", en: "We work at a bank." } },
        { sk: "Čo ___ ráno? (vy, piť)", options: ["pijete", "pijeme", "piješ", "pijú"], answer: 0, tr: { es: "¿Qué toman ustedes a la mañana?", en: "What do you drink in the morning?" } },
        { sk: "Deti ___ o deviatej. (spať)", options: ["spia", "spí", "spíme", "spíte"], answer: 0, tr: { es: "Los chicos duermen a las nueve.", en: "The children sleep at nine." } }
      ]
    },
    {
      id: "past",
      title: { sk: "Minulý čas", es: "Pasado", en: "Past tense" },
      intro: {
        es: "El pasado se forma con la raíz del infinitivo + -l (masculino), -la (femenino), -li (plural), y las formas de byť: som, si, sme, ste. En la 3.ª persona no se agrega nada.",
        en: "The past is the infinitive stem + -l (masculine), -la (feminine), -li (plural), plus the forms of byť: som, si, sme, ste. Nothing is added in the 3rd person."
      },
      table: [
        { sk: "ja som robil / robila", es: "yo hice / hacía (hombre / mujer)", en: "I did (man / woman)" },
        { sk: "ty si robil / robila", es: "tú hiciste", en: "you did" },
        { sk: "on robil, ona robila", es: "él / ella hizo", en: "he / she did" },
        { sk: "my sme robili", es: "nosotros hicimos", en: "we did" },
        { sk: "vy ste robili", es: "ustedes hicieron / usted hizo", en: "you did (plural / formal)" },
        { sk: "oni robili", es: "ellos hicieron", en: "they did" }
      ],
      examples: [
        { sk: "Včera som pracoval do večera.", es: "Ayer trabajé hasta la noche. (hombre)", en: "Yesterday I worked until the evening. (man)" },
        { sk: "Včera som pracovala do večera.", es: "Ayer trabajé hasta la noche. (mujer)", en: "Yesterday I worked until the evening. (woman)" },
        { sk: "Kde ste boli cez víkend?", es: "¿Dónde estuvieron el fin de semana?", en: "Where were you at the weekend?" },
        { sk: "Išli sme do kina.", es: "Fuimos al cine.", en: "We went to the cinema." },
        { sk: "Jedol si už?", es: "¿Ya comiste?", en: "Have you eaten yet?" }
      ],
      note: {
        es: "«som / si / sme / ste» va en segundo lugar de la oración: «Včera som bol doma», no «Včera bol som». Irregulares frecuentes: ísť → išiel / išla, jesť → jedol, môcť → mohol, niesť → niesol, nájsť → našiel.",
        en: "«som / si / sme / ste» goes in second position: «Včera som bol doma», not «Včera bol som». Common irregular forms: ísť → išiel / išla, jesť → jedol, môcť → mohol, niesť → niesol, nájsť → našiel."
      },
      drill: "past",
      exercises: [
        { sk: "Včera ___ v kine. (my, byť)", options: ["sme boli", "boli sme", "sme bol", "ste boli"], answer: 0, tr: { es: "Ayer estuvimos en el cine.", en: "Yesterday we were at the cinema." } },
        { sk: "Zuzana ___ list. (písať)", options: ["písala", "písal", "písali", "píše"], answer: 0, tr: { es: "Zuzana escribía una carta.", en: "Zuzana was writing a letter." } },
        { sk: "Peter ___ do práce autobusom. (ísť)", options: ["išiel", "išla", "išli", "ide"], answer: 0, tr: { es: "Peter fue al trabajo en autobús.", en: "Peter went to work by bus." } },
        { sk: "Čo si ___ na obed, Jana? (jesť)", options: ["jedla", "jedol", "jedli", "ješ"], answer: 0, tr: { es: "¿Qué comiste en el almuerzo, Jana?", en: "What did you have for lunch, Jana?" } },
        { sk: "Nemohol ___ prísť. (ja)", options: ["som", "si", "sme", "je"], answer: 0, tr: { es: "No pude venir.", en: "I couldn't come." } },
        { sk: "Deti ___ celý deň vonku. (byť)", options: ["boli", "bol", "bola", "sú boli"], answer: 0, tr: { es: "Los chicos estuvieron afuera todo el día.", en: "The children were outside all day." } }
      ]
    },
    {
      id: "future",
      title: { sk: "Budúci čas", es: "Futuro", en: "Future tense" },
      intro: {
        es: "Hay dos maneras, según el aspecto del verbo. Imperfectivo: budem + infinitivo (budem pracovať). Perfectivo: el «presente» ya significa futuro (zavolám = llamaré).",
        en: "There are two ways, depending on the verb's aspect. Imperfective: budem + infinitive (budem pracovať). Perfective: the «present» form already means future (zavolám = I will call)."
      },
      table: [
        { sk: "budem, budeš, bude, budeme, budete, budú", es: "futuro de byť (estaré / seré)", en: "future of byť (I will be)" },
        { sk: "budem pracovať", es: "voy a trabajar / trabajaré (proceso)", en: "I will be working (process)" },
        { sk: "zavolám ti", es: "te llamaré (una vez)", en: "I'll call you (once)" },
        { sk: "urobím to zajtra", es: "lo haré mañana (y quedará hecho)", en: "I'll do it tomorrow (and finish it)" },
        { sk: "pôjdem, pôjdeš, pôjde…", es: "futuro de ísť (iré)", en: "future of ísť (I will go)" },
        { sk: "poletím, pobežím, ponesiem", es: "futuro de letieť, bežať, niesť", en: "future of letieť, bežať, niesť" }
      ],
      examples: [
        { sk: "Zajtra budem doma.", es: "Mañana estaré en casa.", en: "Tomorrow I'll be at home." },
        { sk: "V lete budeme cestovať.", es: "En verano vamos a viajar.", en: "In summer we'll travel." },
        { sk: "Večer ti zavolám.", es: "A la noche te llamo.", en: "I'll call you tonight." },
        { sk: "V sobotu pôjdeme na výlet.", es: "El sábado iremos de excursión.", en: "On Saturday we'll go on a trip." }
      ],
      note: {
        es: "Nunca se dice «budem zavolať»: con verbos perfectivos no se usa budem. Y con ísť tampoco: se dice «pôjdem», no «budem ísť».",
        en: "Never say «budem zavolať»: budem is not used with perfective verbs. Nor with ísť: say «pôjdem», not «budem ísť»."
      },
      exercises: [
        { sk: "Zajtra ___ doma. (ja, byť)", options: ["budem", "som", "bude", "budú"], answer: 0, tr: { es: "Mañana estaré en casa.", en: "Tomorrow I'll be at home." } },
        { sk: "Večer ti ___. (ja)", options: ["zavolám", "budem zavolať", "zavolal", "volám"], answer: 0, tr: { es: "A la noche te llamo.", en: "I'll call you tonight." } },
        { sk: "Celé leto ___ cestovať. (my)", options: ["budeme", "sme", "budú", "budem"], answer: 0, tr: { es: "Todo el verano vamos a viajar.", en: "We'll travel all summer." } },
        { sk: "V piatok ___ do Viedne. (ja)", options: ["pôjdem", "budem ísť", "idem bude", "išiel"], answer: 0, tr: { es: "El viernes iré a Viena.", en: "On Friday I'll go to Vienna." } },
        { sk: "Kedy ___ tú prácu? (ty, urobiť)", options: ["urobíš", "budeš urobiť", "urobil", "robíš"], answer: 0, tr: { es: "¿Cuándo vas a hacer ese trabajo?", en: "When will you do that work?" } }
      ]
    },
    {
      id: "aspect",
      title: { sk: "Vid", es: "Aspecto: imperfectivo y perfectivo", en: "Aspect: imperfective and perfective" },
      intro: {
        es: "Casi todos los verbos vienen de a pares. El imperfectivo habla del proceso o de la costumbre; el perfectivo, de una acción completa, con resultado. El perfectivo no tiene presente: su «presente» es futuro.",
        en: "Most verbs come in pairs. The imperfective is about the process or a habit; the perfective, about one complete action with a result. The perfective has no present: its «present» is future."
      },
      table: [
        { sk: "robiť / urobiť", es: "hacer", en: "to do" },
        { sk: "písať / napísať", es: "escribir", en: "to write" },
        { sk: "čítať / prečítať", es: "leer", en: "to read" },
        { sk: "kupovať / kúpiť", es: "comprar", en: "to buy" },
        { sk: "platiť / zaplatiť", es: "pagar", en: "to pay" },
        { sk: "hovoriť / povedať", es: "hablar / decir", en: "to speak / say" },
        { sk: "brať / vziať", es: "tomar", en: "to take" },
        { sk: "začínať / začať", es: "empezar", en: "to begin" },
        { sk: "hľadať / nájsť", es: "buscar / encontrar", en: "to look for / find" }
      ],
      examples: [
        { sk: "Každý deň čítam noviny.", es: "Todos los días leo el diario. (costumbre)", en: "Every day I read the paper. (habit)" },
        { sk: "Včera som prečítal celú knihu.", es: "Ayer leí el libro entero. (terminado)", en: "Yesterday I read the whole book. (finished)" },
        { sk: "Celý večer som písal e-maily.", es: "Toda la noche estuve escribiendo correos. (proceso)", en: "All evening I was writing e-mails. (process)" },
        { sk: "Napísal som e-mail a išiel spať.", es: "Escribí el correo y me fui a dormir. (resultado)", en: "I wrote the e-mail and went to bed. (result)" }
      ],
      note: {
        es: "Pistas: «každý deň, často, vždy, celý deň» → imperfectivo. «už, konečne, raz, hneď» y una acción terminada → perfectivo. Muchos perfectivos se forman con prefijo: na-, pre-, u-, za-, vy-.",
        en: "Clues: «každý deň, často, vždy, celý deň» → imperfective. «už, konečne, raz, hneď» and one finished action → perfective. Many perfectives take a prefix: na-, pre-, u-, za-, vy-."
      },
      exercises: [
        { sk: "Každý deň ___ noviny.", options: ["čítam", "prečítam"], answer: 0, tr: { es: "Todos los días leo el diario.", en: "I read the paper every day." } },
        { sk: "Už som ___ celú knihu.", options: ["prečítal", "čítal"], answer: 0, tr: { es: "Ya leí el libro entero.", en: "I've already read the whole book." } },
        { sk: "Na trhu často ___ zeleninu.", options: ["kupujem", "kúpim"], answer: 0, tr: { es: "En el mercado compro verdura a menudo.", en: "I often buy vegetables at the market." } },
        { sk: "Zajtra ti ___ nový telefón.", options: ["kúpim", "kupujem"], answer: 0, tr: { es: "Mañana te compro un teléfono nuevo.", en: "Tomorrow I'll buy you a new phone." } },
        { sk: "Už som ___ účet, môžeme ísť.", options: ["zaplatil", "platil"], answer: 0, tr: { es: "Ya pagué la cuenta, podemos irnos.", en: "I've already paid the bill, we can go." } },
        { sk: "Celý deň ___ úlohu a nevedel som ju urobiť.", options: ["som robil", "som urobil"], answer: 0, tr: { es: "Estuve todo el día haciendo la tarea y no pude terminarla.", en: "I worked on the task all day and couldn't finish it." } },
        { sk: "Konečne som ___ kľúče!", options: ["našiel", "hľadal"], answer: 0, tr: { es: "¡Por fin encontré las llaves!", en: "I finally found the keys!" } },
        { sk: "Čo ti ___ lekár?", options: ["povedal", "hovoril"], answer: 0, tr: { es: "¿Qué te dijo el médico?", en: "What did the doctor tell you?" } },
        { sk: "Film ___ o ôsmej a skončil o desiatej.", options: ["začal", "začínal"], answer: 0, tr: { es: "La película empezó a las ocho y terminó a las diez.", en: "The film started at eight and ended at ten." } }
      ]
    },
    {
      id: "motion",
      title: { sk: "Slovesá pohybu", es: "Verbos de movimiento", en: "Verbs of motion" },
      intro: {
        es: "Para moverse hay pares de verbos. Uno indica un viaje concreto, ahora, hacia un lugar (ísť). El otro, ir a menudo o ida y vuelta (chodiť).",
        en: "Movement uses pairs of verbs. One is a single trip, now, towards a place (ísť). The other is going regularly or there and back (chodiť)."
      },
      table: [
        { sk: "ísť / chodiť", es: "ir (a pie o en general)", en: "to go (on foot or in general)" },
        { sk: "letieť / lietať", es: "volar", en: "to fly" },
        { sk: "bežať / behať", es: "correr", en: "to run" },
        { sk: "niesť / nosiť", es: "llevar en la mano", en: "to carry" },
        { sk: "viezť / voziť", es: "llevar en un vehículo", en: "to drive someone / something" },
        { sk: "ísť autobusom, vlakom, autom", es: "ir en autobús, tren, auto (instrumental)", en: "to go by bus, train, car (instrumental)" },
        { sk: "prísť / odísť", es: "llegar / irse", en: "to arrive / leave" }
      ],
      examples: [
        { sk: "Teraz idem do obchodu.", es: "Ahora voy al negocio.", en: "I'm going to the shop now." },
        { sk: "Každý deň chodím do práce peši.", es: "Todos los días voy al trabajo a pie.", en: "Every day I walk to work." },
        { sk: "Zajtra letím do Madridu.", es: "Mañana vuelo a Madrid.", en: "Tomorrow I'm flying to Madrid." },
        { sk: "Ráno vozím deti do školy.", es: "A la mañana llevo a los chicos a la escuela.", en: "In the morning I drive the kids to school." },
        { sk: "Kedy prídeš domov?", es: "¿Cuándo llegas a casa?", en: "When will you get home?" }
      ],
      note: {
        es: "En eslovaco «ísť» sirve también para ir en vehículo: «Idem autobusom». Para viajes largos se usa cestovať. Los prefijos cambian el sentido: prísť (llegar), odísť (irse), vojsť (entrar), vyjsť (salir), prejsť (cruzar).",
        en: "In Slovak «ísť» also covers going by vehicle: «Idem autobusom». For long trips use cestovať. Prefixes change the meaning: prísť (arrive), odísť (leave), vojsť (go in), vyjsť (go out), prejsť (cross)."
      },
      exercises: [
        { sk: "Teraz ___ do obchodu. Chceš niečo?", options: ["idem", "chodím"], answer: 0, tr: { es: "Ahora voy al negocio. ¿Quieres algo?", en: "I'm going to the shop now. Do you want anything?" } },
        { sk: "Každý deň ___ do práce peši.", options: ["chodím", "idem"], answer: 0, tr: { es: "Todos los días voy al trabajo a pie.", en: "Every day I walk to work." } },
        { sk: "Zajtra ___ do Londýna.", options: ["letím", "lietam"], answer: 0, tr: { es: "Mañana vuelo a Londres.", en: "Tomorrow I'm flying to London." } },
        { sk: "Pilot ___ každý týždeň.", options: ["lieta", "letí"], answer: 0, tr: { es: "El piloto vuela todas las semanas.", en: "The pilot flies every week." } },
        { sk: "Do práce ___ električkou.", options: ["chodím", "nosím", "vozím", "bežím"], answer: 0, tr: { es: "Al trabajo voy en tranvía.", en: "I go to work by tram." } },
        { sk: "Mám ti ___ tašku? Je ťažká.", options: ["niesť", "nosiť", "ísť", "voziť"], answer: 0, tr: { es: "¿Te llevo el bolso? Es pesado.", en: "Shall I carry your bag? It's heavy." } },
        { sk: "Vlak ___ o 8.15.", options: ["odíde", "nosí", "lieta", "vozí"], answer: 0, tr: { es: "El tren sale a las 8.15.", en: "The train leaves at 8.15." } },
        { sk: "Rád ___ v parku.", options: ["behám", "bežím"], answer: 0, tr: { es: "Me gusta correr en el parque.", en: "I like running in the park." } }
      ]
    },
    {
      id: "modals",
      title: { sk: "Modálne slovesá", es: "Verbos modales", en: "Modal verbs" },
      intro: {
        es: "Van seguidos de un infinitivo, como en castellano: musím pracovať (tengo que trabajar).",
        en: "They are followed by an infinitive, as in English: musím pracovať (I have to work)."
      },
      table: [
        { sk: "musieť: musím, musíš, musí…", es: "tener que", en: "must / have to" },
        { sk: "môcť: môžem, môžeš, môže…", es: "poder (posibilidad, permiso)", en: "can / may" },
        { sk: "chcieť: chcem, chceš, chce…", es: "querer", en: "to want" },
        { sk: "smieť: smiem, smieš, smie…", es: "tener permiso (formal)", en: "may / be allowed" },
        { sk: "vedieť: viem, vieš, vie…", es: "saber hacer algo", en: "to know how / can (skill)" }
      ],
      examples: [
        { sk: "Musím ísť k lekárovi.", es: "Tengo que ir al médico.", en: "I have to go to the doctor." },
        { sk: "Môžem platiť kartou?", es: "¿Puedo pagar con tarjeta?", en: "Can I pay by card?" },
        { sk: "Chceme bývať v centre.", es: "Queremos vivir en el centro.", en: "We want to live in the centre." },
        { sk: "Tu sa nesmie fajčiť.", es: "Aquí no se puede fumar.", en: "Smoking is not allowed here." },
        { sk: "Viete plávať?", es: "¿Sabe nadar?", en: "Can you swim?" }
      ],
      note: {
        es: "«Viem plávať» (sé nadar, habilidad) no es lo mismo que «môžem plávať» (puedo nadar, tengo la posibilidad o el permiso). Para «no tengo que» se dice «nemusím».",
        en: "«Viem plávať» (I can swim, a skill) is not «môžem plávať» (I'm able / allowed to swim now). For «I don't have to» say «nemusím»."
      },
      exercises: [
        { sk: "Zajtra ___ ísť do práce skoro. (ja)", options: ["musím", "musí", "musia", "musíme"], answer: 0, tr: { es: "Mañana tengo que ir temprano al trabajo.", en: "Tomorrow I have to go to work early." } },
        { sk: "___ otvoriť okno? (ja)", hint: { es: "Pides permiso.", en: "You're asking for permission." }, options: ["Môžem", "Viem", "Musím", "Chcem"], answer: 0, tr: { es: "¿Puedo abrir la ventana?", en: "May I open the window?" } },
        { sk: "Môj syn ___ plávať.", hint: { es: "Es una habilidad.", en: "It's a skill." }, options: ["vie", "môže", "musí", "smie"], answer: 0, tr: { es: "Mi hijo sabe nadar.", en: "My son can swim." } },
        { sk: "Čo ___ robiť cez víkend? (vy)", options: ["chcete", "chceme", "chcú", "chceš"], answer: 0, tr: { es: "¿Qué quieren hacer el fin de semana?", en: "What do you want to do at the weekend?" } },
        { sk: "V nemocnici sa ___ fajčiť.", options: ["nesmie", "nevie", "nechce", "nemusí"], answer: 0, tr: { es: "En el hospital no se puede fumar.", en: "Smoking is not allowed in the hospital." } },
        { sk: "Dnes je sobota, ___ ísť do práce. (ja)", options: ["nemusím", "nesmiem", "neviem", "nemôžem"], answer: 0, tr: { es: "Hoy es sábado, no tengo que ir a trabajar.", en: "It's Saturday, I don't have to go to work." } }
      ]
    }
  ];

  // ===== Public data =====

  window.AppData.verbs = {
    PERSONS: PERSONS,
    VERBS: VERBS,
    TOPICS: TOPICS
  };
})();
