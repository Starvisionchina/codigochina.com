/**
 * WhatsApp Chat Widget - Starvision
 * Sistema de chat interativo com mensagem automática
 */

(function () {
    'use strict';

    // Configurações
    const CONFIG = {
        whatsappNumber: '555131031030',
        initialMessage: 'A Canton Fair é onde o mundo inteiro descobre o futuro, e a Starvision é o seu guia nessa jornada. Prepare-se para elevar o nível do seu negócio. Qual o seu nome?',
        botName: 'Starvision',
        typingDelay: 1500,
        messageDelay: 800
    };

    // Estado do chat
    let chatState = {
        isOpen: false,
        userName: '',
        step: 0,
        conversationData: {}
    };

    // Perguntas do fluxo de conversa
    const conversationFlow = [
        {
            question: CONFIG.initialMessage,
            field: 'name',
            nextMessage: (name) => `Prazer em conhecê-lo(a), ${name}! 🤝\n\nVocê tem interesse em participar da Missão Código China 2026 para a Canton Fair?`
        },
        {
            question: null, // Será definido dinamicamente
            field: 'interest',
            nextMessage: () => `Excelente! 🎉\n\nPara darmos continuidade, vou te conectar diretamente com nosso especialista no WhatsApp. Ele vai te passar todas as informações sobre a missão.\n\nClique no botão abaixo para continuar:`
        }
    ];

    // Elementos DOM
    let elements = {};

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
                    addBotMessage(CONFIG.initialMessage);
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
                chatState.conversationData.name = message;

                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        const greeting = conversationFlow[0].nextMessage(message);
                        addBotMessage(greeting);
                        chatState.step = 2;
                    }, CONFIG.typingDelay);
                }, CONFIG.messageDelay);
                break;

            case 2:
                // Usuário respondeu sobre interesse
                chatState.conversationData.interest = message;

                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        const finalMessage = conversationFlow[1].nextMessage();
                        addBotMessage(finalMessage);

                        // Adiciona botão de WhatsApp
                        setTimeout(() => {
                            addWhatsAppButton();
                        }, 500);

                        chatState.step = 3;
                    }, CONFIG.typingDelay);
                }, CONFIG.messageDelay);
                break;

            case 3:
                // Chat já concluído, enviar para WhatsApp
                redirectToWhatsApp();
                break;
        }
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

        // Esconde a área de input
        elements.chatInputArea.classList.add('hidden');
    }

    // Gerar link do WhatsApp com mensagem pré-definida
    function getWhatsAppLink() {
        const name = chatState.conversationData.name || 'Visitante';
        const interest = chatState.conversationData.interest || '';

        let message = `Olá! Meu nome é ${name}.\n\n`;
        message += `Tenho interesse na Missão Código China 2026.\n`;
        if (interest) {
            message += `Sobre a missão: ${interest}\n`;
        }
        message += `\nGostaria de saber mais informações!`;

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
