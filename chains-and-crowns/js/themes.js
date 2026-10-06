/* CHAINS & CROWNS — Packs de thème (skins)
   Un pack = un jeu complet de 12 sprites + les couleurs du plateau.
   C'est l'unité qui pourra être vendue ou détenue (achat classique, ou objet numérique de collection) :
   le jeu ne dépend que de cette interface, quelle que soit la façon dont le joueur l'a obtenue. */

const Themes = (() => {
    const packs = {
        'edition-1802': {
            id: 'edition-1802',
            name: 'Édition 1802 — Résistance contre Empire',
            sprites: window.CC_SPRITES,
            board: { light: '#e6d3b3', dark: '#5b3a26' },
            owned: true, // pack de base, gratuit
        },
    };

    let current = packs['edition-1802'];

    function apply(id) {
        if (!packs[id] || !packs[id].owned) return false;
        current = packs[id];
        document.documentElement.style.setProperty('--sq-light', current.board.light);
        document.documentElement.style.setProperty('--sq-dark', current.board.dark);
        return true;
    }

    return {
        list: () => Object.values(packs),
        apply,
        sprite: (piece) => current.sprites[piece],
        get current() { return current; },
    };
})();
