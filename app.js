const consoles = {
  XR18: { label: "Behringer X18 / XR18", fx: 4 },
  MR18: { label: "Midas MR18", fx: 4 },
  X32: { label: "Behringer X32 / M32", fx: 8 },
  UI24: { label: "Soundcraft Ui24R", fx: 4 },
  CQ18: { label: "Allen & Heath CQ18T", fx: 4 }
};

const STORAGE_KEY = "pedal2patch-state-v1";
const defaultState = {
  page: "home",
  lang: "FR",
  pedals: ["Tuner", "Overdrive / Distortion", "Modulation", "Delay", "Reverb"],
  mode: "Live",
  photo: null,
  channelName: "Guitare",
  console: "XR18"
};

let state = loadState();
let lastPatch = null;

const $ = (selector) => document.querySelector(selector);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return { ...defaultState, ...(saved || {}) };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      page: "home",
      photo: state.photo ? { name: state.photo.name, type: state.photo.type } : null
    }));
  } catch {
    // Private browsing or storage restrictions should not break the app.
  }
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 2600);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function currentConsole() {
  const key = state.console || ($("#console") && $("#console").value) || "XR18";
  return consoles[key] || consoles.XR18;
}

function collectFormState() {
  const consoleSelect = $("#console");
  const channel = $("#channelName");
  if (consoleSelect) state.console = consoleSelect.value;
  if (channel) state.channelName = channel.value || "Guitare";
  saveState();
}

function patchData() {
  collectFormState();
  const consoleKey = state.console;
  const consoleInfo = currentConsole();
  const hp = state.mode === "Live" ? 90 : state.mode === "Fidèle" ? 65 : 75;
  return {
    app: "Pedal2Patch",
    version: "1.0.0",
    copyright: "© Cédric Carboni - 2026",
    console: consoleKey,
    consoleLabel: consoleInfo.label,
    channel: state.channelName || "Guitare",
    mode: state.mode,
    pedals: [...state.pedals],
    phantom: false,
    hpf: hp,
    lpf: 18000,
    eq: "Coupe boue 250 Hz, présence +2 dB vers 3 kHz",
    dynamics: "Compression légère 3:1, attaque moyenne",
    fxBuses: consoleInfo.fx,
    generatedAt: new Date().toISOString()
  };
}

function renderPedals() {
  const box = $("#pedals");
  if (!box) return;
  box.innerHTML = state.pedals.map((pedal, index) => `
    <div class="pedal">
      <span class="pill">${index + 1}</span>
      <input value="${escapeHtml(pedal)}" data-pedal="${index}" aria-label="Pédale ${index + 1}">
      <button class="chip" data-remove="${index}" aria-label="Supprimer ${escapeHtml(pedal)}">×</button>
    </div>
  `).join("");
}

function renderPhoto() {
  const photo = $("#photo");
  if (!photo) return;
  const drop = photo.closest(".drop");
  if (!drop) return;

  let preview = drop.querySelector(".photo-preview");
  if (!preview) {
    preview = document.createElement("div");
    preview.className = "photo-preview muted";
    preview.style.marginTop = "10px";
    drop.append(preview);
  }

  if (!state.photo) {
    preview.textContent = "Aucune photo importée.";
    return;
  }

  preview.textContent = `Photo importée : ${state.photo.name}. Vérification manuelle requise avant validation.`;
}

function renderPatch() {
  const out = $("#patchOutput");
  if (!out) return;

  const data = patchData();
  lastPatch = data;

  out.innerHTML = `
    <div class="result">
      <h3>Patch prêt — ${escapeHtml(data.consoleLabel)}</h3>
      <p><b>Canal :</b> ${escapeHtml(data.channel)}</p>
      <p><b>Trim :</b> +18 dB recommandé · <b>48V :</b> OFF</p>
      <p><b>HPF :</b> ${data.hpf} Hz · <b>LPF :</b> 18 kHz</p>
      <p><b>EQ :</b> ${escapeHtml(data.eq)}</p>
      <p><b>Dynamics :</b> ${escapeHtml(data.dynamics)}</p>
      <p><b>FX :</b> buses disponibles ${data.fxBuses}</p>
      <p><b>Chaîne :</b> ${data.pedals.map(escapeHtml).join(" → ")}</p>
      <p class="muted">Mode ${escapeHtml(data.mode)} : réglages de départ pédagogiques, à valider à l'écoute.</p>
    </div>`;
}

function renderRegie() {
  const out = $("#patchOutputRegie");
  if (!out) return;
  const data = lastPatch || patchData();
  out.innerHTML = `
    <div class="result">
      <p><b>Canal :</b> ${escapeHtml(data.channel)}</p>
      <p><b>Console :</b> ${escapeHtml(data.consoleLabel)}</p>
      <p><b>Chaîne :</b> ${data.pedals.map(escapeHtml).join(" → ")}</p>
      <p><b>Mode :</b> ${escapeHtml(data.mode)}</p>
      <p><b>48V :</b> OFF</p>
      <p><b>HPF / LPF :</b> ${data.hpf} Hz / 18 kHz</p>
      <p class="muted">Réglages de départ à valider à l'écoute.</p>
    </div>`;
}

function render() {
  collectFormState();
  document.querySelectorAll("[data-page]").forEach((element) => {
    element.classList.toggle("hidden", element.dataset.page !== state.page);
  });
  document.querySelectorAll(".navbtn").forEach((element) => {
    element.classList.toggle("active", element.dataset.goto === state.page);
  });

  const consoleSelect = $("#console");
  const channel = $("#channelName");
  if (consoleSelect) consoleSelect.value = state.console;
  if (channel) channel.value = state.channelName;

  renderPedals();
  renderPhoto();
  renderPatch();
  renderRegie();
}

function addPedal() {
  state.pedals.push("Nouvelle pédale");
  saveState();
  renderPedals();
}

function removePedal(index) {
  if (state.pedals.length <= 1) {
    toast("Conserve au moins une pédale dans la chaîne.");
    return;
  }
  state.pedals.splice(index, 1);
  saveState();
  render();
}

function analyse() {
  collectFormState();
  lastPatch = patchData();
  state.page = "patch";
  saveState();
  render();
  toast("Analyse terminée : patch pédagogique généré.");
}

function exportPatch() {
  const payload = lastPatch || patchData();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "pedal2patch.json";
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Patch JSON exporté.");
}

function buildRegieText() {
  const data = lastPatch || patchData();
  return [
    "PEDAL2PATCH — FICHE RÉGIE / FOH",
    `Canal : ${data.channel}`,
    `Console : ${data.consoleLabel}`,
    `Chaîne : ${data.pedals.join(" → ")}`,
    `Mode : ${data.mode}`,
    "48V : OFF",
    `HPF / LPF : ${data.hpf} Hz / 18 kHz`,
    "",
    "Généré par Pedal2Patch © Cédric Carboni - 2026"
  ].join("\\n");
}

async function regie() {
  collectFormState();
  const text = buildRegieText();
  renderRegie();
  try {
    await navigator.clipboard.writeText(text);
    toast("Fiche régie copiée.");
  } catch {
    toast("Fiche régie générée. Copie manuelle disponible.");
  }
  state.page = "regie";
  saveState();
  render();
}

function tap() {
  const now = performance.now();
  window.__tap = (window.__tap || []).slice(-4);
  if (window.__tap.length) {
    const delta = now - window.__tap[window.__tap.length - 1];
    if (delta > 150 && delta < 3000) {
      const bpm = Math.round(60000 / delta);
      if ($("#bpm")) $("#bpm").textContent = `${Math.min(240, Math.max(30, bpm))} BPM`;
    }
  }
  window.__tap.push(now);
}

function power() {
  const values = [...document.querySelectorAll("[data-ma]")].map((input) => Number(input.value) || 0);
  const total = values.reduce((sum, value) => sum + value, 0);
  if ($("#maTotal")) $("#maTotal").textContent = `${total} mA`;
}

function handlePhoto(file) {
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    toast("Choisis une image de pedalboard.");
    return;
  }
  state.photo = { name: file.name, type: file.type };
  renderPhoto();
  saveState();
  toast("Photo importée. La reconnaissance reste à confirmer manuellement.");
}

document.addEventListener("click", (event) => {
  const goto = event.target.closest("[data-goto]");
  if (goto) {
    state.page = goto.dataset.goto;
    saveState();
    render();
    return;
  }

  const remove = event.target.closest("[data-remove]");
  if (remove) {
    removePedal(Number(remove.dataset.remove));
    return;
  }

  if (event.target.matches("[data-add]")) return addPedal();
  if (event.target.matches("[data-analyse]")) return analyse();
  if (event.target.matches("[data-export]")) return exportPatch();
  if (event.target.matches("[data-regie]")) return regie();
  if (event.target.matches("[data-tap]")) return tap();
  if (event.target.matches("[data-power]")) return power();

  if (event.target.matches("[data-mode]")) {
    state.mode = event.target.dataset.mode;
    document.querySelectorAll("[data-mode]").forEach((button) => {
      button.classList.toggle("primary", button === event.target);
    });
    saveState();
    renderPatch();
    return;
  }

  if (event.target.matches("[data-demo]")) {
    state.pedals = ["Tuner", "Tube Screamer", "Digital Delay", "Plate Reverb"];
    state.mode = "Live";
    saveState();
    render();
    toast("Preset démo chargé.");
    return;
  }

  if (event.target.matches("[data-lang]")) {
    state.lang = state.lang === "FR" ? "EN" : "FR";
    event.target.textContent = state.lang;
    toast(state.lang === "EN" ? "English interface selected" : "Interface française sélectionnée");
  }
});

document.addEventListener("input", (event) => {
  if (event.target.dataset.pedal != null) {
    state.pedals[Number(event.target.dataset.pedal)] = event.target.value;
    saveState();
    renderPatch();
    return;
  }

  if (event.target.id === "console") {
    state.console = event.target.value;
    saveState();
    renderPatch();
    return;
  }

  if (event.target.id === "channelName") {
    state.channelName = event.target.value || "Guitare";
    saveState();
    renderPatch();
  }
});

document.addEventListener("change", (event) => {
  if (event.target.id === "photo") handlePhoto(event.target.files?.[0]);
});

window.addEventListener("load", () => {
  render();
  const serviceWorker = "serviceWorker" in navigator;
  if (serviceWorker) navigator.serviceWorker.register("./sw.js").catch(() => {});
});
