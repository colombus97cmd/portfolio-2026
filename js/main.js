/* PURE JAVASCRIPT - EXHAUSTIVE PROJECT DATASET WITH MEGA-FOLDERS */

const projectsData = [
    {
        titre: "SAE : Présence & Réseaux Sociaux",
        tag: "Business",
        desc: "Dossier stratégique interactif, diaporama de soutenance et bannières optimisées de David Colombo (colombus97) pour le BUT MMI.",
        img: "assets/linkedin_banner.png",
        isFolder: true,
        category: "Cursus MMI",
        subProjects: [
            {
                titre: "Dossier Stratégique Interactif",
                tag: "Business",
                desc: "Rapport complet des livrables 1 à 4 : analyses SWOT, benchmark et calendrier de contenu.",
                link: "sae-reseaux.html",
                img: "assets/Logo.png"
            },
            {
                titre: "Diaporama de Soutenance Oral",
                tag: "Design",
                desc: "Diaporama interactif plein écran optimisé pour la présentation orale de 5 minutes.",
                link: "sae-soutenance-slides.html",
                img: "assets/afficheDSMMI1_David-colombo.png"
            },
            {
                titre: "Rapport PDF (Livrables 1 & 2)",
                tag: "Document",
                desc: "Rapport complet imprimable contenant l'audit numérique (SWOT, benchmark) et la stratégie personnelle.",
                link: "sae-print-livrables.html",
                img: "assets/Logo.png"
            },
            {
                titre: "Fiche Script Oral (PDF/Tablette)",
                tag: "Document",
                desc: "Fiche mémo téléchargeable et lisible sur tablette pour accompagner l'oral de 5 minutes.",
                link: "sae-print-soutenance.html?print=true",
                img: "assets/Logo.png"
            },
            {
                titre: "Bannière LinkedIn",
                tag: "Design",
                desc: "Bannière cyberpunk personnalisée créée pour le profil LinkedIn professionnel de David Colombo.",
                img: "assets/linkedin_banner.png"
            },
            {
                titre: "Bannière ArtStation",
                tag: "Design",
                desc: "Bannière cyberpunk personnalisée créée pour le profil ArtStation de colombus97.",
                img: "assets/artstation_banner.png"
            }
        ]
    },
    {
        titre: "IMPT.INF : Enquête & Média Numérique",
        tag: "Vidéo",
        desc: "Enquête multimédia étudiante traitant de la méritocratie et du racisme. Projet complet regroupant enquête, production vidéo et identité de marque.",
        img: "assets/impt_logo_illustration.jpg",
        isFolder: true,
        category: "Cursus MMI",
        subProjects: [
            {
                titre: "Enquête Vidéo : Documentaire",
                tag: "Vidéo",
                desc: "Le montage final de l'enquête traitant du racisme et du mythe de la méritocratie dans l'enseignement supérieur.",
                video: "assets/impt_montage_final.mp4"
            },
            {
                titre: "Article de Rédaction",
                tag: "Document",
                desc: "Article d'analyse approfondie sur le racisme systémique et la méritocratie scolaire.",
                link: "assets/impt_article_redactionnel.pdf",
                img: "assets/impt_logo_illustration.jpg"
            },
            {
                titre: "Identité de Marque : Logo",
                tag: "Design",
                desc: "Création du logotype et de la charte visuelle pour le média d'information numérique.",
                img: "assets/impt_logo_blanc.png"
            },
            {
                titre: "Instagram/TikTok Story",
                tag: "Vidéo",
                desc: "Capsule vidéo motion design vertical adaptée pour les stories et publications de réseaux sociaux.",
                video: "assets/impt_motion_story.mp4"
            },
            {
                titre: "Habillage Graphique (Motion)",
                tag: "Vidéo",
                desc: "Prototype d'habillage graphique et introduction animée du média.",
                video: "assets/impt_motion_design_1.mp4"
            },
            {
                titre: "Enregistrement Audio : Interview",
                tag: "Audio",
                desc: "Enregistrement sonore brut et montage de l'interview réalisée pour l'enquête.",
                link: "assets/impt_interview_1.m4a",
                img: "assets/impt_logo_blanc.png"
            }
        ]
    },
    {
        titre: "Jeu d'Échecs : Unity 3D WebGL",
        tag: "Code",
        desc: "Jeu d'échecs interactif en 3D développé sous Unity et intégré pour le web via WebGL.",
        link: "jeu-echecs/index.html",
        img: "assets/affiche_chains_crowns.png",
        category: "Cursus MMI",
        contexte: "Conception d'un jeu d'échecs complet en 3D avec interactions utilisateur et règles de jeu intégrées.",
        demarche: "Programmation des scripts de jeu en C# sous Unity, optimisation des meshes et shaders, et compilation WebGL pour intégration web fluide.",
        outils: ["Unity", "C#", "WebGL", "3D Render"]
    },
    {
        titre: "SAE 2.02 : WARA - Mode Éco-Responsable",
        tag: "Code",
        desc: "Intégration d'un site vitrine et e-commerce pour une marque de vêtements biodégradables à base de sargasses en Guadeloupe.",
        link: "https://sae-2-02-wara.vercel.app/index.html",
        img: "assets/Logo.png",
        category: "Cursus MMI",
        contexte: "Conception d'une marque de mode circulaire visant à valoriser les sargasses (algues invasives des Caraïbes) en textile biodégradable.",
        demarche: "Création de la charte graphique et développement front-end complet. Gestion du multilingue (FR/EN), animations au scroll et intégration d'un Style Quiz interactif.",
        outils: ["HTML5", "CSS3", "JavaScript", "AOS Library", "Ergonomie"]
    },
    {
        titre: "SAE 2.03 : Centre Social Le Moule",
        tag: "Code",
        desc: "Portail citoyen dynamique et interactif développé en PHP pour faciliter l'accès aux services de la ville du Moule.",
        link: "https://santsosyalmoule.infinityfree.me/index.php?i=1",
        img: "assets/Logo.png",
        category: "Cursus MMI",
        contexte: "Création d'une plateforme d'information et d'inscription aux événements/services d'un centre social guadeloupéen.",
        demarche: "Architecture MVC simplifiée, programmation dynamique backend en PHP/MySQL, gestion des bases de données et intégration d'une interface responsive avec gestion de thèmes.",
        outils: ["PHP", "SQL", "JavaScript", "Responsive Design", "Expérience Utilisateur (UX)"]
    },
    {
        titre: "Scream : Court-métrage 1 Minute",
        tag: "Vidéo",
        desc: "Exercice universitaire de suspense de 1 minute s'inspirant des codes du cinéma d'horreur.",
        video: "assets/film_scream_1minute.mp4",
        category: "Cursus MMI",
        contexte: "Exercice universitaire visant à réaliser une séquence de suspense de 1 minute en respectant les codes du cinéma d'horreur.",
        demarche: "Tournage de nuit avec éclairage contrôlé, création d'une atmosphère pesante par le montage et sound design angoissant.",
        outils: ["Caméra", "Premiere Pro", "After Effects", "Sound Design"]
    },
    { 
        titre: "Startup : Ferme de Minage Solaire", 
        tag: "Business", 
        desc: "Création d'un Data Center Web3 éco-responsable (Guadeloupe) structuré en SASU.", 
        link: "assets/Buisness plan/Pitch_Deck_Banque_Printable.html", 
        img: "assets/Logo.png",
        category: "Projet Perso",
        contexte: "Projet entrepreneurial de création d'une ferme de minage Bitcoin. L'objectif est d'atteindre le PetaHash en combinant du matériel ASIC de pointe et l'énergie solaire thermique.",
        demarche: "Rédaction d'un Business Plan certifié pour financement bancaire, élaboration d'un prévisionnel sur 3 ans, et conception des statuts légaux (SASU). Le projet inclut une vision de réinvestissement local (agriculture sans chlordécone, impression 3D coco).",
        outils: ["Business Plan", "Finance", "Web3", "Énergie Solaire"]
    },
    {
        titre: "Univers Transmédia : Bible de l'Univers",
        tag: "Projet Perso",
        desc: "Immense projet transmédia afrofuturiste structuré sur 200 ans, mêlant technologie Web3 et mythologie.",
        img: "assets/capture-escape-game.jpg",
        isFolder: true,
        category: "Projet Perso",
        subProjects: [
            {
                titre: "La Bible Universelle",
                tag: "Document",
                desc: "Le document maître détaillant la timeline du monde politique, économique et spirituel de 2029 à 2238.",
                link: "assets/Buisness plan/bible_univers.pdf",
                img: "assets/Logo.png"
            },
            {
                titre: "Note d'Intention & Narration",
                tag: "Document",
                desc: "Analyse philosophique, genèse des deux volets du projet (Le Verbe / La Chair) et parti pris visuel.",
                link: "assets/Buisness plan/note_intention.pdf",
                img: "assets/Logo.png"
            },
            { 
                titre: "DApp BeamUp: Streaming Web3", 
                tag: "Code", 
                desc: "Plateforme de streaming décentralisée pour financer le projet transmédia 'Bible de l'Univers'.", 
                link: "https://beam-up.vercel.app/", 
                link2: "https://distrokid.com/hyperfollow/colombus97/beamup", 
                img: "assets/beamup_thumb.png",
                contexte: "Création d'une infrastructure Web3 indépendante pour financer et diffuser la 'Bible de l'Univers'. Une nécessité pour garantir une vision artistique hors des systèmes capitalistes traditionnels.",
                demarche: "Développement d'un smart contract sur BNB Chain et intégration IPFS. L'objectif est de lier la technologie décentralisée et la diffusion d'œuvres transmédia (Webtoon, Animations).",
                outils: ["Solidity", "JavaScript", "Web3", "IPFS"]
            },
            { 
                titre: "Escape Game: Expérience Interactive", 
                tag: "Code", 
                desc: "Jeu narratif interactif introduisant l'univers de 'Bible de l'Univers'.", 
                link: "https://escape-game-mmi-colombo.netlify.app/", 
                img: "assets/capture-escape-game.jpg",
                contexte: "Le jeu permet d'explorer les tensions entre spiritualité et matérialité à travers un futur afrofuturiste.",
                demarche: "Développement d'un jeu textuel en JavaScript. L'interface cyberpunk sert l'immersion du joueur dans cet univers complexe critiquant les systèmes socio-économiques.",
                outils: ["JavaScript", "HTML5", "CSS3", "IA"]
            },
            { 
                titre: "Babylon Burn: Overbike", 
                tag: "3D", 
                desc: "Asset 3D pour la série 'La Chair'. Modélisation Hard Surface optimisée.", 
                model3d: "assets/over_bike.glb",
                img: "assets/Baylonburn.png",
                contexte: "Fait partie de la 'Bible de l'Univers', un projet transmédia afrofuturiste (2029-2238). Cet overbike appartient aux bas-fonds urbains de la série d'animation 'La Chair'.",
                demarche: "Création d'une modélisation 3D Hard Surface interactive. Le but était de concevoir un véhicule illustrant la technologie unie aux obsessions organiques de l'univers.",
                outils: ["Blender", "Substance Painter", "GLTF"]
            },
            { 
                titre: "Environnements Mémoria (Simulation)", 
                tag: "Vidéo", 
                desc: "Environnement de l'utopie 'Afridi' et du sanctuaire de 'Mémoria' pour la 'Bible de l'Univers'.", 
                video: "assets/planet.mp4",
                contexte: "Création visuelle pour le volet 'Le Verbe' (un webtoon sur la reconstruction de l'utopie Afridi et de sa cité écologique Mémoria sans argent).",
                demarche: "Simulation sous Blender pour représenter les planètes et sanctuaires mondiaux de données, unissant technologie de pointe et concepts théologiques.",
                outils: ["Blender", "Eevee", "Procédural"]
            }
        ]
    },
    {
        titre: "Laboratoire & Direction Artistique",
        tag: "Projet Perso",
        desc: "Regroupement de mes recherches esthétiques, d'explorations sur l'IA générative et de conception graphique pure.",
        img: "assets/Baylonburn.png",
        isFolder: true,
        category: "Projet Perso",
        subProjects: [
            { 
                titre: "Polar Bear: Rendu Motion", 
                tag: "Vidéo", 
                desc: "Animation de personnage en 3D. Étude des mouvements naturels et des shaders.", 
                video: "assets/ours_compressed.mp4" 
            },
            { 
                titre: "IA Generative: Abstract Flame", 
                tag: "Vidéo", 
                desc: "Exploration des flux de travail IA pour le motion design. Animation assistée par neurones.", 
                video: "assets/social_colombus97_09304_Animate_the_flame_in_the_background_and_add__ad373870-27b5-4cfd-8b80-8c425c85c02e_1.mp4" 
            },
            { 
                titre: "AI Motion Loop: Sci-Fi", 
                tag: "Vidéo", 
                desc: "Seconde expérimentation IA. Création de boucles visuelles pour supports numériques.", 
                video: "assets/social_colombus97_09304_Animate_--ar_7758_--motion_high_--raw_--vide_171b6c64-1485-4e8d-adcb-d7d82c492d88_2.mp4" 
            },
            { 
                titre: "Concept Art: Babylonburn", 
                tag: "Design", 
                desc: "Illustration numérique sur Clip Studio Paint. Recherche de style néon-futuriste.", 
                img: "assets/Baylonburn.png" 
            },
            { 
                titre: "Identité Visuelle: Collaboration", 
                tag: "Design", 
                desc: "Charte graphique et logo pour le projet Balleyse Levy.", 
                img: "assets/balleyse_levy.png" 
            },
            { 
                titre: "Logo Officiel: Colombo 2026", 
                tag: "Design", 
                desc: "Création de logotype personnel. Minimalisme et symétrie technologique.", 
                img: "assets/Logo.png" 
            }
        ]
    },
    { 
        titre: "Kakarot Riddim (colombus97)", 
        tag: "Musique", 
        desc: "Production musicale originale. Sound design Cyberpunk et mastering professionnel.", 
        link: "https://www.youtube.com/watch?v=P3FTkBDxrMg", 
        video: "assets/kakarot_preview.mp4",
        category: "Projet Perso"
    },
    {
        titre: "Papa Legba: Open the Gates",
        tag: "Musique",
        desc: "Single original de colombus97. Une fusion rythmique afro-futuriste mariant vibrations traditionnelles et basses industrielles cyberpunk.",
        link: "https://distrokid.com/hyperfollow/colombus97/papa-legba-open-the-gates",
        img: "assets/Baylonburn.png",
        category: "Projet Perso",
        contexte: "Création d'une œuvre musicale inspirée de la mythologie vaudou et des sonorités cyberpunk, conçue pour servir d'ambiance et de signature sonore dans nos projets de films d'animation.",
        demarche: "Composition rythmique hybride sur DAW, mixage et mastering haute fidélité. Distribution internationale via DistroKid.",
        outils: ["Sound Design", "Composition", "DAW", "Mastering"]
    },
    {
        titre: "BeamUp: Official Soundtrack",
        tag: "Musique",
        desc: "La bande originale officielle de la plateforme de streaming décentralisée BeamUp. Synthés rétro-futuristes et basses lourdes.",
        link: "https://distrokid.com/hyperfollow/colombus97/beamup",
        img: "assets/beamup_thumb.png",
        category: "Projet Perso",
        contexte: "Composition de l'identité sonore et musicale pour le projet transmédia 'Bible de l'Univers' et sa plateforme Web3 BeamUp.",
        demarche: "Production d'un thème musical immersif unifiant la narration transmédia et la plateforme de streaming. Publication et distribution numérique.",
        outils: ["Sound Design", "Composition", "DAW", "Web3 Marketing"]
    },
    { 
        titre: "MMI Guadeloupe: Showreel 3D", 
        tag: "3D", 
        desc: "Vidéo promotionnelle réalisée pour le département MMI. Modélisation et montage.", 
        link: "https://www.youtube.com/watch?v=BW7Gnu_yyTs",
        img: "assets/showreel_thumb.jpg",
        category: "Cursus MMI",
        contexte: "Projet de promotion pour le département MMI. L'objectif était de montrer les capacités techniques acquises en modélisation et animation 3D.",
        demarche: "Modélisation de scènes complexes, texturage optimisé et rendu. Montage final dynamique pour susciter l'intérêt des futurs étudiants.",
        outils: ["Blender", "Premiere Pro", "After Effects"]
    },
    { 
        titre: "Motion Narrative: Exercice MMI", 
        tag: "Vidéo", 
        desc: "Réalisation audiovisuelle complexe (Ex10). Travail sur le montage et les effets dynamiques.", 
        video: "assets/Ex10-01DC.mp4",
        category: "Cursus MMI",
        contexte: "Exercice MMI Ex10. L'objectif était de réaliser une composition audiovisuelle dynamique narrative.",
        demarche: "Travail intensif sur le sound design et la synchronisation rythmique. Utilisation d'effets de transition complexes et de colorimétrie pour renforcer l'ambiance.",
        outils: ["Premiere Pro", "After Effects", "Audition"]
    },
    { 
        titre: "Stepmotion: Animation Rythmique", 
        tag: "Vidéo", 
        desc: "Exercice de stop-motion réalisé au MMI. Travail sur la cadence et l'image par image.", 
        img: "assets/Ex09-01DC.png",
        video: "assets/Ex08-02.mp4",
        category: "Cursus MMI",
        contexte: "Exercice MMI d'animation en volume (stop-motion). L'objectif était de maîtriser la cadence d'animation par images clés.",
        demarche: "Captation image par image d'éléments physiques, intégration dans un workflow numérique pour post-production. Recherche d'un rythme visuel percutant.",
        outils: ["Appareil Photo", "Dragonframe", "After Effects"]
    },
    { 
        titre: "Composition Design MMI", 
        tag: "Design", 
        desc: "Création graphique (Ex09). Recherche sur l'équilibre visuel et la typographie.", 
        img: "assets/Ex09-01DC.png",
        category: "Cursus MMI",
        contexte: "Exercice MMI Ex09 de création graphique. L'objectif était de travailler sur l'équilibre visuel, le poids et la hiérarchie de l'information.",
        demarche: "Application des règles de grille et de proportions. Choix typographique fort et composition asymétrique pour créer du dynamisme.",
        outils: ["Illustrator", "Photoshop", "InDesign"]
    },
    { 
        titre: "Composition Éditoriale MMI", 
        tag: "Design", 
        desc: "Mise en page graphique (DS). Respect des grilles et de la hiérarchie visuelle.", 
        img: "assets/afficheDSMMI1_David-colombo.png",
        category: "Cursus MMI",
        contexte: "Devoir surveillé MMI de mise en page graphique. L'objectif était de réaliser une affiche promotionnelle ou éditoriale complète en temps limité.",
        demarche: "Gestion stricte des alignements, des marges et du parcours de l'œil. Respect des contraintes d'impression et de lisibilité.",
        outils: ["InDesign", "Illustrator"]
    },
    { 
        titre: "Identité Visuelle : PixelChain", 
        tag: "Design", 
        desc: "Dossier de création de marque pour une entreprise Play-to-Earn (LOGO Marque).", 
        link: "assets/pixelchain_logo.pdf",
        img: "assets/pixelchain_img_1_3.png",
        category: "Cursus MMI",
        contexte: "Projet de branding (ex 01) nécessitant la construction d'une identité visuelle complète pour l'écosystème d'un jeu blockchain.",
        demarche: "Recherche sur les valeurs d'innovation, de communauté et de souveraineté numérique. Création du logotype PixelChain et de ses déclinaisons.",
        outils: ["Illustrator", "Branding", "Web3"]
    },
    { 
        titre: "Spot Publicitaire : Vanille West Indies", 
        tag: "Vidéo", 
        desc: "Pré-production et storyboard pour la gamme de parfum St Barth (ex 06).", 
        link: "assets/spot_vanille.pdf",
        img: "assets/spot_vanille_cover.png",
        category: "Cursus MMI",
        contexte: "Exercice de direction artistique pour concevoir un spot publicitaire ancré en Guadeloupe.",
        demarche: "Découpage technique, storyboard, sélection musicale thématique (Patrick Saint-Éloi) et choix des décors pour créer une ambiance caribéenne luxueuse.",
        outils: ["Premiere Pro", "Storyboard", "Direction Artistique"]
    },
    { 
        titre: "Étude Transdisciplinaire : Man Ray", 
        tag: "Design", 
        desc: "Présentation approfondie : Man Ray, pionnier de l'art transdisciplinaire.",
        link: "assets/man_ray_presentation.pdf",
        img: "assets/man_ray_cover.png",
        category: "Cursus MMI",
        contexte: "Travail de recherche et de mise en page sur l'histoire de l'art, centré sur le Dadaïsme et le Surréalisme.",
        demarche: "Analyse sur 13 pages de la porosité entre la photographie, la peinture et le cinéma. Mise en perspective avec l'art contemporain et les transmédias.",
        outils: ["InDesign", "Histoire de l'art", "Recherche"]
    }
];

function initHackerNav() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    document.querySelectorAll('.nav-link').forEach(link => {
        link.dataset.value = link.innerText;
        link.addEventListener('mouseenter', (e) => {
            let iteration = 0;
            const interval = setInterval(() => {
                e.target.innerText = e.target.innerText.split("").map((letter, index) => {
                    if(index < iteration) return e.target.dataset.value[index];
                    return letters[Math.floor(Math.random() * 36)];
                }).join("");
                if(iteration >= e.target.dataset.value.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        });
    });
}

function renderProjects(filter = 'Tous') {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    // Filter by tag or category
    const filtered = filter === 'Tous' ? projectsData : projectsData.filter(p => p.tag === filter || p.category === filter);
    
    filtered.forEach(p => {
        const card = document.createElement('article');
        card.className = "cyber-card";
        
        let mediaHtml = '';
        if (p.model3d) {
            mediaHtml = `<model-viewer src="${p.model3d}" poster="${p.img || 'assets/Logo.png'}" auto-rotate camera-controls style="width:100%; height:100%; background:#050505; border-radius:20px;"></model-viewer>`;
        } else if (p.video) {
            mediaHtml = `<video src="${p.video}#t=0.001" class="project-media" muted loop playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()"></video>`;
        } else {
            mediaHtml = `<img src="${p.img || 'assets/Logo.png'}" alt="${p.titre}" class="project-media" loading="lazy" />`;
        }

        const ytBadge = p.link && p.link.includes('youtube') ? '<span class="youtube-badge">YouTube</span>' : '';
        const folderBadge = p.isFolder ? '<span class="youtube-badge" style="background:var(--secondary); right:auto; left:10px;">DOSSIER COMPLET</span>' : '';

        card.innerHTML = `
            <div class="project-image-container">
                ${ytBadge}
                ${folderBadge}
                ${mediaHtml}
            </div>
            <div class="project-content">
                <span class="tag-badge">${p.tag}</span>
                <h3 class="project-title">${p.titre}</h3>
                <p class="project-desc">${p.desc}</p>
            </div>
        `;

        if (p.link || p.desc || p.model3d || p.video || p.isFolder) {
            card.addEventListener('click', () => openModal(p));
        }
        grid.appendChild(card);
    });
}

window.currentFolderProject = null;

function stopAllAudio() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.src = '';
    });
}

function renderStandardModal(project, modalBody, isSub = false) {
    stopAllAudio();
    let mediaHtml = '';
    
    // Check if it is an audio file
    const isAudio = project.tag === 'Audio' || (project.link && (project.link.toLowerCase().endsWith('.m4a') || project.link.toLowerCase().endsWith('.mp3') || project.link.toLowerCase().endsWith('.wav')));

    if (isAudio) {
        mediaHtml = `
            <div class="cyber-audio-player">
                <audio id="modal-audio" src="${project.link}"></audio>
                <div class="audio-cover">
                    <img src="${project.img || 'assets/Logo.png'}" alt="Audio Cover" />
                </div>
                <div class="audio-controls-container">
                    <div class="audio-info">
                        <span class="audio-title">${project.titre}</span>
                        <span class="audio-subtitle">Piste Audio / Interview</span>
                    </div>
                    <div class="audio-progress-container">
                        <span class="audio-time current-time">0:00</span>
                        <input type="range" class="audio-seeker" min="0" max="100" value="0" />
                        <span class="audio-time duration-time">0:00</span>
                    </div>
                    <div class="audio-buttons">
                        <button class="audio-btn play-btn" id="audio-play-btn">
                            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                <path class="play-path" d="M8 5v14l11-7z"/>
                            </svg>
                        </button>
                        <div class="volume-container">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" class="volume-icon">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                            </svg>
                            <input type="range" class="volume-slider" min="0" max="1" step="0.05" value="0.8" />
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (project.tag === 'Code' && project.link && !project.link.includes('pdf')) {
        mediaHtml = `<iframe src="${project.link}" class="project-iframe" title="${project.titre}"></iframe>`;
    } else if (project.link && project.link.toLowerCase().endsWith('.pdf')) {
        // Pour les PDFs (comme la Bible ou la note d'intention)
        mediaHtml = `<iframe src="${encodeURI(project.link)}" class="project-iframe" title="${project.titre}"></iframe>`;
    } else if (project.model3d) {
        const isLocal = window.location.protocol === 'file:';
        const warningHtml = isLocal ? `
            <div style="background: rgba(255, 81, 0, 0.05); border: 1px solid var(--secondary); color: var(--text-white); padding: 20px; border-radius: 20px; font-size: 11px; margin-bottom: 20px; line-height: 1.6; letter-spacing: 1px;">
                <span style="color: var(--accent); font-weight: 900; display: block; margin-bottom: 8px; text-transform: uppercase;">⚠️ Protocole Local (file://) détecté</span>
                Le modèle 3D interactif ne peut pas se charger directement depuis les fichiers locaux en raison des restrictions de sécurité CORS du navigateur.
                <br><br>
                <span style="color: var(--text-gray); font-weight: 700; text-transform: uppercase;">Pour interagir avec l'Overbike en 3D :</span>
                <ul style="margin-left: 20px; margin-top: 8px; color: var(--text-gray); list-style-type: square; line-height: 1.8;">
                    <li>Lancer le site via un serveur local (ex: extension VS Code <strong>Live Server</strong>).</li>
                    <li>Ou exécuter dans un terminal : <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; color: var(--accent);">npx http-server</code> ou <code style="background: rgba(255,255,255,0.05); padding: 2px 6px; border-radius: 4px; color: var(--accent);">python -m http.server</code></li>
                    <li>Ou consulter la version en ligne : <a href="https://portfolio-2026-colombod.vercel.app/" target="_blank" style="color: var(--accent); text-decoration: underline;">portfolio-2026-colombod.vercel.app</a></li>
                </ul>
            </div>
        ` : '';
        
        mediaHtml = `
            ${warningHtml}
            <model-viewer src="${project.model3d}" poster="${project.img || 'assets/Logo.png'}" auto-rotate camera-controls style="width:100%; height:400px; background:#050505; border-radius:20px;"></model-viewer>
        `;
    } else if (project.video) {
        mediaHtml = `<video src="${project.video}" class="project-media" controls autoplay loop playsinline></video>`;
    } else {
        mediaHtml = `<img src="${project.img || 'assets/Logo.png'}" alt="${project.titre}" class="project-media" />`;
    }

    let linkHtml = '';
    if (project.link && !isAudio) {
        linkHtml += `<a href="${encodeURI(project.link)}" target="_blank" class="btn-neon">Voir en plein écran / Live</a>`;
    }
    if (project.link2) {
        linkHtml += `<a href="${encodeURI(project.link2)}" target="_blank" class="btn-neon outline" style="border-color: var(--secondary); color: var(--secondary); box-shadow: 0 0 15px rgba(255, 81, 0, 0.15);">Hyperfollow DistroKid</a>`;
    }
    if (linkHtml !== '') {
        linkHtml = `<div class="modal-links" style="display: flex; gap: 15px; flex-wrap: wrap;">${linkHtml}</div>`;
    }

    const outilsHtml = project.outils ? `
        <div class="project-tools">
            ${project.outils.map(outil => `<span class="tool-badge">${outil}</span>`).join('')}
        </div>
    ` : '';

    const etudeHtml = project.contexte && project.demarche ? `
        <div class="project-case-study">
            <h4>Contexte & Objectifs</h4>
            <p>${project.contexte}</p>
            <h4>Démarche & Solution</h4>
            <p>${project.demarche}</p>
        </div>
    ` : '';

    const backBtn = isSub ? `<button class="btn-neon outline" style="margin-bottom: 20px; padding: 10px 20px; font-size: 10px; display:inline-block;" onclick="openModal(window.currentFolderProject)">← Retour au dossier : ${window.currentFolderProject.titre}</button>` : '';

    modalBody.innerHTML = `
        <div style="max-width: 100%; overflow-x: hidden;">
            ${backBtn}
            ${mediaHtml}
            <span class="tag-badge">${project.tag}</span>
            <h3 class="project-title">${project.titre}</h3>
            ${outilsHtml}
            <p class="project-desc" style="${project.contexte ? 'margin-bottom: 20px;' : ''}">${project.desc}</p>
            ${etudeHtml}
            ${linkHtml}
        </div>
    `;

    // Hook up audio player events if audio element is present
    if (isAudio) {
        setTimeout(() => {
            const audio = document.getElementById('modal-audio');
            if (audio) {
                const playBtn = document.getElementById('audio-play-btn');
                const playPath = playBtn ? playBtn.querySelector('.play-path') : null;
                const seeker = modalBody.querySelector('.audio-seeker');
                const currentTimeEl = modalBody.querySelector('.current-time');
                const durationTimeEl = modalBody.querySelector('.duration-time');
                const volumeSlider = modalBody.querySelector('.volume-slider');

                if (!playBtn || !seeker) return;

                const formatTime = (time) => {
                    const mins = Math.floor(time / 60);
                    const secs = Math.floor(time % 60);
                    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
                };

                const updateDuration = () => {
                    if (audio.duration) {
                        durationTimeEl.textContent = formatTime(audio.duration);
                        seeker.max = Math.floor(audio.duration);
                    }
                };

                audio.addEventListener('loadedmetadata', updateDuration);
                if (audio.readyState >= 1) {
                    updateDuration();
                }

                playBtn.addEventListener('click', () => {
                    if (audio.paused) {
                        audio.play().catch(err => console.log("Audio play deferred:", err));
                        if (playPath) playPath.setAttribute('d', 'M6 19h4V5H6v14zm8-14v14h4V5h-4z');
                    } else {
                        audio.pause();
                        if (playPath) playPath.setAttribute('d', 'M8 5v14l11-7z');
                    }
                });

                audio.addEventListener('timeupdate', () => {
                    seeker.value = Math.floor(audio.currentTime);
                    currentTimeEl.textContent = formatTime(audio.currentTime);
                    if (durationTimeEl.textContent === '0:00' && audio.duration) {
                        updateDuration();
                    }
                });

                seeker.addEventListener('input', () => {
                    audio.currentTime = seeker.value;
                    currentTimeEl.textContent = formatTime(audio.currentTime);
                });

                if (volumeSlider) {
                    audio.volume = volumeSlider.value;
                    volumeSlider.addEventListener('input', () => {
                        audio.volume = volumeSlider.value;
                    });
                }

                audio.addEventListener('ended', () => {
                    if (playPath) playPath.setAttribute('d', 'M8 5v14l11-7z');
                    seeker.value = 0;
                    currentTimeEl.textContent = '0:00';
                });
            }
        }, 50);
    }
}

function openModal(project) {
    stopAllAudio();
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    if (project.isFolder) {
        window.currentFolderProject = project;
        
        // Render folder grid inside modal
        let html = `
            <span class="tag-badge">${project.tag}</span>
            <h3 class="project-title" style="margin-bottom: 15px; font-size: 40px; color: var(--accent);">${project.titre}</h3>
            <p class="project-desc" style="margin-bottom: 40px; font-size: 14px;">${project.desc}</p>
            <div class="subprojects-grid">
        `;

        project.subProjects.forEach((sp, idx) => {
            let mediaPreview = '';
            if (sp.video) {
                mediaPreview = `<video src="${sp.video}#t=0.001" muted loop style="width:100%; height:100%; object-fit:cover;" onmouseover="this.play()" onmouseout="this.pause()"></video>`;
            } else {
                mediaPreview = `<img src="${sp.img || 'assets/Logo.png'}" style="width:100%; height:100%; object-fit:cover;" />`;
            }

            html += `
                <div class="cyber-card" style="padding: 15px; border-radius: 20px; cursor: pointer; transition: 0.3s;" onclick="openSubModal(${idx})">
                    <div style="aspect-ratio: 16/9; background: #111; border-radius: 10px; margin-bottom: 15px; overflow: hidden;">
                        ${mediaPreview}
                    </div>
                    <span class="tag-badge" style="font-size: 8px;">${sp.tag}</span>
                    <h4 style="font-size: 14px; text-transform: uppercase;">${sp.titre}</h4>
                </div>
            `;
        });

        html += `</div>`;
        modalBody.innerHTML = html;

    } else {
        renderStandardModal(project, modalBody, false);
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

window.openSubModal = function(idx) {
    const sp = window.currentFolderProject.subProjects[idx];
    const modalBody = document.getElementById('modal-body');
    renderStandardModal(sp, modalBody, true);
};

function closeModal() {
    stopAllAudio();
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        window.currentFolderProject = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initSocialDock();
    initHackerNav();
    renderProjects();
    
    document.querySelectorAll('.filter-item').forEach(f => {
        f.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-item').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderProjects(e.target.dataset.filter);
        });
    });
    
    // Modal close events
    const closeBtn = document.getElementById('close-modal');
    const modal = document.getElementById('project-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
        // Only close if clicking outside modal-content.
        modal.addEventListener('click', (e) => {
            // e.target is the overlay itself
            if (e.target.classList.contains('modal-overlay')) closeModal();
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Transmission en cours...";
            btn.disabled = true;

            const nom = document.getElementById('nom').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                const response = await fetch("https://formsubmit.co/ajax/david-colombo@outlook.fr", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: nom,
                        email: email,
                        message: message
                    })
                });
                
                if (response.ok) {
                    btn.innerText = "Transmission Reçue !";
                    contactForm.reset();
                    const restant = document.getElementById('restant');
                    if (restant) restant.textContent = "500";
                } else {
                    btn.innerText = "Erreur de transmission";
                }
            } catch (error) {
                btn.innerText = "Échec de connexion";
                console.error("Erreur de formulaire:", error);
            }

            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
            }, 3000);
        });
    }
    
    const msg = document.getElementById('message');
    const res = document.getElementById('restant');
    if(msg && res) {
        msg.addEventListener('input', () => {
            res.textContent = 500 - msg.value.length;
        });
    }
});

// APPLE DOCK STYLE SOCIAL SIDEBAR
function initSocialDock() {
    const dock = document.createElement('div');
    dock.className = 'social-dock';
    
    const socialLinks = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/david-colombo-2bb172113/",
            icon: `<svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`
        },
        {
            name: "GitHub",
            url: "https://github.com/colombus97cmd",
            icon: `<svg viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
        },
        {
            name: "ArtStation",
            url: "https://www.artstation.com/davidcolombo",
            icon: `<svg viewBox="0 0 24 24"><path d="M.057 17.433l4.636-8.04L18.423 23.1H3.344L.057 17.433zm23.886 0h-6.574L12.029 8.196l5.34-9.296 6.574 11.411v7.122zm-12.052-1.637L7.332 8.194l4.56-7.925 4.563 7.925-4.563 7.602z"/></svg>`
        },
        {
            name: "YouTube",
            url: "https://www.youtube.com/channel/UCwcCigU5bFZ4voNeGoqgJ3Q",
            icon: `<svg viewBox="0 0 24 24"><path d="M23.498 6.163c-.272-1.022-1.074-1.826-2.099-2.099-1.854-.5-9.4-.5-9.4-.5s-7.546 0-9.4.5c-1.026.273-1.828 1.077-2.1 2.1-.5 1.853-.5 5.72-.5 5.72s0 3.868.5 5.721c.272 1.022 1.074 1.826 2.099 2.099 1.854.5 9.4.5 9.4.5s7.546 0 9.4-.5c1.025-.273 1.827-1.077 2.1-2.1.5-1.853.5-5.721.5-5.721s0-3.868-.5-5.722zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
        },
        {
            name: "WhatsApp",
            url: "https://wa.me/590690449224",
            icon: `<svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.503-5.731-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.117-2.887-6.98-1.864-1.864-4.348-2.887-6.989-2.888-5.439 0-9.865 4.42-9.869 9.865-.001 1.761.47 3.482 1.365 5.022L1.933 21.91l4.714-1.236zM17.487 14.39c-.3-.15-1.774-.875-2.049-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.267-.467-2.413-1.49-.893-.797-1.496-1.782-1.67-1.93-.175-.15-.018-.23.132-.38.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.493-.508-.675-.518-.175-.01-.375-.01-.575-.01-.2 0-.525.075-.8 1.025-.275.95-1.05 3.275-1.05 3.575s.1.587.275.825c.175.237 2.725 4.16 6.625 5.675.928.36 1.65.576 2.213.754.935.297 1.787.255 2.46.154.75-.113 1.774-.725 2.025-1.375.25-.65.25-1.2.175-1.375-.075-.175-.275-.275-.575-.425z"/></svg>`
        }
    ];

    socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'dock-item';
        a.innerHTML = `
            ${link.icon}
            <span class="dock-tooltip">${link.name}</span>
        `;
        dock.appendChild(a);
    });

    document.body.appendChild(dock);

    const dockItems = dock.querySelectorAll('.dock-item');
    const maxScale = 1.8;
    const range = 120; 

    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const dockRect = dock.getBoundingClientRect();
        
        const isNearDock = mouseX > dockRect.left - 100 && mouseX < dockRect.right + 100 &&
                           mouseY > dockRect.top - 100 && mouseY < dockRect.bottom + 100;

        if (isNearDock) {
            dockItems.forEach(item => {
                const rect = item.getBoundingClientRect();
                const itemX = rect.left + rect.width / 2;
                const itemY = rect.top + rect.height / 2;

                const distance = Math.sqrt((mouseX - itemX) ** 2 + (mouseY - itemY) ** 2);
                
                let scale = 1;
                if (distance < range) {
                    scale = 1 + (maxScale - 1) * (1 - distance / range);
                }
                const translateX = -(scale - 1) * 15;
                item.style.transform = `scale(${scale}) translateX(${translateX}px)`;
            });
        } else {
            resetDock();
        }
    });

    dock.addEventListener('mouseleave', resetDock);

    function resetDock() {
        dockItems.forEach(item => {
            item.style.transform = 'scale(1) translateX(0px)';
        });
    }
}