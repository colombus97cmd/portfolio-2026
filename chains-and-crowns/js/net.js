/* CHAINS & CROWNS — Duels en ligne (WebRTC pair-à-pair via PeerJS)
   Recherche d'adversaire sans serveur dédié : des « salles d'attente » à identifiants connus.
   - Un joueur tente d'occuper la salle k : s'il y parvient, il attend un adversaire (hôte).
   - Si la salle est déjà occupée, il s'y connecte (invité). Si l'hôte est déjà en partie, salle suivante.
   Le serveur public PeerJS ne sert qu'à la mise en relation ; la partie circule ensuite directement
   entre les deux navigateurs. */

const Net = (() => {
    const PREFIX = 'chains-and-crowns-1802-salle-';
    const SLOTS = 12;
    const PROTOCOL = 1;

    let peer = null;
    let conn = null;
    let cancelled = false;
    const handlers = {};

    const on = (type, fn) => { handlers[type] = fn; };
    const emit = (type, data) => handlers[type] && handlers[type](data);

    function send(msg) {
        if (conn && conn.open) conn.send(msg);
    }

    function close() {
        cancelled = true;
        try { conn && conn.close(); } catch { /* déjà fermé */ }
        try { peer && peer.destroy(); } catch { /* déjà détruit */ }
        conn = null;
        peer = null;
    }

    function attach(c) {
        conn = c;
        c.on('data', (msg) => {
            if (!msg || typeof msg !== 'object') return;
            emit(msg.type, msg);
        });
        c.on('close', () => emit('disconnect'));
        c.on('error', () => emit('disconnect'));
    }

    /** Tente d'occuper la salle `slot`. Résout 'host' si réussi, 'taken' si la salle est occupée. */
    function claim(slot) {
        return new Promise((resolve, reject) => {
            const p = new Peer(PREFIX + slot, { debug: 0 });
            const timer = setTimeout(() => { p.destroy(); reject(new Error('timeout')); }, 12000);
            p.on('open', () => { clearTimeout(timer); peer = p; resolve('host'); });
            p.on('error', (err) => {
                clearTimeout(timer);
                p.destroy();
                if (err.type === 'unavailable-id') resolve('taken');
                else reject(err);
            });
        });
    }

    /** Se connecte à l'hôte de la salle `slot`. Résout le message 'welcome' ou 'busy'. */
    function joinSlot(slot, hello) {
        return new Promise((resolve, reject) => {
            const p = new Peer({ debug: 0 });
            const timer = setTimeout(() => { p.destroy(); resolve({ type: 'busy' }); }, 10000);
            p.on('error', (err) => { clearTimeout(timer); p.destroy(); reject(err); });
            p.on('open', () => {
                const c = p.connect(PREFIX + slot, { reliable: true });
                c.on('open', () => c.send(hello));
                c.on('data', (msg) => {
                    if (msg.type === 'busy') { clearTimeout(timer); c.close(); p.destroy(); resolve(msg); }
                    if (msg.type === 'welcome') { clearTimeout(timer); peer = p; attach(c); resolve(msg); }
                });
                c.on('error', () => { clearTimeout(timer); p.destroy(); resolve({ type: 'busy' }); });
            });
        });
    }

    /**
     * Cherche un adversaire. onStatus(texte) informe l'interface.
     * Résout { color, opponent } : la couleur jouée localement et le pseudo adverse.
     */
    async function findMatch(pseudo, onStatus) {
        if (typeof Peer === 'undefined') throw new Error('Le module de connexion (PeerJS) n\'a pas pu être chargé.');
        cancelled = false;
        const hello = { type: 'hello', pseudo, protocol: PROTOCOL };

        for (let slot = 0; slot < SLOTS && !cancelled; slot++) {
            onStatus(`Recherche d'un adversaire… (salle ${slot + 1}/${SLOTS})`);
            const claimed = await claim(slot);
            if (cancelled) break;

            if (claimed === 'host') {
                onStatus('En attente d\'un adversaire… Partagez le jeu pour trouver un rival !');
                return new Promise((resolve) => {
                    peer.on('connection', (c) => {
                        c.on('data', (msg) => {
                            if (msg.type !== 'hello') return;
                            if (conn || msg.protocol !== PROTOCOL) { c.send({ type: 'busy' }); setTimeout(() => c.close(), 200); return; }
                            const hostColor = Math.random() < 0.5 ? 'w' : 'b';
                            attach(c);
                            send({ type: 'welcome', pseudo, guestColor: hostColor === 'w' ? 'b' : 'w' });
                            resolve({ color: hostColor, opponent: String(msg.pseudo || 'Anonyme').slice(0, 20) });
                        });
                    });
                });
            }

            const reply = await joinSlot(slot, hello);
            if (reply.type === 'welcome') return { color: reply.guestColor, opponent: String(reply.pseudo || 'Anonyme').slice(0, 20) };
        }
        throw new Error(cancelled ? 'Recherche annulée.' : 'Toutes les salles sont occupées, réessayez dans un instant.');
    }

    return { findMatch, send, on, close };
})();
