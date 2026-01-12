// ========================================
// Formulário Starvision - Missão Código China
// EmailJS Integration
// ========================================

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = 'fdD4iq2sUwr6-hswz';
const EMAILJS_SERVICE_ID = 'service_48xwn5h';
const EMAILJS_TEMPLATE_ID = 'template_kz737qk';

document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const form = document.getElementById('starvisionForm');
    const submitBtn = form.querySelector('.form-submit-btn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Máscara de telefone
    const whatsappInput = document.getElementById('whatsapp');
    whatsappInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        }

        e.target.value = value;
    });

    // Validação em tempo real
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('input', function () {
            hideMessages();
        });
    });

    // Validar campo individual
    function validateField(field) {
        if (field.validity.valid) {
            field.style.borderColor = '#51cf66';
            return true;
        } else {
            field.style.borderColor = '#ff6b6b';
            return false;
        }
    }

    // Esconder mensagens
    function hideMessages() {
        successMessage.classList.remove('show');
        errorMessage.classList.remove('show');
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    // Mostrar mensagem de sucesso
    function showSuccess() {
        hideMessages();
        successMessage.style.display = 'flex';
        successMessage.classList.add('show');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Mostrar mensagem de erro
    function showError(message) {
        hideMessages();
        errorText.textContent = message;
        errorMessage.style.display = 'flex';
        errorMessage.classList.add('show');
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Estado de loading
    function setLoading(isLoading) {
        if (isLoading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    // Envio do formulário via EmailJS
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validar todos os campos
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showError('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // Preparar dados para EmailJS
        const templateParams = {
            nome: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            whatsapp: document.getElementById('whatsapp').value.trim(),
            empresa: document.getElementById('empresa').value.trim(),
            from_name: document.getElementById('nome').value.trim()
        };

        // Enviar via EmailJS
        setLoading(true);
        hideMessages();

        try {
            const response = await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log('✅ Email enviado com sucesso:', response);
            showSuccess();

            // Enviar evento Lead para Meta Conversions API
            if (window.MetaTracking) {
                window.MetaTracking.trackLead({
                    email: templateParams.email,
                    phone: templateParams.whatsapp,
                    first_name: templateParams.nome.split(' ')[0],
                    last_name: templateParams.nome.split(' ').slice(1).join(' ') || ''
                });
            }

            form.reset();

            // Resetar bordas dos campos
            inputs.forEach(input => {
                input.style.borderColor = 'transparent';
            });
        } catch (error) {
            console.error('Erro:', error);
            showError('Erro ao enviar formulário. Tente novamente.');
        } finally {
            setLoading(false);
        }
    });

    // Enter para submeter no último campo
    inputs.forEach(input => {
        input.addEventListener('keypress', function (e) {
            if (e.key === 'Enter' && input === document.getElementById('empresa')) {
                e.preventDefault();
                form.dispatchEvent(new Event('submit'));
            }
        });
    });
});
