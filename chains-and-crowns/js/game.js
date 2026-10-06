/* CHAINS & CROWNS — Déroulement de la partie
   Deux modes :
   - « ai »     : le joueur mène la Résistance (noirs) ; l'IA impériale (blancs) ouvre la partie.
   - « online » : duel entre deux joueurs, camps tirés au sort (voir js/net.js). */

(() => {
    const NAMES = { P: 'Pion', N: 'Cavalier', B: 'Fou', R: 'Tour', Q: 'Dame', K: 'Roi' };
    const FACTION = { w: 'Empire', b: 'Résistance' };
    const GRADES = { S: 'Maître', A: 'Expert', B: 'Confirmé', C: 'Débutant', D: 'Apprenti', F: 'Novice' };
    const STORAGE_KEY = 'chainsAndCrowns.champion';

    const $ = (id) => document.getElementById(id);
    const els = {
        intro: $('introScreen'), search: $('searchScreen'), game: $('gameScreen'), board: $('board'), info: $('info'), chrono: $('chrono'),
        moves: $('moves'), capTop: $('capturedTop'), capBottom: $('capturedBottom'), labelTop: $('labelTop'), labelBottom: $('labelBottom'),
        promo: $('promoModal'), promoChoices: $('promoChoices'), end: $('endModal'), searchStatus: $('searchStatus'),
    };

    let mode, me, them, level, pseudo, opponent;
    let state, selected, targets, lastMove, history, startTime, timer, busy, over;

    // ---------------- Stockage local (tolérant aux navigateurs qui le bloquent) ----------------
    const store = {
        get() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; } },
        set(v) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch { /* ignoré */ } },
    };

    function showChampion() {
        const c = store.get();
        $('championLine').textContent = c ? `Dernier champion : ${c.pseudo} — note ${c.grade} (${GRADES[c.grade]})` : '';
    }

    function showScreen(name) {
        els.intro.classList.toggle('hidden', name !== 'intro');
        els.search.classList.toggle('hidden', name !== 'search');
        els.game.classList.toggle('hidden', name !== 'game');
    }

    // ---------------- Affichage ----------------
    // Le camp du joueur est toujours en bas de l'écran.
    const visual = (vr, vc) => (me === 'b' ? (7 - vr) * 8 + (7 - vc) : vr * 8 + vc);

    function render(animate) {
        els.board.innerHTML = '';
        const checkSq = Engine.inCheck(state) ? Engine.kingSquare(state.board, state.turn) : -1;
        for (let vr = 0; vr < 8; vr++) {
            for (let vc = 0; vc < 8; vc++) {
                const sq = visual(vr, vc);
                const p = state.board[sq];
                const btn = document.createElement('button');
                btn.className = 'square' + ((Engine.row(sq) + Engine.col(sq)) % 2 ? ' dark' : '');
                btn.dataset.sq = sq;
                btn.setAttribute('aria-label', Engine.name(sq) + (p ? `, ${NAMES[p[1]]} ${p[0] === 'w' ? 'impérial' : 'résistant'}` : ''));
                if (lastMove && (sq === lastMove.from || sq === lastMove.to)) btn.classList.add('last');
                if (sq === selected) btn.classList.add('selected');
                const t = targets.find((m) => m.to === sq);
                if (t) btn.classList.add('target', ...(t.captured ? ['capture'] : []));
                if (sq === checkSq) btn.classList.add('check');
                if (vr === 7) btn.insertAdjacentHTML('beforeend', `<span class="coord file">${Engine.name(sq)[0]}</span>`);
                if (vc === 0) btn.insertAdjacentHTML('beforeend', `<span class="coord rank">${Engine.name(sq)[1]}</span>`);
                if (p) btn.insertAdjacentHTML('beforeend', Themes.sprite(p));
                els.board.appendChild(btn);
            }
        }
        if (animate && lastMove) {
            const size = els.board.clientWidth / 8;
            const flip = me === 'b' ? 1 : -1;
            const dx = (Engine.col(lastMove.to) - Engine.col(lastMove.from)) * size * flip;
            const dy = (Engine.row(lastMove.to) - Engine.row(lastMove.from)) * size * flip;
            const svg = els.board.querySelector(`[data-sq="${lastMove.to}"] .piece-svg`);
            if (svg) {
                svg.style.setProperty('--dx', dx + 'px');
                svg.style.setProperty('--dy', dy + 'px');
                svg.classList.add('arrive');
            }
        }
        renderCaptured();
    }

    function renderCaptured() {
        const start = Engine.initial().board;
        const count = (b, p) => b.filter((x) => x === p).length;
        const lost = (color) => 'QRBNP'.split('').flatMap((t) => Array(Math.max(0, count(start, color + t) - count(state.board, color + t))).fill(color + t));
        els.capBottom.innerHTML = lost(them).map((p) => Themes.sprite(p)).join(''); // prises du joueur
        els.capTop.innerHTML = lost(me).map((p) => Themes.sprite(p)).join('');      // prises de l'adversaire
    }

    function setInfo(text, alert = false) {
        els.info.textContent = text;
        els.info.classList.toggle('alert', alert);
    }

    function addHistory(prev, m, after) {
        const st = Engine.status(after);
        const suffix = st === 'checkmate' ? '#' : st === 'check' ? '+' : '';
        history.push(Engine.notation(prev, m) + suffix);
        els.moves.innerHTML = '';
        for (let i = 0; i < history.length; i += 2) {
            const li = document.createElement('li');
            li.innerHTML = `<span>${history[i]}</span><span>${history[i + 1] || ''}</span>`;
            els.moves.appendChild(li);
        }
        els.moves.scrollTop = els.moves.scrollHeight;
    }

    // ---------------- Coups ----------------
    function play(m, fromRemote = false) {
        if (mode === 'online' && !fromRemote) Net.send({ type: 'move', from: m.from, to: m.to, promo: m.promo || null });
        const doMove = () => {
            const prev = state;
            state = Engine.makeMove(state, m);
            lastMove = m;
            selected = null;
            targets = [];
            addHistory(prev, m, state);
            render(true);
            afterMove();
        };
        const victimSq = m.enPassant ? m.to + (m.piece[0] === 'w' ? 8 : -8) : m.to;
        const victim = m.captured && els.board.querySelector(`[data-sq="${victimSq}"] .piece-svg`);
        if (victim) {
            victim.classList.add('captured-out');
            setTimeout(doMove, 180);
        } else doMove();
    }

    function afterMove() {
        const st = Engine.status(state);
        const winner = Engine.other(state.turn);
        if (st === 'checkmate') return finish(winner === me ? 'win' : 'loss', 'Échec et mat.');
        if (st === 'stalemate') return finish('draw', 'Pat : aucun coup légal, la partie est nulle.');
        if (st === 'fifty') return finish('draw', 'Règle des 50 coups : partie nulle.');
        if (st === 'insufficient') return finish('draw', 'Matériel insuffisant : partie nulle.');

        if (state.turn === me) {
            setInfo(st === 'check' ? 'Votre Roi est en échec !' : 'À vous de jouer.', st === 'check');
            return;
        }
        const label = mode === 'ai' ? 'L\'Empire' : opponent;
        setInfo(st === 'check' ? `Échec ! ${label} réfléchit…` : `${label} réfléchit…`, st === 'check');
        if (mode === 'ai') {
            busy = true;
            setTimeout(() => {
                const m = AI.bestMove(state, level);
                busy = false;
                if (!over) play(m);
            }, 380);
        }
    }

    function onSquare(sq) {
        if (busy || over || state.turn !== me) return;
        const move = targets.find((m) => m.to === sq);
        if (move) {
            const options = targets.filter((m) => m.to === sq);
            if (options.length > 1 && options[0].promo) return askPromotion(options);
            return play(move);
        }
        const p = state.board[sq];
        if (p && p[0] === me) {
            selected = sq;
            targets = Engine.legalMoves(state).filter((m) => m.from === sq);
        } else {
            selected = null;
            targets = [];
        }
        render(false);
    }

    function askPromotion(options) {
        els.promoChoices.innerHTML = '';
        ['Q', 'R', 'B', 'N'].forEach((t) => {
            const b = document.createElement('button');
            b.innerHTML = Themes.sprite(me + t);
            b.setAttribute('aria-label', 'Promouvoir en ' + NAMES[t]);
            b.addEventListener('click', () => {
                els.promo.classList.add('hidden');
                play(options.find((m) => m.promo === t));
            });
            els.promoChoices.appendChild(b);
        });
        els.promo.classList.remove('hidden');
        els.promoChoices.querySelector('button').focus();
    }

    // ---------------- Réseau ----------------
    Net.on('move', (msg) => {
        if (mode !== 'online' || over || state.turn !== them) return;
        const m = Engine.legalMoves(state).find((x) => x.from === msg.from && x.to === msg.to && (x.promo || null) === (msg.promo || null));
        if (!m) return finish('win', 'L\'adversaire a envoyé un coup illégal : partie interrompue.');
        play(m, true);
    });
    Net.on('resign', () => { if (mode === 'online' && !over) finish('win', `${opponent} a abandonné.`); });
    Net.on('disconnect', () => { if (mode === 'online' && !over) finish('win', `${opponent} s'est déconnecté.`); });

    async function searchOpponent() {
        showScreen('search');
        els.searchStatus.textContent = 'Connexion au service de mise en relation…';
        try {
            const match = await Net.findMatch(pseudo, (t) => { els.searchStatus.textContent = t; });
            opponent = match.opponent;
            start('online', match.color);
        } catch (err) {
            Net.close();
            els.searchStatus.textContent = err.message || 'Connexion impossible.';
        }
    }

    // ---------------- Fin de partie et note ----------------
    function grade(result) {
        const minutes = (Date.now() - startTime) / 60000;
        const myMoves = Math.floor(history.length / 2);
        if (result === 'win') {
            const material = state.board.filter((p) => p && p[0] === me).reduce((s, p) => s + AI.VALUE[p[1]], 0) / 3900;
            const strength = mode === 'ai' ? level : 3; // vaincre un humain vaut le niveau Général
            const points = 60 + 15 * strength + 20 * material - Math.min(25, Math.max(0, minutes - 8) * 1.5);
            return points >= 95 ? 'S' : points >= 80 ? 'A' : 'B';
        }
        if (result === 'draw') return 'C';
        return myMoves >= 30 ? 'D' : 'F';
    }

    function finish(result, reason) {
        if (over) return;
        over = true;
        clearInterval(timer);
        const g = grade(result);
        const winnerFaction = result === 'draw' ? null : FACTION[result === 'win' ? me : them];
        $('endTitle').textContent = result === 'draw' ? 'Partie nulle'
            : result === 'resign' ? 'Abandon'
                : `Victoire ${winnerFaction === 'Empire' ? 'de l\'Empire' : 'de la Résistance'}`;
        $('endGrade').textContent = g;
        $('endGradeLabel').textContent = GRADES[g];
        const versus = mode === 'ai' ? `niveau ${['', 'Recrue', 'Officier', 'Général'][level]}` : `contre ${opponent}`;
        const n = Math.ceil(history.length / 2);
        $('endDetails').textContent = `${reason} ${n} coup${n > 1 ? 's' : ''} en ${els.chrono.textContent}, ${versus}.`;
        if (result === 'win') store.set({ pseudo, grade: g, date: new Date().toISOString().slice(0, 10) });
        setInfo(reason, result !== 'win');
        render(false);
        $('btnReplay').textContent = mode === 'online' ? 'Nouvel adversaire' : 'Rejouer';
        els.end.classList.remove('hidden');
        $('btnReplay').focus();
        if (mode === 'online') setTimeout(() => Net.close(), 1500);
    }

    // ---------------- Cycle de vie ----------------
    function start(newMode, color) {
        mode = newMode;
        me = color;
        them = Engine.other(me);
        state = Engine.initial();
        selected = null; targets = []; lastMove = null; history = []; busy = false; over = false;
        startTime = Date.now();
        clearInterval(timer);
        timer = setInterval(() => {
            const s = Math.floor((Date.now() - startTime) / 1000);
            els.chrono.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
        }, 500);
        els.chrono.textContent = '00:00';
        els.moves.innerHTML = '';
        const themName = mode === 'ai' ? 'IA' : opponent;
        els.labelTop.textContent = `${FACTION[them]} — ${themName}`;
        els.labelBottom.textContent = `${FACTION[me]} — ${pseudo}`;
        els.end.classList.add('hidden');
        showScreen('game');
        render(false);
        if (mode === 'online') setInfo(me === 'w' ? `Vous menez l'Empire contre ${opponent}. À vous d'ouvrir !` : `Vous menez la Résistance contre ${opponent}.`);
        afterMove();
    }

    function toMenu() {
        if (mode === 'online' && !over) Net.send({ type: 'resign' });
        over = true;
        clearInterval(timer);
        Net.close();
        els.end.classList.add('hidden');
        showScreen('intro');
        showChampion();
    }

    $('mode').addEventListener('change', () => { $('levelField').classList.toggle('hidden', $('mode').value !== 'ai'); });
    $('introForm').addEventListener('submit', (e) => {
        e.preventDefault();
        pseudo = $('pseudo').value.trim().slice(0, 20) || 'Combattant anonyme';
        level = parseInt($('level').value, 10);
        if ($('mode').value === 'online') searchOpponent();
        else start('ai', 'b');
    });
    els.board.addEventListener('click', (e) => {
        const sq = e.target.closest('.square');
        if (sq) onSquare(parseInt(sq.dataset.sq, 10));
    });
    $('btnCancelSearch').addEventListener('click', () => { Net.close(); showScreen('intro'); });
    $('btnResign').addEventListener('click', () => {
        if (over || !confirm('Abandonner la partie ?')) return;
        if (mode === 'online') Net.send({ type: 'resign' });
        finish('resign', 'Vous avez abandonné.');
    });
    $('btnMenu').addEventListener('click', toMenu);
    $('btnEndMenu').addEventListener('click', toMenu);
    $('btnReplay').addEventListener('click', () => (mode === 'online' ? searchOpponent() : start('ai', 'b')));
    window.addEventListener('resize', () => { if (!els.game.classList.contains('hidden')) render(false); });
    window.addEventListener('beforeunload', () => { if (mode === 'online' && !over) Net.send({ type: 'resign' }); });

    Themes.apply('edition-1802');
    showChampion();
})();
