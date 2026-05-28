/* CYBERPUNK DYNAMIC BACKGROUND ANIMATION & PAGE TRANSITIONS - 2026 */
/* Multicolored drifting smoke + floating binary digits revealed through smoke */
/* Galaxy vortex page transitions (Page In and Page Out) */

const colors = [
    { r: 0, g: 242, b: 255 },    // Neon Cyan
    { r: 188, g: 19, b: 254 },   // Neon Purple
    { r: 255, g: 0, b: 128 }     // Neon Magenta
];

const mouse = {
    x: undefined,
    y: undefined,
    active: false,
    lastX: undefined,
    lastY: undefined,
    lastFrameX: undefined,
    lastFrameY: undefined,
    stationaryTicks: 0,
    isStationary: false
};

class SmokeParticle {
    constructor(w, h) {
        this.reset(w, h);
        // Distribute randomly across the screen initially
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = 100 + Math.random() * 200;
    }

    reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 150; // Start below the screen
        this.size = 60 + Math.random() * 80; // Start smaller and grow
        this.growthRate = 0.5 + Math.random() * 0.8; // Grow rate for realistic puffing smoke
        this.maxSize = 280 + Math.random() * 140; // Expand up to 420px
        this.vx = (Math.random() - 0.5) * 0.6; // Slow horizontal drift
        this.vy = -(0.4 + Math.random() * 0.7); // Slow vertical drift upward
        this.wobbleSpeed = 0.008 + Math.random() * 0.015; // Slow sinusoidal wobble speed
        this.wobbleAmount = 0.15 + Math.random() * 0.3; // Sideways drift amplitude
        this.alpha = 0;
        this.maxAlpha = 0.06 + Math.random() * 0.08; // Base visibility (6-14%)
        this.life = 0;
        this.maxLife = 500 + Math.random() * 400; // Lifespan of 8 to 15s
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
        // Slow attraction to mouse position when moving
        if (mouse.active && !mouse.isStationary) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 500) {
                this.vx += (dx / dist) * 0.015;
                this.vy += (dy / dist) * 0.015;
            }
        }

        // Limit speed to keep movement smooth
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 1.6;
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }

        // Volatile air currents simulation (sideways wobble + velocity)
        this.x += this.vx + Math.sin(this.life * this.wobbleSpeed) * this.wobbleAmount;
        this.y += this.vy;
        
        // Expand size over time
        if (this.size < this.maxSize) {
            this.size += this.growthRate;
        }

        this.life++;

        // Fade in
        if (this.life < 120) {
            this.alpha = (this.life / 120) * this.maxAlpha;
        }
        // Fade out
        else if (this.life > this.maxLife - 120) {
            this.alpha = ((this.maxLife - this.life) / 120) * this.maxAlpha;
        }
        else {
            this.alpha = this.maxAlpha;
        }

        // Reset if dead or moved too far off screen
        if (this.life >= this.maxLife || this.y < -this.size || this.x < -this.size || this.x > w + this.size) {
            this.reset(w, h);
        }
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`);
        grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.3})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class TrailSmokeParticle {
    constructor(x, y, isVortex = false) {
        this.x = x + (Math.random() - 0.5) * 15;
        this.y = y + (Math.random() - 0.5) * 15;
        this.size = 25 + Math.random() * 25; // Start small
        this.growthRate = 1.0 + Math.random() * 1.5; // Grow fast
        this.maxSize = 100 + Math.random() * 80; // Expand to represent volatile gas
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = (Math.random() - 0.5) * 1.2 - 0.3; // Slight upward bias
        this.alpha = 0.28 + Math.random() * 0.12; // Pronounced initial density
        this.life = 0;
        this.maxLife = 60 + Math.random() * 30; // Fades out in ~1-1.5s
        this.isVortex = isVortex;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        // Swirl vortex physics around the stationary cursor
        if (mouse.active && mouse.isStationary) {
            const dx = this.x - mouse.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 6) {
                // Perpendicular vector for counter-clockwise rotation: (-dy, dx)
                const tx = -dy / dist;
                const ty = dx / dist;
                
                // Ring/Orbit stabilization radius around 110px
                const targetRadius = 110;
                const pull = (dist - targetRadius) * 0.005; // Radial spring force
                
                // Mix tangential orbit speed with radial pull
                const orbitSpeed = 1.8 + Math.random() * 0.4;
                this.vx += (tx * orbitSpeed - (dx / dist) * pull - this.vx) * 0.08;
                this.vy += (ty * orbitSpeed - (dy / dist) * pull - this.vy) * 0.08;
            }
        } 
        // Flowing drag effect if cursor is moving
        else if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > 80) {
                this.vx += (dx / dist) * 0.03;
                this.vy += (dy / dist) * 0.03;
            }
        }

        // Apply velocities
        this.x += this.vx;
        this.y += this.vy;
        
        // Puff expansion
        if (this.size < this.maxSize) {
            this.size += this.growthRate;
        }

        this.life++;
        // Fade out
        this.alpha = (1 - (this.life / this.maxLife)) * 0.35;
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`);
        grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class DigitParticle {
    constructor(w, h) {
        this.reset(w, h);
        this.y = Math.random() * h;
    }

    reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + 20; // Start below screen
        this.char = Math.random() > 0.5 ? '0' : '1';
        this.fontSize = 11 + Math.random() * 16; // 11px to 27px
        this.vx = (Math.random() - 0.5) * 0.12; // Tiny horizontal sway
        this.vy = -(0.2 + Math.random() * 0.4); // Slow float upward
        this.life = 0;
        this.maxLife = 400 + Math.random() * 400;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe'; // Cyan or Purple
        
        this.baseAlpha = 0.015; // Faint default (makes it virtually invisible in empty black space)
        this.alpha = this.baseAlpha;
        this.smokeInfluence = 0; // Calculated dynamically in rendering loop
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Reset if dead or off screen
        if (this.life >= this.maxLife || this.y < -30) {
            this.reset(w, h);
        }
    }

    draw(ctx) {
        // Boost transparency dynamically based on local smoke density (up to 0.75 opacity inside thick smoke)
        const finalAlpha = Math.min(0.75, this.baseAlpha + this.smokeInfluence * 0.75);
        if (finalAlpha <= 0.02) return; // Completely hide if there's no smoke nearby
        
        ctx.save();
        ctx.globalAlpha = finalAlpha;
        
        // Scale slightly based on density to add depth
        const scaleFactor = 1.0 + Math.min(0.3, this.smokeInfluence * 0.4);
        const finalSize = this.fontSize * scaleFactor;
        
        ctx.font = `bold ${finalSize}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = this.color;
        
        // Dynamic glow blur based on smoke proximity
        const glow = 4 + this.smokeInfluence * 20;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = glow;
        
        ctx.fillText(this.char, this.x, this.y);
        ctx.restore();
    }
}

class GalaxyParticle {
    constructor(cx, cy, color, angleOffset, direction = 'out') {
        this.cx = cx;
        this.cy = cy;
        this.direction = direction; // 'in' or 'out'
        
        // Polar coordinates
        this.angle = angleOffset + (Math.random() - 0.5) * 0.3;
        this.maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.2;
        
        if (direction === 'out') {
            this.radius = 0;
            this.speed = 5 + Math.random() * 7; // Spiral outward speed
            this.rotSpeed = 0.015 + Math.random() * 0.025; // Rotation speed
            this.alpha = 0.55 + Math.random() * 0.25;
        } else {
            this.radius = this.maxRadius * (0.8 + Math.random() * 0.3);
            this.speed = -(8 + Math.random() * 8); // Fast spiral inward speed
            this.rotSpeed = 0.025 + Math.random() * 0.035;
            this.alpha = 0.0; // Starts transparent and fades in as it contracts
        }

        this.size = 15 + Math.random() * 25; // Small initial size
        this.growthRate = 1.4 + Math.random() * 1.8; // Grow fast
        this.maxSize = 160 + Math.random() * 90; // Expand to represent volatile gas
        
        this.life = 0;
        this.maxLife = 90 + Math.random() * 30; // 1.5 to 2 seconds
        this.color = color;
    }

    update() {
        this.life++;
        
        // Update polar coordinates
        this.radius += this.speed;
        this.angle += this.rotSpeed;

        // Convert polar to cartesian coordinates
        this.x = this.cx + this.radius * Math.cos(this.angle);
        this.y = this.cy + this.radius * Math.sin(this.angle);

        // Size expansion
        if (this.size < this.maxSize) {
            this.size += this.growthRate;
        }

        // Alpha calculation
        if (this.direction === 'out') {
            this.alpha = (1 - (this.life / this.maxLife)) * 0.85;
        } else {
            // Fade in as it contracts to center to hide the screen
            this.alpha = Math.min(0.9, (this.life / (this.maxLife * 0.7)));
        }
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        grad.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`);
        grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and inject the background canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'cyber-bg-canvas';
    
    // Fixed positioning behind all contents
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    canvas.style.background = '#020202';
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // 1.2 Create and inject the transition overlay canvas
    const transCanvas = document.createElement('canvas');
    transCanvas.id = 'cyber-transition-canvas';
    transCanvas.style.position = 'fixed';
    transCanvas.style.top = '0';
    transCanvas.style.left = '0';
    transCanvas.style.width = '100%';
    transCanvas.style.height = '100%';
    transCanvas.style.zIndex = '10005'; // Cover all contents including modals
    transCanvas.style.pointerEvents = 'none';
    transCanvas.style.display = 'none';
    document.body.appendChild(transCanvas);

    const transCtx = transCanvas.getContext('2d');
    let tw = transCanvas.width = window.innerWidth;
    let th = transCanvas.height = window.innerHeight;

    // 2. Mouse Tracking Listeners
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
        
        // Calculate cumulative distance since last spawn to handle slow moves and gaming mice
        const lastX = mouse.lastX !== undefined ? mouse.lastX : mouse.x;
        const lastY = mouse.lastY !== undefined ? mouse.lastY : mouse.y;
        const dist = Math.sqrt((mouse.x - lastX) ** 2 + (mouse.y - lastY) ** 2);
        
        if (dist > 15 || mouse.lastX === undefined) {
            // Spawn trail smoke particles for paint/brush effect
            if (trails.length < 80) { // Safety ceiling to protect CPU
                trails.push(new TrailSmokeParticle(mouse.x, mouse.y));
            }
            mouse.lastX = mouse.x;
            mouse.lastY = mouse.y;
        }
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.lastX = undefined;
        mouse.lastY = undefined;
    });

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        tw = transCanvas.width = window.innerWidth;
        th = transCanvas.height = window.innerHeight;
    });

    // 3. Initialize Particles
    const smokeCount = 12;  // Volatile background clouds
    const digitCount = 40;  // Binary digits
    
    const smokes = [];
    const digits = [];
    const trails = []; // Holds both cursor trail and vortex particles

    for (let i = 0; i < smokeCount; i++) {
        smokes.push(new SmokeParticle(w, h));
    }
    for (let i = 0; i < digitCount; i++) {
        digits.push(new DigitParticle(w, h));
    }

    // 4. Animation Loop
    function animate() {
        if (document.body.classList.contains('animations-off')) {
            ctx.clearRect(0, 0, w, h);
            ctx.fillStyle = '#020202';
            ctx.fillRect(0, 0, w, h);
            requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, w, h);
        
        // Radial deep space background gradient
        const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h));
        bgGrad.addColorStop(0, '#0c0316');
        bgGrad.addColorStop(1, '#020202');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // 4.1 Update Stationary Mouse Detection & Feed Vortex
        if (mouse.active) {
            if (mouse.x === mouse.lastFrameX && mouse.y === mouse.lastFrameY) {
                mouse.stationaryTicks++;
            } else {
                mouse.stationaryTicks = 0;
                mouse.isStationary = false;
            }
            
            // If mouse is stationary for ~160ms (10 frames at 60fps)
            if (mouse.stationaryTicks > 10) {
                mouse.isStationary = true;
                
                // Continuously feed the orbit vortex with new revolving particles
                if (Math.random() > 0.45 && trails.length < 80) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = 50 + Math.random() * 80;
                    const px = mouse.x + Math.cos(angle) * r;
                    const py = mouse.y + Math.sin(angle) * r;
                    trails.push(new TrailSmokeParticle(px, py, true));
                }
            }
            
            mouse.lastFrameX = mouse.x;
            mouse.lastFrameY = mouse.y;
        }

        // Update and draw background smoke
        smokes.forEach(s => {
            s.update(w, h);
            s.draw(ctx);
        });

        // Update and draw cursor trail/vortex smoke
        for (let i = trails.length - 1; i >= 0; i--) {
            const t = trails[i];
            t.update();
            t.draw(ctx);
            if (t.life >= t.maxLife) {
                trails.splice(i, 1); // Delete dead trail particles
            }
        }

        // Update, calculate dynamic smoke revelation influence, and draw digits
        digits.forEach(d => {
            d.update(w, h);
            
            // Proximity/Density check against ALL active smoke clouds
            let influence = 0;
            
            // Check background smoke
            smokes.forEach(s => {
                const dx = s.x - d.x;
                const dy = s.y - d.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < s.size) {
                    influence += (1 - (dist / s.size)) * s.alpha;
                }
            });
            
            // Check trail and vortex smoke
            trails.forEach(t => {
                const dx = t.x - d.x;
                const dy = t.y - d.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < t.size) {
                    influence += (1 - (dist / t.size)) * t.alpha;
                }
            });
            
            d.smokeInfluence = influence;
            d.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    // 5. Page Enter and Exit Transitions (Vortex math)
    function triggerPageIn() {
        transCanvas.style.display = 'block';
        transCanvas.style.pointerEvents = 'auto'; // Block user input during transition
        
        const cx = tw / 2;
        const cy = th / 2;
        const particles = [];
        
        // Spawn particles spiraling OUTWARD from center
        const armsCount = 4;
        const particlesPerArm = 20;
        
        for (let arm = 0; arm < armsCount; arm++) {
            const armAngle = (arm * Math.PI * 2) / armsCount;
            for (let j = 0; j < particlesPerArm; j++) {
                const angleOffset = armAngle + (Math.random() - 0.5) * 0.3;
                const color = colors[arm % colors.length];
                particles.push(new GalaxyParticle(cx, cy, color, angleOffset, 'out'));
            }
        }
        
        let overlayAlpha = 1.0; // Starts fully black
        
        function pageInLoop() {
            transCtx.clearRect(0, 0, tw, th);
            
            // Draw fading black background overlay
            overlayAlpha -= 0.02; // Fades out over ~0.8s
            if (overlayAlpha < 0) overlayAlpha = 0;
            
            transCtx.fillStyle = `rgba(2, 2, 2, ${overlayAlpha})`;
            transCtx.fillRect(0, 0, tw, th);
            
            // Update and draw particles
            let activeParticles = 0;
            particles.forEach(p => {
                p.update();
                p.draw(transCtx);
                if (p.life < p.maxLife) {
                    activeParticles++;
                }
            });
            
            if (activeParticles > 0 || overlayAlpha > 0) {
                requestAnimationFrame(pageInLoop);
            } else {
                // Done! Clean up and allow interactions
                transCanvas.style.display = 'none';
                transCanvas.style.pointerEvents = 'none';
            }
        }
        
        pageInLoop();
    }

    function triggerPageOut(targetUrl) {
        transCanvas.style.display = 'block';
        transCanvas.style.pointerEvents = 'auto'; // Block clicks
        
        const cx = tw / 2;
        const cy = th / 2;
        const particles = [];
        
        // Spawn particles spiraling INWARD to cover the screen
        const armsCount = 4;
        const particlesPerArm = 22;
        
        for (let arm = 0; arm < armsCount; arm++) {
            const armAngle = (arm * Math.PI * 2) / armsCount;
            for (let j = 0; j < particlesPerArm; j++) {
                const angleOffset = armAngle + (Math.random() - 0.5) * 0.3;
                const color = colors[arm % colors.length];
                particles.push(new GalaxyParticle(cx, cy, color, angleOffset, 'in'));
            }
        }
        
        let overlayAlpha = 0.0; // Starts fully transparent
        
        function pageOutLoop() {
            transCtx.clearRect(0, 0, tw, th);
            
            // Draw fading in black background overlay
            overlayAlpha += 0.025; // Fades in over ~0.6s
            if (overlayAlpha > 1.0) overlayAlpha = 1.0;
            
            transCtx.fillStyle = `rgba(2, 2, 2, ${overlayAlpha})`;
            transCtx.fillRect(0, 0, tw, th);
            
            // Update and draw particles
            let activeParticles = 0;
            particles.forEach(p => {
                p.update();
                p.draw(transCtx);
                if (p.life < p.maxLife) {
                    activeParticles++;
                }
            });
            
            // Redirect when overlay is fully opaque
            if (overlayAlpha >= 1.0) {
                window.location.href = targetUrl;
            } else {
                requestAnimationFrame(pageOutLoop);
            }
        }
        
        pageOutLoop();
    }

    // 6. Intercept navigation links for transitions
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const href = link.getAttribute('href');
            const target = link.getAttribute('target');
            
            // Intercept only internal same-window page changes
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && target !== '_blank') {
                // Ignore downloads and static PDF documents
                if (href.endsWith('.pdf') || href.startsWith('assets/')) {
                    return;
                }
                
                e.preventDefault();
                triggerPageOut(href);
            }
        }
    });

    // Start background animation and trigger page enter transition
    animate();
    triggerPageIn();
});
