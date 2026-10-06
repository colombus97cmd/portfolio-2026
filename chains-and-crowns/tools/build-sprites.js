/* CHAINS & CROWNS — Générateur des sprites SVG (pièces-objets stylisées, Guadeloupe 1802)
   Usage : node tools/build-sprites.js   →   sprites/<camp><pièce>.svg + sprites/planche.svg
   Chaque sprite est découpé en calques nommés pour l'animation :
     #socle   : piédestal commun
     #corps   : fût de la pièce
     #embleme : symbole qui identifie la pièce (animable : rebond, rotation)
     #flamme  : braise / éclat (animable : scintillement) — présent sur certaines pièces */

const fs = require('fs');
const path = require('path');

const FACTIONS = {
    // Résistance guadeloupéenne (joueur, pièces noires)
    b: { name: 'Résistance', light: '#5a3622', dark: '#1c100a', line: '#0d0805', accent: '#e8822a', gold: '#f2b34a', metal: '#8a8f96' },
    // Armée impériale (IA, pièces blanches)
    w: { name: 'Empire', light: '#fbf7ef', dark: '#c9bfae', line: '#3a3328', accent: '#1f3b7a', gold: '#d4af37', metal: '#b9bec6' },
};

const defs = (id, f) => `
  <defs>
    <linearGradient id="${id}-g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="${f.dark}"/><stop offset="0.42" stop-color="${f.light}"/><stop offset="1" stop-color="${f.dark}"/>
    </linearGradient>
    <radialGradient id="${id}-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="${f.gold}" stop-opacity="0.9"/><stop offset="1" stop-color="${f.accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>`;

const socle = (id, f) => `
  <g id="socle">
    <ellipse cx="50" cy="90" rx="31" ry="5.5" fill="${f.line}" opacity="0.35"/>
    <path d="M21 89 L26 80 L74 80 L79 89 Z" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <rect x="29" y="74" width="42" height="7" rx="2" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
    <rect x="29" y="76.5" width="42" height="2" fill="${f.gold}" opacity="0.8"/>
  </g>`;

// Fût générique : largeur en bas (wb) et en haut (wt), du haut (top) jusqu'au collier (74).
const fut = (id, f, top, wb, wt) => `
    <path d="M${50 - wb} 74 C${50 - wb} 62 ${50 - wt - 3} ${top + 8} ${50 - wt} ${top} L${50 + wt} ${top} C${50 + wt + 3} ${top + 8} ${50 + wb} 62 ${50 + wb} 74 Z"
      fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>`;

// Maillon de chaîne (ellipse creuse), éventuellement brisé
const maillon = (x, y, rot, f, broken = false) => `
    <g transform="translate(${x} ${y}) rotate(${rot})">
      <ellipse rx="6" ry="3.6" fill="none" stroke="${f.line}" stroke-width="4.2"/>
      <ellipse rx="6" ry="3.6" fill="none" stroke="${f.metal}" stroke-width="2.2" ${broken ? 'stroke-dasharray="15 6"' : ''}/>
    </g>`;

const PIECES = {
    // ---------------- RÉSISTANCE ----------------
    bP: (id, f) => `
  <g id="corps">${fut(id, f, 50, 12, 6)}
    <circle cx="50" cy="40" r="11" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">
    <path d="M38 52 A12.5 5 0 1 0 62 52" fill="none" stroke="${f.line}" stroke-width="5"/>
    <path d="M38 52 A12.5 5 0 1 0 62 52" fill="none" stroke="${f.metal}" stroke-width="2.6"/>
    <path d="M38 52 l-4 -5 M62 52 l4 -5" stroke="${f.accent}" stroke-width="2.4" stroke-linecap="round"/>
  </g>`,

    bR: (id, f) => `
  <g id="corps">
    <path d="M32 74 L34 34 L66 34 L68 74 Z" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M30 34 L30 22 L37 22 L37 27 L44 27 L44 20 L52 20 L52 27 L58 26 L58 21 L65 22 L70 34 Z" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M34 44 H66 M33 55 H67 M33 66 H67 M44 34 V44 M56 44 V55 M42 55 V66 M58 66 V74" stroke="${f.line}" stroke-width="1.2" opacity="0.55"/>
  </g>
  <g id="embleme">
    <path d="M45 74 V62 a5 5 0 0 1 10 0 V74 Z" fill="${f.line}"/>
  </g>
  <g id="flamme">
    <path d="M47 74 V64 a3 3 0 0 1 6 0 V74 Z" fill="${f.accent}"/>
    <circle cx="50" cy="66" r="10" fill="url(#${id}-glow)" opacity="0.7"/>
  </g>`,

    bN: (id, f) => `
  <g id="corps">
    <path d="M34 74 C33 62 38 54 44 48 C38 47 31 50 27 46 C27 38 36 28 44 22 L46 14 L52 21 C62 22 70 32 70 46 C70 58 66 66 66 74 Z"
      fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="44" cy="31" r="2.4" fill="${f.accent}"/>
    <path d="M30 44 l4 -1" stroke="${f.line}" stroke-width="1.6" stroke-linecap="round"/>
  </g>
  <g id="embleme">${maillon(60, 28, 60, f)}${maillon(65, 39, 80, f)}${maillon(66, 51, 95, f, true)}
  </g>`,

    bB: (id, f) => `
  <g id="corps">
    <path d="M36 74 C33 62 33 46 37 34 L63 34 C67 46 67 62 64 74 Z" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="50" cy="34" rx="13" ry="4" fill="${f.gold}" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">
    <path d="M${Array.from({ length: 11 }, (_, i) => `${(37.5 + i * 2.5).toFixed(1)} ${i % 2 ? 69 : 41}`).join(' L')}" fill="none" stroke="${f.accent}" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M36 40 H64 M36 70 H64" stroke="${f.line}" stroke-width="2"/>
    <path d="M44 26 L50 14 L56 26" fill="none" stroke="${f.line}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="50" cy="14" r="3" fill="${f.accent}" stroke="${f.line}" stroke-width="1.5"/>
  </g>`,

    bQ: (id, f) => `
  <g id="corps">${fut(id, f, 40, 13, 7)}
    <circle cx="50" cy="31" r="10" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">
    <path d="M38 31 C35 13 65 13 62 31 C56 27 44 27 38 31 Z" fill="${f.accent}" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M42 18 V29 M50 15 V27 M58 18 V29 M39 23 H61" stroke="${f.gold}" stroke-width="1.3" opacity="0.85"/>
    <path d="M56 16 C58 6 68 6 66 13 C64 18 59 17 56 16 Z M56 16 C62 14 70 18 66 22 C62 24 58 20 56 16 Z" fill="${f.accent}" stroke="${f.line}" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="57" cy="16" r="2.4" fill="${f.gold}" stroke="${f.line}" stroke-width="1"/>
  </g>`,

    bK: (id, f) => `
  <g id="corps">${fut(id, f, 36, 14, 8)}
    <rect x="38" y="30" width="24" height="8" rx="2" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">${maillon(40, 24, -55, f, true)}${maillon(50, 20, 90, f)}${maillon(60, 24, 55, f, true)}
  </g>
  <g id="flamme">
    <circle cx="50" cy="12" r="10" fill="url(#${id}-glow)"/>
    <path d="M50 4 C55 10 54 14 50 17 C46 14 45 10 50 4 Z" fill="${f.accent}"/>
    <path d="M50 9 C52 12 52 14 50 16 C48 14 48 12 50 9 Z" fill="${f.gold}"/>
  </g>`,

    // ---------------- EMPIRE ----------------
    wP: (id, f) => `
  <g id="corps">${fut(id, f, 50, 12, 6)}
    <circle cx="50" cy="42" r="10" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">
    <path d="M41 36 L42 20 L58 20 L59 36 Z" fill="${f.accent}" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <rect x="40" y="34" width="20" height="3.5" fill="${f.line}"/>
    <circle cx="50" cy="26" r="3" fill="#ffffff" stroke="#c0392b" stroke-width="2"/>
    <path d="M50 20 C48 12 52 10 50 6" stroke="#c0392b" stroke-width="3" stroke-linecap="round" fill="none"/>
  </g>`,

    wR: (id, f) => `
  <g id="corps">
    <path d="M32 74 L34 34 L66 34 L68 74 Z" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M30 34 V24 H37 V29 H44 V24 H56 V29 H63 V24 H70 V34 Z" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M34 50 H66" stroke="${f.gold}" stroke-width="2"/>
    <path d="M46 74 V62 a4 4 0 0 1 8 0 V74 Z" fill="${f.line}" opacity="0.8"/>
  </g>
  <g id="embleme">
    <path d="M50 24 V6" stroke="${f.line}" stroke-width="2"/>
    <rect x="50" y="6" width="5" height="9" fill="#1f3b7a"/>
    <rect x="55" y="6" width="5" height="9" fill="#ffffff" stroke="${f.line}" stroke-width="0.4"/>
    <rect x="60" y="6" width="5" height="9" fill="#c0392b"/>
  </g>`,

    wN: (id, f) => `
  <g id="corps">
    <path d="M34 74 C33 62 38 54 44 48 C38 47 31 50 27 46 C27 38 36 28 44 22 L46 14 L52 21 C62 22 70 32 70 46 C70 58 66 66 66 74 Z"
      fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="44" cy="31" r="2.4" fill="${f.line}"/>
    <path d="M30 44 l4 -1" stroke="${f.line}" stroke-width="1.6" stroke-linecap="round"/>
  </g>
  <g id="embleme">
    <path d="M44 36 L56 26 M42 44 L54 40" stroke="${f.accent}" stroke-width="3" stroke-linecap="round"/>
    <path d="M52 21 C56 10 66 8 72 14 C66 14 62 18 60 24 Z" fill="#c0392b" stroke="${f.line}" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="56" cy="26" r="2.6" fill="${f.gold}" stroke="${f.line}" stroke-width="1"/>
  </g>`,

    wB: (id, f) => `
  <g id="corps">${fut(id, f, 44, 12, 7)}
    <circle cx="50" cy="38" r="9" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">
    <path d="M26 32 C34 18 66 18 74 32 C64 28 36 28 26 32 Z" fill="${f.line}" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M30 31 C38 24 62 24 70 31" fill="none" stroke="${f.gold}" stroke-width="1.6"/>
    <circle cx="61" cy="25" r="3.4" fill="#1f3b7a" stroke="#ffffff" stroke-width="1.4"/>
    <circle cx="61" cy="25" r="1.2" fill="#c0392b"/>
  </g>`,

    wQ: (id, f) => `
  <g id="corps">${fut(id, f, 40, 13, 7)}
    <circle cx="50" cy="31" r="10" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">
    <path d="M37 26 C40 14 60 14 63 26" fill="none" stroke="${f.gold}" stroke-width="3"/>
    ${[0, 1, 2, 3, 4].map((i) => `<ellipse cx="${38 + i * 6}" cy="${22 - (i === 2 ? 4 : i % 4 === 0 ? 0 : 2.5)}" rx="2.4" ry="4" transform="rotate(${(i - 2) * 22} ${38 + i * 6} ${22 - (i === 2 ? 4 : 2)})" fill="${f.gold}" stroke="${f.line}" stroke-width="1"/>`).join('')}
  </g>`,

    wK: (id, f) => `
  <g id="corps">${fut(id, f, 38, 14, 8)}
    <rect x="37" y="33" width="26" height="7" rx="2" fill="url(#${id}-g)" stroke="${f.line}" stroke-width="2"/>
  </g>
  <g id="embleme">
    <path d="M36 33 L34 18 L42 25 L50 12 L58 25 L66 18 L64 33 Z" fill="${f.gold}" stroke="${f.line}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="50" cy="27" r="2.6" fill="${f.accent}"/>
    <circle cx="41" cy="29" r="1.8" fill="#c0392b"/><circle cx="59" cy="29" r="1.8" fill="#c0392b"/>
    <path d="M50 12 V4 M46 7 H54" stroke="${f.line}" stroke-width="2.4" stroke-linecap="round"/>
  </g>`,
};

const LABELS = { P: 'Pion', N: 'Cavalier', B: 'Fou', R: 'Tour', Q: 'Dame', K: 'Roi' };
const out = path.join(__dirname, '..', 'sprites');
fs.mkdirSync(out, { recursive: true });

const sheet = [];
const inline = {};
Object.entries(PIECES).forEach(([key, draw], i) => {
    const f = FACTIONS[key[0]];
    const id = 'cc-' + key;
    const body = `${defs(id, f)}${socle(id, f)}${draw(id, f)}`;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" class="piece-svg piece-${key}" role="img" aria-label="${LABELS[key[1]]} — ${f.name}">${body}\n</svg>\n`;
    fs.writeFileSync(path.join(out, key + '.svg'), svg);
    // Version intégrée au jeu : calques en classes (plusieurs exemplaires d'une pièce sur le plateau)
    inline[key] = svg.replace(/id="(socle|corps|embleme|flamme)"/g, 'class="$1"').replace(/\s*\n\s*/g, ' ');
    sheet.push(`<g transform="translate(${(i % 6) * 100} ${Math.floor(i / 6) * 100})">${body.replace(/id="(socle|corps|embleme|flamme)"/g, `class="$1"`)}</g>`);
});
fs.writeFileSync(path.join(out, 'planche.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 200" width="1200" height="400"><rect width="600" height="200" fill="#120c08"/>${sheet.join('')}</svg>\n`);
fs.writeFileSync(path.join(out, 'sprites.js'),
    `/* Généré par tools/build-sprites.js — ne pas modifier à la main. */\nwindow.CC_SPRITES = ${JSON.stringify(inline, null, 1)};\n`);
console.log('Sprites générés :', Object.keys(PIECES).join(', '));
