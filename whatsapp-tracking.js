// ========================================
// Google Analytics 4 - Tracking Completo
// Rastreia WhatsApp, CTAs, Formulários, Scroll e Engajamento
// Missão Código China 2026 - Starvision
// ========================================

(function () {
    'use strict';

    // Variável para armazenar ID do GA4
    const GA4_MEASUREMENT_ID = window.GA4_ID || 'G-5K3EEPRM60';

    // Keywords do site para dimensões personalizadas
    const SITE_KEYWORDS = [
        'missão código china', 'missao codigo china', 'Missão Código China 2026',
        'Canton Fair', 'missão Canton Fair', 'viagem Canton Fair 2026',
        'Starvision', 'Starvision China', 'Starvisionchina',
        'Rodrigo Lima', 'Lima na china', 'limanachina', 'Chinalink',
        'import melhor', 'vettros importação', 'ntl comex', 'ces2026',
        'pablo marçal', 'metodo12p', 'gustavoimportação', 'gustavooliveiraimportação',
        'yuanunpackschina', 'antonio fogaça', 'brasil importação china',
        'China', 'Importação', 'Exportação', 'Negócios',
        'Hong Kong', 'Shenzhen', 'Guangzhou',
        'missão para Canton Fair', 'viagem empresarial China',
        'missão de negócios China', 'feira Canton',
        'fornecedores China', 'qualificação de fornecedores China',
        'inspeção China', 'importação segura China',
        'código china', 'codigochina', 'codigo china'
    ];

    // Configurações do site
    const SITE_CONFIG = {
        siteName: 'Código China',
        siteUrl: 'https://codigochina.com',
        campaignName: 'Missão Código China 2026',
        contentGroup: 'Canton Fair 2026',
        pageCategory: 'Viagem de Negócios China',
        eventDate: '2026-04-10',
        organizer: 'Starvision',
        locations: ['Hong Kong', 'Shenzhen', 'Guangzhou']
    };

    // Inicializar Google Analytics 4 com configuração avançada
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

        // Configuração avançada com dimensões personalizadas
        gtag('config', GA4_MEASUREMENT_ID, {
            send_page_view: true,
            // Dimensões personalizadas para SEO e alcance
            content_group: SITE_CONFIG.contentGroup,
            page_category: SITE_CONFIG.pageCategory,
            campaign_name: SITE_CONFIG.campaignName,
            campaign_source: 'organic',
            campaign_medium: 'website',
            // Informações do evento
            custom_map: {
                'dimension1': 'site_keywords',
                'dimension2': 'event_date',
                'dimension3': 'organizer',
                'dimension4': 'content_type',
                'dimension5': 'user_engagement_level'
            },
            // Keywords principais para indexação
            site_keywords: SITE_KEYWORDS.slice(0, 10).join(', '),
            event_date: SITE_CONFIG.eventDate,
            organizer: SITE_CONFIG.organizer,
            page_title: document.title,
            page_location: window.location.href,
            // Enhanced measurement
            allow_google_signals: true,
            allow_ad_personalization_signals: true
        });

        // Enviar evento de página com informações ricas
        gtag('event', 'page_view_enhanced', {
            page_title: document.title,
            page_location: window.location.href,
            content_group: SITE_CONFIG.contentGroup,
            content_type: 'landing_page',
            keywords: SITE_KEYWORDS.join(', '),
            event_category: 'Canton Fair 2026',
            event_label: 'Missão Código China'
        });

        console.log('✅ GA4 inicializado com tracking avançado:', GA4_MEASUREMENT_ID);
    }

    // ========================================
    // RASTREAMENTO DE SCROLL
    // ========================================
    function setupScrollTracking() {
        const scrollThresholds = [25, 50, 75, 90, 100];
        const trackedThresholds = new Set();

        window.addEventListener('scroll', function () {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );

            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    if (typeof gtag === 'function') {
                        gtag('event', 'scroll_depth', {
                            event_category: 'Engagement',
                            event_label: `${threshold}%`,
                            scroll_percentage: threshold,
                            page_location: window.location.href,
                            content_group: SITE_CONFIG.contentGroup
                        });
                        console.log(`📜 Scroll ${threshold}% tracked`);
                    }
                }
            });
        });
    }

    // ========================================
    // RASTREAMENTO DE TEMPO NA PÁGINA
    // ========================================
    function setupTimeOnPageTracking() {
        const timeThresholds = [30, 60, 120, 180, 300]; // segundos
        let startTime = Date.now();
        let trackedTimes = new Set();

        setInterval(() => {
            const timeSpent = Math.floor((Date.now() - startTime) / 1000);

            timeThresholds.forEach(threshold => {
                if (timeSpent >= threshold && !trackedTimes.has(threshold)) {
                    trackedTimes.add(threshold);
                    if (typeof gtag === 'function') {
                        gtag('event', 'time_on_page', {
                            event_category: 'Engagement',
                            event_label: `${threshold}s`,
                            time_seconds: threshold,
                            engagement_level: threshold >= 180 ? 'high' : threshold >= 60 ? 'medium' : 'low',
                            content_group: SITE_CONFIG.contentGroup
                        });
                        console.log(`⏱️ Time on page ${threshold}s tracked`);
                    }
                }
            });
        }, 5000);
    }

    // ========================================
    // RASTREAMENTO DE CLIQUES EM CTAs
    // ========================================
    function setupCTATracking() {
        // Botões de CTA principais
        document.querySelectorAll('.cta-yellow-blink, .about__cta, .services__cta, .mission-objective__cta, [class*="cta"]').forEach(cta => {
            cta.addEventListener('click', function () {
                if (typeof gtag === 'function') {
                    gtag('event', 'cta_click', {
                        event_category: 'Conversion',
                        event_label: this.textContent.trim().substring(0, 50),
                        cta_text: this.textContent.trim(),
                        cta_location: getSectionName(this),
                        page_location: window.location.href,
                        content_group: SITE_CONFIG.contentGroup
                    });
                    console.log('🎯 CTA click tracked:', this.textContent.trim());
                }
            });
        });

        // Links do menu
        document.querySelectorAll('.header__link').forEach(link => {
            link.addEventListener('click', function () {
                if (typeof gtag === 'function') {
                    gtag('event', 'navigation_click', {
                        event_category: 'Navigation',
                        event_label: this.textContent.trim(),
                        link_url: this.href,
                        content_group: SITE_CONFIG.contentGroup
                    });
                }
            });
        });
    }

    // ========================================
    // RASTREAMENTO DE FORMULÁRIO
    // ========================================
    function setupFormTracking() {
        const form = document.getElementById('starvisionForm');
        if (form) {
            // Início de preenchimento
            let formStarted = false;
            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.addEventListener('focus', function () {
                    if (!formStarted) {
                        formStarted = true;
                        if (typeof gtag === 'function') {
                            gtag('event', 'form_start', {
                                event_category: 'Form',
                                event_label: 'Formulário de Contato',
                                form_name: 'starvisionForm',
                                content_group: SITE_CONFIG.contentGroup
                            });
                            console.log('📝 Form start tracked');
                        }
                    }
                });
            });

            // Envio do formulário
            form.addEventListener('submit', function () {
                if (typeof gtag === 'function') {
                    gtag('event', 'generate_lead', {
                        event_category: 'Conversion',
                        event_label: 'Formulário Enviado',
                        form_name: 'starvisionForm',
                        currency: 'BRL',
                        value: 1,
                        content_group: SITE_CONFIG.contentGroup,
                        campaign_name: SITE_CONFIG.campaignName
                    });
                    console.log('✅ Form submit tracked as lead');
                }
            });
        }
    }

    // ========================================
    // RASTREAMENTO DE VÍDEO
    // ========================================
    function setupVideoTracking() {
        const videos = document.querySelectorAll('video');
        videos.forEach((video, index) => {
            video.addEventListener('play', function () {
                if (typeof gtag === 'function') {
                    gtag('event', 'video_start', {
                        event_category: 'Video',
                        event_label: 'Video Jornada China',
                        video_title: 'Apresentação Missão China',
                        video_provider: 'self-hosted',
                        content_group: SITE_CONFIG.contentGroup
                    });
                    console.log('▶️ Video play tracked');
                }
            });

            video.addEventListener('ended', function () {
                if (typeof gtag === 'function') {
                    gtag('event', 'video_complete', {
                        event_category: 'Video',
                        event_label: 'Video Jornada China - Completo',
                        video_title: 'Apresentação Missão China',
                        content_group: SITE_CONFIG.contentGroup
                    });
                    console.log('🏁 Video complete tracked');
                }
            });
        });
    }

    // ========================================
    // RASTREAMENTO DE SEÇÕES VISUALIZADAS
    // ========================================
    function setupSectionViewTracking() {
        const sections = [
            { id: 'inscricao', name: 'Formulário de Inscrição' },
            { id: 'mission-objective', name: 'Objetivo da Missão' },
            { id: 'phases', name: 'Fases da Canton Fair' },
            { id: 'services', name: 'Pacote Missão' }
        ];

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionInfo = sections.find(s => s.id === entry.target.id);
                    if (sectionInfo && typeof gtag === 'function') {
                        gtag('event', 'section_view', {
                            event_category: 'Engagement',
                            event_label: sectionInfo.name,
                            section_id: sectionInfo.id,
                            content_group: SITE_CONFIG.contentGroup
                        });
                        console.log('👁️ Section view tracked:', sectionInfo.name);
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });
    }

    // ========================================
    // RASTREAMENTO DE SPEAKERS
    // ========================================
    function setupSpeakerTracking() {
        document.querySelectorAll('.speakers__card-toggle').forEach(btn => {
            btn.addEventListener('click', function () {
                const card = this.closest('.speakers__card');
                const speakerName = card?.querySelector('.speakers__card-name')?.textContent || 'Unknown';
                if (typeof gtag === 'function') {
                    gtag('event', 'speaker_bio_view', {
                        event_category: 'Engagement',
                        event_label: speakerName,
                        speaker_name: speakerName,
                        content_group: SITE_CONFIG.contentGroup
                    });
                    console.log('👤 Speaker bio view tracked:', speakerName);
                }
            });
        });
    }

    // Função auxiliar para identificar seção
    function getSectionName(element) {
        const section = element.closest('section');
        if (!section) return 'Unknown';
        if (section.classList.contains('hero')) return 'Hero';
        if (section.classList.contains('about')) return 'About';
        if (section.classList.contains('jornada')) return 'Jornada';
        if (section.classList.contains('mission-objective')) return 'Mission Objective';
        if (section.classList.contains('speakers')) return 'Speakers';
        if (section.classList.contains('phases')) return 'Phases';
        if (section.classList.contains('services')) return 'Services';
        if (section.classList.contains('incluso')) return 'Incluso';
        if (section.classList.contains('contact-form')) return 'Contact Form';
        return section.id || 'Section';
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

        // Configurar todos os trackings
        setupWhatsAppTracking();
        setupScrollTracking();
        setupTimeOnPageTracking();
        setupCTATracking();
        setupFormTracking();
        setupVideoTracking();
        setupSectionViewTracking();
        setupSpeakerTracking();

        console.log('🚀 Tracking completo configurado - Missão Código China 2026');
    });

    // Expor funções para uso manual
    window.CodigoChina = {
        trackWhatsApp: trackWhatsAppClick,
        setGA4Id: function (id) {
            window.GA4_ID = id;
            initGA4();
        },
        keywords: SITE_KEYWORDS,
        config: SITE_CONFIG
    };

})();

