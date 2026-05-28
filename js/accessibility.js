/* ==========================================================================
   PORTFOLIO ACCESSIBILITY TOOL (TEXT ZOOM, PROJECTOR MODE, ANIMATIONS TOGGLE)
   ========================================================================== */

(function() {
    // 1. Retrieve saved preferences
    let textSize = localStorage.getItem('acc-text-size') || 'normal';
    let projectorMode = localStorage.getItem('acc-projector-mode') === 'true';
    let animationsOff = localStorage.getItem('acc-animations-off') === 'true';

    // Apply preferences immediately (runs on defer load when body exists)
    function applyInitialSettings() {
        if (document.body) {
            applyTextSize(textSize);
            applyProjectorMode(projectorMode);
            applyAnimations(animationsOff);
        } else {
            // Fallback in case script runs before body is ready
            setTimeout(applyInitialSettings, 5);
        }
    }
    applyInitialSettings();

    // Helper functions for class toggling
    function applyTextSize(size) {
        document.body.classList.remove('text-lg', 'text-xl');
        if (size === 'large') {
            document.body.classList.add('text-lg');
        } else if (size === 'xlarge') {
            document.body.classList.add('text-xl');
        }
    }

    function applyProjectorMode(active) {
        if (active) {
            document.body.classList.add('projector-mode');
        } else {
            document.body.classList.remove('projector-mode');
        }
    }

    function applyAnimations(off) {
        if (off) {
            document.body.classList.add('animations-off');
        } else {
            document.body.classList.remove('animations-off');
        }
    }

    // 2. Setup Widget UI on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        // Widget HTML structure
        const widgetHtml = `
            <div class="accessibility-widget">
                <button class="accessibility-toggle" id="accessibility-toggle" title="Options d'accessibilité" aria-label="Menu accessibilité">
                    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                        <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                    </svg>
                </button>
                <div class="accessibility-panel" id="accessibility-panel">
                    <div class="accessibility-title">Accessibilité</div>
                    <div class="accessibility-option">
                        <label>Taille des textes</label>
                        <div class="accessibility-btn-group">
                            <button class="access-opt-btn" id="access-text-normal" title="Taille normale">A</button>
                            <button class="access-opt-btn" id="access-text-lg" title="Texte grand">A+</button>
                            <button class="access-opt-btn" id="access-text-xl" title="Texte très grand">A++</button>
                        </div>
                    </div>
                    <div class="accessibility-option">
                        <label>Mode Projecteur (Contraste)</label>
                        <button class="access-toggle-btn" id="access-projector-toggle">Désactivé</button>
                    </div>
                    <div class="accessibility-option">
                        <label>Animations d'arrière-plan</label>
                        <button class="access-toggle-btn" id="access-animations-toggle">Activées</button>
                    </div>
                </div>
            </div>
        `;

        // Inject widget into DOM
        const wrapper = document.createElement('div');
        wrapper.innerHTML = widgetHtml;
        document.body.appendChild(wrapper.firstElementChild);

        // DOM elements
        const toggleBtn = document.getElementById('accessibility-toggle');
        const panel = document.getElementById('accessibility-panel');
        const btnNormal = document.getElementById('access-text-normal');
        const btnLg = document.getElementById('access-text-lg');
        const btnXl = document.getElementById('access-text-xl');
        const btnProjector = document.getElementById('access-projector-toggle');
        const btnAnimations = document.getElementById('access-animations-toggle');

        // Initial update of UI button active states
        updateButtonsUI();

        // 3. Setup event listeners
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            panel.classList.toggle('active');
        });

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (panel.classList.contains('active') && !panel.contains(e.target) && e.target !== toggleBtn) {
                panel.classList.remove('active');
            }
        });

        // Prevent panel closure when clicking inside options
        panel.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Text size controllers
        btnNormal.addEventListener('click', () => {
            textSize = 'normal';
            localStorage.setItem('acc-text-size', textSize);
            applyTextSize(textSize);
            updateButtonsUI();
        });

        btnLg.addEventListener('click', () => {
            textSize = 'large';
            localStorage.setItem('acc-text-size', textSize);
            applyTextSize(textSize);
            updateButtonsUI();
        });

        btnXl.addEventListener('click', () => {
            textSize = 'xlarge';
            localStorage.setItem('acc-text-size', textSize);
            applyTextSize(textSize);
            updateButtonsUI();
        });

        // Projector mode controller
        btnProjector.addEventListener('click', () => {
            projectorMode = !projectorMode;
            localStorage.setItem('acc-projector-mode', projectorMode);
            applyProjectorMode(projectorMode);
            updateButtonsUI();
        });

        // Animations controller
        btnAnimations.addEventListener('click', () => {
            animationsOff = !animationsOff;
            localStorage.setItem('acc-animations-off', animationsOff);
            applyAnimations(animationsOff);
            updateButtonsUI();
        });

        // Function to update UI button active states
        function updateButtonsUI() {
            // Text scale buttons
            btnNormal.classList.remove('active');
            btnLg.classList.remove('active');
            btnXl.classList.remove('active');
            
            if (textSize === 'normal') btnNormal.classList.add('active');
            else if (textSize === 'large') btnLg.classList.add('active');
            else if (textSize === 'xlarge') btnXl.classList.add('active');

            // Projector mode toggle
            if (projectorMode) {
                btnProjector.classList.add('active');
                btnProjector.textContent = "Activé";
            } else {
                btnProjector.classList.remove('active');
                btnProjector.textContent = "Désactivé";
            }

            // Animations toggle
            if (animationsOff) {
                btnAnimations.classList.add('active');
                btnAnimations.textContent = "Coupées";
            } else {
                btnAnimations.classList.remove('active');
                btnAnimations.textContent = "Activées";
            }
        }
    });
})();
