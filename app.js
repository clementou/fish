const $ = (sel) => document.querySelector(sel);
const byId = (id) => TINS.find((t) => t.id === id);
function fishParts(f, b, { rx = 34, ry = 13, cx = 54, cy = 30, fin = true, spots = 0, stripes = 0, tail = true } = {}) {
  const tailX = cx + rx - 2;
  let s = "";
  if (tail) s += `<polygon points="${tailX},${cy} ${tailX + 24},${cy - 13} ${tailX + 18},${cy} ${tailX + 24},${cy + 13}" fill="${f}"/>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"/>`;
  if (fin) s += `<polygon points="${cx - 8},${cy - ry + 1} ${cx + 2},${cy - ry - 9} ${cx + 10},${cy - ry + 1}" fill="${f}"/>`;
  for (let i = 0; i < stripes; i++) {
    const x = cx - 6 + i * 13;
    s += `<path d="M${x} ${cy - ry + 2} L${x - 3} ${cy + ry - 2}" stroke="${b}" stroke-width="3.4" stroke-linecap="round" opacity="0.85"/>`;
  }
  const spotPos = [[cx - 2, cy - 6], [cx + 12, cy], [cx + 2, cy + 7], [cx + 20, cy - 7]];
  for (let i = 0; i < spots; i++) {
    s += `<circle cx="${spotPos[i][0]}" cy="${spotPos[i][1]}" r="2" fill="${b}" opacity="0.8"/>`;
  }
  s += `<circle cx="${cx - rx + 10}" cy="${cy - 3.5}" r="2.6" fill="${b}"/>`;
  return s;
}

const ART = {
  sardine: (f, b) => fishParts(f, b),
  anchovy: (f, b) => fishParts(f, b, { rx: 42, ry: 7.5, cx: 52, fin: false }),
  mackerel: (f, b) => fishParts(f, b, { stripes: 3 }),
  herring: (f, b) => fishParts(f, b, { rx: 36, ry: 11, cx: 55 }),
  clam: (f, b) =>
    `<path d="M60 14 A26 24 0 0 1 86 44 L34 44 A26 24 0 0 1 60 14 Z" fill="${f}"/>` +
    `<rect x="53" y="42" width="14" height="6" rx="3" fill="${f}"/>` +
    `<g stroke="${b}" stroke-width="2" opacity="0.7" fill="none"><path d="M42 34 q18 -10 36 0"/><path d="M48 26 q12 -6 24 0"/></g>`,
  tuna: (f, b) =>
    `<path d="M84 30 Q98 19 110 15 Q101 30 110 45 Q98 41 84 30 Z" fill="${f}"/>` +
    fishParts(f, b, { rx: 30, ry: 16, cx: 52, fin: true, tail: false }) +
    `<path d="M80 20 l5 -4 M80 40 l5 4 M86 23 l5 -4 M86 37 l5 4" stroke="${f}" stroke-width="2.6" stroke-linecap="round"/>`,
  salmon: (f, b) => fishParts(f, b, { spots: 4 }),
  trout: (f, b) => fishParts(f, b, { ry: 10, spots: 4 }),
  sprat: (f, b) => `<g transform="translate(60 30) scale(0.72) translate(-60 -30)">${fishParts(f, b)}</g>`,
  cod: (f, b) =>
    fishParts(f, b, { rx: 32, ry: 14, cx: 52 }) +
    `<path d="M26 39 q2 5 6 6" stroke="${f}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
  garfish: (f, b) =>
    `<polygon points="18,28.6 0,26 0,34 18,31.4" fill="${f}"/>` +
    `<polygon points="100,30 114,23 110,30 114,37" fill="${f}"/>` +
    `<ellipse cx="58" cy="30" rx="44" ry="5.5" fill="${f}"/>` +
    `<circle cx="24" cy="28" r="2" fill="${b}"/>`,
  octopus: (f, b) =>
    `<g stroke="${f}" stroke-width="5.5" stroke-linecap="round" fill="none">` +
    `<path d="M36 34 q-8 8 -18 10"/><path d="M42 38 q-4 10 -12 14"/><path d="M52 39 q0 12 -4 17"/>` +
    `<path d="M60 37 q6 10 14 12"/><path d="M64 32 q10 4 16 2"/></g>` +
    `<circle cx="48" cy="24" r="15" fill="${f}"/>` +
    `<circle cx="42" cy="21" r="2.6" fill="${b}"/><circle cx="53" cy="21" r="2.6" fill="${b}"/>`,
  squid: (f, b) =>
    `<polygon points="16,30 6,21 9,30 6,39" fill="${f}"/>` +
    `<path d="M16 30 L44 13 Q56 30 44 47 Z" fill="${f}"/>` +
    `<g stroke="${f}" stroke-width="4.5" stroke-linecap="round" fill="none">` +
    `<path d="M47 24 q10 -2 17 -7"/><path d="M48 30 h17"/><path d="M47 36 q10 2 17 7"/></g>` +
    `<circle cx="36" cy="27" r="2.4" fill="${b}"/>`,
  mussel: (f, b) =>
    `<path d="M34 12 Q58 18 56 34 Q53 50 30 47 Q12 44 15 28 Q18 14 34 12 Z" fill="${f}" transform="translate(14 0)"/>` +
    `<g stroke="${b}" stroke-width="2.4" fill="none" opacity="0.7" transform="translate(14 0)">` +
    `<path d="M30 18 q10 10 8 26"/><path d="M40 16 q12 12 9 28"/><path d="M22 24 q6 8 5 18"/></g>`,
  cockle: (f, b) =>
    `<path d="M38 46 A22 22 0 0 1 82 46 Z" fill="${f}"/>` +
    `<rect x="54" y="45" width="12" height="6" rx="2.5" fill="${f}"/>` +
    `<g stroke="${b}" stroke-width="2" opacity="0.8"><path d="M60 45 L42 32"/><path d="M60 45 L48 26"/><path d="M60 45 L60 24"/><path d="M60 45 L72 26"/><path d="M60 45 L78 32"/></g>`,
  razorclam: (f, b) =>
    `<g transform="rotate(-4 60 30)"><rect x="14" y="23" width="92" height="14" rx="7" fill="${f}"/>` +
    `<path d="M24 28 h72 M24 33 h72" stroke="${b}" stroke-width="1.8" opacity="0.6"/></g>`,
  scallop: (f, b) =>
    `<path d="M60 12 A27 27 0 0 1 87 44 L74 44 L74 51 L66 51 L66 44 L54 44 L54 51 L46 51 L46 44 L33 44 A27 27 0 0 1 60 12 Z" fill="${f}"/>` +
    `<g stroke="${b}" stroke-width="2" opacity="0.8"><path d="M60 43 L40 30"/><path d="M60 43 L48 22"/><path d="M60 43 L60 18"/><path d="M60 43 L72 22"/><path d="M60 43 L80 30"/></g>`,
  oyster: (f, b) =>
    `<path d="M30 16 Q44 8 56 16 Q72 14 76 26 Q84 36 72 44 Q60 52 46 47 Q30 50 24 38 Q16 26 30 16 Z" fill="${f}"/>` +
    `<path d="M38 24 q14 -6 26 2 q-4 12 -16 12 q-12 -2 -10 -14 Z" fill="${b}" opacity="0.55"/>`,
  urchin: (f, b) => {
    let s = "";
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const x1 = 60 + Math.cos(a) * 12, y1 = 30 + Math.sin(a) * 12;
      const x2 = 60 + Math.cos(a) * 24, y2 = 30 + Math.sin(a) * 24;
      s += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${f}" stroke-width="3.4" stroke-linecap="round"/>`;
    }
    s += `<circle cx="60" cy="30" r="13" fill="${f}"/>`;
    s += `<circle cx="55" cy="26" r="1.7" fill="${b}"/><circle cx="65" cy="28" r="1.7" fill="${b}"/><circle cx="59" cy="35" r="1.7" fill="${b}"/>`;
    return s;
  },
  eel: (f, b) =>
    `<path d="M14 40 C 26 20, 38 52, 50 34 S 72 18, 84 30 S 100 46, 110 30" stroke="${f}" stroke-width="6.5" fill="none" stroke-linecap="round"/>` +
    `<circle cx="14" cy="40" r="5.5" fill="${f}"/>` +
    `<circle cx="12" cy="38" r="1.5" fill="${b}"/>`,
};
const FLAGS = {
  PT: `<rect width="24" height="16" fill="#DA291C"/><rect width="9.6" height="16" fill="#046A38"/><circle cx="9.6" cy="8" r="1.9" fill="#FFE900"/>`,
  ES: `<rect width="24" height="16" fill="#F1BF00"/><rect width="24" height="4" fill="#AA151B"/><rect y="12" width="24" height="4" fill="#AA151B"/>`,
  FR: `<rect width="8" height="16" fill="#0055A4"/><rect x="8" width="8" height="16" fill="#FFFFFF"/><rect x="16" width="8" height="16" fill="#EF4135"/>`,
  IT: `<rect width="8" height="16" fill="#009246"/><rect x="8" width="8" height="16" fill="#FFFFFF"/><rect x="16" width="8" height="16" fill="#CE2B37"/>`,
  DK: `<rect width="24" height="16" fill="#C8102E"/><rect x="7" width="3.2" height="16" fill="#FFFFFF"/><rect y="6.4" width="24" height="3.2" fill="#FFFFFF"/>`,
  NO: `<rect width="24" height="16" fill="#BA0C2F"/><rect x="6" width="5" height="16" fill="#FFFFFF"/><rect y="5.5" width="24" height="5" fill="#FFFFFF"/><rect x="7.5" width="2" height="16" fill="#00205B"/><rect y="7" width="24" height="2" fill="#00205B"/>`,
  IS: `<rect width="24" height="16" fill="#02529C"/><rect x="6" width="5" height="16" fill="#FFFFFF"/><rect y="5.5" width="24" height="5" fill="#FFFFFF"/><rect x="7.5" width="2" height="16" fill="#DC1E35"/><rect y="7" width="24" height="2" fill="#DC1E35"/>`,
  UK: `<rect width="24" height="16" fill="#012169"/><path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" stroke-width="3.2"/><path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" stroke-width="1.1"/><rect x="10" width="4" height="16" fill="#FFFFFF"/><rect y="6" width="24" height="4" fill="#FFFFFF"/><rect x="10.9" width="2.2" height="16" fill="#C8102E"/><rect y="6.9" width="24" height="2.2" fill="#C8102E"/>`,
  US: `<rect width="24" height="16" fill="#FFFFFF"/><rect width="24" height="2.3" fill="#B22234"/><rect y="4.6" width="24" height="2.3" fill="#B22234"/><rect y="9.2" width="24" height="2.3" fill="#B22234"/><rect y="13.8" width="24" height="2.2" fill="#B22234"/><rect width="10" height="8.6" fill="#3C3B6E"/><circle cx="2.4" cy="2.4" r="0.7" fill="#fff"/><circle cx="5" cy="2.4" r="0.7" fill="#fff"/><circle cx="7.6" cy="2.4" r="0.7" fill="#fff"/><circle cx="3.7" cy="5" r="0.7" fill="#fff"/><circle cx="6.3" cy="5" r="0.7" fill="#fff"/><circle cx="2.4" cy="6.8" r="0.7" fill="#fff"/><circle cx="7.6" cy="6.8" r="0.7" fill="#fff"/>`,
  CA: `<rect width="6" height="16" fill="#D80621"/><rect x="6" width="12" height="16" fill="#FFFFFF"/><rect x="18" width="6" height="16" fill="#D80621"/><path d="M12 3.4 L12.9 5.2 L14.6 4.5 L14.2 6.4 L16.1 6.9 L14.7 8.4 L15.5 10.5 L13.4 10 L13 12.4 L11 12.4 L10.6 10 L8.5 10.5 L9.3 8.4 L7.9 6.9 L9.8 6.4 L9.4 4.5 L11.1 5.2 Z" fill="#D80621"/>`,
  JP: `<rect width="24" height="16" fill="#FFFFFF"/><circle cx="12" cy="8" r="4.6" fill="#BC002D"/>`,
  MA: `<rect width="24" height="16" fill="#C1272D"/><path d="M12 4.4 L13.1 7 L16.1 7.1 L13.9 9.1 L14.7 12 L12 10.3 L9.3 12 L10.1 9.1 L7.9 7.1 L10.9 7 Z" fill="#006233"/>`,
  DE: `<rect width="24" height="5.4" fill="#000000"/><rect y="5.3" width="24" height="5.4" fill="#DD0000"/><rect y="10.6" width="24" height="5.4" fill="#FFCE00"/>`,
  LV: `<rect width="24" height="16" fill="#9E3039"/><rect y="6.4" width="24" height="3.2" fill="#FFFFFF"/>`,
  GR: `<rect width="24" height="16" fill="#0D5EAF"/><rect y="1.8" width="24" height="1.8" fill="#fff"/><rect y="5.3" width="24" height="1.8" fill="#fff"/><rect y="8.9" width="24" height="1.8" fill="#fff"/><rect y="12.4" width="24" height="1.8" fill="#fff"/><rect width="8.9" height="8.9" fill="#0D5EAF"/><rect x="3.6" width="1.8" height="8.9" fill="#fff"/><rect y="3.6" width="8.9" height="1.8" fill="#fff"/>`,
  TR: `<rect width="24" height="16" fill="#E30A17"/><circle cx="9.5" cy="8" r="4" fill="#FFFFFF"/><circle cx="10.6" cy="8" r="3.3" fill="#E30A17"/><path d="M15.9 6.3 L16.4 7.6 L17.7 7.7 L16.7 8.6 L17.1 9.9 L15.9 9.2 L14.7 9.9 L15.1 8.6 L14.1 7.7 L15.4 7.6 Z" fill="#FFFFFF"/>`,
  MX: `<rect width="8" height="16" fill="#006847"/><rect x="8" width="8" height="16" fill="#FFFFFF"/><rect x="16" width="8" height="16" fill="#CE1126"/><circle cx="12" cy="8" r="1.7" fill="#8C6D1F"/>`,
  GH: `<rect width="24" height="5.4" fill="#CE1126"/><rect y="5.3" width="24" height="5.4" fill="#FCD116"/><rect y="10.6" width="24" height="5.4" fill="#006B3D"/><path d="M12 5.7 L12.7 7.5 L14.6 7.6 L13.1 8.8 L13.6 10.6 L12 9.5 L10.4 10.6 L10.9 8.8 L9.4 7.6 L11.3 7.5 Z" fill="#000000"/>`,
  ZA: `<rect width="24" height="8" fill="#E03C31"/><rect y="8" width="24" height="8" fill="#001489"/><rect y="5.2" width="24" height="5.6" fill="#007749"/><path d="M0 5.2 H24 M0 10.8 H24" stroke="#FFFFFF" stroke-width="1"/><polygon points="0,1.2 9.5,8 0,14.8" fill="#007749" stroke="#FFFFFF" stroke-width="1"/><polygon points="0,4 5.5,8 0,12" fill="#000000" stroke="#FFB81C" stroke-width="0.8"/>`,
  PH: `<rect width="24" height="8" fill="#FFFFFF"/><rect y="8" width="24" height="8" fill="#CE1126"/><polygon points="0,0 10.5,8 0,16" fill="#0038A8"/><circle cx="3.6" cy="8" r="1.5" fill="#FCD116"/><circle cx="1.6" cy="1.9" r="0.7" fill="#FCD116"/><circle cx="1.6" cy="14.1" r="0.7" fill="#FCD116"/><circle cx="8.4" cy="8" r="0.7" fill="#FCD116"/>`,
  MY: `<rect width="24" height="16" fill="#FFFFFF"/><rect width="24" height="1.2" fill="#CC0001"/><rect y="2.3" width="24" height="1.2" fill="#CC0001"/><rect y="4.6" width="24" height="1.2" fill="#CC0001"/><rect y="6.9" width="24" height="1.2" fill="#CC0001"/><rect y="9.2" width="24" height="1.2" fill="#CC0001"/><rect y="11.5" width="24" height="1.2" fill="#CC0001"/><rect y="13.8" width="24" height="1.2" fill="#CC0001"/><rect width="10.5" height="9.2" fill="#010066"/><circle cx="4.2" cy="4.6" r="2.3" fill="#FFCC00"/><circle cx="5.2" cy="4.6" r="1.9" fill="#010066"/><path d="M8 3 L8.4 4 L9.5 4.1 L8.6 4.8 L8.9 5.9 L8 5.3 L7.1 5.9 L7.4 4.8 L6.5 4.1 L7.6 4 Z" fill="#FFCC00"/>`,
  KR: `<rect width="24" height="16" fill="#FFFFFF"/><g transform="rotate(-24 12 8)"><path d="M8 8 A4 4 0 0 1 16 8 Z" fill="#CD2E3A"/><path d="M8 8 A4 4 0 0 0 16 8 Z" fill="#0047A0"/></g><g stroke="#000000" stroke-width="0.9"><path d="M3.4 2.6 L5.6 3.8 M3.9 1.8 L6.1 3"/><path d="M18.4 12.2 L20.6 13.4 M17.9 13 L20.1 14.2"/><path d="M3.4 13.4 L5.6 12.2 M3.9 14.2 L6.1 13"/><path d="M18.4 3.8 L20.6 2.6 M17.9 3 L20.1 1.8"/></g>`,
  AU: `<rect width="24" height="16" fill="#00247D"/><rect width="10" height="8" fill="#012169"/><path d="M0 0L10 8M10 0L0 8" stroke="#FFFFFF" stroke-width="1.6"/><rect x="4.2" width="1.6" height="8" fill="#FFFFFF"/><rect y="3.2" width="10" height="1.6" fill="#FFFFFF"/><rect x="4.7" width="0.8" height="8" fill="#C8102E"/><rect y="3.7" width="10" height="0.8" fill="#C8102E"/><circle cx="17" cy="12.4" r="1.3" fill="#fff"/><circle cx="19" cy="3.4" r="0.85" fill="#fff"/><circle cx="16" cy="6.4" r="0.85" fill="#fff"/><circle cx="21.4" cy="6.4" r="0.85" fill="#fff"/><circle cx="18.6" cy="10.4" r="0.85" fill="#fff"/>`,
  NZ: `<rect width="24" height="16" fill="#00247D"/><rect width="10" height="8" fill="#012169"/><path d="M0 0L10 8M10 0L0 8" stroke="#FFFFFF" stroke-width="1.6"/><rect x="4.2" width="1.6" height="8" fill="#FFFFFF"/><rect y="3.2" width="10" height="1.6" fill="#FFFFFF"/><rect x="4.7" width="0.8" height="8" fill="#C8102E"/><rect y="3.7" width="10" height="0.8" fill="#C8102E"/><circle cx="19" cy="3.4" r="0.9" fill="#C8102E"/><circle cx="16" cy="6.4" r="0.9" fill="#C8102E"/><circle cx="21.4" cy="6.4" r="0.9" fill="#C8102E"/><circle cx="18.6" cy="10.4" r="0.9" fill="#C8102E"/>`,
  HR: `<rect width="24" height="5.4" fill="#FF0000"/><rect y="5.3" width="24" height="5.4" fill="#FFFFFF"/><rect y="10.6" width="24" height="5.4" fill="#171796"/><rect x="10.4" y="3.1" width="3.2" height="3.7" fill="#FFFFFF" stroke="#FF0000" stroke-width="0.4"/><path d="M10.4 3.1 h1.6 v1.85 h-1.6 z M12 4.95 h1.6 v1.85 h-1.6 z" fill="#FF0000"/>`,
};

function flagSVG(cc) {
  return `<svg viewBox="0 0 24 16" role="img" aria-label="${COUNTRIES[cc]} flag">${FLAGS[cc] || ""}</svg>`;
}

function artFor(species, fg, bg) {
  const draw = ART[species] || ART.sardine;
  return `<svg viewBox="0 0 120 60" role="img" aria-label="${SPECIES[species].label}">${draw(fg, bg)}</svg>`;
}
const STORE_KEY = "fish-club:v1";

const store = {
  tasted: {},
  load() {
    try {
      let raw = localStorage.getItem(STORE_KEY);
      if (!raw) {
        raw = localStorage.getItem("lata:v1"); // pre-rename key — migrate forward
        if (raw) {
          localStorage.setItem(STORE_KEY, raw);
          localStorage.removeItem("lata:v1");
        }
      }
      if (raw) this.tasted = JSON.parse(raw).tasted || {};
    } catch (e) { /* private mode etc. — run in memory */ }
  },
  save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ tasted: this.tasted }));
    } catch (e) { /* ignore */ }
  },
};

const tastedCount = () => Object.keys(store.tasted).length;
const ui = { q: "", species: new Set(), country: "", medium: "", hideTasted: false, sort: "curated", iconic: false };
function tinHTML(t, { stamp = false } = {}) {
  return `
    <div class="tin" data-pattern="${t.pattern}" style="--c1:${t.colors[0]};--c2:${t.colors[1]}">
      <div class="tin-lid"></div>
      <div class="tin-label">
        ${t.iconic ? `<span class="tin-star" title="Club pick — an iconic tin">★</span>` : ""}
        <span class="tin-flag" title="${COUNTRIES[t.cc]}">${flagSVG(t.cc)}</span>
        <div class="tin-art">${artFor(t.species, t.colors[1], t.colors[0])}</div>
        <div class="tin-brand">${t.brand}</div>
        <div class="tin-name">${t.name}</div>
      </div>
      <span class="stamp ${stamp ? "is-visible" : ""}" aria-hidden="true">TASTED</span>
    </div>`;
}

function cardHTML(t, i) {
  const isTasted = !!store.tasted[t.id];
  return `
    <article class="card ${isTasted ? "is-tasted" : ""}" data-id="${t.id}" tabindex="0" role="button"
             aria-label="${t.brand} — ${t.name}" style="--d:${Math.min(i * 22, 420)}ms">
      ${tinHTML(t, { stamp: isTasted })}
      <div class="card-meta">
        <span class="card-medium">${t.medium}</span>
        <span class="card-check"><svg viewBox="0 0 12 12"><path d="M1.5 6.5 4.5 9.5 10.5 2.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></span>
      </div>
    </article>`;
}
function filtered() {
  const q = ui.q.trim().toLowerCase();
  const list = TINS.filter((t) => {
    if (ui.iconic && !t.iconic) return false;
    if (ui.species.size && !ui.species.has(t.species)) return false;
    if (ui.country && t.cc !== ui.country) return false;
    if (ui.medium && t.medium !== ui.medium) return false;
    if (ui.hideTasted && store.tasted[t.id]) return false;
    if (q) {
      const hay = `${t.brand} ${t.name} ${t.note} ${t.tags.join(" ")} ${COUNTRIES[t.cc]} ${SPECIES[t.species].label} ${t.medium}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  switch (ui.sort) {
    case "brand": list.sort((a, b) => a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name)); break;
    case "recent": list.sort((a, b) => (store.tasted[b.id]?.d || "").localeCompare(store.tasted[a.id]?.d || "")); break;
  }
  return list;
}

let gridAnimated = false;

function renderGrid() {
  const list = filtered();
  $("#grid").innerHTML = list.map(cardHTML).join("");
  $("#resultCount").textContent = `${list.length} of ${TINS.length} tins`;
  $("#emptyShelf").hidden = list.length > 0;
  if (gridAnimated) $("#grid").classList.add("no-anim");
  gridAnimated = true;
}

function buildChips() {
  const counts = {};
  TINS.forEach((t) => (counts[t.species] = (counts[t.species] || 0) + 1));
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1] || SPECIES[a[0]].label.localeCompare(SPECIES[b[0]].label));
  const iconicCount = TINS.filter((t) => t.iconic).length;
  $("#speciesChips").innerHTML =
    `<button class="chip chip-iconic" type="button" data-iconic aria-pressed="false" title="Category-defining tins">★ Iconic picks<span class="chip-n">${iconicCount}</span></button>` +
    entries
      .map(([sp, n]) => `<button class="chip" type="button" data-species="${sp}" aria-pressed="false">${SPECIES[sp].label}<span class="chip-n">${n}</span></button>`)
      .join("");
}

function buildSelects() {
  const ccCounts = {};
  TINS.forEach((t) => (ccCounts[t.cc] = (ccCounts[t.cc] || 0) + 1));
  const ccOpts = Object.keys(ccCounts)
    .sort((a, b) => COUNTRIES[a].localeCompare(COUNTRIES[b]))
    .map((cc) => `<option value="${cc}">${COUNTRIES[cc]} (${ccCounts[cc]})</option>`);
  $("#countrySelect").insertAdjacentHTML("beforeend", ccOpts.join(""));

  const mediums = [...new Set(TINS.map((t) => t.medium))].sort();
  $("#mediumSelect").insertAdjacentHTML(
    "beforeend",
    mediums.map((m) => `<option value="${m}">${m[0].toUpperCase() + m.slice(1)}</option>`).join("")
  );
}

function updateProgress() {
  const n = tastedCount();
  const pct = n / TINS.length;
  $("#ringFill").style.strokeDashoffset = String(100 - pct * 100);
  $("#progressText").textContent = `${n} / ${TINS.length}`;
}
let modalId = null;
let modalRating = 0;

function openModal(id) {
  const t = byId(id);
  if (!t) return;
  modalId = id;
  $("#modalTin").innerHTML = tinHTML(t, { stamp: !!store.tasted[t.id] });
  $("#modalBrand").innerHTML = `<span class="modal-flag">${flagSVG(t.cc)}</span>${t.brand} · ${COUNTRIES[t.cc]}`;
  $("#modalName").textContent = t.name;
  $("#modalTags").innerHTML =
    (t.iconic ? `<span class="modal-tag is-pick">★ Club pick</span>` : "") +
    [SPECIES[t.species].label, t.medium, ...t.tags]
      .map((x) => `<span class="modal-tag">${x}</span>`)
      .join("");
  $("#modalNote").textContent = t.note;
  $("#modalPairing").innerHTML = t.pairing ? `<b>Serve with:</b> ${t.pairing}` : "";
  $("#modalPairing").style.display = t.pairing ? "" : "none";
  renderTasteZone(id);
  const backdrop = $("#modalBackdrop");
  backdrop.hidden = false;
  requestAnimationFrame(() => backdrop.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  $("#modalClose").focus();
}

function closeModal() {
  const backdrop = $("#modalBackdrop");
  backdrop.classList.remove("is-open");
  document.body.style.overflow = "";
  modalId = null;
  setTimeout(() => (backdrop.hidden = true), 240);
}

function renderTasteZone(id) {
  const entry = store.tasted[id];
  const zone = $("#tasteZone");
  if (!entry) {
    zone.innerHTML = `
      <div class="taste-cta">
        <button class="btn btn-primary" id="markTastedBtn" type="button">Mark as tasted</button>
        <span class="taste-hint">Popped this tin? Log it and stamp the shelf.</span>
      </div>`;
    $("#markTastedBtn").addEventListener("click", (e) => {
      saveTasting(id, { d: todayISO(), r: 0, n: "" }, e.currentTarget);
      renderTasteZone(id);
    });
    return;
  }
  modalRating = entry.r || 0;
  zone.innerHTML = `
    <div class="taste-form">
      <div class="taste-row">
        <div class="stars" id="starRow" role="radiogroup" aria-label="Your rating"></div>
        <input type="date" class="taste-date" id="tasteDate" value="${entry.d || todayISO()}" aria-label="Date tasted">
      </div>
      <textarea class="taste-note" id="tasteNote" placeholder="How was it? Salty? Life-changing?">${escapeHTML(entry.n || "")}</textarea>
      <div class="taste-actions">
        <button class="btn btn-primary btn-small" id="saveTastingBtn" type="button">Update entry</button>
        <button class="btn btn-danger btn-small" id="removeTastingBtn" type="button">Remove from pantry</button>
      </div>
    </div>`;
  renderStars();
  $("#saveTastingBtn").addEventListener("click", (e) => {
    saveTasting(id, { d: $("#tasteDate").value || todayISO(), r: modalRating, n: $("#tasteNote").value.trim() }, e.currentTarget, true);
  });
  $("#removeTastingBtn").addEventListener("click", () => {
    delete store.tasted[id];
    store.save();
    afterStoreChange(id, false);
    if (modalId === id) $("#modalTin").innerHTML = tinHTML(byId(id), { stamp: false });
    renderTasteZone(id);
    toast(`Removed <b>${byId(id).brand}</b> from your pantry.`);
  });
}

function renderStars() {
  const row = $("#starRow");
  row.innerHTML = [1, 2, 3, 4, 5]
    .map(
      (v) => `
      <button class="star ${v <= modalRating ? "is-on" : ""}" type="button" data-v="${v}" aria-label="${v} star${v > 1 ? "s" : ""}">
        <svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" fill="currentColor"/></svg>
      </button>`
    )
    .join("");
  row.querySelectorAll(".star").forEach((btn) => {
    btn.addEventListener("click", () => {
      modalRating = Number(btn.dataset.v) === modalRating ? 0 : Number(btn.dataset.v);
      renderStars();
    });
  });
}

function saveTasting(id, entry, sourceEl, isUpdate = false) {
  const isNew = !store.tasted[id];
  store.tasted[id] = entry;
  store.save();
  afterStoreChange(id, true);
  if (modalId === id) $("#modalTin").innerHTML = tinHTML(byId(id), { stamp: true });
  if (sourceEl) {
    const r = sourceEl.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, isNew ? 90 : 40);
  }
  if (isNew) {
    checkMilestones(id);
  } else {
    toast(`Updated <b>${byId(id).brand}</b>.`);
  }
}

function afterStoreChange(id, nowTasted) {
  updateProgress();
  renderGrid();
  if (nowTasted) {
    const card = document.querySelector(`.card[data-id="${id}"]`);
    if (card) card.classList.add("stamp-slam");
  }
  if (!$("#pantryView").hidden) renderPantry();
}

function checkMilestones(id) {
  const t = byId(id);
  const n = tastedCount();
  if (n === TINS.length) {
    burst(innerWidth / 2, innerHeight / 3, 220);
    toast(`<b>Grand Conservador!</b> You have tasted all ${TINS.length} tins. The shelf is yours.`);
    return;
  }
  const speciesTins = TINS.filter((x) => x.species === t.species);
  if (speciesTins.every((x) => store.tasted[x.id])) {
    burst(innerWidth / 2, innerHeight / 3, 130);
    toast(`Field guide complete: <b>${SPECIES[t.species].label}</b> — all ${speciesTins.length} tasted!`);
    return;
  }
  if (n % 10 === 0) {
    burst(innerWidth / 2, innerHeight / 3, 130);
    toast(`<b>${n} tins</b> tasted — rank: ${rankFor(n)}.`);
    return;
  }
  toast(`Stamped <b>${t.brand} ${t.name}</b> into your pantry.`);
}
function rankFor(n) {
  if (n >= TINS.length) return "Grand Conservador";
  if (n >= 40) return "Lata Legend";
  if (n >= 24) return "Brine Master";
  if (n >= 12) return "Sardine Scholar";
  if (n >= 5) return "Conservas Cadet";
  if (n >= 1) return "Tin Curious";
  return "Landlubber";
}

function renderPantry() {
  const n = tastedCount();
  const speciesSet = new Set();
  const ccSet = new Set();
  Object.keys(store.tasted).forEach((id) => {
    const t = byId(id);
    if (t) { speciesSet.add(t.species); ccSet.add(t.cc); }
  });

  $("#statCards").innerHTML = `
    <div class="stat-card"><p class="stat-num">${n}<small> / ${TINS.length}</small></p><p class="stat-label">Tins tasted</p></div>
    <div class="stat-card"><p class="stat-num">${speciesSet.size}<small> / ${Object.keys(SPECIES).length}</small></p><p class="stat-label">Species</p></div>
    <div class="stat-card"><p class="stat-num">${ccSet.size}<small> / ${Object.keys(COUNTRIES).length}</small></p><p class="stat-label">Countries</p></div>
    <div class="stat-card is-rank"><p class="stat-num">${rankFor(n)}</p><p class="stat-label">Current rank</p></div>`;

  const speciesKeys = Object.keys(SPECIES)
    .map((sp) => ({ sp, total: TINS.filter((t) => t.species === sp).length, had: TINS.filter((t) => t.species === sp && store.tasted[t.id]).length }))
    .sort((a, b) => b.total - a.total);
  $("#coverage").innerHTML = speciesKeys
    .map(
      ({ sp, total, had }) => `
      <div class="cov-row ${had === total ? "is-done" : ""}">
        <span class="cov-name">${SPECIES[sp].label}</span>
        <div class="cov-bar"><div class="cov-fill" style="width:${(had / total) * 100}%"></div></div>
        <span class="cov-n">${had}/${total}</span>
      </div>`
    )
    .join("");

  $("#passport").innerHTML = Object.keys(COUNTRIES)
    .map((cc) => {
      const earned = ccSet.has(cc);
      const rot = ((cc.charCodeAt(0) * 7 + cc.charCodeAt(1) * 13) % 17) - 8;
      return `<span class="pass-stamp ${earned ? "is-earned" : ""}" data-cc="${cc}" role="button" tabindex="0" style="--rot:${rot}deg" title="${COUNTRIES[cc]}${earned ? " — tasted" : " — not yet"}">${cc}</span>`;
    })
    .join("");

  const entries = Object.entries(store.tasted)
    .map(([id, e]) => ({ t: byId(id), e }))
    .filter((x) => x.t)
    .sort((a, b) => (b.e.d || "").localeCompare(a.e.d || ""));
  $("#emptyLog").style.display = entries.length ? "none" : "";
  $("#logList").innerHTML = entries
    .map(({ t, e }) => {
      const date = e.d
        ? new Date(e.d + "T12:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
        : "";
      return `
      <div class="log-row" data-id="${t.id}">
        <div class="log-swatch" style="--c1:${t.colors[0]};--c2:${t.colors[1]}">${artFor(t.species, t.colors[1], t.colors[0])}</div>
        <div class="log-main">
          <div class="log-title">${t.brand} · <b>${t.name}</b></div>
          <div class="log-sub">${COUNTRIES[t.cc]} · ${t.medium}</div>
          ${e.n ? `<div class="log-note">“${escapeHTML(e.n)}”</div>` : ""}
        </div>
        <div class="log-side">
          <span class="log-date">${date}</span>
          ${e.r ? `<span class="log-stars">${"★".repeat(e.r)}${"☆".repeat(5 - e.r)}</span>` : ""}
          <button class="log-remove" type="button" data-remove="${t.id}">remove</button>
        </div>
      </div>`;
    })
    .join("");
}

function escapeHTML(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
let rouletteBusy = false;

function roulette() {
  if (rouletteBusy) return;
  showView("shelf");
  let pool = filtered().filter((t) => !store.tasted[t.id]);
  if (pool.length === 0) {
    if (tastedCount() === TINS.length) {
      toast("You have tasted <b>every tin</b>. There is nothing left to roll for, Grand Conservador.");
      return;
    }
    resetFilters();
    pool = filtered().filter((t) => !store.tasted[t.id]);
    toast("Cleared your filters — the whole shelf is in play.");
  }
  rouletteBusy = true;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  const cards = [...document.querySelectorAll(".card")];
  const flashes = [90, 130, 180, 250, 340, 460];
  let elapsed = 0;
  flashes.forEach((wait) => {
    elapsed += wait;
    setTimeout(() => {
      cards.forEach((c) => c.classList.remove("is-flashing"));
      const c = cards[Math.floor(Math.random() * cards.length)];
      if (c) c.classList.add("is-flashing");
    }, elapsed);
  });
  setTimeout(() => {
    cards.forEach((c) => c.classList.remove("is-flashing"));
    const el = document.querySelector(`.card[data-id="${pick.id}"]`);
    if (el) {
      el.classList.add("is-chosen");
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    toast(`The shelf has spoken: <b>${pick.brand} — ${pick.name}</b>`);
    setTimeout(() => {
      if (el) el.classList.remove("is-chosen");
      openModal(pick.id);
      rouletteBusy = false;
    }, 1100);
  }, elapsed + 500);
}
const cvs = $("#confettiCanvas");
const ctx = cvs.getContext("2d");
let parts = [];
let rafId = null;
const CONFETTI_COLORS = ["#C8402A", "#D9A441", "#2E6E63", "#2B5C8A", "#E07856", "#F1E5C8"];

function sizeCanvas() {
  cvs.width = innerWidth * devicePixelRatio;
  cvs.height = innerHeight * devicePixelRatio;
}

function burst(x, y, n = 90) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 7;
    parts.push({
      x: x * devicePixelRatio,
      y: y * devicePixelRatio,
      vx: Math.cos(a) * speed * devicePixelRatio,
      vy: (Math.sin(a) * speed - 4) * devicePixelRatio,
      w: (4 + Math.random() * 5) * devicePixelRatio,
      h: (6 + Math.random() * 7) * devicePixelRatio,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
      life: 0,
      ttl: 110 + Math.random() * 50,
      circle: Math.random() < 0.3,
    });
  }
  if (!rafId) confettiLoop();
}

function confettiLoop() {
  rafId = requestAnimationFrame(confettiLoop);
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  const g = 0.16 * devicePixelRatio;
  parts = parts.filter((p) => p.life < p.ttl && p.y < cvs.height + 60);
  if (!parts.length) {
    cancelAnimationFrame(rafId);
    rafId = null;
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    return;
  }
  parts.forEach((p) => {
    p.life++;
    p.vy += g;
    p.vx *= 0.992;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    const fade = p.life > p.ttl - 30 ? (p.ttl - p.life) / 30 : 1;
    ctx.save();
    ctx.globalAlpha = fade;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.circle) {
      ctx.beginPath();
      ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    }
    ctx.restore();
  });
}
let toastTimer = null;
function toast(html) {
  const el = $("#toast");
  el.innerHTML = html;
  el.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("is-visible"), 3000);
}
function randomTin() {
  return TINS[(Math.random() * TINS.length) | 0];
}

function cycleHero() {
  if (document.hidden) return;
  const stage = $("#heroTin");
  stage.classList.add("is-flipping");
  setTimeout(() => (stage.innerHTML = tinHTML(randomTin())), 270);
  setTimeout(() => stage.classList.remove("is-flipping"), 600);
}
function buildTicker() {
  const words = [
    "SARDINHAS", "ATÚN", "MEJILLONES", "PULPO", "ANCHOAS", "BERBERECHOS", "NAVAJAS",
    "ZAMBURIÑAS", "SARDINILLAS", "BONITO DEL NORTE", "MAQUEREAUX", "TONNO", "SABA",
    "SPRATS", "VENTRESCA", "ESCABECHE", "ERIZO DE MAR", "CONSERVAS",
  ];
  const group = words.map((w) => `<span>${w}</span><b>·</b>`).join("");
  $("#tickerTrack").innerHTML = group + group;
}
function showView(view) {
  const shelf = view === "shelf";
  $("#shelfView").hidden = !shelf;
  $("#pantryView").hidden = shelf;
  $("#navShelf").classList.toggle("is-active", shelf);
  $("#navPantry").classList.toggle("is-active", !shelf);
  $("#hero").style.display = shelf ? "" : "none";
  $(".ticker").style.display = shelf ? "" : "none";
  if (!shelf) renderPantry();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function resetFilters() {
  ui.q = "";
  ui.species.clear();
  ui.country = "";
  ui.medium = "";
  ui.hideTasted = false;
  ui.sort = "curated";
  ui.iconic = false;
  $("#searchInput").value = "";
  $("#countrySelect").value = "";
  $("#mediumSelect").value = "";
  $("#sortSelect").value = "curated";
  $("#hideTastedToggle").checked = false;
  document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
  updateSpeciesToggle();
  renderGrid();
}

const mobileFilters = window.matchMedia("(max-width: 620px)");

function updateSpeciesToggle() {
  const n = ui.species.size + Number(ui.iconic);
  const count = $("#speciesToggleCount");
  count.textContent = n;
  count.hidden = n === 0;
}

function syncSpeciesDisclosure() {
  const toggle = $("#speciesToggle");
  $("#speciesChips").hidden = mobileFilters.matches && toggle.getAttribute("aria-expanded") !== "true";
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function bindEvents() {
  $("#searchInput").addEventListener("input", (e) => {
    ui.q = e.target.value;
    renderGrid();
  });

  $("#speciesChips").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    if (chip.hasAttribute("data-iconic")) {
      ui.iconic = !ui.iconic;
      chip.setAttribute("aria-pressed", String(ui.iconic));
      updateSpeciesToggle();
      renderGrid();
      return;
    }
    const sp = chip.dataset.species;
    if (ui.species.has(sp)) ui.species.delete(sp);
    else ui.species.add(sp);
    chip.setAttribute("aria-pressed", String(ui.species.has(sp)));
    updateSpeciesToggle();
    renderGrid();
  });

  $("#speciesToggle").addEventListener("click", (e) => {
    const expanded = e.currentTarget.getAttribute("aria-expanded") === "true";
    e.currentTarget.setAttribute("aria-expanded", String(!expanded));
    syncSpeciesDisclosure();
  });
  mobileFilters.addEventListener("change", syncSpeciesDisclosure);

  $("#countrySelect").addEventListener("change", (e) => { ui.country = e.target.value; renderGrid(); });
  $("#mediumSelect").addEventListener("change", (e) => { ui.medium = e.target.value; renderGrid(); });
  $("#sortSelect").addEventListener("change", (e) => { ui.sort = e.target.value; renderGrid(); });
  $("#hideTastedToggle").addEventListener("change", (e) => { ui.hideTasted = e.target.checked; renderGrid(); });
  $("#resetFiltersBtn").addEventListener("click", resetFilters);

  $("#grid").addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) openModal(card.dataset.id);
  });
  $("#grid").addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("card")) {
      e.preventDefault();
      openModal(e.target.dataset.id);
    }
  });

  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  $("#navShelf").addEventListener("click", () => showView("shelf"));
  $("#navPantry").addEventListener("click", () => showView("pantry"));
  $("#progressPill").addEventListener("click", () => showView("pantry"));
  $("#emptyBrowseBtn").addEventListener("click", () => showView("shelf"));
  $("#wordmark").addEventListener("click", (e) => { e.preventDefault(); showView("shelf"); });

  $("#browseBtn").addEventListener("click", () => $("#filterbar").scrollIntoView({ behavior: "smooth" }));
  $("#rouletteBtn").addEventListener("click", roulette);

  $("#logList").addEventListener("click", (e) => {
    const rm = e.target.closest("[data-remove]");
    if (rm) {
      delete store.tasted[rm.dataset.remove];
      store.save();
      updateProgress();
      renderGrid();
      renderPantry();
      toast("Removed from your pantry.");
      return;
    }
    const row = e.target.closest(".log-row");
    if (row) openModal(row.dataset.id);
  });

  const goToCountry = (cc) => {
    ui.country = cc;
    $("#countrySelect").value = cc;
    showView("shelf");
    renderGrid();
    $("#filterbar").scrollIntoView({ behavior: "smooth" });
    toast(`Showing tins from <b>${COUNTRIES[cc]}</b>.`);
  };
  $("#passport").addEventListener("click", (e) => {
    const stamp = e.target.closest(".pass-stamp");
    if (stamp) goToCountry(stamp.dataset.cc);
  });

  $("#exportBtn").addEventListener("click", async () => {
    const payload = JSON.stringify({ app: "fish-club", version: 1, tasted: store.tasted }, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      toast("Ledger copied to your clipboard.");
    } catch (e) {
      toast("Clipboard blocked — your browser said no.");
    }
  });

  $("#importBtn").addEventListener("click", () => $("#importInput").click());
  $("#importInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const incoming = data && typeof data.tasted === "object" ? data.tasted : null;
        if (!incoming) throw new Error("bad shape");
        let added = 0;
        Object.entries(incoming).forEach(([id, entry]) => {
          if (byId(id) && entry && typeof entry === "object") {
            if (!store.tasted[id]) added++;
            store.tasted[id] = { d: entry.d || todayISO(), r: Number(entry.r) || 0, n: String(entry.n || "") };
          }
        });
        store.save();
        updateProgress();
        renderGrid();
        renderPantry();
        toast(`Imported ledger — <b>${added}</b> new tin${added === 1 ? "" : "s"} added.`);
      } catch (err) {
        toast("That file doesn't look like a Fish Club ledger.");
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !$("#modalBackdrop").hidden) closeModal();
    if (e.key === "/" && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      e.preventDefault();
      $("#searchInput").focus();
    }
  });

  window.addEventListener("scroll", () => {
    $("#siteHeader").classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  window.addEventListener("resize", sizeCanvas);
  updateSpeciesToggle();
  syncSpeciesDisclosure();
}
store.load();
sizeCanvas();
buildTicker();
buildChips();
buildSelects();
renderGrid();
updateProgress();
bindEvents();
$("#heroCount").textContent = String(TINS.length);
$("#footerStats").textContent = `${TINS.length} tins, ${Object.keys(COUNTRIES).length} countries, ${Object.keys(SPECIES).length} species.`;
$("#heroTin").innerHTML = tinHTML(randomTin());
setInterval(cycleHero, 4200);
