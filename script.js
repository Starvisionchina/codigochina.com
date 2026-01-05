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
    const nav = document.querySelector('.header__nav');
    const navLinks = document.querySelectorAll('.header__link');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileToggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
