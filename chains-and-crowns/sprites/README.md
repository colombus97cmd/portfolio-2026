# Sprites — Chains & Crowns (Édition 1802)

12 pièces-objets vectorielles (SVG, 100 × 100), générées par `node tools/build-sprites.js`.
Pour modifier une pièce, éditer le générateur puis relancer la commande : `*.svg`, `planche.svg` et `sprites.js` sont régénérés.

| Pièce | Résistance (`b`, joueur) | Empire (`w`, IA) |
|---|---|---|
| Roi | Couronne de chaînes brisées + flamme | Couronne impériale à croix |
| Dame | Madras noué (hommage aux combattantes, dont Solitude) | Couronne de lauriers |
| Fou | Tambour ka (le messager) | Bicorne à cocarde |
| Cavalier | Crinière de maillons, dernier maillon brisé | Plumet et bride de cuirassier |
| Tour | Habitation en pierre (Matouba), porte embrasée | Fort à créneaux et drapeau de 1802 |
| Pion | Collier de fer brisé | Shako à cocarde et plumet |

Aucune pièce ne représente le visage d'une personne réelle : les figures historiques sont évoquées par des symboles.

## Calques pour l'animation

Chaque fichier contient les mêmes groupes nommés :

| Calque | Contenu | Idées d'animation |
|---|---|---|
| `socle` | Piédestal commun | Ombre qui s'étire au saut, secousse à la capture |
| `corps` | Fût de la pièce | Squash & stretch au déplacement |
| `embleme` | Symbole distinctif | Rebond (pièce sélectionnée), rotation (échec au roi) |
| `flamme` | Braise / lueur (Roi et Tour résistants) | Scintillement en boucle |

- **CSS / web** : dans le jeu, les calques deviennent des classes (`.embleme`, `.flamme`) ; voir `css/game.css` (animations `bob`, `flicker`, `alarm`, `arrive`, `shatter`).
- **After Effects** : importer le SVG via Illustrator (« Créer des calques à partir des sous-calques ») ; chaque groupe devient un calque animable. Export web possible en **Lottie** (Bodymovin).
- **Spine / Rive** : importer le SVG, lier `embleme` et `flamme` à des os enfants de `corps`.

## Nouveaux packs (skins)

Un pack = 12 sprites avec les mêmes calques + 2 couleurs de plateau, déclaré dans `js/themes.js`.
Le jeu n'utilise que `Themes.sprite(pièce)` : un nouveau pack ne demande aucune modification des règles.
