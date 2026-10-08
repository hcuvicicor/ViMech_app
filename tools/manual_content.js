// Construye el manual dentro de la propia app (usa sus datos y funciones). Se inyecta desde manual_build.js.
window.buildManual = function (lang) {
  const T = (es, en) => (lang === 'es' ? es : en);
  const SH = n => `shots/${lang}/${n}.png`;
  const fig = (n, cap, cls) => `<figure class="mf ${cls || ''}"><img src="${SH(n)}" alt=""><figcaption>${esc(cap)}</figcaption></figure>`;
  const url = 'https://hcuvicicor.github.io/ViMech_app/';
  const today = new Date().toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
  const nModels = valvesData.reduce((a, b) => a + allSubs(b).length, 0);
  const H = [];  // índice
  let secN = 0;
  const sec = (title, id) => { secN++; H.push([secN, title, id]); return `<h1 class="ms" id="${id}"><span>${secN}</span>${esc(title)}</h1>`; };
  const p = s => `<p>${s}</p>`;
  const li = arr => `<ul>${arr.map(x => `<li>${x}</li>`).join('')}</ul>`;
  const b = s => `<b>${esc(s)}</b>`;

  // ---------- 1. Introducción ----------
  let intro = sec(T('Introducción', 'Introduction'), 'intro')
    + p(T(`<b>ViMech</b> es una aplicación web gratuita, desarrollada por el ICICOR (Instituto de Ciencias del Corazón, Hospital Clínico Universitario de Valladolid), que reúne en un único lugar la identificación fluoroscópica, el diseño, las dimensiones y el tamaño de TAVI de las válvulas cardíacas mecánicas bidisco, como referencia para los procedimientos <i>valve-in-mechanical</i> (TAVI dentro de una prótesis mecánica).`,
      `<b>ViMech</b> is a free web application developed by ICICOR (Instituto de Ciencias del Corazón, Hospital Clínico Universitario de Valladolid). It brings together the fluoroscopic identification, design, dimensions and TAVI sizing of bileaflet mechanical heart valves, as a reference for <i>valve-in-mechanical</i> procedures (TAVI inside a mechanical prosthesis).`))
    + p(T(`Este manual contiene la guía completa de uso de cada función, el catálogo íntegro de las ${valvesData.length} marcas y ${nModels} modelos con sus fotografías, dimensiones, tablas de TAVI y fuentes, y la información de licencia, derechos y créditos.`,
      `This manual contains the complete guide to every function, the full catalogue of the ${valvesData.length} brands and ${nModels} models with their photographs, dimensions, TAVI tables and sources, and the licence, rights and credits information.`))
    + `<div class="mbox warn">${t('disclaimer_content')}</div>`
    + `<h2>${T('Acceso, instalación y uso sin conexión', 'Access, installation and offline use')}</h2>`
    + li([T(`Dirección: <b>${url}</b> (también mediante el código QR de la portada).`, `Address: <b>${url}</b> (also through the QR code on the cover).`),
      T('Funciona en móvil, tableta y ordenador, en cualquier navegador actual. No requiere registro ni recoge datos de pacientes.', 'It works on phone, tablet and computer, in any current browser. It requires no registration and collects no patient data.'),
      T('Se puede instalar como app: en Android/Chrome, menú ⋮ → «Instalar aplicación»; en iPhone/Safari, Compartir → «Añadir a pantalla de inicio».', 'It can be installed as an app: on Android/Chrome, menu ⋮ → “Install app”; on iPhone/Safari, Share → “Add to Home Screen”.'),
      T('Una vez abierta, sigue funcionando sin conexión y se actualiza sola cuando hay una versión nueva.', 'Once opened, it keeps working offline and updates itself when a new version is available.'),
      T('Idiomas: español, inglés, portugués, francés e italiano (Más → Idioma). Temas: oscuro (por defecto), gris, aurora, claro y automático (Más → Tema).', 'Languages: Spanish, English, Portuguese, French and Italian (More → Language). Themes: dark (default), grey, aurora, light and automatic (More → Theme).')]);

  // ---------- 2. Guía de funciones ----------
  const G = [];
  G.push(sec(T('Guía de funciones', 'Function guide'), 'guide'));
  const fn = (title, body, figs) => `<section class="fn"><h2>${esc(title)}</h2><div class="fn-g"><div class="fn-t">${body}</div><div class="fn-f">${figs || ''}</div></div></section>`;
  G.push(fn(T('Pantalla principal y catálogo', 'Home screen and catalogue'),
    p(T('Al abrir la app se ve el catálogo de marcas. Cada tarjeta indica el fabricante, las posiciones disponibles (aórtica/mitral), el rango de tallas y el porcentaje de valores procedentes de fuente oficial.', 'The app opens on the catalogue of brands. Each card shows the manufacturer, the available positions (aortic/mitral), the size range and the percentage of values from an official source.'))
    + li([T('<b>ⓘ</b> muestra la descripción de la app.', '<b>ⓘ</b> shows the app description.'), T('<b>☰ Cómo usarla</b> despliega los 5 pasos del flujo de trabajo, el enlace a la guía de planificación y el caso de ejemplo guiado.', '<b>☰ How to use it</b> opens the 5 workflow steps, the link to the planning guide and the guided demo case.'), T('<b>🔍</b> abre el buscador por marca, modelo o código de catálogo.', '<b>🔍</b> opens the search by brand, model or catalogue code.'), T('Los filtros <b>Todas / Aórtica / Mitral</b> limitan el catálogo a una posición.', 'The <b>All / Aortic / Mitral</b> filters limit the catalogue to one position.'), T('Barra inferior: Válvulas, Fluoro, Estimar ViV y Más (menú).', 'Bottom bar: Valves, Fluoro, ViV estimate and More (menu).')]),
    fig('home', T('Catálogo', 'Catalogue')) + fig('home_how', T('Cómo usarla', 'How to use it'))));
  G.push(fn(T('Ficha de la válvula', 'Valve sheet'),
    p(T('Cada marca tiene una ficha con un selector de posición (aórtica/mitral) y de modelo. La ficha reúne:', 'Each brand has a sheet with a position selector (aortic/mitral) and a model selector. It contains:'))
    + li([T('Imágenes y diseño (se amplían con un toque; se puede hacer zoom con dos dedos).', 'Images and design (tap to enlarge; pinch to zoom).'), T('<b>Elige una talla</b>: al tocar una talla aparecen sus medidas clave (DI, TAD, GOA, EOA, alturas), el esquema de dimensiones a escala y las tallas de TAVI sugeridas para cada dispositivo. Los valores en ámbar con ⚠ indican «Caution».', '<b>Choose a size</b>: tapping a size shows its key dimensions (ID, TAD, GOA, EOA, heights), the dimension schematic to scale and the suggested TAVI sizes for each device. Amber values with ⚠ mean “Caution”.'), T('Botones <b>Simular ViV</b> y <b>⇄ Comparar</b>.', '<b>Simulate ViV</b> and <b>⇄ Compare</b> buttons.'), T('Tabla completa de especificaciones técnicas; tocar una fila abre esa talla.', 'Full technical specification table; tap a row to open that size.'), T('Identificación fluoroscópica, posicionamiento y despliegue, y fuentes de cada dato con su código de color: <span class="sw off"></span> fuente oficial, <span class="sw lit"></span> no oficial (literatura, distribuidores), <span class="sw own"></span> datos propios del hospital.', 'Fluoroscopic identification, positioning and deployment, and the source of every value with its colour code: <span class="sw off"></span> official source, <span class="sw lit"></span> unofficial (literature, distributors), <span class="sw own"></span> hospital own data.'), T('<b>Contacto del fabricante</b> (teléfono, correo, dirección y web públicos) y <b>Comunicar un error</b> (abre un correo con los datos de la ficha).', '<b>Manufacturer contact</b> (public phone, email, address and website) and <b>Report an error</b> (opens an email with the sheet details).')]),
    fig('detail', T('Cabecera de la ficha', 'Sheet header')) + fig('sizecard', T('Talla seleccionada', 'Selected size')) + fig('dims', T('Esquema de dimensiones', 'Dimension schematic')) + fig('specs', T('Tabla de especificaciones', 'Specification table')) + fig('maker', T('Contacto del fabricante', 'Manufacturer contact'))));
  G.push(fn(T('Fluoroscopia e identificación', 'Fluoroscopy and identification'),
    p(T('La pestaña <b>Fluoro</b> reúne el atlas cinefluoroscópico de todas las válvulas. Desde ahí, desde la guía de planificación o desde el menú se abre el asistente <b>Identificar por fluoroscopia</b>:', 'The <b>Fluoro</b> tab gathers the cinefluoroscopic atlas of all valves. From there, from the planning guide or from the menu you can open the <b>Identify by fluoroscopy</b> assistant:'))
    + li([T('Se indica la posición y, si se conoce, la talla etiquetada.', 'Enter the position and, if known, the labelled size.'), T('Se responde a lo que se ve en la imagen: si el anillo es visible, si los discos son curvos, si el pivote es alto, si hay un segundo anillo más radiopaco y si los discos son muy densos.', 'Answer what you see on the image: whether the ring is visible, whether the discs are curved, whether the pivot is high, whether there is a second denser ring and whether the discs are very dense.'), T('Se apartan los modelos cuyas características documentadas contradicen una respuesta; los modelos sin descripción documentada nunca se descartan. Las candidatas aparecen agrupadas por marca con su descripción, sus imágenes y el acceso a cada ficha.', 'Models whose documented features contradict an answer are set aside; models without a documented description are never ruled out. Candidates are grouped by brand with their description, images and a link to each sheet.')])
    + `<div class="mbox">${esc(t('id_note'))}</div>`,
    fig('atlas', T('Atlas de fluoroscopia', 'Fluoroscopy atlas')) + fig('ident', T('Preguntas', 'Questions')) + fig('ident_res', T('Candidatas', 'Candidates'))));
  G.push(fn(T('Estimar ViV', 'ViV estimate'),
    p(T('El botón central de la barra inferior abre la estimación de tamaño, con dos modos:', 'The central bottom-bar button opens the size estimate, with two modes:'))
    + li([T('<b>Por modelo de válvula</b>: se elige posición, marca, modelo y talla y se muestran las tallas de TAVI de la tabla, con acceso a la ficha completa.', '<b>By valve model</b>: choose position, brand, model and size to see the TAVI sizes from the table, with access to the full sheet.'), T('<b>Por diámetro interno</b>: se introduce un DI medido y una tolerancia, y se listan las válvulas cuyo DI publicado encaja, ordenadas por cercanía y con la más próxima destacada.', '<b>By internal diameter</b>: enter a measured ID and a tolerance to list the valves whose published ID matches, ordered by closeness, with the closest highlighted.')]),
    fig('calc', T('Estimación por modelo', 'Estimate by model'))));
  G.push(fn(T('Simulación ViV', 'ViV simulation'),
    p(T('Desde la ficha de cualquier talla, <b>Simular ViV</b> superpone a escala la válvula transcatéter (TAVI) dentro de la prótesis mecánica ya implantada. Al abrirse, la TAVI llega plegada desde la aorta y se expande dentro del anillo (botón <b>Repetir implante</b>).', 'From any size sheet, <b>Simulate ViV</b> overlays the transcatheter valve (TAVI) to scale inside the already implanted mechanical prosthesis. On opening, the TAVI arrives crimped from the aorta and expands inside the ring (<b>Replay implantation</b> button).'))
    + li([T(`<b>Selección de la TAVI</b>: se propone automáticamente la más compatible (${esc(t('sim_rule'))}); las demás opciones de la tabla aparecen como botones y se puede elegir cualquier otro dispositivo y talla.`, `<b>TAVI selection</b>: the best fit is proposed automatically (${esc(t('sim_rule'))}); the other table options appear as buttons and any other device and size can be chosen.`),
      T('<b>Profundidad de implante</b>: deslizador que baja o sube la TAVI respecto a la entrada del anillo.', '<b>Implant depth</b>: slider that lowers or raises the TAVI relative to the ring inflow.'),
      T('<b>Vistas</b>: Lateral (corte a escala con cotas), Superior (diámetro dentro del anillo frente al nominal), 3D (se gira arrastrando) y Fluoro (proyección radiológica simulada, con inclinación, rotación e indicador de vista coplanar).', '<b>Views</b>: Side (to-scale section with dimensions), Top (diameter inside the ring vs nominal), 3D (drag to rotate) and Fluoro (simulated radiological projection, with tilt, rotation and coplanar-view indicator).'),
      T('<b>Capas</b>: cuerpo mecánico, anillo de sutura, armazón, valvas y faldón de la TAVI, anatomía del paciente, cotas y números; cada toque pasa de visible a atenuada y a oculta.', '<b>Layers</b>: mechanical housing, sewing ring, TAVI frame, leaflets and skirt, patient anatomy, dimensions and numbers; each tap goes visible → faded → hidden.'),
      T('<b>Resultados</b>: DI mecánico, diámetro nominal, sobredimensión frente al DI, diámetro dentro del anillo, constricción, altura y porción por encima del anillo; avisos si la combinación es «Caution» o si la TAVI es menor que el DI.', '<b>Results</b>: mechanical ID, nominal diameter, oversizing vs ID, diameter inside the ring, constraint, height and portion above the ring; warnings if the combination is “Caution” or the TAVI is smaller than the ID.'),
      T('<b>Medidas del paciente por TAC</b> (opcional): altura de cada coronaria, Ø de senos, Ø y altura de la unión sinotubular. Se dibuja la raíz aórtica, el armazón queda limitado por ella y se calcula la distancia TAVI–coronaria a la altura de cada ostium.', '<b>Patient CT measurements</b> (optional): height of each coronary, sinus Ø, STJ Ø and height. The aortic root is drawn, the frame is limited by it and the THV–coronary distance is computed at the height of each ostium.'),
      T('<b>Comparativa de candidatos</b>: tabla con sobredimensión y constricción de cada opción; tocar una fila la simula.', '<b>Candidate comparison</b>: table with oversizing and constraint of each option; tap a row to simulate it.'),
      T('<b>Compartir esta simulación</b>: genera un enlace que conserva dispositivo, talla, profundidad, vista y medidas del TAC.', '<b>Share this simulation</b>: creates a link that keeps device, size, depth, view and CT measurements.'),
      T('<b>Informe de planificación (imprimir / PDF)</b>: hoja A4 con la válvula, la TAVI, los resultados, la comparativa, los dibujos y las fuentes, con una línea en blanco para anotar el caso a mano.', '<b>Planning report (print / PDF)</b>: A4 sheet with the valve, the TAVI, results, comparison, drawings and sources, with a blank line to write the case by hand.')])
    + `<div class="mbox warn">${esc(t('sim_disc'))} ${esc(t('sim_trans'))}</div>`,
    fig('sim_top', T('Selección de la TAVI', 'TAVI selection')) + fig('sim_side', T('Vista lateral', 'Side view')) + fig('sim_topview', T('Vista superior', 'Top view')) + fig('sim_3d', T('Vista 3D', '3D view')) + fig('sim_xray', T('Fluoroscopia simulada', 'Simulated fluoroscopy')) + fig('sim_layers', T('Capas', 'Layers')) + fig('sim_ct_in', T('Medidas del TAC', 'CT measurements')) + fig('sim_ct', T('Raíz y coronarias', 'Root and coronaries')) + fig('sim_metrics', T('Resultados', 'Results')) + fig('sim_cmp', T('Comparativa', 'Comparison'))));
  G.push(fn(T('Comparar válvulas', 'Compare valves'),
    p(T('Pone dos modelos o tallas lado a lado (desde «⇄ Comparar» en la ficha o desde el menú): todas sus dimensiones con la diferencia, las tallas de TAVI de la tabla y las imágenes de diseño y fluoroscopia. El botón ⇄ intercambia ambos lados.', 'Puts two models or sizes side by side (from “⇄ Compare” on the sheet or from the menu): all their dimensions with the difference, the TAVI sizes from the table and the design and fluoroscopy images. The ⇄ button swaps both sides.')),
    fig('cmp', T('Selección', 'Selection')) + fig('cmp_tbl', T('Tabla comparativa', 'Comparison table'))));
  G.push(fn(T('Guía de planificación', 'Planning guide'),
    p(T('Seis puntos a evaluar antes de un procedimiento valve-in-mechanical, del artículo del equipo ViMech, con figuras y referencias (se reproduce íntegra en el capítulo siguiente).', 'Six points to evaluate before a valve-in-mechanical procedure, from the ViMech team article, with figures and references (reproduced in full in the next chapter).')),
    fig('guide', T('Guía de planificación', 'Planning guide'))));
  G.push(fn(T('Menú, caso de ejemplo y compartir', 'Menu, demo case and sharing'),
    li([T('<b>Más</b> abre el menú: idioma, tema, identificar por fluoroscopia, comparar válvulas, caso de ejemplo guiado, compartir ViMech (QR), guía de planificación, fuentes de datos, acerca de, aviso legal, licencia y créditos, contacto, política de privacidad y este manual.', '<b>More</b> opens the menu: language, theme, identify by fluoroscopy, compare valves, guided demo case, share ViMech (QR), planning guide, data sources, about, disclaimer, licence and credits, contact, privacy policy and this manual.'),
      T('<b>Caso de ejemplo guiado</b>: recorre solo, en 9 pasos de unos 7 s, todo el flujo con la SJM Regent 23 mm; barra inferior con anterior, pausa, siguiente y salir. Con la dirección <code>…/ViMech_app/?demo=loop</code> se repite en bucle (útil para pantallas de congreso).', '<b>Guided demo case</b>: walks through the whole workflow by itself in 9 steps of about 7 s with the SJM Regent 23 mm; bottom bar with previous, pause, next and exit. The address <code>…/ViMech_app/?demo=loop</code> repeats it in a loop (useful for congress screens).'),
      T('<b>Compartir ViMech (QR)</b>: código QR y enlace para abrir la app en otro dispositivo.', '<b>Share ViMech (QR)</b>: QR code and link to open the app on another device.')]),
    fig('menu', T('Menú', 'Menu')) + fig('demo', T('Caso de ejemplo', 'Demo case')) + fig('qr', T('Compartir (QR)', 'Share (QR)'))));
  G.push(`<h2>${T('Abreviaturas', 'Abbreviations')}</h2><table class="mt abbr">${SPEC_ORDER.filter(k => k !== 'model').map(k => `<tr><th>${esc(t('h_' + k).replace(/ \(.*\)/, ''))}</th><td>${esc(t('l_' + k) === 'l_' + k ? t('h_' + k) : t('l_' + k))}</td></tr>`).join('')}<tr><th>THV / TAVI</th><td>${T('Válvula transcatéter', 'Transcatheter heart valve')}</td></tr><tr><th>ViV</th><td>Valve-in-valve</td></tr><tr><th>IFU</th><td>${T('Instrucciones de uso del fabricante', "Manufacturer's instructions for use")}</td></tr></table>`);

  // ---------- 3. Guía de planificación ----------
  let plan = sec(T('Guía de planificación ViMech', 'ViMech planning guide'), 'plan') + p(esc(t('guide_lead')));
  GUIDE.forEach((s, i) => { plan += `<section class="gs"><h2>${i + 1}. ${esc(L(s.t))}</h2>${L(s.p).map(x => p(esc(x))).join('')}${s.fig ? `<figure class="gf"><img src="${esc(s.fig)}" alt=""><figcaption>${esc(L(s.cap) || '')}</figcaption></figure>` : ''}</section>`; });
  plan += `<h2>${esc(t('guide_refs'))}</h2><ol class="refs">${GUIDE_REFS.map(r => `<li>${esc(r)}</li>`).join('')}</ol><p class="small">${esc(t('guide_source'))}</p>`;

  // ---------- 4. Catálogo ----------
  let cat = sec(T('Catálogo de válvulas', 'Valve catalogue'), 'cat')
    + p(T('Para cada marca y modelo: fotografías, identificación fluoroscópica, posicionamiento, tabla completa de dimensiones, tabla de tallas de TAVI y fuentes. Colores de procedencia: ', 'For each brand and model: photographs, fluoroscopic identification, positioning, full dimension table, TAVI size table and sources. Provenance colours: ')
      + `<span class="sw off"></span> ${esc(t('prov_off'))} · <span class="sw lit"></span> ${esc(t('prov_lit'))} · <span class="sw own"></span> ${esc(t('prov_own'))}.`);
  sortedBrands().forEach(br => {
    cat += `<section class="mbrand"><h2 class="bh">${esc(br.name)}<small>${esc(L(br.manufacturer))}</small></h2>`;
    ['aortic', 'mitral'].forEach(pos => br.positions[pos].forEach((st, idx) => {
      const name = L(st.subtypeName);
      const imgs = normMedia(st.images, name).filter(m => !isVideo(m.src)).slice(0, 4);
      const fl = fluoroItems(br, st).filter(m => !isVideo(m.src)).slice(0, 2);
      const keys = SPEC_ORDER.filter(k => st.specs.some(r => r[k] !== undefined && r[k] !== ''));
      const tbl = st.specs.length ? `<table class="mt sp"><thead><tr>${keys.map(k => { const pv = provOf(st, k); return `<th class="${pv ? 'k-' + pv : ''}">${esc(t('h_' + k))}</th>`; }).join('')}</tr></thead><tbody>${st.specs.map(r => `<tr>${keys.map(k => { const pv = provOf(st, k); return `<td class="${pv ? 'p-' + pv : ''}">${r[k] === undefined ? '—' : esc(fmt(k, r[k]))}</td>`; }).join('')}</tr>`).join('')}</tbody></table>` : `<p class="small">${esc(t('specs_pending'))}</p>`;
      const tv = (st.taviTable || []).length ? `<h4>${esc(t('tavi'))}</h4><table class="mt tv"><thead><tr>${TAVI_KEYS.map(k => `<th>${esc(t(k === 'size' ? 'tavi_size' : 'tavi_' + k))}</th>`).join('')}</tr></thead><tbody>${st.taviTable.map(r => `<tr>${TAVI_KEYS.map(k => { const v = String(r[k] ?? '—'); return `<td class="${/caution/i.test(v) ? 'cau' : ''}">${esc(/caution/i.test(v) ? '⚠ ' + (v.replace(/\(?\s*caution\s*\)?/i, '').trim() || t('caution')) : v)}</td>`; }).join('')}</tr>`).join('')}</tbody></table><p class="small">${esc(t('tavi_source'))} ${esc(L(TAVI_SOURCE))}</p>` : `<p class="small">${esc(t('no_tavi_model'))}</p>`;
      const srcs = [...(st.source || []).filter(x => x && x.label).map(x => `<li><span class="sw off"></span>${esc(x.label)}${x.url ? ` — <span class="u">${esc(/^https?:/.test(x.url) ? x.url : url + x.url)}</span>` : ''}</li>`),
        ...(st.litSource || []).map(x => `<li><span class="sw lit"></span>${esc(x.label)}${x.url ? ` — <span class="u">${esc(x.url)}</span>` : ''}</li>`)];
      if (!st.verified || (st.unverifiedKeys || []).length || (st.taviTable || []).length) srcs.push(`<li><span class="sw own"></span>${esc(t('source_own_title'))}</li>`);
      cat += `<article class="mmodel"><h3>${esc(name)} <span class="pos">${esc(t(pos))}</span></h3>
        <div class="mgal">${[...imgs, ...fl].map(m => `<figure><img src="${esc(m.src)}" alt=""><figcaption>${esc(m.cap || '')}${MEDIA[m.src] && MEDIA[m.src].cred ? ` · ${esc(MEDIA[m.src].cred)}` : ''}</figcaption></figure>`).join('')}</div>
        ${st.fluoroscopyDesc ? `<h4>${esc(t('fluoro'))}</h4>${li(L(st.fluoroscopyDesc).map(esc))}` : ''}
        ${st.positioning ? `<h4>${esc(t('positioning'))}</h4>${li(L(st.positioning).map(esc))}` : ''}
        <h4>${esc(t('specs'))}</h4>${tbl}${tv}
        <h4>${esc(t('rep_src'))}</h4><ul class="msrc">${srcs.join('')}</ul></article>`;
    }));
    const c = typeof CONTACTS !== 'undefined' ? CONTACTS[br.id] : null;
    if (c) cat += `<div class="mbox small"><b>${esc(t('mk_title'))}:</b> ${esc(c.name)} · ${c.tel ? esc(c.tel.join(', ')) + ' · ' : ''}${c.mail ? esc(c.mail.join(', ')) + ' · ' : ''}${esc(c.addr.join(', '))} · ${esc(c.web)}</div>`;
    cat += `</section>`;
  });

  // ---------- 5. Dispositivos TAVI ----------
  let thvs = sec(T('Dispositivos TAVI en la simulación', 'TAVI devices in the simulation'), 'thv')
    + p(T('Diámetro = talla nominal etiquetada. Origen de la altura de cada dispositivo:', 'Diameter = labelled nominal size. Source of each device height:'))
    + `<table class="mt"><thead><tr><th>${T('Dispositivo', 'Device')}</th><th>${T('Tallas (mm)', 'Sizes (mm)')}</th><th>${T('Altura (mm)', 'Height (mm)')}</th><th>${T('Fuente', 'Source')}</th></tr></thead><tbody>${Object.keys(THV_GEOM).map(k => { const g = THV_GEOM[k]; const s = Object.keys(g.h).sort((a, b2) => a - b2); return `<tr><td><b>${esc(t('tavi_' + k))}</b></td><td>${s.join(' · ')}</td><td>${s.map(x => g.h[x] ? g.h[x] : '—').join(' · ')}<br><small>${esc(t('sim_q_' + g.q))}</small></td><td class="small">${esc(L(THV_SRC[k]))}<br><span class="u">${esc(THV_SRC[k].url)}</span></td></tr>`; }).join('')}</tbody></table>`;

  // ---------- 6. Fuentes, licencia y créditos ----------
  renderSources(); renderCredits();
  let legal = sec(T('Fuentes, licencia, derechos y créditos', 'Sources, licence, rights and credits'), 'legal')
    + `<h2>${esc(t('menu_sources'))}</h2><div class="legal">${$('#sources-body').innerHTML}</div>`
    + `<div class="legal">${$('#credits-body').innerHTML.replace(/<button[^>]*>.*?<\/button>/g, '').replace(/<details/g, '<div').replace(/<\/details>/g, '</div>').replace(/<summary>/g, '<p class="sum">').replace(/<\/summary>/g, '</p>')}</div>`
    + `<h2>${esc(t('about_title'))}</h2>${t('about_content')}<h2>${esc(t('contact_title'))}</h2>${t('contact_content')}`;

  // ---------- Portada e índice ----------
  const qr = (document.querySelector('.share-qr') || {}).innerHTML || '';
  const cover = `<section class="cover"><div class="cv-top"><div class="cv-logo">${XVALVE}</div><div><p class="cv-k">ViMech</p><h1>${t('hero_title').split('\n').map(esc).join('<br>')}</h1><p class="cv-sub">${T('Manual de usuario y catálogo completo', 'User manual and complete catalogue')}</p></div></div>
    <div class="cv-mid"><div class="cv-qr">${qr}</div><div><p><b>${url}</b></p><p>${T('Versión de datos', 'Data version')} ${esc(DATA_VERSION)} · ${esc(today)}</p><p>${valvesData.length} ${T('marcas', 'brands')} · ${nModels} ${T('modelos', 'models')} · 5 ${T('idiomas', 'languages')}</p></div></div>
    <div class="cv-bot"><p><b>ICICOR</b> — Instituto de Ciencias del Corazón · Hospital Clínico Universitario de Valladolid</p><p class="small">© ${new Date().getFullYear()} ICICOR · CC BY-NC-ND 4.0. ${T('Imágenes, nombres y marcas de terceros excluidos de la licencia.', 'Third-party images, names and trademarks are excluded from the licence.')}</p></div></section>`;
  const toc = `<section class="toc"><h1 class="ms">${T('Índice', 'Contents')}</h1><ol>${H.map(([n, title, id]) => `<li><a href="#${id}">${esc(title)}</a></li>`).join('')}</ol>
    <ol class="toc2">${sortedBrands().map(br => `<li>${esc(br.name)} — ${allSubs(br).map(s => esc(L(s.subtypeName))).join(', ')}</li>`).join('')}</ol></section>`;

  document.title = 'ViMech — ' + T('Manual', 'Manual');
  document.body.className = 'manual';
  document.body.innerHTML = `<div id="manual">${cover}${toc}<div class="chap">${intro}</div><div class="chap">${G.join('')}</div><div class="chap">${plan}</div><div class="chap">${cat}</div><div class="chap">${thvs}</div><div class="chap">${legal}</div></div>`;
  document.documentElement.removeAttribute('data-theme'); document.documentElement.classList.remove('is-dark');
  const css = document.createElement('style'); css.textContent = MANUAL_CSS; document.head.appendChild(css);
};
window.MANUAL_CSS = `
@page { size: A4; margin: 16mm 14mm 16mm 14mm; }
:root { color-scheme: light; --ink:#13203a; --ink-2:#4a5872; --ink-3:#6f7c94; --line:#dfe5ee; --accent:#2457d6; --paper:#fff; --card:#fff; --card-2:#f7f9fc; --off:#0b7a83; --own:#6a3fc4; --lit:#b3264f; }
html, body.manual { background:#fff !important; color:#13203a; font: 10pt/1.42 "Segoe UI", system-ui, -apple-system, Roboto, Arial, sans-serif; margin:0; padding:0 !important; }
body.manual * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
#manual a { color:#2457d6; text-decoration:none; }
.cover { height: 263mm; display:flex; flex-direction:column; justify-content:space-between; padding: 6mm 4mm; break-after: page; background: linear-gradient(160deg,#0d1628,#16233d 60%,#1d2e52); color:#fff; border-radius: 6mm; box-sizing:border-box; }
.cv-top { display:flex; gap:8mm; align-items:center; margin-top: 18mm; padding: 0 8mm; } .cv-logo { width: 46mm; flex:none; } .cv-logo svg { width:100%; height:auto; display:block; }
.cv-k { margin:0; font-weight:800; letter-spacing:.2em; color:#8fb0ff; } .cover h1 { font-size: 24pt; line-height:1.15; margin: 2mm 0; } .cv-sub { font-size: 14pt; color:#c8d4ea; margin:0; }
.cv-mid { display:flex; gap:8mm; align-items:center; padding: 0 8mm; } .cv-qr { width: 42mm; background:#fff; padding: 3mm; border-radius: 4mm; } .cv-qr svg { width:100%; height:auto; display:block; }
.cv-mid p { margin: 1.5mm 0; color:#dfe7f5; } .cv-bot { padding: 0 8mm 6mm; color:#c8d4ea; } .cv-bot p { margin: 1mm 0; }
.toc { break-after: page; } .toc ol { font-size: 12pt; line-height: 2; } .toc2 { font-size: 9pt !important; line-height: 1.5 !important; color:#4a5872; margin-top: 6mm; }
.chap { break-before: page; }
h1.ms { font-size: 19pt; margin: 0 0 5mm; display:flex; align-items:center; gap: 3mm; color:#13203a; border-bottom: 2px solid #13203a; padding-bottom: 2mm; }
h1.ms span { background:#2457d6; color:#fff; border-radius: 50%; width: 9mm; height: 9mm; display:inline-grid; place-items:center; font-size: 12pt; flex: none; }
#manual h2 { font-size: 13pt; color:#2457d6; margin: 6mm 0 2mm; break-after: avoid; } #manual h3 { font-size: 12pt; margin: 0 0 2mm; break-after: avoid; } #manual h4 { font-size: 10pt; margin: 3mm 0 1.5mm; color:#4a5872; text-transform: uppercase; letter-spacing:.04em; break-after: avoid; }
#manual p { margin: 0 0 2mm; } #manual ul, #manual ol { margin: 0 0 2mm; padding-left: 5mm; } #manual li { margin: .8mm 0; }
.small, #manual small { font-size: 8.5pt; color:#6f7c94; } .u { color:#2457d6; word-break: break-all; font-size: 8pt; }
.mbox { border:1px solid #dfe5ee; background:#f7f9fc; border-radius: 3mm; padding: 3mm 4mm; margin: 3mm 0; font-size: 9pt; } .mbox.warn { border-color:#f0c674; background:#fff7e6; }
.fn { break-inside: auto; margin-bottom: 4mm; } .fn-g { display:block; } .fn-f { display:grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; margin-top: 2mm; }
.mf { margin:0; break-inside: avoid; } .mf img { width:100%; border:1px solid #c9d2df; border-radius: 2.5mm; display:block; } .mf figcaption { font-size: 7.5pt; color:#6f7c94; text-align:center; margin-top: 1mm; }
.sw { display:inline-block; width: 3mm; height: 3mm; border-radius: 1mm; margin-right: 1.2mm; vertical-align: -0.3mm; } .sw.off { background:#0b7a83; } .sw.lit { background:#b3264f; } .sw.own { background:#6a3fc4; }
.mt { width:100%; border-collapse: collapse; font-size: 8.5pt; margin: 1mm 0 2mm; font-variant-numeric: tabular-nums; break-inside: auto; } .mt th, .mt td { border-bottom: 1px solid #dfe5ee; padding: 1mm 1.6mm; text-align:left; vertical-align: top; } .mt thead th { background:#eef2f8; font-weight:700; }
.mt th.k-off { box-shadow: inset 0 -2px #0b7a83; } .mt th.k-own { box-shadow: inset 0 -2px #6a3fc4; } .mt th.k-lit { box-shadow: inset 0 -2px #b3264f; }
.mt td.p-own { color:#6a3fc4; } .mt td.p-lit { color:#b3264f; } .mt td.p-off { color:#0b7a83; } .mt td.cau { color:#9a5400; font-weight:700; } .mt tr { break-inside: avoid; }
.abbr th { width: 32mm; }
.gs { break-inside: auto; } .gf { margin: 2mm 0 4mm; break-inside: avoid; } .gf img { max-width: 100%; max-height: 85mm; display:block; margin: 0 auto; border-radius: 2mm; } .gf figcaption { font-size: 8pt; color:#6f7c94; text-align:center; }
.refs { font-size: 9pt; }
.mbrand { break-before: page; } .mbrand:first-of-type { break-before: auto; } h2.bh { font-size: 16pt !important; color:#13203a !important; border-bottom: 1px solid #c9d2df; padding-bottom: 1.5mm; } h2.bh small { display:block; font-size: 9.5pt; color:#6f7c94; font-weight: 500; }
.mmodel { margin: 4mm 0 6mm; padding-bottom: 3mm; border-bottom: 1px dashed #c9d2df; } .mmodel .pos { font-size: 8.5pt; color:#fff; background:#2457d6; border-radius: 1.5mm; padding: .3mm 1.8mm; vertical-align: 1mm; font-weight: 600; }
.mgal { display:grid; grid-template-columns: repeat(3, 1fr); gap: 3mm; margin: 2mm 0; } .mgal figure { margin:0; break-inside: avoid; } .mgal img { width:100%; height: 38mm; object-fit: contain; background:#f3f5f8; border-radius: 2mm; display:block; } .mgal figcaption { font-size: 7pt; color:#6f7c94; margin-top: .8mm; }
.msrc { font-size: 8.5pt; list-style: none; padding-left: 0 !important; } .msrc li { margin: 1mm 0; }
.legal { font-size: 9pt; } .legal h3 { font-size: 11pt; } .legal .sum { font-weight: 700; margin-top: 3mm; } .legal .src { display:block; } .legal .dot { display:none; } .legal .prov-legend { display:none; }
.legal ul { padding-left: 5mm; }
`;
