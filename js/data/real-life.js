/*
 * data/real-life.js — "Real Slovak": everyday situations in Bratislava.
 *
 * Each situation has:
 *   title / place      -> name of the scene (sk / es / en)
 *   tip                -> a short cultural or practical note (es / en)
 *   dialogue           -> lines { who: "A" or "B", sk, es, en }; the app reads
 *                         them with two different voice pitches
 *   words              -> key words of the scene { sk, es, en }
 *   exercises          -> same types as the lessons: "meaning", "say", "fill", "listen"
 *                         (see data/lessons-a1.js)
 * B is always the learner; A is the other person.
 *
 * Conventions: Slovak text is in fields called `sk` and in `options` of
 * "say" and "fill" exercises, so herramientas/check_slovak.js can check it.
 *
 * Depends on: nothing. Used by js/screens-real.js.
 */

window.AppData = window.AppData || {};

(function () {
  "use strict";

  const SITUATIONS = [
    // ===== 1. Ticket check on the tram =====
    {
      id: "mhd",
      title: { sk: "Kontrola v električke", es: "Control de boletos en el tranvía", en: "Ticket check on the tram" },
      tip: {
        es: "En Bratislava el boleto de papel se marca en la máquina apenas subes; el del celular vale desde que lo compras y por el tiempo que elegiste. Los inspectores (revízori) piden el boleto y pueden multar en el acto a quien no lo tiene.",
        en: "In Bratislava a paper ticket is stamped in the machine as soon as you board; a phone ticket is valid from purchase for the time you chose. Inspectors (revízori) check tickets and can fine you on the spot if you don't have one."
      },
      dialogue: [
        { who: "A", sk: "Dobrý deň, kontrola cestovných lístkov.", es: "Buen día, control de boletos.", en: "Hello, ticket inspection." },
        { who: "B", sk: "Dobrý deň. Nech sa páči, mám lístok v mobile.", es: "Buen día. Aquí tiene, tengo el boleto en el celular.", en: "Hello. Here you are, I have the ticket on my phone." },
        { who: "A", sk: "Ďakujem. Tento lístok vám platí ešte desať minút.", es: "Gracias. Este boleto le vale diez minutos más.", en: "Thank you. This ticket is valid for ten more minutes." },
        { who: "B", sk: "Stihnem to? Idem až na Hlavnú stanicu.", es: "¿Llego? Voy hasta la estación central.", en: "Will I make it? I'm going all the way to the main station." },
        { who: "A", sk: "Hlavná stanica je o tri zastávky. Stihnete to.", es: "La estación central está a tres paradas. Llega.", en: "The main station is three stops away. You'll make it." },
        { who: "B", sk: "A keby som lístok nemal, musel by som platiť pokutu?", es: "¿Y si no tuviera boleto, tendría que pagar una multa?", en: "And if I didn't have a ticket, would I have to pay a fine?" },
        { who: "A", sk: "Áno, pokutu by ste platili na mieste. Ale vy lístok máte, všetko je v poriadku.", es: "Sí, pagaría la multa en el acto. Pero usted tiene boleto, todo está en orden.", en: "Yes, you'd pay the fine on the spot. But you have a ticket, everything's fine." },
        { who: "B", sk: "Ďakujem, dovidenia.", es: "Gracias, adiós.", en: "Thanks, goodbye." }
      ],
      words: [
        { sk: "cestovný lístok", es: "boleto", en: "ticket" },
        { sk: "označiť lístok", es: "marcar el boleto", en: "stamp the ticket" },
        { sk: "revízor", es: "inspector", en: "ticket inspector" },
        { sk: "pokuta", es: "multa", en: "fine" },
        { sk: "zastávka", es: "parada", en: "stop" },
        { sk: "nastúpiť / vystúpiť", es: "subir / bajar", en: "get on / get off" },
        { sk: "na mieste", es: "en el acto", en: "on the spot" }
      ],
      exercises: [
        { type: "meaning", sk: "Tento lístok vám platí ešte desať minút.",
          options: { es: ["Este boleto le vale diez minutos más.", "El boleto cuesta diez euros.", "El tranvía llega en diez minutos.", "Tiene que pagar en diez minutos."],
                     en: ["This ticket is valid for ten more minutes.", "The ticket costs ten euros.", "The tram comes in ten minutes.", "You have to pay within ten minutes."] }, answer: 0 },
        { type: "say", prompt: { es: "El inspector te pide el boleto; se lo das:", en: "The inspector asks for your ticket; you hand it over:" },
          options: ["Nech sa páči.", "Dovidenia.", "Prepáčte, nerozumiem.", "Kde je zastávka?"], answer: 0 },
        { type: "meaning", sk: "pokuta",
          options: { es: ["multa", "boleto", "parada", "inspector"], en: ["fine", "ticket", "stop", "inspector"] }, answer: 0 },
        { type: "listen", sk: "Kontrola cestovných lístkov.",
          options: { es: ["Control de boletos.", "Próxima parada.", "Bajen todos.", "Boletos a la venta."],
                     en: ["Ticket inspection.", "Next stop.", "Everybody off.", "Tickets on sale."] }, answer: 0 },
        { type: "fill", sk: "Hlavná stanica je o tri ___.", options: ["zastávky", "zastávka", "zastávok", "zastávkach"], answer: 0 },
        { type: "say", prompt: { es: "Preguntas en qué parada tienes que bajar:", en: "You ask which stop to get off at:" },
          options: ["Na ktorej zastávke mám vystúpiť?", "Kde si môžem kúpiť lístok?", "Koľko stojí lístok?", "Kedy ide električka?"], answer: 0 }
      ]
    },

    // ===== 2. Lunch menu =====
    {
      id: "obed",
      title: { sk: "Obedové menu", es: "El menú del mediodía", en: "The lunch menu" },
      tip: {
        es: "Muchos restaurantes ofrecen al mediodía un «obedové menu» (o «denné menu»): sopa y plato principal a buen precio, más o menos de 11 a 14 h. La propina no es obligatoria; lo habitual es redondear o dejar cerca de un 10 %.",
        en: "Many restaurants offer an «obedové menu» (or «denné menu») at lunchtime: soup and a main course at a good price, roughly from 11:00 to 14:00. Tipping is not compulsory; people usually round up or leave about 10 %."
      },
      dialogue: [
        { who: "A", sk: "Dobrý deň, máte rezerváciu?", es: "Buen día, ¿tienen reserva?", en: "Hello, do you have a reservation?" },
        { who: "B", sk: "Nemáme. Máte voľný stôl pre dvoch?", es: "No. ¿Tiene una mesa libre para dos?", en: "No. Do you have a free table for two?" },
        { who: "A", sk: "Áno, tamten pri okne. Dáte si obedové menu?", es: "Sí, aquella junto a la ventana. ¿Van a pedir el menú del mediodía?", en: "Yes, that one by the window. Will you have the lunch menu?" },
        { who: "B", sk: "Áno. Čo je dnes v menu?", es: "Sí. ¿Qué hay hoy en el menú?", en: "Yes. What's on the menu today?" },
        { who: "A", sk: "Polievka je fazuľová. Menu jedna je kurací rezeň so zemiakmi a menu dva sú bryndzové halušky.", es: "La sopa es de porotos. El menú uno es milanesa de pollo con papas y el menú dos son ñoquis con queso de oveja.", en: "The soup is bean soup. Menu one is chicken schnitzel with potatoes and menu two is potato dumplings with sheep's cheese." },
        { who: "B", sk: "Ja si dám menu dva a priateľka jednotku. A dve minerálky, prosím.", es: "Yo quiero el menú dos y mi novia el uno. Y dos aguas minerales, por favor.", en: "I'll have menu two and my girlfriend number one. And two mineral waters, please." },
        { who: "A", sk: "Perlivé alebo neperlivé?", es: "¿Con gas o sin gas?", en: "Sparkling or still?" },
        { who: "B", sk: "Neperlivé, prosím.", es: "Sin gas, por favor.", en: "Still, please." },
        { who: "B", sk: "Mohli by sme zaplatiť? Každý zvlášť, prosím.", es: "(Después de comer) ¿Podemos pagar? Cada uno lo suyo, por favor.", en: "(After the meal) Could we pay? Separately, please." },
        { who: "A", sk: "Samozrejme. Platíte kartou?", es: "Por supuesto. ¿Paga con tarjeta?", en: "Of course. Are you paying by card?" },
        { who: "B", sk: "Áno. Dajte to na pätnásť eur, zvyšok je pre vás.", es: "Sí. Cóbreme quince euros, el resto es para usted.", en: "Yes. Make it fifteen euros, keep the rest." }
      ],
      words: [
        { sk: "obedové menu", es: "menú del mediodía", en: "lunch menu" },
        { sk: "polievka", es: "sopa", en: "soup" },
        { sk: "hlavné jedlo", es: "plato principal", en: "main course" },
        { sk: "bryndzové halušky", es: "ñoquis con queso de oveja (plato típico)", en: "dumplings with sheep's cheese (national dish)" },
        { sk: "perlivá / neperlivá voda", es: "agua con / sin gas", en: "sparkling / still water" },
        { sk: "zvlášť / spolu", es: "por separado / todo junto", en: "separately / together" },
        { sk: "prepitné", es: "propina", en: "tip" }
      ],
      exercises: [
        { type: "meaning", sk: "Každý zvlášť, prosím.",
          options: { es: ["Cada uno paga lo suyo, por favor.", "Todo junto, por favor.", "La cuenta, por favor.", "Sin hielo, por favor."],
                     en: ["Separately, please.", "All together, please.", "The bill, please.", "No ice, please."] }, answer: 0 },
        { type: "meaning", sk: "neperlivá voda",
          options: { es: ["agua sin gas", "agua con gas", "agua de la canilla", "agua caliente"], en: ["still water", "sparkling water", "tap water", "hot water"] }, answer: 0 },
        { type: "say", prompt: { es: "Pides una mesa para dos:", en: "You ask for a table for two:" },
          options: ["Máte voľný stôl pre dvoch?", "Máte rezerváciu?", "Platíme spolu.", "Čo je dnes v menu?"], answer: 0 },
        { type: "fill", sk: "Ja si ___ menu dva.", options: ["dám", "dáš", "dá", "dajú"], answer: 0 },
        { type: "listen", sk: "Dajte to na pätnásť eur, zvyšok je pre vás.",
          options: { es: ["Cóbreme quince euros, el resto es para usted.", "Son quince euros, por favor.", "No tengo cambio.", "Quince euros cada uno."],
                     en: ["Make it fifteen euros, keep the rest.", "That's fifteen euros, please.", "I have no change.", "Fifteen euros each."] }, answer: 0 },
        { type: "meaning", sk: "prepitné",
          options: { es: ["propina", "plato del día", "cuenta", "postre"], en: ["tip", "dish of the day", "bill", "dessert"] }, answer: 0 }
      ]
    },

    // ===== 3. Supermarket =====
    {
      id: "nakup",
      title: { sk: "V supermarkete", es: "En el supermercado", en: "At the supermarket" },
      tip: {
        es: "En Eslovaquia las botellas de plástico y las latas tienen depósito (záloha) de 15 centavos. Se devuelven en las máquinas de los supermercados, que entregan un ticket que se descuenta en la caja.",
        en: "In Slovakia plastic bottles and cans carry a 15-cent deposit (záloha). You return them at the machines in supermarkets, which give you a voucher that is deducted at the checkout."
      },
      dialogue: [
        { who: "A", sk: "Dobrý deň. Potrebujete tašku?", es: "Buen día. ¿Necesita bolsa?", en: "Hello. Do you need a bag?" },
        { who: "B", sk: "Nie, ďakujem, mám vlastnú.", es: "No, gracias, tengo la mía.", en: "No, thanks, I have my own." },
        { who: "A", sk: "Máte našu zákaznícku kartu?", es: "¿Tiene nuestra tarjeta de cliente?", en: "Do you have our loyalty card?" },
        { who: "B", sk: "Nemám. Môžem si ju vybaviť?", es: "No. ¿Puedo sacarla?", en: "No. Can I get one?" },
        { who: "A", sk: "Áno, cez aplikáciu, je zadarmo. Spolu to bude dvadsaťtri eur štyridsať.", es: "Sí, con la aplicación, es gratis. En total son veintitrés euros con cuarenta.", en: "Yes, through the app, it's free. That's twenty-three euros forty altogether." },
        { who: "B", sk: "Zaplatím kartou. A kde môžem vrátiť fľaše so zálohou?", es: "Pago con tarjeta. ¿Y dónde puedo devolver las botellas con depósito?", en: "I'll pay by card. And where can I return deposit bottles?" },
        { who: "A", sk: "Automat je pri vchode. Dostanete bloček a odpočítame vám ho pri pokladni.", es: "La máquina está en la entrada. Le da un ticket y se lo descontamos en la caja.", en: "The machine is by the entrance. You get a voucher and we deduct it at the checkout." },
        { who: "B", sk: "Super, ďakujem.", es: "Genial, gracias.", en: "Great, thanks." },
        { who: "A", sk: "Bloček chcete?", es: "¿Quiere el ticket?", en: "Would you like the receipt?" },
        { who: "B", sk: "Áno, prosím. Dovidenia.", es: "Sí, por favor. Adiós.", en: "Yes, please. Goodbye." }
      ],
      words: [
        { sk: "pokladňa", es: "caja", en: "checkout" },
        { sk: "taška", es: "bolsa", en: "bag" },
        { sk: "zákaznícka karta", es: "tarjeta de cliente", en: "loyalty card" },
        { sk: "záloha", es: "depósito (de envases)", en: "deposit" },
        { sk: "automat", es: "máquina", en: "machine" },
        { sk: "bloček", es: "ticket", en: "receipt" },
        { sk: "zľava", es: "descuento", en: "discount" }
      ],
      exercises: [
        { type: "meaning", sk: "Potrebujete tašku?",
          options: { es: ["¿Necesita bolsa?", "¿Tiene tarjeta?", "¿Quiere el ticket?", "¿Paga con tarjeta?"],
                     en: ["Do you need a bag?", "Do you have a card?", "Would you like the receipt?", "Are you paying by card?"] }, answer: 0 },
        { type: "say", prompt: { es: "Dices que tienes tu propia bolsa:", en: "You say you have your own bag:" },
          options: ["Mám vlastnú.", "Nemám kartu.", "Zaplatím kartou.", "Bloček nechcem."], answer: 0 },
        { type: "meaning", sk: "záloha",
          options: { es: ["depósito (de envases)", "descuento", "caja", "ticket"], en: ["deposit", "discount", "checkout", "receipt"] }, answer: 0 },
        { type: "fill", sk: "Spolu to bude dvadsaťtri ___ štyridsať.", options: ["eur", "eurá", "euro", "eurách"], answer: 0 },
        { type: "listen", sk: "Automat je pri vchode.",
          options: { es: ["La máquina está en la entrada.", "La caja está al fondo.", "El cajero no funciona.", "La salida está a la derecha."],
                     en: ["The machine is by the entrance.", "The checkout is at the back.", "The cash machine is broken.", "The exit is on the right."] }, answer: 0 },
        { type: "fill", sk: "Kde môžem vrátiť fľaše so ___?", options: ["zálohou", "záloha", "zálohu", "zálohy"], answer: 0 }
      ]
    },

    // ===== 4. At the GP =====
    {
      id: "lekar",
      title: { sk: "U všeobecného lekára", es: "Con el médico de cabecera", en: "At the GP" },
      tip: {
        es: "En Eslovaquia cada persona se registra con un médico general (všeobecný lekár) y lleva la tarjeta de su seguro médico. Fuera del horario de atención está la guardia (pohotovosť), y para emergencias el 112.",
        en: "In Slovakia everyone registers with a general practitioner (všeobecný lekár) and brings their health insurance card. Out of hours there's the emergency service (pohotovosť), and 112 for emergencies."
      },
      dialogue: [
        { who: "A", sk: "Dobrý deň, čo potrebujete?", es: "Buen día, ¿qué necesita?", en: "Hello, what do you need?" },
        { who: "B", sk: "Dobrý deň. Nedávno som sa presťahoval a chcel by som sa u vás zaregistrovať.", es: "Buen día. Me mudé hace poco y quisiera registrarme con ustedes.", en: "Hello. I've recently moved and I'd like to register with you." },
        { who: "A", sk: "Prijímame nových pacientov. Máte so sebou kartičku poistenca?", es: "Aceptamos pacientes nuevos. ¿Tiene con usted la tarjeta del seguro?", en: "We're taking new patients. Do you have your insurance card with you?" },
        { who: "B", sk: "Áno, tu je. Som poistený vo Všeobecnej zdravotnej poisťovni.", es: "Sí, aquí está. Estoy asegurado en la Všeobecná zdravotná poisťovňa.", en: "Yes, here it is. I'm insured with Všeobecná zdravotná poisťovňa." },
        { who: "A", sk: "Dobre. Vyplňte, prosím, tento formulár. Užívate nejaké lieky?", es: "Bien. Complete este formulario, por favor. ¿Toma algún medicamento?", en: "Fine. Please fill in this form. Do you take any medication?" },
        { who: "B", sk: "Nie, neužívam. Mám len alergiu na peľ.", es: "No. Solo tengo alergia al polen.", en: "No. I'm only allergic to pollen." },
        { who: "A", sk: "Zapíšem si to. Ordinujeme každý pracovný deň od siedmej do jednej.", es: "Lo anoto. Atendemos todos los días hábiles de siete a una.", en: "I'll note it. We see patients every working day from seven to one." },
        { who: "B", sk: "Musím sa objednať vopred?", es: "¿Tengo que pedir turno antes?", en: "Do I have to book in advance?" },
        { who: "A", sk: "Áno, najlepšie telefonicky alebo cez internet.", es: "Sí, mejor por teléfono o por internet.", en: "Yes, preferably by phone or online." }
      ],
      words: [
        { sk: "všeobecný lekár", es: "médico general", en: "GP" },
        { sk: "sestra", es: "enfermera", en: "nurse" },
        { sk: "kartička poistenca", es: "tarjeta del seguro médico", en: "health insurance card" },
        { sk: "zdravotná poisťovňa", es: "compañía de seguro médico", en: "health insurer" },
        { sk: "lieky", es: "medicamentos", en: "medication" },
        { sk: "ordinačné hodiny", es: "horario de atención", en: "surgery hours" },
        { sk: "objednať sa", es: "pedir turno", en: "book an appointment" }
      ],
      exercises: [
        { type: "meaning", sk: "Máte so sebou kartičku poistenca?",
          options: { es: ["¿Tiene con usted la tarjeta del seguro?", "¿Tiene turno?", "¿Tiene la receta?", "¿Tiene fiebre?"],
                     en: ["Do you have your insurance card with you?", "Do you have an appointment?", "Do you have the prescription?", "Do you have a fever?"] }, answer: 0 },
        { type: "say", prompt: { es: "Dices que quieres registrarte como paciente:", en: "You say you want to register as a patient:" },
          options: ["Chcel by som sa u vás zaregistrovať.", "Chcel by som recept.", "Bolí ma hlava.", "Kde je lekáreň?"], answer: 0 },
        { type: "meaning", sk: "Užívate nejaké lieky?",
          options: { es: ["¿Toma algún medicamento?", "¿Le duele algo?", "¿Tiene alergias?", "¿Fuma?"],
                     en: ["Do you take any medication?", "Does anything hurt?", "Do you have allergies?", "Do you smoke?"] }, answer: 0 },
        { type: "fill", sk: "Mám alergiu na ___.", options: ["peľ", "peľu", "peľom", "peli"], answer: 0 },
        { type: "listen", sk: "Ordinujeme každý pracovný deň od siedmej do jednej.",
          options: { es: ["Atendemos todos los días hábiles de siete a una.", "Atendemos solo los lunes.", "Abrimos a las siete de la tarde.", "Hoy no atendemos."],
                     en: ["We see patients every working day from seven to one.", "We only see patients on Mondays.", "We open at seven in the evening.", "We're closed today."] }, answer: 0 },
        { type: "meaning", sk: "objednať sa",
          options: { es: ["pedir turno", "registrarse", "pagar", "cancelar"], en: ["book an appointment", "register", "pay", "cancel"] }, answer: 0 }
      ]
    },

    // ===== 5. Post office =====
    {
      id: "posta",
      title: { sk: "Na pošte", es: "En el correo", en: "At the post office" },
      tip: {
        es: "Si no estás en casa, el cartero deja un aviso (oznámenie) y el paquete se retira en la oficina de correo con un documento. Muchas compras por internet llegan a casilleros automáticos, donde se retiran con un código.",
        en: "If you're not at home, the postman leaves a notice (oznámenie) and you collect the parcel at the post office with ID. Many online orders go to parcel lockers, where you collect them with a code."
      },
      dialogue: [
        { who: "A", sk: "Dobrý deň, prosím.", es: "Buen día, dígame.", en: "Hello, how can I help?" },
        { who: "B", sk: "Dobrý deň. Chcem poslať tento list doporučene do Argentíny.", es: "Buen día. Quiero enviar esta carta certificada a Argentina.", en: "Hello. I want to send this letter by registered post to Argentina." },
        { who: "A", sk: "Dobre. Vyplňte, prosím, podací lístok.", es: "Bien. Complete el formulario de envío, por favor.", en: "Fine. Please fill in the posting slip." },
        { who: "B", sk: "Ako dlho to bude trvať?", es: "¿Cuánto va a tardar?", en: "How long will it take?" },
        { who: "A", sk: "Do Argentíny to bude trvať asi dva až tri týždne.", es: "A Argentina tardará unas dos o tres semanas.", en: "To Argentina it'll take about two to three weeks." },
        { who: "B", sk: "Ešte mám vyzdvihnúť balík. Tu je oznámenie.", es: "También tengo que retirar un paquete. Aquí está el aviso.", en: "I also need to collect a parcel. Here's the notice." },
        { who: "A", sk: "Potrebujem váš doklad totožnosti.", es: "Necesito su documento de identidad.", en: "I need your ID." },
        { who: "B", sk: "Nech sa páči, tu je môj pas.", es: "Aquí tiene, este es mi pasaporte.", en: "Here you are, this is my passport." },
        { who: "A", sk: "Ďakujem. Tu je váš balík. Podpíšte sa, prosím, sem.", es: "Gracias. Aquí está su paquete. Firme aquí, por favor.", en: "Thank you. Here's your parcel. Please sign here." }
      ],
      words: [
        { sk: "doporučený list", es: "carta certificada", en: "registered letter" },
        { sk: "podací lístok", es: "formulario de envío", en: "posting slip" },
        { sk: "do zahraničia", es: "al exterior", en: "abroad" },
        { sk: "vyzdvihnúť balík", es: "retirar un paquete", en: "collect a parcel" },
        { sk: "oznámenie", es: "aviso", en: "notice" },
        { sk: "doklad totožnosti", es: "documento de identidad", en: "ID" },
        { sk: "známka", es: "estampilla", en: "stamp" }
      ],
      exercises: [
        { type: "meaning", sk: "Chcem poslať tento list doporučene.",
          options: { es: ["Quiero enviar esta carta certificada.", "Quiero comprar estampillas.", "Quiero retirar un paquete.", "Quiero enviar un paquete."],
                     en: ["I want to send this letter by registered post.", "I want to buy stamps.", "I want to collect a parcel.", "I want to send a parcel."] }, answer: 0 },
        { type: "say", prompt: { es: "Dices que vienes a retirar un paquete:", en: "You say you've come to collect a parcel:" },
          options: ["Mám vyzdvihnúť balík.", "Chcem poslať balík.", "Kde je schránka?", "Koľko stojí známka?"], answer: 0 },
        { type: "meaning", sk: "oznámenie",
          options: { es: ["aviso", "paquete", "sobre", "dirección"], en: ["notice", "parcel", "envelope", "address"] }, answer: 0 },
        { type: "fill", sk: "Podpíšte ___, prosím, sem.", options: ["sa", "si", "ma", "to"], answer: 0 },
        { type: "listen", sk: "Do Argentíny to bude trvať asi dva až tri týždne.",
          options: { es: ["A Argentina tardará unas dos o tres semanas.", "A Argentina cuesta dos o tres euros.", "Llega en dos o tres días.", "No se puede enviar a Argentina."],
                     en: ["To Argentina it'll take about two to three weeks.", "To Argentina it costs two or three euros.", "It arrives in two or three days.", "It can't be sent to Argentina."] }, answer: 0 },
        { type: "meaning", sk: "doklad totožnosti",
          options: { es: ["documento de identidad", "comprobante de pago", "formulario de envío", "permiso de residencia"],
                     en: ["ID", "proof of payment", "posting slip", "residence permit"] }, answer: 0 }
      ]
    },

    // ===== 6. Hairdresser =====
    {
      id: "kadernik",
      title: { sk: "U kaderníka", es: "En la peluquería", en: "At the hairdresser's" },
      tip: {
        es: "En peluquerías y barberías conviene pedir turno (objednať sa) por teléfono o por internet. «Ste objednaný?» significa «¿Tiene turno?».",
        en: "At hairdressers and barbers it's best to book (objednať sa) by phone or online. «Ste objednaný?» means «Do you have an appointment?»."
      },
      dialogue: [
        { who: "A", sk: "Dobrý deň, ste objednaný?", es: "Buen día, ¿tiene turno?", en: "Hello, do you have an appointment?" },
        { who: "B", sk: "Áno, na tretiu. Gómez.", es: "Sí, a las tres. Gómez.", en: "Yes, at three. Gómez." },
        { who: "A", sk: "Výborne, posaďte sa. Ako vás ostrihám?", es: "Muy bien, siéntese. ¿Cómo le corto?", en: "Great, have a seat. How would you like it cut?" },
        { who: "B", sk: "Len trochu skrátiť. Po bokoch kratšie a hore nechať dlhšie.", es: "Solo un poco. Más corto a los costados y más largo arriba.", en: "Just a little shorter. Shorter on the sides and longer on top." },
        { who: "A", sk: "Strojčekom alebo nožnicami?", es: "¿Con máquina o con tijera?", en: "With clippers or scissors?" },
        { who: "B", sk: "Po bokoch strojčekom, hore nožnicami.", es: "A los costados con máquina, arriba con tijera.", en: "Clippers on the sides, scissors on top." },
        { who: "A", sk: "Mám vám umyť aj vlasy?", es: "¿Le lavo también el pelo?", en: "Shall I wash your hair too?" },
        { who: "B", sk: "Áno, prosím.", es: "Sí, por favor.", en: "Yes, please." },
        { who: "A", sk: "Takto je to v poriadku?", es: "¿Así está bien?", en: "Is it all right like this?" },
        { who: "B", sk: "Áno, je to perfektné. Koľko platím?", es: "Sí, está perfecto. ¿Cuánto le debo?", en: "Yes, it's perfect. How much do I owe you?" }
      ],
      words: [
        { sk: "kaderník / kaderníčka", es: "peluquero / peluquera", en: "hairdresser" },
        { sk: "ostrihať sa", es: "cortarse el pelo", en: "get a haircut" },
        { sk: "skrátiť", es: "acortar", en: "shorten" },
        { sk: "po bokoch / hore", es: "a los costados / arriba", en: "on the sides / on top" },
        { sk: "strojček", es: "máquina de cortar", en: "clippers" },
        { sk: "nožnice", es: "tijeras", en: "scissors" },
        { sk: "umyť vlasy", es: "lavar el pelo", en: "wash hair" }
      ],
      exercises: [
        { type: "meaning", sk: "Ste objednaný?",
          options: { es: ["¿Tiene turno?", "¿Ya pagó?", "¿Qué desea?", "¿Está apurado?"],
                     en: ["Do you have an appointment?", "Have you paid?", "What would you like?", "Are you in a hurry?"] }, answer: 0 },
        { type: "say", prompt: { es: "Pides que corten solo un poco:", en: "You ask for just a little off:" },
          options: ["Len trochu skrátiť.", "Ostrihajte všetko nakrátko.", "Umyť vlasy.", "Je to perfektné."], answer: 0 },
        { type: "meaning", sk: "nožnice",
          options: { es: ["tijeras", "máquina de cortar", "peine", "espejo"], en: ["scissors", "clippers", "comb", "mirror"] }, answer: 0 },
        { type: "fill", sk: "Po ___ kratšie, hore dlhšie.", options: ["bokoch", "boky", "bok", "bokom"], answer: 0 },
        { type: "listen", sk: "Mám vám umyť aj vlasy?",
          options: { es: ["¿Le lavo también el pelo?", "¿Le corto el pelo?", "¿Le seco el pelo?", "¿Quiere un café?"],
                     en: ["Shall I wash your hair too?", "Shall I cut your hair?", "Shall I dry your hair?", "Would you like a coffee?"] }, answer: 0 },
        { type: "fill", sk: "Koľko ___?", options: ["platím", "platíš", "platia", "platiť"], answer: 0 }
      ]
    },

    // ===== 7. Market =====
    {
      id: "trh",
      title: { sk: "Na trhu", es: "En el mercado", en: "At the market" },
      tip: {
        es: "El mercado de la calle Miletičova, en Ružinov, es el más grande de Bratislava: frutas, verduras, carne, flores y comida asiática. Muchos puestos prefieren efectivo. Para preguntar el precio se dice «Za koľko?» (¿a cuánto?).",
        en: "The Miletičova market in Ružinov is the biggest in Bratislava: fruit, vegetables, meat, flowers and Asian food. Many stalls prefer cash. To ask the price people say «Za koľko?» (how much?)."
      },
      dialogue: [
        { who: "A", sk: "Dobrý deň, čo si dáte?", es: "Buen día, ¿qué va a llevar?", en: "Hello, what would you like?" },
        { who: "B", sk: "Za koľko sú tie paradajky?", es: "¿A cuánto están esos tomates?", en: "How much are those tomatoes?" },
        { who: "A", sk: "Tri eurá kilo. Sú domáce, zo Záhoria.", es: "Tres euros el kilo. Son de la zona, de Záhorie.", en: "Three euros a kilo. They're local, from Záhorie." },
        { who: "B", sk: "Môžem jednu ochutnať?", es: "¿Puedo probar uno?", en: "Can I taste one?" },
        { who: "A", sk: "Samozrejme, nech sa páči.", es: "Por supuesto, adelante.", en: "Of course, go ahead." },
        { who: "B", sk: "Sú výborné. Dajte mi pol kila. Máte aj čerstvé vajíčka?", es: "Están riquísimos. Deme medio kilo. ¿Tiene también huevos frescos?", en: "They're delicious. Give me half a kilo. Do you also have fresh eggs?" },
        { who: "A", sk: "Máme. Desať kusov je za tri eurá.", es: "Sí. Diez unidades cuestan tres euros.", en: "Yes. Ten cost three euros." },
        { who: "B", sk: "Tak desať vajíčok, prosím. To je všetko.", es: "Entonces diez huevos, por favor. Es todo.", en: "Ten eggs then, please. That's all." },
        { who: "A", sk: "Spolu štyri eurá päťdesiat. Platíte v hotovosti?", es: "En total cuatro euros con cincuenta. ¿Paga en efectivo?", en: "Four euros fifty altogether. Are you paying cash?" },
        { who: "B", sk: "Áno, tu máte päť eur.", es: "Sí, aquí tiene cinco euros.", en: "Yes, here's five euros." },
        { who: "A", sk: "Päťdesiat centov naspäť. Ďakujem, pekný deň!", es: "Cincuenta centavos de vuelto. ¡Gracias, buen día!", en: "Fifty cents change. Thank you, have a nice day!" }
      ],
      words: [
        { sk: "trh", es: "mercado", en: "market" },
        { sk: "Za koľko?", es: "¿A cuánto?", en: "How much?" },
        { sk: "domáci", es: "local, casero", en: "local, home-grown" },
        { sk: "ochutnať", es: "probar (comida)", en: "taste" },
        { sk: "pol kila", es: "medio kilo", en: "half a kilo" },
        { sk: "kus", es: "unidad, pieza", en: "piece" },
        { sk: "v hotovosti", es: "en efectivo", en: "in cash" },
        { sk: "naspäť", es: "de vuelto", en: "change (back)" }
      ],
      exercises: [
        { type: "meaning", sk: "Za koľko sú tie paradajky?",
          options: { es: ["¿A cuánto están esos tomates?", "¿Cuántos tomates quiere?", "¿Son caseros esos tomates?", "¿Dónde están los tomates?"],
                     en: ["How much are those tomatoes?", "How many tomatoes do you want?", "Are those tomatoes home-grown?", "Where are the tomatoes?"] }, answer: 0 },
        { type: "say", prompt: { es: "Preguntas si puedes probar uno:", en: "You ask if you can taste one:" },
          options: ["Môžem jednu ochutnať?", "Dajte mi pol kila.", "To je všetko.", "Platím kartou."], answer: 0 },
        { type: "fill", sk: "Tak desať ___, prosím.", options: ["vajíčok", "vajíčka", "vajíčko", "vajíčkami"], answer: 0 },
        { type: "listen", sk: "Päťdesiat centov naspäť.",
          options: { es: ["Cincuenta centavos de vuelto.", "Cincuenta centavos el kilo.", "Faltan cincuenta centavos.", "Son cincuenta euros."],
                     en: ["Fifty cents change.", "Fifty cents a kilo.", "You're fifty cents short.", "That's fifty euros."] }, answer: 0 },
        { type: "meaning", sk: "v hotovosti",
          options: { es: ["en efectivo", "con tarjeta", "en cuotas", "gratis"], en: ["in cash", "by card", "in instalments", "for free"] }, answer: 0 },
        { type: "fill", sk: "Dajte mi pol ___.", options: ["kila", "kilo", "kilá", "kíl"], answer: 0 }
      ]
    },

    // ===== 8. With friends (colloquial) =====
    {
      id: "kamarati",
      title: { sk: "S kamarátmi", es: "Con amigos (eslovaco coloquial)", en: "With friends (colloquial Slovak)" },
      tip: {
        es: "Entre amigos se usa mucho «čau» para saludar y despedirse, «jasné» (claro), «fakt?» (¿en serio?), «hej» (sí) y «pohoda» (tranqui). «Maj sa» es una despedida amistosa. Con desconocidos y en el trabajo, mejor «Dobrý deň» y «Dovidenia».",
        en: "Among friends people say «čau» for hi and bye, «jasné» (sure), «fakt?» (really?), «hej» (yeah) and «pohoda» (chill). «Maj sa» is a friendly goodbye. With strangers and at work, stick to «Dobrý deň» and «Dovidenia»."
      },
      dialogue: [
        { who: "A", sk: "Čau! Ako sa máš?", es: "¡Hola! ¿Cómo estás?", en: "Hi! How are you?" },
        { who: "B", sk: "Ide to. Som trochu unavený, mal som ťažký týždeň.", es: "Ahí ando. Estoy un poco cansado, tuve una semana pesada.", en: "Not bad. I'm a bit tired, I had a hard week." },
        { who: "A", sk: "Tak to treba osláviť, že je piatok. Ideme na pivo?", es: "Entonces hay que festejar que es viernes. ¿Vamos por una cerveza?", en: "Then let's celebrate that it's Friday. Shall we go for a beer?" },
        { who: "B", sk: "Jasné. Kedy a kde?", es: "Claro. ¿Cuándo y dónde?", en: "Sure. When and where?" },
        { who: "A", sk: "O siedmej na Obchodnej?", es: "¿A las siete en la calle Obchodná?", en: "Seven o'clock on Obchodná street?" },
        { who: "B", sk: "Dobre. Zoberiem aj Zuzku, nevadí?", es: "Bueno. Llevo también a Zuzka, ¿no hay problema?", en: "OK. I'll bring Zuzka too, is that all right?" },
        { who: "A", sk: "Vôbec nie, čím viac, tým lepšie.", es: "Para nada, cuantos más, mejor.", en: "Not at all, the more the merrier." },
        { who: "B", sk: "Fakt? Super. Tak sa vidíme.", es: "¿En serio? Genial. Entonces nos vemos.", en: "Really? Great. See you then." },
        { who: "A", sk: "Hej, maj sa!", es: "¡Sí, que estés bien!", en: "Yeah, take care!" },
        { who: "B", sk: "Ty sa maj!", es: "¡Igualmente!", en: "You too!" }
      ],
      words: [
        { sk: "čau", es: "hola / chau", en: "hi / bye" },
        { sk: "Ide to.", es: "Ahí ando.", en: "Not bad." },
        { sk: "jasné", es: "claro", en: "sure" },
        { sk: "nevadí", es: "no importa, no hay problema", en: "never mind, no problem" },
        { sk: "fakt?", es: "¿en serio?", en: "really?" },
        { sk: "hej", es: "sí (coloquial)", en: "yeah" },
        { sk: "pohoda", es: "tranqui, todo bien", en: "chill, all good" },
        { sk: "Maj sa!", es: "¡Que estés bien! (despedida)", en: "Take care! (goodbye)" }
      ],
      exercises: [
        { type: "meaning", sk: "Ide to.",
          options: { es: ["Ahí ando (ni bien ni mal).", "Ya me voy.", "Ya viene.", "No funciona."],
                     en: ["Not bad (so-so).", "I'm leaving.", "It's coming.", "It doesn't work."] }, answer: 0 },
        { type: "meaning", sk: "Nevadí.",
          options: { es: ["No importa.", "No sé.", "No quiero.", "No funciona."], en: ["Never mind.", "I don't know.", "I don't want to.", "It doesn't work."] }, answer: 0 },
        { type: "say", prompt: { es: "Aceptas la invitación de un amigo:", en: "You accept a friend's invitation:" },
          options: ["Jasné!", "Dovidenia.", "Prepáčte.", "Dobrý deň."], answer: 0 },
        { type: "listen", sk: "Čím viac, tým lepšie.",
          options: { es: ["Cuantos más, mejor.", "Más tarde, mejor.", "Mejor mañana.", "Es demasiado."],
                     en: ["The more the merrier.", "Later is better.", "Better tomorrow.", "It's too much."] }, answer: 0 },
        { type: "meaning", sk: "Maj sa!",
          options: { es: ["¡Que estés bien! (despedida)", "¡Buen provecho!", "¡Salud!", "¡Feliz cumpleaños!"],
                     en: ["Take care! (goodbye)", "Enjoy your meal!", "Cheers!", "Happy birthday!"] }, answer: 0 },
        { type: "fill", sk: "Ideme na ___?", options: ["pivo", "piva", "pive", "pivom"], answer: 0 }
      ]
    }
  ];

  window.AppData.realLife = { SITUATIONS: SITUATIONS };
})();
