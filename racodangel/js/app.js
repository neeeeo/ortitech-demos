// Demo Racó d'Àngel — OrtiTech. Todo es local: no se guarda ni se envía nada.

// Horario real (ficha de Google): 0 = domingo
const HOURS = {
  1: [["07:00", "17:00"]], 2: [["07:00", "17:00"]], 3: [["07:00", "24:00"]], 4: [["07:00", "24:00"]],
  5: [["07:00", "24:00"]], 6: [["09:00", "17:00"]], 0: [],
};
const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const LUNCH = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
const DINNER = ["20:30", "21:00", "21:30", "22:00", "22:30"];
const hasDinner = d => [3, 4, 5].includes(d);

const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// ---------------------------------------------------------------- avisos de demo
const toast = $("#toast");
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
$$("[data-demo]").forEach(el => el.addEventListener("click", e => { e.preventDefault(); showToast(el.dataset.demo); }));

// ---------------------------------------------------------------- horario
function fmtRange([a, b]) { return `${a.replace(":00", "")}–${b === "24:00" ? "00" : b.replace(":00", "")} h`; }
(function hours() {
  const now = new Date(), d = now.getDay(), ranges = HOURS[d];
  const hhmm = now.toTimeString().slice(0, 5);
  const open = ranges.some(([a, b]) => hhmm >= a && hhmm < b);
  $("#hoy").innerHTML = ranges.length
    ? `<span class="${open ? "open" : "closed"}">${open ? "Abierto ahora" : "Cerrado ahora"}</span> · ${ranges.map(fmtRange).join(", ")}`
    : `<span class="closed">Hoy cerrado</span>`;
  const order = [1, 2, 3, 4, 5, 6, 0];
  $("#hours").innerHTML = order.map(i => `<tr class="${i === d ? "today" : ""}"><td>${DAY_NAMES[i][0].toUpperCase() + DAY_NAMES[i].slice(1)}</td>
    <td>${HOURS[i].length ? HOURS[i].map(fmtRange).join(", ") : "Cerrado"}</td></tr>`).join("");
})();

// ---------------------------------------------------------------- carta (precios de su web)
const CARTA = {
  "Tapas y entrantes": [
    ["Croquetas de rustido o de la semana", "1,50 €/ud"], ["Las bravas del Racó", "5,50 €"],
    ["La rusa del Racó", "7,50 €"], ["Torreznos fritos al momento", "8,95 €"],
    ["Brie trufado al horno con tostadas", "9,50 €"], ["Soldaditos de pollo con mostaza y miel", "9,50 €"],
    ["Huevos rotos con ibérico y patatas", "12,90 €"], ["Habitas con huevo e ibérico", "12,90 €"],
    ["Canelón de pato y foie trufado", "12,90 €"], ["Chipirones a la andaluza", "12,90 €"],
    ["Pulpo gallego con parmentier", "18,90 €", "Nuevo"], ["Arroz del Racó (según disponibilidad)", "S/M"],
  ],
  "Carnes y pescados": [
    ["Butifarra de Girona con guarnición", "9,50 €"], ["Chipirones a la plancha o a la andaluza", "12,90 €"],
    ["Hamburguesa de wagyu con patatas", "16,95 €"], ["Steak tartar con tostadas", "16,90 €"],
    ["Entrecot de ternera a la plancha", "18,90 €"],
  ],
  "Ensaladas": [
    ["Ensalada completa con atún y huevo duro", "9,50 €"], ["Mozzarella con tomate", "9,90 €"],
    ["Queso de cabra con mermelada de tomate", "9,90 €"], ["Burrata con albahaca y AOVE", "10,90 €"],
    ["Tomate con ventresca", "13,90 €"], ["Pan tostado o con tomate", "2,50 €"],
  ],
  "Fuera de carta": [
    ["Huevo crujiente trufado", "3,75 €"], ["Ostras frescas nº 3 (unidad)", "3,75 €"],
    ["Cazuelita de sobrasada Xesc Reina con miel", "9,95 €"], ["Salmón marinado en casa", "11,90 €"],
    ["Ensaladilla rusa con huevo y trufa", "11,90 €"], ["Zamburiñas a la plancha", "16,95 €"],
    ["Tallarinas frescas a la plancha", "17,50 €"], ["Cochinillo crujiente con mahonesa de mostaza", "18,90 €"],
    ["Tortilla abierta de gambas rojas", "18,95 €"], ["Rubia gallega en carpaccio", "24,50 €"],
    ["Gambas rojas frescas salteadas", "24,90 €"], ["T-bone o chuletón de ternera (½ kg)", "34,90 €"],
  ],
};
function renderTab(name) {
  $$(".tab").forEach(t => t.classList.toggle("sel", t.textContent === name));
  $("#dishes").innerHTML = CARTA[name].map(([n, p, tag]) =>
    `<div class="dish"><span>${n}${tag ? `<em>${tag}</em>` : ""}</span><b>${p}</b></div>`).join("");
}
$("#tabs").innerHTML = Object.keys(CARTA).map(n => `<button class="tab">${n}</button>`).join("");
$$(".tab").forEach(t => t.addEventListener("click", () => renderTab(t.textContent)));
renderTab("Tapas y entrantes");

// ---------------------------------------------------------------- reserva (simulada)
const state = { people: null, date: null, time: null };
let step = 1;

function go(n) {
  step = n;
  $$(".step").forEach(s => s.hidden = Number(s.dataset.step) !== n);
  $$(".steps i").forEach((b, i) => b.classList.toggle("on", i < Math.min(n, 4)));
  if (n === 3) renderSlots();
  if (n === 4) renderSummary();
}
function enableNext() { $(`.step[data-step="${step}"] [data-next]`).disabled = false; }
$$("[data-next]").forEach(b => b.addEventListener("click", () => go(step + 1)));
$$("[data-back]").forEach(b => b.addEventListener("click", () => go(step - 1)));

// Comensales
$("#people").innerHTML = [1, 2, 3, 4, 5, 6, 7, 8].map(n => `<button class="chip" data-p="${n}">${n}</button>`).join("")
  + `<button class="chip" data-p="9">+8</button>`;
$$("#people .chip").forEach(c => c.addEventListener("click", () => {
  if (c.dataset.p === "9") { showToast("Para más de 8, en la web real se abre el formulario de grupos."); return; }
  $$("#people .chip").forEach(x => x.classList.remove("sel"));
  c.classList.add("sel"); state.people = Number(c.dataset.p); enableNext();
}));

// Días: próximas 2 semanas (domingo cerrado)
(function dates() {
  const out = [], today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today); d.setDate(today.getDate() + i);
    const closed = HOURS[d.getDay()].length === 0;
    const label = i === 0 ? "Hoy" : i === 1 ? "Mañana" : DAY_NAMES[d.getDay()].slice(0, 3);
    out.push(`<button class="chip" ${closed ? "disabled" : ""} data-d="${iso(d)}">
      <small>${label}</small><b>${d.getDate()}</b><small>${d.toLocaleDateString("es-ES", { month: "short" })}</small></button>`);
  }
  $("#dates").innerHTML = out.join("");
  $$("#dates .chip").forEach(c => c.addEventListener("click", () => {
    $$("#dates .chip").forEach(x => x.classList.remove("sel"));
    c.classList.add("sel"); state.date = c.dataset.d; state.time = null; enableNext();
  }));
})();

// Horas: algunas aparecen completas (determinista por fecha) para que se vea el control de aforo
function busy(date, time) {
  let h = 0; for (const ch of date + time) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return h % 5 === 0;
}
function renderSlots() {
  const d = new Date(state.date + "T12:00").getDay();
  const now = new Date(), isToday = state.date === iso(now), hhmm = now.toTimeString().slice(0, 5);
  const block = (label, times) => `<div class="turno">${label}</div><div class="chips">` + times.map(t => {
    const off = busy(state.date, t) || (isToday && t <= hhmm);
    return `<button class="chip ${state.time === t ? "sel" : ""}" ${off ? "disabled" : ""} data-t="${t}">${t}</button>`;
  }).join("") + "</div>";
  $("#slots").innerHTML = block("Comida", LUNCH) +
    (hasDinner(d) ? block("Cena", DINNER) : `<div class="turno">Cena</div><p class="note" style="text-align:left;margin:0">Cenas de miércoles a viernes.</p>`);
  $$("#slots .chip").forEach(c => c.addEventListener("click", () => {
    $$("#slots .chip").forEach(x => x.classList.remove("sel"));
    c.classList.add("sel"); state.time = c.dataset.t; enableNext();
  }));
  $('.step[data-step="3"] [data-next]').disabled = !state.time;
}
function longDate() {
  return new Date(state.date + "T12:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });
}
function renderSummary() {
  $("#summary").innerHTML = `<b>${state.people} ${state.people === 1 ? "persona" : "personas"}</b> · ${longDate()} · <b>${state.time} h</b>`;
}
$("#confirm").addEventListener("click", () => {
  const name = $("#n").value.trim() || "Ana";
  const terr = $("#terraza").checked ? " en terraza" : "";
  $("#done-text").innerHTML = `${name}, os esperamos el <b>${longDate()}</b> a las <b>${state.time} h</b>${terr} (${state.people} ${state.people === 1 ? "persona" : "personas"}).`;
  $("#wa").innerHTML = `<small>Así llegaría el WhatsApp de confirmación:</small><br>
    ✅ <b>Racó d’Àngel</b>: ¡Hola, ${name}! Tu mesa para ${state.people} está confirmada el ${longDate()} a las ${state.time} h.
    Te lo recordaremos el día antes. ¿Cambio de planes? Responde <b>CANCELAR</b>.`;
  go(5);
});
$("#again").addEventListener("click", () => {
  Object.assign(state, { people: null, date: null, time: null });
  $$(".chip.sel").forEach(c => c.classList.remove("sel"));
  $$("[data-next]").forEach(b => b.disabled = true);
  go(1);
});
