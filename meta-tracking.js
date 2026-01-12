// ========================================
// Meta Conversions API - Client-side Tracking
// Eventos: ViewContent, Contact
// ========================================

(function () {
    'use strict';

    // Endpoint da função Netlify
    const META_API_ENDPOINT = '/api/meta-events';

    // Extrair parâmetros do Meta (fbclid) da URL
    function getMetaParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const fbclid = urlParams.get('fbclid');

        // Construir fbc a partir do fbclid
        let fbc = null;
        if (fbclid) {
            const timestamp = Math.floor(Date.now() / 1000);
            fbc = `fb.1.${timestamp}.${fbclid}`;
            // Salvar no cookie para uso posterior
            document.cookie = `_fbc=${fbc}; max-age=7776000; path=/; SameSite=Lax`;
        } else {
            // Tentar recuperar do cookie
            const fbcCookie = document.cookie.match(/_fbc=([^;]+)/);
            if (fbcCookie) {
                fbc = fbcCookie[1];
            }
        }

        // Pegar fbp do cookie (gerado pelo Pixel do Meta se existir)
        const fbpCookie = document.cookie.match(/_fbp=([^;]+)/);
        const fbp = fbpCookie ? fbpCookie[1] : null;

        return { fbc, fbp };
    }

    // Enviar evento para a API
    async function sendMetaEvent(eventName, userData = {}, customData = {}) {
        try {
            const { fbc, fbp } = getMetaParams();

            const payload = {
                event_name: eventName,
                event_source_url: window.location.href,
                user_data: userData,
                custom_data: customData,
                fbc: fbc,
                fbp: fbp
            };

            const response = await fetch(META_API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                console.log(`✅ Meta Event '${eventName}' sent successfully`);
            } else {
                console.warn(`⚠️ Meta Event '${eventName}' failed:`, await response.text());
            }
        } catch (error) {
            console.error(`❌ Meta Event '${eventName}' error:`, error);
        }
    }

    // Evento ViewContent - dispara no carregamento da página
    function trackViewContent() {
        sendMetaEvent('ViewContent', {}, {
            content_name: document.title,
            content_category: 'Landing Page'
        });
    }

    // Evento Contact - dispara ao clicar em links de contato
    function trackContact(contactType, contactValue) {
        sendMetaEvent('Contact', {}, {
            content_name: contactType,
            content_category: contactValue
        });
    }

    // Configurar listeners para cliques em contato
    function setupContactTracking() {
        // Links de WhatsApp
        document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
            link.addEventListener('click', function (e) {
                trackContact('WhatsApp', this.href);
            });
        });

        // Links de Email
        document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
            link.addEventListener('click', function (e) {
                trackContact('Email', this.href.replace('mailto:', ''));
            });
        });

        // Links de Telefone
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
            link.addEventListener('click', function (e) {
                trackContact('Phone', this.href.replace('tel:', ''));
            });
        });

        // Botão flutuante do WhatsApp
        const whatsappBtn = document.getElementById('whatsappFloatBtn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function () {
                trackContact('WhatsApp Widget', 'Chat Opened');
            });
        }
    }

    // Inicializar quando DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function () {
        // Tracking de ViewContent com pequeno delay para garantir carregamento
        setTimeout(trackViewContent, 500);

        // Setup Contact Tracking
        setupContactTracking();
    });

    // Expor função globalmente para uso em outros scripts (ex: forms.js)
    window.MetaTracking = {
        sendEvent: sendMetaEvent,
        trackLead: function (userData) {
            sendMetaEvent('Lead', userData, {
                content_name: 'Formulário Missão China',
                content_category: 'Lead Generation'
            });
        },
        trackPurchase: function (userData, value, currency = 'BRL') {
            sendMetaEvent('Purchase', userData, {
                currency: currency,
                value: value
            });
        }
    };

})();
