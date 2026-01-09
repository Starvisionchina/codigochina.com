/**
 * WhatsApp Chat Widget - Starvision
 * Assistente Virtual "Estela" - Agente de IA Humanizada
 * Conversa natural sobre Canton Fair e Starvision China
 */

(function () {
    'use strict';

    // Configurações
    const CONFIG = {
        whatsappNumber: '555131031030',
        botName: 'Estela',
        typingDelay: 1500,
        messageDelay: 800,
        maxInteractionsBeforeWhatsApp: 5
    };

    // Base de Conhecimento Expandida
    const KNOWLEDGE_BASE = {
        cantonFair: {
            geral: [
                "A Canton Fair é simplesmente a maior feira de negócios do mundo! 🌍 Ela acontece em Guangzhou, na China, duas vezes por ano - em abril e outubro. Imagina um lugar com mais de 60 mil estandes? É impressionante!",
                "Sabe a Canton Fair? É o sonho de todo importador! Lá você encontra fornecedores de praticamente tudo que existe. São mais de 280 mil compradores de todo o mundo visitando!",
                "A Canton Fair existe desde 1957 e é o maior evento de comércio exterior da China! Por lá passam mais de 3.500 produtos inéditos a cada edição. É uma imersão total em oportunidades!"
            ],
            historia: "A Canton Fair começou em 1957 e é a feira de importação e exportação mais antiga da China! Desde então, já são mais de 130 edições conectando empresários do mundo inteiro. 📜",
            experiencia: "Participar da Canton Fair é uma experiência única! Você caminha por pavilhões gigantescos, conhece fornecedores pessoalmente, testa produtos na hora e negocia diretamente. É muito diferente de comprar pela internet!",
            datas: "A próxima edição será em Abril de 2026! 📅\n\n• Fase 1: 15-19 de Abril\n• Fase 2: 23-27 de Abril\n• Fase 3: 1-4 de Maio\n\nCada fase foca em setores diferentes!",
            fase1: "A Fase 1 (15-19 de Abril) é focada em tecnologia e indústria! 🔌\n\nVocê encontra: eletrônicos, eletrodomésticos, máquinas industriais, veículos elétricos, iluminação, energia solar, ferramentas e muito mais.",
            fase2: "A Fase 2 (23-27 de Abril) é o paraíso da decoração e casa! 🏠\n\nTem de tudo: cerâmicas, utensílios de cozinha, vidros artísticos, móveis, materiais de construção, presentes, relógios... É linda!",
            fase3: "A Fase 3 (1-4 de Maio) é o mundo da moda e lifestyle! 👗\n\nEncontra-se: roupas, tecidos, brinquedos, produtos infantis, artigos esportivos, papelaria, alimentos e até produtos tradicionais chineses.",
            local: "A feira acontece no Canton Fair Complex, em Guangzhou (ou Cantão), sul da China! É um complexo ENORME - 20 vezes maior que a Expo São Paulo! 😮\n\nGuangzhou é uma cidade incrível, moderna e cheia de história.",
            tamanho: "Os números impressionam! 📊\n\n• Mais de 60 mil estandes\n• 280 mil compradores internacionais\n• 3.500+ produtos inéditos por edição\n• 20x maior que a Expo SP\n\nÉ muita coisa para ver em poucos dias, por isso ter guia é essencial!",
            porqueIr: "Por que ir à Canton Fair? 🤔\n\n1️⃣ Negociar direto com fabricantes (melhores preços!)\n2️⃣ Ver e testar produtos pessoalmente\n3️⃣ Descobrir lançamentos antes da concorrência\n4️⃣ Criar relacionamentos duradouros\n5️⃣ Entender a cultura de negócios chinesa\n\nÉ uma experiência que muda sua visão de negócios!"
        },
        starvision: {
            sobre: "A Starvision nasceu da paixão por conectar o Brasil à China! 🤝\n\nSão mais de 20 anos ajudando empresários brasileiros a importar, exportar e fazer negócios na Ásia. Nosso CEO, Rodrigo Lima, já auditou mais de 300 fábricas!",
            missao: "A Missão Código China é nossa imersão completa na Canton Fair! ✈️\n\nNão é só uma viagem - é uma experiência de transformação. Você vai preparado, acompanhado e com todo suporte para fazer negócios de verdade!",
            pacote: "Na Missão Código China você tem tudo incluso:\n\n✈️ Passagens aéreas internacionais\n🏨 Hospedagem premium com café da manhã\n🚄 Trem bala entre cidades\n🎫 Ingressos para a Canton Fair\n👨‍💼 Consultoria antes, durante e depois\n🗣️ Tradutores profissionais in loco\n📚 Workshops de preparação online\n🎁 Kit exclusivo da missão\n🍜 Experiências culturais e gastronômicas",
            diferenciais: "O que faz a Missão Código China especial? ⭐\n\n• Preparação antes da viagem (workshops, aulas de mandarim)\n• Consultores especializados te acompanhando na feira\n• Tradutores para facilitar as negociações\n• Análise de fornecedores e verificação de credenciais\n• Networking com outros empresários brasileiros\n• Suporte pós-viagem para suas importações",
            equipe: "Nossa missão é liderada por especialistas experientes! 👨‍💼\n\n**Rodrigo Lima Fernandes** - CEO da Starvision, 20+ anos de experiência, já participou de 18 edições da Canton Fair e auditou mais de 300 fábricas.\n\n**Antonio Fogaça** - Mestre em escalar negócios e internacionalizar marcas, empresário de sucesso com faturamento 7 dígitos mensais."
        },
        servicos: {
            feira: "Durante a Canton Fair você terá:\n\n🧭 Visita orientada pelos consultores\n🗣️ Tradutores profissionais (mandarim e inglês)\n📋 Análise de fornecedores e custos\n📝 Consolidação diária das descobertas\n🤝 Networking com o grupo\n\nNunca estará sozinho na feira!",
            importacao: "A Starvision também oferece suporte completo de importação e exportação! 📦\n\nDesde encontrar o fornecedor certo até a chegada do produto no Brasil, nossa equipe pode te ajudar em todo o processo.",
            preparacao: "Antes de embarcar, você passa por uma preparação completa! 📚\n\n• Workshops online sobre negociação\n• Dicas culturais e de etiqueta\n• Aulas básicas de mandarim\n• Estratégias para a feira\n• Orientação sobre seu segmento específico"
        },
        china: {
            cultura: "A China é fascinante! 🇨🇳\n\nA cultura de negócios lá é diferente - o relacionamento pessoal (Guanxi) é muito valorizado. Por isso fazemos jantares de networking e imersões culturais durante a missão!",
            idioma: "Não se preocupe com o idioma! 🗣️\n\nNossos tradutores profissionais te acompanham nas negociações. E antes da viagem você ainda tem aulas de mandarim básico para situações do dia a dia!",
            seguranca: "A China é muito segura para turistas de negócios! 🔒\n\nGuangzhou é uma cidade moderna e organizada. Além disso, você estará sempre acompanhado pela equipe Starvision e pelos guias locais."
        }
    };

    // Padrões de intenção e respostas
    const INTENTIONS = [
        // Saudações
        {
            patterns: ['oi', 'olá', 'ola', 'hey', 'eai', 'e ai', 'bom dia', 'boa tarde', 'boa noite', 'oie', 'oii', 'opa'],
            response: () => {
                const greeting = getGreeting();
                return `${greeting}! 😊 Que bom te ver por aqui!\n\nEu sou a Estela, assistente virtual da Starvision. Posso te contar tudo sobre a Canton Fair e nossa Missão Código China!\n\nSobre o que gostaria de saber?`;
            },
            isGreeting: true
        },
        // Canton Fair - Geral
        {
            patterns: ['canton fair', 'cantonfair', 'maior feira', 'o que é a feira', 'sobre a feira', 'me fala da feira', 'conta sobre a feira'],
            response: () => getRandomItem(KNOWLEDGE_BASE.cantonFair.geral)
        },
        // Canton Fair - Experiência
        {
            patterns: ['como é', 'experiência', 'experiencia', 'vale a pena', 'é bom'],
            response: () => KNOWLEDGE_BASE.cantonFair.experiencia
        },
        // Canton Fair - Por que ir
        {
            patterns: ['por que ir', 'porque ir', 'vantagens', 'benefícios de ir', 'beneficios de ir', 'motivos'],
            response: () => KNOWLEDGE_BASE.cantonFair.porqueIr
        },
        // Canton Fair - História
        {
            patterns: ['história', 'historia', 'desde quando', 'quantos anos', 'há quanto tempo'],
            response: () => KNOWLEDGE_BASE.cantonFair.historia
        },
        // Datas
        {
            patterns: ['quando', 'data', 'datas', 'abril', 'maio', 'quando acontece', 'quando é', 'período', 'periodo'],
            response: () => KNOWLEDGE_BASE.cantonFair.datas
        },
        // Fases - Geral
        {
            patterns: ['fase', 'fases', 'setores', 'segmentos', 'categorias', 'divisão', 'divisao'],
            response: () => "A Canton Fair é dividida em 3 fases! 📅\n\n🔌 Fase 1 (15-19 Abril): Eletrônicos e tecnologia\n🏠 Fase 2 (23-27 Abril): Casa e decoração\n👗 Fase 3 (1-4 Maio): Moda e lifestyle\n\nQual fase combina mais com seu negócio? Posso detalhar qualquer uma delas!"
        },
        // Fase 1
        {
            patterns: ['fase 1', 'fase1', 'eletrônico', 'eletronico', 'tecnologia', 'máquina', 'maquina', 'industrial'],
            response: () => KNOWLEDGE_BASE.cantonFair.fase1
        },
        // Fase 2
        {
            patterns: ['fase 2', 'fase2', 'decoração', 'decoracao', 'casa', 'móvel', 'movel', 'mobília', 'mobilia', 'cozinha'],
            response: () => KNOWLEDGE_BASE.cantonFair.fase2
        },
        // Fase 3
        {
            patterns: ['fase 3', 'fase3', 'moda', 'roupa', 'brinquedo', 'têxtil', 'textil', 'tecido', 'infantil'],
            response: () => KNOWLEDGE_BASE.cantonFair.fase3
        },
        // Local
        {
            patterns: ['onde', 'local', 'localização', 'localizacao', 'cidade', 'guangzhou', 'cantão', 'cantao', 'endereço', 'endereco'],
            response: () => KNOWLEDGE_BASE.cantonFair.local
        },
        // Tamanho
        {
            patterns: ['tamanho', 'grande', 'quantos estandes', 'quantos expositores', 'números', 'numeros'],
            response: () => KNOWLEDGE_BASE.cantonFair.tamanho
        },
        // Starvision
        {
            patterns: ['starvision', 'empresa', 'vocês', 'vcs', 'quem são', 'quem sao'],
            response: () => KNOWLEDGE_BASE.starvision.sobre
        },
        // Missão
        {
            patterns: ['missão', 'missao', 'código china', 'codigo china', 'viagem', 'pacote viagem'],
            response: () => KNOWLEDGE_BASE.starvision.missao
        },
        // O que inclui
        {
            patterns: ['inclui', 'incluso', 'o que tem', 'pacote', 'o que vem'],
            response: () => KNOWLEDGE_BASE.starvision.pacote
        },
        // Diferenciais
        {
            patterns: ['diferencial', 'diferenciais', 'especial', 'diferente', 'por que starvision', 'porque starvision'],
            response: () => KNOWLEDGE_BASE.starvision.diferenciais
        },
        // VALORES/PREÇO - Direcionar para reunião
        {
            patterns: ['preço', 'preco', 'valor', 'quanto', 'custa', 'investimento', 'custo', 'quanto custa', 'qual o valor', 'qual valor', 'parcela', 'pagamento', 'pagar'],
            response: () => "Ótima pergunta! 💬\n\nOs valores da Missão Código China são personalizados conforme o tipo de pacote, acomodação e necessidades de cada empresário.\n\nPara te passar informações precisas, nosso time comercial precisa entender melhor seu perfil e objetivos. Que tal conversar com um especialista? Ele pode montar uma proposta sob medida pra você!",
            triggerWhatsApp: true
        },
        // Equipe/Líderes
        {
            patterns: ['quem lidera', 'líder', 'lider', 'organizador', 'rodrigo', 'antonio', 'fogaça', 'fogaca', 'equipe'],
            response: () => KNOWLEDGE_BASE.starvision.equipe
        },
        // Serviços na feira
        {
            patterns: ['serviço', 'servico', 'suporte', 'apoio', 'durante a feira', 'ajuda na feira', 'acompanhamento'],
            response: () => KNOWLEDGE_BASE.servicos.feira
        },
        // Preparação
        {
            patterns: ['preparação', 'preparacao', 'antes da viagem', 'workshop', 'preparo', 'treinamento'],
            response: () => KNOWLEDGE_BASE.servicos.preparacao
        },
        // Importação/Exportação
        {
            patterns: ['importar', 'importação', 'importacao', 'exportar', 'exportação', 'exportacao', 'comprar china', 'trazer produtos', 'fornecedor'],
            response: () => KNOWLEDGE_BASE.servicos.importacao
        },
        // Cultura
        {
            patterns: ['cultura', 'cultural', 'costumes', 'guanxi', 'etiqueta', 'comportamento'],
            response: () => KNOWLEDGE_BASE.china.cultura
        },
        // Idioma
        {
            patterns: ['idioma', 'língua', 'lingua', 'mandarim', 'chinês', 'chines', 'falar', 'comunicação', 'comunicacao', 'tradutor'],
            response: () => KNOWLEDGE_BASE.china.idioma
        },
        // Segurança
        {
            patterns: ['seguro', 'segurança', 'seguranca', 'perigoso', 'risco', 'medo'],
            response: () => KNOWLEDGE_BASE.china.seguranca
        },
        // Interesse positivo
        {
            patterns: ['quero', 'tenho interesse', 'interessado', 'me inscrever', 'participar', 'quero ir', 'vou ir', 'reservar'],
            response: () => "Que maravilha! 🎉 Fico muito feliz com seu interesse!\n\nPara dar o próximo passo, nosso time de especialistas precisa conhecer melhor seu perfil empresarial e objetivos. Eles vão te ajudar com todas as informações e orientações!\n\nVamos te conectar pelo WhatsApp?",
            triggerWhatsApp: true
        },
        // Confirmações
        {
            patterns: ['sim', 'vamos', 'bora', 'pode ser', 'claro', 'com certeza', 'positivo', 'ok'],
            response: () => "Perfeito! 👍\n\nVou te direcionar para um dos nossos especialistas. Eles estão prontos para te ajudar com tudo que você precisa!",
            triggerWhatsApp: true
        },
        // Agradecimentos
        {
            patterns: ['obrigado', 'obrigada', 'valeu', 'vlw', 'thanks', 'agradeço', 'agradeco'],
            response: () => "Imagina! 😊 Foi um prazer conversar com você!\n\nSe quiser informações mais detalhadas ou uma proposta personalizada, nossos especialistas estão à disposição pelo WhatsApp!\n\nPosso te conectar?"
        },
        // Despedidas
        {
            patterns: ['tchau', 'adeus', 'até', 'ate', 'flw', 'falou', 'bye'],
            response: () => "Até mais! 👋 Foi ótimo conversar com você!\n\nQuando quiser saber mais sobre a Canton Fair ou a Missão Código China, é só voltar aqui. Bons negócios! 🚀"
        },
        // Dúvidas
        {
            patterns: ['dúvida', 'duvida', 'pergunta', 'saber mais', 'me conta', 'explica', 'como funciona'],
            response: () => "Claro, estou aqui pra isso! 😊\n\nPosso te contar sobre:\n\n🌏 A Canton Fair (maior feira do mundo!)\n✈️ A Missão Código China\n📅 Datas e fases da feira\n👨‍💼 A equipe Starvision\n📦 Serviços de importação\n\nQual tema te interessa mais?"
        },
        // Negócios/Empreendedorismo
        {
            patterns: ['negócio', 'negocio', 'empreendedor', 'empresa', 'empresário', 'empresario', 'loja', 'comércio', 'comercio'],
            response: () => "Ah, você é empreendedor! 💼 Que incrível!\n\nA Canton Fair é O lugar para quem quer alavancar seu negócio. Lá você encontra fornecedores, negocia direto, vê tendências... É transformador!\n\nQual é o seu ramo? Posso te indicar qual fase da feira é mais interessante pra você!"
        },
        // Primeira vez
        {
            patterns: ['primeira vez', 'nunca fui', 'iniciante', 'começo', 'comeco', 'novo nisso'],
            response: () => "Primeira vez pensando em ir à China? Que passo importante! 🌟\n\nA Missão Código China é perfeita pra você! Temos toda uma preparação antes da viagem: workshops, orientações, aulas de mandarim básico...\n\nE lá você nunca fica sozinho - consultores e tradutores te acompanham em toda a feira. Zero estresse!"
        }
    ];

    // Respostas padrão mais humanizadas
    const DEFAULT_RESPONSES = [
        "Hmm, deixa eu pensar... 🤔\n\nNão tenho certeza se entendi direitinho. Minha especialidade é falar sobre a Canton Fair e a Missão Código China!\n\nQuer saber sobre datas, o que está incluso, ou como funciona a feira?",
        "Essa é uma boa pergunta! Mas confesso que foge um pouquinho do meu conhecimento. 😅\n\nSobre a Canton Fair e nossa Missão, posso te ajudar com tudo! O que você gostaria de saber?",
        "Olha, sobre isso específico talvez um dos nossos especialistas possa te ajudar melhor! 💬\n\nMas se quiser saber sobre a Canton Fair, datas da próxima edição, ou o que inclui nosso pacote, estou por aqui!",
        "Hum, não tenho essa informação na ponta da língua... 🙈\n\nMas me conta: qual seu interesse principal? Canton Fair? Importação? Posso te direcionar melhor!"
    ];

    // Estado do chat
    let chatState = {
        isOpen: false,
        userName: '',
        step: 0,
        interactionCount: 0,
        hasOfferedWhatsApp: false,
        conversationHistory: [],
        lastTopic: null
    };

    // Elementos DOM
    let elements = {};

    // Funções auxiliares
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Bom dia';
        if (hour >= 12 && hour < 18) return 'Boa tarde';
        return 'Boa noite';
    }

    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
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

    function toggleChat() {
        chatState.isOpen ? closeChat() : openChat();
    }

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
                    const welcomeMessage = `${greeting}! 😊 Bem-vindo à Starvision!\n\nEu sou a Estela, sua assistente virtual. Estou aqui para te contar tudo sobre a Canton Fair e a Missão Código China!\n\nPrimeiro, como posso te chamar?`;
                    addBotMessage(welcomeMessage);
                    chatState.step = 1;
                }, CONFIG.typingDelay);
            }, 500);
        }

        setTimeout(() => elements.chatInput.focus(), 300);
    }

    function closeChat() {
        chatState.isOpen = false;
        elements.chatWindow.classList.remove('open');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const message = elements.chatInput.value.trim();
        if (!message) return;

        elements.chatInput.value = '';
        addUserMessage(message);
        processUserResponse(message);
    }

    // Detectar intenção
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
                // Captura nome
                let userName = message.split(' ')[0];
                userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
                chatState.userName = userName;

                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        const responses = [
                            `Prazer te conhecer, ${userName}! 🤝\n\nMe conta: você já conhece a Canton Fair ou é a primeira vez que ouve falar dela?`,
                            `Que nome bonito, ${userName}! 😊\n\nE aí, como posso te ajudar hoje? Quer saber sobre a Canton Fair, a Missão Código China, ou tem alguma dúvida específica?`,
                            `Olá, ${userName}! É um prazer! ✨\n\nEstou aqui pra te ajudar com tudo sobre a maior feira de negócios do mundo! O que te traz aqui hoje?`
                        ];
                        addBotMessage(getRandomItem(responses));
                        chatState.step = 2;
                    }, CONFIG.typingDelay);
                }, CONFIG.messageDelay);
                break;

            case 2:
                handleFreeConversation(message);
                break;
        }
    }

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
                    response = getRandomItem(DEFAULT_RESPONSES);
                }

                // Ocasionalmente adiciona o nome do usuário
                if (chatState.userName && Math.random() > 0.8 && !response.includes(chatState.userName)) {
                    const openers = [`${chatState.userName}, `, `Olha ${chatState.userName}, `, `Sabe ${chatState.userName}, `];
                    response = getRandomItem(openers) + response.charAt(0).toLowerCase() + response.slice(1);
                }

                addBotMessage(response);
                chatState.conversationHistory.push({ role: 'bot', message: response });

                // Oferecer WhatsApp após várias interações ou se trigger
                if (shouldOfferWhatsApp) {
                    setTimeout(() => {
                        addWhatsAppButton();
                    }, 1000);
                } else if (chatState.interactionCount >= CONFIG.maxInteractionsBeforeWhatsApp && !chatState.hasOfferedWhatsApp) {
                    setTimeout(() => {
                        offerWhatsAppConnection();
                    }, 2000);
                }

            }, CONFIG.typingDelay);
        }, CONFIG.messageDelay);
    }

    function offerWhatsAppConnection() {
        chatState.hasOfferedWhatsApp = true;

        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();

            const messages = [
                `${chatState.userName}, está gostando da nossa conversa? 😊\n\nSe quiser informações mais detalhadas ou uma proposta personalizada, posso te conectar com um dos nossos especialistas pelo WhatsApp!`,
                `Ei ${chatState.userName}! Que tal falar com alguém da nossa equipe comercial? 💬\n\nEles podem te dar informações mais específicas e tirar todas as suas dúvidas!`
            ];

            addBotMessage(getRandomItem(messages));

            setTimeout(() => {
                addWhatsAppButton();
            }, 500);
        }, CONFIG.typingDelay);
    }

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

    function showTypingIndicator() {
        const typingEl = document.createElement('div');
        typingEl.className = 'typing-indicator';
        typingEl.id = 'typingIndicator';
        typingEl.innerHTML = '<span></span><span></span><span></span>';
        elements.chatMessages.appendChild(typingEl);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typingEl = document.getElementById('typingIndicator');
        if (typingEl) typingEl.remove();
    }

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

    function getWhatsAppLink() {
        const name = chatState.userName || 'Visitante';
        const topics = chatState.conversationHistory
            .filter(h => h.role === 'user')
            .slice(-3)
            .map(h => h.message)
            .join(' | ');

        let message = `Olá! Me chamo ${name}.\n\nConversei com a Estela e gostaria de mais informações sobre a Missão Código China.`;

        if (topics) {
            message += `\n\n[Assuntos conversados: ${topics.substring(0, 100)}]`;
        }

        return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    }

    function formatMessage(text) {
        return escapeHtml(text).replace(/\n/g, '<br>');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function getCurrentTime() {
        return new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function scrollToBottom() {
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
