/* CHAINS & CROWNS — Déroulement de la partie
   Le joueur mène la Résistance (noirs, en bas) ; l'IA impériale (blancs) ouvre la partie. */

(() => {
    const PLAYER = 'b';
    const AI_COLOR = 'w';
    const NAMES = { P: 'Pion', N: 'Cavalier', B: 'Fou', R: 'Tour', Q: 'Dame', K: 'Roi' };
    const GRADES = {
        S: 'Maître', A: 'Expert', B: 'Confirmé', C: 'Débutant', D: 'Apprenti', F: 'Novice',
    };
    const STORAGE_KEY = 'chainsAndCrowns.champion';

    const $ = (id) => document.getElementById(id);
    const els = {
        intro: $('introScreen'), game: $('gameScreen'), board: $('board'), info: $('info'), chrono: $('chrono'),
        moves: $('moves'), capW: $('capturedByWhite'), capB: $('capturedByBlack'), playerName: $('playerName'),
        promo: $('promoModal'), promoChoices: $('promoChoices'), end: $('endModal'),
    };

    let state, level, pseudo, selected, targets, lastMove, history, startTime, timer, busy, over;

    // ---------------- Stockage local (tolérant aux navigateurs qui le bloquent) ----------------
    const store = {
        get() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch { return null; } },
        set(v) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch { /* ignoré */ } },
    };

    function showChampion() {
        const c = store.get();
        $('championLine').textContent = c ? `Dernier champion : ${c.pseudo} — note ${c.grade} (${GRADES[c.grade]})` : '';
    }

    // ---------------- Affichage ----------------
    const visual = (vr, vc) => (7 - vr) * 8 + (7 - vc); // Résistance en bas

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
            const dx = (Engine.col(lastMove.to) - Engine.col(lastMove.from)) * size; // colonnes inversées à l'écran
            const dy = (Engine.row(lastMove.to) - Engine.row(lastMove.from)) * size;
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
        els.capB.innerHTML = lost('w').map((p) => Themes.sprite(p)).join('');
        els.capW.innerHTML = lost('b').map((p) => Themes.sprite(p)).join('');
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
    function play(m) {
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
        const victim = m.captured && els.board.querySelector(`[data-sq="${m.enPassant ? m.to + (m.piece[0] === 'w' ? 8 : -8) : m.to}"] .piece-svg`);
        if (victim) {
            victim.classList.add('captured-out');
            setTimeout(doMove, 180);
        } else doMove();
    }

    function afterMove() {
        const st = Engine.status(state);
        if (st === 'checkmate') return finish(state.turn === PLAYER ? 'loss' : 'win', 'Échec et mat.');
        if (st === 'stalemate') return finish('draw', 'Pat : aucun coup légal, la partie est nulle.');
        if (st === 'fifty') return finish('draw', 'Règle des 50 coups : partie nulle.');
        if (st === 'insufficient') return finish('draw', 'Matériel insuffisant : partie nulle.');
        if (state.turn === AI_COLOR) {
            setInfo(st === 'check' ? 'Échec à l\'Empire ! L\'Empire réfléchit…' : 'L\'Empire réfléchit…', st === 'check');
            busy = true;
            setTimeout(() => {
                const m = AI.bestMove(state, level);
                busy = false;
                if (!over) play(m);
            }, 380);
        } else {
            setInfo(st === 'check' ? 'Votre Roi est en échec !' : 'À vous de jouer.', st === 'check');
        }
    }

    function onSquare(sq) {
        if (busy || over || state.turn !== PLAYER) return;
        const move = targets.find((m) => m.to === sq);
        if (move) {
            const options = targets.filter((m) => m.to === sq);
            if (options.length > 1 && options[0].promo) return askPromotion(options);
            return play(move);
        }
        const p = state.board[sq];
        if (p && p[0] === PLAYER) {
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
            b.innerHTML = Themes.sprite(PLAYER + t);
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

    // ---------------- Fin de partie et note ----------------
    function grade(result) {
        const minutes = (Date.now() - startTime) / 60000;
        const playerMoves = Math.floor(history.length / 2);
        if (result === 'win') {
            const material = state.board.filter((p) => p && p[0] === PLAYER).reduce((s, p) => s + AI.VALUE[p[1]], 0) / 3900;
            const points = 60 + 15 * level + 20 * material - Math.min(25, Math.max(0, minutes - 8) * 1.5);
            return points >= 95 ? 'S' : points >= 80 ? 'A' : 'B';
        }
        if (result === 'draw') return 'C';
        return playerMoves >= 30 ? 'D' : 'F';
    }

    function finish(result, reason) {
        over = true;
        clearInterval(timer);
        const g = grade(result);
        const titles = { win: 'Victoire de la Résistance', loss: 'L\'Empire l\'emporte', draw: 'Partie nulle', resign: 'Abandon' };
        $('endTitle').textContent = titles[result];
        $('endGrade').textContent = g;
        $('endGradeLabel').textContent = GRADES[g];
        $('endDetails').textContent = `${reason} ${Math.ceil(history.length / 2)} coups en ${els.chrono.textContent}, niveau ${['', 'Recrue', 'Officier', 'Général'][level]}.`;
        if (result === 'win') store.set({ pseudo, grade: g, date: new Date().toISOString().slice(0, 10) });
        setInfo(reason, result !== 'win');
        render(false);
        els.end.classList.remove('hidden');
        $('btnReplay').focus();
    }

    // ---------------- Cycle de vie ----------------
    function start() {
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
        els.playerName.textContent = pseudo;
        els.end.classList.add('hidden');
        els.intro.classList.add('hidden');
        els.game.classList.remove('hidden');
        render(false);
        afterMove(); // l'Empire ouvre
    }

    function toMenu() {
        over = true;
        clearInterval(timer);
        els.end.classList.add('hidden');
        els.game.classList.add('hidden');
        els.intro.classList.remove('hidden');
        showChampion();
    }

    $('introForm').addEventListener('submit', (e) => {
        e.preventDefault();
        pseudo = $('pseudo').value.trim() || 'Combattant anonyme';
        level = parseInt($('level').value, 10);
        start();
    });
    els.board.addEventListener('click', (e) => {
        const sq = e.target.closest('.square');
        if (sq) onSquare(parseInt(sq.dataset.sq, 10));
    });
    $('btnResign').addEventListener('click', () => { if (!over && confirm('Abandonner la partie ?')) finish('resign', 'Vous avez abandonné.'); });
    $('btnMenu').addEventListener('click', toMenu);
    $('btnEndMenu').addEventListener('click', toMenu);
    $('btnReplay').addEventListener('click', start);
    window.addEventListener('resize', () => { if (!els.game.classList.contains('hidden')) render(false); });

    Themes.apply('edition-1802');
    showChampion();
})();
