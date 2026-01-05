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
});
