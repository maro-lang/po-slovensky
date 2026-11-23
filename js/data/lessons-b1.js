/*
 * data/lessons-b1.js — Units of level B1.
 *
 * Each unit joins a life topic with one B1 grammar point: conditional with
 * keby, the relative pronoun ktorý, comparison, aby, the passive with sa,
 * reported speech, obligation and prohibition, and connectors for opinions.
 *
 * Same format as data/lessons-a1.js (see the explanation there): title, intro,
 * phrases, grammar, note and exercises of type "meaning", "say", "fill" and "listen".
 * This file adds its units to AppData.lessons.UNITS, so it must load after
 * lessons-a1.js and lessons-a2.js.
 *
 * Depends on: data/lessons-a1.js. Used by js/screens-lessons.js.
 */

(function () {
  "use strict";

  const UNITS = [
    // ===== Unit 1: job interview — keby + conditional =====
    {
      id: "b1-1",
      level: "B1",
      number: 1,
      title: { sk: "Pracovný pohovor", es: "La entrevista de trabajo", en: "The job interview" },
      intro: {
        es: "Hablar de tu experiencia, tus puntos fuertes y tus condiciones. Gramática: «keby» + condicional (si tuviera…, haría…).",
        en: "Talk about your experience, strengths and conditions. Grammar: «keby» + conditional (if I had…, I would…)."
      },
      phrases: [
        { sk: "Prečo sa uchádzate o túto pozíciu?", es: "¿Por qué se postula para este puesto?", en: "Why are you applying for this position?" },
        { sk: "Mám päť rokov skúseností v oblasti automatizácie.", es: "Tengo cinco años de experiencia en automatización.", en: "I have five years' experience in automation." },
        { sk: "Predtým som pracoval ako projektový inžinier.", es: "Antes trabajé como ingeniero de proyectos.", en: "I used to work as a project engineer." },
        { sk: "Som zodpovedný a rád pracujem v tíme.", es: "Soy responsable y me gusta trabajar en equipo.", en: "I'm responsible and I like working in a team." },
        { sk: "Mojou silnou stránkou je komunikácia.", es: "Mi punto fuerte es la comunicación.", en: "My strong point is communication." },
        { sk: "Aké by boli moje pracovné povinnosti?", es: "¿Cuáles serían mis tareas?", en: "What would my duties be?" },
        { sk: "Aký je nástupný plat?", es: "¿Cuál es el sueldo inicial?", en: "What is the starting salary?" },
        { sk: "Kedy by som mohol nastúpiť?", es: "¿Cuándo podría empezar?", en: "When could I start?" },
        { sk: "Keby som dostal túto prácu, presťahoval by som sa do Žiliny.", es: "Si consiguiera este trabajo, me mudaría a Žilina.", en: "If I got this job, I'd move to Žilina." },
        { sk: "Mám záujem o ďalšie vzdelávanie.", es: "Me interesa seguir formándome.", en: "I'm interested in further training." },
        { sk: "Ozveme sa vám do konca týždňa.", es: "Le avisaremos antes de fin de semana.", en: "We'll get back to you by the end of the week." }
      ],
      grammar: {
        title: { sk: "keby + kondicionál", es: "«keby» + condicional", en: "«keby» + conditional" },
        rows: [
          { sk: "Keby som mal čas, pomohol by som ti.", es: "Si tuviera tiempo, te ayudaría.", en: "If I had time, I'd help you." },
          { sk: "Keby si prišiel skôr, stihli by sme vlak.", es: "Si vinieras antes, alcanzaríamos el tren.", en: "If you came earlier, we'd catch the train." },
          { sk: "Keby pršalo, zostali by sme doma.", es: "Si lloviera, nos quedaríamos en casa.", en: "If it rained, we'd stay at home." },
          { sk: "Keby sme to vedeli, zavolali by sme.", es: "Si lo supiéramos, llamaríamos.", en: "If we knew, we'd call." },
          { sk: "Čo by si robil, keby si vyhral v lotérii?", es: "¿Qué harías si ganaras la lotería?", en: "What would you do if you won the lottery?" }
        ]
      },
      note: {
        es: "Las dos partes usan la forma del pasado (-l, -la, -li): «keby som mal» (si tuviera) y «pomohol by som» (ayudaría). «keby» ya lleva el «by», así que no se repite. Para hipótesis reales se usa «ak» con indicativo: Ak budeš mať čas, zavolaj.",
        en: "Both parts use the past form (-l, -la, -li): «keby som mal» (if I had) and «pomohol by som» (I would help). «keby» already contains «by», so it isn't repeated. For real conditions use «ak» with the indicative: Ak budeš mať čas, zavolaj."
      },
      exercises: [
        { type: "fill", sk: "Keby som mal viac času, ___ by som každý deň po slovensky.", options: ["čítal", "čítam", "čítať", "prečítam"], answer: 0 },
        { type: "fill", sk: "Keby pršalo, ___ by sme doma.", options: ["zostali", "zostaneme", "zostať", "zostávame"], answer: 0 },
        { type: "fill", sk: "Predtým som ___ ako projektový inžinier.", options: ["pracoval", "pracujem", "pracovať", "budem pracovať"], answer: 0 },
        { type: "fill", sk: "Čo by si robil, ___ si vyhral v lotérii?", options: ["keby", "že", "aby", "ktorý"], answer: 0 },
        { type: "say", prompt: { es: "Preguntas cuándo podrías empezar:", en: "You ask when you could start:" },
          options: ["Kedy by som mohol nastúpiť?", "Kedy môžem odísť?", "Kedy dostanem výplatu?", "Kedy máte obed?"], answer: 0 },
        { type: "meaning", sk: "Ozveme sa vám do konca týždňa.",
          options: { es: ["Le avisaremos antes de fin de semana.", "Lo llamamos el fin de semana.", "Venga el fin de semana.", "Nos vemos la semana próxima."],
                     en: ["We'll get back to you by the end of the week.", "We'll call you at the weekend.", "Come at the weekend.", "See you next week."] }, answer: 0 },
        { type: "meaning", sk: "Mojou silnou stránkou je komunikácia.",
          options: { es: ["Mi punto fuerte es la comunicación.", "Mi problema es la comunicación.", "Estudié comunicación.", "Trabajo en comunicación."],
                     en: ["My strong point is communication.", "My problem is communication.", "I studied communication.", "I work in communications."] }, answer: 0 },
        { type: "listen", sk: "Aký je nástupný plat?",
          options: { es: ["¿Cuál es el sueldo inicial?", "¿Cuál es el horario?", "¿Cuándo empiezo?", "¿Dónde está la oficina?"],
                     en: ["What is the starting salary?", "What are the hours?", "When do I start?", "Where is the office?"] }, answer: 0 }
      ]
    },

    // ===== Unit 2: neighbours — ktorý =====
    {
      id: "b1-2",
      level: "B1",
      number: 2,
      title: { sk: "Susedia a dom", es: "Los vecinos y el edificio", en: "Neighbours and the building" },
      intro: {
        es: "Resolver problemas en el edificio, pedir favores y quejarse con cortesía. Gramática: el relativo «ktorý» (que, el cual).",
        en: "Solve problems in the building, ask favours and complain politely. Grammar: the relative pronoun «ktorý» (who, which)."
      },
      phrases: [
        { sk: "Sused, ktorý býva nad nami, je veľmi hlučný.", es: "El vecino que vive arriba es muy ruidoso.", en: "The neighbour who lives above us is very noisy." },
        { sk: "Nemohli by ste stíšiť hudbu? Je už po desiatej.", es: "¿Podría bajar la música? Ya son más de las diez.", en: "Could you turn the music down? It's after ten." },
        { sk: "V našom dome platí nočný pokoj od desiatej.", es: "En nuestro edificio hay silencio nocturno desde las diez.", en: "Quiet hours in our building start at ten." },
        { sk: "Výťah je zase pokazený.", es: "El ascensor está roto otra vez.", en: "The lift is broken again." },
        { sk: "Treba zavolať správcu domu.", es: "Hay que llamar al administrador del edificio.", en: "We need to call the building manager." },
        { sk: "Kde sú kontajnery na triedený odpad?", es: "¿Dónde están los contenedores de reciclaje?", en: "Where are the recycling bins?" },
        { sk: "Môžete mi požičať rebrík?", es: "¿Me puede prestar una escalera?", en: "Could you lend me a ladder?" },
        { sk: "Byt, ktorý sme si prenajali, má veľký balkón.", es: "El departamento que alquilamos tiene un balcón grande.", en: "The flat we rented has a big balcony." },
        { sk: "Suseda, ktorú poznám, mi poliala kvety.", es: "La vecina que conozco me regó las plantas.", en: "The neighbour I know watered my plants." },
        { sk: "Prepáčte, že vás ruším.", es: "Disculpe que lo moleste.", en: "Sorry to bother you." },
        { sk: "Ďakujem, že ste mi pomohli.", es: "Gracias por ayudarme.", en: "Thank you for helping me." },
        { sk: "Kedy bude schôdza vlastníkov?", es: "¿Cuándo es la reunión de propietarios?", en: "When is the owners' meeting?" }
      ],
      grammar: {
        title: { sk: "ktorý, ktorá, ktoré", es: "El relativo «ktorý»", en: "The relative «ktorý»" },
        rows: [
          { sk: "muž, ktorý tu býva", es: "el hombre que vive aquí", en: "the man who lives here" },
          { sk: "žena, ktorá tu býva", es: "la mujer que vive aquí", en: "the woman who lives here" },
          { sk: "dieťa, ktoré tu býva", es: "el chico que vive aquí", en: "the child who lives here" },
          { sk: "muž, ktorého poznám", es: "el hombre al que conozco", en: "the man (whom) I know" },
          { sk: "žena, ktorú poznám", es: "la mujer a la que conozco", en: "the woman (whom) I know" },
          { sk: "byt, v ktorom bývam", es: "el departamento en el que vivo", en: "the flat I live in" },
          { sk: "ľudia, ktorí tu bývajú", es: "la gente que vive aquí", en: "the people who live here" }
        ]
      },
      note: {
        es: "«ktorý» toma el género y el número de la palabra a la que se refiere, y el caso según su función en su propia oración (sujeto, objeto, después de preposición). Antes de «ktorý» siempre va coma.",
        en: "«ktorý» takes the gender and number of the word it refers to, and its case from its role in its own clause (subject, object, after a preposition). There is always a comma before «ktorý»."
      },
      exercises: [
        { type: "fill", sk: "Žena, ___ býva vedľa nás, je lekárka.", options: ["ktorá", "ktorý", "ktoré", "ktorú"], answer: 0 },
        { type: "fill", sk: "To je muž, ___ poznám z práce.", options: ["ktorého", "ktorý", "ktorému", "ktorom"], answer: 0 },
        { type: "fill", sk: "Byt, v ___ bývam, je malý.", options: ["ktorom", "ktorý", "ktorého", "ktorým"], answer: 0 },
        { type: "fill", sk: "Ľudia, ___ tu bývajú, sú milí.", options: ["ktorí", "ktoré", "ktorý", "ktorých"], answer: 0 },
        { type: "say", prompt: { es: "Pides con cortesía que bajen la música:", en: "You politely ask them to turn the music down:" },
          options: ["Nemohli by ste stíšiť hudbu?", "Pustite hudbu nahlas!", "Máte radi hudbu?", "Kde je správca?"], answer: 0 },
        { type: "meaning", sk: "Výťah je zase pokazený.",
          options: { es: ["El ascensor está roto otra vez.", "El ascensor es nuevo.", "Suba por el ascensor.", "El ascensor está ocupado."],
                     en: ["The lift is broken again.", "The lift is new.", "Take the lift up.", "The lift is busy."] }, answer: 0 },
        { type: "listen", sk: "Prepáčte, že vás ruším.",
          options: { es: ["Disculpe que lo moleste.", "Disculpe la demora.", "Perdón, no entiendo.", "Disculpe, ¿dónde está?"],
                     en: ["Sorry to bother you.", "Sorry for the delay.", "Sorry, I don't understand.", "Excuse me, where is it?"] }, answer: 0 },
        { type: "meaning", sk: "nočný pokoj",
          options: { es: ["silencio nocturno", "luz nocturna", "turno de noche", "descanso semanal"],
                     en: ["quiet hours at night", "night light", "night shift", "weekly rest"] }, answer: 0 }
      ]
    },

    // ===== Unit 3: travel and complaints — comparison =====
    {
      id: "b1-3",
      level: "B1",
      number: 3,
      title: { sk: "Cestovanie a reklamácie", es: "Viajes y reclamos", en: "Travel and complaints" },
      intro: {
        es: "Reservar, resolver problemas de viaje y presentar un reclamo. Gramática: comparativo y superlativo (lepší, najlepší).",
        en: "Book, solve travel problems and make a complaint. Grammar: comparative and superlative (lepší, najlepší)."
      },
      phrases: [
        { sk: "Chcel by som si rezervovať izbu na dve noci.", es: "Quisiera reservar una habitación por dos noches.", en: "I'd like to book a room for two nights." },
        { sk: "Sú raňajky v cene?", es: "¿El desayuno está incluido?", en: "Is breakfast included?" },
        { sk: "Môj let meškal tri hodiny.", es: "Mi vuelo se retrasó tres horas.", en: "My flight was three hours late." },
        { sk: "Stratila sa mi batožina.", es: "Se me perdió el equipaje.", en: "My luggage got lost." },
        { sk: "Kde môžem podať reklamáciu?", es: "¿Dónde puedo presentar un reclamo?", en: "Where can I make a complaint?" },
        { sk: "Izba bola špinavá a klimatizácia nefungovala.", es: "La habitación estaba sucia y el aire acondicionado no funcionaba.", en: "The room was dirty and the air conditioning didn't work." },
        { sk: "Žiadam o vrátenie peňazí.", es: "Solicito la devolución del dinero.", en: "I'm asking for a refund." },
        { sk: "Ktorý spoj je najrýchlejší?", es: "¿Cuál es la conexión más rápida?", en: "Which connection is the fastest?" },
        { sk: "Najlacnejšie je ísť vlakom.", es: "Lo más barato es ir en tren.", en: "The cheapest way is by train." },
        { sk: "Toto je najlepší hotel v meste.", es: "Este es el mejor hotel de la ciudad.", en: "This is the best hotel in town." },
        { sk: "Mali sme nádhernú dovolenku pri mori.", es: "Tuvimos unas vacaciones hermosas en el mar.", en: "We had a wonderful holiday by the sea." },
        { sk: "Odporúčate nejaké miesto na výlet?", es: "¿Recomienda algún lugar para una excursión?", en: "Can you recommend a place for a trip?" }
      ],
      grammar: {
        title: { sk: "lacnejší, najlacnejší", es: "Comparativo y superlativo", en: "Comparative and superlative" },
        rows: [
          { sk: "lacný → lacnejší → najlacnejší", es: "barato → más barato → el más barato", en: "cheap → cheaper → cheapest" },
          { sk: "rýchly → rýchlejší → najrýchlejší", es: "rápido", en: "fast" },
          { sk: "drahý → drahší → najdrahší", es: "caro", en: "expensive" },
          { sk: "dobrý → lepší → najlepší", es: "bueno → mejor → el mejor", en: "good → better → best" },
          { sk: "zlý → horší → najhorší", es: "malo → peor → el peor", en: "bad → worse → worst" },
          { sk: "veľký → väčší → najväčší", es: "grande → más grande → el más grande", en: "big → bigger → biggest" },
          { sk: "malý → menší → najmenší", es: "chico → más chico → el más chico", en: "small → smaller → smallest" }
        ]
      },
      note: {
        es: "El superlativo es «naj-» + el comparativo. Los adverbios siguen igual: lacno → lacnejšie → najlacnejšie. Para comparar se usa «ako»: Vlak je rýchlejší ako autobus.",
        en: "The superlative is «naj-» + the comparative. Adverbs work the same: lacno → lacnejšie → najlacnejšie. To compare use «ako»: Vlak je rýchlejší ako autobus."
      },
      exercises: [
        { type: "fill", sk: "Toto je ___ hotel v meste. (dobrý)", options: ["najlepší", "najdobrejší", "lepší", "dobrejší"], answer: 0 },
        { type: "fill", sk: "Vlak je ___ ako autobus. (rýchly)", options: ["rýchlejší", "najrýchlejší", "rýchly", "rýchlo"], answer: 0 },
        { type: "fill", sk: "Bratislava je ___ mesto na Slovensku. (veľký)", options: ["najväčšie", "najväčší", "väčšie", "najveľkejšie"], answer: 0 },
        { type: "fill", sk: "Najlacnejšie je ísť ___. (vlak)", options: ["vlakom", "vlak", "vlaku", "vlaky"], answer: 0 },
        { type: "say", prompt: { es: "Dices que se te perdió el equipaje:", en: "You say your luggage got lost:" },
          options: ["Stratila sa mi batožina.", "Mám veľa batožiny.", "Kde je batožina?", "Batožina je ťažká."], answer: 0 },
        { type: "meaning", sk: "Môj let meškal tri hodiny.",
          options: { es: ["Mi vuelo se retrasó tres horas.", "Mi vuelo dura tres horas.", "Mi vuelo sale en tres horas.", "Perdí el vuelo hace tres horas."],
                     en: ["My flight was three hours late.", "My flight takes three hours.", "My flight leaves in three hours.", "I missed my flight three hours ago."] }, answer: 0 },
        { type: "listen", sk: "Žiadam o vrátenie peňazí.",
          options: { es: ["Solicito la devolución del dinero.", "Quiero pagar en efectivo.", "Necesito cambiar dinero.", "No tengo dinero."],
                     en: ["I'm asking for a refund.", "I want to pay in cash.", "I need to change money.", "I have no money."] }, answer: 0 },
        { type: "meaning", sk: "Odporúčate nejaké miesto na výlet?",
          options: { es: ["¿Recomienda algún lugar para una excursión?", "¿Dónde está la oficina de turismo?", "¿Cuánto cuesta la excursión?", "¿A qué hora sale la excursión?"],
                     en: ["Can you recommend a place for a trip?", "Where is the tourist office?", "How much is the trip?", "When does the trip leave?"] }, answer: 0 }
      ]
    },

    // ===== Unit 4: healthy lifestyle — aby =====
    {
      id: "b1-4",
      level: "B1",
      number: 4,
      title: { sk: "Zdravý životný štýl", es: "Vida sana", en: "Healthy lifestyle" },
      intro: {
        es: "Hablar de tus hábitos y dar consejos. Gramática: «aby» (para, para que) y «mal by si» (deberías).",
        en: "Talk about your habits and give advice. Grammar: «aby» (so that, in order to) and «mal by si» (you should)."
      },
      phrases: [
        { sk: "Snažím sa jesť zdravo a viac sa hýbať.", es: "Trato de comer sano y moverme más.", en: "I try to eat healthily and move more." },
        { sk: "Cvičím, aby som mal viac energie.", es: "Hago ejercicio para tener más energía.", en: "I exercise to have more energy." },
        { sk: "Chodím spať skôr, aby som sa vyspal.", es: "Me acuesto más temprano para dormir bien.", en: "I go to bed earlier to get enough sleep." },
        { sk: "Prestal som fajčiť pred rokom.", es: "Dejé de fumar hace un año.", en: "I stopped smoking a year ago." },
        { sk: "Mal by si piť viac vody.", es: "Deberías tomar más agua.", en: "You should drink more water." },
        { sk: "Lekár mi povedal, aby som menej sedel.", es: "El médico me dijo que me siente menos.", en: "The doctor told me to sit less." },
        { sk: "Dvakrát týždenne chodím do posilňovne.", es: "Voy al gimnasio dos veces por semana.", en: "I go to the gym twice a week." },
        { sk: "Cez víkend chodíme do hôr.", es: "Los fines de semana vamos a la montaña.", en: "At weekends we go to the mountains." },
        { sk: "Obmedzil som sladkosti.", es: "Reduje los dulces.", en: "I've cut down on sweets." },
        { sk: "Stres je pre zdravie veľmi škodlivý.", es: "El estrés es muy dañino para la salud.", en: "Stress is very harmful to health." },
        { sk: "Ako relaxuješ po práci?", es: "¿Cómo te relajas después del trabajo?", en: "How do you relax after work?" }
      ],
      grammar: {
        title: { sk: "aby, mal by si", es: "«aby» (para que) y «mal by» (debería)", en: "«aby» (so that) and «mal by» (should)" },
        rows: [
          { sk: "Cvičím, aby som bol zdravý.", es: "Hago ejercicio para estar sano.", en: "I exercise to stay healthy." },
          { sk: "Učím sa, aby som zložil skúšku.", es: "Estudio para aprobar el examen.", en: "I study to pass the exam." },
          { sk: "Hovorím pomaly, aby si mi rozumel.", es: "Hablo despacio para que me entiendas.", en: "I speak slowly so that you understand me." },
          { sk: "Povedal mi, aby som prišiel.", es: "Me dijo que viniera.", en: "He told me to come." },
          { sk: "Mal by si viac spať.", es: "Deberías dormir más.", en: "You should sleep more." },
          { sk: "Nemal by si toľko pracovať.", es: "No deberías trabajar tanto.", en: "You shouldn't work so much." }
        ]
      },
      note: {
        es: "«aby» lleva dentro el «by» del condicional, así que el verbo va en la forma del pasado: aby som bol, aby si mal, aby sme prišli (en 3.ª persona: aby bol). Para consejos: mal by som / mal by si / mali by ste + infinitivo.",
        en: "«aby» contains the conditional «by», so the verb takes the past form: aby som bol, aby si mal, aby sme prišli (3rd person: aby bol). For advice: mal by som / mal by si / mali by ste + infinitive."
      },
      exercises: [
        { type: "fill", sk: "Cvičím, ___ som bol zdravý.", options: ["aby", "že", "keby", "ak"], answer: 0 },
        { type: "fill", sk: "Hovorím pomaly, aby si mi ___.", options: ["rozumel", "rozumieš", "rozumieť", "rozumie"], answer: 0 },
        { type: "fill", sk: "Lekár mi povedal, aby som menej ___.", options: ["sedel", "sedím", "sedieť", "sedí"], answer: 0 },
        { type: "fill", sk: "Mal ___ si piť viac vody.", options: ["by", "som", "je", "sa"], answer: 0 },
        { type: "say", prompt: { es: "Le aconsejas a un amigo que duerma más:", en: "You advise a friend to sleep more:" },
          options: ["Mal by si viac spať.", "Spíš veľa.", "Spal si dobre?", "Idem spať."], answer: 0 },
        { type: "meaning", sk: "Prestal som fajčiť pred rokom.",
          options: { es: ["Dejé de fumar hace un año.", "Empecé a fumar hace un año.", "Fumo desde hace un año.", "Hace un año que no hago deporte."],
                     en: ["I stopped smoking a year ago.", "I started smoking a year ago.", "I've smoked for a year.", "I haven't done sport for a year."] }, answer: 0 },
        { type: "listen", sk: "Dvakrát týždenne chodím do posilňovne.",
          options: { es: ["Voy al gimnasio dos veces por semana.", "Voy al gimnasio todos los días.", "Voy a la pileta dos veces por semana.", "Nunca voy al gimnasio."],
                     en: ["I go to the gym twice a week.", "I go to the gym every day.", "I go swimming twice a week.", "I never go to the gym."] }, answer: 0 },
        { type: "meaning", sk: "škodlivý",
          options: { es: ["dañino", "sano", "cansado", "caro"], en: ["harmful", "healthy", "tired", "expensive"] }, answer: 0 }
      ]
    },

    // ===== Unit 5: holidays and traditions — passive with sa =====
    {
      id: "b1-5",
      level: "B1",
      number: 5,
      title: { sk: "Sviatky a tradície", es: "Fiestas y tradiciones", en: "Holidays and traditions" },
      intro: {
        es: "Navidad, Pascua, cumpleaños y el día del nombre (meniny), y cómo saludar en cada ocasión. Gramática: la voz pasiva con «sa» (se hornea, se sirve).",
        en: "Christmas, Easter, birthdays and name days (meniny), and what to say on each. Grammar: the passive with «sa» (is baked, is served)."
      },
      phrases: [
        { sk: "Na Štedrý večer sa podáva kapustnica a kapor so zemiakovým šalátom.", es: "En Nochebuena se sirve sopa de chucrut y carpa con ensalada de papas.", en: "On Christmas Eve sauerkraut soup and carp with potato salad are served." },
        { sk: "Pred večerou sa jedia oblátky s medom.", es: "Antes de la cena se comen obleas con miel.", en: "Before dinner wafers with honey are eaten." },
        { sk: "Darčeky sa rozbaľujú po večeri.", es: "Los regalos se abren después de la cena.", en: "Presents are opened after dinner." },
        { sk: "Na Veľkú noc je šibačka a oblievačka.", es: "En Pascua se hacen la «šibačka» y la «oblievačka» (tradiciones con varas de mimbre y agua).", en: "At Easter there's «šibačka» and «oblievačka» (traditions with willow switches and water)." },
        { sk: "Na Silvestra sa púšťa ohňostroj.", es: "El 31 de diciembre se tiran fuegos artificiales.", en: "On New Year's Eve fireworks are let off." },
        { sk: "Vianočné trhy sú na Hlavnom námestí.", es: "Los mercados navideños están en la plaza principal.", en: "The Christmas markets are on the Main Square." },
        { sk: "Na trhoch sa pije varené víno a punč.", es: "En los mercados se toma vino caliente y ponche.", en: "At the markets people drink mulled wine and punch." },
        { sk: "Veselé Vianoce a šťastný nový rok!", es: "¡Feliz Navidad y próspero año nuevo!", en: "Merry Christmas and a happy New Year!" },
        { sk: "Všetko najlepšie k narodeninám!", es: "¡Feliz cumpleaños!", en: "Happy birthday!" },
        { sk: "Na Slovensku sa oslavujú aj meniny.", es: "En Eslovaquia también se festeja el día del nombre.", en: "In Slovakia name days are celebrated too." },
        { sk: "Blahoželám ti k meninám!", es: "¡Feliz día de tu nombre!", en: "Happy name day!" },
        { sk: "Ako sa oslavujú Vianoce v Argentíne?", es: "¿Cómo se celebra la Navidad en Argentina?", en: "How is Christmas celebrated in Argentina?" }
      ],
      grammar: {
        title: { sk: "Zvratný pasív", es: "Voz pasiva con «sa»", en: "Passive with «sa»" },
        rows: [
          { sk: "Pečie sa koláč. / Pečú sa koláče.", es: "Se hornea una torta. / Se hornean tortas.", en: "A cake is baked. / Cakes are baked." },
          { sk: "Varí sa kapustnica.", es: "Se cocina sopa de chucrut.", en: "Sauerkraut soup is cooked." },
          { sk: "Tu sa nefajčí.", es: "Aquí no se fuma.", en: "No smoking here." },
          { sk: "Ako sa to píše?", es: "¿Cómo se escribe?", en: "How is it spelled?" },
          { sk: "Hovorí sa, že…", es: "Se dice que…", en: "People say that…" },
          { sk: "Predávajú sa tu lístky?", es: "¿Se venden boletos aquí?", en: "Are tickets sold here?" }
        ]
      },
      note: {
        es: "Es como el «se» del castellano: el verbo concuerda con la cosa (pečie sa koláč, pečú sa koláče). Meniny: cada día del calendario tiene nombres, y ese día se saluda a las personas que se llaman así; en Eslovaquia es casi tan importante como el cumpleaños.",
        en: "It works like «is done»: the verb agrees with the thing (pečie sa koláč, pečú sa koláče). Name days: each calendar day has names, and on that day people with that name are congratulated; in Slovakia it's almost as important as a birthday."
      },
      exercises: [
        { type: "fill", sk: "Na Vianoce sa ___ koláče.", options: ["pečú", "pečie", "pečiem", "piecť"], answer: 0 },
        { type: "fill", sk: "Tu sa ___.", options: ["nefajčí", "nefajčia", "nefajčím", "nefajčiť"], answer: 0 },
        { type: "fill", sk: "Ako sa to ___?", options: ["píše", "píšu", "píšem", "písať"], answer: 0 },
        { type: "fill", sk: "Na Štedrý večer sa ___ kapustnica.", options: ["podáva", "podávajú", "podávam", "podávať"], answer: 0 },
        { type: "meaning", sk: "Všetko najlepšie k narodeninám!",
          options: { es: ["¡Feliz cumpleaños!", "¡Feliz Navidad!", "¡Felicitaciones por tu boda!", "¡Buen viaje!"],
                     en: ["Happy birthday!", "Merry Christmas!", "Congratulations on your wedding!", "Have a good trip!"] }, answer: 0 },
        { type: "say", prompt: { es: "Saludas a alguien en Navidad:", en: "You greet someone at Christmas:" },
          options: ["Veselé Vianoce!", "Dobrú chuť!", "Blahoželám ti k meninám!", "Šťastnú cestu!"], answer: 0 },
        { type: "meaning", sk: "meniny",
          options: { es: ["día del nombre (santo)", "cumpleaños", "aniversario", "feriado"], en: ["name day", "birthday", "anniversary", "public holiday"] }, answer: 0 },
        { type: "listen", sk: "Darčeky sa rozbaľujú po večeri.",
          options: { es: ["Los regalos se abren después de la cena.", "Los regalos se compran antes.", "La cena es a las seis.", "Los regalos se esconden."],
                     en: ["Presents are opened after dinner.", "Presents are bought beforehand.", "Dinner is at six.", "Presents are hidden."] }, answer: 0 }
      ]
    },

    // ===== Unit 6: news and technology — reported speech =====
    {
      id: "b1-6",
      level: "B1",
      number: 6,
      title: { sk: "Správy a technológie", es: "Noticias y tecnología", en: "News and technology" },
      intro: {
        es: "Contar lo que dijo otra persona o lo que se leyó en las noticias, y resolver problemas con el teléfono o la computadora. Gramática: discurso indirecto con «že», «či» y «aby».",
        en: "Report what someone said or what was in the news, and solve phone or computer problems. Grammar: reported speech with «že», «či» and «aby»."
      },
      phrases: [
        { sk: "Čítal si dnes správy?", es: "¿Leíste las noticias hoy?", en: "Have you read the news today?" },
        { sk: "V správach hovorili, že bude štrajk.", es: "En las noticias dijeron que va a haber huelga.", en: "The news said there would be a strike." },
        { sk: "Povedal, že príde neskôr.", es: "Dijo que vendría más tarde.", en: "He said he'd come later." },
        { sk: "Pýtala sa, či máme čas.", es: "Preguntó si teníamos tiempo.", en: "She asked if we had time." },
        { sk: "Neviem, či je to pravda.", es: "No sé si es verdad.", en: "I don't know if it's true." },
        { sk: "Táto správa je falošná.", es: "Esta noticia es falsa.", en: "This news is fake." },
        { sk: "Pošli mi to e-mailom.", es: "Mándamelo por correo.", en: "Send it to me by e-mail." },
        { sk: "Stiahol som si novú aplikáciu.", es: "Me bajé una aplicación nueva.", en: "I downloaded a new app." },
        { sk: "Zabudol som heslo.", es: "Olvidé la contraseña.", en: "I forgot my password." },
        { sk: "Nefunguje mi internet.", es: "No me funciona internet.", en: "My internet isn't working." },
        { sk: "Sledujem slovenské správy, aby som sa zlepšil.", es: "Miro las noticias en eslovaco para mejorar.", en: "I watch Slovak news to improve." }
      ],
      grammar: {
        title: { sk: "Nepriama reč", es: "Discurso indirecto", en: "Reported speech" },
        rows: [
          { sk: "„Prídem.“ → Povedal, že príde.", es: "«Vendré.» → Dijo que vendría.", en: "«I'll come.» → He said he'd come." },
          { sk: "„Mám čas.“ → Povedala, že má čas.", es: "«Tengo tiempo.» → Dijo que tenía tiempo.", en: "«I have time.» → She said she had time." },
          { sk: "„Máš čas?“ → Pýtal sa, či mám čas.", es: "«¿Tienes tiempo?» → Preguntó si tenía tiempo.", en: "«Do you have time?» → He asked if I had time." },
          { sk: "„Kde bývaš?“ → Pýtala sa, kde bývam.", es: "«¿Dónde vives?» → Preguntó dónde vivía.", en: "«Where do you live?» → She asked where I lived." },
          { sk: "„Zavolaj mi.“ → Povedal, aby som mu zavolal.", es: "«Llámame.» → Me dijo que lo llamara.", en: "«Call me.» → He told me to call him." }
        ]
      },
      note: {
        es: "En eslovaco el tiempo verbal NO cambia en el discurso indirecto: «Povedal, že príde» (literalmente «dijo que vendrá»). Pregunta de sí o no → «či»; orden o pedido → «aby» + forma del pasado. Las comillas eslovacas son „así“.",
        en: "In Slovak the tense does NOT change in reported speech: «Povedal, že príde» (literally «he said he will come»). Yes/no question → «či»; order or request → «aby» + past form. Slovak quotation marks look „like this“."
      },
      exercises: [
        { type: "fill", sk: "Povedal, ___ príde neskôr.", options: ["že", "či", "aby", "keby"], answer: 0 },
        { type: "fill", sk: "Pýtala sa, ___ máme čas.", options: ["či", "že", "aby", "ktorý"], answer: 0 },
        { type: "fill", sk: "Povedal mi, ___ som mu zavolal.", options: ["aby", "že", "či", "keby"], answer: 0 },
        { type: "fill", sk: "Neviem, ___ je to pravda.", options: ["či", "že", "aby", "ako"], answer: 0 },
        { type: "say", prompt: { es: "Dices que olvidaste la contraseña:", en: "You say you forgot your password:" },
          options: ["Zabudol som heslo.", "Stratil som telefón.", "Nemám internet.", "Poznám heslo."], answer: 0 },
        { type: "meaning", sk: "Stiahol som si novú aplikáciu.",
          options: { es: ["Me bajé una aplicación nueva.", "Borré una aplicación.", "Compré un teléfono nuevo.", "Actualicé la computadora."],
                     en: ["I downloaded a new app.", "I deleted an app.", "I bought a new phone.", "I updated the computer."] }, answer: 0 },
        { type: "listen", sk: "V správach hovorili, že bude štrajk.",
          options: { es: ["En las noticias dijeron que va a haber huelga.", "En las noticias hablaron del clima.", "Hoy hay huelga.", "No hubo noticias."],
                     en: ["The news said there would be a strike.", "The news talked about the weather.", "There's a strike today.", "There was no news."] }, answer: 0 },
        { type: "meaning", sk: "heslo",
          options: { es: ["contraseña", "enlace", "correo", "usuario"], en: ["password", "link", "e-mail", "username"] }, answer: 0 }
      ]
    },

    // ===== Unit 7: environment — obligation and prohibition =====
    {
      id: "b1-7",
      level: "B1",
      number: 7,
      title: { sk: "Životné prostredie", es: "El medio ambiente", en: "The environment" },
      intro: {
        es: "Reciclaje, botellas con depósito y qué hacer por el ambiente. Gramática: obligación y prohibición (treba, musí sa, nesmie sa, je zakázané).",
        en: "Recycling, deposit bottles and what to do for the environment. Grammar: obligation and prohibition (treba, musí sa, nesmie sa, je zakázané)."
      },
      phrases: [
        { sk: "Treba triediť odpad.", es: "Hay que separar la basura.", en: "Waste has to be sorted." },
        { sk: "Plasty patria do žltého kontajnera.", es: "Los plásticos van al contenedor amarillo.", en: "Plastics go in the yellow bin." },
        { sk: "Papier dávame do modrého kontajnera a sklo do zeleného.", es: "El papel va al contenedor azul y el vidrio al verde.", en: "Paper goes in the blue bin and glass in the green one." },
        { sk: "Fľaše so zálohou vraciame do obchodu.", es: "Las botellas con depósito las devolvemos al negocio.", en: "We return deposit bottles to the shop." },
        { sk: "Zhasínaj svetlo, keď odchádzaš z izby.", es: "Apaga la luz cuando sales de la habitación.", en: "Switch off the light when you leave the room." },
        { sk: "Nosím si vlastnú nákupnú tašku.", es: "Llevo mi propia bolsa de compras.", en: "I bring my own shopping bag." },
        { sk: "V lese sa nesmie zakladať oheň.", es: "En el bosque no se puede hacer fuego.", en: "Lighting fires in the forest is not allowed." },
        { sk: "Ovzdušie v meste je znečistené.", es: "El aire de la ciudad está contaminado.", en: "The air in the city is polluted." },
        { sk: "Klimatické zmeny sú vážny problém.", es: "El cambio climático es un problema serio.", en: "Climate change is a serious problem." },
        { sk: "Čo robíš pre životné prostredie?", es: "¿Qué haces por el medio ambiente?", en: "What do you do for the environment?" },
        { sk: "Podľa mňa by mesto malo vysadiť viac stromov.", es: "En mi opinión, la ciudad debería plantar más árboles.", en: "In my view the city should plant more trees." }
      ],
      grammar: {
        title: { sk: "treba, musí sa, nesmie sa", es: "Obligación y prohibición", en: "Obligation and prohibition" },
        rows: [
          { sk: "Treba triediť odpad.", es: "Hay que separar la basura.", en: "Waste has to be sorted." },
          { sk: "Netreba sa báť.", es: "No hace falta tener miedo.", en: "There's no need to be afraid." },
          { sk: "Musí sa šetriť.", es: "Hay que ahorrar.", en: "One has to save." },
          { sk: "Nesmie sa tu parkovať.", es: "Aquí no se puede estacionar.", en: "Parking is not allowed here." },
          { sk: "Je zakázané fajčiť.", es: "Está prohibido fumar.", en: "Smoking is prohibited." },
          { sk: "Mali by sme recyklovať.", es: "Deberíamos reciclar.", en: "We should recycle." }
        ]
      },
      note: {
        es: "«treba» es impersonal: no cambia y va con infinitivo. En los contenedores de Bratislava: amarillo para plástico, azul para papel, verde para vidrio. Las botellas y latas con el símbolo de depósito (záloha) se devuelven en el negocio y te reintegran el depósito.",
        en: "«treba» is impersonal: it never changes and takes an infinitive. Bins in Bratislava: yellow for plastic, blue for paper, green for glass. Bottles and cans with the deposit symbol (záloha) are returned to the shop and the deposit is refunded."
      },
      exercises: [
        { type: "fill", sk: "Plasty patria do ___ kontajnera.", options: ["žltého", "žltý", "žltom", "žltému"], answer: 0 },
        { type: "fill", sk: "___ triediť odpad.", options: ["Treba", "Musím sa", "Smie", "Môže"], answer: 0 },
        { type: "fill", sk: "Tu sa ___ parkovať.", options: ["nesmie", "netreba", "nemôžem", "neparkuje"], answer: 0 },
        { type: "fill", sk: "Mali ___ sme recyklovať.", options: ["by", "sme", "sa", "je"], answer: 0 },
        { type: "say", prompt: { es: "Dices que hay que separar la basura:", en: "You say waste has to be sorted:" },
          options: ["Treba triediť odpad.", "Odpad je v kuchyni.", "Vynes smeti.", "Kontajner je plný."], answer: 0 },
        { type: "meaning", sk: "Ovzdušie v meste je znečistené.",
          options: { es: ["El aire de la ciudad está contaminado.", "La ciudad está limpia.", "Hace calor en la ciudad.", "Hay mucho tránsito en la ciudad."],
                     en: ["The air in the city is polluted.", "The city is clean.", "It's hot in the city.", "There's a lot of traffic in the city."] }, answer: 0 },
        { type: "listen", sk: "Fľaše so zálohou vraciame do obchodu.",
          options: { es: ["Las botellas con depósito las devolvemos al negocio.", "Compramos botellas en el negocio.", "Las botellas van al contenedor verde.", "Tiramos las botellas a la basura."],
                     en: ["We return deposit bottles to the shop.", "We buy bottles at the shop.", "Bottles go in the green bin.", "We throw bottles in the rubbish."] }, answer: 0 },
        { type: "meaning", sk: "Je zakázané fajčiť.",
          options: { es: ["Está prohibido fumar.", "Se puede fumar.", "Hay un lugar para fumar.", "Dejé de fumar."],
                     en: ["Smoking is prohibited.", "You may smoke.", "There's a smoking area.", "I quit smoking."] }, answer: 0 }
      ]
    },

    // ===== Unit 8: opinions — connectors =====
    {
      id: "b1-8",
      level: "B1",
      number: 8,
      title: { sk: "Názory a diskusia", es: "Opiniones y debate", en: "Opinions and discussion" },
      intro: {
        es: "Dar tu opinión, estar de acuerdo o no y justificar. Gramática: conectores (pretože, preto, hoci, aj keď, okrem toho).",
        en: "Give your opinion, agree or disagree and give reasons. Grammar: connectors (pretože, preto, hoci, aj keď, okrem toho)."
      },
      phrases: [
        { sk: "Myslím si, že máš pravdu.", es: "Creo que tienes razón.", en: "I think you're right." },
        { sk: "Podľa mňa je to dobrý nápad.", es: "En mi opinión es una buena idea.", en: "In my opinion it's a good idea." },
        { sk: "Súhlasím s tebou.", es: "Estoy de acuerdo contigo.", en: "I agree with you." },
        { sk: "Nesúhlasím, pretože je to príliš drahé.", es: "No estoy de acuerdo porque es demasiado caro.", en: "I disagree because it's too expensive." },
        { sk: "Na jednej strane je to praktické, na druhej strane je to drahé.", es: "Por un lado es práctico, por otro es caro.", en: "On the one hand it's practical, on the other it's expensive." },
        { sk: "Hoci je to ťažké, oplatí sa to.", es: "Aunque es difícil, vale la pena.", en: "Although it's hard, it's worth it." },
        { sk: "Aj keď prší, pôjdeme von.", es: "Aunque llueva, vamos a salir.", en: "Even if it rains, we'll go out." },
        { sk: "Neviem, čo si o tom myslieť.", es: "No sé qué pensar de eso.", en: "I don't know what to think about it." },
        { sk: "To je pravda, ale…", es: "Es verdad, pero…", en: "That's true, but…" },
        { sk: "Mám iný názor.", es: "Tengo otra opinión.", en: "I see it differently." },
        { sk: "Čo si o tom myslíš ty?", es: "¿Y tú qué piensas?", en: "What do you think about it?" }
      ],
      grammar: {
        title: { sk: "Spojky", es: "Conectores", en: "Connectors" },
        rows: [
          { sk: "pretože / lebo", es: "porque", en: "because" },
          { sk: "preto", es: "por eso", en: "that's why" },
          { sk: "hoci / aj keď", es: "aunque", en: "although / even if" },
          { sk: "ale / však", es: "pero / sin embargo", en: "but / however" },
          { sk: "teda", es: "o sea / entonces", en: "so / that is" },
          { sk: "na jednej strane… na druhej strane…", es: "por un lado… por otro…", en: "on the one hand… on the other…" },
          { sk: "okrem toho", es: "además", en: "besides" }
        ]
      },
      note: {
        es: "«však» va en segundo lugar de la oración: «Je to však drahé.» Después de «podľa mňa» no se usa «že»: «Podľa mňa je to dobré». Después de «myslím si» sí: «Myslím si, že…».",
        en: "«však» goes in second position: «Je to však drahé.» After «podľa mňa» don't use «že»: «Podľa mňa je to dobré». After «myslím si» you do: «Myslím si, že…»."
      },
      exercises: [
        { type: "fill", sk: "Nesúhlasím, ___ je to príliš drahé.", options: ["pretože", "preto", "hoci", "teda"], answer: 0 },
        { type: "fill", sk: "Je to drahé, ___ to nekúpim.", options: ["preto", "pretože", "hoci", "aby"], answer: 0 },
        { type: "fill", sk: "___ je to ťažké, oplatí sa to.", options: ["Hoci", "Pretože", "Preto", "Aby"], answer: 0 },
        { type: "fill", sk: "Myslím ___, že máš pravdu.", options: ["si", "sa", "ti", "ma"], answer: 0 },
        { type: "say", prompt: { es: "Dices que estás de acuerdo:", en: "You say you agree:" },
          options: ["Súhlasím s tebou.", "Nesúhlasím.", "Mám iný názor.", "Neviem."], answer: 0 },
        { type: "meaning", sk: "Podľa mňa je to dobrý nápad.",
          options: { es: ["En mi opinión es una buena idea.", "Me dijeron que es una buena idea.", "No es una buena idea.", "Tengo una buena idea."],
                     en: ["In my opinion it's a good idea.", "I was told it's a good idea.", "It isn't a good idea.", "I have a good idea."] }, answer: 0 },
        { type: "listen", sk: "Aj keď prší, pôjdeme von.",
          options: { es: ["Aunque llueva, vamos a salir.", "Como llueve, nos quedamos.", "Si no llueve, salimos.", "Ayer llovió mucho."],
                     en: ["Even if it rains, we'll go out.", "Because it's raining, we'll stay in.", "If it doesn't rain, we'll go out.", "It rained a lot yesterday."] }, answer: 0 },
        { type: "meaning", sk: "okrem toho",
          options: { es: ["además", "sin embargo", "por eso", "aunque"], en: ["besides", "however", "that's why", "although"] }, answer: 0 }
      ]
    }
  ];

  // Added to the A1 and A2 units loaded before.
  window.AppData.lessons.UNITS = window.AppData.lessons.UNITS.concat(UNITS);
})();
