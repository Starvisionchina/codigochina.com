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
});
