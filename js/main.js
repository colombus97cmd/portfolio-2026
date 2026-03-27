/* PURE JAVASCRIPT - EXHAUSTIVE PROJECT DATASET (17 PROJECTS) */

const projectsData = [
    { 
        titre: "DApp BeamUp: Streaming Web3", 
        tag: "Code", 
        desc: "Plateforme de streaming décentralisée sur BNB Chain. Intégration IPFS et Solidity.", 
        link: "https://beam-up.vercel.app/", 
        img: "assets/capture-escape-game.jpg" 
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
        img: "assets/Logo.png" 
    },
    { 
        titre: "Babylon Burn: Overbike", 
        tag: "3D", 
        desc: "Modèle 3D Hard Surface. Optimisation GLB pour visualisation interactive temps réel.", 
        model3d: "assets/over_bike.glb",
        img: "assets/Baylonburn.png"
    },
    { 
        titre: "Escape Game: Expérience MMI", 
        tag: "Code", 
        desc: "Jeu narratif interactif développé en JavaScript. Focus sur l'UX et le Game Design.", 
        link: "https://escape-game-mmi-colombo.netlify.app/", 
        img: "assets/capture-escape-game.jpg" 
    },
    { 
        titre: "Motion Narrative: Exercice MMI", 
        tag: "Vidéo", 
        desc: "Réalisation audiovisuelle complexe (Ex10). Travail sur le montage et les effets dynamiques.", 
        video: "assets/Ex10-01DC.mp4" 
    },
    { 
        titre: "Stepmotion: Animation Rythmique", 
        tag: "Vidéo", 
        desc: "Exercice de stop-motion réalisé au MMI. Travail sur la cadence et l'image par image.", 
        img: "assets/Ex09-01DC.png",
        video: "assets/Ex08-02.mp4" 
    },
    { 
        titre: "Composition Design MMI", 
        tag: "Design", 
        desc: "Création graphique (Ex09). Recherche sur l'équilibre visuel et la typographie.", 
        img: "assets/Ex09-01DC.png" 
    },
    { 
        titre: "Composition Éditoriale MMI", 
        tag: "Design", 
        desc: "Mise en page graphique (DS). Respect des grilles et de la hiérarchie visuelle.", 
        img: "assets/afficheDSMMI1_David-colombo.png" 
    },
    { 
        titre: "Polar Bear: Rendu Motion", 
        tag: "Vidéo", 
        desc: "Animation de personnage en 3D. Étude des mouvements naturels et des shaders.", 
        video: "assets/ours.mp4" 
    },
    { 
        titre: "Planet Simulation: Eevee", 
        tag: "Vidéo", 
        desc: "Simulation environnementale Blender. Rendu d'atmosphères et de textures procédurales.", 
        video: "assets/planet.mp4" 
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
        titre: "Identité Visuelle: Collaboration", 
        tag: "Design", 
        desc: "Charte graphique et logo pour le projet Balleyse Levy.", 
        img: "assets/balleyse_levy.png" 
    },
    { 
        titre: "Concept Art: Babylonburn", 
        tag: "Design", 
        desc: "Illustration numérique sur Clip Studio Paint. Recherche de style néon-futuriste.", 
        img: "assets/Baylonburn.png" 
    },
    { 
        titre: "Logo Officiel: Colombo 2026", 
        tag: "Design", 
        desc: "Création de logotype personnel. Minimalisme et symétrie technologique.", 
        img: "assets/Logo.png" 
    },
    { 
        titre: "QR Gateway: Web3 Donation", 
        tag: "Design", 
        desc: "Design de passerelle de paiement crypto. Intégration QR Code personnalisée.", 
        img: "assets/WhatsApp Image 2026-03-17 at 16.31.03.jpeg" 
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

        card.innerHTML = `
            <div class="project-image-container">
                ${ytBadge}
                ${mediaHtml}
            </div>
            <div class="project-content">
                <span class="tag-badge">${p.tag}</span>
                <h3 class="project-title">${p.titre}</h3>
                <p class="project-desc">${p.desc}</p>
            </div>
        `;

        if (p.link || p.desc || p.model3d || p.video) {
            card.addEventListener('click', () => openModal(p));
        }
        grid.appendChild(card);
    });
}

function openModal(project) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    let mediaHtml = '';
    if (project.tag === 'Code' && project.link) {
        // Pour les projets Code, on utilise une iframe pour la "navigabilité"
        mediaHtml = `<iframe src="${project.link}" class="project-iframe" title="${project.titre}"></iframe>`;
    } else if (project.model3d) {
        mediaHtml = `<model-viewer src="${project.model3d}" auto-rotate camera-controls style="width:100%; height:400px; background:#050505; border-radius:20px;"></model-viewer>`;
    } else if (project.video) {
        mediaHtml = `<video src="${project.video}" class="project-media" controls autoplay loop playsinline></video>`;
    } else {
        mediaHtml = `<img src="${project.img || 'assets/Logo.png'}" alt="${project.titre}" class="project-media" />`;
    }

    const linkHtml = project.link ? `
        <div class="modal-links">
            <a href="${project.link}" target="_blank" class="btn-neon">Voir le Projet Live</a>
        </div>
    ` : '';

    modalBody.innerHTML = `
        ${mediaHtml}
        <span class="tag-badge">${project.tag}</span>
        <h3 class="project-title">${project.titre}</h3>
        <p class="project-desc">${project.desc}</p>
        ${linkHtml}
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
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
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Transmission en cours...";
            btn.disabled = true;

            const formData = {
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // Utilisation de Formspree (nécessite une ID de formulaire de l'utilisateur)
                // Pour l'instant on simule l'envoi ou on prépare le code pour Formspree
                // Si l'utilisateur a une ID, il suffira de remplacer 'YOUR_FORMSPREE_ID'
                const response = await fetch('https://formspree.io/f/mqakeaqe', { // ID temporaire ou à demander
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    btn.innerText = "Transmission Reçue !";
                    contactForm.reset();
                    setTimeout(() => { btn.innerText = originalText; btn.disabled = false; }, 3000);
                } else {
                    throw new Error();
                }
            } catch (err) {
                btn.innerText = "Erreur de Transmission";
                btn.style.borderColor = "red";
                setTimeout(() => { btn.innerText = originalText; btn.disabled = false; btn.style.borderColor = ""; }, 3000);
            }
        });
    }
    
    // Contact form character counter
    const msg = document.getElementById('message');
    const res = document.getElementById('restant');
    if(msg && res) {
        msg.addEventListener('input', () => {
            res.textContent = 500 - msg.value.length;
        });
    }
});