/*
 * data/vocabulary.js — Vocabulary decks by topic, for the spaced review.
 *
 * What it holds: AppData.vocabulary.DECKS. Each deck has an id, a level
 * ("A1", "A2" or "B1": the level bar it counts for), a title (sk / es / en),
 * an icon and its cards. More decks are added by vocabulary-a1.js,
 * vocabulary-a2.js and vocabulary-b1.js, which push into the same list.
 * Each card has:
 *   sk        -> the Slovak word
 *   es / en   -> its meaning
 *   g         -> grammatical gender of nouns: "m", "f", "n" or "pl"
 *                (plural-only); left out for adjectives
 *   icon      -> an emoji; the app shows the matching OpenMoji drawing
 *                (img/openmoji/<codepoints>.svg, see js/srs.js)
 *   icon2     -> optional second emoji, drawn small in a corner as a hint
 *                (for words with no direct picture: "lacný" = 🪙 + ⬇️)
 *   ex        -> an example sentence { sk, es, en }
 *
 * Conventions: Slovak text is in fields called `sk`, so the quality-check
 * script (herramientas/check_slovak.js) can find it. A card's id is
 * "<deck id>:<word>", so do not rename words once people have studied them
 * (their review history is saved under that id).
 *
 * Depends on: nothing. Used by js/screens-review.js and js/srs.js.
 */

window.AppData = window.AppData || {};

(function () {
  "use strict";

  const DECKS = [
    {
      id: "food", level: "A1", icon: "🍽️",
      title: { sk: "Jedlo a pitie", es: "Comida y bebida", en: "Food and drink" },
      cards: [
        { sk: "chlieb", g: "m", icon: "🍞", es: "pan", en: "bread", ex: { sk: "Kúpim chlieb.", es: "Compraré pan.", en: "I'll buy bread." } },
        { sk: "mlieko", g: "n", icon: "🥛", es: "leche", en: "milk", ex: { sk: "Pijem mlieko.", es: "Tomo leche.", en: "I drink milk." } },
        { sk: "voda", g: "f", icon: "💧", es: "agua", en: "water", ex: { sk: "Prosím si vodu.", es: "Agua, por favor.", en: "Water, please." } },
        { sk: "káva", g: "f", icon: "☕", es: "café", en: "coffee", ex: { sk: "Dáš si kávu?", es: "¿Quieres un café?", en: "Would you like a coffee?" } },
        { sk: "čaj", g: "m", icon: "🍵", es: "té", en: "tea", ex: { sk: "Pijem čaj s citrónom.", es: "Tomo té con limón.", en: "I drink tea with lemon." } },
        { sk: "pivo", g: "n", icon: "🍺", es: "cerveza", en: "beer", ex: { sk: "Jedno pivo, prosím.", es: "Una cerveza, por favor.", en: "One beer, please." } },
        { sk: "víno", g: "n", icon: "🍷", es: "vino", en: "wine", ex: { sk: "Červené víno je dobré.", es: "El vino tinto es bueno.", en: "The red wine is good." } },
        { sk: "syr", g: "m", icon: "🧀", es: "queso", en: "cheese", ex: { sk: "Tento syr je výborný.", es: "Este queso es excelente.", en: "This cheese is excellent." } },
        { sk: "mäso", g: "n", icon: "🥩", es: "carne", en: "meat", ex: { sk: "Nejem mäso.", es: "No como carne.", en: "I don't eat meat." } },
        { sk: "jablko", g: "n", icon: "🍎", es: "manzana", en: "apple", ex: { sk: "Jablko je zdravé.", es: "La manzana es sana.", en: "An apple is healthy." } },
        { sk: "polievka", g: "f", icon: "🍲", es: "sopa", en: "soup", ex: { sk: "Polievka je horúca.", es: "La sopa está caliente.", en: "The soup is hot." } },
        { sk: "raňajky", g: "pl", icon: "🍳", es: "desayuno", en: "breakfast", ex: { sk: "Raňajky sú o siedmej.", es: "El desayuno es a las siete.", en: "Breakfast is at seven." } }
      ]
    },
    {
      id: "transport", level: "A1", icon: "🚋",
      title: { sk: "Doprava", es: "Transporte", en: "Transport" },
      cards: [
        { sk: "električka", g: "f", icon: "🚋", es: "tranvía", en: "tram", ex: { sk: "Idem električkou.", es: "Voy en tranvía.", en: "I'm going by tram." } },
        { sk: "autobus", g: "m", icon: "🚌", es: "autobús", en: "bus", ex: { sk: "Autobus mešká.", es: "El autobús viene con retraso.", en: "The bus is late." } },
        { sk: "vlak", g: "m", icon: "🚆", es: "tren", en: "train", ex: { sk: "Vlak ide do Viedne.", es: "El tren va a Viena.", en: "The train goes to Vienna." } },
        { sk: "auto", g: "n", icon: "🚗", es: "auto", en: "car", ex: { sk: "Nemám auto.", es: "No tengo auto.", en: "I don't have a car." } },
        { sk: "bicykel", g: "m", icon: "🚲", es: "bicicleta", en: "bicycle", ex: { sk: "Chodím do práce na bicykli.", es: "Voy al trabajo en bicicleta.", en: "I cycle to work." } },
        { sk: "lietadlo", g: "n", icon: "✈️", es: "avión", en: "plane", ex: { sk: "Lietadlo mešká.", es: "El avión viene con retraso.", en: "The plane is late." } },
        { sk: "stanica", g: "f", icon: "🚉", es: "estación", en: "station", ex: { sk: "Kde je stanica?", es: "¿Dónde está la estación?", en: "Where is the station?" } },
        { sk: "zastávka", g: "f", icon: "🚏", es: "parada", en: "stop", ex: { sk: "Vystúpim na ďalšej zastávke.", es: "Me bajo en la próxima parada.", en: "I'll get off at the next stop." } },
        { sk: "lístok", g: "m", icon: "🎫", es: "boleto", en: "ticket", ex: { sk: "Kde si môžem kúpiť lístok?", es: "¿Dónde puedo comprar un boleto?", en: "Where can I buy a ticket?" } },
        { sk: "taxík", g: "m", icon: "🚕", es: "taxi", en: "taxi", ex: { sk: "Zavolám taxík.", es: "Voy a pedir un taxi.", en: "I'll call a taxi." } },
        { sk: "letisko", g: "n", icon: "🛫", es: "aeropuerto", en: "airport", ex: { sk: "Idem na letisko.", es: "Voy al aeropuerto.", en: "I'm going to the airport." } },
        { sk: "mapa", g: "f", icon: "🗺️", es: "mapa", en: "map", ex: { sk: "Máš mapu?", es: "¿Tienes un mapa?", en: "Do you have a map?" } }
      ]
    },
    {
      id: "home", level: "A1", icon: "🏠",
      title: { sk: "Bývanie", es: "La casa", en: "Home" },
      cards: [
        { sk: "dom", g: "m", icon: "🏠", es: "casa", en: "house", ex: { sk: "Náš dom je malý.", es: "Nuestra casa es pequeña.", en: "Our house is small." } },
        { sk: "byt", g: "m", icon: "🏢", es: "departamento", en: "flat", ex: { sk: "Hľadám nový byt.", es: "Busco un departamento nuevo.", en: "I'm looking for a new flat." } },
        { sk: "izba", g: "f", icon: "🛋️", es: "habitación", en: "room", ex: { sk: "Moja izba je veľká.", es: "Mi habitación es grande.", en: "My room is big." } },
        { sk: "kuchyňa", g: "f", icon: "🍳", es: "cocina", en: "kitchen", ex: { sk: "Varím v kuchyni.", es: "Cocino en la cocina.", en: "I cook in the kitchen." } },
        { sk: "kúpeľňa", g: "f", icon: "🛁", es: "baño", en: "bathroom", ex: { sk: "Kúpeľňa je vľavo.", es: "El baño está a la izquierda.", en: "The bathroom is on the left." } },
        { sk: "posteľ", g: "f", icon: "🛏️", es: "cama", en: "bed", ex: { sk: "Posteľ je pohodlná.", es: "La cama es cómoda.", en: "The bed is comfortable." } },
        { sk: "stolička", g: "f", icon: "🪑", es: "silla", en: "chair", ex: { sk: "Sadni si na stoličku.", es: "Siéntate en la silla.", en: "Sit on the chair." } },
        { sk: "okno", g: "n", icon: "🪟", es: "ventana", en: "window", ex: { sk: "Otvor okno, prosím.", es: "Abre la ventana, por favor.", en: "Open the window, please." } },
        { sk: "dvere", g: "pl", icon: "🚪", es: "puerta", en: "door", ex: { sk: "Zatvor dvere.", es: "Cierra la puerta.", en: "Close the door." } },
        { sk: "kľúč", g: "m", icon: "🔑", es: "llave", en: "key", ex: { sk: "Nemôžem nájsť kľúč.", es: "No encuentro la llave.", en: "I can't find the key." } },
        { sk: "nájom", g: "m", icon: "💶", es: "alquiler", en: "rent", ex: { sk: "Nájom je vysoký.", es: "El alquiler es alto.", en: "The rent is high." } },
        { sk: "sused", g: "m", icon: "🏘️", es: "vecino", en: "neighbour", ex: { sk: "Môj sused je milý.", es: "Mi vecino es amable.", en: "My neighbour is nice." } }
      ]
    },
    {
      id: "family", level: "A1", icon: "👪",
      title: { sk: "Rodina", es: "Familia", en: "Family" },
      cards: [
        { sk: "rodina", g: "f", icon: "👪", es: "familia", en: "family", ex: { sk: "Mám veľkú rodinu.", es: "Tengo una familia grande.", en: "I have a big family." } },
        { sk: "mama", g: "f", icon: "👩", es: "mamá", en: "mum", ex: { sk: "Moja mama varí dobre.", es: "Mi mamá cocina bien.", en: "My mum cooks well." } },
        { sk: "otec", g: "m", icon: "👨", es: "padre", en: "father", ex: { sk: "Môj otec pracuje v banke.", es: "Mi padre trabaja en un banco.", en: "My father works in a bank." } },
        { sk: "brat", g: "m", icon: "👦", es: "hermano", en: "brother", ex: { sk: "Mám jedného brata.", es: "Tengo un hermano.", en: "I have one brother." } },
        { sk: "sestra", g: "f", icon: "👧", es: "hermana", en: "sister", ex: { sk: "Moja sestra študuje.", es: "Mi hermana estudia.", en: "My sister studies." } },
        { sk: "dieťa", g: "n", icon: "👶", es: "niño, bebé", en: "child, baby", ex: { sk: "Dieťa spí.", es: "El bebé duerme.", en: "The baby is sleeping." } },
        { sk: "manžel", g: "m", icon: "🤵", es: "esposo", en: "husband", ex: { sk: "Jej manžel je doma.", es: "Su esposo está en casa.", en: "Her husband is at home." } },
        { sk: "manželka", g: "f", icon: "👰", es: "esposa", en: "wife", ex: { sk: "Jeho manželka je lekárka.", es: "Su esposa es médica.", en: "His wife is a doctor." } },
        { sk: "priateľ", g: "m", icon: "🧑‍🤝‍🧑", es: "amigo; también novio", en: "friend; also boyfriend", ex: { sk: "Toto je môj priateľ.", es: "Este es mi amigo.", en: "This is my friend." } },
        { sk: "priateľka", g: "f", icon: "💑", es: "amiga; también novia", en: "friend; also girlfriend", ex: { sk: "Moja priateľka je zo Slovenska.", es: "Mi novia es de Eslovaquia.", en: "My girlfriend is from Slovakia." } },
        { sk: "babka", g: "f", icon: "👵", es: "abuela", en: "grandma", ex: { sk: "Babka pečie koláč.", es: "La abuela hornea un pastel.", en: "Grandma is baking a cake." } },
        { sk: "dedko", g: "m", icon: "👴", es: "abuelo", en: "grandpa", ex: { sk: "Dedko býva na dedine.", es: "El abuelo vive en el pueblo.", en: "Grandpa lives in the village." } }
      ]
    },
    {
      id: "work", level: "A2", icon: "💼",
      title: { sk: "Práca", es: "Trabajo", en: "Work" },
      cards: [
        { sk: "práca", g: "f", icon: "💼", es: "trabajo", en: "work", ex: { sk: "Idem do práce.", es: "Voy al trabajo.", en: "I'm going to work." } },
        { sk: "kancelária", g: "f", icon: "🏢", es: "oficina", en: "office", ex: { sk: "Pracujem v kancelárii.", es: "Trabajo en la oficina.", en: "I work in the office." } },
        { sk: "šéf", g: "m", icon: "👔", es: "jefe", en: "boss", ex: { sk: "Môj šéf je na porade.", es: "Mi jefe está en una reunión.", en: "My boss is in a meeting." } },
        { sk: "kolega", g: "m", icon: "🧑‍💼", es: "compañero de trabajo", en: "colleague", ex: { sk: "Môj kolega je z Brna.", es: "Mi compañero es de Brno.", en: "My colleague is from Brno." } },
        { sk: "porada", g: "f", icon: "📅", es: "reunión", en: "meeting", ex: { sk: "Porada začína o deviatej.", es: "La reunión empieza a las nueve.", en: "The meeting starts at nine." } },
        { sk: "počítač", g: "m", icon: "💻", es: "computadora", en: "computer", ex: { sk: "Môj počítač je pomalý.", es: "Mi computadora es lenta.", en: "My computer is slow." } },
        { sk: "správa", g: "f", icon: "✉️", es: "mensaje", en: "message", ex: { sk: "Pošlem ti správu.", es: "Te mando un mensaje.", en: "I'll send you a message." } },
        { sk: "plat", g: "m", icon: "💰", es: "sueldo", en: "salary", ex: { sk: "Plat dostávam na konci mesiaca.", es: "Cobro el sueldo a fin de mes.", en: "I get paid at the end of the month." } },
        { sk: "dovolenka", g: "f", icon: "🏖️", es: "vacaciones", en: "holiday", ex: { sk: "Budúci týždeň mám dovolenku.", es: "La semana que viene estoy de vacaciones.", en: "I'm on holiday next week." } },
        { sk: "telefón", g: "m", icon: "📞", es: "teléfono", en: "phone", ex: { sk: "Kde je môj telefón?", es: "¿Dónde está mi teléfono?", en: "Where is my phone?" } },
        { sk: "projekt", g: "m", icon: "📊", es: "proyecto", en: "project", ex: { sk: "Projekt je hotový.", es: "El proyecto está terminado.", en: "The project is finished." } },
        { sk: "zmluva", g: "f", icon: "📄", es: "contrato", en: "contract", ex: { sk: "Podpíšem zmluvu.", es: "Voy a firmar el contrato.", en: "I'll sign the contract." } }
      ]
    },
    {
      id: "health", level: "A2", icon: "🩺",
      title: { sk: "Zdravie", es: "Salud", en: "Health" },
      cards: [
        { sk: "lekár", g: "m", icon: "🧑‍⚕️", es: "médico", en: "doctor", ex: { sk: "Musím ísť k lekárovi.", es: "Tengo que ir al médico.", en: "I have to go to the doctor." } },
        { sk: "lekáreň", g: "f", icon: "💊", es: "farmacia", en: "pharmacy", ex: { sk: "Kde je najbližšia lekáreň?", es: "¿Dónde está la farmacia más cercana?", en: "Where is the nearest pharmacy?" } },
        { sk: "liek", g: "m", icon: "💉", es: "medicamento", en: "medicine", ex: { sk: "Beriem liek na bolesť hlavy.", es: "Tomo un medicamento para el dolor de cabeza.", en: "I take medicine for a headache." } },
        { sk: "nemocnica", g: "f", icon: "🏥", es: "hospital", en: "hospital", ex: { sk: "Je v nemocnici.", es: "Está en el hospital.", en: "He's in hospital." } },
        { sk: "bolesť", g: "f", icon: "🤕", es: "dolor", en: "pain", ex: { sk: "Mám silnú bolesť.", es: "Tengo un dolor fuerte.", en: "I'm in a lot of pain." } },
        { sk: "hlava", g: "f", icon: "🙆", es: "cabeza", en: "head", ex: { sk: "Bolí ma hlava.", es: "Me duele la cabeza.", en: "I have a headache." } },
        { sk: "zub", g: "m", icon: "🦷", es: "diente", en: "tooth", ex: { sk: "Bolí ma zub.", es: "Me duele un diente.", en: "I have a toothache." } },
        { sk: "zubár", g: "m", icon: "🪥", es: "dentista", en: "dentist", ex: { sk: "Zajtra idem k zubárovi.", es: "Mañana voy al dentista.", en: "Tomorrow I'm going to the dentist." } },
        { sk: "horúčka", g: "f", icon: "🌡️", es: "fiebre", en: "fever", ex: { sk: "Mám horúčku.", es: "Tengo fiebre.", en: "I have a fever." } },
        { sk: "chrípka", g: "f", icon: "🤧", es: "gripe", en: "flu", ex: { sk: "Mám chrípku.", es: "Tengo gripe.", en: "I have the flu." } },
        { sk: "recept", g: "m", icon: "📝", es: "receta", en: "prescription", ex: { sk: "Lekár mi dal recept.", es: "El médico me dio una receta.", en: "The doctor gave me a prescription." } },
        { sk: "sanitka", g: "f", icon: "🚑", es: "ambulancia", en: "ambulance", ex: { sk: "Zavolajte sanitku!", es: "¡Llamen a una ambulancia!", en: "Call an ambulance!" } }
      ]
    },
    {
      id: "shopping", level: "A1", icon: "🛒",
      title: { sk: "Nákupy", es: "Compras", en: "Shopping" },
      cards: [
        { sk: "obchod", g: "m", icon: "🏪", es: "tienda", en: "shop", ex: { sk: "Obchod je zatvorený.", es: "La tienda está cerrada.", en: "The shop is closed." } },
        { sk: "potraviny", g: "pl", icon: "🛒", es: "almacén, súper", en: "grocery shop", ex: { sk: "Idem do potravín.", es: "Voy al almacén.", en: "I'm going to the grocery shop." } },
        { sk: "peniaze", g: "pl", icon: "💵", es: "dinero", en: "money", ex: { sk: "Nemám peniaze.", es: "No tengo dinero.", en: "I don't have any money." } },
        { sk: "cena", g: "f", icon: "🏷️", es: "precio", en: "price", ex: { sk: "Aká je cena?", es: "¿Cuál es el precio?", en: "What's the price?" } },
        { sk: "karta", g: "f", icon: "💳", es: "tarjeta", en: "card", ex: { sk: "Môžem platiť kartou?", es: "¿Puedo pagar con tarjeta?", en: "Can I pay by card?" } },
        { sk: "hotovosť", g: "f", icon: "💶", es: "efectivo", en: "cash", ex: { sk: "Platím v hotovosti.", es: "Pago en efectivo.", en: "I'm paying in cash." } },
        { sk: "taška", g: "f", icon: "🛍️", es: "bolsa", en: "bag", ex: { sk: "Potrebujete tašku?", es: "¿Necesita una bolsa?", en: "Do you need a bag?" } },
        { sk: "účet", g: "m", icon: "🧾", es: "cuenta, ticket", en: "bill, receipt", ex: { sk: "Účet, prosím.", es: "La cuenta, por favor.", en: "The bill, please." } },
        { sk: "drahý", icon: "💎", es: "caro", en: "expensive", ex: { sk: "To je príliš drahé.", es: "Eso es demasiado caro.", en: "That's too expensive." } },
        { sk: "lacný", icon: "🪙", es: "barato", en: "cheap", ex: { sk: "Tento obchod je lacný.", es: "Esta tienda es barata.", en: "This shop is cheap." } },
        { sk: "veľkosť", g: "f", icon: "📏", es: "talla, tamaño", en: "size", ex: { sk: "Akú veľkosť potrebujete?", es: "¿Qué talla necesita?", en: "What size do you need?" } },
        { sk: "zľava", g: "f", icon: "🏷️", es: "descuento", en: "discount", ex: { sk: "Je na to zľava?", es: "¿Tiene descuento?", en: "Is there a discount on it?" } }
      ]
    },
    {
      id: "offices", level: "A2", icon: "🏛️",
      title: { sk: "Úrady", es: "Trámites", en: "Paperwork" },
      cards: [
        { sk: "úrad", g: "m", icon: "🏛️", es: "oficina pública", en: "government office", ex: { sk: "Musím ísť na úrad.", es: "Tengo que ir a una oficina pública.", en: "I have to go to the office." } },
        { sk: "pas", g: "m", icon: "🛂", es: "pasaporte", en: "passport", ex: { sk: "Ukážte mi pas, prosím.", es: "Muéstreme el pasaporte, por favor.", en: "Show me your passport, please." } },
        { sk: "preukaz", g: "m", icon: "🪪", es: "documento, carné", en: "ID card", ex: { sk: "Máte preukaz totožnosti?", es: "¿Tiene un documento de identidad?", en: "Do you have an ID card?" } },
        { sk: "formulár", g: "m", icon: "📋", es: "formulario", en: "form", ex: { sk: "Vyplňte tento formulár.", es: "Complete este formulario.", en: "Fill in this form." } },
        { sk: "podpis", g: "m", icon: "✍️", es: "firma", en: "signature", ex: { sk: "Tu je môj podpis.", es: "Aquí está mi firma.", en: "Here is my signature." } },
        { sk: "adresa", g: "f", icon: "📮", es: "dirección", en: "address", ex: { sk: "Aká je vaša adresa?", es: "¿Cuál es su dirección?", en: "What is your address?" } },
        { sk: "pobyt", g: "m", icon: "🏡", es: "residencia", en: "residence", ex: { sk: "Potrebujem povolenie na pobyt.", es: "Necesito un permiso de residencia.", en: "I need a residence permit." } },
        { sk: "termín", g: "m", icon: "🗓️", es: "turno, cita", en: "appointment", ex: { sk: "Mám termín o desiatej.", es: "Tengo turno a las diez.", en: "I have an appointment at ten." } },
        { sk: "poplatok", g: "m", icon: "🪙", es: "tasa, cargo", en: "fee", ex: { sk: "Poplatok je desať eur.", es: "La tasa es de diez euros.", en: "The fee is ten euros." } },
        { sk: "polícia", g: "f", icon: "👮", es: "policía", en: "police", ex: { sk: "Zavolajte políciu!", es: "¡Llamen a la policía!", en: "Call the police!" } },
        { sk: "pošta", g: "f", icon: "🏤", es: "correo", en: "post office", ex: { sk: "Idem na poštu.", es: "Voy al correo.", en: "I'm going to the post office." } },
        { sk: "banka", g: "f", icon: "🏦", es: "banco", en: "bank", ex: { sk: "Banka je zatvorená.", es: "El banco está cerrado.", en: "The bank is closed." } }
      ]
    },
    {
      id: "free-time", level: "A1", icon: "🎉",
      title: { sk: "Voľný čas", es: "Salir y tiempo libre", en: "Going out" },
      cards: [
        { sk: "kino", g: "n", icon: "🎬", es: "cine", en: "cinema", ex: { sk: "Ideme do kina?", es: "¿Vamos al cine?", en: "Shall we go to the cinema?" } },
        { sk: "divadlo", g: "n", icon: "🎭", es: "teatro", en: "theatre", ex: { sk: "Večer ideme do divadla.", es: "Esta noche vamos al teatro.", en: "We're going to the theatre tonight." } },
        { sk: "reštaurácia", g: "f", icon: "🍝", es: "restaurante", en: "restaurant", ex: { sk: "Poznáš dobrú reštauráciu?", es: "¿Conoces un buen restaurante?", en: "Do you know a good restaurant?" } },
        { sk: "kaviareň", g: "f", icon: "🥐", es: "café (el lugar)", en: "café", ex: { sk: "Stretneme sa v kaviarni.", es: "Nos vemos en el café.", en: "Let's meet at the café." } },
        { sk: "koncert", g: "m", icon: "🎵", es: "concierto", en: "concert", ex: { sk: "Koncert začína o ôsmej.", es: "El concierto empieza a las ocho.", en: "The concert starts at eight." } },
        { sk: "výlet", g: "m", icon: "🥾", es: "excursión", en: "trip", ex: { sk: "Cez víkend ideme na výlet.", es: "El fin de semana vamos de excursión.", en: "We're going on a trip at the weekend." } },
        { sk: "víkend", g: "m", icon: "📆", es: "fin de semana", en: "weekend", ex: { sk: "Čo robíš cez víkend?", es: "¿Qué haces el fin de semana?", en: "What are you doing at the weekend?" } },
        { sk: "stretnutie", g: "n", icon: "🤝", es: "encuentro, reunión", en: "meeting", ex: { sk: "Teším sa na stretnutie.", es: "Tengo ganas de que nos veamos.", en: "I'm looking forward to meeting." } },
        { sk: "rande", g: "n", icon: "💐", es: "cita (romántica)", en: "date", ex: { sk: "Mám rande v piatok.", es: "Tengo una cita el viernes.", en: "I have a date on Friday." } },
        { sk: "park", g: "m", icon: "🌳", es: "parque", en: "park", ex: { sk: "Prechádzame sa v parku.", es: "Paseamos por el parque.", en: "We're walking in the park." } },
        { sk: "šport", g: "m", icon: "⚽", es: "deporte", en: "sport", ex: { sk: "Aký šport máš rád?", es: "¿Qué deporte te gusta?", en: "What sport do you like?" } },
        { sk: "hudba", g: "f", icon: "🎶", es: "música", en: "music", ex: { sk: "Počúvam hudbu.", es: "Escucho música.", en: "I'm listening to music." } }
      ]
    }
  ];

  window.AppData.vocabulary = { DECKS: DECKS };
})();
