// ========================================
// Daily Analytics Report - Missão Código China
// Envia relatório diário de desempenho via EmailJS
// ========================================

(function () {
    'use strict';

    // Configuração do EmailJS (usa as mesmas credenciais do forms.js)
    const EMAILJS_PUBLIC_KEY = 'fdD4iq2sUwr6-hswz';
    const EMAILJS_SERVICE_ID = 'service_48xwn5h';
    const EMAILJS_REPORT_TEMPLATE_ID = 'template_kz737qk'; // Usa o template existente

    // Emails de destino para os relatórios
    const REPORT_EMAILS = [
        'marketing@e-starvision.com',
        'contato@e-starvision.com'
    ];

    // Chaves do localStorage para persistência
    const STORAGE_KEYS = {
        dailyStats: 'codigochina_daily_stats',
        lastReportSent: 'codigochina_last_report',
        whatsappClicks: 'codigochina_whatsapp_clicks',
        pageViews: 'codigochina_page_views',
        ctaClicks: 'codigochina_cta_clicks',
        formSubmits: 'codigochina_form_submits',
        scrollDepth: 'codigochina_scroll_depth',
        videoPlays: 'codigochina_video_plays'
    };

    // Inicializar estatísticas do dia
    function initDailyStats() {
        const today = new Date().toISOString().split('T')[0];
        let stats = JSON.parse(localStorage.getItem(STORAGE_KEYS.dailyStats) || '{}');

        if (stats.date !== today) {
            // Novo dia - resetar estatísticas
            stats = {
                date: today,
                pageViews: 0,
                uniqueVisitors: 0,
                whatsappClicks: [],
                ctaClicks: [],
                formStarts: 0,
                formSubmits: 0,
                videoPlays: 0,
                videoCompletes: 0,
                maxScrollDepth: 0,
                avgTimeOnPage: 0,
                totalTimeOnPage: 0,
                sessions: 0,
                deviceTypes: { mobile: 0, desktop: 0, tablet: 0 },
                referrers: {},
                hourlyViews: {}
            };
        }

        return stats;
    }

    // Salvar estatísticas
    function saveStats(stats) {
        localStorage.setItem(STORAGE_KEYS.dailyStats, JSON.stringify(stats));
    }

    // Detectar tipo de dispositivo
    function getDeviceType() {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
        if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
        return 'desktop';
    }

    // Registrar visualização de página
    function trackPageView() {
        const stats = initDailyStats();
        stats.pageViews++;
        stats.sessions++;

        // Tipo de dispositivo
        const device = getDeviceType();
        stats.deviceTypes[device]++;

        // Hora do acesso
        const hour = new Date().getHours();
        stats.hourlyViews[hour] = (stats.hourlyViews[hour] || 0) + 1;

        // Referrer
        const referrer = document.referrer || 'direct';
        const referrerDomain = referrer === 'direct' ? 'direct' : new URL(referrer).hostname;
        stats.referrers[referrerDomain] = (stats.referrers[referrerDomain] || 0) + 1;

        saveStats(stats);
        console.log('📊 Page view tracked for daily report');
    }

    // Registrar clique no WhatsApp
    function trackWhatsAppClick(location) {
        const stats = initDailyStats();
        stats.whatsappClicks.push({
            location: location,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
        saveStats(stats);
        console.log('📱 WhatsApp click tracked for report:', location);
    }

    // Registrar clique em CTA
    function trackCTAClick(ctaText, section) {
        const stats = initDailyStats();
        stats.ctaClicks.push({
            text: ctaText,
            section: section,
            timestamp: new Date().toISOString()
        });
        saveStats(stats);
    }

    // Registrar início de formulário
    function trackFormStart() {
        const stats = initDailyStats();
        stats.formStarts++;
        saveStats(stats);
    }

    // Registrar envio de formulário
    function trackFormSubmit() {
        const stats = initDailyStats();
        stats.formSubmits++;
        saveStats(stats);
        console.log('✅ Form submit tracked for report');
    }

    // Registrar play de vídeo
    function trackVideoPlay() {
        const stats = initDailyStats();
        stats.videoPlays++;
        saveStats(stats);
    }

    // Registrar vídeo completo
    function trackVideoComplete() {
        const stats = initDailyStats();
        stats.videoCompletes++;
        saveStats(stats);
    }

    // Registrar scroll depth
    function trackScrollDepth(percentage) {
        const stats = initDailyStats();
        if (percentage > stats.maxScrollDepth) {
            stats.maxScrollDepth = percentage;
        }
        saveStats(stats);
    }

    // Registrar tempo na página
    function trackTimeOnPage(seconds) {
        const stats = initDailyStats();
        stats.totalTimeOnPage += seconds;
        stats.avgTimeOnPage = Math.round(stats.totalTimeOnPage / stats.sessions);
        saveStats(stats);
    }

    // Gerar HTML do relatório
    function generateReportHTML(stats) {
        const whatsappClicksDetail = stats.whatsappClicks.map(click =>
            `• ${click.location} - ${new Date(click.timestamp).toLocaleTimeString('pt-BR')}`
        ).join('\n') || 'Nenhum clique registrado';

        const ctaClicksDetail = stats.ctaClicks.map(click =>
            `• ${click.text} (${click.section}) - ${new Date(click.timestamp).toLocaleTimeString('pt-BR')}`
        ).join('\n') || 'Nenhum clique registrado';

        const topReferrers = Object.entries(stats.referrers)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([domain, count]) => `• ${domain}: ${count}`)
            .join('\n') || 'Nenhum referrer';

        const peakHours = Object.entries(stats.hourlyViews)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([hour, count]) => `• ${hour}h: ${count} visitas`)
            .join('\n') || 'Sem dados';

        return `
📊 RELATÓRIO DIÁRIO - CÓDIGO CHINA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Data: ${stats.date}
🌐 Site: codigochina.com

═══════════════════════════════════
📈 MÉTRICAS GERAIS
═══════════════════════════════════
👁️ Visualizações: ${stats.pageViews}
🔄 Sessões: ${stats.sessions}
⏱️ Tempo médio: ${formatTime(stats.avgTimeOnPage)}
📜 Max Scroll: ${stats.maxScrollDepth}%

═══════════════════════════════════
📱 CLIQUES NO WHATSAPP (${stats.whatsappClicks.length})
═══════════════════════════════════
${whatsappClicksDetail}

═══════════════════════════════════
🎯 CLIQUES EM CTAs (${stats.ctaClicks.length})
═══════════════════════════════════
${ctaClicksDetail}

═══════════════════════════════════
📝 FORMULÁRIOS
═══════════════════════════════════
📋 Iniciados: ${stats.formStarts}
✅ Enviados: ${stats.formSubmits}
📊 Taxa de conversão: ${stats.formStarts > 0 ? Math.round((stats.formSubmits / stats.formStarts) * 100) : 0}%

═══════════════════════════════════
🎬 VÍDEOS
═══════════════════════════════════
▶️ Plays: ${stats.videoPlays}
🏁 Completos: ${stats.videoCompletes}

═══════════════════════════════════
📱 DISPOSITIVOS
═══════════════════════════════════
📱 Mobile: ${stats.deviceTypes.mobile}
💻 Desktop: ${stats.deviceTypes.desktop}
📲 Tablet: ${stats.deviceTypes.tablet}

═══════════════════════════════════
🔗 TOP REFERRERS
═══════════════════════════════════
${topReferrers}

═══════════════════════════════════
⏰ HORÁRIOS DE PICO
═══════════════════════════════════
${peakHours}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Missão Código China 2026
📧 Relatório automático gerado em ${new Date().toLocaleString('pt-BR')}
        `.trim();
    }

    // Formatar tempo
    function formatTime(seconds) {
        if (!seconds || seconds < 60) return `${seconds || 0}s`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    }

    // Enviar relatório via EmailJS
    async function sendDailyReport() {
        const stats = initDailyStats();

        // Verificar se já enviou hoje
        const lastSent = localStorage.getItem(STORAGE_KEYS.lastReportSent);
        const today = new Date().toISOString().split('T')[0];

        if (lastSent === today) {
            console.log('📧 Relatório já enviado hoje');
            return false;
        }

        // Gerar relatório
        const reportContent = generateReportHTML(stats);

        try {
            // Verificar se EmailJS está disponível
            if (typeof emailjs === 'undefined') {
                console.warn('⚠️ EmailJS não disponível');
                return false;
            }

            // Enviar para cada email da lista
            const sendPromises = REPORT_EMAILS.map(email => {
                // Parâmetros adaptados para o template existente (template_kz737qk)
                const templateParams = {
                    // Campos do template existente
                    nome: `📊 RELATÓRIO DIÁRIO - ${stats.date}`,
                    telefone: `WhatsApp Clicks: ${stats.whatsappClicks.length} | Forms: ${stats.formSubmits}`,
                    phone: `Views: ${stats.pageViews} | Sessions: ${stats.sessions}`,
                    whatsapp: `Mobile: ${stats.deviceTypes.mobile} | Desktop: ${stats.deviceTypes.desktop}`,
                    email: email,
                    from_name: 'Sistema de Relatórios - Código China',
                    // Campos adicionais (podem ser ignorados se não existirem no template)
                    message: reportContent,
                    to_email: email,
                    reply_to: 'noreply@codigochina.com'
                };

                return emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_REPORT_TEMPLATE_ID,
                    templateParams
                );
            });

            // Enviar para todos os emails
            await Promise.all(sendPromises);

            // Marcar como enviado
            localStorage.setItem(STORAGE_KEYS.lastReportSent, today);
            console.log(`✅ Relatório diário enviado para ${REPORT_EMAILS.length} emails!`);

            return true;
        } catch (error) {
            console.error('❌ Erro ao enviar relatório:', error);
            return false;
        }
    }

    // Verificar se é hora de enviar relatório (às 23:55 ou ao abrir no dia seguinte)
    function checkReportTime() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();

        // Enviar às 23:55 ou se for um novo dia e ainda não enviou
        if ((hour === 23 && minute >= 55) || (hour === 0 && minute < 10)) {
            const lastSent = localStorage.getItem(STORAGE_KEYS.lastReportSent);
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

            if (lastSent !== yesterday && lastSent !== now.toISOString().split('T')[0]) {
                sendDailyReport();
            }
        }
    }

    // Integrar com o tracking existente
    function setupReportTracking() {
        // Registrar visualização inicial
        trackPageView();

        // Interceptar eventos do tracking principal
        const originalGtag = window.gtag;
        if (typeof originalGtag === 'function') {
            window.gtag = function (...args) {
                // Chamar original
                originalGtag.apply(this, args);

                // Capturar eventos para o relatório
                if (args[0] === 'event') {
                    const eventName = args[1];
                    const eventParams = args[2] || {};

                    switch (eventName) {
                        case 'whatsapp_click':
                            trackWhatsAppClick(eventParams.event_label || 'WhatsApp');
                            break;
                        case 'cta_click':
                            trackCTAClick(eventParams.cta_text || 'CTA', eventParams.cta_location || 'Unknown');
                            break;
                        case 'form_start':
                            trackFormStart();
                            break;
                        case 'generate_lead':
                            trackFormSubmit();
                            break;
                        case 'video_start':
                            trackVideoPlay();
                            break;
                        case 'video_complete':
                            trackVideoComplete();
                            break;
                        case 'scroll_depth':
                            trackScrollDepth(eventParams.scroll_percentage || 0);
                            break;
                        case 'time_on_page':
                            trackTimeOnPage(eventParams.time_seconds || 0);
                            break;
                    }
                }
            };
        }

        // Verificar envio de relatório a cada minuto
        setInterval(checkReportTime, 60000);

        // Verificar agora também
        setTimeout(checkReportTime, 5000);

        console.log('📊 Daily report tracking configurado');
    }

    // Inicializar quando DOM estiver pronto
    document.addEventListener('DOMContentLoaded', function () {
        // Aguardar EmailJS carregar
        setTimeout(setupReportTracking, 1000);
    });

    // Enviar relatório quando usuário sair da página (backup)
    window.addEventListener('beforeunload', function () {
        // Salvar tempo na página
        const stats = initDailyStats();
        if (stats.sessions > 0) {
            saveStats(stats);
        }
    });

    // Expor funções para uso manual
    window.DailyReport = {
        sendNow: sendDailyReport,
        getStats: initDailyStats,
        generateReport: generateReportHTML,
        track: {
            whatsapp: trackWhatsAppClick,
            cta: trackCTAClick,
            formStart: trackFormStart,
            formSubmit: trackFormSubmit,
            video: trackVideoPlay,
            scroll: trackScrollDepth
        }
    };

})();
