/* CHAINS & CROWNS — Mode tournoi
   Ouvert avec le lien personnel reçu à l'inscription sur BeamUp : index.html?tournoi=<jeton>.
   BeamUp organise le tournoi (système suisse) : il donne à chaque ronde l'adversaire, la couleur et une salle privée.
   La partie se joue en pair-à-pair (js/net.js) avec une pendule par joueur ; le jeu déclare ensuite le résultat à BeamUp.
   Tournois réservés aux possesseurs de l’édition complète (achat vérifié par BeamUp à l’inscription), inscription gratuite :
   aucune mise, aucun cauris en jeu. */

(() => {
    const token = new URLSearchParams(location.search).get('tournoi');
    if (!token || !window.CCGame) return;

    // Essais en local uniquement : ?api=<adresse> est ignoré en dehors de localhost.
    const local = ['localhost', '127.0.0.1'].includes(location.hostname);
    const API = (local && new URLSearchParams(location.search).get('api')) || 'https://beamup.beautifull-earthcorp.tech/api/tournaments/play';
    const PENDING_KEY = 'chainsAndCrowns.tournoi.pending';
    const FACTION = { w: 'l\'Empire (blancs, vous commencez)', b: 'la Résistance (noirs)' };
    const HOW = { partie: 'partie jouée', forfait: 'forfait', litige: 'litige : l\'organisateur tranchera', arbitre: 'décision de l\'arbitre', 'non jouée': 'partie non jouée', 'déclaration unique': 'déclaré par un seul joueur' };
    const $ = (id) => document.getElementById(id);
    const el = { status: $('tStatus'), detail: $('tDetail'), play: $('btnTPlay'), forfeit: $('btnTForfeit'), cancel: $('btnTCancel'), standings: $('tStandings'), title: $('tTitle'), round: $('tRound') };

    let data = null;
    let skew = 0;          // écart entre l'horloge de BeamUp et celle de l'appareil
    let pollTimer = null;
    let inGame = false;
    let connecting = false;
    let checkedIn = '';    // ronde pour laquelle la présence a été signalée

    const pending = {
        get() { try { return JSON.parse(localStorage.getItem(PENDING_KEY)); } catch { return null; } },
        set(v) { try { v ? localStorage.setItem(PENDING_KEY, JSON.stringify(v)) : localStorage.removeItem(PENDING_KEY); } catch { /* ignoré */ } },
    };

    async function call(body) {
        const res = body
            ? await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ p: token, ...body }) })
            : await fetch(`${API}?p=${encodeURIComponent(token)}`, { cache: 'no-store' });
        const d = await res.json().catch(() => ({}));
        if (!res.ok) throw Object.assign(new Error(d.error || `Erreur ${res.status}`), { status: res.status });
        return d;
    }

    const now = () => Date.now() + skew;
    const when = (ms) => new Date(ms).toLocaleString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    const minutes = (ms) => Math.max(0, Math.ceil(ms / 60000));
    const label = (r) => ({ '1-0': 'victoire des blancs', '0-1': 'victoire des noirs', '1/2-1/2': 'nulle', '0-0': 'double défaite' }[r] || r);

    function show(status, detail = '') {
        el.status.textContent = status;
        el.detail.textContent = detail;
    }

    /** Envoie un résultat en attente (conservé sur l'appareil si le réseau a manqué). */
    async function flushPending() {
        const p = pending.get();
        if (!p || p.token !== token) return;
        try {
            await call({ action: 'report', result: p.result, reason: p.reason, moves: p.moves });
            pending.set(null);
        } catch (e) {
            if (e.status && e.status !== 429 && e.status !== 503) pending.set(null); // refus définitif (déjà déclaré, ronde close…)
        }
    }

    function render() {
        const d = data;
        const t = d.tournament;
        el.title.textContent = t.name;
        el.play.classList.add('hidden');
        el.forfeit.classList.add('hidden');
        el.cancel.classList.add('hidden');
        el.round.textContent = d.round ? `Ronde ${d.round.n} / ${t.totalRounds} · ${t.timeControlMinutes} min par joueur` : `${t.timeControlMinutes} min par joueur`;

        if (t.status === 'registration') {
            const start = new Date(t.startsAt).getTime();
            show(`Le tournoi commence ${when(start)}.`, start > now() ? `Dans ${minutes(start - now())} min. Gardez cette page ouverte : votre première partie s'affichera ici.` : 'Démarrage imminent…');
        } else if (t.status === 'cancelled') {
            show('Le tournoi n\'a pas lieu.', t.note || '');
        } else if (t.status === 'finished') {
            show('Tournoi terminé. Merci d\'avoir joué !', d.me.rank ? `Vous terminez ${d.me.rank === 1 ? '1er' : `${d.me.rank}e`} avec ${d.me.score} point(s).` : '');
        } else if (d.me.withdrawn && !d.game) {
            show('Vous avez été retiré du tournoi.', 'Un joueur absent à une ronde ne joue pas les suivantes. Contactez l\'organisateur en cas d\'erreur.');
        } else if (!d.game) {
            show('En attente de la ronde suivante…', 'Les autres tables terminent leur partie.');
        } else if (d.game.bye) {
            show('Vous êtes exempté de cette ronde.', '1 point vous est attribué (nombre impair de joueurs). La ronde suivante s\'affichera ici.');
        } else if (d.game.result) {
            show(`Partie terminée : ${label(d.game.result)}.`, `${HOW[d.game.how] || d.game.how}. En attente des autres tables…`);
        } else if (d.game.reported) {
            show('Résultat envoyé.', 'En attente de la déclaration de votre adversaire (ou de la fin de la ronde).');
        } else if (d.game.opponentReported) {
            show(`Votre adversaire ${d.game.opponent} a déclaré le résultat de votre partie.`, 'Si vous n\'êtes pas d\'accord, contactez l\'organisateur sur Discord.');
        } else {
            const g = d.game;
            show(`Table ${g.board} : vous jouez ${FACTION[g.color]} contre ${g.opponent}.`,
                g.opponentPresent ? 'Votre adversaire est connecté au tournoi.' : now() >= g.forfeitAt
                    ? 'Votre adversaire n\'est pas venu : vous pouvez réclamer la victoire par forfait.'
                    : `Votre adversaire n'est pas encore connecté. Forfait possible dans ${minutes(g.forfeitAt - now())} min.`);
            if (!connecting) el.play.classList.remove('hidden');
            else el.cancel.classList.remove('hidden');
            if (!g.opponentPresent && now() >= g.forfeitAt && !connecting) el.forfeit.classList.remove('hidden');
        }

        el.standings.innerHTML = d.standings.length
            ? `<thead><tr><th>#</th><th>Joueur</th><th>Points</th><th>Départage</th></tr></thead><tbody>${d.standings.map((p) =>
                `<tr class="${p.me ? 'me' : ''}${p.withdrawn ? ' out' : ''}"><td>${p.rank}</td><td>${escape(p.pseudo)}</td><td>${p.score}</td><td>${p.buchholz}</td></tr>`).join('')}</tbody>`
            : '';
    }

    const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    async function refresh() {
        if (inGame) return;
        try {
            await flushPending();
            data = await call();
            skew = data.serverNow - Date.now();
            const g = data.game;
            // Présence signalée automatiquement dès que la partie de la ronde est connue.
            if (g && !g.bye && !g.result && checkedIn !== `${data.round.n}`) {
                await call({ action: 'checkin' }).catch(() => {});
                checkedIn = `${data.round.n}`;
            }
            if (connecting) {
                // Pendant la connexion, on n'interrompt que si la partie a été réglée entre-temps (forfait, arbitre…).
                if (!g || g.bye || g.result || g.opponentReported) { connecting = false; Net.close(); render(); schedule(); }
                return;
            }
            render();
        } catch (e) {
            show('Impossible de joindre le tournoi.', e.message);
        }
    }

    function schedule() {
        clearInterval(pollTimer);
        pollTimer = setInterval(refresh, connecting ? 5000 : 12000);
    }

    async function playGame() {
        const g = data.game;
        connecting = true;
        schedule();
        render();
        show(`Table ${g.board} : connexion à ${g.opponent}…`, 'Les deux joueurs doivent avoir cliqué sur « Jouer ma partie ».');
        try {
            const { opponent } = await Net.joinRoom(g.room, g.color, data.me.pseudo, (txt) => { el.detail.textContent = txt; });
            connecting = false;
            inGame = true;
            clearInterval(pollTimer);
            CCGame.startTournamentGame({
                color: g.color,
                opponent: opponent || g.opponent,
                pseudo: data.me.pseudo,
                minutes: data.tournament.timeControlMinutes,
                onEnd: (result, reason, moves) => {
                    pending.set({ token, result, reason: reason.slice(0, 120), moves });
                    flushPending();
                },
                back: () => {
                    inGame = false;
                    CCGame.showScreen('tournament');
                    show('Envoi du résultat…');
                    schedule();
                    setTimeout(refresh, 1500);
                },
            });
        } catch (e) {
            connecting = false;
            Net.close();
            show('Connexion impossible.', e.message);
            schedule();
            setTimeout(refresh, 3000);
        }
    }

    el.play.addEventListener('click', playGame);
    // Menu du jeu : parties libres hors tournoi (le lien de tournoi reste valable, il suffit de rouvrir la page).
    $('btnTMenu').addEventListener('click', () => {
        if (connecting) { connecting = false; Net.close(); }
        clearInterval(pollTimer);
        CCGame.showScreen('intro');
    });
    el.cancel.addEventListener('click', () => { connecting = false; Net.close(); schedule(); refresh(); });
    el.forfeit.addEventListener('click', async () => {
        if (!confirm('Réclamer la victoire par forfait ? Votre adversaire ne pourra plus jouer cette partie.')) return;
        try { await call({ action: 'forfeit' }); } catch (e) { alert(e.message); }
        refresh();
    });

    CCGame.showScreen('tournament');
    show('Chargement du tournoi…');
    refresh();
    schedule();
})();
