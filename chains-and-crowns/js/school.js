/* CHAINS & CROWNS — École de la Résistance
   Leçons interactives (js/lessons.js), vérifiées par le moteur (js/school-rules.js), et rangs du Rebelle
   au Maître des rébellions. L'expérience vient des exercices et du tournoi hors ligne (js/arena.js).
   Progression conservée sur cet appareil. Démo : les deux premiers chapitres ; le reste dans l'édition complète. */

const School = (() => {
    const KEY = 'chainsAndCrowns.school';
    const XP = { first: 20, hint: 12, retry: 8 };
    const $ = (id) => document.getElementById(id);
    const NAMES = { P: 'pion', N: 'cavalier', B: 'fou', R: 'tour', Q: 'dame', K: 'roi' };

    const load = () => { try { return { xp: 0, solved: {}, ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return { xp: 0, solved: {} }; } };
    let data = load();
    const save = () => { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* stockage bloqué */ } };

    const rankIndex = (xp = data.xp) => RANKS.reduce((r, k, i) => (xp >= k.xp ? i : r), 0);
    const rank = () => RANKS[rankIndex()];
    const next = () => RANKS[rankIndex() + 1] || null;

    /** Ajoute de l'expérience (exercices, tournoi) ; renvoie le nouveau rang s'il change. */
    function addXp(amount) {
        const before = rankIndex();
        data.xp += Math.max(0, Math.round(amount));
        save();
        const after = rankIndex();
        renderRank();
        return after > before ? RANKS[after] : null;
    }

    function renderRank() {
        const r = rank(), n = next();
        const line = n ? `${r.name} · ${data.xp} / ${n.xp} XP vers ${n.name}` : `${r.name} · ${data.xp} XP — rang suprême`;
        document.querySelectorAll('[data-rank-line]').forEach((el) => { el.textContent = line; });
        const pct = n ? `${Math.min(100, ((data.xp - r.xp) / (n.xp - r.xp)) * 100)}%` : '100%';
        document.querySelectorAll('.rank-bar').forEach((bar) => { bar.style.width = pct; });
    }

    // ---------------- Liste des chapitres ----------------
    const exId = (ch, l, i) => `${ch.id}/${l.id}/${i}`;
    const lessonDone = (ch, l) => l.exercises.every((_, i) => data.solved[exId(ch, l, i)]);

    function renderMap() {
        const box = $('schoolMap');
        box.innerHTML = '';
        LESSONS.forEach((ch) => {
            const locked = ch.full && !Themes.full;
            const sec = document.createElement('section');
            sec.className = 'chapter' + (locked ? ' locked' : '');
            const done = ch.lessons.filter((l) => lessonDone(ch, l)).length;
            sec.innerHTML = `<h3>${ch.title} <small>${done}/${ch.lessons.length}</small></h3><p>${ch.intro}</p>`;
            const list = document.createElement('div');
            list.className = 'lesson-list';
            ch.lessons.forEach((l) => {
                const b = document.createElement('button');
                b.type = 'button';
                b.className = 'lesson-btn' + (lessonDone(ch, l) ? ' done' : '');
                b.textContent = (lessonDone(ch, l) ? '✓ ' : '') + l.title;
                b.disabled = locked;
                b.addEventListener('click', () => openLesson(ch, l));
                list.appendChild(b);
            });
            sec.appendChild(list);
            if (locked) sec.insertAdjacentHTML('beforeend', '<p class="lock-note">Édition complète (BeamUp)</p>');
            box.appendChild(sec);
        });
    }

    // ---------------- Leçon et exercices ----------------
    let cur = null; // { ch, l, i, state, start, selected, targets, tries, hinted, phase, last }

    function openLesson(ch, l) {
        cur = { ch, l, i: 0 };
        $('lessonTitle').textContent = l.title;
        $('lessonText').innerHTML = l.text.map((t) => `<p>${t}</p>`).join('');
        $('schoolMap').classList.add('hidden');
        $('schoolLesson').classList.remove('hidden');
        loadExercise(0);
    }

    function loadExercise(i) {
        const ex = SchoolRules.prepare(cur.l.exercises[i]);
        const state = ex.state;
        Object.assign(cur, { i, ex, state, start: state, selected: null, targets: [], tries: 0, hinted: false, phase: 1, last: null, solved: false });
        $('exCount').textContent = `Exercice ${i + 1} / ${cur.l.exercises.length}`;
        $('exTask').textContent = ex.task;
        feedback('', '');
        $('btnExNext').classList.add('hidden');
        $('btnExHint').disabled = false;
        $('btnExSolution').disabled = false;
        drawBoard();
    }

    const me = () => cur.start.turn;
    const visual = (vr, vc) => (me() === 'b' ? (7 - vr) * 8 + (7 - vc) : vr * 8 + vc);

    function drawBoard(hint = null) {
        const board = $('schoolBoard');
        board.innerHTML = '';
        const st = cur.state;
        const checkSq = Engine.inCheck(st) ? Engine.kingSquare(st.board, st.turn) : -1;
        for (let vr = 0; vr < 8; vr++) for (let vc = 0; vc < 8; vc++) {
            const sq = visual(vr, vc);
            const p = st.board[sq];
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'square' + ((Engine.row(sq) + Engine.col(sq)) % 2 ? ' dark' : '');
            btn.dataset.sq = sq;
            btn.setAttribute('aria-label', Engine.name(sq) + (p ? `, ${NAMES[p[1]]} ${p[0] === me() ? 'de la Résistance' : 'impérial'}` : ''));
            if (cur.last && (sq === cur.last.from || sq === cur.last.to)) btn.classList.add('last');
            if (sq === cur.selected) btn.classList.add('selected');
            const t = cur.targets.find((m) => m.to === sq);
            if (t) btn.classList.add('target', ...(t.captured ? ['capture'] : []));
            if (hint && (sq === hint.from || sq === hint.to)) btn.classList.add('suggest');
            if (sq === checkSq) btn.classList.add('check');
            if (vr === 7) btn.insertAdjacentHTML('beforeend', `<span class="coord file">${Engine.name(sq)[0]}</span>`);
            if (vc === 0) btn.insertAdjacentHTML('beforeend', `<span class="coord rank">${Engine.name(sq)[1]}</span>`);
            if (p) btn.insertAdjacentHTML('beforeend', Themes.sprite(p));
            board.appendChild(btn);
        }
    }

    function feedback(text, tone) {
        const el = $('exFeedback');
        el.textContent = text;
        el.className = 'ex-feedback ' + tone;
    }

    function onSquare(sq) {
        if (!cur || cur.solved || cur.state.turn !== me()) return;
        const move = cur.targets.find((m) => m.to === sq);
        if (move) {
            const options = cur.targets.filter((m) => m.to === sq);
            return attempt(options.find((m) => m.promo === 'Q') || move);
        }
        const p = cur.state.board[sq];
        cur.selected = p && p[0] === me() ? sq : null;
        cur.targets = cur.selected === null ? [] : Engine.legalMoves(cur.state).filter((m) => m.from === sq);
        drawBoard();
    }

    function attempt(m) {
        cur.selected = null; cur.targets = [];
        // Mat en deux, second temps : il faut donner mat.
        if (cur.phase === 2) {
            const after = Engine.makeMove(cur.state, m);
            if (Engine.status(after) === 'checkmate') { cur.state = after; cur.last = m; return success('Échec et mat !'); }
            cur.tries++;
            drawBoard();
            return feedback('Ce n\'est pas encore mat. Cherchez le coup qui achève la combinaison.', 'bad');
        }
        const res = SchoolRules.check(cur.state, m, cur.ex.goal);
        if (!res.ok) {
            cur.tries++;
            drawBoard();
            return feedback(res.stalemate ? 'Pat ! Le roi impérial n\'a plus de coup mais n\'est pas en échec : partie nulle. Laissez-lui une case… ou donnez mat.' : 'Pas tout à fait. Réessayez, ou demandez un indice.', 'bad');
        }
        cur.state = Engine.makeMove(cur.state, m);
        cur.last = m;
        if (cur.ex.goal.type === 'mate2' && Engine.status(cur.state) !== 'checkmate') {
            drawBoard();
            feedback('Bien vu ! L\'Empire répond…', 'good');
            setTimeout(() => {
                const r = SchoolRules.defence(cur.state);
                cur.state = Engine.makeMove(cur.state, r);
                cur.last = r;
                cur.phase = 2;
                drawBoard();
                feedback(`L'Empire a joué ${Engine.name(r.from)}-${Engine.name(r.to)}. À vous : donnez mat.`, '');
            }, 700);
            return;
        }
        success('Bravo !');
    }

    function success(text) {
        cur.solved = true;
        drawBoard();
        const id = exId(cur.ch, cur.l, cur.i);
        let gained = 0;
        if (!data.solved[id]) {
            gained = cur.tries === 0 && !cur.hinted ? XP.first : cur.hinted ? XP.hint : XP.retry;
            data.solved[id] = true;
            save();
        }
        const promoted = gained ? addXp(gained) : null;
        feedback(`${text}${gained ? ` +${gained} XP` : ''}${promoted ? ` — Nouveau rang : ${promoted.name} !` : ''}`, 'good');
        const last = cur.i === cur.l.exercises.length - 1;
        $('btnExNext').textContent = last ? 'Leçon terminée' : 'Exercice suivant';
        $('btnExNext').classList.remove('hidden');
        $('btnExHint').disabled = true;
        $('btnExSolution').disabled = true;
    }

    function solutionMove() {
        const legal = Engine.legalMoves(cur.state);
        if (cur.phase === 2) return SchoolRules.mateIn1(cur.state);
        return legal.find((m) => SchoolRules.check(cur.state, m, cur.ex.goal).ok && (!m.promo || m.promo === 'Q')) || null;
    }

    function init() {
        $('schoolBoard').addEventListener('click', (e) => {
            const sq = e.target.closest('.square');
            if (sq) onSquare(parseInt(sq.dataset.sq, 10));
        });
        $('btnExHint').addEventListener('click', () => { cur.hinted = true; feedback(cur.ex.hint, ''); });
        $('btnExSolution').addEventListener('click', () => {
            cur.hinted = true;
            const m = solutionMove();
            if (m) { drawBoard(m); feedback(`Solution : ${Engine.name(m.from)} → ${Engine.name(m.to)}. Jouez-la pour continuer.`, ''); }
        });
        $('btnExReset').addEventListener('click', () => loadExercise(cur.i));
        $('btnExNext').addEventListener('click', () => {
            if (cur.i < cur.l.exercises.length - 1) return loadExercise(cur.i + 1);
            backToMap();
        });
        $('btnLessonBack').addEventListener('click', backToMap);
        $('btnSchool').addEventListener('click', open);
        $('btnSchoolMenu').addEventListener('click', () => CCGame.showScreen('intro'));
        renderRank();
    }

    function backToMap() {
        $('schoolLesson').classList.add('hidden');
        $('schoolMap').classList.remove('hidden');
        renderMap();
    }

    function open() {
        CCGame.showScreen('school');
        backToMap();
        renderRank();
    }

    return { init, addXp, rank, renderRank, open };
})();

School.init();
