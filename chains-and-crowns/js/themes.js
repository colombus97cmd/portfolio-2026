/* CHAINS & CROWNS — Packs de thème (skins)
   Un pack = un jeu complet de 12 sprites + les couleurs du plateau.
   Les packs ci-dessous se débloquent avec des cauris (gratuits, voir js/progress.js) et restent liés à l'appareil.
   Une éventuelle édition de collection vendue sur BeamUp devra s'acheter, jamais se gagner en jouant :
   le jeu ne dépend que de cette interface, quelle que soit la façon dont le joueur a obtenu le pack. */

const Themes = (() => {
    const packs = {
        'edition-1802': {
            id: 'edition-1802',
            name: 'Édition 1802',
            sprites: window.CC_SPRITES,
            board: { light: '#e6d3b3', dark: '#5b3a26' },
            price: 0,
        },
        'nuit-matouba': {
            id: 'nuit-matouba',
            name: 'Nuit de Matouba',
            sprites: window.CC_SPRITES,
            board: { light: '#b9c4b0', dark: '#2f4434' },
            price: 150,
        },
        'soufriere': {
            id: 'soufriere',
            name: 'Soufrière',
            sprites: window.CC_SPRITES,
            board: { light: '#e9c39b', dark: '#7a2e1c' },
            price: 300,
        },
        'ocean-caraibe': {
            id: 'ocean-caraibe',
            name: 'Océan caraïbe',
            sprites: window.CC_SPRITES,
            board: { light: '#d6e8e4', dark: '#1d5e6b' },
            price: 500,
        },
    };

    let current = packs['edition-1802'];
    // Les plateaux à débloquer font partie de l'édition complète (voir js/edition.js).
    const full = window.CC_EDITION === 'complete';
    const owned = (id) => packs[id] && (packs[id].price === 0 || (full && typeof Progress !== 'undefined' && Progress.owns(id)));

    function apply(id) {
        if (!owned(id)) return false;
        current = packs[id];
        document.documentElement.style.setProperty('--sq-light', current.board.light);
        document.documentElement.style.setProperty('--sq-dark', current.board.dark);
        return true;
    }

    return {
        list: () => Object.values(packs),
        apply,
        owned,
        full,
        sprite: (piece) => current.sprites[piece],
        get current() { return current; },
    };
})();
