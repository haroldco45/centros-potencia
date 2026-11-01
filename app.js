/* Centros PotencIA al Día — Vibras Positivas HM
   Vanilla JS. Hora real de Colombia (America/Bogota). ES / EN. */
(() => {
'use strict';
const TZ = 'America/Bogota';
let LANG = (() => { try { return localStorage.getItem('cp_lang') || 'es'; } catch (e) { return 'es'; } })();
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const t = o => (o && typeof o === 'object') ? (o[LANG] || o.es) : o;

/* ---------- UI strings ---------- */
const UI = {
  refresh:{es:'Actualizar',en:'Refresh'},
  nav_hoy:{es:'Hoy',en:'Today'}, nav_cifras:{es:'Cifras',en:'Numbers'}, nav_historia:{es:'La historia',en:'Timeline'},
  nav_tuetano:{es:'Al tuétano',en:'Deep dive'}, nav_versiones:{es:'Versiones',en:'Each side'}, nav_municipios:{es:'Municipios',en:'Towns'},
  nav_videos:{es:'Videos',en:'Videos'},
  vid_t:{es:'En video y en fotos',en:'On video and in photos'},
  vid_sub:{es:'Videos reales de YouTube y fotos de las noticias del caso. El robot los busca solo y los va cambiando.',en:'Real YouTube videos and photos from the case news. The robot finds them on its own and keeps them fresh.'},
  gal_t:{es:'Las fotos del caso',en:'Photos from the case'},
  vid_empty:{es:'El robot está buscando videos y fotos. Vuelva en unos minutos.',en:'The robot is looking for videos and photos. Check back in a few minutes.'},
  p_send:{es:'Enviar a MinTIC por correo',en:'Send to MinTIC by email'}, p_gmail:{es:'Enviar con Gmail',en:'Send with Gmail'},
  p_to:{es:'Se envía a',en:'Goes to'}, p_to2:{es:'(correo oficial de PQRSD de MinTIC), con copia a su correo.',en:'(MinTIC\'s official petitions inbox), with a copy to your email.'},
  p_need:{es:'Escriba su nombre y cédula para enviar la carta.',en:'Enter your name and ID number to send the letter.'},
  nav_accion:{es:'Actúe',en:'Take action'}, nav_fuentes:{es:'Fuentes',en:'Sources'},
  hero_kicker:{es:'Seguimiento ciudadano · Vibras Positivas HM',en:'Citizen watch · Vibras Positivas HM'},
  hero_millones:{es:'millones de pesos',en:'million Colombian pesos'},
  hero_lead:{es:'Prometieron centros de inteligencia artificial en las regiones. Se firmó el contrato, se giró la plata a una fiducia… y hoy no funciona ni uno.',
             en:'They promised artificial-intelligence centers across the regions. The contract was signed, the money went into a trust fund… and today not a single one is open.'},
  hs_75:{es:'centros anunciados',en:'centers announced'}, hs_60:{es:'tras el ajuste',en:'after the cut'},
  hs_0:{es:'funcionando',en:'open today'}, hs_209:{es:'avance de obra',en:'construction progress'},
  clock_firma:{es:'días desde la firma del contrato (13 sep 2024)',en:'days since the contract was signed (Sep 13, 2024)'},
  clock_paro:{es:'días aprox. con las obras paralizadas (desde nov 2025)',en:'approx. days with works halted (since Nov 2025)'},
  clock_dev:{es:'días desde que se exigió la devolución (30 oct 2026)',en:'days since the refund was demanded (Oct 30, 2026)'},
  hoy_t:{es:'Hoy',en:'Today'},
  status_loading:{es:'Buscando noticias en vivo…',en:'Searching live news…'},
  search_ph:{es:'Buscar en las noticias del caso…',en:'Search the case news…'},
  f_all:{es:'Todo',en:'All'}, f_24:{es:'Últimas 24 h',en:'Last 24 h'}, f_7:{es:'Esta semana',en:'This week'},
  news_note:{es:'Las noticias llegan solas: un robot las busca cada 30 minutos y la app hace una búsqueda en vivo cada vez que usted entra. Los titulares se muestran en su idioma original.',
             en:'News arrives on its own: a robot searches every 30 minutes and the app runs a live search every time you open it. Headlines are shown in their original language.'},
  cifras_t:{es:'Las cifras que hay que saberse',en:'The numbers you need to know'},
  prog_t:{es:'¿Cuánto se avanzó? (corte abril 2026, Contraloría)',en:'How much got done? (April 2026, Comptroller)'},
  prog_gen:{es:'Avance general del proyecto (incluye estructuración)',en:'Overall project progress (includes planning)'},
  prog_obra:{es:'Avance de los contratos de obra',en:'Construction contracts progress'},
  prog_func:{es:'Centros funcionando',en:'Centers open'},
  split_t:{es:'¿Dónde está la plata?',en:'Where is the money?'},
  split_a:{es:'desembolsados a Findeter (asistencia técnica), según El Tiempo y MinTIC en abril de 2026',en:'paid to Findeter (technical assistance), per El Tiempo and MinTIC in April 2026'},
  split_b:{es:'el resto: en la fiducia, según el Gobierno anterior y el exministro Lizcano, con rendimientos financieros. El reintegro aún no se ha confirmado públicamente.',en:'the rest: in the trust fund, according to the previous government and ex-minister Lizcano, earning interest. The refund has not been publicly confirmed yet.'},
  split_note:{es:'La diferencia es clave: el Gobierno actual dice que el 100% se giró a una fiducia; los informes de abril dicen que a Findeter solo le pagaron unos $4.056 millones. Ambas cosas pueden ser ciertas a la vez: la plata salió del Ministerio hacia la fiducia, pero casi toda sigue ahí sin gastarse. La pregunta de fondo es por qué no ha vuelto al Tesoro.',
              en:'This distinction matters: the current government says 100% was transferred to a trust fund; April reports say Findeter was only paid about COP 4,056 million. Both can be true: the money left the Ministry for the trust fund, but almost all of it is still there, unspent. The real question is why it hasn\'t gone back to the Treasury.'},
  types_t:{es:'Lo que se prometió: tres tipos de centro',en:'What was promised: three types of center'},
  hist_t:{es:'La historia, paso a paso',en:'The story, step by step'},
  tue_t:{es:'Hasta el tuétano: las preguntas que nadie ha contestado',en:'Down to the bone: the questions nobody has answered'},
  tue_sub:{es:'Lo que dicen las fuentes, dónde se contradicen y qué falta por saber.',en:'What the sources say, where they contradict each other, and what is still unknown.'},
  ver_t:{es:'Las versiones de cada lado',en:'Each side\'s version'},
  ver_sub:{es:'Para que usted saque sus propias conclusiones.',en:'So you can draw your own conclusions.'},
  mun_t:{es:'Municipios que esperaban su centro',en:'Towns that were waiting for their center'},
  mun_sub:{es:'Estos son los que aparecen con nombre propio en anuncios oficiales y prensa. La lista completa de los 60 no se ha publicado de forma clara: es una de las cosas que puede pedir con un derecho de petición.',
           en:'These are the towns named in official announcements and the press. The full list of 60 has not been clearly published — it\'s one of the things you can request with a formal petition.'},
  mun_ph:{es:'Buscar municipio o departamento…',en:'Search town or department…'},
  bc_t:{es:'¿Y nuestra región?',en:'What about our region?'},
  bc_p:{es:'En Córdoba, la Gobernación y MinTIC anunciaron tres centros: Ciénaga de Oro, Buenavista y Tierralta, por $10.000 millones ($9.000 de MinTIC y $1.000 de la Gobernación). No encontramos anuncios públicos de centros en los municipios del Bajo Cauca antioqueño (Caucasia, El Bagre, Cáceres, Nechí, Tarazá, Zaragoza). Si usted sabe de alguno, escríbanos.',
        en:'In Córdoba, the governor\'s office and MinTIC announced three centers: Ciénaga de Oro, Buenavista and Tierralta, for COP 10,000 million (9,000 from MinTIC, 1,000 from the department). We found no public announcements of centers in Antioquia\'s Bajo Cauca towns (Caucasia, El Bagre, Cáceres, Nechí, Tarazá, Zaragoza). If you know of one, write to us.'},
  acc_t:{es:'Actúe: pregunte usted mismo',en:'Take action: ask for yourself'},
  acc_sub:{es:'Cualquier ciudadano puede pedir información al Estado. Llene sus datos y toque "Enviar": se abre su correo con la carta lista, dirigida a MinTIC. Solo le queda darle enviar.',
           en:'Any citizen can request information from the State. Fill in your details and tap "Send": your email opens with the letter ready, addressed to MinTIC. Just hit send. The letter is in Spanish because it must be filed in Spanish.'},
  p_name:{es:'Su nombre completo',en:'Your full name'}, p_id:{es:'Cédula',en:'ID number (cédula)'},
  p_city:{es:'Ciudad o municipio',en:'City or town'}, p_mail:{es:'Correo para la respuesta',en:'Email for the reply'},
  p_copy:{es:'Copiar la carta',en:'Copy the letter'}, p_share:{es:'Compartir la app por WhatsApp',en:'Share the app on WhatsApp'},
  p_note:{es:'Base legal: artículo 23 de la Constitución y Ley 1755 de 2015. La entidad tiene, por regla general, 15 días hábiles para responder; las solicitudes de documentos e información, 10 días hábiles.',
          en:'Legal basis: Article 23 of the Constitution and Law 1755 of 2015. As a rule the agency has 15 business days to answer; requests for documents and information, 10 business days.'},
  src_t:{es:'Fuentes',en:'Sources'},
  src_note:{es:'Esta app es un ejercicio ciudadano independiente. No pertenece al Gobierno ni a ningún partido. Si encuentra un error, avísenos y lo corregimos.',
            en:'This app is an independent citizen project. It does not belong to the government or any party. If you spot an error, tell us and we will fix it.'},
  foot:{es:'Apps ciudadanas para seguirle la pista a la plata pública',en:'Citizen apps that follow the public money'},
  foot_upd:{es:'Datos del caso revisados el',en:'Case data reviewed on'}, foot_news:{es:'Noticias actualizadas',en:'News updated'},
  copied:{es:'Carta copiada. Péguela en la ventanilla de MinTIC.',en:'Letter copied. Paste it into MinTIC\'s service desk.'},
  live_ok:{es:'En vivo: {n} noticias del caso · revisado a las {h}',en:'Live: {n} stories on the case · checked at {h}'},
  live_fail:{es:'Mostrando las noticias del robot · revisado a las {h}',en:'Showing the robot\'s news · checked at {h}'},
  none:{es:'No hay noticias para ese filtro. Pruebe con "Todo".',en:'No stories for that filter. Try "All".'},
  latest:{es:'Lo más reciente',en:'Latest'}, isnew:{es:'Nuevo',en:'New'},
  ago_m:{es:'hace {n} min',en:'{n} min ago'}, ago_h:{es:'hace {n} h',en:'{n} h ago'}, ago_d:{es:'hace {n} días',en:'{n} days ago'},
  updating:{es:'Actualizando…',en:'Updating…'}, pending:{es:'PENDIENTE',en:'PENDING'}
};

/* ---------- Case content ---------- */
const METRICS = [
  {v:'$234.399 M', l:{es:'valor total del proyecto',en:'total project value'}, s:{es:'MinTIC / Contraloría',en:'MinTIC / Comptroller'}},
  {v:'1872/2024', l:{es:'contrato interadministrativo Fondo Único TIC – Findeter',en:'inter-agency contract Fondo Único TIC – Findeter'}, s:{es:'firmado el 13 sep 2024',en:'signed Sep 13, 2024'}},
  {v:'26', l:{es:'departamentos en el plan inicial',en:'departments in the original plan'}, s:{es:'75 centros, luego 60',en:'75 centers, later 60'}},
  {v:'7 M', l:{es:'personas al año que se iban a beneficiar',en:'people per year meant to benefit'}, s:{es:'incluye 1,5 M de estudiantes',en:'incl. 1.5 M students'}},
  {v:'$4.056 M', l:{es:'desembolsados a Findeter',en:'paid to Findeter'}, s:{es:'El Tiempo, mayo 2026',en:'El Tiempo, May 2026'}, c:'rgba(255,77,94,.3)'},
  {v:'$37,4 M', l:{es:'pagos de interventoría autorizados',en:'oversight payments authorized'}, s:{es:'El Tiempo, mayo 2026',en:'El Tiempo, May 2026'}},
  {v:'nov 2025', l:{es:'desde cuándo están paralizadas las obras',en:'works halted since'}, s:{es:'Contraloría',en:'Comptroller'}, c:'rgba(255,77,94,.3)'},
  {v:'0', l:{es:'centros en funcionamiento',en:'centers in operation'}, s:{es:'MinTIC, 30 oct 2026',en:'MinTIC, Oct 30, 2026'}, c:'rgba(255,77,94,.4)'}
];

const TYPES = [
  {k:'A', m2:'1.097 m²', eq:{es:'190 equipos: 135 computadores, 42 tablets, 6 gafas VR, 6 consolas, 1 tótem IA',en:'190 devices: 135 computers, 42 tablets, 6 VR headsets, 6 consoles, 1 AI kiosk'}, $:'$6.600 M'},
  {k:'B', m2:'1.246 m²', eq:{es:'118 equipos: 90 computadores, 21 tablets, 3 gafas VR, 3 consolas, 1 tótem IA',en:'118 devices: 90 computers, 21 tablets, 3 VR headsets, 3 consoles, 1 AI kiosk'}, $:'$4.700 M'},
  {k:'C', m2:'1.007 m²', eq:{es:'76 equipos: 48 computadores, 21 tablets, 3 gafas VR, 3 consolas, 1 tótem IA',en:'76 devices: 48 computers, 21 tablets, 3 VR headsets, 3 consoles, 1 AI kiosk'}, $:'$3.700 M'}
];

const TIMELINE = [
  {d:{es:'19 jun 2024',en:'Jun 19, 2024'}, h:{es:'Arranca el proyecto en el Valle',en:'Project launches in Valle del Cauca'},
   p:{es:'El ministro TIC Mauricio Lizcano presenta Buenaventura, Tuluá, Palmira y Cartago como pioneros "de los 75 que se construirán en 26 departamentos".',en:'ICT minister Mauricio Lizcano presents Buenaventura, Tuluá, Palmira and Cartago as pioneers "of the 75 to be built in 26 departments".'}, w:'MinTIC'},
  {d:{es:'30 ago 2024',en:'Aug 30, 2024'}, h:{es:'Convenio en Risaralda',en:'Agreement in Risaralda'},
   p:{es:'Se firma el convenio para tres centros: Pereira, La Virginia y Quinchía.',en:'Agreement signed for three centers: Pereira, La Virginia and Quinchía.'}, w:'MinTIC'},
  {d:{es:'13 sep 2024',en:'Sep 13, 2024'}, h:{es:'Se firma el contrato 1872 con Findeter',en:'Contract 1872 signed with Findeter'},
   p:{es:'El Fondo Único de TIC y Findeter firman el contrato interadministrativo: Findeter da asistencia técnica para planear, diseñar, construir y dotar los centros. Los $234.399 millones van a una fiducia.',en:'The Fondo Único de TIC and Findeter sign the inter-agency contract: Findeter provides technical assistance to plan, design, build and equip the centers. The COP 234,399 million goes into a trust fund.'}, w:'MinTIC · Findeter', hot:1},
  {d:{es:'fines de 2024',en:'Late 2024'}, h:{es:'Sale el ministro que firmó',en:'The signing minister leaves'},
   p:{es:'Según el propio Lizcano, dejó el Ministerio dos meses después de firmar el convenio, así que no estuvo en la ejecución.',en:'According to Lizcano himself, he left the Ministry two months after signing, so he was not in charge of execution.'}, w:{es:'Versión de Lizcano',en:'Lizcano\'s account'}},
  {d:{es:'2025',en:'2025'}, h:{es:'Primeras alertas de la Contraloría',en:'First warnings from the Comptroller'},
   p:{es:'La Contraloría identifica alertas sobre el programa durante 2025.',en:'The Comptroller flags warnings about the program during 2025.'}, w:{es:'Contraloría',en:'Comptroller'}},
  {d:{es:'nov 2025',en:'Nov 2025'}, h:{es:'Se paraliza todo',en:'Everything stops'},
   p:{es:'Las actividades quedan totalmente suspendidas.',en:'All activities are fully suspended.'}, w:{es:'Contraloría',en:'Comptroller'}, hot:1},
  {d:{es:'20 ene 2026',en:'Jan 20, 2026'}, h:{es:'Seguimiento especial de la Contraloría',en:'Comptroller opens special monitoring'},
   p:{es:'Arranca el seguimiento permanente al contrato 1872 de 2024.',en:'Permanent monitoring of contract 1872/2024 begins.'}, w:{es:'Contraloría',en:'Comptroller'}},
  {d:{es:'28 abr 2026',en:'Apr 28, 2026'}, h:{es:'El propio Gobierno Petro lo cancela',en:'The Petro government itself cancels it'},
   p:{es:'MinTIC, con la ministra Carina Murcia, anuncia que no prorroga el contrato con Findeter, pide a la fiduciaria no hacer más desembolsos y abre la liquidación. Findeter había pedido una prórroga con menos sedes y más plata. Se anuncia que el saldo y sus rendimientos volverán al Fondo Único TIC.',en:'MinTIC, under minister Carina Murcia, announces it will not extend the Findeter contract, tells the trust company to stop payments, and starts liquidation. Findeter had asked for an extension with fewer sites and more money. The balance plus interest is to return to the Fondo Único TIC.'}, w:'MinTIC', hot:1},
  {d:{es:'abr–may 2026',en:'Apr–May 2026'}, h:{es:'Las regiones protestan',en:'Regions push back'},
   p:{es:'En Nariño, el secretario TIC dice que se perderían más de $9.000 millones asignados para Pasto y Tumaco y que seguirá gestionando para no perderlos.',en:'In Nariño, the ICT secretary says more than COP 9,000 million assigned to Pasto and Tumaco would be lost and vows to keep fighting for it.'}, w:'Nariño'},
  {d:{es:'6 may 2026',en:'May 6, 2026'}, h:{es:'Las cifras exactas salen a la luz',en:'The exact figures come out'},
   p:{es:'El Tiempo publica el corte de la Contraloría: 17,71% de avance general, 2,09% en obras, $4.056 millones desembolsados a Findeter y $37,4 millones en interventoría.',en:'El Tiempo publishes the Comptroller\'s figures: 17.71% overall, 2.09% construction, COP 4,056 million paid to Findeter and COP 37.4 million for oversight.'}, w:'El Tiempo'},
  {d:{es:'9 jul 2026',en:'Jul 9, 2026'}, h:{es:'El empalme lo reduce a una línea',en:'Transition report reduces it to one line'},
   p:{es:'En el informe de empalme de MinTIC el proyecto aparece apenas como "seguimiento técnico y operativo", sin mencionar la parálisis.',en:'In MinTIC\'s transition report the project appears only as "technical and operational follow-up", with no mention of the halt.'}, w:'Impacto TIC'},
  {d:{es:'7 ago 2026',en:'Aug 7, 2026'}, h:{es:'Cambio de gobierno',en:'New government'},
   p:{es:'Asume el presidente Abelardo de la Espriella.',en:'President Abelardo de la Espriella takes office.'}, w:{es:'Presidencia',en:'Presidency'}},
  {d:{es:'30 oct 2026',en:'Oct 30, 2026'}, h:{es:'Se exige la devolución inmediata',en:'Immediate refund demanded'},
   p:{es:'La ministra TIC Alexandra Falla, por instrucción del presidente, exige devolver los $234.399 millones y anuncia acciones legales y presupuestales: "No se ha puesto ni un ladrillo en ningún municipio".',en:'ICT minister Alexandra Falla, on the president\'s orders, demands the return of the COP 234,399 million and announces legal and budget actions: "Not a single brick has been laid in any town".'}, w:'MinTIC · Presidencia', hot:1},
  {d:{es:'30–31 oct 2026',en:'Oct 30–31, 2026'}, h:{es:'Lizcano responde: "No se perdió ni un peso"',en:'Lizcano replies: "Not one peso was lost"'},
   p:{es:'El exministro dice que la plata quedó protegida en la fiducia, sin anticipos y con rendimientos; que Findeter debía estructurar, contratar y ejecutar; y que fue un sucesor quien decidió no seguir.',en:'The ex-minister says the money stayed protected in the trust fund, with no advances and earning interest; that Findeter was responsible for structuring, contracting and executing; and that a successor decided not to continue.'}, w:'Mauricio Lizcano'},
  {d:{es:'Hoy',en:'Today'}, h:{es:'Lo que sigue pendiente',en:'Still pending'},
   p:{es:'Confirmar que la plata volvió al Tesoro, con cuánto de rendimientos; publicar la liquidación del contrato; definir responsabilidades; y decir qué pasa con los 60 municipios.',en:'Confirm the money is back in the Treasury and how much interest it earned; publish the contract liquidation; establish responsibilities; and say what happens to the 60 towns.'}, w:{es:'Pendiente',en:'Pending'}, hot:1}
];

const QA = [
  {q:{es:'¿Se perdió la plata?',en:'Was the money lost?'},
   a:{es:['Con lo que se sabe hoy, no hay prueba pública de que se haya perdido. Los informes de abril y mayo de 2026 dicen que a Findeter se le desembolsaron unos $4.056 millones por asistencia técnica y que el resto quedó en la fiducia. El exministro Lizcano asegura que no hubo anticipos y que la plata generó rendimientos.','Lo que sí está probado es que la plata salió del Ministerio hace más de dos años y no produjo ni un solo centro.'],
      en:['Based on what is known today, there is no public proof that it was lost. April–May 2026 reports say Findeter received about COP 4,056 million for technical assistance and the rest stayed in the trust fund. Ex-minister Lizcano says there were no advances and the money earned interest.','What is proven is that the money left the Ministry more than two years ago and produced not a single center.']},
   g:{es:'Falta: un certificado público de la fiduciaria con el saldo exacto, los rendimientos y la fecha del reintegro.',en:'Missing: a public statement from the trust company with the exact balance, the interest earned and the refund date.'}},
  {q:{es:'Si el Gobierno anterior lo canceló en abril, ¿por qué la plata no ha vuelto en seis meses?',en:'If the previous government cancelled it in April, why hasn\'t the money come back in six months?'},
   a:{es:['El 28 de abril de 2026 el MinTIC de Petro anunció que no prorrogaba el contrato, que liquidaría y que el saldo volvería al Fondo Único TIC. Seis meses después, el MinTIC de De la Espriella todavía está "exigiendo" la devolución.','Eso significa que la liquidación y el reintegro siguen sin cerrarse, pasando por dos gobiernos: de abril a agosto con uno y de agosto a octubre con el otro.'],
      en:['On April 28, 2026, Petro\'s MinTIC announced it would not extend the contract, would liquidate it, and the balance would return to the Fondo Único TIC. Six months later, De la Espriella\'s MinTIC is still "demanding" the refund.','That means liquidation and refund are still not closed, spanning two governments: April–August under one and August–October under the other.']},
   g:{es:'Falta: saber en qué paso está la liquidación del contrato 1872 de 2024 y quién la está frenando.',en:'Missing: the current stage of the liquidation of contract 1872/2024 and who is holding it up.'}},
  {q:{es:'¿Por qué no se construyó nada?',en:'Why was nothing built?'},
   a:{es:['La Contraloría señala debilidades en la planeación y estructuración del contrato, problemas para viabilizar los predios y demoras en las licencias de construcción. Infobae reportó auditorías internas con incumplimientos reiterados del contratista y sin alertas tempranas.','En otras palabras: se anunció primero y se planeó después. Varios municipios ni siquiera tenían el lote listo.'],
      en:['The Comptroller points to weak contract planning and structuring, problems validating the land plots, and delays in building permits. Infobae reported internal audits citing repeated contractor breaches and no early warnings.','In other words: it was announced first and planned later. Several towns didn\'t even have the plot ready.']},
   g:{es:'Falta: el informe completo de la Contraloría y la versión de Findeter, que no se ha pronunciado públicamente en esta etapa.',en:'Missing: the full Comptroller report and Findeter\'s side, which has not spoken publicly at this stage.'}},
  {q:{es:'¿19 meses o 25 meses? ¿75, 60 o 142 municipios?',en:'19 or 25 months? 75, 60 or 142 towns?'},
   a:{es:['Las cifras no se contradicen tanto como parece. 19 meses es de septiembre de 2024 al corte de abril de 2026; 25 meses es hasta octubre de 2026. Se anunciaron 75 centros, luego se redujeron a 60. Un análisis de Impacto TIC habla de 60 sedes "en 142 municipios", que parece referirse a la zona de influencia.'],
      en:['The figures don\'t contradict each other as much as it seems. 19 months runs from September 2024 to the April 2026 cut-off; 25 months runs to October 2026. 75 centers were announced, later cut to 60. An Impacto TIC analysis mentions 60 sites "in 142 towns", which seems to refer to their area of influence.']},
   g:{es:'Falta: la lista oficial de los 60 municipios, con el estado de cada lote.',en:'Missing: the official list of the 60 towns, with the status of each plot.'}},
  {q:{es:'¿Quién paga lo que ya gastaron las alcaldías?',en:'Who pays for what towns already spent?'},
   a:{es:['MinTIC reconoce que varias alcaldías adecuaron terrenos, demolieron edificaciones y tramitaron licencias. En La Dorada (Caldas), por ejemplo, se anunció la demolición de un casetón para alistar el predio.','Esa plata salió de presupuestos municipales, y nadie ha dicho si se va a reconocer.'],
      en:['MinTIC acknowledges several towns prepared land, demolished buildings and processed permits. In La Dorada (Caldas), for example, demolition of an old hall was announced to prepare the plot.','That money came out of municipal budgets, and nobody has said whether it will be reimbursed.']},
   g:{es:'Falta: un inventario de lo que invirtió cada municipio y una respuesta sobre si recibirán el centro bajo otro modelo.',en:'Missing: an inventory of what each town spent and an answer on whether they will get a center under another model.'}},
  {q:{es:'¿Hay corrupción?',en:'Is there corruption?'},
   a:{es:['Hasta ahora no hay denuncia pública de fraude ni de desvío de recursos; DPL News lo dijo así en abril. Lo que hay es un proyecto que no se ejecutó y una plata quieta por más de dos años. La ministra Falla dijo que no se trata de un simple retraso, sino de haber usado las ilusiones de las regiones para hacer política.','La comparación que hacen los expertos es con Centros Poblados (2021): proyecto grande de conectividad que se cayó en la ejecución. La diferencia, por lo que se sabe, es que aquí no se perdió un anticipo.'],
      en:['So far there is no public allegation of fraud or diversion of funds; DPL News said as much in April. What exists is a project that was never executed and money sitting idle for over two years. Minister Falla said it is not just a delay but using the regions\' hopes for political gain.','Experts compare it with Centros Poblados (2021), a big connectivity project that collapsed during execution. The difference, as far as is known, is that no advance payment was lost here.']},
   g:{es:'Falta: saber si la Contraloría abrirá un proceso de responsabilidad fiscal, o la Procuraduría una investigación disciplinaria.',en:'Missing: whether the Comptroller will open a fiscal-liability case, or the Inspector General a disciplinary probe.'}}
];

const VERSIONS = [
  {who:{es:'Gobierno actual',en:'Current government'}, h:{es:'MinTIC (ministra Alexandra Falla) y Presidencia',en:'MinTIC (minister Alexandra Falla) and the Presidency'}, c:'#ffd23f',
   li:{es:['La ejecución es nula: ni un centro funcionando ni obras iniciadas.','"Dejaron la plata dormida en un banco" mientras los municipios esperaban.','Por orden del presidente exige la devolución inmediata de los $234.399 millones.','Anuncia acciones legales y presupuestales y busca establecer responsabilidades.'],
       en:['Execution is zero: no center open and no works started.','"They left the money asleep in a bank" while the towns waited.','On the president\'s orders, demands immediate return of the COP 234,399 million.','Announces legal and budget actions and seeks to establish responsibility.']}, s:'Semana, El Universal, La FM — 30 oct 2026'},
  {who:{es:'Exministro que lo firmó',en:'Ex-minister who signed it'}, h:'Mauricio Lizcano', c:'#3d7bff',
   li:{es:['"No se perdió ni un peso": la plata quedó en la fiducia, sin anticipos y con rendimientos.','Salió del Ministerio dos meses después de firmar; no estuvo en la ejecución.','Findeter debía estructurar, contratar, ejecutar y supervisar; MinTIC, acompañar y vigilar.','Dice que un sucesor decidió no continuar y que Petro no estaba de acuerdo con el proyecto (afirmación suya, no verificada).'],
       en:['"Not one peso was lost": the money stayed in the trust fund, with no advances, earning interest.','He left the Ministry two months after signing; he wasn\'t in charge of execution.','Findeter was to structure, contract, execute and supervise; MinTIC was to oversee.','He says a successor decided not to continue and that Petro disagreed with the project (his claim, unverified).']}, s:'La Veintitrés — 31 oct 2026'},
  {who:{es:'Gobierno anterior, abril 2026',en:'Previous government, April 2026'}, h:{es:'MinTIC (ministra Carina Murcia)',en:'MinTIC (minister Carina Murcia)'}, c:'#00d1b2',
   li:{es:['No prorroga el contrato con Findeter por baja ejecución y alta incertidumbre jurídica y financiera.','Pide a la fiduciaria no hacer más desembolsos.','El saldo y sus rendimientos deben volver al Fondo Único TIC.','Promete seguir la meta de formación digital con otro modelo.'],
       en:['Does not extend the Findeter contract due to low execution and high legal and financial uncertainty.','Tells the trust company to stop payments.','Balance plus interest must return to the Fondo Único TIC.','Promises to pursue digital-training goals under another model.']}, s:'Infobae, Semana, DPL News — abr 2026'},
  {who:{es:'Ente de control',en:'Oversight body'}, h:{es:'Contraloría General de la República',en:'Comptroller General'}, c:'#ff8a3d',
   li:{es:['Seguimiento especial desde el 20 de enero de 2026.','Avance de obras: 2,09%. Avance general: 17,71%.','Fallas de planeación, predios y licencias.','Alerta: tener la plata quieta tanto tiempo en una fiducia afecta la eficiencia del gasto público.'],
       en:['Special monitoring since January 20, 2026.','Construction progress: 2.09%. Overall: 17.71%.','Planning, land and permit failures.','Warning: money sitting idle in a trust fund this long undermines efficient public spending.']}, s:'El Tiempo — 6 may 2026'},
  {who:{es:'Las regiones',en:'The regions'}, h:{es:'Gobernaciones y alcaldías',en:'Departments and towns'}, c:'#ff4d5e',
   li:{es:['Nariño: "una nueva frustración"; más de $9.000 millones para Pasto y Tumaco en riesgo.','Alcaldías adecuaron lotes, demolieron y tramitaron licencias con plata propia.','Córdoba había puesto $1.000 millones para sus tres centros.'],
       en:['Nariño: "another frustration"; over COP 9,000 million for Pasto and Tumaco at risk.','Towns prepared plots, demolished buildings and processed permits with their own money.','Córdoba had committed COP 1,000 million for its three centers.']}, s:'Blu Radio, Gobernación de Córdoba'},
  {who:{es:'El ejecutor',en:'The implementer'}, h:'Findeter', c:'#9aa7bd',
   li:{es:['No encontramos un pronunciamiento público de Findeter en esta etapa del caso.','Según Infobae, había pedido una prórroga con menos sedes y más recursos.','Cuando aparezca su versión, la agregamos aquí.'],
       en:['We found no public statement from Findeter at this stage of the case.','According to Infobae, it had asked for an extension with fewer sites and more funds.','When its side appears, we will add it here.']}, s:'—'}
];

const MUN = [
  ['Buenaventura','Valle del Cauca',{es:'Tipo A',en:'Type A'}],['Tuluá','Valle del Cauca',{es:'Tipo C',en:'Type C'}],['Palmira','Valle del Cauca',{es:'Tipo C',en:'Type C'}],['Cartago','Valle del Cauca',{es:'Tipo C',en:'Type C'}],
  ['Pereira','Risaralda',{es:'≈ 2.000 m²',en:'≈ 2,000 m²'}],['La Virginia','Risaralda',''],['Quinchía','Risaralda',''],
  ['Pácora','Caldas',''],['Riosucio','Caldas',''],['Aguadas','Caldas',''],['Victoria','Caldas',''],['Neira','Caldas',''],['La Dorada','Caldas',{es:'Predio viabilizado',en:'Plot approved'}],
  ['Ciénaga de Oro','Córdoba',''],['Buenavista','Córdoba',''],['Tierralta','Córdoba',''],
  ['Riohacha','La Guajira','$4.127 M'],['Pasto','Nariño',''],['Tumaco','Nariño',''],['Armenia','Quindío',''],
  [{es:'Predio de la Gobernación',en:'Department plot'},'Caquetá','']
];

const SOURCES = [
  ['MinTIC — Los Centros PotencIA: una promesa de 234.000 millones que nunca se hizo realidad (30 oct 2026)','https://mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/442339:Los-Centros-PotencIA-una-promesa-de-234-000-millones-de-pesos-que-nunca-se-hizo-realidad'],
  ['Semana — Ministerio TIC exige el reintegro de $234.000 millones (30 oct 2026)','https://www.semana.com/nacion/articulo/ministerio-tic-exige-el-reintegro-de-234000-millones-por-la-paralisis-de-los-centros-potencia/202631/'],
  ['El Universal — MinTIC exige devolver $234.399 millones (30 oct 2026)','https://www.eluniversal.com.co/colombia/2026/10/30/mintic-exige-devolver-234399-millones-del-proyecto-centros-potencia/'],
  ['La FM — Graves denuncias sobre proyecto PotencIA','https://www.lafm.com.co/politica/gobierno-denuncia-incumplimiento-en-e-proyecto-centros-potencia-415761'],
  ['La Veintitrés — "No se perdió ni un peso": Lizcano responde','https://laveintitres.com/no-se-perdio-ni-un-peso-mauricio-lizcano-responde-a-denuncia-sobre-los-centros-potencia/'],
  ['La Veintitrés — "Una promesa rota e incumplida" (Caldas)','https://laveintitres.com/una-promesa-rota-e-incumplida-ministra-tic-denuncia-paralisis-de-los-centros-potencia/'],
  ['Diario La Libertad — Obras paralizadas en 60 municipios (31 oct 2026)','https://diariolalibertad.com/2026/10/31/centros-potencia-234-399-millones-comprometidos-y-obras-paralizadas-en-60-municipios/'],
  ['El Tiempo — Obras con avance de apenas 2,09% bajo la lupa de la Contraloría (6 may 2026)','https://www.eltiempo.com/justicia/investigacion/centros-potencia-en-vilo-obras-con-avance-de-apenas-2-09-bajo-la-lupa-de-la-contraloria-3553482'],
  ['Infobae — MinTIC cancela los Centros PotencIA (29 abr 2026)','https://www.infobae.com/colombia/2026/04/29/mintic-cancela-los-centros-potencia-y-recupera-230-mil-millones-tras-fracaso-del-convenio-con-findeter/'],
  ['Semana — MinTIC cancela el proyecto de los Centros PotencIA (abr 2026)','https://www.semana.com/politica/articulo/mintic-cancela-el-proyecto-de-los-centros-potencia-recupera-230-mil-millones-tras-fracaso-de-findeter/202647/'],
  ['DPL News — ¿Revive el fantasma de Centros Poblados?','https://dplnews.com/mintic-frena-centros-potencia-con-findeter-fantasma-centros-poblados/'],
  ['Blu Radio — Nariño perderá más de $9.000 millones','https://www.bluradio.com/nacion/narino-perdera-mas-de-9-000-millones-para-construccion-de-centros-de-potencia-en-tumaco-y-pasto-rg10'],
  ['Impacto TIC — El "Ministerio del Futuro" (análisis del empalme)','https://impactotic.co/opinion/el-ministerio-del-futuro-fusionar-mintic-y-minciencias/'],
  ['MinTIC — Arrancó el proyecto en el Valle del Cauca (tipos A, B y C)','https://www.mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/382914:Arranco-el-proyecto-Centro-PotencIA-con-cuatro-municipios-en-el-Valle-del-Cauca'],
  ['MinTIC — Respuesta oficial que cita el contrato 1872 del 13 sep 2024','https://webapp.mintic.gov.co/607/articles-399696_notificacion.pdf'],
  ['MinTIC — Risaralda: tres Centros PotencIA (30 ago 2024)','https://mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/388545:Inteligencia-artificial-y-educacion-digital-para-Risaralda-en-firme-tres-Centros-PotencIA-y-2-046-cupos-para-Talento-Tech'],
  ['Gobernación de Córdoba — Tres Centros PotencIA en Córdoba','https://www.cordoba.gov.co/publicaciones/1309/en-cordoba-gobernacion-y-mintic-construiran-tres-centros-potencia-para-aprendizaje-de-inteligencia-artificial/'],
  ['MinTIC — Centro PotencIA de Riohacha','https://www.mintic.gov.co/portal/inicio/Sala-de-prensa/Noticias/400119:Inician-estudios-y-disenos-del-Centro-PotencIA-de-Riohacha-que-marcaran-el-desarrollo-tecnologico-de-la-region'],
  ['Es Caldas — Luz verde al predio de La Dorada','https://escaldas.com/luz-verde-para-el-centro-potencia-la-dorada-se-prepara-para-ser-un-epicentro-de-inteligencia-artificial-en-caldas/']
];

const TICKER = [
  {es:'$234.399 millones girados a una fiducia',en:'COP 234,399 million sent to a trust fund'},
  {es:'0 centros funcionando',en:'0 centers open'},
  {es:'2,09% de avance en obras',en:'2.09% construction progress'},
  {es:'Paralizado desde noviembre de 2025',en:'Halted since November 2025'},
  {es:'Contrato 1872 de 2024 con Findeter',en:'Contract 1872/2024 with Findeter'},
  {es:'60 municipios esperando',en:'60 towns waiting'}
];

/* ---------- Time helpers (Bogotá) ---------- */
const bogotaYMD = (d = new Date()) => new Intl.DateTimeFormat('en-CA', {timeZone: TZ, year:'numeric', month:'2-digit', day:'2-digit'}).format(d);
const daysBetween = (a, b) => Math.round((Date.parse(b + 'T00:00:00Z') - Date.parse(a + 'T00:00:00Z')) / 86400000);
const fmtTime = d => new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', {timeZone: TZ, hour:'numeric', minute:'2-digit'}).format(d);
const fmtDate = d => new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', {timeZone: TZ, day:'numeric', month:'short', year:'numeric'}).format(d);
const ago = ts => {
  const m = Math.max(1, Math.round((Date.now() - ts) / 60000));
  if (m < 60) return UI.ago_m[LANG].replace('{n}', m);
  const h = Math.round(m / 60); if (h < 48) return UI.ago_h[LANG].replace('{n}', h);
  return UI.ago_d[LANG].replace('{n}', Math.round(h / 24));
};

/* ---------- i18n apply ---------- */
function applyLang() {
  document.documentElement.lang = LANG;
  $$('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (UI[k]) el.textContent = UI[k][LANG]; });
  $$('[data-i18n-ph]').forEach(el => { const k = el.dataset.i18nPh; if (UI[k]) el.placeholder = UI[k][LANG]; });
  const spans = $('#btnLang').querySelectorAll('span');
  spans[0].classList.toggle('on', LANG === 'es'); spans[1].classList.toggle('on', LANG === 'en');
  renderStatic(); renderNews(); renderToday(); renderPetition();
}

/* ---------- Static renders ---------- */
function renderStatic() {
  $('#metrics').innerHTML = METRICS.map(m => `<div class="metric reveal" style="--c:${m.c || 'rgba(255,210,63,.25)'}"><b>${m.v}</b><span>${t(m.l)}</span><small>${t(m.s)}</small></div>`).join('');
  $('#types').innerHTML = TYPES.map(x => `<div class="type reveal"><div class="tl">${x.k}</div><ul><li>${x.m2}</li><li>${t(x.eq)}</li><li><b>${x.$}</b> ${LANG === 'es' ? 'de inversión' : 'investment'}</li></ul></div>`).join('');
  $('#timeline').innerHTML = TIMELINE.map(e => `<li class="tl-item${e.hot ? ' hot' : ''}"><div class="tl-date">${t(e.d)}</div><h4>${t(e.h)}</h4><p>${t(e.p)}</p><span class="tl-who">${t(e.w)}</span></li>`).join('');
  $('#qa').innerHTML = QA.map((x, i) => `<details class="q reveal"${i === 0 ? ' open' : ''}><summary><span class="n">${String(i + 1).padStart(2, '0')}</span><span>${t(x.q)}</span></summary><div class="a">${t(x.a).map(p => `<p>${p}</p>`).join('')}<div class="gap"><b>${LANG === 'es' ? 'Lo que falta' : 'What\'s missing'}:</b> ${t(x.g).replace(/^(Falta|Missing): /, '')}</div></div></details>`).join('');
  $('#versions').innerHTML = VERSIONS.map(v => `<div class="ver reveal" style="--c:${v.c}"><div class="who">${t(v.who)}</div><h4>${t(v.h)}</h4><ul>${t(v.li).map(l => `<li>${l}</li>`).join('')}</ul><span class="src">${v.s}</span></div>`).join('');
  renderMun();
  $('#sources').innerHTML = SOURCES.map(([n, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${n}</a><span>${new URL(u).hostname.replace('www.', '')}</span></li>`).join('');
  const items = [...TICKER.map(x => t(x)), ...NEWS.slice(0, 5).map(n => n.title)];
  const html = items.map(x => `<span><b>/</b>${esc(x)}</span>`).join('');
  $('#tickerTrack').innerHTML = html + html;
  observe();
  $$('.bar i').forEach(i => { i.style.width = '0'; requestAnimationFrame(() => setTimeout(() => i.style.width = Math.max(+i.dataset.w, 0) + '%', 150)); });
}
function renderMun() {
  const q = norm($('#qm').value);
  const list = MUN.filter(m => !q || norm(t(m[0]) + ' ' + m[1]).includes(q));
  $('#mun').innerHTML = list.map(m => `<div class="mun"><span class="st">${UI.pending[LANG]}</span><b>${t(m[0])}</b><span>${m[1]}${m[2] ? ' · ' + t(m[2]) : ''}</span></div>`).join('') || `<p class="empty">—</p>`;
}

/* ---------- Counters ---------- */
function countUp(el) {
  const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1800;
  const step = now => {
    const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3), v = end * e;
    el.textContent = pre + (dec ? v.toFixed(dec).replace('.', LANG === 'es' ? ',' : '.') : Math.round(v).toLocaleString(LANG === 'es' ? 'es-CO' : 'en-US')) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function renderToday() {
  const today = bogotaYMD();
  $('#dSince').textContent = daysBetween('2024-09-13', today).toLocaleString();
  $('#dStop').textContent = '≈ ' + daysBetween('2025-11-01', today).toLocaleString();
  $('#dDemand').textContent = Math.max(0, daysBetween('2026-10-30', today)).toLocaleString();
  $('#todayDate').textContent = new Intl.DateTimeFormat(LANG === 'es' ? 'es-CO' : 'en-US', {timeZone: TZ, weekday:'long', day:'numeric', month:'long', year:'numeric'})
    .format(new Date()).replace(/^./, s => s.toUpperCase());
}

/* ---------- News ---------- */
let NEWS = [], FILTER = 'all', ROBOT_UPDATED = null;
const esc = s => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const RELEVANT = { test: s => /PotencIA/.test(s) || (/centros?\s+(de\s+)?potencia/i.test(s) && /mintic|ministerio|\btic\b|findeter|inteligencia artificial|contralor|lizcano|falla|constru|municipio/i.test(s)) };

function mergeNews(list) {
  const seen = new Map(NEWS.map(n => [norm(n.title).slice(0, 70), n]));
  list.forEach(n => {
    if (!n.title || !RELEVANT.test(n.title + ' ' + (n.desc || ''))) return;
    const k = norm(n.title).slice(0, 70);
    const ex = seen.get(k);
    if (!ex) seen.set(k, n); else if (!ex.image && n.image) ex.image = n.image;
  });
  NEWS = Array.from(seen.values()).sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 80);
}

async function loadRobot() {
  try {
    const r = await fetch('data/noticias.json?v=' + Date.now(), {cache: 'no-store'});
    const j = await r.json();
    ROBOT_UPDATED = j.updated ? Date.parse(j.updated) : null;
    mergeNews((j.items || []).map(n => ({...n, ts: Date.parse(n.date)})));
  } catch (e) { /* offline */ }
}

function parseRss(xml, srcFallback) {
  const doc = new DOMParser().parseFromString(xml, 'text/xml');
  return Array.from(doc.querySelectorAll('item')).map(it => {
    const g = s => (it.querySelector(s) || {}).textContent || '';
    let title = g('title'), source = g('source') || srcFallback;
    const m = title.match(/^(.*) - ([^-]+)$/); if (m && !g('source')) { title = m[1]; source = m[2]; }
    else if (m && g('source')) title = m[1];
    const img = it.getElementsByTagName('News:Image')[0] || it.getElementsByTagName('media:content')[0];
    return {title: title.trim(), url: g('link'), source: source.trim(), date: g('pubDate'), ts: Date.parse(g('pubDate')) || 0,
            image: img ? (img.textContent || img.getAttribute('url') || '') : ''};
  });
}

async function viaProxy(url) {
  const proxies = [u => 'https://api.allorigins.win/raw?url=' + encodeURIComponent(u), u => 'https://corsproxy.io/?url=' + encodeURIComponent(u)];
  for (const p of proxies) {
    try {
      const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 9000);
      const r = await fetch(p(url), {signal: ctl.signal}); clearTimeout(to);
      if (r.ok) { const txt = await r.text(); if (txt.includes('<item')) return txt; }
    } catch (e) {}
  }
  return null;
}

async function liveSearch() {
  const q = encodeURIComponent('"Centros PotencIA" OR "Centros Potencia" MinTIC');
  const feeds = [
    ['https://news.google.com/rss/search?q=' + q + '&hl=es-419&gl=CO&ceid=CO:es-419', 'Google News'],
    ['https://www.bing.com/news/search?q=' + encodeURIComponent('Centros PotencIA') + '&format=rss&cc=CO', 'Bing News']
  ];
  const res = await Promise.all(feeds.map(async ([u, s]) => { const x = await viaProxy(u); return x ? parseRss(x, s) : []; }));
  const all = res.flat();
  mergeNews(all);
  return all.length > 0;
}

function card(n, i) {
  const fresh = Date.now() - n.ts < 86400000;
  const img = n.image ? `<div class="nc-img" style="background-image:url('${esc(n.image)}')"></div>`
                      : `<div class="nc-img typo"><span>${esc(n.source || 'Noticia')}</span></div>`;
  return `<a class="nc" href="${esc(n.url)}" target="_blank" rel="noopener" style="animation-delay:${Math.min(i, 12) * 40}ms">${img}
    <div class="nc-body">${fresh ? `<span class="badge new">${UI.isnew[LANG]}</span>` : ''}<h4>${esc(n.title)}</h4>
    <span class="meta"><b>${esc(n.source)}</b> · ${n.ts ? ago(n.ts) : ''}</span></div></a>`;
}

function renderNews() {
  const q = norm($('#q').value);
  const now = Date.now();
  let list = NEWS.filter(n => {
    if (FILTER === '24h' && now - n.ts > 86400000) return false;
    if (FILTER === '7d' && now - n.ts > 7 * 86400000) return false;
    return !q || norm(n.title + ' ' + n.source).includes(q);
  });
  if (!list.length) { $('#lead').innerHTML = ''; $('#news').innerHTML = `<p class="empty">${UI.none[LANG]}</p>`; return; }
  const L = list[0];
  const limg = L.image ? `<div class="ln-img" style="background-image:url('${esc(L.image)}')"></div>` : `<div class="ln-img typo"><span>${esc(L.source)}</span></div>`;
  $('#lead').innerHTML = `<a class="ln" href="${esc(L.url)}" target="_blank" rel="noopener">${limg}<div class="ln-body"><span class="badge">${UI.latest[LANG]}</span><h3>${esc(L.title)}</h3><span class="meta"><b>${esc(L.source)}</b> · ${L.ts ? fmtDate(new Date(L.ts)) + ' · ' + ago(L.ts) : ''}</span></div></a>`;
  $('#news').innerHTML = list.slice(1, 31).map(card).join('');
  if (typeof renderMedia === 'function' && FILTER === 'all' && !q) renderMedia();
  $('#newsUpd').textContent = ROBOT_UPDATED ? fmtDate(new Date(ROBOT_UPDATED)) + ' ' + fmtTime(new Date(ROBOT_UPDATED)) : '—';
}

async function refreshAll(manual) {
  const b = $('#btnRefresh'); b.classList.add('spin'); if (manual) b.textContent = UI.updating[LANG];
  $('#statusTxt').textContent = UI.status_loading[LANG];
  await loadRobot(); renderNews();
  $('#statusTxt').textContent = UI.live_fail[LANG].replace('{h}', fmtTime(new Date())) + ' · ' + UI.status_loading[LANG];
  const ok = await liveSearch(); renderNews(); renderToday();
  const msg = (ok ? UI.live_ok : UI.live_fail)[LANG].replace('{n}', NEWS.length).replace('{h}', fmtTime(new Date()));
  $('#statusTxt').textContent = msg;
  b.classList.remove('spin'); b.textContent = UI.refresh[LANG];
  const items = [...TICKER.map(x => t(x)), ...NEWS.slice(0, 5).map(n => n.title)];
  const html = items.map(x => `<span><b>/</b>${esc(x)}</span>`).join(''); $('#tickerTrack').innerHTML = html + html;
}

/* ---------- Videos, fotos y portada ---------- */
let VIDEOS = [];
async function loadVideos() {
  try { const r = await fetch('data/videos.json?v=' + Date.now(), {cache: 'no-store'}); VIDEOS = (await r.json()).items || []; } catch (e) {}
  renderMedia();
}
function playVideo(id) {
  const v = VIDEOS.find(x => x.id === id) || VIDEOS[0]; if (!v) return;
  $('#vidMain').innerHTML = `<div class="vid-frame"><iframe src="https://www.youtube-nocookie.com/embed/${esc(v.id)}?rel=0" title="${esc(v.title)}" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe></div><p class="vid-cap"><b>${esc(v.title)}</b><span>${esc(v.channel)}${v.when ? ' · ' + esc(v.when) : ''}</span></p>`;
}
function renderMedia() {
  const photos = NEWS.filter(n => n.image).slice(0, 12);
  $('#vidEmpty').hidden = VIDEOS.length > 0 || photos.length > 0;
  if (VIDEOS.length) {
    if (!$('#vidMain').innerHTML) playVideo(VIDEOS[0].id);
    $('#vidList').innerHTML = VIDEOS.slice(0, 12).map(v => `<button class="vth" data-v="${esc(v.id)}"><span class="vth-img" style="background-image:url('https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg')"><i class="play"></i></span><span class="vth-t">${esc(v.title)}</span><span class="vth-c">${esc(v.channel)}</span></button>`).join('');
    $$('.vth').forEach(b => b.onclick = () => { playVideo(b.dataset.v); $('#vidMain').scrollIntoView({behavior: 'smooth', block: 'center'}); });
  }
  $('#gallery').innerHTML = photos.map((n, i) => `<a class="ph${i === 0 ? ' ph-big' : ''}" href="${esc(n.url)}" target="_blank" rel="noopener" style="background-image:url('${esc(n.image)}')"><span>${esc(n.source)}</span></a>`).join('');
  heroSlides(photos);
}
let slideTimer = null, slidesKey = '';
function heroSlides(photos) {
  const box = $('#heroMedia');
  if (box.dataset.own === '1' || !photos.length) return;
  const key = photos.map(p => p.image).join('|'); if (key === slidesKey) return; slidesKey = key;
  box.innerHTML = photos.slice(0, 6).map((p, i) => `<div class="slide${i === 0 ? ' on' : ''}" style="background-image:url('${esc(p.image)}')"></div>`).join('');
  clearInterval(slideTimer); let k = 0;
  slideTimer = setInterval(() => { const s = box.querySelectorAll('.slide'); if (s.length < 2) return; s[k].classList.remove('on'); k = (k + 1) % s.length; s[k].classList.add('on'); }, 5000);
}

/* ---------- Petition ---------- */
function renderPetition() {
  const v = id => $(id).value.trim();
  const city = v('#pCity') || '[Ciudad]';
  const fecha = new Intl.DateTimeFormat('es-CO', {timeZone: TZ, day:'numeric', month:'long', year:'numeric'}).format(new Date());
  $('#petText').textContent =
`${city}, ${fecha}

Señores
MINISTERIO DE TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES
FONDO ÚNICO DE TECNOLOGÍAS DE LA INFORMACIÓN Y LAS COMUNICACIONES
Bogotá D. C.

Asunto: Derecho de petición de información — Proyecto Centros PotencIA, Contrato Interadministrativo 1872 de 2024 (Fondo Único de TIC – Findeter)

Yo, ${v('#pName') || '[Nombre completo]'}, identificado(a) con cédula de ciudadanía n.° ${v('#pId') || '[número]'}, en ejercicio del derecho fundamental de petición (artículo 23 de la Constitución Política y Ley 1755 de 2015), solicito de manera respetuosa la siguiente información:

1. Saldo actual de los recursos del Contrato Interadministrativo 1872 de 2024 que permanecen en la fiducia o patrimonio autónomo, con corte a la fecha de respuesta.
2. Valor de los rendimientos financieros generados por esos recursos desde su desembolso, y a quién pertenecen.
3. Valor total pagado a Findeter y a terceros (contratistas de obra, interventoría, estudios y diseños), con fecha y concepto de cada pago.
4. Estado del proceso de liquidación del contrato anunciado el 28 de abril de 2026: etapa en que se encuentra, fecha estimada de cierre y acta, si existe.
5. Fecha en que se reintegrarán los recursos al Fondo Único de TIC o al Tesoro Nacional, y monto exacto a reintegrar.
6. Lista completa de los municipios priorizados (75 iniciales y 60 ajustados), con el estado de cada predio y licencia.
7. Acciones legales, administrativas o fiscales adelantadas o previstas para recuperar los recursos y establecer responsabilidades.
8. Si los municipios que adecuaron predios o hicieron gastos para recibir los centros recibirán alguna compensación o el centro bajo otro modelo.

Solicito que la respuesta se envíe al correo ${v('#pMail') || '[correo electrónico]'}.

Atentamente,

${v('#pName') || '[Nombre completo]'}
C. C. ${v('#pId') || '[número]'}`;
}


const MINTIC_MAIL = 'minticresponde@mintic.gov.co';
const MAIL_SUBJECT = 'Derecho de petición de información - Centros PotencIA - Contrato 1872 de 2024';
function sendMail(gmail) {
  if (!$('#pName').value.trim() || !$('#pId').value.trim()) { toast(UI.p_need[LANG]); $('#pName').focus(); return false; }
  const body = $('#petText').textContent, cc = $('#pMail').value.trim();
  if (gmail) {
    const u = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + MINTIC_MAIL + (cc ? '&cc=' + encodeURIComponent(cc) : '') + '&su=' + encodeURIComponent(MAIL_SUBJECT) + '&body=' + encodeURIComponent(body);
    window.open(u, '_blank', 'noopener');
  } else {
    location.href = 'mailto:' + MINTIC_MAIL + '?' + (cc ? 'cc=' + encodeURIComponent(cc) + '&' : '') + 'subject=' + encodeURIComponent(MAIL_SUBJECT) + '&body=' + encodeURIComponent(body);
  }
  return true;
}

/* ---------- Hero media (optional real photo/video in /media) ---------- */
function loadHeroMedia() {
  const box = $('#heroMedia');
  fetch('media/hero.mp4', {method: 'HEAD'}).then(r => {
    if (r.ok) { box.dataset.own = '1'; box.innerHTML = '<video autoplay muted loop playsinline src="media/hero.mp4"></video>'; return; }
    const im = new Image(); im.onload = () => { box.dataset.own = '1'; clearInterval(slideTimer); box.innerHTML = ''; box.appendChild(im); }; im.alt = ''; im.src = 'media/hero.jpg';
  }).catch(() => {});
}

/* ---------- Reveal / tabs ---------- */
let io;
function observe() {
  io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .12});
  $$('.reveal:not(.in), .tl-item:not(.in)').forEach(el => io.observe(el));
}
function tabsSpy() {
  const secs = $$('main section[id]');
  const links = $$('#tabs a');
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id));
  }), {rootMargin: '-45% 0px -50% 0px'});
  secs.forEach(s => spy.observe(s));
}
function toast(m) { const el = $('#toast'); el.textContent = m; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); }

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  $$('[data-count]').forEach(countUp);
  loadHeroMedia(); tabsSpy();
  refreshAll(false); loadVideos();
  $('#btnRefresh').onclick = () => { refreshAll(true); loadVideos(); };
  $('#btnLang').onclick = () => { LANG = LANG === 'es' ? 'en' : 'es'; try { localStorage.setItem('cp_lang', LANG); } catch (e) {} applyLang(); $$('[data-count]').forEach(countUp); };
  $('#q').oninput = renderNews;
  $('#qm').oninput = renderMun;
  $$('#filters .chip').forEach(c => c.onclick = () => { $$('#filters .chip').forEach(x => x.classList.remove('on')); c.classList.add('on'); FILTER = c.dataset.f; renderNews(); });
  ['#pName', '#pId', '#pCity', '#pMail'].forEach(id => $(id).oninput = renderPetition);
  $('#btnMail').onclick = e => { e.preventDefault(); sendMail(false); };
  $('#btnGmail').onclick = e => { e.preventDefault(); sendMail(true); };
  $('#btnCopy').onclick = async () => { try { await navigator.clipboard.writeText($('#petText').textContent); } catch (e) { const r = document.createRange(); r.selectNode($('#petText')); getSelection().removeAllRanges(); getSelection().addRange(r); document.execCommand('copy'); } toast(UI.copied[LANG]); };
  $('#btnWa').href = 'https://wa.me/?text=' + encodeURIComponent('Centros PotencIA: $234.399 millones, 60 centros prometidos y ninguno funcionando. Siga el caso día a día: https://centros-potencia.netlify.app');
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { renderToday(); refreshAll(false); } });
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
});
})();
