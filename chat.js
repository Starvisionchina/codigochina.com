/**
 * WhatsApp Chat Widget - Starvision
 * Assistente Virtual "Estela" - Conversa Humanizada
 */

(function () {
    'use strict';

    // Configurações
    const CONFIG = {
        whatsappNumber: '555131031030',
        botName: 'Estela',
        typingDelay: 1200,
        messageDelay: 600
    };

    // Estado do chat
    let chatState = {
        isOpen: false,
        userName: '',
        userInterest: '',
        step: 0
    };

    // Opções de interesse
    const interestOptions = [
        { id: 'missao', label: '🇨🇳 Saber mais sobre a Missão Código China', value: 'Saber mais sobre a Missão Código China' },
        { id: 'suporte', label: '📦 Quero suporte de importação ou exportação', value: 'Quero suporte de importação ou exportação' }
    ];

    // Elementos DOM
    let elements = {};

    // Obter saudação baseada no horário
    function getGreeting() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return 'Bom dia';
        } else if (hour >= 12 && hour < 18) {
            return 'Boa tarde';
        } else {
            return 'Boa noite';
        }
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

        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (chatState.isOpen && !elements.widget.contains(e.target)) {
                closeChat();
            }
        });

        // Tecla Escape para fechar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatState.isOpen) {
                closeChat();
            }
        });
    }

    // Toggle do chat
    function toggleChat() {
        if (chatState.isOpen) {
            closeChat();
        } else {
            openChat();
        }
    }

    // Abrir chat
    function openChat() {
        chatState.isOpen = true;
        elements.chatWindow.classList.add('open');
        elements.floatBtn.querySelector('.whatsapp-float-btn__badge').style.display = 'none';

        // Se for a primeira vez, inicia o chat
        if (chatState.step === 0) {
            setTimeout(() => {
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    const greeting = getGreeting();
                    const welcomeMessage = `${greeting}, empreendedor, tudo bem?\n\nEu sou a Estela e vou lhe auxiliar. Qual o seu nome?`;
                    addBotMessage(welcomeMessage);
                    chatState.step = 1;
                }, CONFIG.typingDelay);
            }, 500);
        }

        // Foca no input
        setTimeout(() => {
            elements.chatInput.focus();
        }, 300);
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

        // Limpa o input
        elements.chatInput.value = '';

        // Adiciona mensagem do usuário
        addUserMessage(message);

        // Processa a resposta baseado no step atual
        processUserResponse(message);
    }

    // Processar resposta do usuário
    function processUserResponse(message) {
        switch (chatState.step) {
            case 1:
                // Usuário enviou o nome
                chatState.userName = message;

                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();

                        const greeting = `Muito prazer, ${message}!\n\nEscolha uma das opções abaixo e vamos te conectar com um de nossos especialistas.`;

                        addBotMessage(greeting);

                        // Adiciona os botões de seleção após a mensagem
                        setTimeout(() => {
                            addInterestButtons();
                        }, 400);

                        chatState.step = 2;
                    }, CONFIG.typingDelay);
                }, CONFIG.messageDelay);
                break;

            case 2:
                // Este step é tratado pelos botões
                break;

            case 3:
                // Chat já concluído, qualquer mensagem redireciona para o WhatsApp
                redirectToWhatsApp();
                break;
        }
    }

    // Adicionar botões de interesse
    function addInterestButtons() {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'chat-interest-buttons';

        interestOptions.forEach(option => {
            const button = document.createElement('button');
            button.className = 'chat-interest-btn';
            button.textContent = option.label;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleInterestSelection(option);
            });
            buttonsContainer.appendChild(button);
        });

        elements.chatMessages.appendChild(buttonsContainer);
        scrollToBottom();

        // Esconde o input enquanto os botões estão visíveis
        elements.chatInputArea.classList.add('hidden');
    }

    // Lidar com seleção de interesse
    function handleInterestSelection(option) {
        chatState.userInterest = option.value;

        // Remove os botões
        const buttonsContainer = document.querySelector('.chat-interest-buttons');
        if (buttonsContainer) {
            buttonsContainer.remove();
        }

        // Adiciona a seleção como mensagem do usuário
        addUserMessage(option.label);

        setTimeout(() => {
            showTypingIndicator();
            setTimeout(() => {
                hideTypingIndicator();

                const finalMessage = `Perfeito! Clique no botão abaixo para continuar o seu atendimento:`;

                addBotMessage(finalMessage);

                // Adiciona botão de WhatsApp
                setTimeout(() => {
                    addWhatsAppButton();
                }, 500);

                chatState.step = 3;
            }, CONFIG.typingDelay);
        }, CONFIG.messageDelay);
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
        if (typingEl) {
            typingEl.remove();
        }
    }

    // Adicionar botão de redirecionamento do WhatsApp
    function addWhatsAppButton() {
        const buttonEl = document.createElement('a');
        buttonEl.className = 'chat-whatsapp-redirect';
        buttonEl.href = getWhatsAppLink();
        buttonEl.target = '_blank';
        buttonEl.rel = 'noopener noreferrer';
        buttonEl.innerHTML = '<i class="fab fa-whatsapp"></i> Continuar no WhatsApp';

        elements.chatMessages.appendChild(buttonEl);
        scrollToBottom();
    }

    // Gerar link do WhatsApp com mensagem humanizada
    function getWhatsAppLink() {
        const name = chatState.userName || 'Visitante';

        // Mensagem simplificada e humanizada
        // Mensagem simplificada e formatada para automação
        let message = `Olá! Me chamo ${name}. Tenho interesse em: ${chatState.userInterest}.`;

        return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    }

    // Redirecionar para WhatsApp
    function redirectToWhatsApp() {
        window.open(getWhatsAppLink(), '_blank');
    }

    // Formatar mensagem (quebras de linha)
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

    // Scroll para o final das mensagens
    function scrollToBottom() {
        elements.chatMessages.scrollTop = elements.chatMessages.scrollHeight;
    }

    // Iniciar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
