/* =========================================================
   Ahmed Asar — Portfolio
   Twinkling stars + small UX touches
   ========================================================= */

(function () {
    'use strict';

    // -----------------------------------------------------
    // 1. Generate twinkling stars
    // -----------------------------------------------------
    function createStars() {
        const container = document.getElementById('twinkling');
        if (!container) return;

        const isMobile = window.innerWidth < 600;
        const starCount = isMobile ? 80 : 180;

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('span');
            star.classList.add('star');

            // random size: tiny (1px) to small (3px)
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;

            // random position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;

            // random twinkle timing
            const duration = Math.random() * 3 + 2; // 2s — 5s
            const delay = Math.random() * 5;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.setProperty('--delay', `${delay}s`);

            // a few brighter "main" stars
            if (Math.random() > 0.92) {
                star.style.width = `${size + 1.5}px`;
                star.style.height = `${size + 1.5}px`;
                star.style.boxShadow =
                    '0 0 6px #fff, 0 0 12px rgba(255,255,255,0.5), 0 0 20px rgba(255,255,255,0.3)';
            }

            fragment.appendChild(star);
        }

        container.appendChild(fragment);
    }

    // -----------------------------------------------------
    // 2. Update copyright year
    // -----------------------------------------------------
    function setYear() {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    }

    // -----------------------------------------------------
    // 3. Subtle parallax on stars when scrolling
    // -----------------------------------------------------
    function initParallax() {
        const stars = document.getElementById('twinkling');
        if (!stars) return;

        // skip on small screens / reduced motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (window.innerWidth < 700) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const offset = window.scrollY * 0.15;
                    stars.style.transform = `translateY(${offset}px)`;
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // -----------------------------------------------------
    // Boot
    // -----------------------------------------------------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            createStars();
            setYear();
            initParallax();
        });
    } else {
        createStars();
        setYear();
        initParallax();
    }
})();
