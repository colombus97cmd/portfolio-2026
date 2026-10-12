/* CHAINS & CROWNS — Règles des exercices de l'École (logique pure, testée par tools/test-lessons.mjs).
   Les exercices sont écrits du point de vue des blancs, puis inversés automatiquement (couleurs, rangées, textes)
   pour que l'élève mène toujours la Résistance (noirs), comme dans le jeu. Les exercices « setup » (ouvertures,
   partie jouée depuis la position initiale) sont déjà écrits avec la Résistance au trait. */

const SchoolRules = (() => {
    const key = (m) => Engine.name(m.from) + Engine.name(m.to);
    const flipName = (n) => n[0] + (9 - Number(n[1]));
    const flipColor = (p) => (p[0] === 'w' ? 'b' : 'w') + p[1];
    const flipText = (t) => String(t || '')
        .replace(/\b([a-h])([1-8])\b/g, (_, f, r) => f + (9 - Number(r)))
        .replace(/\b8e rangée/g, '1re rangée').replace(/\b7e rangée/g, '2e rangée');

    /** Exercice prêt à jouer : { state, goal, task, hint }, inversé pour la Résistance si besoin. */
    function prepare(ex) {
        if (ex.setup) {
            let s = Engine.initial();
            for (const k of ex.setup) {
                const m = Engine.legalMoves(s).find((x) => key(x) === k && (!x.promo || x.promo === 'Q'));
                if (!m) throw new Error(`Coup de mise en place illégal : ${k}`);
                s = Engine.makeMove(s, m);
            }
            return { state: s, goal: ex.goal, task: ex.task, hint: ex.hint };
        }
        const layout = Object.fromEntries(Object.entries(ex.layout).map(([sq, p]) => [flipName(sq), flipColor(p)]));
        const castling = Object.fromEntries(Object.entries(ex.castling || {}).map(([k, v]) => [(k[0] === 'w' ? 'b' : 'w') + k[1], v]));
        const state = Engine.fromLayout(layout, Engine.other(ex.turn || 'w'), { castling, ep: ex.ep ? flipName(ex.ep) : null });
        const goal = { ...ex.goal };
        if (goal.square) goal.square = flipName(goal.square);
        if (goal.accept) goal.accept = goal.accept.map((k) => flipName(k.slice(0, 2)) + flipName(k.slice(2, 4)));
        return { state, goal, task: flipText(ex.task), hint: flipText(ex.hint) };
    }

    /** Un coup qui donne mat immédiatement, s'il existe. */
    const mateIn1 = (state) => Engine.legalMoves(state).find((m) => Engine.status(Engine.makeMove(state, m)) === 'checkmate') || null;

    /** Le coup m force-t-il le mat au coup suivant, quelle que soit la réponse ? */
    function forcesMate(state, m) {
        const after = Engine.makeMove(state, m);
        const st = Engine.status(after);
        if (st === 'checkmate') return true;
        if (st !== 'check' && st !== 'playing') return false;
        return Engine.legalMoves(after).every((r) => mateIn1(Engine.makeMove(after, r)));
    }

    /** Le coup m atteint-il l'objectif ? { ok, stalemate } */
    function check(state, m, goal) {
        const after = Engine.makeMove(state, m);
        const st = Engine.status(after);
        const res = (ok) => ({ ok, stalemate: st === 'stalemate' });
        switch (goal.type) {
            case 'moves': return res(goal.accept.includes(key(m)));
            case 'capture': return res(Boolean(m.captured) && (!goal.square || Engine.name(m.to) === goal.square));
            case 'promote': return res(Boolean(m.promo));
            case 'castle': return res(Boolean(m.castle));
            case 'enpassant': return res(Boolean(m.enPassant));
            case 'check': return res(st === 'check' || st === 'checkmate');
            case 'mate': return res(st === 'checkmate');
            case 'mate2': return res(forcesMate(state, m));
            default: return res(false);
        }
    }

    /** Réponse de l'Empire dans un mat en deux (au hasard parmi les coups légaux : tous mènent au mat). */
    function defence(state) {
        const moves = Engine.legalMoves(state);
        return moves[Math.floor(Math.random() * moves.length)] || null;
    }

    return { key, prepare, check, mateIn1, forcesMate, defence };
})();
