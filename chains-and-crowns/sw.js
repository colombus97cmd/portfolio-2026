/* CHAINS & CROWNS — Service worker : le jeu contre l'IA fonctionne hors ligne une fois installé.
   Le duel en ligne a toujours besoin du réseau. Changer VERSION à chaque mise en ligne. */

const VERSION = 'cc-v4';
const SHELL = [
    './', 'index.html', 'manifest.webmanifest', 'css/game.css',
    'sprites/sprites.js', 'js/edition.js', 'js/engine.js', 'js/ai.js', 'js/progress.js', 'js/themes.js', 'js/net.js', 'js/game.js', 'js/lessons.js', 'js/school-rules.js', 'js/school.js', 'js/arena.js', 'js/tournament.js', 'js/install.js',
    'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys()
        .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
        .then(() => self.clients.claim()));
});

// Réseau d'abord (pour recevoir les mises à jour), cache en secours hors ligne.
self.addEventListener('fetch', (e) => {
    if (e.request.method !== 'GET') return;
    const url = new URL(e.request.url);
    const cacheable = url.origin === location.origin || url.hostname === 'cdnjs.cloudflare.com' || url.hostname.endsWith('gstatic.com') || url.hostname === 'fonts.googleapis.com';
    if (!cacheable) return;
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                if (res.ok) {
                    const copy = res.clone();
                    caches.open(VERSION).then((c) => c.put(e.request, copy));
                }
                return res;
            })
            .catch(() => caches.match(e.request, { ignoreSearch: true })),
    );
});
