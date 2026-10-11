/* CHAINS & CROWNS — Installation sur PC et mobile (application web progressive) */

(() => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => { /* hors HTTPS : jeu en ligne uniquement */ }));
    }

    const btn = document.getElementById('btnInstall');
    const standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
    if (standalone) return;

    let deferred = null;
    // Chrome, Edge (Windows, Android) : bouton d'installation natif.
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferred = e;
        btn.classList.remove('hidden');
    });
    btn.addEventListener('click', async () => {
        if (!deferred) return;
        deferred.prompt();
        await deferred.userChoice;
        deferred = null;
        btn.classList.add('hidden');
    });
    window.addEventListener('appinstalled', () => btn.classList.add('hidden'));

    // iPhone / iPad : pas d'invite automatique, on explique le geste.
    if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        btn.textContent = 'Installer : Partager puis « Sur l\'écran d\'accueil »';
        btn.disabled = true;
        btn.classList.remove('hidden');
    }
})();
