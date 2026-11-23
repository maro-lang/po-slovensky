/*
 * data/cases.js — Content of the case workshop (taller de casos).
 *
 * What it holds:
 *   AppData.cases.ORDER       -> the six cases in their traditional order
 *   AppData.cases.CASES       -> name, questions, uses, examples and
 *                                prepositions of each case
 *   AppData.cases.PARADIGMS   -> the 12 classic declension models with
 *                                their full singular and plural tables
 *   AppData.cases.EXERCISES   -> "choose the right form" sentences
 *
 * Conventions:
 *   - Slovak text is always in a field called `sk`, so the quality-check
 *     script (tools/check_slovak.js, outside the app) can find it.
 *   - In the tables, "|" separates the stem from the ending:
 *     "chlap|ovi" is shown as "chlap" + coloured "ovi". A form ending in
 *     "|" has no ending (for example the genitive plural "žien|").
 *   - Forms are listed in case order: nom, gen, dat, acc, loc, ins.
 *   - The vocative (5th case) is left out: modern Slovak barely uses it.
 *
 * Depends on: nothing. Used by js/screens-cases.js.
 */

window.AppData = window.AppData || {};

(function () {
  "use strict";

  // ===== The six cases =====

  const ORDER = ["nom", "gen", "dat", "acc", "loc", "ins"];

  const CASES = {
    nom: {
      number: 1,
      sk: "nominatív",
      name: { es: "Nominativo", en: "Nominative" },
      questions: { sk: "kto? čo?" },
      use: {
        es: "Es la forma del diccionario. Se usa para el sujeto: quién o qué hace la acción.",
        en: "The dictionary form. Used for the subject: who or what does the action."
      },
      examples: [
        { sk: "Brat je doma.", es: "Mi hermano está en casa.", en: "My brother is at home." },
        { sk: "Mesto je veľké.", es: "La ciudad es grande.", en: "The city is big." }
      ],
      prepositions: []
    },

    gen: {
      number: 2,
      sk: "genitív",
      name: { es: "Genitivo", en: "Genitive" },
      questions: { sk: "koho? čoho?" },
      use: {
        es: "Indica de quién es algo (como «de» en castellano) y va después de preposiciones como do, z, od, bez y u.",
        en: "Shows whose something is (like English «of» or «'s») and follows prepositions such as do, z, od, bez and u."
      },
      examples: [
        { sk: "Idem do mesta.", es: "Voy a la ciudad.", en: "I'm going to the city." },
        { sk: "To je auto môjho brata.", es: "Es el auto de mi hermano.", en: "It's my brother's car." }
      ],
      prepositions: [
        { sk: "do", es: "a, hacia adentro", en: "to, into" },
        { sk: "z / zo", es: "de, desde (adentro)", en: "from, out of" },
        { sk: "od", es: "de, desde (alguien)", en: "from (someone)" },
        { sk: "bez", es: "sin", en: "without" },
        { sk: "u", es: "en casa de, junto a", en: "at someone's place" },
        { sk: "vedľa", es: "al lado de", en: "next to" },
        { sk: "počas", es: "durante", en: "during" },
        { sk: "podľa", es: "según", en: "according to" }
      ]
    },

    dat: {
      number: 3,
      sk: "datív",
      name: { es: "Dativo", en: "Dative" },
      questions: { sk: "komu? čomu?" },
      use: {
        es: "Indica a quién va dirigida la acción (el complemento indirecto) y va después de k, proti y vďaka.",
        en: "Shows who receives the action (the indirect object) and follows k, proti and vďaka."
      },
      examples: [
        { sk: "Dám knihu bratovi.", es: "Le doy el libro a mi hermano.", en: "I'll give the book to my brother." },
        { sk: "Idem k doktorovi.", es: "Voy al médico.", en: "I'm going to the doctor." }
      ],
      prepositions: [
        { sk: "k / ku", es: "hacia, a (una persona o lugar)", en: "towards, to" },
        { sk: "proti", es: "contra", en: "against" },
        { sk: "oproti", es: "enfrente de", en: "opposite" },
        { sk: "vďaka", es: "gracias a", en: "thanks to" },
        { sk: "kvôli", es: "por, a causa de", en: "because of" }
      ]
    },

    acc: {
      number: 4,
      sk: "akuzatív",
      name: { es: "Acusativo", en: "Accusative" },
      questions: { sk: "koho? čo?" },
      use: {
        es: "Es el complemento directo: lo que se ve, se compra o se busca. También va después de pre, cez y de na cuando indica adónde.",
        en: "The direct object: what you see, buy or look for. It also follows pre, cez, and na when it means «where to»."
      },
      examples: [
        { sk: "Vidím ženu.", es: "Veo a la mujer.", en: "I see the woman." },
        { sk: "Čakám na autobus.", es: "Espero el autobús.", en: "I'm waiting for the bus." }
      ],
      prepositions: [
        { sk: "pre", es: "para", en: "for" },
        { sk: "cez", es: "a través de, por", en: "through, across" },
        { sk: "na (kam?)", es: "a, hacia (adónde)", en: "to, onto (where to)" },
        { sk: "za (kam?)", es: "detrás de (con movimiento)", en: "behind (with movement)" }
      ]
    },

    loc: {
      number: 6,
      sk: "lokál",
      name: { es: "Locativo", en: "Locative" },
      questions: { sk: "o kom? o čom?" },
      use: {
        es: "Siempre va con preposición. Indica dónde está algo (v, na) o de qué se habla (o).",
        en: "Always used with a preposition. Says where something is (v, na) or what you talk about (o)."
      },
      examples: [
        { sk: "Bývam v meste.", es: "Vivo en la ciudad.", en: "I live in the city." },
        { sk: "Hovoríme o filme.", es: "Hablamos de la película.", en: "We're talking about the film." }
      ],
      prepositions: [
        { sk: "v / vo", es: "en (dentro de)", en: "in" },
        { sk: "na (kde?)", es: "en, sobre (dónde)", en: "on, at (where)" },
        { sk: "o", es: "sobre, acerca de", en: "about" },
        { sk: "po", es: "después de, por", en: "after, around" },
        { sk: "pri", es: "junto a, cerca de", en: "by, near" }
      ]
    },

    ins: {
      number: 7,
      sk: "inštrumentál",
      name: { es: "Instrumental", en: "Instrumental" },
      questions: { sk: "s kým? s čím?" },
      use: {
        es: "Indica con quién o con qué se hace algo (s) y la posición con pred, za, nad, pod y medzi.",
        en: "Says who or what you do something with (s) and position with pred, za, nad, pod and medzi."
      },
      examples: [
        { sk: "Idem s kamarátom.", es: "Voy con un amigo.", en: "I'm going with a friend." },
        { sk: "Píšem perom.", es: "Escribo con bolígrafo.", en: "I write with a pen." }
      ],
      prepositions: [
        { sk: "s / so", es: "con", en: "with" },
        { sk: "pred", es: "delante de, antes de", en: "in front of, before" },
        { sk: "za (kde?)", es: "detrás de (sin movimiento)", en: "behind (no movement)" },
        { sk: "nad", es: "encima de", en: "above" },
        { sk: "pod", es: "debajo de", en: "under" },
        { sk: "medzi", es: "entre", en: "between" }
      ]
    }
  };

  // ===== The 12 declension models =====
  // gender: "m-anim" masculine people/animals, "m-inan" masculine things,
  //         "f" feminine, "n" neuter.

  const GENDERS = {
    "m-anim": { es: "Masculino animado (personas y animales)", en: "Masculine animate (people and animals)" },
    "m-inan": { es: "Masculino inanimado (cosas)", en: "Masculine inanimate (things)" },
    "f": { es: "Femenino", en: "Feminine" },
    "n": { es: "Neutro", en: "Neuter" }
  };

  const PARADIGMS = [
    {
      id: "chlap", gender: "m-anim",
      hint: { es: "Termina en consonante", en: "Ends in a consonant" },
      alsoLike: { sk: "brat, kamarát, doktor" },
      sg: ["chlap|", "chlap|a", "chlap|ovi", "chlap|a", "chlap|ovi", "chlap|om"],
      pl: ["chlap|i", "chlap|ov", "chlap|om", "chlap|ov", "chlap|och", "chlap|mi"]
    },
    {
      id: "hrdina", gender: "m-anim",
      hint: { es: "Termina en -a", en: "Ends in -a" },
      alsoLike: { sk: "kolega, turista" },
      sg: ["hrdin|a", "hrdin|u", "hrdin|ovi", "hrdin|u", "hrdin|ovi", "hrdin|om"],
      pl: ["hrdin|ovia", "hrdin|ov", "hrdin|om", "hrdin|ov", "hrdin|och", "hrdin|ami"]
    },
    {
      id: "dub", gender: "m-inan",
      hint: { es: "Termina en consonante dura", en: "Ends in a hard consonant" },
      alsoLike: { sk: "obchod, film, autobus" },
      sg: ["dub|", "dub|a", "dub|u", "dub|", "dub|e", "dub|om"],
      pl: ["dub|y", "dub|ov", "dub|om", "dub|y", "dub|och", "dub|mi"]
    },
    {
      id: "stroj", gender: "m-inan",
      hint: { es: "Termina en consonante suave", en: "Ends in a soft consonant" },
      alsoLike: { sk: "čaj, počítač, kľúč" },
      sg: ["stroj|", "stroj|a", "stroj|u", "stroj|", "stroj|i", "stroj|om"],
      pl: ["stroj|e", "stroj|ov", "stroj|om", "stroj|e", "stroj|och", "stroj|mi"]
    },
    {
      id: "žena", gender: "f",
      hint: { es: "Termina en -a después de consonante dura", en: "Ends in -a after a hard consonant" },
      alsoLike: { sk: "mama, škola, káva" },
      sg: ["žen|a", "žen|y", "žen|e", "žen|u", "žen|e", "žen|ou"],
      pl: ["žen|y", "žien|", "žen|ám", "žen|y", "žen|ách", "žen|ami"]
    },
    {
      id: "ulica", gender: "f",
      hint: { es: "Termina en -a después de consonante suave", en: "Ends in -a after a soft consonant" },
      alsoLike: { sk: "stanica, práca" },
      sg: ["ulic|a", "ulic|e", "ulic|i", "ulic|u", "ulic|i", "ulic|ou"],
      pl: ["ulic|e", "ulíc|", "ulic|iam", "ulic|e", "ulic|iach", "ulic|ami"]
    },
    {
      id: "dlaň", gender: "f",
      hint: { es: "Termina en consonante suave (genitivo en -e)", en: "Ends in a soft consonant (genitive in -e)" },
      alsoLike: { sk: "pieseň, báseň" },
      sg: ["dlaň|", "dlan|e", "dlan|i", "dlaň|", "dlan|i", "dlaň|ou"],
      pl: ["dlan|e", "dlan|í", "dlan|iam", "dlan|e", "dlan|iach", "dlaň|ami"]
    },
    {
      id: "kosť", gender: "f",
      hint: { es: "Termina en consonante (genitivo en -i)", en: "Ends in a consonant (genitive in -i)" },
      alsoLike: { sk: "radosť, noc, vec" },
      sg: ["kosť|", "kost|i", "kost|i", "kosť|", "kost|i", "kosť|ou"],
      pl: ["kost|i", "kost|í", "kost|iam", "kost|i", "kost|iach", "kosť|ami"]
    },
    {
      id: "mesto", gender: "n",
      hint: { es: "Termina en -o", en: "Ends in -o" },
      alsoLike: { sk: "auto, okno, pero" },
      sg: ["mest|o", "mest|a", "mest|u", "mest|o", "mest|e", "mest|om"],
      pl: ["mest|á", "miest|", "mest|ám", "mest|á", "mest|ách", "mest|ami"]
    },
    {
      id: "srdce", gender: "n",
      hint: { es: "Termina en -e", en: "Ends in -e" },
      alsoLike: { sk: "more, vajce" },
      sg: ["srdc|e", "srdc|a", "srdc|u", "srdc|e", "srdc|i", "srdc|om"],
      pl: ["srdc|ia", "sŕdc|", "srdc|iam", "srdc|ia", "srdc|iach", "srdc|ami"]
    },
    {
      id: "vysvedčenie", gender: "n",
      hint: { es: "Termina en -ie", en: "Ends in -ie" },
      alsoLike: { sk: "námestie, stretnutie" },
      sg: ["vysvedčen|ie", "vysvedčen|ia", "vysvedčen|iu", "vysvedčen|ie", "vysvedčen|í", "vysvedčen|ím"],
      pl: ["vysvedčen|ia", "vysvedčen|í", "vysvedčen|iam", "vysvedčen|ia", "vysvedčen|iach", "vysvedčen|iami"]
    },
    {
      id: "dievča", gender: "n",
      hint: { es: "Termina en -a o -ä (seres jóvenes)", en: "Ends in -a or -ä (young beings)" },
      alsoLike: { sk: "mača, šteňa" },
      sg: ["dievč|a", "dievč|aťa", "dievč|aťu", "dievč|a", "dievč|ati", "dievč|aťom"],
      pl: ["dievč|atá", "dievč|at", "dievč|atám", "dievč|atá", "dievč|atách", "dievč|atami"]
    }
  ];

  // ===== Practice sentences =====
  // `forms` are the six singular forms of the noun (case order), used to
  // build the answer options. `answerCase` is the case of the right form.

  const EXERCISES = [
    { sk: "To je môj ___.", noun: "brat", answerCase: "nom",
      forms: ["brat", "brata", "bratovi", "brata", "bratovi", "bratom"],
      es: "Es mi hermano.", en: "This is my brother." },
    { sk: "Kde je ___?", noun: "stanica", answerCase: "nom",
      forms: ["stanica", "stanice", "stanici", "stanicu", "stanici", "stanicou"],
      es: "¿Dónde está la estación?", en: "Where is the station?" },
    { sk: "___ je veľké.", noun: "mesto", answerCase: "nom",
      forms: ["mesto", "mesta", "mestu", "mesto", "meste", "mestom"],
      es: "La ciudad es grande.", en: "The city is big." },

    { sk: "Idem do ___.", noun: "obchod", answerCase: "gen",
      forms: ["obchod", "obchodu", "obchodu", "obchod", "obchode", "obchodom"],
      es: "Voy a la tienda.", en: "I'm going to the shop." },
    { sk: "Pijem kávu bez ___.", noun: "cukor", answerCase: "gen",
      forms: ["cukor", "cukru", "cukru", "cukor", "cukre", "cukrom"],
      es: "Tomo café sin azúcar.", en: "I drink coffee without sugar." },
    { sk: "To je auto môjho ___.", noun: "otec", answerCase: "gen",
      forms: ["otec", "otca", "otcovi", "otca", "otcovi", "otcom"],
      es: "Es el auto de mi padre.", en: "It's my father's car." },
    { sk: "Bývam u ___.", noun: "sestra", answerCase: "gen",
      forms: ["sestra", "sestry", "sestre", "sestru", "sestre", "sestrou"],
      es: "Me quedo en casa de mi hermana.", en: "I'm staying at my sister's." },
    { sk: "Idem do ___.", noun: "škola", answerCase: "gen",
      forms: ["škola", "školy", "škole", "školu", "škole", "školou"],
      es: "Voy a la escuela.", en: "I'm going to school." },

    { sk: "Volám ___.", noun: "mama", answerCase: "dat",
      forms: ["mama", "mamy", "mame", "mamu", "mame", "mamou"],
      es: "Llamo a mamá (por teléfono).", en: "I'm calling Mum." },
    { sk: "Idem k ___.", noun: "doktor", answerCase: "dat",
      forms: ["doktor", "doktora", "doktorovi", "doktora", "doktorovi", "doktorom"],
      es: "Voy al médico.", en: "I'm going to the doctor." },
    { sk: "Ďakujem ___.", noun: "učiteľka", answerCase: "dat",
      forms: ["učiteľka", "učiteľky", "učiteľke", "učiteľku", "učiteľke", "učiteľkou"],
      es: "Le doy las gracias a la profesora.", en: "I thank the teacher." },
    { sk: "Ideme k ___.", noun: "stanica", answerCase: "dat",
      forms: ["stanica", "stanice", "stanici", "stanicu", "stanici", "stanicou"],
      es: "Vamos hacia la estación.", en: "We're going to the station." },

    { sk: "Vidím ___.", noun: "žena", answerCase: "acc",
      forms: ["žena", "ženy", "žene", "ženu", "žene", "ženou"],
      es: "Veo a la mujer.", en: "I see the woman." },
    { sk: "Čakám na ___.", noun: "autobus", answerCase: "acc",
      forms: ["autobus", "autobusu", "autobusu", "autobus", "autobuse", "autobusom"],
      es: "Espero el autobús.", en: "I'm waiting for the bus." },
    { sk: "Toto je darček pre ___.", noun: "brat", answerCase: "acc",
      forms: ["brat", "brata", "bratovi", "brata", "bratovi", "bratom"],
      es: "Este es un regalo para mi hermano.", en: "This is a present for my brother." },
    { sk: "Idem na ___.", noun: "pošta", answerCase: "acc",
      forms: ["pošta", "pošty", "pošte", "poštu", "pošte", "poštou"],
      es: "Voy al correo.", en: "I'm going to the post office." },

    { sk: "Bývam v ___.", noun: "mesto", answerCase: "loc",
      forms: ["mesto", "mesta", "mestu", "mesto", "meste", "mestom"],
      es: "Vivo en la ciudad.", en: "I live in the city." },
    { sk: "Rozprávame sa o ___.", noun: "film", answerCase: "loc",
      forms: ["film", "filmu", "filmu", "film", "filme", "filmom"],
      es: "Hablamos de la película.", en: "We're talking about the film." },
    { sk: "Pracujem v ___.", noun: "kancelária", answerCase: "loc",
      forms: ["kancelária", "kancelárie", "kancelárii", "kanceláriu", "kancelárii", "kanceláriou"],
      es: "Trabajo en la oficina.", en: "I work in the office." },
    { sk: "Kniha je na ___.", noun: "stôl", answerCase: "loc",
      forms: ["stôl", "stola", "stolu", "stôl", "stole", "stolom"],
      es: "El libro está sobre la mesa.", en: "The book is on the table." },

    { sk: "Pijem čaj s ___.", noun: "mlieko", answerCase: "ins",
      forms: ["mlieko", "mlieka", "mlieku", "mlieko", "mlieku", "mliekom"],
      es: "Tomo té con leche.", en: "I drink tea with milk." },
    { sk: "Stretnem sa s ___.", noun: "kamarát", answerCase: "ins",
      forms: ["kamarát", "kamaráta", "kamarátovi", "kamaráta", "kamarátovi", "kamarátom"],
      es: "Me encuentro con un amigo.", en: "I'm meeting a friend." },
    { sk: "Píšem ___.", noun: "pero", answerCase: "ins",
      forms: ["pero", "pera", "peru", "pero", "pere", "perom"],
      es: "Escribo con bolígrafo.", en: "I write with a pen." }
  ];

  window.AppData.cases = {
    ORDER: ORDER,
    CASES: CASES,
    GENDERS: GENDERS,
    PARADIGMS: PARADIGMS,
    EXERCISES: EXERCISES
  };
})();
