/**
 * WhatsApp Chat Widget - Starvision
 * Assistente Virtual "Estela" - Agente de IA Humanizada
 * Conversa sobre Canton Fair e Starvision China
 */

(function () {
    'use strict';

    // Configurações
    const CONFIG = {
        whatsappNumber: '555131031030',
        botName: 'Estela',
        typingDelay: 1500,
        messageDelay: 800,
        maxInteractionsBeforeWhatsApp: 4
    };

    // Base de Conhecimento
    const KNOWLEDGE_BASE = {
        cantonFair: {
            sobre: "A Canton Fair é a maior e mais completa feira multissetorial do planeta! 🌏 Sediada em Guangzhou, na China, acontece duas vezes por ano e reúne mais de 60 mil estandes e 280 mil compradores internacionais.",
            datas: "A próxima edição será em Abril de 2026! 📅\n\n• Fase 1: 15-19 de Abril (Eletrônicos, máquinas, tecnologia)\n• Fase 2: 23-27 de Abril (Casa, decoração, mobiliário)\n• Fase 3: 1-4 de Maio (Moda, brinquedos, têxteis)",
            fases: "São 3 fases, cada uma com foco diferente:\n\n🔌 Fase 1: Eletrônicos, máquinas e tecnologia\n🏠 Fase 2: Casa, decoração e mobiliário\n👗 Fase 3: Moda, brinquedos e têxteis\n\nQual fase tem mais a ver com seu negócio?",
            local: "A feira acontece no Canton Fair Complex, em Guangzhou, China! É 20 vezes maior que a Expo São Paulo! 😮",
            tamanho: "A Canton Fair é GIGANTE! São mais de 60 mil estandes, mais de 3.500 produtos inéditos por edição e é 20 vezes maior que a Expo SP!"
        },
        starvision: {
            sobre: "A Starvision tem mais de 20 anos de experiência conectando empresários brasileiros ao mercado chinês! 🤝 Somos especialistas em importação, exportação e missões empresariais à China.",
            missao: "A Missão Código China é nossa imersão completa na Canton Fair! ✈️\n\nInclui: passagens aéreas, hospedagem premium, tradutores, visitas guiadas, workshops de preparação e muito mais!",
            pacote: "O pacote da Missão Código China inclui:\n\n✈️ Passagens aéreas internacionais\n🏨 Hospedagem premium com café da manhã\n🚄 Trem bala entre cidades\n🎫 Ingressos para a feira\n👨‍💼 Consultoria especializada\n🗣️ Tradutores profissionais\n📚 Workshops de preparação\n🎁 Kit exclusivo da missão",
            preco: "O investimento varia conforme o tipo de pacote e acomodação escolhidos. Posso te conectar com nosso time comercial para uma proposta personalizada! 💬",
            equipe: "Nossa missão é liderada por Rodrigo Lima Fernandes (CEO da Starvision, 20+ anos de experiência com China) e Antonio Fogaça (especialista em escalar negócios e exportação)! 👨‍💼"
        },
        servicos: {
            feira: "Durante a Canton Fair oferecemos:\n\n👉 Visita orientada por consultores\n👉 Tradutores profissionais\n👉 Análise de fornecedores\n👉 Consolidação diária das descobertas\n👉 Networking com outros empresários",
            importacao: "Além da missão, a Starvision oferece suporte completo de importação e exportação! Nossa equipe pode ajudar desde a primeira negociação até a chegada do produto no Brasil. 📦"
        }
    };

    // Padrões de intenção e respostas
    const INTENTIONS = [
        {
            patterns: ['oi', 'olá', 'ola', 'hey', 'eai', 'e ai', 'bom dia', 'boa tarde', 'boa noite', 'oie', 'oii'],
            response: () => {
                const greeting = getGreeting();
                return `${greeting}! 😊 Tudo bem com você?\n\nEu sou a Estela, assistente virtual da Starvision. Estou aqui para te ajudar com informações sobre a Missão Código China e a Canton Fair!\n\nComo posso te ajudar hoje?`;
            },
            isGreeting: true
        },
        {
            patterns: ['canton fair', 'cantonfair', 'feira', 'feira na china', 'maior feira'],
            response: () => KNOWLEDGE_BASE.cantonFair.sobre
        },
        {
            patterns: ['quando', 'data', 'datas', 'abril', 'maio', 'quando acontece', 'quando é', 'período'],
            response: () => KNOWLEDGE_BASE.cantonFair.datas
        },
        {
            patterns: ['fase', 'fases', 'setores', 'segmentos', 'categorias'],
            response: () => KNOWLEDGE_BASE.cantonFair.fases
        },
        {
            patterns: ['onde', 'local', 'localização', 'cidade', 'guangzhou', 'endereço'],
            response: () => KNOWLEDGE_BASE.cantonFair.local
        },
        {
            patterns: ['tamanho', 'grande', 'quantos', 'estandes', 'expositores'],
            response: () => KNOWLEDGE_BASE.cantonFair.tamanho
        },
        {
            patterns: ['starvision', 'empresa', 'vocês', 'vcs', 'quem são'],
            response: () => KNOWLEDGE_BASE.starvision.sobre
        },
        {
            patterns: ['missão', 'missao', 'código china', 'codigo china', 'pacote viagem', 'viagem china'],
            response: () => KNOWLEDGE_BASE.starvision.missao
        },
        {
            patterns: ['inclui', 'incluso', 'pacote', 'o que tem', 'benefícios', 'beneficios'],
            response: () => KNOWLEDGE_BASE.starvision.pacote
        },
        {
            patterns: ['preço', 'preco', 'valor', 'quanto', 'custa', 'investimento', 'custo'],
            response: () => KNOWLEDGE_BASE.starvision.preco
        },
        {
            patterns: ['quem lidera', 'líder', 'lider', 'organizador', 'rodrigo', 'antonio', 'fogaça', 'equipe'],
            response: () => KNOWLEDGE_BASE.starvision.equipe
        },
        {
            patterns: ['serviço', 'servico', 'suporte', 'apoio', 'ajuda feira', 'durante a feira'],
            response: () => KNOWLEDGE_BASE.servicos.feira
        },
        {
            patterns: ['importar', 'importação', 'importacao', 'exportar', 'exportação', 'exportacao', 'comprar china', 'trazer produtos'],
            response: () => KNOWLEDGE_BASE.servicos.importacao
        },
        {
            patterns: ['sim', 'quero', 'tenho interesse', 'interessado', 'vamos', 'bora', 'pode ser', 'claro'],
            response: () => "Que ótimo! 🎉 Fico feliz com seu interesse!\n\nPara te dar um atendimento mais personalizado, vou te conectar com um dos nossos especialistas pelo WhatsApp. Eles podem tirar todas as suas dúvidas e montar uma proposta sob medida para você!",
            triggerWhatsApp: true
        },
        {
            patterns: ['obrigado', 'obrigada', 'valeu', 'vlw', 'thanks'],
            response: () => "Por nada! 😊 Foi um prazer ajudar!\n\nSe quiser continuar conversando com um especialista humano, posso te conectar pelo WhatsApp. Deseja?"
        },
        {
            patterns: ['tchau', 'adeus', 'até', 'ate', 'flw', 'falou'],
            response: () => "Até mais! 👋 Foi um prazer conversar com você.\n\nSe precisar de qualquer coisa, é só me chamar! Bons negócios! 🚀"
        }
    ];

    // Respostas padrão quando não entende
    const DEFAULT_RESPONSES = [
        "Hmm, não tenho certeza se entendi. 🤔\n\nPosso te ajudar com:\n• Informações sobre a Canton Fair\n• Detalhes da Missão Código China\n• Datas e fases da feira\n• O que está incluso no pacote\n\nSobre o que gostaria de saber?",
        "Desculpe, não consegui entender sua pergunta. 😅\n\nMinha especialidade é falar sobre a Canton Fair e a Missão Código China da Starvision. Quer saber mais sobre algum desses temas?",
        "Ops! Essa é uma pergunta que foge um pouco da minha área. 🙈\n\nMas posso te conectar com um especialista humano pelo WhatsApp que pode te ajudar melhor! Quer que eu faça isso?"
    ];

    // Estado do chat
    let chatState = {
        isOpen: false,
        userName: '',
        step: 0,
        interactionCount: 0,
        hasOfferedWhatsApp: false,
        conversationHistory: []
    };

    // Elementos DOM
    let elements = {};

    // Obter saudação baseada no horário
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Bom dia';
        if (hour >= 12 && hour < 18) return 'Boa tarde';
        return 'Boa noite';
    }

    // Inicialização
    function init() {
        elements = {
            widget: document.getElementById('whatsappChatWidget'),
            chatWindow: document.getElementById('chatWindow'),
            chatBody: document.getElementById('chatBody'),
            chatMessages: document.getElementById('chatMessages'),
            chatInput: document.getElementById('chatInput'),
            chatInputForm: document.getElementById('chatInputForm'),
            chatInputArea: document.getElementById('chatInputArea'),
            floatBtn: document.getElementById('whatsappFloatBtn'),
            closeBtn: document.getElementById('closeChatBtn'),
            sendBtn: document.getElementById('chatSendBtn')
        };

        if (!elements.widget) return;
        bindEvents();
    }

    // Vincular eventos
    function bindEvents() {
        elements.floatBtn.addEventListener('click', toggleChat);
        elements.closeBtn.addEventListener('click', closeChat);
        elements.chatInputForm.addEventListener('submit', handleSubmit);

        document.addEventListener('click', (e) => {
            if (chatState.isOpen && !elements.widget.contains(e.target)) {
                closeChat();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatState.isOpen) {
                closeChat();
            }
        });
    }

    // Toggle do chat
    function toggleChat() {
        chatState.isOpen ? closeChat() : openChat();
    }

    // Abrir chat
    function openChat() {
        chatState.isOpen = true;
        elements.chatWindow.classList.add('open');
        elements.floatBtn.querySelector('.whatsapp-float-btn__badge').style.display = 'none';

        if (chatState.step === 0) {
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    const greeting = getGreeting();
                    const welcomeMessage = `${greeting}! 😊 Bem-vindo à Starvision!\n\nEu sou a Estela, sua assistente virtual. Estou aqui para te ajudar com tudo sobre a Missão Código China e a Canton Fair!\n\nAntes de começarmos, qual é o seu nome?`;
                    addBotMessage(welcomeMessage);
                    chatState.step = 1;
                }, CONFIG.typingDelay);
            }, 500);
        }

        setTimeout(() => elements.chatInput.focus(), 300);
    }

    // Fechar chat
    function closeChat() {
        chatState.isOpen = false;
        elements.chatWindow.classList.remove('open');
    }

    // Lidar com envio de mensagem
    function handleSubmit(e) {
        e.preventDefault();
        const message = elements.chatInput.value.trim();
        if (!message) return;

        elements.chatInput.value = '';
        addUserMessage(message);
        processUserResponse(message);
    }

    // Detectar intenção da mensagem
    function detectIntention(message) {
        const normalizedMessage = message.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        for (const intention of INTENTIONS) {
            for (const pattern of intention.patterns) {
                if (normalizedMessage.includes(pattern)) {
                    return intention;
                }
            }
        }
        return null;
    }

    // Processar resposta do usuário
    function processUserResponse(message) {
        chatState.interactionCount++;
        chatState.conversationHistory.push({ role: 'user', message });

        switch (chatState.step) {
            case 1:
                // Usuário enviou o nome
                chatState.userName = message.split(' ')[0]; // Pega primeiro nome

                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        const response = `Prazer em conhecer você, ${chatState.userName}! 🤝\n\nEstou aqui para te ajudar com informações sobre:\n\n🇨🇳 A Canton Fair - maior feira do mundo\n✈️ A Missão Código China da Starvision\n📦 Serviços de importação e exportação\n\nSobre o que gostaria de saber?`;
                        addBotMessage(response);
                        chatState.step = 2;
                    }, CONFIG.typingDelay);
                }, CONFIG.messageDelay);
                break;

            case 2:
                // Conversa livre - processar intenção
                handleFreeConversation(message);
                break;
        }
    }

    // Lidar com conversa livre
    function handleFreeConversation(message) {
        const intention = detectIntention(message);

        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();

                let response;
                let shouldOfferWhatsApp = false;

                if (intention) {
                    response = intention.response();

                    if (intention.triggerWhatsApp) {
                        shouldOfferWhatsApp = true;
                    }
                } else {
                    // Resposta padrão
                    const randomIndex = Math.floor(Math.random() * DEFAULT_RESPONSES.length);
                    response = DEFAULT_RESPONSES[randomIndex];
                }

                // Personaliza resposta com o nome se conhecido
                if (chatState.userName && Math.random() > 0.7) {
                    response = `${chatState.userName}, ${response.charAt(0).toLowerCase()}${response.slice(1)}`;
                }

                addBotMessage(response);
                chatState.conversationHistory.push({ role: 'bot', message: response });

                // Verificar se deve oferecer WhatsApp
                if (shouldOfferWhatsApp ||
                    (chatState.interactionCount >= CONFIG.maxInteractionsBeforeWhatsApp && !chatState.hasOfferedWhatsApp)) {
                    setTimeout(() => {
                        offerWhatsAppConnection();
                    }, 1500);
                }

            }, CONFIG.typingDelay);
        }, CONFIG.messageDelay);
    }

    // Oferecer conexão via WhatsApp
    function offerWhatsAppConnection() {
        chatState.hasOfferedWhatsApp = true;

        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();

            const message = chatState.userName
                ? `${chatState.userName}, que tal continuar essa conversa com um dos nossos especialistas? 💬\n\nEles podem te dar informações mais detalhadas e montar uma proposta personalizada para você!`
                : `Que tal continuar essa conversa com um dos nossos especialistas? 💬\n\nEles podem te dar informações mais detalhadas e montar uma proposta personalizada!`;

            addBotMessage(message);

            setTimeout(() => {
                addWhatsAppButton();
            }, 500);
        }, CONFIG.typingDelay);
    }

    // Adicionar mensagem do bot
    function addBotMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message chat-message--bot';
        messageEl.innerHTML = `
            <p class="chat-message__text">${formatMessage(text)}</p>
            <p class="chat-message__time">${getCurrentTime()}</p>
        `;
        elements.chatMessages.appendChild(messageEl);
        scrollToBottom();
    }

    // Adicionar mensagem do usuário
    function addUserMessage(text) {
        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message chat-message--user';
        messageEl.innerHTML = `
            <p class="chat-message__text">${escapeHtml(text)}</p>
            <p class="chat-message__time">${getCurrentTime()}</p>
        `;
        elements.chatMessages.appendChild(messageEl);
        scrollToBottom();
    }

    // Mostrar indicador de digitação
    function showTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'typing-indicator';
        typingEl.id = 'typingIndicator';
        typingEl.innerHTML = '<span></span><span></span><span></span>';
        elements.chatMessages.appendChild(typingEl);
        scrollToBottom();
    }

    // Esconder indicador de digitação
    function hideTypingIndicator() {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
    }

    // Adicionar botão do WhatsApp
    function addWhatsAppButton() {
        const buttonEl = document.createElement('a');
        buttonEl.className = 'chat-whatsapp-redirect';
        buttonEl.href = getWhatsAppLink();
        buttonEl.target = '_blank';
        buttonEl.rel = 'noopener noreferrer';
        buttonEl.innerHTML = '<i class="fab fa-whatsapp"></i> Falar com Especialista';

        elements.chatMessages.appendChild(buttonEl);
        scrollToBottom();
    }

    // Gerar link do WhatsApp
    function getWhatsAppLink() {
        const name = chatState.userName || 'Visitante';
        const context = chatState.conversationHistory
            .filter(h => h.role === 'user')
            .slice(-2)
            .map(h => h.message)
            .join(' | ');

        let message = `Olá! Me chamo ${name}.\n\nConversei com a Estela e gostaria de mais informações sobre a Missão Código China.`;

        if (context) {
            message += `\n\n[Contexto: ${context.substring(0, 100)}]`;
        }

        return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    }

    // Formatar mensagem
    function formatMessage(text) {
        return escapeHtml(text).replace(/\n/g, '<br>');
    }

    // Escapar HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Obter hora atual
    function getCurrentTime() {
        return new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Scroll para o final
    function scrollToBottom() {
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }

    // Iniciar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
