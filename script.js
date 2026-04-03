
// ================================
// WIOBUILDS // CORE ENGINE v2
// ================================

(() => {

    // ================================
    // 1. LOADER SYSTEM
    // ================================
    const loader = document.getElementById('loader');
    const loaderText = document.querySelector('.loader-text');

    const bootMessages = [
        "INITIALIZING...",
        "FETCHING_ASSETS...",
        "SYSTEM_READY"
    ];

    let msgIndex = 0;

    const bootInterval = setInterval(() => {
        if (loaderText && msgIndex < bootMessages.length) {
            loaderText.innerText = bootMessages[msgIndex++];
        } else {
            clearInterval(bootInterval);
            hideLoader();
        }
    }, 400);

    function hideLoader() {
        if (!loader) return;
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
    }

    setTimeout(hideLoader, 3000);


    // ================================
    // 2. PARTICLE ENGINE (OPTIMIZED)
    // ================================
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
                ctx.fillStyle = 'rgba(255,255,255,0.15)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        // HOVER EMITTER (delegated)
        document.addEventListener('mousemove', (e) => {
            if (!e.target.closest('.tilt-element')) return;

            for (let i = 0; i < 2; i++) {
                emitterParticles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 2,
                    vy: -Math.random() * 2,
                    alpha: 1
                });
            }
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // safer loop
            emitterParticles = emitterParticles.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.02;

                ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
                ctx.fill();

                return p.alpha > 0;
            });

            requestAnimationFrame(animate);
        }

        animate();
    }


    // ================================
    // 3. CLOCK SYSTEM
    // ================================
    const clockEl = document.getElementById('clock');

    if (clockEl) {
        setInterval(() => {
            clockEl.innerText = new Date().toLocaleTimeString('en-GB');
        }, 1000);
    }


    // ================================
    // 4. TIER SELECTION SYSTEM
    // ================================
    const tierCards = document.querySelectorAll('.tier-card');
    let selectedTier = "pro";

    tierCards.forEach(card => {
        card.addEventListener('click', () => {
            tierCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedTier = card.dataset.tier;
        });
    });


    // ================================
    // 5. BOOKING ACTION
    // ================================
    const confirmBtn = document.querySelector('.full-width');

    if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
            alert(`SYSTEM: ${selectedTier.toUpperCase()} PACKAGE SELECTED`);
        });
    }


    // ================================
    // 6. AUTH SYSTEM (BASIC)
    // ================================
    const authBox = document.querySelector('.auth-box');
    const switchAuth = document.querySelector('.switch-auth span');

    let isLogin = true;

    if (switchAuth) {
        switchAuth.addEventListener('click', () => {
            isLogin = !isLogin;

            authBox.querySelector('button').innerText = isLogin ? "LOGIN" : "SIGN UP";
            switchAuth.innerText = isLogin ? "SIGN UP" : "LOGIN";
        });
    }


    // ================================
    // 7. SIDEBAR INTERACTION
    // ================================
    const menuItems = document.querySelectorAll('.sidebar-menu li');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });


})();
