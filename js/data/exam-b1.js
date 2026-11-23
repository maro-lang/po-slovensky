/*
 * data/exam-b1.js — B1 mock exam (modelový test B1).
 *
 * No public description of an official B1 certificate of Slovak as a
 * foreign language was found. The format follows the national B1 foreign-
 * language test used in Slovakia: listening (each recording twice), grammar
 * and vocabulary, and reading, plus a written and an oral part (reference:
 * NIVaM, "Špecifikácia testu B1, maturitná skúška 2024/2025"). The numbers
 * of questions are smaller than in that test, to fit a phone.
 *
 * Same structure as data/exam-a2.js, with one more part: "grammar" (sentences
 * with a gap, kind "choice"). This file adds its test to AppData.exams.TESTS,
 * so it must load after exam-a2.js.
 *
 * Depends on: data/exam-a2.js. Used by js/screens-exam.js.
 */

(function () {
  "use strict";

  const TEST = {
    id: "b1-1",
    level: "B1",
    number: 1,
    parts: [
      // ===== Reading =====
      {
        id: "reading",
        minutes: 45,
        tasks: [
          {
            kind: "choice",
            instruction: { es: "Tarea 1. Lee el artículo y responde las preguntas.", en: "Task 1. Read the article and answer the questions." },
            text: "Práca z domu: výhoda alebo problém?\nPo pandémii zostala práca z domu v mnohých firmách bežnou súčasťou pracovného týždňa. Zamestnanci oceňujú najmä to, že nemusia cestovať do práce a môžu si lepšie zorganizovať deň. Rodičia malých detí hovoria, že im práca z domu pomáha zladiť prácu a rodinu. Má to však aj nevýhody. Niektorí ľudia sa doma cítia osamelo a chýba im kontakt s kolegami. Iní priznávajú, že doma ťažšie oddelia prácu od voľného času a pracujú dlhšie, ako by mali. Preto si mnohé firmy vybrali kombinovaný model: dva alebo tri dni v kancelárii a zvyšok týždňa z domu. Odborníci odporúčajú mať doma samostatné pracovné miesto a pevný pracovný čas.",
            items: [
              { question: "Čo zamestnanci na práci z domu najviac oceňujú?", options: ["že nemusia cestovať do práce", "že majú vyšší plat", "že nemusia pracovať v pondelok"], answer: 0 },
              { question: "Komu pomáha práca z domu zladiť prácu a rodinu?", options: ["rodičom malých detí", "študentom", "dôchodcom"], answer: 0 },
              { question: "Aký problém majú niektorí ľudia doma?", options: ["Cítia sa osamelo.", "Nemajú internet.", "Nemajú čo robiť."], answer: 0 },
              { question: "Čo je kombinovaný model?", options: ["niekoľko dní v kancelárii a zvyšok z domu", "práca iba z domu", "práca iba v kancelárii"], answer: 0 },
              { question: "Čo odporúčajú odborníci?", options: ["mať samostatné pracovné miesto a pevný pracovný čas", "pracovať v noci", "pracovať v kaviarni"], answer: 0 }
            ]
          },
          {
            kind: "truefalse",
            instruction: { es: "Tarea 2. Lee el texto. ¿Las frases son verdaderas (Áno) o falsas (Nie)?", en: "Task 2. Read the text. Are the sentences true (Áno) or false (Nie)?" },
            text: "Do Bratislavy som sa presťahovala pred tromi rokmi kvôli práci. Na začiatku som nevedela po slovensky ani slovo a všetko som vybavovala po anglicky. Na úradoch to však bolo ťažké, preto som sa prihlásila na kurz slovenčiny. Najťažšie boli pre mňa pády, ale po roku som už dokázala bežne komunikovať v obchode aj u lekára. Dnes mám slovenských priateľov a s kolegami hovorím väčšinou po slovensky. Najviac mi chýba more, ale Dunaj a hory blízko mesta mi to trochu vynahrádzajú.",
            items: [
              { sk: "Autorka prišla do Bratislavy kvôli štúdiu.", answer: false },
              { sk: "Na úradoch sa jej po anglicky dohovorilo ľahko.", answer: false },
              { sk: "Pády boli pre ňu najťažšie.", answer: true },
              { sk: "S kolegami hovorí väčšinou po anglicky.", answer: false },
              { sk: "Chýba jej more.", answer: true }
            ]
          }
        ]
      },

      // ===== Listening =====
      {
        id: "listening",
        minutes: 30,
        tasks: [
          {
            kind: "choice",
            instruction: { es: "Tarea 1. Escucha la entrevista de radio (dos veces) y responde.", en: "Task 1. Listen to the radio interview (twice) and answer." },
            audio: [
              { who: "A", line: "Dobrý deň, v štúdiu je dnes Jana, ktorá už päť rokov pomáha ako dobrovoľníčka v útulku pre psov." },
              { who: "B", line: "Dobrý deň. Áno, do útulku chodím každú sobotu ráno." },
              { who: "A", line: "Čo tam robíte?" },
              { who: "B", line: "Venčím psov, čistím koterce a pomáham pri kŕmení. Niekedy psov fotím, aby si ich ľudia na internete skôr všimli a adoptovali." },
              { who: "A", line: "Prečo ste sa rozhodli pre dobrovoľníctvo?" },
              { who: "B", line: "Mám rada zvieratá, ale v byte nemôžem mať psa. Takto môžem byť so psami aspoň raz za týždeň." },
              { who: "A", line: "Koľko psov si od vás ľudia adoptujú?" },
              { who: "B", line: "Minulý rok si ľudia z nášho útulku adoptovali asi sto psov. To je pre nás veľká radosť." },
              { who: "A", line: "Čo by ste odkázali poslucháčom?" },
              { who: "B", line: "Ak máte čas, príďte nám pomôcť. A ak chcete psa, nekupujte ho, ale adoptujte." }
            ],
            items: [
              { question: "Ako dlho je Jana dobrovoľníčka?", options: ["päť rokov", "jeden rok", "desať rokov"], answer: 0 },
              { question: "Kedy chodí do útulku?", options: ["každú sobotu ráno", "každý deň večer", "v nedeľu popoludní"], answer: 0 },
              { question: "Prečo fotí psov?", options: ["aby si ich ľudia skôr adoptovali", "lebo je fotografka", "pre noviny"], answer: 0 },
              { question: "Prečo nemá vlastného psa?", options: ["V byte nemôže mať psa.", "Je alergická.", "Nemá čas."], answer: 0 },
              { question: "Čo radí poslucháčom?", options: ["Psa adoptovať, nie kupovať.", "Kúpiť psa v obchode.", "Nechodiť do útulku."], answer: 0 }
            ]
          },
          {
            kind: "choice",
            instruction: { es: "Tarea 2. Escucha los anuncios y mensajes (dos veces cada uno) y elige la respuesta correcta.", en: "Task 2. Listen to the announcements and messages (twice each) and choose the correct answer." },
            items: [
              { audio: [{ who: "A", line: "Vážení cestujúci, pre výluku na trati medzi Bratislavou a Trnavou bude vlak nahradený autobusovou dopravou. Autobusy odchádzajú spred hlavnej budovy stanice." }],
                question: "Čo sa stane s vlakom?", options: ["Nahradia ho autobusy.", "Bude meškať hodinu.", "Pôjde z iného nástupišťa."], answer: 0 },
              { audio: [{ who: "A", line: "Vážení zákazníci, predajňa bude o pätnásť minút zatvorená. Prosíme, ukončite nákup a pokračujte k pokladniciam." }],
                question: "Čo majú zákazníci urobiť?", options: ["ukončiť nákup a ísť k pokladniciam", "prísť zajtra", "počkať pätnásť minút"], answer: 0 },
              { audio: [{ who: "B", line: "Dobrý deň, tu je Anna z kancelárie. Porada sa presúva zo štvrtka na piatok o deviatej. Prosím, potvrďte mi e-mailom, či môžete prísť." }],
                question: "Čo má poslucháč urobiť?", options: ["potvrdiť e-mailom, či príde", "prísť vo štvrtok", "zavolať Anne"], answer: 0 },
              { audio: [{ who: "A", line: "V noci bude teplota klesať až na mínus päť stupňov. Vodičov upozorňujeme na poľadovicu." }],
                question: "Na čo upozorňujú vodičov?", options: ["na poľadovicu", "na hmlu", "na silný vietor"], answer: 0 },
              { audio: [{ who: "B", line: "Mestská knižnica od budúceho mesiaca predlžuje otváracie hodiny. Vo štvrtok bude otvorená až do ôsmej večer." }],
                question: "Čo sa mení?", options: ["Knižnica bude vo štvrtok otvorená dlhšie.", "Knižnica bude zatvorená.", "Knižnica sa sťahuje."], answer: 0 }
            ]
          }
        ]
      },

      // ===== Grammar and vocabulary =====
      {
        id: "grammar",
        minutes: 25,
        tasks: [
          {
            kind: "choice",
            instruction: { es: "Completa cada oración con la opción correcta.", en: "Complete each sentence with the correct option." },
            items: [
              { question: "Keby som mal viac peňazí, ___ by som si nové auto.", options: ["kúpil", "kúpim", "kupujem", "kúpiť"], answer: 0 },
              { question: "Žena, ___ som stretol v obchode, je moja susedka.", options: ["ktorú", "ktorá", "ktorej", "ktorou"], answer: 0 },
              { question: "Učím sa každý deň, ___ som zložil skúšku.", options: ["aby", "že", "keby", "pretože"], answer: 0 },
              { question: "Povedal mi, že ___ neskôr.", options: ["príde", "prísť", "prišiel by", "prichádzal"], answer: 0 },
              { question: "Toto je ___ reštaurácia v meste.", options: ["najlepšia", "najlepší", "lepšia", "najdobrejšia"], answer: 0 },
              { question: "Na Vianoce sa u nás ___ kapustnica.", options: ["varí", "varia", "varím", "variť"], answer: 0 },
              { question: "Nesúhlasím s tebou, ___ to nie je pravda.", options: ["pretože", "preto", "hoci", "aby"], answer: 0 },
              { question: "Rozprával som sa ___ kolegom o novom projekte.", options: ["s", "z", "k", "o"], answer: 0 },
              { question: "Už dva roky ___ v Bratislave.", options: ["bývam", "bývať", "budem bývať", "býval by"], answer: 0 },
              { question: "Pýtal sa ma, ___ mám čas.", options: ["či", "že", "aby", "keby"], answer: 0 }
            ]
          }
        ]
      },

      // ===== Writing =====
      {
        id: "writing",
        minutes: 60,
        tasks: [
          {
            kind: "write",
            instruction: {
              es: "Tarea 1. Compraste un lavarropas por internet y llegó dañado. Escribe a la tienda: qué compraste y cuándo, qué problema tiene, qué solución pides, y despídete formalmente.",
              en: "Task 1. You bought a washing machine online and it arrived damaged. Write to the shop: what you bought and when, what the problem is, what solution you want, and close formally."
            },
            minWords: 100,
            maxWords: 120,
            checklist: [
              { es: "Usé un saludo y una despedida formales.", en: "I used a formal greeting and closing." },
              { es: "Dije qué compré y cuándo.", en: "I said what I bought and when." },
              { es: "Describí el problema.", en: "I described the problem." },
              { es: "Pedí una solución concreta (cambio o devolución).", en: "I asked for a specific solution (replacement or refund)." },
              { es: "Usé conectores (pretože, preto, keď…).", en: "I used connectors (pretože, preto, keď…)." }
            ],
            model: "Dobrý deň,\npred týždňom som si vo vašom internetovom obchode objednal práčku, číslo objednávky 45210. Zaplatil som ju vopred kartou. Práčku mi doručili včera, ale keď som ju vybalil, zistil som, že má poškodené dvierka a nedajú sa zatvoriť. Preto ju nemôžem používať. Prikladám fotografie poškodenia. Je to pre mňa nepríjemné, pretože práčku potrebujem čo najskôr. Chcel by som vás požiadať o výmenu za novú práčku, prípadne o vrátenie peňazí. Dajte mi, prosím, vedieť, kedy si môžete poškodený tovar vyzdvihnúť. Doma som každý deň po piatej popoludní.\nVopred ďakujem za rýchle vybavenie reklamácie.\nS pozdravom\nPeter Gómez"
          },
          {
            kind: "write",
            instruction: {
              es: "Tarea 2. ¿Es mejor vivir en la ciudad o en el campo? Escribe tu opinión: presenta el tema, da ventajas y desventajas, y termina con una conclusión.",
              en: "Task 2. Is it better to live in the city or in the countryside? Write your opinion: introduce the topic, give advantages and disadvantages, and finish with a conclusion."
            },
            minWords: 120,
            maxWords: 150,
            checklist: [
              { es: "Presenté el tema en la introducción.", en: "I introduced the topic." },
              { es: "Di ventajas.", en: "I gave advantages." },
              { es: "Di desventajas.", en: "I gave disadvantages." },
              { es: "Di mi opinión con razones (podľa mňa, myslím si, že…).", en: "I gave my opinion with reasons (podľa mňa, myslím si, že…)." },
              { es: "Usé conectores (na jednej strane…, hoci, preto…).", en: "I used connectors (na jednej strane…, hoci, preto…)." }
            ],
            model: "Mnohí ľudia dnes riešia otázku, či je lepšie žiť v meste alebo na vidieku. Podľa mňa má každá možnosť svoje výhody aj nevýhody.\nNa jednej strane je život v meste pohodlnejší. Všetko je blízko: práca, obchody, lekári aj kultúra. Netreba mať auto, pretože mestská doprava funguje dobre. Na druhej strane je v meste hluk, znečistené ovzdušie a byty sú drahé.\nNa vidieku je pokoj, čistý vzduch a viac miesta. Ľudia sa navzájom poznajú a deti sa môžu hrať vonku. Hoci je tam život lacnejší, často treba dochádzať do práce aj niekoľko desiatok kilometrov.\nKeby som si mal vybrať, žil by som v menšom meste blízko prírody. Myslím si, že tak by som mal výhody oboch možností."
          }
        ]
      },

      // ===== Speaking =====
      {
        id: "speaking",
        minutes: 15,
        tasks: [
          {
            kind: "questions",
            instruction: { es: "Parte 1. Escucha cada pregunta y respóndela en voz alta con dos o tres oraciones.", en: "Part 1. Listen to each question and answer aloud in two or three sentences." },
            items: [
              { question: "Ako dlho sa učíte po slovensky a prečo?", model: "Po slovensky sa učím asi dva roky. Žijem a pracujem v Bratislave, a preto chcem rozumieť ľuďom okolo seba." },
              { question: "Čo bolo pre vás najťažšie, keď ste prišli na Slovensko?", model: "Najťažšie bolo vybavovanie na úradoch, pretože som ešte nevedel po slovensky. Pomohol mi kolega, ktorý so mnou chodil." },
              { question: "Ako trávite víkendy?", model: "Cez víkend rád chodím do prírody, napríklad do Malých Karpát. Večer sa stretávam s priateľmi." },
              { question: "Aká je vaša ideálna práca?", model: "Moja ideálna práca by bola zaujímavá a pestrá. Chcel by som pracovať v tíme a mať možnosť sa ďalej vzdelávať." },
              { question: "Čo by ste zmenili vo svojom meste?", model: "Zmenil by som dopravu v centre. Bolo by dobré mať viac cyklistických trás a menej áut." }
            ]
          },
          {
            kind: "monologue",
            instruction: { es: "Parte 2. Habla dos minutos sobre el tema y da tu opinión.", en: "Part 2. Talk for two minutes about the topic and give your opinion." },
            topic: "Sociálne siete: dobré alebo zlé?",
            prompts: ["Ako používate sociálne siete?", "Aké majú výhody?", "Aké majú nevýhody?", "Aký je váš názor?"],
            seconds: 120,
            model: "Sociálne siete používam hlavne na to, aby som bol v kontakte s rodinou a priateľmi v zahraničí. Ich veľkou výhodou je, že môžeme rýchlo zdieľať fotky a správy a dozvieme sa, čo sa deje vo svete. Na druhej strane majú aj nevýhody. Ľudia na nich trávia príliš veľa času a nie všetky informácie sú pravdivé. Niektorí sa porovnávajú s ostatnými a cítia sa horšie. Podľa mňa sociálne siete nie sú dobré ani zlé. Záleží na tom, ako ich používame. Preto si myslím, že treba mať na ne obmedzený čas a čítať informácie kriticky."
          },
          {
            kind: "roleplay",
            instruction: { es: "Parte 3. En el hotel, el aire acondicionado de tu habitación no funciona. Habla con la recepcionista y pide una solución.", en: "Part 3. At the hotel, the air conditioning in your room doesn't work. Talk to the receptionist and ask for a solution." },
            turns: [
              { line: "Dobrý deň, ako vám môžem pomôcť?", model: "Dobrý deň, mám problém s izbou. Nefunguje klimatizácia a je tam veľmi teplo." },
              { line: "To je mi ľúto. Pošlem tam technika.", model: "Ďakujem, ale hlásil som to už včera a nikto neprišiel." },
              { line: "Prepáčte. Môžem vám ponúknuť inú izbu.", model: "To by bolo výborné. Je tichšia ako tá moja?" },
              { line: "Áno, je na druhej strane, do dvora.", model: "Dobre, beriem ju. Mohli by ste mi aj zľaviť z ceny?" },
              { line: "Môžem vám dať zľavu desať percent.", model: "Ďakujem, to je v poriadku." }
            ]
          }
        ],
        checklist: [
          { es: "Respondí con dos o tres oraciones y di razones.", en: "I answered in two or three sentences and gave reasons." },
          { es: "Hablé dos minutos sobre el tema con ventajas, desventajas y mi opinión.", en: "I talked for two minutes with advantages, disadvantages and my opinion." },
          { es: "En el hotel expliqué el problema y conseguí una solución.", en: "At the hotel I explained the problem and got a solution." },
          { es: "Usé el condicional para pedir con cortesía (mohli by ste…).", en: "I used the conditional to ask politely (mohli by ste…)." },
          { es: "Hablé con fluidez, sin pausas largas.", en: "I spoke fluently, without long pauses." }
        ]
      }
    ]
  };

  window.AppData.exams.TESTS.push(TEST);
})();
