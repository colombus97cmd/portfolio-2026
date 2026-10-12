/* CHAINS & CROWNS — Programme de l'École de la Résistance
   Chaque exercice : position (cases → pièces) écrite du point de vue des blancs, puis inversée automatiquement pour que
   l'élève mène la Résistance (voir js/school-rules.js) ; les exercices « setup » partent de la position initiale.
   Objectifs : capture (case facultative), promote, castle, enpassant, check, mate, mate2 (mat en deux coups),
   moves (liste de coups acceptés « e2e4 »), avec indice et explication.
   Les chapitres marqués full ne sont ouverts que dans l'édition complète. Vérifié par tools/test-lessons.mjs. */

const LESSONS = [
    {
        id: 'pieces', title: 'Les pièces et leurs pas', rank: 0, full: false,
        intro: 'Avant de mener la Résistance, il faut connaître ses forces. Chaque pièce a sa manière de se déplacer et de capturer.',
        lessons: [
            {
                id: 'pion', title: 'Le pion',
                text: ['Le pion avance tout droit d\'une case, ou de deux cases lors de son tout premier déplacement.', 'Il capture en diagonale, d\'une case vers l\'avant. Arrivé au bout du plateau, il se transforme (promotion).'],
                exercises: [
                    { layout: { e1: 'wK', e8: 'bK', e2: 'wP' }, goal: { type: 'moves', accept: ['e2e4'] }, task: 'Avancez le pion de deux cases.', hint: 'Au premier pas, un pion peut avancer de deux cases.' },
                    { layout: { a1: 'wK', h8: 'bK', d4: 'wP', e5: 'bN' }, goal: { type: 'capture', square: 'e5' }, task: 'Capturez le cavalier impérial.', hint: 'Le pion prend en diagonale.' },
                    { layout: { e1: 'wK', h8: 'bK', a7: 'wP' }, goal: { type: 'promote' }, task: 'Amenez le pion au bout du plateau.', hint: 'Une case de plus, et le pion devient une Dame.' },
                ],
            },
            {
                id: 'tour-fou', title: 'La tour et le fou',
                text: ['La tour glisse en ligne droite, horizontalement ou verticalement, aussi loin que le chemin est libre.', 'Le fou glisse en diagonale et reste toujours sur des cases de la même couleur.'],
                exercises: [
                    { layout: { g1: 'wK', a1: 'wR', a7: 'bB', h8: 'bK' }, goal: { type: 'capture', square: 'a7' }, task: 'Avec la tour, capturez le fou.', hint: 'La colonne a est libre.' },
                    { layout: { e1: 'wK', c1: 'wB', h6: 'bR', a8: 'bK' }, goal: { type: 'capture', square: 'h6' }, task: 'Avec le fou, capturez la tour.', hint: 'Suivez la diagonale qui part de c1.' },
                ],
            },
            {
                id: 'dame-cavalier-roi', title: 'La dame, le cavalier et le roi',
                text: ['La dame combine la tour et le fou : c\'est la pièce la plus puissante.', 'Le cavalier saute en « L » (deux cases puis une sur le côté) et peut passer par-dessus les autres pièces.', 'Le roi se déplace d\'une case dans toutes les directions. Il ne doit jamais rester en prise.'],
                exercises: [
                    { layout: { e1: 'wK', d1: 'wQ', d7: 'bN', h8: 'bK' }, goal: { type: 'capture', square: 'd7' }, task: 'Avec la dame, capturez le cavalier.', hint: 'La colonne d est ouverte.' },
                    { layout: { e1: 'wK', g1: 'wN', f3: 'bP', e8: 'bK' }, goal: { type: 'capture', square: 'f3' }, task: 'Avec le cavalier, capturez le pion.', hint: 'Le cavalier avance de deux cases dans une direction, puis d\'une case sur le côté.' },
                    { layout: { e4: 'wK', d5: 'bP', a8: 'bK' }, goal: { type: 'capture', square: 'd5' }, task: 'Avec le roi, capturez le pion isolé.', hint: 'Le roi avance d\'une case, en diagonale ici.' },
                ],
            },
        ],
    },
    {
        id: 'mat', title: 'Échec, mat et pat', rank: 0, full: false,
        intro: 'Le but du jeu : mettre le roi adverse en échec sans qu\'il puisse s\'échapper. C\'est l\'échec et mat.',
        lessons: [
            {
                id: 'echec', title: 'L\'échec et comment y répondre',
                text: ['Un roi attaqué est « en échec ». Il faut alors le sauver : le déplacer, capturer l\'attaquant ou s\'interposer.', 'Quand c\'est possible, capturer l\'attaquant est souvent la meilleure réponse.'],
                exercises: [
                    { layout: { g1: 'wK', d1: 'wQ', e8: 'bK', e7: 'bP' }, goal: { type: 'check' }, task: 'Mettez le roi impérial en échec.', hint: 'La dame peut attaquer le roi en diagonale ou par une ligne libre.' },
                    { layout: { e1: 'wK', c3: 'wN', e4: 'bQ', e8: 'bK' }, goal: { type: 'capture', square: 'e4' }, task: 'Votre roi est en échec : la meilleure réponse ?', hint: 'Le cavalier peut capturer la dame qui attaque.' },
                ],
            },
            {
                id: 'mats-simples', title: 'Les premiers mats',
                text: ['Le « mat du couloir » : un roi enfermé derrière ses propres pions ne peut pas fuir une attaque sur sa dernière rangée.', 'Avec le soutien du roi, la dame peut aussi donner mat tout près du roi adverse.'],
                exercises: [
                    { layout: { g1: 'wK', f2: 'wP', g2: 'wP', h2: 'wP', a1: 'wR', g8: 'bK', f7: 'bP', g7: 'bP', h7: 'bP' }, goal: { type: 'mate' }, task: 'Échec et mat en un coup.', hint: 'Le roi impérial est enfermé par ses pions.' },
                    { layout: { g1: 'wK', d1: 'wQ', g8: 'bK', f7: 'bP', g7: 'bP', h7: 'bP' }, goal: { type: 'mate' }, task: 'Échec et mat en un coup, avec la dame.', hint: 'Même idée : la dernière rangée.' },
                    { layout: { g6: 'wK', a7: 'wQ', h8: 'bK' }, goal: { type: 'mate' }, task: 'Échec et mat : la dame, soutenue par le roi.', hint: 'Placez la dame tout contre le roi, là où votre roi la protège.' },
                ],
            },
            {
                id: 'pat', title: 'Attention au pat',
                text: ['Si le camp au trait n\'est pas en échec mais n\'a plus aucun coup légal, c\'est le « pat » : la partie est nulle.', 'Avec un gros avantage, il faut donc laisser une case au roi adverse… ou donner mat directement.'],
                exercises: [
                    { layout: { b6: 'wK', h7: 'wQ', a8: 'bK' }, goal: { type: 'mate' }, task: 'Donnez mat, sans pat !', hint: 'Cherchez un échec : le roi impérial n\'a presque plus de cases.' },
                ],
            },
        ],
    },
    {
        id: 'regles', title: 'Les coups spéciaux', rank: 1, full: true,
        intro: 'Trois règles surprennent souvent les débutants : le roque, la prise en passant et la promotion.',
        lessons: [
            {
                id: 'roque', title: 'Le roque',
                text: ['Le roque met le roi à l\'abri et active la tour, en un seul coup : le roi glisse de deux cases vers la tour, qui passe de l\'autre côté.', 'Interdit si le roi ou la tour a déjà bougé, si le roi est en échec ou s\'il traverse une case attaquée.'],
                exercises: [
                    { layout: { e1: 'wK', h1: 'wR', f2: 'wP', g2: 'wP', h2: 'wP', e8: 'bK' }, castling: { wK: true }, goal: { type: 'castle' }, task: 'Roquez pour mettre le roi à l\'abri.', hint: 'Déplacez le roi de deux cases vers la tour.' },
                ],
            },
            {
                id: 'en-passant', title: 'La prise en passant',
                text: ['Quand un pion avance de deux cases et arrive à côté d\'un pion adverse, celui-ci peut le capturer « en passant », comme s\'il n\'avait avancé que d\'une case.', 'C\'est possible seulement au coup qui suit immédiatement.'],
                exercises: [
                    { layout: { e1: 'wK', e5: 'wP', d5: 'bP', e8: 'bK' }, ep: 'd6', goal: { type: 'enpassant' }, task: 'Le pion impérial vient d\'avancer de deux cases (d7-d5). Prenez-le en passant.', hint: 'Votre pion en e5 se place en d6.' },
                ],
            },
            {
                id: 'promotion', title: 'La promotion décisive',
                text: ['La promotion transforme le pion en dame, tour, fou ou cavalier. Bien placée, elle peut donner mat sur-le-champ.'],
                exercises: [
                    { layout: { b6: 'wK', c7: 'wP', a8: 'bK' }, goal: { type: 'mate' }, task: 'Promotion… et mat !', hint: 'La nouvelle dame attaque toute la 8e rangée.' },
                ],
            },
        ],
    },
    {
        id: 'valeur', title: 'La valeur des pièces', rank: 1, full: true,
        intro: 'Pion 1, cavalier et fou 3, tour 5, dame 9. Compter le matériel évite les mauvais échanges.',
        lessons: [
            {
                id: 'prendre', title: 'Prendre ce qui est gratuit',
                text: ['Une pièce non protégée est « en prise » : on peut la gagner sans rien donner.', 'À l\'inverse, capturer une pièce protégée avec une pièce plus précieuse fait souvent perdre du matériel.'],
                exercises: [
                    { layout: { g1: 'wK', d4: 'wQ', a7: 'bR', e5: 'bP', f6: 'bP', h8: 'bK' }, goal: { type: 'moves', accept: ['d4a7'] }, task: 'Votre dame est attaquée. Quelle capture est gagnante ?', hint: 'Le pion e5 est protégé par f6 ; la tour, elle, est seule.' },
                ],
            },
        ],
    },
    {
        id: 'tactique', title: 'Les tactiques de la Résistance', rank: 2, full: true,
        intro: 'Les petites forces peuvent vaincre les grandes : fourchettes, clouages, enfilades et attaques à la découverte.',
        lessons: [
            {
                id: 'fourchette', title: 'La fourchette',
                text: ['Une pièce qui attaque deux cibles à la fois réalise une « fourchette ». Le cavalier y excelle.'],
                exercises: [
                    { layout: { g1: 'wK', b5: 'wN', e8: 'bK', a8: 'bQ' }, goal: { type: 'moves', accept: ['b5c7'] }, task: 'Attaquez le roi et la dame en même temps.', hint: 'Cherchez la case d\'où le cavalier touche e8 et a8.' },
                ],
            },
            {
                id: 'clouage', title: 'Le clouage',
                text: ['Une pièce « clouée » ne peut pas bouger sans exposer une pièce plus précieuse derrière elle, souvent son roi.'],
                exercises: [
                    { layout: { g1: 'wK', f1: 'wB', d7: 'bN', e8: 'bK' }, goal: { type: 'moves', accept: ['f1b5'] }, task: 'Clouez le cavalier contre son roi.', hint: 'Une diagonale passe par d7 et e8.' },
                ],
            },
            {
                id: 'enfilade', title: 'L\'enfilade',
                text: ['L\'enfilade est un clouage inversé : on attaque la pièce la plus précieuse, qui doit s\'écarter et laisser prendre celle de derrière.'],
                exercises: [
                    { layout: { h1: 'wK', a1: 'wR', d5: 'bK', d8: 'bQ' }, goal: { type: 'moves', accept: ['a1d1'] }, task: 'Faites échec : le roi s\'écartera, la dame tombera.', hint: 'Roi et dame sont sur la même colonne.' },
                ],
            },
            {
                id: 'decouverte', title: 'L\'attaque à la découverte',
                text: ['En déplaçant une pièce, on « découvre » l\'attaque d\'une autre placée derrière. Si cette attaque est un échec, la pièce qui bouge peut capturer ce qu\'elle veut.'],
                exercises: [
                    { layout: { h1: 'wK', e1: 'wR', e4: 'wN', c5: 'bQ', e8: 'bK' }, goal: { type: 'moves', accept: ['e4c5'] }, task: 'Gagnez la dame grâce à un échec à la découverte.', hint: 'Le cavalier bouge, la tour fait échec… et le cavalier capture.' },
                ],
            },
        ],
    },
    {
        id: 'mat2', title: 'Combinaisons et mats en deux coups', rank: 3, full: true,
        intro: 'Un sacrifice bien calculé ouvre la voie au mat. Calculez chaque réponse de l\'Empire.',
        lessons: [
            {
                id: 'couloir-sacrifice', title: 'Le sacrifice sur la dernière rangée',
                text: ['Quand le roi est enfermé, sacrifier une pièce pour dévier le défenseur permet souvent de donner mat au coup suivant.'],
                exercises: [
                    { layout: { g1: 'wK', f2: 'wP', g2: 'wP', h2: 'wP', e1: 'wR', e2: 'wQ', c8: 'bR', g8: 'bK', f7: 'bP', g7: 'bP', h7: 'bP' }, goal: { type: 'mate2' }, task: 'Mat en deux coups.', hint: 'Votre tour et votre dame sont alignées sur la colonne e.' },
                ],
            },
        ],
    },
    {
        id: 'ouverture', title: 'Les principes d\'ouverture', rank: 4, full: true,
        intro: 'Bien commencer : occuper le centre, sortir ses pièces, mettre son roi à l\'abri.',
        lessons: [
            {
                id: 'centre', title: 'Le centre',
                text: ['Les cases centrales (d4, e4, d5, e5) donnent de l\'espace et de la mobilité. Les pions centraux et les cavaliers les contrôlent le mieux.'],
                exercises: [
                    { setup: ['e2e4'], goal: { type: 'moves', accept: ['e7e5', 'c7c5', 'e7e6', 'd7d5', 'g8f6'] }, task: 'L\'Empire ouvre par e4. Répondez par un bon coup.', hint: 'Contestez le centre : un pion central, ou le cavalier vers f6.' },
                ],
            },
            {
                id: 'developpement', title: 'Développer et roquer',
                text: ['Sortez les cavaliers et les fous avant de déplacer plusieurs fois la même pièce, puis roquez tôt.'],
                exercises: [
                    { setup: ['e2e4', 'e7e5', 'g1f3', 'b8c6', 'f1c4'], goal: { type: 'moves', accept: ['f8c5', 'g8f6', 'f8e7'] }, task: 'Poursuivez votre développement.', hint: 'Sortez le fou f8 ou le cavalier g8 : ensuite, vous pourrez roquer.' },
                ],
            },
        ],
    },
    {
        id: 'finales', title: 'Les finales', rank: 4, full: true,
        intro: 'Quand il reste peu de pièces, chaque temps compte. Le roi devient une pièce d\'attaque.',
        lessons: [
            {
                id: 'carre', title: 'La règle du carré',
                text: ['Un pion passé file à la promotion. Si le roi adverse est hors du « carré » du pion (le carré dont un côté va du pion à la case de promotion), il ne peut plus le rattraper.'],
                exercises: [
                    { layout: { h1: 'wK', a4: 'wP', f5: 'bK' }, goal: { type: 'moves', accept: ['a4a5'] }, task: 'Le roi impérial peut-il rattraper le pion ? Jouez le coup gagnant.', hint: 'Le roi en f5 est hors du carré : foncez !' },
                ],
            },
            {
                id: 'mat-tours', title: 'Mats de la tour',
                text: ['Une tour suffit à mater avec l\'aide du roi ; deux tours se relaient comme les marches d\'un escalier.'],
                exercises: [
                    { layout: { g6: 'wK', a1: 'wR', h8: 'bK' }, goal: { type: 'mate' }, task: 'Mat avec la tour.', hint: 'Votre roi garde g7 et h7.' },
                    { layout: { a1: 'wK', a7: 'wR', b1: 'wR', h8: 'bK' }, goal: { type: 'mate' }, task: 'Mat avec les deux tours.', hint: 'Une tour tient la 7e rangée ; l\'autre frappe la 8e rangée.' },
                ],
            },
        ],
    },
];

/** Rangs de l'École, du Rebelle au Maître des rébellions (points d'expérience). */
const RANKS = [
    { name: 'Rebelle', xp: 0 },
    { name: 'Éclaireur·se', xp: 150 },
    { name: 'Combattant·e', xp: 350 },
    { name: 'Capitaine', xp: 650 },
    { name: 'Commandant·e', xp: 1000 },
    { name: 'Maître des rébellions', xp: 1500 },
];

if (typeof module !== 'undefined') module.exports = { LESSONS, RANKS };
