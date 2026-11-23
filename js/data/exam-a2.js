/*
 * data/exam-a2.js — A2 mock exams (modelové testy).
 *
 * Built after the format of the A2 Slovak certificate for foreigners in
 * Bratislava: a written part (reading, writing, listening; 120 minutes in
 * total) and an oral part (about 10 minutes). Questions are in Slovak, as in
 * the real exam; instructions are in the learner's base language.
 * Source of the format: ihbratislava.sk, page "Slovak Exam A2" (read 23-11-2026).
 * The official pass mark is not published; the app uses 60% per part as a guide.
 *
 * Structure: AppData.exams.TESTS = [test, …]. Each test has four parts:
 *   reading   -> tasks of kind "choice" (3 options) or "truefalse", with a text
 *   listening -> like reading, but the text is heard (audio lines, played at most twice)
 *   writing   -> tasks of kind "write": instruction, word range, checklist, model answer
 *   speaking  -> "questions" (answer aloud), "monologue" (talk about a topic),
 *                "roleplay" (answer the examiner's lines); then a self-check list
 * In every "choice" item the right option is `answer` (they are shuffled on screen).
 * Audio lines: { who: "A" or "B", line: "…" } — A and B get different voice pitches.
 *
 * Conventions: Slovak text is in fields called text, question, options, sk, line,
 * model, topic and prompts, so herramientas/check_slovak.js can check it.
 *
 * Depends on: nothing. Used by js/screens-exam.js.
 */

window.AppData = window.AppData || {};

(function () {
  "use strict";

  // Reused instructions.
  const CHOOSE = { es: "Elige la respuesta correcta.", en: "Choose the correct answer." };

  const TESTS = [
    {
      id: "a2-1",
      number: 1,
      parts: [
        // ===== Reading =====
        {
          id: "reading",
          minutes: 40,
          tasks: [
            {
              kind: "choice",
              instruction: {
                es: "Tarea 1. Lee los avisos y elige la respuesta correcta para cada uno.",
                en: "Task 1. Read the notices and choose the correct answer for each one."
              },
              items: [
                { text: "Otvorené: Po – Pi 8.00 – 18.00, So 9.00 – 12.00. V nedeľu zatvorené.",
                  question: "Kedy je obchod zatvorený?", options: ["v nedeľu", "v sobotu", "v pondelok"], answer: 0 },
                { text: "Pozor! Od 1. do 15. júla nepremáva električka číslo 4. Použite náhradnú autobusovú dopravu.",
                  question: "Čo platí od 1. do 15. júla?", options: ["Električka číslo 4 nejazdí.", "Električka číslo 4 jazdí častejšie.", "Autobusy nejazdia."], answer: 0 },
                { text: "Predám zachovalý bicykel, cena 80 €. Volajte po 17.00 na číslo 0905 123 456.",
                  question: "Kedy môžete volať?", options: ["popoludní po piatej", "ráno", "celý deň"], answer: 0 },
                { text: "Ambulancia praktického lekára: dnes ordinujeme iba do 11.00. Ďakujeme za pochopenie.",
                  question: "Čo je dnes inak?", options: ["Lekár pracuje iba do 11.00.", "Lekár dnes nepracuje.", "Lekár začína o 11.00."], answer: 0 },
                { text: "Hľadáme čašníka alebo čašníčku na víkendy. Znalosť angličtiny je výhodou. Informácie v reštaurácii.",
                  question: "Akého pracovníka hľadajú?", options: ["na sobotu a nedeľu", "na celý týždeň", "iba na leto"], answer: 0 }
              ]
            },
            {
              kind: "truefalse",
              instruction: {
                es: "Tarea 2. Lee el correo. ¿Las frases son verdaderas (Áno) o falsas (Nie)?",
                en: "Task 2. Read the e-mail. Are the sentences true (Áno) or false (Nie)?"
              },
              text: "Ahoj Marek,\nďakujem za pozvanie na tvoje narodeniny. Veľmi rád prídem, ale budem trochu meškať, lebo v sobotu pracujem do štvrtej. Prídem asi o šiestej. Môžem priniesť niečo na jedenie? Viem urobiť dobrý šalát. Moja priateľka Eva nemôže prísť, lebo je chorá. Má horúčku a musí zostať doma. Pozdravuje ťa. Ešte otázka: ako sa k tebe dostanem? Mám ísť električkou alebo autobusom? Napíš mi, prosím, adresu a názov zastávky.\nVidíme sa v sobotu!\nTomáš",
              items: [
                { sk: "Tomáš príde na oslavu.", answer: true },
                { sk: "Tomáš v sobotu nepracuje.", answer: false },
                { sk: "Tomáš chce priniesť šalát.", answer: true },
                { sk: "Eva príde neskôr.", answer: false },
                { sk: "Tomáš nevie, ako sa dostane k Marekovi.", answer: true }
              ]
            },
            {
              kind: "choice",
              instruction: {
                es: "Tarea 3. Lee el artículo y responde las preguntas.",
                en: "Task 3. Read the article and answer the questions."
              },
              text: "Bratislava na bicykli\nV Bratislave jazdí na bicykli stále viac ľudí. Mesto má veľa cyklistických trás a každý rok pribúdajú nové. Veľmi obľúbená je trasa popri Dunaji. Je rovná, a preto je vhodná aj pre deti. Kto nemá vlastný bicykel, môže si ho požičať. V meste sú stanice zdieľaných bicyklov a stačí na to aplikácia v mobile. Platí sa podľa toho, ako dlho bicykel používate. Najviac cyklistov je na cestách od apríla do októbra. V zime ich je málo, lebo je zima a cesty sú niekedy zľadovatené.",
              items: [
                { question: "Prečo je trasa popri Dunaji vhodná pre deti?", options: ["Lebo je rovná.", "Lebo je krátka.", "Lebo je v centre."], answer: 0 },
                { question: "Čo potrebujete na zdieľaný bicykel?", options: ["aplikáciu v mobile", "vlastný bicykel", "lístok na MHD"], answer: 0 },
                { question: "Ako sa platí za zdieľaný bicykel?", options: ["Podľa toho, ako dlho ho používate.", "Je zadarmo.", "Platí sa raz za rok."], answer: 0 },
                { question: "Kedy jazdí najviac cyklistov?", options: ["od apríla do októbra", "v zime", "iba cez víkend"], answer: 0 },
                { question: "Prečo v zime jazdí málo ľudí?", options: ["Lebo je zima a cesty sú niekedy zľadovatené.", "Lebo bicykle sú drahé.", "Lebo stanice sú zatvorené."], answer: 0 }
              ]
            }
          ]
        },

        // ===== Listening =====
        {
          id: "listening",
          minutes: 25,
          tasks: [
            {
              kind: "choice",
              instruction: {
                es: "Tarea 1. Escucha cada grabación (puedes escucharla dos veces) y elige la respuesta correcta.",
                en: "Task 1. Listen to each recording (you can play it twice) and choose the correct answer."
              },
              items: [
                { audio: [{ who: "A", line: "Vážení cestujúci, vlak do Košíc odchádza o pätnásť minút z tretieho nástupišťa." }],
                  question: "Z ktorého nástupišťa odchádza vlak?", options: ["z tretieho", "z druhého", "z piateho"], answer: 0 },
                { audio: [{ who: "A", line: "Prosím vás, koľko stojí tento chlieb?" }, { who: "B", line: "Jedno euro dvadsať." }],
                  question: "Koľko stojí chlieb?", options: ["1,20 €", "2,10 €", "1,02 €"], answer: 0 },
                { audio: [{ who: "B", line: "Ahoj, tu je Jana. Dnes nemôžem prísť na kurz, som chorá. Uvidíme sa vo štvrtok." }],
                  question: "Kedy sa Jana uvidí s kamarátom?", options: ["vo štvrtok", "dnes", "v utorok"], answer: 0 },
                { audio: [{ who: "A", line: "Prepáčte, kde je tu pošta?" }, { who: "B", line: "Choďte rovno a na druhej križovatke odbočte doprava." }],
                  question: "Kde má odbočiť?", options: ["na druhej križovatke doprava", "na prvej križovatke doľava", "hneď doprava"], answer: 0 },
                { audio: [{ who: "A", line: "Zajtra bude ráno hmla, popoludní bude slnečno a teplota okolo dvadsať stupňov." }],
                  question: "Aké bude počasie popoludní?", options: ["slnečno", "hmla", "dážď"], answer: 0 }
              ]
            },
            {
              kind: "choice",
              instruction: {
                es: "Tarea 2. Escucha la llamada telefónica (puedes escucharla dos veces) y responde las preguntas.",
                en: "Task 2. Listen to the phone call (you can play it twice) and answer the questions."
              },
              audio: [
                { who: "A", line: "Ambulancia doktora Nováka, dobrý deň." },
                { who: "B", line: "Dobrý deň, volám sa Ana Lopezová. Chcela by som sa objednať k pánovi doktorovi." },
                { who: "A", line: "Čo vás trápi?" },
                { who: "B", line: "Už tri dni ma bolí hrdlo a mám horúčku." },
                { who: "A", line: "Môžete prísť zajtra o pol desiatej?" },
                { who: "B", line: "Zajtra ráno pracujem. Bolo by možné poobede?" },
                { who: "A", line: "Poobede pán doktor neordinuje. Môžete prísť v stredu o ôsmej." },
                { who: "B", line: "Dobre, v stredu o ôsmej. Mám si niečo priniesť?" },
                { who: "A", line: "Prineste si kartičku poistenca a doklad totožnosti." },
                { who: "B", line: "Ďakujem, dovidenia." }
              ],
              items: [
                { question: "Prečo volá Ana?", options: ["Chce sa objednať k lekárovi.", "Chce zrušiť termín.", "Hľadá lekáreň."], answer: 0 },
                { question: "Ako dlho ju bolí hrdlo?", options: ["tri dni", "týždeň", "od včera"], answer: 0 },
                { question: "Prečo nemôže prísť zajtra ráno?", options: ["Pracuje.", "Je chorá.", "Má kurz."], answer: 0 },
                { question: "Kedy pôjde k lekárovi?", options: ["v stredu o ôsmej", "zajtra o pol desiatej", "zajtra poobede"], answer: 0 },
                { question: "Čo si má priniesť?", options: ["kartičku poistenca a doklad totožnosti", "recept a tabletky", "pas a peniaze"], answer: 0 }
              ]
            }
          ]
        },

        // ===== Writing =====
        {
          id: "writing",
          minutes: 30,
          tasks: [
            {
              kind: "write",
              instruction: {
                es: "Tarea 1. Tu amiga Zuzka te invitó al cine el viernes, pero no puedes ir. Escríbele un SMS: agradece la invitación, explica por qué no puedes y propón otro día.",
                en: "Task 1. Your friend Zuzka invited you to the cinema on Friday, but you can't go. Write her a text message: thank her, explain why you can't go and suggest another day."
              },
              minWords: 20,
              maxWords: 35,
              checklist: [
                { es: "Saludé y firmé con mi nombre.", en: "I greeted her and signed with my name." },
                { es: "Agradecí la invitación.", en: "I thanked her for the invitation." },
                { es: "Expliqué por qué no puedo.", en: "I explained why I can't go." },
                { es: "Propuse otro día.", en: "I suggested another day." },
                { es: "Usé bien los verbos (presente / futuro).", en: "I used the verbs correctly (present / future)." }
              ],
              model: "Ahoj Zuzka, ďakujem za pozvanie do kina. V piatok, žiaľ, nemôžem, lebo pracujem do večera. Môžeme ísť v sobotu? Napíš mi, prosím. Peter"
            },
            {
              kind: "write",
              instruction: {
                es: "Tarea 2. En tu departamento no funciona la calefacción desde ayer. Escribe un correo al dueño, el señor Horváth: describe el problema, pregunta cuándo puede venir un técnico, di cuándo estás en casa y despídete con cortesía.",
                en: "Task 2. The heating in your flat hasn't worked since yesterday. Write an e-mail to your landlord, Mr Horváth: describe the problem, ask when a technician can come, say when you're at home and close politely."
              },
              minWords: 60,
              maxWords: 80,
              checklist: [
                { es: "Usé un saludo y una despedida formales (Dobrý deň, S pozdravom).", en: "I used a formal greeting and closing (Dobrý deň, S pozdravom)." },
                { es: "Describí el problema.", en: "I described the problem." },
                { es: "Pregunté cuándo puede venir un técnico.", en: "I asked when a technician can come." },
                { es: "Dije cuándo estoy en casa.", en: "I said when I'm at home." },
                { es: "Traté al dueño de «vy» en todo el correo.", en: "I addressed the landlord as «vy» throughout." }
              ],
              model: "Dobrý deň, pán Horváth,\npíšem vám, lebo v byte od včera nefunguje kúrenie. Radiátory sú studené a v obývačke je iba pätnásť stupňov. Vonku je veľmi zima, takže je to pre nás veľký problém. Mohli by ste, prosím, poslať technika? Kedy by mohol prísť? Doma som každý deň od piatej popoludní a v sobotu celý deň.\nĎakujem za odpoveď.\nS pozdravom\nAna Lopezová"
            }
          ]
        },

        // ===== Speaking =====
        {
          id: "speaking",
          minutes: 10,
          tasks: [
            {
              kind: "questions",
              instruction: {
                es: "Parte 1. Escucha cada pregunta y respóndela en voz alta con una o dos oraciones completas. Después puedes ver una respuesta modelo.",
                en: "Part 1. Listen to each question and answer it aloud in one or two full sentences. Then you can see a model answer."
              },
              items: [
                { question: "Ako sa voláte?", model: "Volám sa Peter Gómez." },
                { question: "Odkiaľ ste?", model: "Som z Argentíny, z Buenos Aires." },
                { question: "Kde bývate a s kým?", model: "Bývam v Bratislave, v Novom Meste. Bývam sám." },
                { question: "Čo robíte vo voľnom čase?", model: "Rád chodím do kina a cez víkend chodím na výlety." },
                { question: "Prečo sa učíte po slovensky?", model: "Učím sa po slovensky, lebo žijem a pracujem na Slovensku." }
              ]
            },
            {
              kind: "monologue",
              instruction: {
                es: "Parte 2. Habla un minuto y medio sobre el tema. Las preguntas te ayudan a ordenar lo que dices.",
                en: "Part 2. Talk for a minute and a half about the topic. The questions help you organise what you say."
              },
              topic: "Môj byt",
              prompts: ["Kde je váš byt?", "Koľko má izieb?", "Čo sa vám na ňom páči?", "Čo by ste chceli zmeniť?"],
              seconds: 90,
              model: "Bývam v Bratislave v dvojizbovom byte na treťom poschodí. Byt má obývačku, spálňu, kuchyňu a kúpeľňu. Najviac sa mi páči balkón, lebo je z neho pekný výhľad a ráno tam pijem kávu. Byt je blízko zastávky, takže do práce chodím električkou len pätnásť minút. Chcel by som väčšiu kuchyňu, lebo rád varím, a susedia sú niekedy hluční."
            },
            {
              kind: "roleplay",
              instruction: {
                es: "Parte 3. Estás en una tienda de ropa y quieres comprar una campera. Escucha a la vendedora y respóndele en voz alta.",
                en: "Part 3. You're in a clothes shop and want to buy a jacket. Listen to the shop assistant and answer aloud."
              },
              turns: [
                { line: "Dobrý deň, môžem vám pomôcť?", model: "Dobrý deň, hľadám zimnú bundu." },
                { line: "Akú veľkosť nosíte?", model: "Nosím veľkosť L." },
                { line: "Túto bundu máme v modrej a v čiernej farbe.", model: "Môžem si vyskúšať tú čiernu?" },
                { line: "Samozrejme. Kabínky sú vzadu. Ako vám je?", model: "Je mi trochu veľká. Máte ju vo veľkosti M?" },
                { line: "Áno, tu je. Stojí osemdesiat eur.", model: "Dobre, vezmem si ju. Môžem platiť kartou?" }
              ]
            }
          ],
          checklist: [
            { es: "Respondí todas las preguntas con oraciones completas.", en: "I answered every question in full sentences." },
            { es: "Hablé del tema durante un minuto y medio sin detenerme mucho.", en: "I talked about the topic for a minute and a half without long pauses." },
            { es: "Entendí a la vendedora sin leer el texto.", en: "I understood the shop assistant without reading the text." },
            { es: "Usé «vy» con la vendedora.", en: "I used «vy» with the shop assistant." },
            { es: "Mi pronunciación se entiende (acento en la primera sílaba).", en: "My pronunciation is clear (stress on the first syllable)." }
          ]
        }
      ]
    }
  ];

  window.AppData.exams = {
    TESTS: TESTS,
    PASS_PERCENT: 60, // guide only: the official pass mark is not published
    CHOOSE: CHOOSE
  };
})();
