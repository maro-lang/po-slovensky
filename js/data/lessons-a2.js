/*
 * data/lessons-a2.js — Units of level A2.
 *
 * The 9 units follow the everyday topics of the A2 Slovak exam for foreigners
 * (housing, work, people, food, transport, health, shopping, free time) plus
 * a unit for offices such as the foreign police.
 *
 * Same format as data/lessons-a1.js (see the explanation there): title, intro,
 * phrases, grammar, note and exercises of type "meaning", "say", "fill" and "listen".
 * This file adds its units to AppData.lessons.UNITS, so it must load after
 * lessons-a1.js.
 *
 * Depends on: data/lessons-a1.js. Used by js/screens-lessons.js.
 */

(function () {
  "use strict";

  const UNITS = [
    // ===== Unit 1: housing =====
    {
      id: "a2-1",
      level: "A2",
      number: 1,
      title: { sk: "Bývanie", es: "La vivienda", en: "Housing" },
      intro: {
        es: "Buscar departamento, preguntar por el alquiler y hablar de tu casa. Gramática: dónde está algo (v / na + locativo).",
        en: "Look for a flat, ask about the rent and talk about your home. Grammar: where something is (v / na + locative)."
      },
      phrases: [
        { sk: "Hľadám byt na prenájom.", es: "Busco un departamento en alquiler.", en: "I'm looking for a flat to rent." },
        { sk: "Koľko stojí nájom?", es: "¿Cuánto cuesta el alquiler?", en: "How much is the rent?" },
        { sk: "Sú energie v cene?", es: "¿Los servicios (luz, gas) están incluidos?", en: "Are utilities included?" },
        { sk: "Byt má dve izby, kuchyňu a kúpeľňu.", es: "El departamento tiene dos ambientes, cocina y baño.", en: "The flat has two rooms, a kitchen and a bathroom." },
        { sk: "Je byt zariadený?", es: "¿Está amueblado?", en: "Is the flat furnished?" },
        { sk: "Kedy si môžem byt pozrieť?", es: "¿Cuándo puedo ver el departamento?", en: "When can I see the flat?" },
        { sk: "Bývam na treťom poschodí.", es: "Vivo en el tercer piso.", en: "I live on the third floor." },
        { sk: "Kaucia je jeden nájom.", es: "La garantía es un mes de alquiler.", en: "The deposit is one month's rent." },
        { sk: "Podpíšeme zmluvu na rok.", es: "Firmamos el contrato por un año.", en: "We'll sign the contract for a year." },
        { sk: "Nefunguje kúrenie.", es: "No funciona la calefacción.", en: "The heating doesn't work." },
        { sk: "Susedia sú hluční.", es: "Los vecinos son ruidosos.", en: "The neighbours are noisy." },
        { sk: "Kedy môžem byt prevziať?", es: "¿Cuándo puedo recibir el departamento?", en: "When can I move in?" }
      ],
      grammar: {
        title: { sk: "Kde? v / na", es: "¿Dónde? v / na + locativo", en: "Where? v / na + locative" },
        rows: [
          { sk: "v kuchyni", es: "en la cocina (kuchyňa)", en: "in the kitchen (kuchyňa)" },
          { sk: "v obývačke", es: "en el living (obývačka)", en: "in the living room (obývačka)" },
          { sk: "v spálni", es: "en el dormitorio (spálňa)", en: "in the bedroom (spálňa)" },
          { sk: "v kúpeľni", es: "en el baño (kúpeľňa)", en: "in the bathroom (kúpeľňa)" },
          { sk: "na balkóne", es: "en el balcón (balkón)", en: "on the balcony (balkón)" },
          { sk: "na chodbe", es: "en el pasillo (chodba)", en: "in the hallway (chodba)" },
          { sk: "na treťom poschodí", es: "en el tercer piso", en: "on the third floor" }
        ]
      },
      note: {
        es: "«v» es para lugares cerrados (v kuchyni, v byte) y «na» para superficies, pisos y lugares abiertos (na balkóne, na poschodí). En los avisos: «2-izbový byt» es un departamento de 2 ambientes y «energie» son luz, gas y agua.",
        en: "«v» is for enclosed places (v kuchyni, v byte) and «na» for surfaces, floors and open places (na balkóne, na poschodí). In ads, «2-izbový byt» is a two-room flat and «energie» means electricity, gas and water."
      },
      exercises: [
        { type: "fill", sk: "Večeriame v ___. (kuchyňa)", options: ["kuchyni", "kuchyňa", "kuchyne", "kuchyňou"], answer: 0 },
        { type: "fill", sk: "Sedím na ___. (balkón)", options: ["balkóne", "balkón", "balkóna", "balkónom"], answer: 0 },
        { type: "fill", sk: "Bývam na treťom ___.", options: ["poschodí", "poschodie", "poschodia", "poschodím"], answer: 0 },
        { type: "meaning", sk: "Sú energie v cene?",
          options: { es: ["¿Los servicios están incluidos en el precio?", "¿Cuánto cuesta la luz?", "¿Hay calefacción?", "¿Está amueblado?"],
                     en: ["Are utilities included in the price?", "How much is electricity?", "Is there heating?", "Is it furnished?"] }, answer: 0 },
        { type: "say", prompt: { es: "Quieres saber si está amueblado:", en: "You want to know if it's furnished:" },
          options: ["Je byt zariadený?", "Je byt voľný?", "Je byt veľký?", "Je byt drahý?"], answer: 0 },
        { type: "listen", sk: "Nefunguje kúrenie.",
          options: { es: ["No funciona la calefacción.", "No funciona la ducha.", "No hay agua caliente.", "No hay luz."],
                     en: ["The heating doesn't work.", "The shower doesn't work.", "There's no hot water.", "There's no electricity."] }, answer: 0 },
        { type: "say", prompt: { es: "Preguntas cuándo puedes ver el departamento:", en: "You ask when you can see the flat:" },
          options: ["Kedy si môžem byt pozrieť?", "Kedy môžem zaplatiť?", "Kde je byt?", "Koľko stojí byt?"], answer: 0 },
        { type: "meaning", sk: "kaucia",
          options: { es: ["garantía (depósito)", "alquiler", "contrato", "vecino"],
                     en: ["deposit", "rent", "contract", "neighbour"] }, answer: 0 }
      ]
    },

    // ===== Unit 2: work =====
    {
      id: "a2-2",
      level: "A2",
      number: 2,
      title: { sk: "Práca", es: "El trabajo", en: "Work" },
      intro: {
        es: "Hablar de tu profesión, tu horario y tu día de trabajo, también en pasado. Gramática: profesiones en masculino y femenino.",
        en: "Talk about your job, your hours and your working day, also in the past. Grammar: job names for men and women."
      },
      phrases: [
        { sk: "Čo robíte?", es: "¿A qué se dedica?", en: "What do you do?" },
        { sk: "Som inžinier.", es: "Soy ingeniero.", en: "I'm an engineer." },
        { sk: "Pracujem ako programátor.", es: "Trabajo como programador.", en: "I work as a programmer." },
        { sk: "Pracujem v medzinárodnej firme.", es: "Trabajo en una empresa internacional.", en: "I work for an international company." },
        { sk: "Pracujem na plný úväzok.", es: "Trabajo a tiempo completo.", en: "I work full time." },
        { sk: "Začínam o ôsmej a končím o štvrtej.", es: "Empiezo a las ocho y termino a las cuatro.", en: "I start at eight and finish at four." },
        { sk: "Mám poradu o desiatej.", es: "Tengo una reunión a las diez.", en: "I have a meeting at ten." },
        { sk: "Dnes pracujem z domu.", es: "Hoy trabajo desde casa.", en: "Today I'm working from home." },
        { sk: "Môj šéf je veľmi milý.", es: "Mi jefe es muy amable.", en: "My boss is very nice." },
        { sk: "Mám dovolenku v auguste.", es: "Tengo vacaciones en agosto.", en: "I'm on holiday in August." },
        { sk: "Hľadám prácu.", es: "Busco trabajo.", en: "I'm looking for a job." },
        { sk: "Včera som pracoval do večera.", es: "Ayer trabajé hasta la noche. (hombre)", en: "Yesterday I worked until the evening. (man)" }
      ],
      grammar: {
        title: { sk: "Povolania", es: "Profesiones: hombre / mujer", en: "Jobs: man / woman" },
        rows: [
          { sk: "učiteľ / učiteľka", es: "profesor / profesora", en: "teacher" },
          { sk: "lekár / lekárka", es: "médico / médica", en: "doctor" },
          { sk: "inžinier / inžinierka", es: "ingeniero / ingeniera", en: "engineer" },
          { sk: "predavač / predavačka", es: "vendedor / vendedora", en: "shop assistant" },
          { sk: "čašník / čašníčka", es: "mozo / moza", en: "waiter / waitress" },
          { sk: "programátor / programátorka", es: "programador / programadora", en: "programmer" },
          { sk: "kuchár / kuchárka", es: "cocinero / cocinera", en: "cook" }
        ]
      },
      note: {
        es: "Después de «som» y de «pracujem ako» la profesión va en nominativo: Som lekárka. Pracujem ako čašník. Para contar tu día en pasado, repasa el tema «Pasado» del módulo Verbos.",
        en: "After «som» and «pracujem ako» the job is in the nominative: Som lekárka. Pracujem ako čašník. To tell your day in the past, see the «Past tense» topic in the Verbs module."
      },
      exercises: [
        { type: "say", prompt: { es: "Dices que eres profesora:", en: "You say you're a (female) teacher:" },
          options: ["Som učiteľka.", "Som učiteľ.", "Som lekárka.", "Som predavačka."], answer: 0 },
        { type: "fill", sk: "Včera som ___ do večera.", options: ["pracoval", "pracovať", "pracujem", "pracuje"], answer: 0 },
        { type: "fill", sk: "Pracujem ___ programátor.", options: ["ako", "je", "ten", "s"], answer: 0 },
        { type: "fill", sk: "Začínam o ôsmej a ___ o štvrtej.", options: ["končím", "končí", "končíš", "končia"], answer: 0 },
        { type: "meaning", sk: "Mám poradu o desiatej.",
          options: { es: ["Tengo una reunión a las diez.", "Tengo vacaciones en diciembre.", "Termino a las diez.", "Tengo diez colegas."],
                     en: ["I have a meeting at ten.", "I'm on holiday in December.", "I finish at ten.", "I have ten colleagues."] }, answer: 0 },
        { type: "listen", sk: "Mám dovolenku v auguste.",
          options: { es: ["Tengo vacaciones en agosto.", "Empiezo a trabajar en agosto.", "Tengo una reunión en agosto.", "Busco trabajo en agosto."],
                     en: ["I'm on holiday in August.", "I start work in August.", "I have a meeting in August.", "I'm looking for work in August."] }, answer: 0 },
        { type: "say", prompt: { es: "Dices que hoy trabajas desde casa:", en: "You say you're working from home today:" },
          options: ["Dnes pracujem z domu.", "Dnes nepracujem.", "Dnes idem do práce.", "Dnes mám dovolenku."], answer: 0 },
        { type: "meaning", sk: "Pracujem na plný úväzok.",
          options: { es: ["Trabajo a tiempo completo.", "Trabajo medio día.", "No trabajo.", "Trabajo los fines de semana."],
                     en: ["I work full time.", "I work part time.", "I don't work.", "I work at weekends."] }, answer: 0 }
      ]
    },

    // ===== Unit 3: people =====
    {
      id: "a2-3",
      level: "A2",
      number: 3,
      title: { sk: "Ľudia", es: "Las personas", en: "People" },
      intro: {
        es: "Describir a alguien: cómo es, qué edad tiene, dónde nació. Gramática: el adjetivo cambia con el género, y cómo comparar.",
        en: "Describe someone: what they look like, how old they are, where they were born. Grammar: adjectives change with gender, and how to compare."
      },
      phrases: [
        { sk: "Ako vyzerá?", es: "¿Cómo es (físicamente)?", en: "What does he / she look like?" },
        { sk: "Je vysoký a štíhly.", es: "Es alto y delgado.", en: "He's tall and slim." },
        { sk: "Má krátke tmavé vlasy.", es: "Tiene el pelo corto y oscuro.", en: "He / she has short dark hair." },
        { sk: "Má modré oči.", es: "Tiene ojos azules.", en: "He / she has blue eyes." },
        { sk: "Nosí okuliare.", es: "Usa anteojos.", en: "He / she wears glasses." },
        { sk: "Je veľmi milá a vtipná.", es: "Es muy amable y divertida.", en: "She's very nice and funny." },
        { sk: "Koľko má rokov?", es: "¿Cuántos años tiene?", en: "How old is he / she?" },
        { sk: "Má tridsaťpäť rokov.", es: "Tiene treinta y cinco años.", en: "He / she is thirty-five." },
        { sk: "Narodil som sa v Buenos Aires.", es: "Nací en Buenos Aires. (hombre)", en: "I was born in Buenos Aires. (man)" },
        { sk: "Narodila sa v roku 1990.", es: "Ella nació en 1990.", en: "She was born in 1990." },
        { sk: "Je ženatý.", es: "Está casado.", en: "He's married." },
        { sk: "Je vydatá.", es: "Está casada.", en: "She's married." },
        { sk: "Môj brat je starší ako ja.", es: "Mi hermano es mayor que yo.", en: "My brother is older than me." }
      ],
      grammar: {
        title: { sk: "Prídavné mená", es: "Adjetivos: masculino / femenino / neutro", en: "Adjectives: masculine / feminine / neuter" },
        rows: [
          { sk: "vysoký muž / vysoká žena / vysoké dieťa", es: "alto / alta (para niño se usa el neutro)", en: "tall (man / woman / child)" },
          { sk: "mladý / mladá / mladé", es: "joven", en: "young" },
          { sk: "pekný / pekná / pekné", es: "lindo / linda", en: "nice / pretty" },
          { sk: "mladí muži / mladé ženy", es: "plural: hombres jóvenes / mujeres jóvenes", en: "plural: young men / young women" },
          { sk: "starý → starší, mladý → mladší", es: "más viejo, más joven", en: "older, younger" },
          { sk: "vysoký → vyšší, dobrý → lepší", es: "más alto, mejor", en: "taller, better" }
        ]
      },
      note: {
        es: "Terminaciones: -ý (masculino), -á (femenino), -é (neutro); después de consonante blanda o de sílaba larga: -y, -a, -e (štíhly, štíhla). Para comparar se usa «ako»: Som mladší ako ty. «Ženatý» es para hombres y «vydatá» para mujeres.",
        en: "Endings: -ý (masculine), -á (feminine), -é (neuter); after a long syllable: -y, -a, -e (štíhly, štíhla). To compare use «ako»: Som mladší ako ty. «Ženatý» is for men and «vydatá» for women."
      },
      exercises: [
        { type: "fill", sk: "Moja sestra je ___. (vysoký)", options: ["vysoká", "vysoký", "vysoké", "vysokí"], answer: 0 },
        { type: "fill", sk: "Môj otec je ___ ako mama. (starý)", options: ["starší", "staršia", "starý", "staršie"], answer: 0 },
        { type: "fill", sk: "Má ___ oči. (modrý)", options: ["modré", "modrý", "modrá", "modrej"], answer: 0 },
        { type: "fill", sk: "Je to ___ dieťa. (pekný)", options: ["pekné", "pekný", "pekná", "pekní"], answer: 0 },
        { type: "meaning", sk: "Nosí okuliare.",
          options: { es: ["Usa anteojos.", "Tiene ojos azules.", "Es alto.", "Lleva una bolsa."],
                     en: ["He / she wears glasses.", "He / she has blue eyes.", "He's tall.", "He / she carries a bag."] }, answer: 0 },
        { type: "say", prompt: { es: "Dices que naciste en Argentina (hombre):", en: "You say you were born in Argentina (man):" },
          options: ["Narodil som sa v Argentíne.", "Narodila som sa v Argentíne.", "Bývam v Argentíne.", "Som z Argentíny."], answer: 0 },
        { type: "listen", sk: "Má tridsaťpäť rokov.",
          options: ["35", "25", "53", "30"], answer: 0 },
        { type: "meaning", sk: "Je vydatá.",
          options: { es: ["Está casada.", "Es soltera.", "Está divorciada.", "Es joven."],
                     en: ["She's married.", "She's single.", "She's divorced.", "She's young."] }, answer: 0 }
      ]
    },

    // ===== Unit 4: food and cooking =====
    {
      id: "a2-4",
      level: "A2",
      number: 4,
      title: { sk: "Jedlo a varenie", es: "Comida y cocina", en: "Food and cooking" },
      intro: {
        es: "Comprar cantidades en el mercado y seguir una receta. Gramática: cantidad + genitivo (kilo jabĺk) y el imperativo (pokrájaj, pridaj).",
        en: "Buy quantities at the market and follow a recipe. Grammar: quantity + genitive (kilo jabĺk) and the imperative (pokrájaj, pridaj)."
      },
      phrases: [
        { sk: "Prosím si kilo jabĺk.", es: "Un kilo de manzanas, por favor.", en: "A kilo of apples, please." },
        { sk: "Dajte mi fľašu vody, prosím.", es: "Deme una botella de agua, por favor.", en: "Give me a bottle of water, please." },
        { sk: "Desať deka šunky, prosím.", es: "Cien gramos de jamón, por favor.", en: "A hundred grams of ham, please." },
        { sk: "liter mlieka", es: "un litro de leche", en: "a litre of milk" },
        { sk: "balík cestovín", es: "un paquete de fideos", en: "a packet of pasta" },
        { sk: "Pokrájaj cibuľu.", es: "Corta la cebolla.", en: "Chop the onion." },
        { sk: "Pridaj soľ a korenie.", es: "Agrega sal y pimienta.", en: "Add salt and pepper." },
        { sk: "Var to desať minút.", es: "Hiérvelo diez minutos.", en: "Boil it for ten minutes." },
        { sk: "Daj to do rúry na pol hodiny.", es: "Mételo al horno media hora.", en: "Put it in the oven for half an hour." },
        { sk: "Čo budeme variť?", es: "¿Qué vamos a cocinar?", en: "What are we going to cook?" },
        { sk: "Som vegetarián.", es: "Soy vegetariano.", en: "I'm a vegetarian." },
        { sk: "Je to štipľavé?", es: "¿Es picante?", en: "Is it spicy?" }
      ],
      grammar: {
        title: { sk: "Koľko? + genitív", es: "Cantidades + genitivo", en: "Quantities + genitive" },
        rows: [
          { sk: "kilo jabĺk", es: "un kilo de manzanas (jablká)", en: "a kilo of apples (jablká)" },
          { sk: "fľaša vody", es: "una botella de agua (voda)", en: "a bottle of water (voda)" },
          { sk: "liter mlieka", es: "un litro de leche (mlieko)", en: "a litre of milk (mlieko)" },
          { sk: "balík cestovín", es: "un paquete de fideos (cestoviny)", en: "a packet of pasta (cestoviny)" },
          { sk: "desať deka syra", es: "cien gramos de queso (syr)", en: "100 g of cheese (syr)" },
          { sk: "pohár vína", es: "una copa de vino (víno)", en: "a glass of wine (víno)" },
          { sk: "šálka kávy", es: "una taza de café (káva)", en: "a cup of coffee (káva)" }
        ]
      },
      note: {
        es: "En Eslovaquia el fiambre y el queso se piden en «deka» (1 deka = 10 gramos). Imperativo: toma la forma de «oni» y quítale la terminación: pokrájajú → pokrájaj, robia → rob, pijú → pi; para «vy» agrega -te: pokrájajte, robte.",
        en: "In Slovakia cold cuts and cheese are ordered in «deka» (1 deka = 10 grams). Imperative: take the «oni» form and drop the ending: pokrájajú → pokrájaj, robia → rob, pijú → pi; for «vy» add -te: pokrájajte, robte."
      },
      exercises: [
        { type: "fill", sk: "Prosím si kilo ___. (jablká)", options: ["jabĺk", "jablká", "jablkách", "jablkami"], answer: 0 },
        { type: "fill", sk: "Dajte mi fľašu ___. (voda)", options: ["vody", "voda", "vodu", "vode"], answer: 0 },
        { type: "fill", sk: "Kúpil som liter ___. (mlieko)", options: ["mlieka", "mlieko", "mlieku", "mliekom"], answer: 0 },
        { type: "say", prompt: { es: "Le dices a un amigo que agregue sal:", en: "You tell a friend to add salt:" },
          options: ["Pridaj soľ.", "Pridajte soľ.", "Pridáva soľ.", "Pridal soľ."], answer: 0 },
        { type: "say", prompt: { es: "En un restaurante dices que eres vegetariano:", en: "At a restaurant you say you're vegetarian:" },
          options: ["Som vegetarián.", "Nejem zeleninu.", "Mám rád mäso.", "Je to štipľavé?"], answer: 0 },
        { type: "meaning", sk: "Var to desať minút.",
          options: { es: ["Hiérvelo diez minutos.", "Córtalo en diez pedazos.", "Espera diez minutos.", "Hornéalo diez minutos."],
                     en: ["Boil it for ten minutes.", "Cut it into ten pieces.", "Wait ten minutes.", "Bake it for ten minutes."] }, answer: 0 },
        { type: "listen", sk: "Desať deka šunky, prosím.",
          options: { es: ["Cien gramos de jamón.", "Diez kilos de jamón.", "Un kilo de jamón.", "Diez fetas de queso."],
                     en: ["100 grams of ham.", "Ten kilos of ham.", "One kilo of ham.", "Ten slices of cheese."] }, answer: 0 },
        { type: "fill", sk: "Daj to do ___ na pol hodiny. (rúra)", options: ["rúry", "rúra", "rúre", "rúrou"], answer: 0 }
      ]
    },

    // ===== Unit 5: transport =====
    {
      id: "a2-5",
      level: "A2",
      number: 5,
      title: { sk: "Doprava", es: "El transporte", en: "Transport" },
      intro: {
        es: "Moverte por Bratislava: paradas, boletos, horarios y direcciones. Gramática: el medio de transporte en instrumental (električkou, vlakom).",
        en: "Get around Bratislava: stops, tickets, timetables and directions. Grammar: means of transport in the instrumental (električkou, vlakom)."
      },
      phrases: [
        { sk: "Kde je najbližšia zastávka?", es: "¿Dónde está la parada más cercana?", en: "Where is the nearest stop?" },
        { sk: "Ktorá električka ide na Hlavnú stanicu?", es: "¿Qué tranvía va a la estación central?", en: "Which tram goes to the main station?" },
        { sk: "Prosím si lístok na tridsať minút.", es: "Un boleto de treinta minutos, por favor.", en: "A thirty-minute ticket, please." },
        { sk: "Musím prestúpiť?", es: "¿Tengo que hacer transbordo?", en: "Do I have to change?" },
        { sk: "Vystúpte na tretej zastávke.", es: "Bájese en la tercera parada.", en: "Get off at the third stop." },
        { sk: "Autobus mešká desať minút.", es: "El autobús viene diez minutos tarde.", en: "The bus is ten minutes late." },
        { sk: "Do práce chodím električkou.", es: "Voy al trabajo en tranvía.", en: "I go to work by tram." },
        { sk: "Kedy odchádza vlak do Košíc?", es: "¿A qué hora sale el tren a Košice?", en: "When does the train to Košice leave?" },
        { sk: "Z ktorého nástupišťa?", es: "¿De qué andén?", en: "From which platform?" },
        { sk: "Choďte rovno a potom doľava.", es: "Siga derecho y después a la izquierda.", en: "Go straight on and then left." },
        { sk: "Je to ďaleko?", es: "¿Está lejos?", en: "Is it far?" },
        { sk: "Asi päť minút peši.", es: "Unos cinco minutos a pie.", en: "About five minutes on foot." }
      ],
      grammar: {
        title: { sk: "Čím? autobusom…", es: "¿En qué? Instrumental", en: "By what? Instrumental" },
        rows: [
          { sk: "autobusom", es: "en autobús (autobus)", en: "by bus (autobus)" },
          { sk: "električkou", es: "en tranvía (električka)", en: "by tram (električka)" },
          { sk: "trolejbusom", es: "en trolebús (trolejbus)", en: "by trolleybus (trolejbus)" },
          { sk: "vlakom", es: "en tren (vlak)", en: "by train (vlak)" },
          { sk: "autom", es: "en auto (auto)", en: "by car (auto)" },
          { sk: "lietadlom", es: "en avión (lietadlo)", en: "by plane (lietadlo)" },
          { sk: "na bicykli, peši", es: "en bicicleta, a pie", en: "by bike, on foot" }
        ]
      },
      note: {
        es: "MHD es el transporte público de la ciudad. Para horarios se usa «odchádza» (sale) y «prichádza» (llega). Direcciones: rovno (derecho), doľava (a la izquierda), doprava (a la derecha), späť (atrás).",
        en: "MHD is the city's public transport. For timetables use «odchádza» (leaves) and «prichádza» (arrives). Directions: rovno (straight on), doľava (left), doprava (right), späť (back)."
      },
      exercises: [
        { type: "fill", sk: "Do práce chodím ___. (električka)", options: ["električkou", "električka", "električku", "električke"], answer: 0 },
        { type: "fill", sk: "Do Košíc idem ___. (vlak)", options: ["vlakom", "vlak", "vlaku", "vlaky"], answer: 0 },
        { type: "say", prompt: { es: "Preguntas si tienes que hacer transbordo:", en: "You ask if you have to change:" },
          options: ["Musím prestúpiť?", "Musím vystúpiť?", "Kde je zastávka?", "Koľko stojí lístok?"], answer: 0 },
        { type: "meaning", sk: "Autobus mešká desať minút.",
          options: { es: ["El autobús viene diez minutos tarde.", "El autobús sale en diez minutos.", "El viaje dura diez minutos.", "El autobús pasa cada diez minutos."],
                     en: ["The bus is ten minutes late.", "The bus leaves in ten minutes.", "The trip takes ten minutes.", "The bus runs every ten minutes."] }, answer: 0 },
        { type: "listen", sk: "Choďte rovno a potom doľava.",
          options: { es: ["Siga derecho y después a la izquierda.", "Doble a la derecha y siga derecho.", "Vuelva atrás.", "Siga derecho y después a la derecha."],
                     en: ["Go straight on and then left.", "Turn right and go straight on.", "Go back.", "Go straight on and then right."] }, answer: 0 },
        { type: "fill", sk: "Kedy ___ vlak do Košíc?", options: ["odchádza", "odchádzam", "odchádzajú", "odchádzaš"], answer: 0 },
        { type: "meaning", sk: "Z ktorého nástupišťa?",
          options: { es: ["¿De qué andén?", "¿De qué ciudad?", "¿A qué hora?", "¿Dónde compro el boleto?"],
                     en: ["From which platform?", "From which city?", "At what time?", "Where do I buy a ticket?"] }, answer: 0 },
        { type: "say", prompt: { es: "Pides un boleto de treinta minutos:", en: "You ask for a thirty-minute ticket:" },
          options: ["Prosím si lístok na tridsať minút.", "Prosím si lístok do Košíc.", "Kde je pokladňa?", "Mám lístok."], answer: 0 }
      ]
    },

    // ===== Unit 6: health =====
    {
      id: "a2-6",
      level: "A2",
      number: 6,
      title: { sk: "Zdravie", es: "La salud", en: "Health" },
      intro: {
        es: "Pedir turno, explicarle al médico qué te pasa y entender la receta. Gramática: «bolí ma» (me duele).",
        en: "Book an appointment, tell the doctor what's wrong and understand the prescription. Grammar: «bolí ma» (it hurts)."
      },
      phrases: [
        { sk: "Potrebujem sa objednať k lekárovi.", es: "Necesito pedir turno con el médico.", en: "I need to make a doctor's appointment." },
        { sk: "Čo vás bolí?", es: "¿Qué le duele?", en: "What hurts?" },
        { sk: "Bolí ma hlava.", es: "Me duele la cabeza.", en: "I have a headache." },
        { sk: "Bolí ma hrdlo.", es: "Me duele la garganta.", en: "I have a sore throat." },
        { sk: "Bolia ma zuby.", es: "Me duelen los dientes.", en: "My teeth hurt." },
        { sk: "Mám horúčku.", es: "Tengo fiebre.", en: "I have a fever." },
        { sk: "Mám nádchu a kašlem.", es: "Estoy resfriado y tengo tos.", en: "I have a cold and a cough." },
        { sk: "Som alergický na penicilín.", es: "Soy alérgico a la penicilina.", en: "I'm allergic to penicillin." },
        { sk: "Užívajte tieto tabletky trikrát denne.", es: "Tome estas pastillas tres veces por día.", en: "Take these tablets three times a day." },
        { sk: "Tu je recept.", es: "Aquí tiene la receta.", en: "Here's the prescription." },
        { sk: "Kde je najbližšia lekáreň?", es: "¿Dónde está la farmacia más cercana?", en: "Where's the nearest pharmacy?" },
        { sk: "Zavolajte záchranku!", es: "¡Llame a una ambulancia!", en: "Call an ambulance!" }
      ],
      grammar: {
        title: { sk: "Bolí ma… / Bolia ma…", es: "Me duele… / Me duelen…", en: "My … hurts / hurt" },
        rows: [
          { sk: "Bolí ma hlava.", es: "la cabeza", en: "head" },
          { sk: "Bolí ma brucho.", es: "la panza", en: "stomach" },
          { sk: "Bolí ma chrbát.", es: "la espalda", en: "back" },
          { sk: "Bolí ma noha.", es: "la pierna / el pie", en: "leg / foot" },
          { sk: "Bolí ma ruka.", es: "el brazo / la mano", en: "arm / hand" },
          { sk: "Bolia ma zuby.", es: "los dientes (plural: bolia)", en: "teeth (plural: bolia)" },
          { sk: "Bolia ma oči.", es: "los ojos (plural: bolia)", en: "eyes (plural: bolia)" }
        ]
      },
      note: {
        es: "«Bolí ma» funciona como «me duele»: con una parte del cuerpo, bolí; con varias, bolia. Emergencias: 112 (general) y 155 (ambulancia). «Recept» es la receta del médico, no una receta de cocina.",
        en: "«Bolí ma» works like «it hurts me»: one body part takes bolí, several take bolia. Emergencies: 112 (general) and 155 (ambulance). «Recept» also means a doctor's prescription."
      },
      exercises: [
        { type: "fill", sk: "___ ma zuby.", options: ["Bolia", "Bolí", "Bolím", "Bolíš"], answer: 0 },
        { type: "fill", sk: "___ ma hlava.", options: ["Bolí", "Bolia", "Bolím", "Bolíte"], answer: 0 },
        { type: "say", prompt: { es: "Dices que tienes fiebre:", en: "You say you have a fever:" },
          options: ["Mám horúčku.", "Mám nádchu.", "Bolí ma hrdlo.", "Som alergický."], answer: 0 },
        { type: "meaning", sk: "Užívajte tieto tabletky trikrát denne.",
          options: { es: ["Tome estas pastillas tres veces por día.", "Compre estas pastillas en la farmacia.", "No tome estas pastillas.", "Tome tres pastillas juntas."],
                     en: ["Take these tablets three times a day.", "Buy these tablets at the pharmacy.", "Don't take these tablets.", "Take three tablets together."] }, answer: 0 },
        { type: "listen", sk: "Kde je najbližšia lekáreň?",
          options: { es: ["¿Dónde está la farmacia más cercana?", "¿Dónde está el hospital?", "¿Dónde está el médico?", "¿Cuándo abre la farmacia?"],
                     en: ["Where's the nearest pharmacy?", "Where's the hospital?", "Where's the doctor?", "When does the pharmacy open?"] }, answer: 0 },
        { type: "meaning", sk: "recept",
          options: { es: ["receta (del médico)", "turno", "factura", "jarabe"],
                     en: ["prescription", "appointment", "invoice", "syrup"] }, answer: 0 },
        { type: "say", prompt: { es: "Pides turno con el médico:", en: "You ask for a doctor's appointment:" },
          options: ["Potrebujem sa objednať k lekárovi.", "Potrebujem recept.", "Kde je lekáreň?", "Zavolajte záchranku!"], answer: 0 },
        { type: "fill", sk: "Som alergický ___ penicilín.", options: ["na", "s", "v", "do"], answer: 0 }
      ]
    },

    // ===== Unit 7: shopping and clothes =====
    {
      id: "a2-7",
      level: "A2",
      number: 7,
      title: { sk: "Nakupovanie", es: "De compras", en: "Shopping" },
      intro: {
        es: "Comprar ropa: talles, colores, probadores y devoluciones. Gramática: precios (1 euro, 2 eurá, 5 eur).",
        en: "Buy clothes: sizes, colours, fitting rooms and returns. Grammar: prices (1 euro, 2 eurá, 5 eur)."
      },
      phrases: [
        { sk: "Koľko stoja tieto topánky?", es: "¿Cuánto cuestan estos zapatos?", en: "How much are these shoes?" },
        { sk: "Akú veľkosť nosíte?", es: "¿Qué talle usa?", en: "What size do you wear?" },
        { sk: "Máte to vo väčšej veľkosti?", es: "¿Lo tiene en un talle más grande?", en: "Do you have it in a bigger size?" },
        { sk: "Môžem si to vyskúšať?", es: "¿Me lo puedo probar?", en: "Can I try it on?" },
        { sk: "Kde sú kabínky?", es: "¿Dónde están los probadores?", en: "Where are the fitting rooms?" },
        { sk: "Je mi to malé.", es: "Me queda chico.", en: "It's too small for me." },
        { sk: "Máte to aj v čiernej farbe?", es: "¿Lo tiene también en negro?", en: "Do you have it in black too?" },
        { sk: "Je tu zľava?", es: "¿Hay descuento?", en: "Is there a discount?" },
        { sk: "To je príliš drahé.", es: "Es demasiado caro.", en: "That's too expensive." },
        { sk: "Vezmem si to.", es: "Me lo llevo.", en: "I'll take it." },
        { sk: "Chcel by som to vrátiť.", es: "Quisiera devolverlo. (hombre)", en: "I'd like to return it. (man)" },
        { sk: "Tu je bloček.", es: "Aquí está el ticket.", en: "Here's the receipt." }
      ],
      grammar: {
        title: { sk: "Koľko to stojí?", es: "Precios: 1 euro, 2–4 eurá, 5+ eur", en: "Prices: 1 euro, 2–4 eurá, 5+ eur" },
        rows: [
          { sk: "jedno euro", es: "un euro", en: "one euro" },
          { sk: "dve eurá", es: "dos euros", en: "two euros" },
          { sk: "tri eurá, štyri eurá", es: "tres, cuatro euros", en: "three, four euros" },
          { sk: "päť eur", es: "cinco euros", en: "five euros" },
          { sk: "dvadsať eur", es: "veinte euros", en: "twenty euros" },
          { sk: "sto eur", es: "cien euros", en: "a hundred euros" },
          { sk: "desať eur päťdesiat centov", es: "diez euros con cincuenta", en: "ten euros fifty" }
        ]
      },
      note: {
        es: "La regla vale para todo lo que se cuenta: con 2, 3 y 4 va el nominativo plural (dva lístky); desde 5, el genitivo plural (päť lístkov). Para pedir con cortesía: «Chcel by som…» (hombre) / «Chcela by som…» (mujer).",
        en: "The rule works for everything you count: 2, 3 and 4 take the nominative plural (dva lístky); from 5 on, the genitive plural (päť lístkov). To ask politely: «Chcel by som…» (man) / «Chcela by som…» (woman)."
      },
      exercises: [
        { type: "fill", sk: "Stojí to päť ___.", options: ["eur", "eurá", "euro", "eurách"], answer: 0 },
        { type: "fill", sk: "Káva stojí dve ___.", options: ["eurá", "eur", "euro", "eurom"], answer: 0 },
        { type: "fill", sk: "Máte to vo väčšej ___?", options: ["veľkosti", "veľkosť", "veľkosťou", "veľkostiach"], answer: 0 },
        { type: "say", prompt: { es: "Quieres probarte la prenda:", en: "You want to try it on:" },
          options: ["Môžem si to vyskúšať?", "Vezmem si to.", "Chcel by som to vrátiť.", "Je tu zľava?"], answer: 0 },
        { type: "meaning", sk: "Je mi to malé.",
          options: { es: ["Me queda chico.", "Es muy caro.", "Es mi talle.", "Me gusta mucho."],
                     en: ["It's too small for me.", "It's very expensive.", "It's my size.", "I like it a lot."] }, answer: 0 },
        { type: "listen", sk: "Máte to aj v čiernej farbe?",
          options: { es: ["¿Lo tiene también en negro?", "¿Lo tiene en blanco?", "¿Lo tiene en otro talle?", "¿Tiene algo más barato?"],
                     en: ["Do you have it in black too?", "Do you have it in white?", "Do you have it in another size?", "Do you have anything cheaper?"] }, answer: 0 },
        { type: "say", prompt: { es: "Decides comprarlo:", en: "You decide to buy it:" },
          options: ["Vezmem si to.", "To je príliš drahé.", "Môžem si to vyskúšať?", "Kde sú kabínky?"], answer: 0 },
        { type: "meaning", sk: "Chcel by som to vrátiť.",
          options: { es: ["Quisiera devolverlo.", "Quisiera probármelo.", "Quisiera pagar con tarjeta.", "Quisiera un descuento."],
                     en: ["I'd like to return it.", "I'd like to try it on.", "I'd like to pay by card.", "I'd like a discount."] }, answer: 0 }
      ]
    },

    // ===== Unit 8: free time and plans =====
    {
      id: "a2-8",
      level: "A2",
      number: 8,
      title: { sk: "Voľný čas", es: "Tiempo libre y planes", en: "Free time and plans" },
      intro: {
        es: "Hablar de lo que te gusta, invitar, aceptar o rechazar, y el clima. Gramática: «rád / rada» + verbo y el futuro.",
        en: "Talk about what you like, invite, accept or decline, and the weather. Grammar: «rád / rada» + verb and the future."
      },
      phrases: [
        { sk: "Čo budeš robiť cez víkend?", es: "¿Qué vas a hacer el fin de semana?", en: "What are you doing at the weekend?" },
        { sk: "V sobotu pôjdeme na výlet do Tatier.", es: "El sábado vamos de excursión a los Tatras.", en: "On Saturday we're going on a trip to the Tatras." },
        { sk: "Máš čas v piatok večer?", es: "¿Tienes tiempo el viernes a la noche?", en: "Are you free on Friday evening?" },
        { sk: "Nepôjdeme do kina?", es: "¿Vamos al cine?", en: "Shall we go to the cinema?" },
        { sk: "Rád by som, ale nemôžem.", es: "Me encantaría, pero no puedo. (hombre)", en: "I'd love to, but I can't. (man)" },
        { sk: "Stretneme sa o siedmej pred divadlom.", es: "Nos encontramos a las siete frente al teatro.", en: "Let's meet at seven in front of the theatre." },
        { sk: "Rád hrám futbal.", es: "Me gusta jugar al fútbol. (hombre)", en: "I like playing football. (man)" },
        { sk: "Rada čítam knihy.", es: "Me gusta leer libros. (mujer)", en: "I like reading books. (woman)" },
        { sk: "Aké bude zajtra počasie?", es: "¿Cómo va a estar el tiempo mañana?", en: "What will the weather be like tomorrow?" },
        { sk: "Bude pršať.", es: "Va a llover.", en: "It's going to rain." },
        { sk: "Bude slnečno a teplo.", es: "Va a estar soleado y cálido.", en: "It'll be sunny and warm." },
        { sk: "V zime často sneží.", es: "En invierno nieva a menudo.", en: "It often snows in winter." }
      ],
      grammar: {
        title: { sk: "rád, rada, radi", es: "«Me gusta»: rád / rada / radi + verbo", en: "«I like»: rád / rada / radi + verb" },
        rows: [
          { sk: "Rád plávam.", es: "Me gusta nadar. (hombre)", en: "I like swimming. (man)" },
          { sk: "Rada plávam.", es: "Me gusta nadar. (mujer)", en: "I like swimming. (woman)" },
          { sk: "Radi plávame.", es: "Nos gusta nadar.", en: "We like swimming." },
          { sk: "Nerád vstávam skoro.", es: "No me gusta levantarme temprano.", en: "I don't like getting up early." },
          { sk: "Mám rád čokoládu.", es: "Me gusta el chocolate. (mať rád + acusativo)", en: "I like chocolate. (mať rád + accusative)" },
          { sk: "Páči sa mi tento film.", es: "Me gusta esta película. (páčiť sa)", en: "I like this film. (páčiť sa)" }
        ]
      },
      note: {
        es: "Para actividades: rád / rada + verbo conjugado. Para cosas y personas: «mám rád…» o «páči sa mi…» (si es plural: «páčia sa mi»). Clima en futuro: prší → bude pršať, sneží → bude snežiť, je teplo → bude teplo.",
        en: "For activities: rád / rada + conjugated verb. For things and people: «mám rád…» or «páči sa mi…» (plural: «páčia sa mi»). Weather in the future: prší → bude pršať, sneží → bude snežiť, je teplo → bude teplo."
      },
      exercises: [
        { type: "fill", sk: "Cez víkend ___ na výlet. (my, ísť)", options: ["pôjdeme", "budeme ísť", "pôjdu", "pôjdete"], answer: 0 },
        { type: "fill", sk: "Zajtra bude ___.", options: ["pršať", "prší", "pršalo", "pršia"], answer: 0 },
        { type: "fill", sk: "Moja žena ___ číta knihy.", options: ["rada", "rád", "radi", "rado"], answer: 0 },
        { type: "fill", sk: "___ sa mi tento film.", options: ["Páči", "Páčia", "Mám", "Rád"], answer: 0 },
        { type: "say", prompt: { es: "Rechazas una invitación con amabilidad (hombre):", en: "You politely decline an invitation (man):" },
          options: ["Rád by som, ale nemôžem.", "Áno, rád.", "Nemám rád kino.", "Stretneme sa o siedmej."], answer: 0 },
        { type: "meaning", sk: "Stretneme sa o siedmej pred divadlom.",
          options: { es: ["Nos encontramos a las siete frente al teatro.", "El teatro abre a las siete.", "Vamos al teatro el domingo.", "La obra empieza a las siete."],
                     en: ["Let's meet at seven in front of the theatre.", "The theatre opens at seven.", "We're going to the theatre on Sunday.", "The play starts at seven."] }, answer: 0 },
        { type: "listen", sk: "Bude slnečno a teplo.",
          options: { es: ["Va a estar soleado y cálido.", "Va a llover.", "Va a nevar.", "Va a hacer frío."],
                     en: ["It'll be sunny and warm.", "It's going to rain.", "It's going to snow.", "It'll be cold."] }, answer: 0 },
        { type: "meaning", sk: "Máš čas v piatok večer?",
          options: { es: ["¿Tienes tiempo el viernes a la noche?", "¿Qué hora es?", "¿Trabajas el viernes?", "¿Dónde estuviste el viernes?"],
                     en: ["Are you free on Friday evening?", "What time is it?", "Do you work on Friday?", "Where were you on Friday?"] }, answer: 0 }
      ]
    },

    // ===== Unit 9: offices =====
    {
      id: "a2-9",
      level: "A2",
      number: 9,
      title: { sk: "Na úrade", es: "Trámites", en: "At the office" },
      intro: {
        es: "Policía de extranjería, banco y correo: pedir turno, entender qué documentos llevar y pedir que te repitan. Gramática: pedir con cortesía (chcel by som, mohli by ste).",
        en: "Foreign police, bank and post office: book an appointment, understand which documents to bring and ask people to repeat. Grammar: asking politely (chcel by som, mohli by ste)."
      },
      phrases: [
        { sk: "Kde je cudzinecká polícia?", es: "¿Dónde está la policía de extranjería?", en: "Where is the foreign police?" },
        { sk: "Chcel by som si predĺžiť pobyt.", es: "Quisiera renovar mi permiso de residencia. (hombre)", en: "I'd like to extend my residence permit. (man)" },
        { sk: "Potrebujem sa objednať na termín.", es: "Necesito pedir turno.", en: "I need to book an appointment." },
        { sk: "Aké doklady potrebujem?", es: "¿Qué documentos necesito?", en: "What documents do I need?" },
        { sk: "Tu je môj pas.", es: "Aquí está mi pasaporte.", en: "Here's my passport." },
        { sk: "Vyplňte tento formulár.", es: "Complete este formulario.", en: "Fill in this form." },
        { sk: "Podpíšte sa tu, prosím.", es: "Firme aquí, por favor.", en: "Sign here, please." },
        { sk: "Kde mám zaplatiť poplatok?", es: "¿Dónde tengo que pagar el arancel?", en: "Where do I pay the fee?" },
        { sk: "Kedy bude doklad hotový?", es: "¿Cuándo va a estar listo el documento?", en: "When will the document be ready?" },
        { sk: "Chcel by som si otvoriť účet.", es: "Quisiera abrir una cuenta. (hombre)", en: "I'd like to open an account. (man)" },
        { sk: "Chcem poslať balík do Argentíny.", es: "Quiero enviar un paquete a Argentina.", en: "I want to send a parcel to Argentina." },
        { sk: "Môžete to zopakovať pomalšie?", es: "¿Puede repetirlo más despacio?", en: "Could you repeat that more slowly?" }
      ],
      grammar: {
        title: { sk: "Zdvorilá prosba", es: "Pedir con cortesía: condicional", en: "Asking politely: conditional" },
        rows: [
          { sk: "Chcel by som…", es: "Quisiera… (hombre)", en: "I'd like… (man)" },
          { sk: "Chcela by som…", es: "Quisiera… (mujer)", en: "I'd like… (woman)" },
          { sk: "Mohli by ste mi pomôcť?", es: "¿Podría ayudarme?", en: "Could you help me?" },
          { sk: "Mohli by ste to zopakovať?", es: "¿Podría repetirlo?", en: "Could you repeat that?" },
          { sk: "Potreboval by som…", es: "Necesitaría… (hombre)", en: "I would need… (man)" },
          { sk: "Bolo by možné…?", es: "¿Sería posible…?", en: "Would it be possible…?" }
        ]
      },
      note: {
        es: "El condicional es el pasado + «by» + som / si / sme / ste: chcel by som, chceli by sme. Con «vy» formal se usa el plural: «Mohli by ste…?», aunque hables con una sola persona.",
        en: "The conditional is the past + «by» + som / si / sme / ste: chcel by som, chceli by sme. With formal «vy» use the plural: «Mohli by ste…?», even with one person."
      },
      exercises: [
        { type: "fill", sk: "Chcela ___ som si otvoriť účet.", options: ["by", "bol", "sa", "je"], answer: 0 },
        { type: "fill", sk: "___ by ste mi pomôcť?", options: ["Mohli", "Môžete", "Môžem", "Mohol"], answer: 0 },
        { type: "say", prompt: { es: "Pides que te lo repitan más despacio:", en: "You ask them to repeat it more slowly:" },
          options: ["Môžete to zopakovať pomalšie?", "Môžete to podpísať?", "Kde mám zaplatiť?", "Aké doklady potrebujem?"], answer: 0 },
        { type: "meaning", sk: "Vyplňte tento formulár.",
          options: { es: ["Complete este formulario.", "Firme este formulario.", "Imprima este formulario.", "Traiga este formulario."],
                     en: ["Fill in this form.", "Sign this form.", "Print this form.", "Bring this form."] }, answer: 0 },
        { type: "listen", sk: "Podpíšte sa tu, prosím.",
          options: { es: ["Firme aquí, por favor.", "Siéntese aquí, por favor.", "Pague aquí, por favor.", "Espere aquí, por favor."],
                     en: ["Sign here, please.", "Sit here, please.", "Pay here, please.", "Wait here, please."] }, answer: 0 },
        { type: "meaning", sk: "doklady",
          options: { es: ["documentos", "turnos", "aranceles", "formularios"],
                     en: ["documents", "appointments", "fees", "forms"] }, answer: 0 },
        { type: "say", prompt: { es: "Quieres enviar un paquete a Argentina:", en: "You want to send a parcel to Argentina:" },
          options: ["Chcem poslať balík do Argentíny.", "Chcem si otvoriť účet.", "Chcem predĺžiť pobyt.", "Chcem zaplatiť poplatok."], answer: 0 },
        { type: "fill", sk: "Kde mám zaplatiť ___?", options: ["poplatok", "poplatku", "poplatkom", "poplatkoch"], answer: 0 }
      ]
    }
  ];

  // Added to the A1 units loaded before (data/lessons-a1.js).
  window.AppData.lessons.UNITS = window.AppData.lessons.UNITS.concat(UNITS);
})();
