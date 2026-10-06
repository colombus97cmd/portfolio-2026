/* CHAINS & CROWNS — Moteur de règles d'échecs
   Plateau : tableau de 64 cases, index = rangée * 8 + colonne.
   Rangée 0 = 8e rangée (côté noirs), rangée 7 = 1re rangée (côté blancs).
   Pièce : chaîne de 2 caractères, couleur ('w' | 'b') + type ('P','N','B','R','Q','K'). */

const Engine = (() => {
    const FILES = 'abcdefgh';
    const KNIGHT = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
    const KING = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    const ORTHO = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const row = (sq) => sq >> 3;
    const col = (sq) => sq & 7;
    const inside = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;
    const other = (color) => (color === 'w' ? 'b' : 'w');
    const name = (sq) => FILES[col(sq)] + (8 - row(sq));

    function initial() {
        const back = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
        const board = new Array(64).fill(null);
        for (let c = 0; c < 8; c++) {
            board[c] = 'b' + back[c];
            board[8 + c] = 'bP';
            board[48 + c] = 'wP';
            board[56 + c] = 'w' + back[c];
        }
        return { board, turn: 'w', castling: { wK: true, wQ: true, bK: true, bQ: true }, ep: null, halfmove: 0, fullmove: 1 };
    }

    function isAttacked(board, sq, by) {
        const r = row(sq), c = col(sq);
        const pawnDir = by === 'w' ? 1 : -1; // un pion blanc attaque vers le haut : il se trouve sous la case
        for (const dc of [-1, 1]) {
            const rr = r + pawnDir, cc = c + dc;
            if (inside(rr, cc) && board[rr * 8 + cc] === by + 'P') return true;
        }
        for (const [dr, dc] of KNIGHT) {
            const rr = r + dr, cc = c + dc;
            if (inside(rr, cc) && board[rr * 8 + cc] === by + 'N') return true;
        }
        for (const [dr, dc] of KING) {
            const rr = r + dr, cc = c + dc;
            if (inside(rr, cc) && board[rr * 8 + cc] === by + 'K') return true;
        }
        const slide = (dirs, types) => dirs.some(([dr, dc]) => {
            let rr = r + dr, cc = c + dc;
            while (inside(rr, cc)) {
                const p = board[rr * 8 + cc];
                if (p) return p[0] === by && types.includes(p[1]);
                rr += dr; cc += dc;
            }
            return false;
        });
        return slide(DIAG, 'BQ') || slide(ORTHO, 'RQ');
    }

    function kingSquare(board, color) {
        return board.indexOf(color + 'K');
    }

    function inCheck(state, color = state.turn) {
        return isAttacked(state.board, kingSquare(state.board, color), other(color));
    }

    function pseudoMoves(state) {
        const { board, turn } = state;
        const moves = [];
        const add = (from, to, extra = {}) => moves.push({ from, to, piece: board[from], captured: board[to], ...extra });

        for (let sq = 0; sq < 64; sq++) {
            const p = board[sq];
            if (!p || p[0] !== turn) continue;
            const r = row(sq), c = col(sq), type = p[1];

            if (type === 'P') {
                const dir = turn === 'w' ? -1 : 1;
                const startRow = turn === 'w' ? 6 : 1;
                const lastRow = turn === 'w' ? 0 : 7;
                const pushPawn = (to, extra = {}) => {
                    if (row(to) === lastRow) ['Q', 'R', 'B', 'N'].forEach((promo) => add(sq, to, { ...extra, promo }));
                    else add(sq, to, extra);
                };
                const one = (r + dir) * 8 + c;
                if (inside(r + dir, c) && !board[one]) {
                    pushPawn(one);
                    const two = (r + 2 * dir) * 8 + c;
                    if (r === startRow && !board[two]) add(sq, two, { double: true });
                }
                for (const dc of [-1, 1]) {
                    if (!inside(r + dir, c + dc)) continue;
                    const to = (r + dir) * 8 + c + dc;
                    if (board[to] && board[to][0] !== turn) pushPawn(to);
                    else if (to === state.ep) add(sq, to, { enPassant: true, captured: other(turn) + 'P' });
                }
            } else if (type === 'N' || type === 'K') {
                for (const [dr, dc] of type === 'N' ? KNIGHT : KING) {
                    const rr = r + dr, cc = c + dc;
                    if (!inside(rr, cc)) continue;
                    const to = rr * 8 + cc;
                    if (!board[to] || board[to][0] !== turn) add(sq, to);
                }
                if (type === 'K') {
                    const home = turn === 'w' ? 60 : 4;
                    const enemy = other(turn);
                    if (sq === home && !isAttacked(board, home, enemy)) {
                        if (state.castling[turn + 'K'] && !board[home + 1] && !board[home + 2] && board[home + 3] === turn + 'R'
                            && !isAttacked(board, home + 1, enemy) && !isAttacked(board, home + 2, enemy)) {
                            add(sq, home + 2, { castle: 'K' });
                        }
                        if (state.castling[turn + 'Q'] && !board[home - 1] && !board[home - 2] && !board[home - 3] && board[home - 4] === turn + 'R'
                            && !isAttacked(board, home - 1, enemy) && !isAttacked(board, home - 2, enemy)) {
                            add(sq, home - 2, { castle: 'Q' });
                        }
                    }
                }
            } else {
                const dirs = type === 'B' ? DIAG : type === 'R' ? ORTHO : DIAG.concat(ORTHO);
                for (const [dr, dc] of dirs) {
                    let rr = r + dr, cc = c + dc;
                    while (inside(rr, cc)) {
                        const to = rr * 8 + cc;
                        if (board[to]) {
                            if (board[to][0] !== turn) add(sq, to);
                            break;
                        }
                        add(sq, to);
                        rr += dr; cc += dc;
                    }
                }
            }
        }
        return moves;
    }

    function makeMove(state, m) {
        const board = state.board.slice();
        const color = state.turn;
        const castling = { ...state.castling };

        board[m.to] = m.promo ? color + m.promo : board[m.from];
        board[m.from] = null;
        if (m.enPassant) board[m.to + (color === 'w' ? 8 : -8)] = null;
        if (m.castle === 'K') { board[m.to - 1] = board[m.to + 1]; board[m.to + 1] = null; }
        if (m.castle === 'Q') { board[m.to + 1] = board[m.to - 2]; board[m.to - 2] = null; }

        if (m.piece[1] === 'K') { castling[color + 'K'] = false; castling[color + 'Q'] = false; }
        for (const [sq, key] of [[63, 'wK'], [56, 'wQ'], [7, 'bK'], [0, 'bQ']]) {
            if (m.from === sq || m.to === sq) castling[key] = false;
        }

        return {
            board,
            turn: other(color),
            castling,
            ep: m.double ? (m.from + m.to) / 2 : null,
            halfmove: m.piece[1] === 'P' || m.captured ? 0 : state.halfmove + 1,
            fullmove: state.fullmove + (color === 'b' ? 1 : 0),
        };
    }

    function legalMoves(state) {
        return pseudoMoves(state).filter((m) => !inCheck(makeMove(state, m), state.turn));
    }

    function insufficientMaterial(board) {
        const pieces = board.filter(Boolean).filter((p) => p[1] !== 'K');
        if (pieces.length === 0) return true;
        return pieces.length === 1 && 'BN'.includes(pieces[0][1]);
    }

    function status(state) {
        const moves = legalMoves(state);
        const check = inCheck(state);
        if (moves.length === 0) return check ? 'checkmate' : 'stalemate';
        if (state.halfmove >= 100) return 'fifty';
        if (insufficientMaterial(state.board)) return 'insufficient';
        return check ? 'check' : 'playing';
    }

    function notation(state, m) {
        if (m.castle) return m.castle === 'K' ? 'O-O' : 'O-O-O';
        const type = m.piece[1] === 'P' ? '' : m.piece[1];
        const capture = m.captured ? (type ? 'x' : FILES[col(m.from)] + 'x') : '';
        return type + capture + name(m.to) + (m.promo ? '=' + m.promo : '');
    }

    return { initial, legalMoves, makeMove, status, inCheck, kingSquare, notation, name, row, col, other };
})();
