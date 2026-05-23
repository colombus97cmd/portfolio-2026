/* CYBERPUNK DYNAMIC BACKGROUND ANIMATION - 2026 */
/* Multicolored drifting smoke + floating binary digits (0 and 1) */
/* Mouse interactive: Smoke trail, smoke attraction & glowing digits */

const mouse = {
    x: undefined,
    y: undefined,
    active: false,
    lastX: undefined,
    lastY: undefined
};

class SmokeParticle {
    constructor(w, h) {
        this.reset(w, h);
        // Distribute randomly across the screen initially
        this.x = Math.random() * w;
        this.y = Math.random() * h;
    }

    reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 150; // Start below the screen
        this.size = 280 + Math.random() * 320; // Larger, more explicitly visible clouds
        this.vx = (Math.random() - 0.5) * 0.7; // Slow horizontal drift
        this.vy = -(0.3 + Math.random() * 0.6); // Slow vertical drift upward
        this.alpha = 0;
        this.maxAlpha = 0.07 + Math.random() * 0.08; // Brighter and more visible (7-15%)
        this.life = 0;
        this.maxLife = 500 + Math.random() * 400; // Lifespan of 8 to 15s
        
        // Colors: Cyberpunk HSL Cyan, Purple, and Magenta
        const colors = [
            { r: 0, g: 242, b: 255 },    // Neon Cyan
            { r: 188, g: 19, b: 254 },   // Neon Purple
            { r: 255, g: 0, b: 128 }     // Neon Magenta
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
        // Slow attraction to mouse position
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 600) {
                // Gentle pull towards the pointer to create responsive movement
                this.vx += (dx / dist) * 0.012;
                this.vy += (dy / dist) * 0.012;
            }
        }

        // Limit speed to keep movement smooth
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 1.8;
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;
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
        grad.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.35})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class TrailSmokeParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 50 + Math.random() * 80; // Medium clouds for cursor trail
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5 - 0.5; // Slight drift upward
        this.alpha = 0.25 + Math.random() * 0.15; // Visually pronounced trail
        this.life = 0;
        this.maxLife = 50 + Math.random() * 30; // Fades out in about 1-1.5s
        
        const colors = [
            { r: 0, g: 242, b: 255 },    // Neon Cyan
            { r: 188, g: 19, b: 254 },   // Neon Purple
            { r: 255, g: 0, b: 128 }     // Neon Magenta
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        // Linear fade out
        this.alpha = (1 - (this.life / this.maxLife)) * 0.35;
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
        this.vx = (Math.random() - 0.5) * 0.15; // Tiny horizontal sway
        this.vy = -(0.25 + Math.random() * 0.5); // Slow float upward
        this.alpha = 0;
        this.maxAlpha = 0.04 + Math.random() * 0.05; // Soft default
        this.life = 0;
        this.maxLife = 300 + Math.random() * 300;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe'; // Cyan or Purple
        
        // Interactive glow and scale states
        this.interactiveAlpha = 0;
        this.interactiveGlow = 0;
        this.scaleFactor = 1.0;
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Base fade in/out
        let baseAlpha = this.maxAlpha;
        if (this.life < 80) {
            baseAlpha = (this.life / 80) * this.maxAlpha;
        } else if (this.life > this.maxLife - 80) {
            baseAlpha = ((this.maxLife - this.life) / 80) * this.maxAlpha;
        }

        // Sublimation near mouse: glow, scale, and opacity boost
        if (mouse.active) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 240; // Proximity threshold
            
            if (dist < radius) {
                const factor = 1 - (dist / radius); // 1.0 at center, 0.0 at edge
                
                // Boost alpha up to +0.40 and glow blur up to +18px
                this.interactiveAlpha = factor * 0.45;
                this.interactiveGlow = factor * 18;
                this.scaleFactor = 1.0 + factor * 0.3; // Make characters up to 30% larger near mouse
                
                // Slow draw/sway towards pointer
                this.vx += (dx / dist) * 0.006;
            } else {
                this.interactiveAlpha = 0;
                this.interactiveGlow = 0;
                this.scaleFactor = 1.0;
            }
        } else {
            this.interactiveAlpha = 0;
            this.interactiveGlow = 0;
            this.scaleFactor = 1.0;
        }

        this.alpha = baseAlpha;

        // Reset if dead or off screen
        if (this.life >= this.maxLife || this.y < -30) {
            this.reset(w, h);
        }
    }

    draw(ctx) {
        const finalAlpha = Math.min(0.95, this.alpha + this.interactiveAlpha);
        if (finalAlpha <= 0) return;
        
        ctx.save();
        ctx.globalAlpha = finalAlpha;
        
        const finalSize = this.fontSize * this.scaleFactor;
        ctx.font = `bold ${finalSize}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = this.color;
        
        // Glow effect
        const glow = 5 + this.interactiveGlow;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = glow;
        
        ctx.fillText(this.char, this.x, this.y);
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

    // 2. Mouse Tracking Listeners
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
        
        // Spawn trail particles if mouse has moved significantly
        const deltaX = mouse.lastX !== undefined ? Math.abs(mouse.x - mouse.lastX) : 0;
        const deltaY = mouse.lastY !== undefined ? Math.abs(mouse.y - mouse.lastY) : 0;
        
        if (deltaX > 4 || deltaY > 4) {
            // Spawn 1 to 2 trail smoke particles for paint/brush effect
            if (trails.length < 50) { // Safety ceiling to protect CPU
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
    });

    // 3. Initialize Particles
    const smokeCount = 10;  // Slightly more base particles for denser smoke coverage
    const digitCount = 35;  // Slightly more binary digits
    
    const smokes = [];
    const digits = [];
    const trails = []; // Holds the cursor trail smoke particles

    for (let i = 0; i < smokeCount; i++) {
        smokes.push(new SmokeParticle(w, h));
    }
    for (let i = 0; i < digitCount; i++) {
        digits.push(new DigitParticle(w, h));
    }

    // 4. Animation Loop
    function animate() {
        ctx.clearRect(0, 0, w, h);
        
        // Radial deep space background gradient
        const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h));
        bgGrad.addColorStop(0, '#0c0316');
        bgGrad.addColorStop(1, '#020202');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Update and draw background smoke
        smokes.forEach(s => {
            s.update(w, h);
            s.draw(ctx);
        });

        // Update and draw cursor trail smoke
        for (let i = trails.length - 1; i >= 0; i--) {
            const t = trails[i];
            t.update();
            t.draw(ctx);
            if (t.life >= t.maxLife) {
                trails.splice(i, 1); // Delete dead trail particles
            }
        }

        // Update and draw digits (sublimation checks happen inside update)
        digits.forEach(d => {
            d.update(w, h);
            d.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    animate();
});
