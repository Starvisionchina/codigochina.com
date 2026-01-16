// ========================================
// WhatsApp Click Tracking - Google Analytics 4
// Rastreia cliques em botões de WhatsApp
// ========================================

(function () {
    'use strict';

    // Variável para armazenar ID do GA4 (será configurado posteriormente)
    const GA4_MEASUREMENT_ID = window.GA4_ID || 'G-5K3EEPRM60';

    // Inicializar Google Analytics 4
    function initGA4() {
        // Criar script do gtag.js
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Configurar gtag
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', GA4_MEASUREMENT_ID, {
            send_page_view: true
        });

        console.log('✅ GA4 inicializado:', GA4_MEASUREMENT_ID);
    }

    // Rastrear clique no WhatsApp
    function trackWhatsAppClick(location, url) {
        if (typeof gtag === 'function') {
            gtag('event', 'whatsapp_click', {
                'event_category': 'Contact',
                'event_label': location,
                'whatsapp_url': url,
                'page_location': window.location.href,
                'page_title': document.title,
                'timestamp': new Date().toISOString()
            });
            console.log('📱 WhatsApp click tracked:', location);
        }
    }

    // Identificar localização do botão
    function getButtonLocation(element) {
        // Verificar classes e IDs conhecidos
        if (element.closest('.about__cta')) return 'Botão SAIBA MAIS (About Section)';
        if (element.closest('.social__link')) return 'Ícone WhatsApp (Redes Sociais)';
        if (element.closest('.social-icon.whatsapp')) return 'Ícone WhatsApp (Card Social)';
        if (element.closest('.share')) return 'Botão Compartilhar';
        if (element.classList.contains('whatsapp-float')) return 'Botão Flutuante WhatsApp';
        if (element.closest('#whatsappFloatBtn')) return 'Widget Chat WhatsApp';
        if (element.closest('.whatsapp-float-btn')) return 'Widget Chat WhatsApp';

        // Fallback baseado na URL
        const href = element.getAttribute('href') || '';
        if (href.includes('send?text=')) return 'Compartilhar via WhatsApp';

        return 'WhatsApp Link';
    }

    // Configurar listeners para todos os botões de WhatsApp
    function setupWhatsAppTracking() {
        // Links diretos para wa.me ou api.whatsapp.com
        document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
            link.addEventListener('click', function (e) {
                const location = getButtonLocation(this);
                trackWhatsAppClick(location, this.href);
            });
        });

        // Botão flutuante do widget de chat
        const whatsappBtn = document.getElementById('whatsappFloatBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function () {
                trackWhatsAppClick('Widget Chat WhatsApp (Aberto)', 'Chat Widget');
            });
        }

        console.log('✅ WhatsApp tracking configurado');
    }

    // Inicializar quando DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function () {
        // Verificar se GA4 ID foi configurado
        if (GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
            console.warn('⚠️ GA4 ID não configurado. Defina window.GA4_ID antes de carregar este script.');
            console.warn('⚠️ O tracking será ativado apenas após configurar o ID.');
        } else {
            initGA4();
        }

        // Configurar tracking (funciona mesmo sem GA4 para debug)
        setupWhatsAppTracking();
    });

    // Expor função para uso manual
    window.WhatsAppTracking = {
        track: trackWhatsAppClick,
        setGA4Id: function (id) {
            window.GA4_ID = id;
            initGA4();
        }
    };

})();
