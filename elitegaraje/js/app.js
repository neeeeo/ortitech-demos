/* Elite Garaje · demo de OrtiTech. Maqueta sin servidor: los formularios no envían nada. */
(() => {
  const NEGOCIO = {
    tel: "674 14 49 49",
    telHref: "tel:+34674144949",
    wa: "34674144949",
    email: "info@elitegarajebcn.com", // provisional: el actual (dani@) no tiene acceso; se confirma con el cliente
    calle: "Ctra. Reial, 122 A",
    zona: "Polígono Industrial Sud-Oest",
    cp: "08960 Sant Just Desvern, Barcelona",
    horario: ["Lunes a viernes", "9:00 – 13:00 y 16:00 – 19:00"],
    lat: 41.3801549, lng: 2.0623622,
    google: { nota: "4,9", resenas: 16 },
  };
  const COCHES = window.COCHES || [];
  const TIN_EJEMPLO = 8.5; // solo para la calculadora orientativa

  // ---------- Iconos ----------
  const I = {
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zM12 0a12 12 0 0 0-10.3 18L0 24l6.2-1.6A12 12 0 1 0 12 0z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 15l2 2 4-4"/></svg>',
    euro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 7a7 7 0 1 0 0 10M4 10h10M4 14h9"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h15v13H1zM16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',
    key: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"/><circle cx="7" cy="7" r="1.5"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
  };
  window.ICONOS = I;

  // ---------- Utilidades ----------
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const miles = n => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const eur = n => `${miles(n)} €`;
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const foto = (c, n = 1, peq = false) => `img/coches/${c.id}-${n}${peq ? "-s" : ""}.webp`;
  const ficha = c => `coche.html?id=${c.id}`;
  const nombre = c => `${c.titulo} ${c.version}`.trim();
  const waLink = texto => `https://wa.me/${NEGOCIO.wa}?text=${encodeURIComponent(texto)}`;
  const params = new URLSearchParams(location.search);
  const pagina = document.body.dataset.page;
  const contar = (lista, k) => lista.reduce((m, c) => (m[c[k]] = (m[c[k]] || 0) + 1, m), {});

  function etiqueta(c) {
    if (!c.etiqueta) return "";
    const cls = c.etiqueta === "ECO" ? "tag-eco" : c.etiqueta.startsWith("0") ? "tag-cero" : "";
    const txt = c.etiqueta.startsWith("0") ? "CERO" : c.etiqueta;
    return `<span class="badge ${cls}">Etiqueta ${esc(txt)}</span>`;
  }

  function tarjeta(c) {
    const fin = c.cuota ? `<div class="fin">desde<strong>${eur(c.cuota)}/mes</strong></div>` : "";
    return `<a class="car rv" href="${ficha(c)}">
      <div class="ph">
        <img src="${foto(c, 1, true)}" alt="${esc(nombre(c))}" loading="lazy" decoding="async" width="720" height="540">
        <div class="badges">${c.reservado ? '<span class="badge red">Reservado</span>' : ""}${c.km < 100 ? '<span class="badge red">A estrenar</span>' : ""}${etiqueta(c)}</div>
        <span class="badge dark count">${I.camera.replace("<svg", '<svg width="13" height="13"')} ${c.fotos}</span>
      </div>
      <div class="body">
        <div><h3>${esc(c.titulo)}</h3><div class="ver">${esc(c.version)}</div></div>
        <div class="chips"><span class="chip">${c.anio}</span><span class="chip">${miles(c.km)} km</span><span class="chip">${esc(c.cambio)}</span><span class="chip">${esc(c.combustible)}</span></div>
        <div class="price"><div><b>${eur(c.contado)}</b><small>Al contado${c.iva ? " · IVA incl." : ""}</small></div>${fin}</div>
      </div>
    </a>`;
  }

  // ---------- Aviso de demo ----------
  let toastT;
  function aviso(txt) {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
    t.textContent = txt;
    t.classList.add("on");
    clearTimeout(toastT);
    toastT = setTimeout(() => t.classList.remove("on"), 4200);
  }
  document.addEventListener("click", e => {
    const el = e.target.closest("[data-demo]");
    if (el) { e.preventDefault(); aviso(el.dataset.demo); }
  });

  // ---------- Cabecera, pie y barra del móvil ----------
  const MENU = [["coches.html", "Coches"], ["tasacion.html", "Vende tu coche"], ["financiacion.html", "Financiación"],
    ["servicios.html", "Servicios"], ["contacto.html", "Contacto"]];
  const actual = location.pathname.split("/").pop() || "index.html";

  function cabecera() {
    const top = $("#top");
    if (!top) return;
    const on = h => (h === actual || (h === "coches.html" && actual === "coche.html")) ? ' class="on"' : "";
    top.outerHTML = `
      <div class="demo-bar"><span class="long">Demo de propuesta preparada por <b>OrtiTech</b> para Elite Garaje · no es la web oficial</span><span class="short">Demo de <b>OrtiTech</b> · no es la web oficial</span></div>
      <nav class="nav" aria-label="Principal">
        <div class="wrap">
          <a class="logo" href="index.html" aria-label="Elite Garaje, inicio"><img src="img/logo.webp" alt="Elite Garaje BCN" width="640" height="167"></a>
          <ul id="menu">${MENU.map(([h, t]) => `<li><a href="${h}"${on(h)}>${t}</a></li>`).join("")}</ul>
          <div class="right">
            <a class="btn ghost-dark sm phone" href="${NEGOCIO.telHref}">${I.phone}${NEGOCIO.tel}</a>
            <a class="btn wa sm" href="${waLink("Hola, os escribo desde la web de Elite Garaje.")}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}<span class="wa-txt">WhatsApp</span></a>
            <button class="burger" aria-label="Abrir menú" aria-expanded="false"><span></span></button>
          </div>
        </div>
      </nav>`;
    const nav = $(".nav"), b = $(".burger");
    b.addEventListener("click", () => {
      const abierto = nav.classList.toggle("open");
      b.setAttribute("aria-expanded", abierto);
    });
  }

  function pie() {
    const bottom = $("#bottom");
    if (!bottom) return;
    bottom.outerHTML = `
      <footer>
        <div class="wrap">
          <div class="cols">
            <div>
              <img src="img/logo.webp" alt="Elite Garaje BCN" width="640" height="167" loading="lazy">
              <p>Coches de ocasión revisados, con garantía y cambio de nombre incluidos. Atención con cita previa.</p>
            </div>
            <div><h4>Coches</h4><ul>
              <li><a href="coches.html">Todo el stock</a></li>
              <li><a href="coches.html?carroceria=SUV%20%2F%204x4">SUV y 4x4</a></li>
              <li><a href="coches.html?carroceria=Descapotable">Descapotables</a></li>
              <li><a href="coches.html?marca=BMW">BMW</a></li>
            </ul></div>
            <div><h4>Servicios</h4><ul>
              <li><a href="tasacion.html">Vende tu coche</a></li>
              <li><a href="financiacion.html">Financiación</a></li>
              <li><a href="servicios.html">Coches a la carta</a></li>
              <li><a href="servicios.html#garantia">Garantía</a></li>
            </ul></div>
            <div><h4>Visítanos</h4><ul>
              <li>${NEGOCIO.calle}<br>${NEGOCIO.zona}<br>${NEGOCIO.cp}</li>
              <li>${NEGOCIO.horario.join("<br>")}</li>
              <li><a href="${NEGOCIO.telHref}">${NEGOCIO.tel}</a></li>
              <li><a href="mailto:${NEGOCIO.email}">${NEGOCIO.email}</a> <span class="pill-soon">a confirmar</span></li>
            </ul></div>
          </div>
          <div class="legal">
            <span>© 2026 Elite Garaje BCN, S.L.</span>
            <nav>
              <a href="#" data-demo="En la web real: aviso legal con los datos de la empresa.">Aviso legal</a>
              <a href="#" data-demo="En la web real: política de privacidad (RGPD).">Privacidad</a>
              <a href="#" data-demo="En la web real: política de cookies, solo con las cookies que de verdad se usen.">Cookies</a>
            </nav>
            <span>Demo de diseño por <b>OrtiTech</b></span>
          </div>
        </div>
      </footer>
      <div class="mbar">
        <a class="btn dark" href="${NEGOCIO.telHref}">${I.phone}Llamar</a>
        <a class="btn wa" href="${waLink("Hola, os escribo desde la web de Elite Garaje.")}" target="_blank" rel="noopener">${I.wa}WhatsApp</a>
      </div>`;
    document.body.classList.add("has-mbar");
  }

  // Bloque de contacto y mapa (inicio y contacto)
  function visita() {
    $$("[data-visita]").forEach(el => {
      el.innerHTML = `
        <div class="info-card">
          <div class="info-row"><div class="ic">${I.pin}</div><div><small>Dirección</small><a href="https://www.google.com/maps/search/?api=1&query=${NEGOCIO.lat},${NEGOCIO.lng}" target="_blank" rel="noopener">${NEGOCIO.calle}</a><div class="muted">${NEGOCIO.zona} · ${NEGOCIO.cp}</div></div></div>
          <div class="info-row"><div class="ic">${I.clock}</div><div><small>Horario</small><b>${NEGOCIO.horario[0]}</b><div class="muted">${NEGOCIO.horario[1]} · con cita previa</div></div></div>
          <div class="info-row"><div class="ic">${I.phone}</div><div><small>Teléfono</small><a href="${NEGOCIO.telHref}">${NEGOCIO.tel}</a><div class="muted">Pregunta por Dani</div></div></div>
          <div class="info-row"><div class="ic">${I.wa}</div><div><small>WhatsApp</small><a href="${waLink("Hola, quiero pedir cita para ver un coche.")}" target="_blank" rel="noopener">Escríbenos</a><div class="muted">Te respondemos en horario de tienda</div></div></div>
          <div class="info-row"><div class="ic">${I.mail}</div><div><small>Email <span class="pill-soon">a confirmar</span></small><a href="mailto:${NEGOCIO.email}">${NEGOCIO.email}</a></div></div>
          <a class="btn red" href="https://www.google.com/maps/dir/?api=1&destination=${NEGOCIO.lat},${NEGOCIO.lng}" target="_blank" rel="noopener">${I.pin}Cómo llegar</a>
        </div>
        <div class="map"><iframe title="Mapa: Elite Garaje en Sant Just Desvern" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=${NEGOCIO.lat},${NEGOCIO.lng}&z=16&hl=es&output=embed"></iframe></div>`;
    });
  }

  // ---------- Formularios de demo ----------
  function formularios() {
    $$("form.demo-form").forEach(f => f.addEventListener("submit", e => {
      e.preventDefault();
      if (!f.reportValidity()) return;
      const ok = f.parentElement.querySelector(".done");
      f.hidden = true;
      if (ok) { ok.classList.add("on"); ok.scrollIntoView({ block: "center", behavior: "smooth" }); }
    }));
    // Selector de coche en los formularios
    $$("select[data-coches]").forEach(s => {
      s.insertAdjacentHTML("beforeend", COCHES.filter(c => !c.reservado).map(c =>
        `<option value="${c.id}">${esc(c.titulo)} ${esc(c.version)} · ${c.anio} · ${eur(c.contado)}</option>`).join(""));
      if (params.get("id")) s.value = params.get("id");
    });
  }

  // ---------- Aparición al hacer scroll ----------
  function aparecer() {
    const els = $$(".rv:not(.in)");
    if (!("IntersectionObserver" in window)) return els.forEach(e => e.classList.add("in"));
    const io = new IntersectionObserver(es => es.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); }
    }), { rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  // ---------- Inicio ----------
  function inicio() {
    $$("[data-n]").forEach(e => e.textContent = COCHES.length);
    const porId = Object.fromEntries(COCHES.map(c => [c.id, c]));
    const m = $("#mosaic");
    if (m) m.innerHTML = ["93941fde", "b1e48fb1", "e0c04891", "3c49bfe0"].map(id => porId[id]).filter(Boolean).map((c, i) =>
      `<a href="${ficha(c)}"><img src="${foto(c, 1, true)}" alt="${esc(nombre(c))}" ${i < 2 ? 'fetchpriority="high"' : 'loading="lazy"'} width="720" height="540"><span>${esc(c.titulo)}<i>${eur(c.contado)}</i></span></a>`).join("");

    // Buscador rápido
    const marcas = contar(COCHES, "marca"), carros = contar(COCHES, "carroceria");
    const sm = $("#f-marca"), sc = $("#f-carroceria");
    if (sm) sm.insertAdjacentHTML("beforeend", Object.keys(marcas).sort().map(k => `<option>${esc(k)}</option>`).join(""));
    if (sc) sc.insertAdjacentHTML("beforeend", Object.keys(carros).sort().map(k => `<option>${esc(k)}</option>`).join(""));
    const f = $("#finder");
    if (f) f.addEventListener("submit", e => {
      e.preventDefault();
      const q = new URLSearchParams();
      for (const [k, v] of new FormData(f)) if (v) q.set(k, v);
      location.href = `coches.html${q.toString() ? "?" + q : ""}`;
    });

    const d = $("#destacados");
    if (d) d.innerHTML = COCHES.filter(c => !c.reservado).slice(0, 6).map(tarjeta).join("");
    const cats = $("#cats");
    if (cats) cats.innerHTML = Object.entries(carros).sort((a, b) => b[1] - a[1]).map(([k, n]) =>
      `<a class="cat" href="coches.html?carroceria=${encodeURIComponent(k)}"><b>${esc(k)}</b><small>${n} ${n === 1 ? "coche" : "coches"}</small></a>`).join("");
  }

  // ---------- Stock con filtros ----------
  function stock() {
    const grupos = [["marca", "Marca"], ["carroceria", "Carrocería"], ["combustible", "Combustible"], ["cambio", "Cambio"], ["etiqueta", "Etiqueta"]];
    const precioMax = Math.ceil(Math.max(...COCHES.map(c => c.contado)) / 1000) * 1000;
    const kmMax = Math.ceil(Math.max(...COCHES.map(c => c.km)) / 10000) * 10000;
    const anios = [...new Set(COCHES.map(c => c.anio))].sort((a, b) => b - a);
    const box = $("#filters");
    const sel = k => (params.get(k) || "").split(",").filter(Boolean);

    box.innerHTML = `
      <h3>Filtros <button type="button" id="limpiar">Borrar</button></h3>
      ${grupos.map(([k, t]) => {
        const n = contar(COCHES, k);
        return `<div class="fgroup"><span class="lbl">${t}</span><div class="opts">${Object.keys(n).sort().map(v =>
          `<label class="opt"><input type="checkbox" name="${k}" value="${esc(v)}"${sel(k).includes(v) ? " checked" : ""}><span>${esc(k === "etiqueta" && v.startsWith("0") ? "CERO" : v)} <em>${n[v]}</em></span></label>`).join("")}</div></div>`;
      }).join("")}
      <div class="fgroup range"><span class="lbl">Precio máximo</span><output id="o-precio"></output><input type="range" name="precio" min="10000" max="${precioMax}" step="1000" value="${params.get("precio") || precioMax}" aria-label="Precio máximo"></div>
      <div class="fgroup range"><span class="lbl">Kilómetros máximos</span><output id="o-km"></output><input type="range" name="km" min="10000" max="${kmMax}" step="10000" value="${params.get("km") || kmMax}" aria-label="Kilómetros máximos"></div>
      <div class="fgroup"><span class="lbl">Año desde</span><div class="field"><select name="anio" aria-label="Año desde"><option value="">Cualquiera</option>${anios.map(a => `<option${params.get("anio") == a ? " selected" : ""}>${a}</option>`).join("")}</select></div></div>
      <div class="apply"><button type="button" class="btn red block" id="ver">Ver coches</button></div>`;
    const orden = $("#orden");
    if (params.get("orden")) orden.value = params.get("orden");

    function leer() {
      const f = { orden: orden.value };
      grupos.forEach(([k]) => f[k] = $$(`input[name="${k}"]:checked`, box).map(i => i.value));
      f.precio = +$('input[name="precio"]', box).value;
      f.km = +$('input[name="km"]', box).value;
      f.anio = +$('select[name="anio"]', box).value || 0;
      return f;
    }
    function pintar() {
      const f = leer();
      $("#o-precio").textContent = f.precio >= precioMax ? "Sin límite" : `Hasta ${eur(f.precio)}`;
      $("#o-km").textContent = f.km >= kmMax ? "Sin límite" : `Hasta ${miles(f.km)} km`;
      let lista = COCHES.filter(c => grupos.every(([k]) => !f[k].length || f[k].includes(c[k]))
        && (f.precio >= precioMax || c.contado <= f.precio) && (f.km >= kmMax || c.km <= f.km) && c.anio >= f.anio);
      const cmp = { "precio-asc": (a, b) => a.contado - b.contado, "precio-desc": (a, b) => b.contado - a.contado,
        "km-asc": (a, b) => a.km - b.km, "anio-desc": (a, b) => b.anio - a.anio }[f.orden];
      if (cmp) lista = [...lista].sort(cmp);
      $("#n").innerHTML = `${lista.length} ${lista.length === 1 ? "coche" : "coches"} <span>de ${COCHES.length} en stock</span>`;
      $("#lista").innerHTML = lista.length ? lista.map(tarjeta).join("") :
        `<div class="empty" style="grid-column:1/-1"><h3>No hay coches con esos filtros</h3><p class="muted" style="margin:10px 0 20px">Cuéntanos qué buscas y te lo encontramos.</p><a class="btn red" href="${waLink("Hola, busco un coche y no lo encuentro en vuestro stock.")}" target="_blank" rel="noopener">${I.wa}Pedir un coche a la carta</a></div>`;
      aparecer();
      // La URL refleja los filtros, para poder compartir la búsqueda
      const q = new URLSearchParams();
      grupos.forEach(([k]) => f[k].length && q.set(k, f[k].join(",")));
      if (f.precio < precioMax) q.set("precio", f.precio);
      if (f.km < kmMax) q.set("km", f.km);
      if (f.anio) q.set("anio", f.anio);
      if (f.orden !== "rec") q.set("orden", f.orden);
      history.replaceState(null, "", `coches.html${q.toString() ? "?" + q : ""}`);
      const nf = grupos.reduce((s, [k]) => s + f[k].length, 0) + (f.precio < precioMax) + (f.km < kmMax) + !!f.anio;
      $("#nf").textContent = nf ? ` (${nf})` : "";
    }
    box.addEventListener("input", pintar);
    orden.addEventListener("change", pintar);
    $("#limpiar").addEventListener("click", () => {
      $$("input[type=checkbox]", box).forEach(i => i.checked = false);
      $('input[name="precio"]', box).value = precioMax;
      $('input[name="km"]', box).value = kmMax;
      $('select[name="anio"]', box).value = "";
      pintar();
    });
    const abrir = on => { box.classList.toggle("on", on); document.body.style.overflow = on ? "hidden" : ""; };
    $("#abrir-filtros").addEventListener("click", () => abrir(true));
    $("#ver").addEventListener("click", () => { abrir(false); scrollTo({ top: 0 }); });
    pintar();
  }

  // ---------- Ficha del coche ----------
  function cocheDetalle() {
    const c = COCHES.find(x => x.id === params.get("id"));
    if (!c) { location.replace("coches.html"); return; }
    document.title = `${nombre(c)} (${c.anio}) · Elite Garaje`;
    $("#crumb").textContent = c.titulo;
    const fotos = Array.from({ length: c.fotos }, (_, i) => i + 1);
    let n = 1;

    $("#gallery").innerHTML = `
      <div class="main" id="main"><img id="main-img" src="${foto(c, 1)}" alt="${esc(nombre(c))}, foto 1" fetchpriority="high" width="1600" height="1200">
        <button class="arrow prev" aria-label="Foto anterior">${I.left}</button><button class="arrow next" aria-label="Foto siguiente">${I.right}</button>
        <span class="badge dark num" id="num">1 / ${c.fotos}</span>
        <div class="badges">${c.reservado ? '<span class="badge red">Reservado</span>' : ""}${etiqueta(c)}</div></div>
      <div class="thumbs" id="thumbs">${fotos.map(i => `<button aria-label="Ver foto ${i}"${i === 1 ? ' class="on"' : ""}><img src="${foto(c, i, true)}" alt="" loading="lazy" width="96" height="72"></button>`).join("")}</div>`;

    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = `<button class="x" aria-label="Cerrar">×</button><button class="arrow prev" aria-label="Anterior">${I.left}</button><img alt=""><button class="arrow next" aria-label="Siguiente">${I.right}</button><span class="num"></span>`;
    document.body.append(lb);

    function ir(i) {
      n = (i - 1 + c.fotos) % c.fotos + 1;
      $("#main-img").src = foto(c, n);
      $("#main-img").alt = `${nombre(c)}, foto ${n}`;
      $("#num").textContent = `${n} / ${c.fotos}`;
      $$("#thumbs button").forEach((b, k) => b.classList.toggle("on", k + 1 === n));
      $$("#thumbs button")[n - 1].scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      $("img", lb).src = foto(c, n);
      $(".num", lb).textContent = `${n} / ${c.fotos}`;
      new Image().src = foto(c, n % c.fotos + 1); // precarga la siguiente
    }
    $$("#thumbs button").forEach((b, k) => b.addEventListener("click", () => ir(k + 1)));
    $("#main .prev").addEventListener("click", e => { e.stopPropagation(); ir(n - 1); });
    $("#main .next").addEventListener("click", e => { e.stopPropagation(); ir(n + 1); });
    $("#main").addEventListener("click", () => { ir(n); lb.classList.add("on"); document.body.style.overflow = "hidden"; });
    const cerrar = () => { lb.classList.remove("on"); document.body.style.overflow = ""; };
    $(".x", lb).addEventListener("click", cerrar);
    $(".prev", lb).addEventListener("click", () => ir(n - 1));
    $(".next", lb).addEventListener("click", () => ir(n + 1));
    lb.addEventListener("click", e => { if (e.target === lb) cerrar(); });
    document.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") ir(n - 1);
      if (e.key === "ArrowRight") ir(n + 1);
      if (e.key === "Escape") cerrar();
    });
    // Deslizar con el dedo
    [$("#main"), lb].forEach(el => {
      let x0 = null;
      el.addEventListener("touchstart", e => x0 = e.touches[0].clientX, { passive: true });
      el.addEventListener("touchend", e => {
        if (x0 === null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 40) { ir(dx < 0 ? n + 1 : n - 1); el.dataset.swiped = "1"; setTimeout(() => delete el.dataset.swiped, 50); }
        x0 = null;
      });
    });
    $("#main").addEventListener("click", e => { if ($("#main").dataset.swiped) e.stopImmediatePropagation(); }, true);

    const msg = `Hola, me interesa el ${nombre(c)} (${c.anio}, ${miles(c.km)} km, ${eur(c.contado)}) que he visto en vuestra web.`;
    $("#buy").innerHTML = `
      <div class="box">
        <h1>${esc(c.titulo)}</h1>
        <div class="ver">${esc(c.version)}</div>
        <div class="chips"><span class="chip">${c.anio}</span><span class="chip">${miles(c.km)} km</span><span class="chip">${esc(c.cambio)}</span><span class="chip">${esc(c.combustible)}</span>${c.cv ? `<span class="chip">${c.cv} CV</span>` : ""}</div>
        <div class="big-price">
          <div class="row"><div><small>Precio al contado</small></div><b>${eur(c.contado)}</b></div>
          <small>${c.iva ? "IVA (21 %) incluido" : "Régimen REBU · IVA incluido"} · cambio de nombre incluido</small>
          ${c.cuota ? `<div class="fin-card"><div><small>Financiado${c.financiado ? ` · ${eur(c.financiado)}` : ""}</small><br><strong>${eur(c.cuota)}/mes</strong> <small>en ${c.meses} meses</small></div><a href="financiacion.html?id=${c.id}">Calcular →</a></div>` : ""}
        </div>
        <div class="actions">
          ${c.reservado ? '<div class="note">Este coche ya está reservado. Escríbenos y te avisamos si queda libre o te buscamos uno parecido.</div>' : ""}
          <button class="btn red block" id="interesa">Me interesa</button>
          <div class="two">
            <a class="btn wa" href="${waLink(msg)}" target="_blank" rel="noopener">${I.wa}WhatsApp</a>
            <a class="btn ghost" href="${NEGOCIO.telHref}">${I.phone}Llamar</a>
          </div>
        </div>
      </div>
      ${c.reserva && !c.reservado ? `<div class="reserve"><span style="color:var(--red)">${I.key.replace("<svg", '<svg width="26" height="26"')}</span><div><b>Resérvalo por ${eur(c.reserva)}</b>Te lo guardamos hasta que vengas a verlo.</div>
        <a class="btn dark sm" href="#" style="margin-left:auto" data-demo="En la web real, el cliente paga la señal online y el coche queda reservado a su nombre.">Reservar</a></div>` : ""}
      <div class="box included">
        <div>${I.shield}Garantía${c.ficha["Garantía"] ? ` de ${esc(c.ficha["Garantía"])}` : ""} incluida</div>
        <div>${I.doc}Cambio de nombre incluido</div>
        <div>${I.tag}Aceptamos tu coche como parte del pago</div>
        <div>${I.truck}Entrega a domicilio (consulta condiciones)</div>
      </div>`;

    const basicos = [["Año", c.anio], ["Kilómetros", `${miles(c.km)} km`], ["Combustible", c.combustible], ["Cambio", c.cambio],
      ["Potencia", c.cv ? `${c.cv} CV` : ""], ["Carrocería", c.carroceria], ["Puertas", c.puertas], ["Plazas", c.plazas],
      ["Color", c.color], ["Etiqueta DGT", c.etiqueta && (c.etiqueta.startsWith("0") ? "CERO" : c.etiqueta)]].filter(x => x[1]);
    const tecnica = Object.entries(c.ficha).filter(([k]) => !["Garantía", "Plazas"].includes(k));
    $("#info").innerHTML = `
      <div class="box"><h2>Datos básicos</h2><div class="specs">${basicos.map(([k, v]) => `<div class="spec"><small>${k}</small><b>${esc(v)}</b></div>`).join("")}</div></div>
      ${c.detalle ? `<div class="box"><h2>Sobre este coche</h2><p>${esc(c.detalle)}</p></div>` : ""}
      ${c.equipamiento.length ? `<div class="box"><h2>Equipamiento destacado</h2><ul class="equip">${c.equipamiento.map(e => `<li>${esc(e)}</li>`).join("")}</ul></div>` : ""}
      ${tecnica.length ? `<div class="box"><h2>Ficha técnica</h2><table class="tech">${tecnica.map(([k, v]) => `<tr><td class="muted">${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}</table></div>` : ""}
      <div class="box" style="background:var(--ink);color:#fff;border:0"><h2>¿Tienes un coche para entregar?</h2><p style="color:#c3c7cd;margin-bottom:20px">Te lo tasamos sin compromiso y descontamos su valor del precio de este.</p><a class="btn red" href="tasacion.html">Tasar mi coche</a></div>`;

    // En el móvil, el WhatsApp de la barra fija también pregunta por este coche
    $$(".mbar .wa, .nav .wa").forEach(a => a.href = waLink(msg));

    const parecidos = COCHES.filter(x => x.id !== c.id && !x.reservado)
      .sort((a, b) => (b.carroceria === c.carroceria) - (a.carroceria === c.carroceria) || Math.abs(a.contado - c.contado) - Math.abs(b.contado - c.contado))
      .slice(0, 3);
    $("#parecidos").innerHTML = parecidos.map(tarjeta).join("");

    // Formulario «Me interesa»
    const modal = $("#modal");
    $("#m-coche").textContent = `${nombre(c)} · ${c.anio} · ${eur(c.contado)}`;
    $("#interesa").addEventListener("click", () => { modal.classList.add("on"); $("input", modal).focus(); });
    $(".x", modal).addEventListener("click", () => modal.classList.remove("on"));
    modal.addEventListener("click", e => { if (e.target === modal) modal.classList.remove("on"); });
  }

  // ---------- Tasación por pasos ----------
  function tasacion() {
    const f = $("#tasa");
    const pasos = $$(".step", f), marcas = $$(".steps div");
    let p = 0;
    const mostrar = i => {
      p = i;
      pasos.forEach((s, k) => s.classList.toggle("on", k === p));
      marcas.forEach((m, k) => m.classList.toggle("on", k <= p));
      f.closest(".panel").scrollIntoView({ block: "start", behavior: "smooth" });
    };
    $$("[data-next]", f).forEach(b => b.addEventListener("click", () => {
      const campos = $$("input, select, textarea", pasos[p]);
      if (campos.every(c => c.reportValidity())) {
        if (p === 2) resumen();
        mostrar(p + 1);
      }
    }));
    $$("[data-prev]", f).forEach(b => b.addEventListener("click", () => mostrar(p - 1)));
    const fotos = $("#fotos"), prev = $("#previews");
    fotos.addEventListener("change", () => {
      prev.innerHTML = "";
      [...fotos.files].slice(0, 12).forEach(file => {
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.alt = file.name;
        prev.append(img);
      });
      $("#n-fotos").textContent = fotos.files.length ? `${fotos.files.length} ${fotos.files.length === 1 ? "foto" : "fotos"} añadidas` : "";
    });
    function resumen() {
      const d = Object.fromEntries(new FormData(f));
      $("#resumen").innerHTML = `<table class="tech">
        <tr><td class="muted">Coche</td><td>${esc(d.marca)} ${esc(d.modelo)} · ${esc(d.anio)}</td></tr>
        <tr><td class="muted">Kilómetros</td><td>${miles(+d.km || 0)} km</td></tr>
        <tr><td class="muted">Combustible / cambio</td><td>${esc(d.combustible)} · ${esc(d.cambio)}</td></tr>
        <tr><td class="muted">Estado</td><td>${esc(d.estado)}</td></tr>
        <tr><td class="muted">Fotos</td><td>${fotos.files.length || "Sin fotos"}</td></tr>
        <tr><td class="muted">Contacto</td><td>${esc(d.nombre)} · ${esc(d.telefono)}</td></tr></table>`;
    }
  }

  // ---------- Calculadora de financiación ----------
  function financiacion() {
    const s = $("#c-coche"), imp = $("#c-importe"), ent = $("#c-entrada"), out = $("#c-out");
    function coche() { return COCHES.find(c => c.id === s.value); }
    function precio() {
      const c = coche();
      if (c) { imp.value = c.contado; imp.disabled = true; } else imp.disabled = false;
      calcular();
    }
    function calcular() {
      const total = Math.max(+imp.value || 0, 0);
      ent.max = Math.round(total * .5 / 100) * 100;
      if (+ent.value > +ent.max) ent.value = ent.max;
      const entrada = +ent.value, P = Math.max(total - entrada, 0);
      const n = +($('input[name="plazo"]:checked').value), r = TIN_EJEMPLO / 100 / 12;
      const q = P ? P * r / (1 - (1 + r) ** -n) : 0;
      $("#o-entrada").textContent = entrada ? eur(entrada) : "Sin entrada";
      out.innerHTML = `
        <div><span class="eyebrow" style="color:#ff6b62">Tu cuota orientativa</span><div class="q">${eur(q)}<small> /mes</small></div></div>
        <dl><dt>Precio del coche</dt><dd>${eur(total)}</dd><dt>Entrada</dt><dd>${eur(entrada)}</dd><dt>Importe a financiar</dt><dd>${eur(P)}</dd>
        <dt>Plazo</dt><dd>${n} meses</dd><dt>TIN de ejemplo</dt><dd>${TIN_EJEMPLO.toString().replace(".", ",")} %</dd><dt>Total en cuotas</dt><dd>${eur(q * n)}</dd></dl>
        <p class="muted" style="font-size:13px">Cálculo orientativo. La cuota y el tipo de interés finales los fija la entidad financiera tras estudiar tu caso.</p>
        <a class="btn red" href="#estudio">Pedir mi estudio gratis</a>`;
    }
    s.addEventListener("change", precio);
    [imp, ent].forEach(e => e.addEventListener("input", calcular));
    $$('input[name="plazo"]').forEach(e => e.addEventListener("change", calcular));
    precio();
  }

  // ---------- Arranque ----------
  cabecera();
  pie();
  visita();
  formularios();
  ({ inicio, stock, coche: cocheDetalle, tasacion, financiacion }[pagina] || (() => {}))();
  aparecer();
  // Iconos declarados en el HTML: <i data-i="phone"></i>
  $$("i[data-i]").forEach(e => e.outerHTML = I[e.dataset.i] || "");
})();
