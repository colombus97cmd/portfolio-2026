/* CHAINS & CROWNS — IA impériale (negamax + élagage alpha-bêta) */

const AI = (() => {
    const VALUE = { P: 100, N: 320, B: 330, R: 500, Q: 900, K: 0 };

    // Tables de placement (point de vue des blancs, rangée 0 = 8e rangée).
    const PST = {
        P: [0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30, 20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5,
            0, 0, 0, 20, 20, 0, 0, 0, 5, -5, -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0, 0],
        N: [-50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30, 0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30,
            -30, 0, 15, 20, 20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20, -40, -50, -40, -30, -30, -30, -30, -40, -50],
        B: [-20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10,
            -10, 0, 10, 10, 10, 10, 0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20, -10, -10, -10, -10, -10, -10, -20],
        R: [0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5,
            -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0],
        Q: [-20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5, 5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5,
            0, 0, 5, 5, 5, 5, 0, -5, -10, 5, 5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10, -10, -20],
        K: [-30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40, -30,
            -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20, -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20],
    };

    function evaluate(state) {
        let score = 0;
        state.board.forEach((p, sq) => {
            if (!p) return;
            const type = p[1];
            const idx = p[0] === 'w' ? sq : (7 - (sq >> 3)) * 8 + (sq & 7);
            const v = VALUE[type] + PST[type][idx];
            score += p[0] === 'w' ? v : -v;
        });
        return state.turn === 'w' ? score : -score;
    }

    function order(moves) {
        return moves.sort((a, b) => (b.captured ? VALUE[b.captured[1]] * 10 - VALUE[b.piece[1]] : 0) + (b.promo ? 800 : 0)
            - ((a.captured ? VALUE[a.captured[1]] * 10 - VALUE[a.piece[1]] : 0) + (a.promo ? 800 : 0)));
    }

    function negamax(state, depth, alpha, beta, ply) {
        const moves = Engine.legalMoves(state);
        if (moves.length === 0) return Engine.inCheck(state) ? -100000 + ply : 0;
        if (depth === 0) return evaluate(state);
        for (const m of order(moves)) {
            const score = -negamax(Engine.makeMove(state, m), depth - 1, -beta, -alpha, ply + 1);
            if (score >= beta) return beta;
            if (score > alpha) alpha = score;
        }
        return alpha;
    }

    /** level : 1 (Recrue), 2 (Officier), 3 (Général). */
    function bestMove(state, level = 2) {
        // Mélange puis tri stable : à score égal, l'IA varie ses coups d'une partie à l'autre.
        const legal = Engine.legalMoves(state);
        for (let i = legal.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [legal[i], legal[j]] = [legal[j], legal[i]];
        }
        const moves = order(legal);
        if (!moves.length) return null;
        if (level === 1 && Math.random() < 0.35) return moves[Math.floor(Math.random() * moves.length)];
        let best = moves[0], bestScore = -Infinity;
        for (const m of moves) {
            // Profondeur totale = niveau (1 à 3 demi-coups) pour rester fluide dans le navigateur.
            const score = -negamax(Engine.makeMove(state, m), level - 1, -Infinity, -bestScore, 1);
            if (score > bestScore) { bestScore = score; best = m; }
        }
        return best;
    }

    return { bestMove, VALUE };
})();
