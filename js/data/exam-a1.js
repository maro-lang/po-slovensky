/*
 * data/exam-a1.js — A1 mock exam (modelový test A1).
 *
 * No public description of an official A1 exam of Slovak as a foreign
 * language was found, so the format follows the usual European A1 exams:
 * reading 20 min, listening about 20 min, writing 20 min and a short oral
 * part (reference: Goethe-Institut Slovakia, "Goethe-Zertifikat A1",
 * read 23-11-2026). The app says this on the exam screen.
 *
 * Same structure as data/exam-a2.js (see the explanation there). This file
 * adds its test to AppData.exams.TESTS, so it must load after exam-a2.js.
 *
 * Depends on: data/exam-a2.js. Used by js/screens-exam.js.
 */

(function () {
  "use strict";

  const TEST = {
    id: "a1-1",
    level: "A1",
    number: 1,
    parts: [
      // ===== Reading =====
      {
        id: "reading",
        minutes: 20,
        tasks: [
          {
            kind: "choice",
            instruction: { es: "Tarea 1. Lee los carteles y elige la respuesta correcta.", en: "Task 1. Read the signs and choose the correct answer." },
            items: [
              { text: "Lekáreň. Otvorené: Po – Pi 8.00 – 20.00.", question: "Kedy je lekáreň otvorená v pondelok?", options: ["od 8.00 do 20.00", "od 8.00 do 12.00", "V pondelok je zatvorená."], answer: 0 },
              { text: "Kaviareň: káva 2 €, čaj 1,50 €, koláč 3 €.", question: "Koľko stojí čaj?", options: ["1,50 €", "2 €", "3 €"], answer: 0 },
              { text: "Toalety sú na prvom poschodí.", question: "Kde sú toalety?", options: ["na prvom poschodí", "na prízemí", "vonku"], answer: 0 },
              { text: "Dnes zatvorené. Zajtra otvárame o 9.00.", question: "Kedy je obchod otvorený?", options: ["zajtra od deviatej", "dnes od deviatej", "dnes celý deň"], answer: 0 },
              { text: "Nefajčiť!", question: "Čo tu nesmiete robiť?", options: ["fajčiť", "jesť", "telefonovať"], answer: 0 }
            ]
          },
          {
            kind: "truefalse",
            instruction: { es: "Tarea 2. Lee el texto. ¿Las frases son verdaderas (Áno) o falsas (Nie)?", en: "Task 2. Read the text. Are the sentences true (Áno) or false (Nie)?" },
            text: "Volám sa Lucia. Mám dvadsaťosem rokov a som z Košíc. Teraz bývam v Bratislave. Pracujem v banke. Mám brata Petra. Peter je študent. V sobotu rada hrám tenis a v nedeľu varím.",
            items: [
              { sk: "Lucia je z Bratislavy.", answer: false },
              { sk: "Lucia pracuje v banke.", answer: true },
              { sk: "Peter je jej brat.", answer: true },
              { sk: "Peter pracuje.", answer: false },
              { sk: "V nedeľu Lucia varí.", answer: true }
            ]
          }
        ]
      },

      // ===== Listening =====
      {
        id: "listening",
        minutes: 20,
        tasks: [
          {
            kind: "choice",
            instruction: { es: "Tarea 1. Escucha (puedes escuchar dos veces) y elige la respuesta correcta.", en: "Task 1. Listen (you can play it twice) and choose the correct answer." },
            items: [
              { audio: [{ who: "A", line: "Koľko stojí lístok?" }, { who: "B", line: "Jedno euro." }], question: "Koľko stojí lístok?", options: ["1 €", "2 €", "10 €"], answer: 0 },
              { audio: [{ who: "A", line: "Ahoj, tu je Marek. Stretneme sa o šiestej pred kinom." }], question: "Kde sa stretnú?", options: ["pred kinom", "v kaviarni", "doma"], answer: 0 },
              { audio: [{ who: "A", line: "Prepáčte, kde je stanica?" }, { who: "B", line: "Rovno a potom vľavo." }], question: "Kam treba ísť?", options: ["rovno a potom vľavo", "vpravo", "späť"], answer: 0 },
              { audio: [{ who: "A", line: "Vlak do Žiliny odchádza o desiatej." }], question: "Kedy odchádza vlak?", options: ["o desiatej", "o deviatej", "o jedenástej"], answer: 0 },
              { audio: [{ who: "A", line: "Čo si dáte?" }, { who: "B", line: "Kávu s mliekom, prosím." }], question: "Čo si dá?", options: ["kávu s mliekom", "čaj", "vodu"], answer: 0 }
            ]
          },
          {
            kind: "choice",
            instruction: { es: "Tarea 2. Escucha la conversación (dos veces) y responde.", en: "Task 2. Listen to the conversation (twice) and answer." },
            audio: [
              { who: "A", line: "Ahoj, ja som Tomáš. Ako sa voláš?" },
              { who: "B", line: "Ahoj, volám sa Ana. Som zo Španielska." },
              { who: "A", line: "Teší ma. Kde bývaš?" },
              { who: "B", line: "Bývam v Petržalke. Pracujem ako učiteľka." },
              { who: "A", line: "Hovoríš po slovensky dobre!" },
              { who: "B", line: "Ďakujem, učím sa už rok." }
            ],
            items: [
              { question: "Odkiaľ je Ana?", options: ["zo Španielska", "zo Slovenska", "z Talianska"], answer: 0 },
              { question: "Kde býva Ana?", options: ["v Petržalke", "v centre", "v Košiciach"], answer: 0 },
              { question: "Čo robí Ana?", options: ["Je učiteľka.", "Je študentka.", "Je lekárka."], answer: 0 },
              { question: "Ako dlho sa učí po slovensky?", options: ["rok", "mesiac", "dva roky"], answer: 0 }
            ]
          }
        ]
      },

      // ===== Writing =====
      {
        id: "writing",
        minutes: 20,
        tasks: [
          {
            kind: "write",
            instruction: {
              es: "Escribe un mensaje corto a un compañero nuevo: preséntate (nombre, país, dónde vives, trabajo) y hazle una pregunta.",
              en: "Write a short message to a new classmate: introduce yourself (name, country, where you live, job) and ask a question."
            },
            minWords: 20,
            maxWords: 35,
            checklist: [
              { es: "Dije mi nombre y de dónde soy.", en: "I said my name and where I'm from." },
              { es: "Dije dónde vivo.", en: "I said where I live." },
              { es: "Dije en qué trabajo.", en: "I said what I do." },
              { es: "Hice una pregunta.", en: "I asked a question." },
              { es: "Usé bien el verbo byť (som, si, je…).", en: "I used the verb byť correctly (som, si, je…)." }
            ],
            model: "Ahoj, volám sa Peter. Som z Argentíny. Bývam v Bratislave a pracujem ako inžinier. Rád hrám futbal. A ty? Čo robíš vo voľnom čase?"
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
            instruction: { es: "Parte 1. Escucha y responde en voz alta con una oración completa.", en: "Part 1. Listen and answer aloud in a full sentence." },
            items: [
              { question: "Ako sa voláte?", model: "Volám sa Peter Gómez." },
              { question: "Odkiaľ ste?", model: "Som z Argentíny." },
              { question: "Koľko máte rokov?", model: "Mám štyridsať rokov." },
              { question: "Kde pracujete?", model: "Pracujem v medzinárodnej firme v Bratislave." },
              { question: "Čo radi jete?", model: "Rád jem cestoviny a ovocie." }
            ]
          },
          {
            kind: "monologue",
            instruction: { es: "Parte 2. Habla unos 45 segundos sobre tu familia.", en: "Part 2. Talk for about 45 seconds about your family." },
            topic: "Moja rodina",
            prompts: ["Koľko ľudí je vo vašej rodine?", "Ako sa volajú?", "Kde bývajú?"],
            seconds: 45,
            model: "Moja rodina nie je veľká. Mám mamu a sestru. Mama sa volá Silvia a sestra sa volá Laura. Mama býva v Buenos Aires a sestra v Madride. Ja bývam v Bratislave."
          },
          {
            kind: "roleplay",
            instruction: { es: "Parte 3. Estás en un café. Escucha al mozo y responde: pide un café con leche y una torta, y paga.", en: "Part 3. You're in a café. Listen to the waiter and answer: order a coffee with milk and a cake, and pay." },
            turns: [
              { line: "Dobrý deň, čo si dáte?", model: "Dobrý deň, kávu, prosím." },
              { line: "S mliekom?", model: "Áno, s mliekom." },
              { line: "Ešte niečo?", model: "Áno, jeden koláč, prosím." },
              { line: "To je spolu päť eur.", model: "Nech sa páči. Ďakujem." }
            ]
          }
        ],
        checklist: [
          { es: "Respondí con oraciones completas.", en: "I answered in full sentences." },
          { es: "Hablé de mi familia sin detenerme mucho.", en: "I talked about my family without long pauses." },
          { es: "En el café pedí y pagué.", en: "In the café I ordered and paid." },
          { es: "Usé «Dobrý deň», «prosím» y «ďakujem».", en: "I used «Dobrý deň», «prosím» and «ďakujem»." }
        ]
      }
    ]
  };

  window.AppData.exams.TESTS.push(TEST);
})();
