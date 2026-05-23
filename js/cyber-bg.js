/* CYBERPUNK DYNAMIC BACKGROUND ANIMATION - 2026 */
/* Multicolored drifting smoke + floating binary digits (0 and 1) */

class SmokeParticle {
    constructor(w, h) {
        this.reset(w, h);
        // Distribute randomly across the screen initially
        this.x = Math.random() * w;
        this.y = Math.random() * h;
    }

    reset(w, h) {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 100; // Start just below the screen
        this.size = 200 + Math.random() * 300; // Large soft clouds
        this.vx = (Math.random() - 0.5) * 1.0; // Slow horizontal drift
        this.vy = -(0.4 + Math.random() * 0.8); // Slow vertical drift upward
        this.alpha = 0;
        this.maxAlpha = 0.03 + Math.random() * 0.05; // Very subtle transparency
        this.life = 0;
        this.maxLife = 400 + Math.random() * 300; // 5 to 10 seconds (approx 60fps)
        
        // Colors: Cyberpunk HSL Cyan, Purple, and Magenta
        const colors = [
            { r: 0, g: 242, b: 255 },    // Neon Cyan
            { r: 188, g: 19, b: 254 },   // Neon Purple
            { r: 255, g: 0, b: 128 }     // Neon Magenta
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Fade in
        if (this.life < 100) {
            this.alpha = (this.life / 100) * this.maxAlpha;
        }
        // Fade out
        else if (this.life > this.maxLife - 100) {
            this.alpha = ((this.maxLife - this.life) / 100) * this.maxAlpha;
        }
        else {
            this.alpha = this.maxAlpha;
        }

        // Reset if dead or moved too far off screen
        if (this.life >= this.maxLife || this.y < -this.size) {
            this.reset(w, h);
        }
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        // Create smooth radial gradient
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
        this.vx = (Math.random() - 0.5) * 0.2; // Tiny horizontal sway
        this.vy = -(0.3 + Math.random() * 0.6); // Slow float upward
        this.alpha = 0;
        this.maxAlpha = 0.05 + Math.random() * 0.08; // Very faint to keep content readable
        this.life = 0;
        this.maxLife = 300 + Math.random() * 300;
        this.color = Math.random() > 0.5 ? '#00f2ff' : '#bc13fe'; // Cyan or Purple
    }

    update(w, h) {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;

        // Fade in
        if (this.life < 80) {
            this.alpha = (this.life / 80) * this.maxAlpha;
        }
        // Fade out
        else if (this.life > this.maxLife - 80) {
            this.alpha = ((this.maxLife - this.life) / 80) * this.maxAlpha;
        }
        else {
            this.alpha = this.maxAlpha;
        }

        // Reset if dead or off screen
        if (this.life >= this.maxLife || this.y < -30) {
            this.reset(w, h);
        }
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.font = `bold ${this.fontSize}px "Space Grotesk", sans-serif`;
        ctx.fillStyle = this.color;
        
        // Add a soft glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        
        ctx.fillText(this.char, this.x, this.y);
        ctx.restore();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Create and inject the background canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'cyber-bg-canvas';
    
    // Inline styling to place it completely behind other content without intercepting clicks
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    canvas.style.background = '#020202'; // Fallback base color
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    // 2. Handle Resizing
    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });

    // 3. Initialize Particles
    const smokeCount = 8;  // Lower count of huge particles is better for performance and visual contrast
    const digitCount = 30; // Fills space nicely without crowding
    
    const smokes = [];
    const digits = [];

    for (let i = 0; i < smokeCount; i++) {
        smokes.push(new SmokeParticle(w, h));
    }
    for (let i = 0; i < digitCount; i++) {
        digits.push(new DigitParticle(w, h));
    }

    // 4. Animation Loop
    function animate() {
        // Subtle clear to preserve trail effect if desired, but complete clean is cleaner for crisp digits
        ctx.clearRect(0, 0, w, h);
        
        // Draw base background radial gradient
        const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h));
        bgGrad.addColorStop(0, '#0c0316'); // Very deep purple center
        bgGrad.addColorStop(1, '#020202'); // Black edge
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Update and draw smoke
        smokes.forEach(s => {
            s.update(w, h);
            s.draw(ctx);
        });

        // Update and draw digits
        digits.forEach(d => {
            d.update(w, h);
            d.draw(ctx);
        });

        requestAnimationFrame(animate);
    }

    // Start
    animate();
});
