// JavaScript do site

document.addEventListener('DOMContentLoaded', function () {
    // Speakers Bio Toggle (Expand/Collapse)
    const toggleButtons = document.querySelectorAll('.speakers__card-toggle');

    toggleButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const bio = this.closest('.speakers__card-bio');
            const fullContent = bio.querySelector('.speakers__card-full');
            const isExpanded = this.getAttribute('data-expanded') === 'true';

            if (isExpanded) {
                // Colapsar
                fullContent.hidden = true;
                this.setAttribute('data-expanded', 'false');
                this.textContent = 'SAIBA MAIS';
            } else {
                // Expandir
                fullContent.hidden = false;
                this.setAttribute('data-expanded', 'true');
                this.textContent = 'VER MENOS';
            }
        });
    });
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.header__mobile-toggle');
    const headerMenu = document.querySelector('.header__menu');
    const menuLinks = document.querySelectorAll('.header__link');

    if (mobileToggle && headerMenu) {
        mobileToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            headerMenu.classList.toggle('active');

            // Toggle aria-expanded
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking a link
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                mobileToggle.classList.remove('active');
                headerMenu.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll to Top Functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================================
    // SCROLL REVEAL ANIMATIONS
    // ========================================

    // Elementos a serem animados em cada section
    const revealSelectors = [
        // Stats section
        '.stats__card',
        // About section
        '.about__photo',
        '.about__title',
        '.about__description',
        '.about__stats-card',
        '.about__info-item',
        '.about__cta',
        // Jornada section
        '.jornada__title',
        '.jornada__description',
        '.jornada__date',
        '.jornada__cta',
        '.jornada__video-wrapper',
        // Mission Objective section
        '.mission-objective__title',
        '.mission-objective__card',
        '.mission-objective__cta',
        // Speakers section
        '.speakers__title',
        '.speakers__card',
        // Phases section
        '.phases__title',
        '.phases__intro',
        '.phases__item',
        // Team Starvision section
        '.team-starvision__logo',
        // Services section
        '.services__title',
        '.services__intro',
        '.services__item',
        '.services__cta',
        // Incluso section
        '.incluso__title',
        '.incluso__card',
        '.incluso__cta',
        // Contact Form section
        '.contact-form__header',
        '.contact-form__row',
        // Social section
        '.social__title',
        '.social__link'
    ];

    // Adicionar classe scroll-reveal a todos os elementos
    revealSelectors.forEach(function (selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(function (el) {
            el.classList.add('scroll-reveal');
        });
    });

    // Intersection Observer para detectar elementos na viewport
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px 0px -50px 0px', // dispara um pouco antes de entrar totalmente
        threshold: 0.1 // 10% do elemento visível
    };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Parar de observar após revelar (performance)
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todos os elementos com scroll-reveal
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ========================================
    // GOLDEN PARTICLE SYSTEM
    // ========================================
    initParticleSystem();
});

/**
 * Golden Particle System for Hero Logo
 * Creates subtle, elegant floating golden glitter particles
 */
function initParticleSystem() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 50; // Number of particles

    // Set canvas size
    function resizeCanvas() {
        const heroMain = document.querySelector('.hero__main');
        if (heroMain) {
            canvas.width = Math.min(600, window.innerWidth - 40);
            canvas.height = 500;
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            // Position within canvas bounds
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            // Golden color palette with variations
            const goldColors = [
                { r: 255, g: 215, b: 0 },   // Gold
                { r: 255, g: 223, b: 0 },   // Golden yellow
                { r: 255, g: 193, b: 7 },   // Amber
                { r: 218, g: 165, b: 32 },  // Goldenrod
                { r: 255, g: 200, b: 50 },  // Light gold
                { r: 212, g: 175, b: 55 }   // Metallic gold
            ];
            this.color = goldColors[Math.floor(Math.random() * goldColors.length)];

            // Size - mostly small particles with occasional larger ones
            this.size = Math.random() * 2.5 + 0.5;
            if (Math.random() < 0.1) {
                this.size = Math.random() * 3.5 + 2; // 10% larger particles
            }

            // Slow, subtle movement
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3 - 0.1; // Slight upward bias

            // Opacity and twinkle effect
            this.opacity = Math.random() * 0.6 + 0.2;
            this.maxOpacity = this.opacity;
            this.twinkleSpeed = Math.random() * 0.02 + 0.005;
            this.twinklePhase = Math.random() * Math.PI * 2;

            // Glow intensity
            this.glowIntensity = Math.random() * 10 + 5;

            // Life cycle for fade in
            this.life = 0;
            this.fadeInDuration = 60 + Math.random() * 120; // Frames to fade in
        }

        update() {
            // Move particle
            this.x += this.speedX;
            this.y += this.speedY;

            // Twinkle effect
            this.twinklePhase += this.twinkleSpeed;
            const twinkle = (Math.sin(this.twinklePhase) + 1) / 2;
            this.opacity = this.maxOpacity * (0.4 + twinkle * 0.6);

            // Fade in effect
            this.life++;
            if (this.life < this.fadeInDuration) {
                this.opacity *= (this.life / this.fadeInDuration);
            }

            // Reset if out of bounds or fully faded
            if (this.x < -10 || this.x > canvas.width + 10 ||
                this.y < -10 || this.y > canvas.height + 10) {
                this.reset();
                this.life = 0;
            }
        }

        draw(ctx) {
            if (this.opacity <= 0) return;

            ctx.save();

            // Glow effect
            ctx.shadowBlur = this.glowIntensity;
            ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;

            // Draw particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
            ctx.fill();

            // Extra bright center for glitter effect
            if (this.size > 2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`;
                ctx.fill();
            }

            ctx.restore();
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = new Particle();
        // Stagger initial appearance
        particle.life = -Math.random() * 60;
        particles.push(particle);
    }

    // Animation loop
    let animationId;

    function animate() {
        // Clear with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        animationId = requestAnimationFrame(animate);
    }

    // Start animation with slight delay for page load
    setTimeout(() => {
        animate();
    }, 300);

    // Pause animation when not visible (performance)
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Show static particles without animation
        particles.forEach(p => {
            p.opacity = p.maxOpacity * 0.5;
            p.life = p.fadeInDuration;
        });
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.draw(ctx));
    }
}
