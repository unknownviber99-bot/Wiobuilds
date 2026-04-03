
/**
 * WIOBUILDS // Core Engine
 */

// 1. BOOT LOADER LOGIC
const loader = document.getElementById('loader');
const loaderText = document.querySelector('.loader-text');
const bootMessages = [
    "INITIALIZING_CORE...",
    "FETCHING_ASSETS...",
    "BYPASSING_FIREWALL...",
    "ESTABLISHING_EDGE_CONNECTION...",
    "MOUNTING_ARCHITECTURE...",
    "SYSTEM_READY"
];

let msgIndex = 0;
const bootSequence = setInterval(() => {
    loaderText.innerText = bootMessages[msgIndex];
    msgIndex++;
    if (msgIndex >= bootMessages.length) {
        clearInterval(bootSequence);
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 500);
    }
}, 300);

// 2. CLOCK WIDGET
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
    document.getElementById('clock').innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// 3. PARTICLE CANVAS ENGINE
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < 100; i++) particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}
init();
animate();



/**
 * WIOBUILDS // Special Interaction Engine
 * Features: 3D Tilt, Particle Emitter on Hover
 */

const cards = document.querySelectorAll('.tilt-element');

// 1. DYNAMIC PARTICLE EMITTER (This creates the unique float-up effect)
let emitterParticles = [];

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Update CSS variables for the background glow (as used in style.css)
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${(mouseX / rect.width) * 100}%`);
        card.style.setProperty('--mouse-y', `${(mouseY / rect.height) * 100}%`);

        // Emit new "Float Up" particles from the cursor position
        if (Math.random() < 0.1) { // Control the emission rate (10% chance per frame)
            emitterParticles.push({
                x: e.clientX,
                y: e.clientY,
                speedX: (Math.random() - 0.5) * 1, // Slight horizontal drift
                speedY: -(Math.random() * 2 + 1), // Force particles UP
                size: Math.random() * 1.5 + 0.5,
                opacity: 1,
                life: 100 // How many frames before it fades
            });
        }
    });
});

// 2. TILT EFFECT (Preparation for GPU acceleration)
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (centerY - (e.clientY - rect.top)) / 15;
        const rotateY = ((e.clientX - rect.left) - centerX) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
});

// 3. INTEGRATION: Draw the Emitter Particles (Add this inside your animate() loop in particles.js)
// Assuming particles.js animate function looks something like this:
/*
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ... draw normal background particles ...
    
    // --> ADD THIS BLOCK HERE <--
    updateAndDrawEmitterParticles();
    // ---------------------------

    requestAnimationFrame(animate);
}
*/

function updateAndDrawEmitterParticles() {
    for (let i = 0; i < emitterParticles.length; i++) {
        const p = emitterParticles[i];
        
        p.x += p.speedX;
        p.y += p.speedY; // Floating UP
        p.opacity -= 0.01; // Fade out
        p.life--;

        // Draw the specialized particle
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Remove dead particles from the array
        if (p.opacity <= 0 || p.life <= 0) {
            emitterParticles.splice(i, 1);
            i--; // Adjust index
        }
    }
                                                }
