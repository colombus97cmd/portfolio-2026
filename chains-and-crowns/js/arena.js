/* CHAINS & CROWNS — Tournoi hors ligne contre l'IA
   Système suisse en 4 rondes, 8 participants : vous et 7 adversaires IA. Vos parties se jouent réellement ;
   celles des IA entre elles sont simulées selon leur niveau. Expérience gagnée pour l'École (rangs).
   Aucune mise : le tournoi rapporte seulement de l'expérience et des titres, conservés sur cet appareil.
   Démo : Tournoi des Recrues ; Officiers et Généraux dans l'édition complète. */

const Arena = (() => {
    const KEY = 'chainsAndCrowns.arena';
    const ROUNDS = 4;
    const $ = (id) => document.getElementById(id);
    const TIERS = [
        { id: 'recrues', name: 'Tournoi des Recrues', levels: [1, 1, 1, 1, 1, 1, 1], full: false, mult: 1, text: 'Sept adversaires de niveau Recrue. Idéal pour débuter.' },
        { id: 'officiers', name: 'Tournoi des Officiers', levels: [1, 1, 2, 2, 2, 2, 2], full: true, mult: 1.5, text: 'Des Officiers qui calculent. Il faudra éviter les pièces en prise.' },
        { id: 'generaux', name: 'Tournoi des Généraux', levels: [2, 2, 3, 3, 3, 3, 3], full: true, mult: 2, text: 'L\'élite. Chaque erreur se paie.' },
    ];
    const NAMES = ['Vigie de la Soufrière', 'Lame de Matouba', 'Tambour des Mornes', 'Ombre du Carbet', 'Sentinelle de Basse-Terre', 'Veilleuse de la Rivière Sens', 'Gardien du Fort', 'Éclaireuse des Bains Jaunes', 'Capitaine des Vents', 'Archer de la Grande Découverte'];
    const LEVEL = ['', 'Recrue', 'Officier', 'Général'];

    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || { titles: [] }; } catch { return { titles: [] }; } };
    let data = load();
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* stockage bloqué */ } };
    const t = () => data.current;

    function startTournament(tier) {
        const names = [...NAMES].sort(() => Math.random() - 0.5).slice(0, 7);
        const players = [{ id: 'me', name: 'Vous', level: 0 }, ...tier.levels.map((lvl, i) => ({ id: `ia${i}`, name: names[i], level: lvl }))];
        data.current = { tier: tier.id, players, rounds: [], finished: false };
        pairRound();
        save();
        render();
    }

    // ---------------- Calculs ----------------
    function scores(cur = t()) {
        const pts = Object.fromEntries(cur.players.map((p) => [p.id, 0]));
        const opp = Object.fromEntries(cur.players.map((p) => [p.id, []]));
        for (const r of cur.rounds) for (const g of r) {
            if (g.res === undefined) continue;
            pts[g.a] += g.res; pts[g.b] += 1 - g.res;
            opp[g.a].push(g.b); opp[g.b].push(g.a);
        }
        const table = cur.players.map((p) => ({ ...p, pts: pts[p.id], buch: opp[p.id].reduce((s, o) => s + pts[o], 0) }));
        table.sort((x, y) => y.pts - x.pts || y.buch - x.buch || y.level - x.level);
        return table;
    }

    const met = (cur, a, b) => cur.rounds.some((r) => r.some((g) => (g.a === a && g.b === b) || (g.a === b && g.b === a)));

    /** Ronde suivante : vous affrontez l'adversaire le mieux classé que vous n'avez pas encore rencontré ; les IA s'apparient entre elles. */
    function pairRound() {
        const cur = t();
        const order = scores(cur).map((p) => p.id);
        const free = order.filter((id) => id !== 'me');
        const foe = free.find((id) => !met(cur, 'me', id)) || free[0];
        const games = [];
        const n = cur.rounds.length;
        // Couleurs alternées : la Résistance (noirs) à la première ronde.
        games.push(n % 2 === 0 ? { a: foe, b: 'me' } : { a: 'me', b: foe });
        const rest = free.filter((id) => id !== foe);
        while (rest.length) {
            const a = rest.shift();
            const j = Math.max(0, rest.findIndex((id) => !met(cur, a, id)));
            const b = rest.splice(j, 1)[0];
            games.push({ a, b });
        }
        cur.rounds.push(games);
    }

    const levelOf = (id) => t().players.find((p) => p.id === id).level;

    /** Partie entre deux IA : 1, ½ ou 0 pour la première, selon l'écart de niveau. */
    function simulate(a, b) {
        const diff = levelOf(a) - levelOf(b);
        const win = Math.min(0.8, Math.max(0.1, 0.4 + 0.2 * diff)), draw = 0.2;
        const x = Math.random();
        return x < win ? 1 : x < win + draw ? 0.5 : 0;
    }

    // ---------------- Déroulement ----------------
    function playRound() {
        const cur = t();
        const games = cur.rounds[cur.rounds.length - 1];
        const g = games.find((x) => x.a === 'me' || x.b === 'me');
        const foeId = g.a === 'me' ? g.b : g.a;
        const foe = cur.players.find((p) => p.id === foeId);
        CCGame.startAIGame({
            level: foe.level, color: g.a === 'me' ? 'w' : 'b', opponent: `${foe.name} (${LEVEL[foe.level]})`,
            onEnd: (result) => {
                g.res = g.a === 'me' ? { win: 1, draw: 0.5, loss: 0 }[result] : { win: 0, draw: 0.5, loss: 1 }[result];
                for (const x of games) if (x.res === undefined) x.res = simulate(x.a, x.b);
                const tier = TIERS.find((x) => x.id === cur.tier);
                const gain = result === 'win' ? 30 : result === 'draw' ? 12 : 4;
                const promoted = School.addXp(gain * tier.mult);
                cur.lastNote = `Ronde ${cur.rounds.length} : ${result === 'win' ? 'victoire' : result === 'draw' ? 'nulle' : 'défaite'} contre ${foe.name}. +${Math.round(gain * tier.mult)} XP${promoted ? ` — Nouveau rang : ${promoted.name} !` : ''}`;
                if (cur.rounds.length < ROUNDS) pairRound();
                else finish();
                save();
            },
            back: () => { CCGame.showScreen('arena'); render(); },
        });
    }

    function finish() {
        const cur = t();
        cur.finished = true;
        const table = scores(cur);
        const place = table.findIndex((p) => p.id === 'me') + 1;
        const tier = TIERS.find((x) => x.id === cur.tier);
        const bonus = place === 1 ? 100 : place === 2 ? 40 : place === 3 ? 20 : 0;
        const promoted = bonus ? School.addXp(bonus * tier.mult) : null;
        if (place === 1) data.titles.push({ tier: tier.name, date: new Date().toISOString().slice(0, 10) });
        cur.lastNote = `${cur.lastNote}\nTournoi terminé : vous finissez ${place === 1 ? '1er' : `${place}e`} sur 8.${bonus ? ` Bonus +${Math.round(bonus * tier.mult)} XP.` : ''}${promoted ? ` Nouveau rang : ${promoted.name} !` : ''}`;
    }

    // ---------------- Affichage ----------------
    function render() {
        const cur = t();
        $('arenaTitles').textContent = data.titles.length ? `Titres remportés : ${data.titles.map((x) => x.tier).join(', ')}` : '';
        $('arenaTiers').classList.toggle('hidden', Boolean(cur && !cur.finished));
        $('arenaCurrent').classList.toggle('hidden', !cur);
        if (!cur || cur.finished) renderTiers();
        if (!cur) return;
        const tier = TIERS.find((x) => x.id === cur.tier);
        $('arenaName').textContent = tier.name;
        $('arenaNote').textContent = cur.lastNote || '';
        const games = cur.rounds[cur.rounds.length - 1];
        const g = games.find((x) => x.a === 'me' || x.b === 'me');
        if (cur.finished) {
            $('arenaRound').textContent = 'Tournoi terminé';
            $('arenaNext').textContent = '';
            $('btnArenaPlay').classList.add('hidden');
            $('btnArenaQuit').textContent = 'Fermer';
        } else {
            const foe = cur.players.find((p) => p.id === (g.a === 'me' ? g.b : g.a));
            $('arenaRound').textContent = `Ronde ${cur.rounds.length} / ${ROUNDS}`;
            $('arenaNext').textContent = `Prochaine partie : ${foe.name} (${LEVEL[foe.level]}), vous menez ${g.a === 'me' ? 'l\'Empire (blancs)' : 'la Résistance (noirs)'}.`;
            $('btnArenaPlay').classList.remove('hidden');
            $('btnArenaQuit').textContent = 'Abandonner le tournoi';
        }
        $('arenaTable').innerHTML = `<thead><tr><th>#</th><th>Participant</th><th>Points</th><th>Départage</th></tr></thead><tbody>${scores(cur).map((p, i) =>
            `<tr class="${p.id === 'me' ? 'me' : ''}"><td>${i + 1}</td><td>${p.name}${p.level ? ` <small>${LEVEL[p.level]}</small>` : ''}</td><td>${p.pts}</td><td>${p.buch}</td></tr>`).join('')}</tbody>`;
    }

    function renderTiers() {
        const box = $('arenaTiers');
        box.innerHTML = '';
        TIERS.forEach((tier) => {
            const locked = tier.full && !Themes.full;
            const card = document.createElement('div');
            card.className = 'tier' + (locked ? ' locked' : '');
            card.innerHTML = `<h3>${tier.name}</h3><p>${tier.text}</p>`;
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'btn';
            b.textContent = locked ? 'Édition complète' : 'Commencer';
            b.disabled = locked;
            b.addEventListener('click', () => startTournament(tier));
            card.appendChild(b);
            box.appendChild(card);
        });
    }

    function init() {
        $('btnArena').addEventListener('click', () => { CCGame.showScreen('arena'); render(); });
        $('btnArenaPlay').addEventListener('click', playRound);
        $('btnArenaQuit').addEventListener('click', () => {
            if (t() && !t().finished && !confirm('Abandonner ce tournoi ? Les parties déjà jouées restent comptées pour votre expérience.')) return;
            data.current = null;
            save();
            render();
        });
        $('btnArenaMenu').addEventListener('click', () => CCGame.showScreen('intro'));
    }

    return { init };
})();

Arena.init();
