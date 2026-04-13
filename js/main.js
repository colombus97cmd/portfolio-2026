/* PURE JAVASCRIPT - EXHAUSTIVE PROJECT DATASET WITH MEGA-FOLDERS */

const projectsData = [
    { 
        titre: "Startup : Ferme de Minage Solaire", 
        tag: "Business", 
        desc: "Création d'un Data Center Web3 éco-responsable (Guadeloupe) structuré en SASU.", 
        link: "assets/Buisness plan/Dossier_Complet_Banque.html", 
        img: "assets/Logo.png",
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
                img: "assets/capture-escape-game.jpg",
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
        video: "assets/kakarot_preview.mp4" 
    },
    { 
        titre: "MMI Guadeloupe: Showreel 3D", 
        tag: "3D", 
        desc: "Vidéo promotionnelle réalisée pour le département MMI. Modélisation et montage.", 
        link: "https://www.youtube.com/watch?v=BW7Gnu_yyTs",
        img: "assets/Logo.png",
        contexte: "Projet de promotion pour le département MMI. L'objectif était de montrer les capacités techniques acquises en modélisation et animation 3D.",
        demarche: "Modélisation de scènes complexes, texturage optimisé et rendu. Montage final dynamique pour susciter l'intérêt des futurs étudiants.",
        outils: ["Blender", "Premiere Pro", "After Effects"]
    },
    { 
        titre: "Motion Narrative: Exercice MMI", 
        tag: "Vidéo", 
        desc: "Réalisation audiovisuelle complexe (Ex10). Travail sur le montage et les effets dynamiques.", 
        video: "assets/Ex10-01DC.mp4",
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
        contexte: "Exercice MMI d'animation en volume (stop-motion). L'objectif était de maîtriser la cadence d'animation par images clés.",
        demarche: "Captation image par image d'éléments physiques, intégration dans un workflow numérique pour post-production. Recherche d'un rythme visuel percutant.",
        outils: ["Appareil Photo", "Dragonframe", "After Effects"]
    },
    { 
        titre: "Composition Design MMI", 
        tag: "Design", 
        desc: "Création graphique (Ex09). Recherche sur l'équilibre visuel et la typographie.", 
        img: "assets/Ex09-01DC.png",
        contexte: "Exercice MMI Ex09 de création graphique. L'objectif était de travailler sur l'équilibre visuel, le poids et la hiérarchie de l'information.",
        demarche: "Application des règles de grille et de proportions. Choix typographique fort et composition asymétrique pour créer du dynamisme.",
        outils: ["Illustrator", "Photoshop", "InDesign"]
    },
    { 
        titre: "Composition Éditoriale MMI", 
        tag: "Design", 
        desc: "Mise en page graphique (DS). Respect des grilles et de la hiérarchie visuelle.", 
        img: "assets/afficheDSMMI1_David-colombo.png",
        contexte: "Devoir surveillé MMI de mise en page graphique. L'objectif était de réaliser une affiche promotionnelle ou éditoriale complète en temps limité.",
        demarche: "Gestion stricte des alignements, des marges et du parcours de l'œil. Respect des contraintes d'impression et de lisibilité.",
        outils: ["InDesign", "Illustrator"]
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
    
    // Modification: le filtre "Projet Perso" s'affiche s'il y a un dossier.
    const filtered = filter === 'Tous' ? projectsData : projectsData.filter(p => p.tag === filter);
    
    filtered.forEach(p => {
        const card = document.createElement('article');
        card.className = "cyber-card";
        
        let mediaHtml = '';
        if (p.model3d) {
            mediaHtml = `<model-viewer src="${p.model3d}" auto-rotate camera-controls style="width:100%; height:100%; background:#050505; border-radius:20px;"></model-viewer>`;
        } else if (p.video) {
            mediaHtml = `<video src="${p.video}#t=0.001" class="project-media" muted loop playsinline preload="metadata" onmouseover="this.play()" onmouseout="this.pause()"></video>`;
        } else {
            mediaHtml = `<img src="${p.img || 'assets/Logo.png'}" alt="${p.titre}" class="project-media" loading="lazy" />`;
        }

        const ytBadge = p.link && p.link.includes('youtube') ? '<span class="youtube-badge">YouTube</span>' : '';
        const folderBadge = p.isFolder ? '<span class="youtube-badge" style="background:#bc13fe; right:auto; left:10px;">DOSSIER COMPLET</span>' : '';

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

function renderStandardModal(project, modalBody, isSub = false) {
    let mediaHtml = '';
    if (project.tag === 'Code' && project.link && !project.link.includes('pdf')) {
        mediaHtml = `<iframe src="${project.link}" class="project-iframe" title="${project.titre}"></iframe>`;
    } else if (project.link && project.link.toLowerCase().endsWith('.pdf')) {
        // Pour les PDFs (comme la Bible ou la note d'intention)
        mediaHtml = `<iframe src="${encodeURI(project.link)}" class="project-iframe" title="${project.titre}"></iframe>`;
    } else if (project.model3d) {
        mediaHtml = `<model-viewer src="${project.model3d}" auto-rotate camera-controls style="width:100%; height:400px; background:#050505; border-radius:20px;"></model-viewer>`;
    } else if (project.video) {
        mediaHtml = `<video src="${project.video}" class="project-media" controls autoplay loop playsinline></video>`;
    } else {
        mediaHtml = `<img src="${project.img || 'assets/Logo.png'}" alt="${project.titre}" class="project-media" />`;
    }

    const linkHtml = project.link ? `
        <div class="modal-links">
            <a href="${encodeURI(project.link)}" target="_blank" class="btn-neon">Voir en plein écran / Live</a>
        </div>
    ` : '';

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
}

function openModal(project) {
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
            <div class="project-grid" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
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
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        window.currentFolderProject = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
            setTimeout(() => { btn.innerText = "Transmission Reçue !"; contactForm.reset(); setTimeout(()=> { btn.innerText=originalText; btn.disabled=false;}, 2000)}, 1000);
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