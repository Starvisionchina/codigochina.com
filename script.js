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
});
