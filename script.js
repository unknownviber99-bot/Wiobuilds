
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
