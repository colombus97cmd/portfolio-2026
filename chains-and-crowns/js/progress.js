/* CHAINS & CROWNS — Progression du joueur (cauris, classement Elo, badges, thèmes débloqués)

   Cadre légal (France, art. L320-1 du Code de la sécurité intérieure) :
   un jeu est un jeu d'argent interdit dès qu'il réunit un sacrifice financier ET l'espérance d'un gain,
   même si l'issue dépend du seul savoir-faire. Les cauris sont donc conçus pour ne jamais être de l'argent :
   - ils sont GRATUITS : distribués au départ et chaque jour, ils ne s'achètent jamais ;
   - ils ne s'échangent pas entre joueurs et ne se convertissent ni en euros, ni en crypto, ni en NFT ;
   - ce qu'ils débloquent (thèmes) reste attaché à cet appareil et n'est ni revendable ni transférable.
   Ne pas ajouter d'achat de cauris, de retrait, de transfert ou de récompense revendable :
   cela ferait basculer le jeu dans le jeu d'argent. Les éditions de collection vendues sur BeamUp
   s'achètent, elles ne se gagnent jamais en jouant. */

const Progress = (() => {
    const STORAGE_KEY = 'chainsAndCrowns.profile';
    const START_CAURIS = 100;
    const DAILY_BONUS = 30;
    const FLOOR = 20;          // filet de sécurité : on ne reste jamais bloqué à zéro
    const K_FACTOR = 32;

    // Classement Elo de référence des trois niveaux de l'IA impériale.
    const AI_RATING = { 1: 800, 2: 1200, 3: 1600 };
    // Gain net en cauris pour une victoire, en multiple de la mise.
    const AI_PAYOUT = { 1: 0.5, 2: 1, 3: 2 };

    const BADGES = {
        premiereVictoire: { name: 'Premier sang', text: 'Gagner une première partie.' },
        recrue: { name: 'Briseur de rangs', text: 'Vaincre la Recrue.' },
        officier: { name: 'Fléau des officiers', text: 'Vaincre l\'Officier.' },
        general: { name: 'Matouba', text: 'Vaincre le Général.' },
        duelliste: { name: 'Duelliste', text: 'Gagner un duel en ligne.' },
        eclair: { name: 'Éclair', text: 'Gagner en moins de 25 coups.' },
        dix: { name: 'Vétéran', text: 'Gagner 10 parties.' },
        noteS: { name: 'Maître', text: 'Obtenir la note S.' },
    };

    const today = () => new Date().toISOString().slice(0, 10);

    function blank() {
        return { cauris: START_CAURIS, elo: 1000, wins: 0, losses: 0, draws: 0, badges: [], themes: ['edition-1802'], lastBonus: today() };
    }

    function load() {
        try {
            const p = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return p ? { ...blank(), ...p } : blank();
        } catch { return blank(); }
    }

    let profile = load();
    const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); } catch { /* ignoré */ } };

    /** Bonus quotidien gratuit et filet de sécurité. Renvoie le nombre de cauris offerts. */
    function claimDaily() {
        let gift = 0;
        if (profile.lastBonus !== today()) { gift += DAILY_BONUS; profile.lastBonus = today(); }
        if (profile.cauris + gift < FLOOR) gift = FLOOR - profile.cauris;
        profile.cauris += gift;
        save();
        return gift;
    }

    /** Engage la mise contre l'IA. Renvoie false si le solde est insuffisant. */
    function stake(amount) {
        if (amount < 0 || amount > profile.cauris) return false;
        profile.cauris -= amount;
        save();
        return true;
    }

    function updateElo(opponentRating, score) {
        const expected = 1 / (1 + 10 ** ((opponentRating - profile.elo) / 400));
        const delta = Math.round(K_FACTOR * (score - expected));
        profile.elo = Math.max(100, profile.elo + delta);
        return delta;
    }

    /**
     * Enregistre une fin de partie.
     * game = { mode, level, result: 'win'|'loss'|'draw'|'resign', stake, moves, grade, opponentElo }
     * Renvoie { cauris (variation affichée), elo (variation), badges (nouveaux) }.
     */
    function record(game) {
        const score = game.result === 'win' ? 1 : game.result === 'draw' ? 0.5 : 0;
        if (score === 1) profile.wins++; else if (score === 0.5) profile.draws++; else profile.losses++;

        let cauris = 0;
        if (game.mode === 'ai' && game.stake > 0) {
            if (score === 1) { cauris = Math.round(game.stake * AI_PAYOUT[game.level]); profile.cauris += game.stake + cauris; }
            else if (score === 0.5) profile.cauris += game.stake; // nulle : mise rendue
            else cauris = -game.stake;
        }

        const rating = game.mode === 'ai' ? AI_RATING[game.level] : (game.opponentElo || 1000);
        const elo = updateElo(rating, score);

        const earned = [];
        const award = (id) => { if (!profile.badges.includes(id)) { profile.badges.push(id); earned.push(BADGES[id]); } };
        if (score === 1) {
            award('premiereVictoire');
            if (game.mode === 'ai') award(['', 'recrue', 'officier', 'general'][game.level]);
            else award('duelliste');
            if (game.moves < 25) award('eclair');
            if (profile.wins >= 10) award('dix');
            if (game.grade === 'S') award('noteS');
        }
        save();
        return { cauris, elo, badges: earned };
    }

    function unlockTheme(id, price) {
        if (profile.themes.includes(id)) return true;
        if (profile.cauris < price) return false;
        profile.cauris -= price;
        profile.themes.push(id);
        save();
        return true;
    }

    return {
        get profile() { return profile; },
        claimDaily, stake, record, unlockTheme,
        owns: (id) => profile.themes.includes(id),
        setTheme(id) { profile.theme = id; save(); },
        BADGES, AI_RATING, AI_PAYOUT,
    };
})();
