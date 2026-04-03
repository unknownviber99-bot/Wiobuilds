 /** * WIOBUILDS // FINAL UNIFIED ENGINE 
 */

// 1. BOOT LOADER (Guaranteed to hide after 2 seconds even if error occurs)
const loader = document.getElementById('loader');
const loaderText = document.querySelector('.loader-text');
const bootMessages = ["INITIALIZING...", "FETCHING_ASSETS...", "SYSTEM_READY"];
let msgIndex = 0;

const bootInterval = setInterval(() => {
    if (loaderText && msgIndex < bootMessages.length) {
        loaderText.innerText = bootMessages[msgIndex];
        msgIndex++;
    } else {
        clearInterval(bootInterval);
        if(loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }
}, 400);

// Force hide loader after 3 seconds just in case
setTimeout(() => { if(loader) loader.style.display = 'none'; }, 3000);

// 2. CANVAS & PARTICLES
const canvas = document.getElementById('particle-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let emitterParticles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.vy = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y -= this.vy;
            if (this.y < 0) this.reset();
        }
        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    // 3. HOVER PARTICLE EMITTER
    const cards = document.querySelectorAll('.tilt-element');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            for(let i=0; i<3; i++) {
                emitterParticles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 2,
                    vy: -Math.random() * 3 - 1,
                    alpha: 1
                });
            }
        });
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        
        emitterParticles.forEach((p, i) => {
            p.x += p.vx; p.y += p.vy; p.alpha -= 0.02;
            ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI * 2); ctx.fill();
            if(p.alpha <= 0) emitterParticles.splice(i, 1);
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// 4. CLOCK (Check if element exists first)
setInterval(() => {
    const clockEl = document.getElementById('clock');
    if(clockEl) clockEl.innerText = new Date().toLocaleTimeString('en-GB');
}, 1000);
