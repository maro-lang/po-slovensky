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
 * Structure: AppData.exams.TESTS = [test, …]. Each test has a level ("A1",
 * "A2", "B1") and its parts, in order. The A2 tests have four parts:
 *   reading   -> tasks of kind "choice" (3 options) or "truefalse", with a text
 *   listening -> like reading, but the text is heard (audio lines, played at most twice)
 *   writing   -> tasks of kind "write": instruction, word range, checklist, model answer
 *   speaking  -> "questions" (answer aloud), "monologue" (talk about a topic),
 *                "roleplay" (answer the examiner's lines); then a self-check list
 *   grammar   -> (B1 only, see exam-b1.js) like reading, sentences with a gap
 * Other levels are added by exam-a1.js and exam-b1.js, loaded after this file.
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
      level: "A2",
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
    },
    // ======================= Mock test A2 · 2 =======================
    {
      id: "a2-2",
      level: "A2",
      number: 2,
      parts: [
        {
          id: "reading",
          minutes: 40,
          tasks: [
            {
              kind: "choice",
              instruction: { es: "Tarea 1. Lee los avisos y elige la respuesta correcta.", en: "Task 1. Read the notices and choose the correct answer." },
              items: [
                { text: "Zubná ambulancia: od 1. augusta máme nové telefónne číslo 02 123 45 678.",
                  question: "Čo sa zmenilo?", options: ["telefónne číslo", "adresa", "ordinačné hodiny"], answer: 0 },
                { text: "Výťah je mimo prevádzky. Opravu plánujeme v piatok. Ďakujeme za trpezlivosť.",
                  question: "Čo platí?", options: ["Výťah nefunguje.", "Výťah je nový.", "Výťah funguje iba v piatok."], answer: 0 },
                { text: "Kurz slovenčiny pre začiatočníkov: utorok a štvrtok 18.00 – 19.30. Prihlásiť sa môžete do 15. septembra.",
                  question: "Dokedy sa treba prihlásiť?", options: ["do 15. septembra", "do utorka", "do 18.00"], answer: 0 },
                { text: "Predám chladničku, takmer novú. Cena dohodou. Odvoz si zabezpečí kupujúci.",
                  question: "Kto odvezie chladničku?", options: ["kupujúci", "predávajúci", "obchod"], answer: 0 },
                { text: "Parkovanie iba pre zákazníkov reštaurácie, najviac 2 hodiny.",
                  question: "Kto tu môže parkovať?", options: ["zákazníci reštaurácie", "všetci celý deň", "iba zamestnanci"], answer: 0 }
              ]
            },
            {
              kind: "truefalse",
              instruction: { es: "Tarea 2. Lee el correo. ¿Las frases son verdaderas (Áno) o falsas (Nie)?", en: "Task 2. Read the e-mail. Are the sentences true (Áno) or false (Nie)?" },
              text: "Dobrý deň, pani Kováčová,\nvolám sa Martin Silva a mám záujem o kurz slovenčiny pre pokročilých. Na Slovensku žijem dva roky a pracujem v medzinárodnej firme. Po slovensky už hovorím dosť dobre, ale v písaní robím ešte veľa chýb. Mohli by ste mi poslať informácie o cene a termínoch? Môžem chodiť iba večer alebo v sobotu, lebo cez deň pracujem. Ďakujem za odpoveď.\nS pozdravom\nMartin Silva",
              items: [
                { sk: "Martin žije na Slovensku dva roky.", answer: true },
                { sk: "Martin pracuje v slovenskej firme.", answer: false },
                { sk: "Martin robí chyby v písaní.", answer: true },
                { sk: "Martin chce chodiť na kurz cez deň.", answer: false },
                { sk: "Martin sa pýta na cenu kurzu.", answer: true }
              ]
            },
            {
              kind: "choice",
              instruction: { es: "Tarea 3. Lee el artículo y responde las preguntas.", en: "Task 3. Read the article and answer the questions." },
              text: "Dunaj v Bratislave\nDunaj je po Volge druhá najdlhšia rieka v Európe. Preteká desiatimi krajinami a štyrmi hlavnými mestami: Viedňou, Bratislavou, Budapešťou a Belehradom. V Bratislave sa ľudia radi prechádzajú po nábreží, najmä v lete a cez víkendy. Na brehu Dunaja je veľa kaviarní a reštaurácií. Z Bratislavy sa dá ísť do Viedne aj loďou. Cesta trvá približne hodinu a pol a v lete je to obľúbený výlet. Keď je hladina rieky vysoká, môže byť časť nábrežia zatvorená.",
              items: [
                { question: "Koľkými krajinami preteká Dunaj?", options: ["desiatimi", "štyrmi", "dvoma"], answer: 0 },
                { question: "Kedy sa ľudia najradšej prechádzajú po nábreží?", options: ["v lete a cez víkendy", "v zime", "iba ráno"], answer: 0 },
                { question: "Čo je na brehu Dunaja?", options: ["kaviarne a reštaurácie", "letisko", "obchody s oblečením"], answer: 0 },
                { question: "Ako dlho trvá cesta loďou do Viedne?", options: ["približne hodinu a pol", "tri hodiny", "pol hodiny"], answer: 0 },
                { question: "Kedy môže byť časť nábrežia zatvorená?", options: ["keď je hladina rieky vysoká", "cez víkendy", "v lete"], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "listening",
          minutes: 25,
          tasks: [
            {
              kind: "choice",
              instruction: { es: "Tarea 1. Escucha cada grabación (dos veces) y elige la respuesta correcta.", en: "Task 1. Listen to each recording (twice) and choose the correct answer." },
              items: [
                { audio: [{ who: "A", line: "Pozor, zmena nástupišťa. Vlak do Viedne odchádza z piateho nástupišťa." }],
                  question: "Odkiaľ odchádza vlak do Viedne?", options: ["z piateho nástupišťa", "z prvého nástupišťa", "zo štvrtého nástupišťa"], answer: 0 },
                { audio: [{ who: "A", line: "Máte voľný stôl na dnes večer?" }, { who: "B", line: "Áno, o ôsmej pre štyroch." }],
                  question: "Pre koľko ľudí je stôl?", options: ["pre štyroch", "pre dvoch", "pre ôsmich"], answer: 0 },
                { audio: [{ who: "B", line: "Dobrý deň, volám z lekárne. Váš liek už máme, môžete si ho vyzdvihnúť do soboty." }],
                  question: "Čo má urobiť?", options: ["vyzdvihnúť si liek do soboty", "zavolať lekárovi", "ísť v sobotu k lekárovi"], answer: 0 },
                { audio: [{ who: "A", line: "Koľko stoja tieto topánky?" }, { who: "B", line: "Teraz sú v zľave, iba štyridsaťpäť eur." }],
                  question: "Koľko stoja topánky?", options: ["45 €", "54 €", "40 €"], answer: 0 },
                { audio: [{ who: "A", line: "Dnes bude v Bratislave zamračené, popoludní bude pršať. Teplota okolo desať stupňov." }],
                  question: "Aké bude počasie popoludní?", options: ["bude pršať", "bude slnečno", "bude snežiť"], answer: 0 }
              ]
            },
            {
              kind: "choice",
              instruction: { es: "Tarea 2. Escucha la llamada por un departamento (dos veces) y responde.", en: "Task 2. Listen to the phone call about a flat (twice) and answer." },
              audio: [
                { who: "B", line: "Dobrý deň, volám kvôli inzerátu. Je byt ešte voľný?" },
                { who: "A", line: "Áno, je. Je to dvojizbový byt na štvrtom poschodí." },
                { who: "B", line: "Je v dome výťah?" },
                { who: "A", line: "Áno, výťah tam je. Nájom je sedemsto eur mesačne plus energie." },
                { who: "B", line: "Kedy si ho môžem pozrieť?" },
                { who: "A", line: "Vyhovuje vám zajtra o piatej popoludní?" },
                { who: "B", line: "Zajtra pracujem do šiestej. Mohol by som prísť o pol siedmej?" },
                { who: "A", line: "Dobre, o pol siedmej. Adresa je Račianska dvadsaťdva." },
                { who: "B", line: "Ďakujem, dovidenia." }
              ],
              items: [
                { question: "Aký je byt?", options: ["dvojizbový", "trojizbový", "jednoizbový"], answer: 0 },
                { question: "Na ktorom poschodí je byt?", options: ["na štvrtom", "na druhom", "na prízemí"], answer: 0 },
                { question: "Koľko je nájom?", options: ["700 € mesačne plus energie", "700 € mesačne aj s energiami", "600 € mesačne plus energie"], answer: 0 },
                { question: "Kedy si pôjde byt pozrieť?", options: ["zajtra o pol siedmej", "zajtra o piatej", "dnes o šiestej"], answer: 0 },
                { question: "Prečo nemôže prísť o piatej?", options: ["Pracuje do šiestej.", "Má kurz.", "Je chorý."], answer: 0 }
              ]
            }
          ]
        },
        {
          id: "writing",
          minutes: 30,
          tasks: [
            {
              kind: "write",
              instruction: {
                es: "Tarea 1. Tu vecina, la señora Nováková, te pidió que le riegues las plantas mientras está de viaje. Escríbele un mensaje: acepta, pregunta dónde están las llaves y cada cuánto hay que regarlas.",
                en: "Task 1. Your neighbour, Mrs Nováková, asked you to water her plants while she's away. Write her a message: agree, ask where the keys are and how often to water them."
              },
              minWords: 20,
              maxWords: 35,
              checklist: [
                { es: "Usé un saludo formal (Dobrý deň, pani…).", en: "I used a formal greeting (Dobrý deň, pani…)." },
                { es: "Acepté el pedido.", en: "I agreed to help." },
                { es: "Pregunté dónde están las llaves.", en: "I asked where the keys are." },
                { es: "Pregunté cada cuánto regarlas.", en: "I asked how often to water them." },
                { es: "Firmé con mi nombre.", en: "I signed with my name." }
              ],
              model: "Dobrý deň, pani Nováková,\nrád vám polejem kvety. Kde nájdem kľúče? A koľkokrát týždenne ich mám polievať? Prajem vám pekný výlet.\nPeter"
            },
            {
              kind: "write",
              instruction: {
                es: "Tarea 2. Escribe un correo a una escuela de idiomas: quieres hacer un curso de eslovaco. Di hace cuánto aprendes, qué te cuesta, cuándo puedes ir y pregunta el precio.",
                en: "Task 2. Write an e-mail to a language school: you want to take a Slovak course. Say how long you've been learning, what you find hard, when you can attend and ask about the price."
              },
              minWords: 60,
              maxWords: 80,
              checklist: [
                { es: "Usé un saludo y una despedida formales.", en: "I used a formal greeting and closing." },
                { es: "Dije hace cuánto aprendo eslovaco.", en: "I said how long I've been learning Slovak." },
                { es: "Dije qué me resulta difícil.", en: "I said what I find difficult." },
                { es: "Dije cuándo puedo ir al curso.", en: "I said when I can attend." },
                { es: "Pregunté el precio.", en: "I asked about the price." }
              ],
              model: "Dobrý deň,\nmám záujem o kurz slovenčiny. Po slovensky sa učím asi rok, väčšinou sám s aplikáciou. Rozumiem dosť dobre, ale ťažko sa mi hovorí a najväčší problém mám s pádmi. Cez týždeň pracujem do piatej, preto by som mohol chodiť na kurz večer alebo v sobotu doobeda. Mohli by ste mi napísať, koľko kurz stojí a kedy začína?\nĎakujem a s pozdravom\nPeter Gómez"
            }
          ]
        },
        {
          id: "speaking",
          minutes: 10,
          tasks: [
            {
              kind: "questions",
              instruction: { es: "Parte 1. Escucha cada pregunta y respóndela en voz alta.", en: "Part 1. Listen to each question and answer it aloud." },
              items: [
                { question: "Ako dlho žijete na Slovensku?", model: "Na Slovensku žijem dva roky." },
                { question: "Čo sa vám páči na Bratislave?", model: "Páči sa mi, že je malá a blízko je príroda aj Dunaj." },
                { question: "Ako chodíte do práce?", model: "Do práce chodím električkou, cesta trvá dvadsať minút." },
                { question: "Čo ste robili minulý víkend?", model: "Minulý víkend som bol s kamarátmi na výlete v Malých Karpatoch." },
                { question: "Aké máte plány na leto?", model: "V lete pôjdem na dva týždne k moru." }
              ]
            },
            {
              kind: "monologue",
              instruction: { es: "Parte 2. Habla un minuto y medio sobre tu trabajo.", en: "Part 2. Talk for a minute and a half about your work." },
              topic: "Moja práca",
              prompts: ["Kde pracujete?", "Čo robíte v práci?", "Čo sa vám na práci páči?", "Čo by ste chceli zmeniť?"],
              seconds: 90,
              model: "Pracujem ako inžinier v medzinárodnej firme v Bratislave. V práci navrhujem a programujem riadiace systémy pre budovy. Často pracujem v tíme a niekedy cestujem k zákazníkom. Páči sa mi, že práca je zaujímavá a každý projekt je iný. Kolegovia sú milí a ochotní. Chcel by som mať menej porád a viac času na samotnú prácu."
            },
            {
              kind: "roleplay",
              instruction: { es: "Parte 3. Estás en el médico porque tienes dolor de garganta y fiebre. Escucha y responde.", en: "Part 3. You're at the doctor's with a sore throat and a fever. Listen and answer." },
              turns: [
                { line: "Dobrý deň, čo vás trápi?", model: "Dobrý deň, od včera ma bolí hrdlo a mám horúčku." },
                { line: "Koľko ste mali stupňov?", model: "Ráno som mal tridsaťosem." },
                { line: "Užívate nejaké lieky?", model: "Nie, pijem iba čaj s medom." },
                { line: "Napíšem vám recept. Užívajte to trikrát denne.", model: "Dobre. Musím zostať doma?" },
                { line: "Áno, tri dni zostaňte doma.", model: "Ďakujem, dovidenia." }
              ]
            }
          ],
          checklist: [
            { es: "Respondí con oraciones completas, también en pasado y en futuro.", en: "I answered in full sentences, also in the past and future." },
            { es: "Hablé de mi trabajo un minuto y medio sin detenerme mucho.", en: "I talked about my work for a minute and a half without long pauses." },
            { es: "Expliqué al médico qué me pasa.", en: "I explained to the doctor what's wrong." },
            { es: "Usé «vy» con el médico.", en: "I used «vy» with the doctor." },
            { es: "Mi pronunciación se entiende.", en: "My pronunciation is clear." }
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
