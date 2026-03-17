/* ============================================
   KIIT Fest 9.0 — Thank You Page Scripts
   ============================================ */

(function () {
    'use strict';

    // === CAROUSEL IMAGES (Cloudinary) ===
    const CAROUSEL_IMAGES = [
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773763498/DSC03256-2_jususq.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773765419/50M_4668_hnhlls.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773763479/Suhana_Safar-13_q0w8kd.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773765431/50M_4418_cayqsa.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773763477/DSC00778_tf6eb6.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773765446/IMG_1256_majvzk.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773763471/FEST_1_bg3vrp.png',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773765461/DSC08938_nqvaru.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773763471/DSC00655_rvv3lo.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773765472/50M_5273_oohpbb.jpg',
        'https://res.cloudinary.com/dyqnbmkco/image/upload/v1773765490/IMG-575_iyaxsp.jpg'
    ];

    const SLIDE_DURATION = 6000;
    const PRELOADER_DELAY = 800;

    function shuffleArray(items) {
        const shuffled = [...items];
        for (let index = shuffled.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
        }
        return shuffled;
    }

    // === PRELOADER ===
    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        // Hide after a short delay — don't wait for external images
        setTimeout(() => preloader.classList.add('loaded'), PRELOADER_DELAY);
    }

    // === BACKGROUND CAROUSEL ===
    const DIRECTIONS = 4; // number of Ken Burns animation variants

    function initCarousel() {
        const container = document.getElementById('bgCarousel');
        if (!container) return;

        const overlay = container.querySelector('.carousel-overlay');
        const slides = [];
        let current = 0;
        let dirIndex = 0;
        const imageSet = shuffleArray(CAROUSEL_IMAGES);

        imageSet.forEach((src, i) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.style.backgroundImage = `url('${src}')`;
            slide.setAttribute('data-direction', i % DIRECTIONS);
            if (i === 0) slide.classList.add('active');
            if (overlay) {
                container.insertBefore(slide, overlay);
            } else {
                container.appendChild(slide);
            }
            slides.push(slide);
        });

        if (slides.length > 1) {
            setInterval(() => {
                // Remove active from current slide
                slides[current].classList.remove('active');

                // Advance to next
                current = (current + 1) % slides.length;
                dirIndex = (dirIndex + 1) % DIRECTIONS;

                // Assign new Ken Burns direction & activate
                slides[current].setAttribute('data-direction', dirIndex);
                requestAnimationFrame(() => slides[current].classList.add('active'));
            }, SLIDE_DURATION);
        }
    }

    // === INIT ===
    document.addEventListener('DOMContentLoaded', () => {
        initPreloader();
        initCarousel();
    });
})();
