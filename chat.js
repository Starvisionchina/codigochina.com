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
        typingDelay: 1200,
        messageDelay: 600,
        maxInteractionsBeforeWhatsApp: 6
    };

    // Tom da Estela: linguagem humana, sem emoji, frases curtas, educada mas direta
    const EXPRESSIONS = {
        starters: ['Olha,', 'Sabe,', 'Então,', ''],
        fillers: ['na verdade', 'sinceramente', 'olha só'],
        transitions: ['E tem mais...', 'Além disso...'],
        closings: ['Me conta mais sobre você.', 'O que mais quer saber?', 'Posso ajudar com mais algo?']
    };

    // Base de Conhecimento Completa e Humanizada
    const KNOWLEDGE_BASE = {
        // CANTON FAIR
        cantonFair: {
            geral: [
                "A Canton Fair é a maior feira de negócios do mundo. Ela acontece duas vezes por ano em Guangzhou, na China. Mais de 60 mil estandes e 280 mil compradores internacionais circulando.",
                "A Canton Fair é o ponto de encontro de todo importador brasileiro. Lá você encontra fornecedores de praticamente tudo que existe. São mais de 3.500 produtos inéditos lançados a cada edição.",
                "A Canton Fair é a maior e mais completa feira multissetorial do planeta. Sediada em Guangzhou, esse evento é o epicentro global para quem busca oportunidades de importação."
            ],
            tamanho: "Os números são impressionantes:\n\n• Mais de 60 mil estandes\n• 280 mil compradores de todo o mundo\n• 3.500+ produtos inéditos por edição\n• 20x maior que a Expo São Paulo\n\nÉ muita coisa pra ver em poucos dias. Por isso ter um guia experiente faz toda diferença.",
            experiencia: "Participar da Canton Fair é uma experiência única. Você caminha por pavilhões gigantescos, conhece fornecedores cara a cara, testa produtos na hora e negocia direto com as fábricas. É completamente diferente de ficar só pesquisando pela internet.",
            porqueIr: "Por que ir à Canton Fair?\n\n1. Negociar direto com fabricantes\n2. Ver e testar produtos pessoalmente\n3. Descobrir lançamentos antes da concorrência\n4. Criar relacionamentos duradouros\n5. Entender a cultura de negócios chinesa\n\nMuitos empresários dizem que é uma experiência que muda a visão de negócios.",
            local: "A feira acontece no Canton Fair Complex, em Guangzhou, no sul da China. É um complexo enorme, 20 vezes maior que a Expo São Paulo.\n\nO endereço é: Canton Fair Complex, Guangdong Province, Guangzhou, China.\n\nGuangzhou é uma cidade moderna e cheia de história."
        },

        // DATAS E FASES
        datas: {
            proxima: "A próxima edição da Canton Fair será em Abril de 2026.\n\nA Missão Código China acontece de 10 de Abril a 4 de Maio.\n\nAs fases da feira são:\n• Fase 1: 15-19 de Abril\n• Fase 2: 23-27 de Abril\n• Fase 3: 31 de Abril - 4 de Maio\n\nCada fase foca em setores diferentes da indústria.",
            fase1: "A Fase 1 (15-19 de Abril) é focada em tecnologia e indústria.\n\nVocê encontra:\n• Eletrônicos e eletrodomésticos\n• Produtos de TI e tecnologia\n• Máquinas industriais e automação\n• Veículos e mobilidade inteligente\n• Iluminação e energia solar\n• Ferramentas e hardware\n• Pavilhão internacional\n\nSe você trabalha com tecnologia, essa fase vale a pena.",
            fase2: "A Fase 2 (23-27 de Abril) é focada em decoração e casa.\n\nTem de tudo:\n• Cerâmicas e utensílios de cozinha\n• Vidros artísticos e decoração\n• Presentes e relógios\n• Materiais de construção\n• Mobiliário\n• Produtos de jardim\n• Pavilhão internacional\n\nÉ uma fase bem completa.",
            fase3: "A Fase 3 (31 de Abril - 4 de Maio) é focada em moda e lifestyle.\n\nEncontra-se:\n• Brinquedos e produtos infantis\n• Moda masculina e feminina\n• Roupas esportivas e acessórios\n• Têxteis para casa\n• Papelaria e escritório\n• Alimentos e produtos de saúde\n• Especialidades chinesas\n\nPerfeita pra quem trabalha com varejo.",
            fases: "A Canton Fair é dividida em 3 fases:\n\n**Fase 1** (15-19 Abril): Eletrônicos, tecnologia, máquinas\n**Fase 2** (23-27 Abril): Casa, decoração, mobiliário\n**Fase 3** (31 Abril - 4 Maio): Moda, brinquedos, lifestyle\n\nQual fase combina mais com o seu negócio? Me conta que eu explico melhor."
        },

        // STARVISION
        starvision: {
            sobre: "A Starvision conecta o Brasil à China há mais de 20 anos. Ajudamos empresários brasileiros a importar, exportar e fazer negócios na Ásia.\n\nO CEO, Rodrigo Lima, já participou de 18 edições da Canton Fair e auditou mais de 300 fábricas.",
            experiencia: "A Starvision tem mais de 20 anos de experiência em negócios com a China.\n\nNesse tempo, já apoiamos clientes em importações que superam US$ 100 milhões no total. É uma trajetória construída com muito trabalho e resultados concretos.",
            missao: "A Missão Código China é nossa imersão completa na Canton Fair.\n\nNão é só uma viagem. É uma experiência de transformação. Você vai preparado, acompanhado e com todo suporte para fazer negócios de verdade.\n\nComeça com workshops online, passa pela experiência presencial na China, e continua com suporte pós-viagem."
        },

        // LÍDERES DA MISSÃO
        lideres: {
            rodrigo: "**Rodrigo Lima Fernandes** é o CEO da Starvision e especialista em negócios Brasil-China.\n\n• 20+ anos de experiência prática\n• 18 edições da Canton Fair participadas\n• 300+ fábricas auditadas\n• US$ 100 milhões em importações apoiadas\n\nEle começou em 2006, quando foi pra China sem Google Tradutor, GPS e smartphones. Hoje lidera a missão com um objetivo: ajudar empresários brasileiros a acessar oportunidades reais no maior mercado do mundo.",
            antonio: "**Antonio Fogaça** é especialista em escalar negócios e internacionalizar marcas.\n\nA trajetória dele:\n• Começou vendendo geladinhos quando jovem\n• Aos 17 foi pros EUA estudar Comércio Exterior\n• Fundou sua primeira empresa de importação\n• Aos 21 já mentorava empresários\n• Hoje fatura 7 dígitos mensais\n\nComo CEO da Sol e Energia, expandiu a empresa para vários estados e até pros Estados Unidos.",
            ambos: "A Missão é liderada por dois especialistas:\n\n**Rodrigo Lima** - CEO da Starvision, 20+ anos de experiência, 18 edições da Canton Fair e 300+ fábricas auditadas.\n\n**Antonio Fogaça** - Especialista em escalar negócios, empreendedor há 25 anos.\n\nJuntos, eles trazem experiência prática e visão estratégica pra sua jornada empreendedora."
        },

        // PACOTE E INCLUSO
        pacote: {
            completo: "O pacote da Missão Código China é bem completo.\n\n**Preparação:**\n• Workshops online de estratégia e negociação\n• Aulas de mandarim básico\n• Consultoria especializada\n• Kit exclusivo (agenda, mala, camiseta...)\n\n**Logística:**\n• Passagens aéreas internacionais\n• Hospedagem premium com café\n• Trem bala entre cidades\n• Ingressos para a Canton Fair\n\n**Suporte local:**\n• Tradutores profissionais\n• Consultores acompanhando\n• Experiências culturais\n• Jantar de networking",
            preparacao: "Antes de embarcar, você passa por uma preparação completa.\n\n**Workshops Online:**\n• Estratégias de negociação\n• Como se comportar nos negócios chineses\n• Dicas sobre importação\n\n**Aulas de Mandarim:**\n• Introdução à língua\n• Frases práticas para negócios\n• Interação cultural\n\n**Consultoria:**\n• Orientação especializada\n• Análise do seu segmento\n• Preparação personalizada\n\nVocê chega na China preparado.",
            logistica: "A logística é toda organizada pra você.\n\n• **Passagens aéreas** internacionais (ida e volta)\n• **Hospedagem premium** em hotéis de categoria superior com café da manhã\n• **Trem bala** entre as cidades (Hong Kong - Shenzhen - Guangzhou)\n• **Ingressos** garantidos para a Canton Fair\n• **Certificado** oficial da Missão Código China\n\nTudo incluso, sem preocupação.",
            suporte: "Durante a feira você tem suporte total.\n\n**Visita Orientada:**\nConsultores especializados te guiam pelo centro de convenções.\n\n**Suporte Linguístico:**\nTradutores profissionais (mandarim e inglês) nas negociações.\n\n**Análise de Fornecedores:**\nAjudamos a verificar credenciais e confiabilidade.\n\n**Consolidação Diária:**\nReunião em grupo pra compartilhar descobertas e planejar.\n\nVocê nunca está sozinho."
        },

        // OBJETIVOS DA MISSÃO
        objetivos: {
            geral: "Os objetivos da Missão:\n\n**Networking Global:**\nConexão direta com fornecedores internacionais.\n\n**Imersão Cultural:**\nAprender sobre cultura e práticas comerciais chinesas.\n\n**Tendências de Mercado:**\nDescobrir novidades tecnológicas e oportunidades.\n\n**Crescimento Estratégico:**\nAumentar margem, criar marca própria, inovar.\n\nÉ uma experiência completa de transformação empresarial.",
            networking: "O networking na Canton Fair é muito bom. Você cercado por mais de 280 mil compradores de todo o mundo e milhares de fornecedores.\n\nVocê faz contatos que podem mudar completamente seu negócio. E ainda tem o jantar de networking com fornecedores selecionados.",
            crescimento: "A Missão é projetada pro seu crescimento.\n\n• Aumentar margens de lucro\n• Fortalecer competitividade\n• Criar marca própria\n• Reduzir dependência de intermediários\n• Abrir espaço pra inovação\n\nMuitos empresários transformam seus negócios depois de participar."
        },

        // SERVIÇOS DURANTE A FEIRA
        servicos: {
            feira: "Durante a Canton Fair você terá suporte estratégico completo.\n\n**Visita Orientada:**\nConsultores especializados em sourcing internacional te guiam pelo pavilhão.\n\n**Suporte Linguístico:**\nTradutores profissionais facilitam a comunicação técnica e comercial.\n\n**Análise de Fornecedores:**\nVerificação de credenciais e capacidade produtiva.\n\n**Consolidação do Dia:**\nReunião em grupo pra compartilhar descobertas e planejar os próximos dias.",
            tradutor: "Não se preocupe com o idioma.\nNossa equipe conta com tradutores profissionais para garantir uma comunicação clara e segura durante todo o processo.",
            analise: "Fazemos análise completa dos fornecedores.\n\nAjudamos a verificar:\n• Credenciais da empresa\n• Capacidade produtiva\n• Confiabilidade\n• Histórico de exportação\n\nIsso reduz muito os riscos em futuras operações."
        },

        // CHINA E CULTURA
        china: {
            cultura: "A cultura de negócios chinesa é muito importante entender.\n\nO conceito de **Guanxi** (relacionamento pessoal) é muito valorizado. Por isso fazemos:\n• Jantares de networking\n• Imersões culturais\n• Visitas guiadas às cidades\n\nEntender a cultura faz toda diferença nas negociações.",
            seguranca: "A China é muito segura para turistas de negócios.\n\nGuangzhou é uma cidade moderna, organizada e tranquila. Além disso, você estará sempre:\n• Acompanhado pela equipe Starvision\n• Com guias locais experientes\n• Em hotéis de categoria superior\n\nPode ir tranquilo.",
            cidades: "A Missão passa por 3 cidades:\n\n**Hong Kong:**\nMetrópole financeira, mistura de culturas.\n\n**Shenzhen:**\nA \"Silicon Valley\" da China, centro tecnológico.\n\n**Guangzhou:**\nOnde fica a Canton Fair, cidade histórica e comercial.\n\nViagem de trem bala entre elas.",
            clima: "Sobre o clima em Abril, Guangzhou tem clima subtropical úmido:\n\n• **Temperatura**: Entre 20°C e 28°C\n• **Umidade**: Alta, típico de primavera\n• **Chuvas**: Possíveis pancadas de chuva, mas nada que atrapalhe\n\n**Dica**: Leve roupas leves, um guarda-chuva compacto e casaco leve pro ar condicionado da feira.\n\nÉ uma época boa pra visitar.",
            curiosidades: "Algumas curiosidades sobre a China:\n\n• **Trem bala**: Viaja a até 350km/h - você vai de Shenzhen a Guangzhou rapidinho\n• **WeChat**: O app que faz tudo - pagamentos, mensagens, redes sociais\n• **Comida**: Cada região tem culinária única - Guangzhou é famosa pelo Dim Sum\n• **Escala**: Tudo é grande - prédios, feiras, shoppings\n• **Tecnologia**: Pagamento por QR Code em todo lugar\n• **5G**: Internet ultrarrápida em todas as cidades",
            gastronomia: "A gastronomia chinesa é muito boa.\n\nGuangzhou é considerada a capital gastronômica da China.\n\n• **Dim Sum**: Pequenas porções deliciosas\n• **Pato Laqueado**: Um clássico\n• **Frutos do Mar**: Frescos\n• **Chá**: Cultura milenar\n\nDurante a missão temos jantares especiais pra você experimentar o melhor da culinária local."
        },

        // TECNOLOGIAS E ROBÔS
        tecnologia: {
            robos: "A Starvision trabalha com tecnologias de ponta.\n\nNa Canton Fair você encontra:\n• Robôs de serviço e atendimento\n• Automação industrial\n• Drones comerciais\n• Inteligência Artificial aplicada\n• Veículos elétricos e autônomos\n• Smart home e IoT\n\nShenzhen é conhecida como a \"Silicon Valley\" da China.",
            inovacao: "A China é líder mundial em inovação tecnológica.\n\n• **5G**: Cobertura massiva\n• **Veículos elétricos**: BYD, NIO, XPeng dominando\n• **IA**: Avanços impressionantes\n• **E-commerce**: Alibaba, JD.com\n• **Fintechs**: Pagamento digital em todo lugar\n\nNa Fase 1 da Canton Fair você vê tudo isso de perto.",
            starvision: "A Starvision está conectada com as últimas tecnologias.\n\nTrabalhamos com:\n• Automação industrial\n• Robôs de serviço\n• Energia solar e renovável\n• Equipamentos de última geração\n• Produtos de alta tecnologia\n\nNossos consultores conhecem profundamente esses mercados e podem te orientar nas melhores oportunidades."
        },

        // CONTATOS
        contato: {
            // BLOCO 1 - CONTATO (WhatsApp / Telefone)
            whatsapp: "Claro!\nVocê pode falar com a nossa equipe pelo WhatsApp (51) 3103-1030.\nÉ só enviar uma mensagem que alguém do time vai te atender.\n\nSe preferir, posso te direcionar agora.",
            telefone: "Claro!\nNosso telefone e WhatsApp é (51) 3103-1030.\nPode ligar ou mandar mensagem que nossa equipe vai te atender.",
            email: "Claro!\nNosso email é contato@e-starvision.com.\nPode enviar sua mensagem que respondemos rapidinho.\nMas se quiser uma resposta mais rápida, liga ou manda WhatsApp pro (51) 3103-1030.",
            instagram: "Siga a Starvision no Instagram: @starvisionchina.\nLá compartilhamos conteúdo sobre importação, China e as experiências das nossas missões.",
            redes: "Nos siga nas redes sociais:\n\nInstagram: @starvisionchina\nFacebook: StarVision Import Export\nWhatsApp: (51) 3103-1030\nEmail: contato@e-starvision.com"
        },

        // VALORES E INVESTIMENTO
        valores: {
            resposta: "Os valores da Missão Código China são personalizados conforme:\n• Tipo de pacote escolhido\n• Opção de acomodação\n• Necessidades específicas do seu negócio\n\nPara te passar informações precisas e montar uma proposta sob medida, nosso time comercial precisa entender melhor seu perfil e objetivos.\n\nQue tal conversar com um especialista? Ele pode te explicar tudo em detalhes."
        },

        // ESTATÍSTICAS
        estatisticas: {
            numeros: "Os números da Canton Fair impressionam! 📊\n\n• **+50 mil** expositores na edição de Abril/2026\n• **+20 anos** de expertise da Starvision\n• **+280 mil** compradores internacionais circulando\n• **+60 mil** estandes disponíveis\n• **+3.500** produtos inéditos por edição\n\nÉ simplesmente a maior feira do mundo!"
        }
    };

    // Padrões de intenção e respostas
    // REGRA DE OURO: IDIOMA primeiro → ESPECIALISTA segundo → CONTATO terceiro
    const INTENTIONS = [
        // SAUDAÇÕES
        {
            patterns: ['oi', 'olá', 'ola', 'hey', 'eai', 'e ai', 'bom dia', 'boa tarde', 'boa noite', 'oie', 'oii', 'opa', 'hello', 'hi'],
            response: () => {
                const greeting = getGreeting();
                return `${greeting}! Que bom te ver por aqui.\n\nEu sou a Estela, assistente virtual da Starvision. Estou aqui pra te ajudar com tudo sobre a Canton Fair e a Missão Código China.\n\nMe conta, o que você gostaria de saber?`;
            },
            isGreeting: true
        },

        // ═══════════════════════════════════════════════════════════
        // BLOCO 3 - IDIOMA / TRADUÇÃO (PRIORIDADE MÁXIMA)
        // Detectado PRIMEIRO para evitar conflito com "falar"
        // ═══════════════════════════════════════════════════════════
        {
            patterns: [
                'preciso saber inglês', 'preciso saber ingles',
                'preciso saber mandarim', 'idioma', 'língua', 'lingua',
                'tradução', 'traducao', 'preciso falar inglês', 'preciso falar ingles',
                'não sei inglês', 'nao sei ingles', 'não sei mandarim', 'nao sei mandarim',
                'comunicação com fornecedores', 'comunicacao com fornecedores',
                'idioma da china', 'falar chinês', 'falar chines',
                'falar mandarim', 'falar inglês', 'falar ingles',
                'preciso de tradutor', 'tradutor', 'tradutores'
            ],
            response: () => "Não se preocupe com o idioma.\nNossa equipe conta com tradutores profissionais para garantir uma comunicação clara e segura durante todo o processo.",
            priority: 3
        },

        // ═══════════════════════════════════════════════════════════
        // BLOCO 2 - FALAR COM ESPECIALISTA / CONSULTOR (SEGUNDA PRIORIDADE)
        // SOMENTE quando a pessoa pedir explicitamente
        // ═══════════════════════════════════════════════════════════
        {
            patterns: [
                'falar com especialista', 'falar com um especialista',
                'falar com consultor', 'falar com um consultor',
                'atendimento especializado', 'falar com rodrigo', 'falar com antônio',
                'falar com antonio', 'quero um especialista', 'quero um consultor',
                'atendimento humano', 'falar com alguém da área', 'falar com alguem da area',
                'quero falar com alguém', 'quero falar com alguem',
                'falar com uma pessoa', 'atendente humano'
            ],
            response: () => "Perfeito.\nVou te direcionar para falar com um dos nossos especialistas, que pode te orientar melhor.\n\nÉ só seguir as próximas instruções.",
            triggerWhatsApp: true,
            priority: 2
        },

        // ═══════════════════════════════════════════════════════════
        // BLOCO 1 - CONTATO (WhatsApp / Telefone) (TERCEIRA PRIORIDADE)
        // A pessoa só quer entrar em contato com a empresa
        // Dicionário completo de variações de perguntas sobre contato
        // ═══════════════════════════════════════════════════════════
        {
            patterns: [
                // Perguntas diretas sobre contato
                'como entrar em contato', 'como eu falo com vocês', 'como eu falo com voces',
                'como posso falar com vocês', 'como posso falar com voces',
                'como entro em contato com vocês', 'como entro em contato com voces',
                'como entro em contato com a empresa', 'qual contato?',

                // Perguntas sobre número
                'qual o contato de vocês', 'qual o contato de voces',
                'qual o número de vocês', 'qual o numero de voces',
                'qual é o número de vocês', 'qual e o numero de voces',
                'qual o número de contato de vocês', 'qual o numero de contato de voces', 'contato',

                // WhatsApp específico
                'tem whatsapp', 'whatsapp da empresa', 'número de whatsapp', 'numero de whatsapp',
                'posso ter o whatsapp', 'posso ter o whatsapp da empresa',
                'me passa o whatsapp', 'passa o whatsapp',
                'qual o whatsapp', 'qual whatsapp',

                // Telefone específico
                'telefone da empresa', 'tem telefone', 'posso ligar',
                'tem algum telefone', 'tem algum telefone pra eu ligar',
                'vocês têm algum telefone', 'voces tem algum telefone',
                'vocês têm algum telefone pra suporte', 'voces tem algum telefone pra suporte',
                'posso ligar pra vocês', 'posso ligar pra voces',
                'qual o número', 'qual o numero',

                // Perguntas sobre falar com alguém
                'como faço para falar com alguém', 'como faco para falar com alguem',
                'como faço pra falar com um atendente', 'como faco pra falar com um atendente',
                'como consigo falar com alguém', 'como consigo falar com alguem',
                'como consigo falar com alguém da equipe', 'como consigo falar com alguem da equipe',
                'tem algum jeito de falar diretamente', 'tem algum jeito de falar diretamente com alguém',

                // Onde encontrar contato
                'como posso entrar em contato', 'onde falo com vocês', 'onde falo com voces',
                'onde eu acho o contato', 'onde eu acho o contato de vocês',
                'onde acho o contato de voces',

                // Pedidos diretos
                'me passa o contato', 'me passa o contato de vocês', 'me passa o contato de voces',
                'passa o contato', 'me dá o contato', 'me da o contato',

                // Starvision específico
                'contato star vision', 'contato starvision', 'contato da starvision'
            ],
            response: () => KNOWLEDGE_BASE.contato.whatsapp,
            triggerWhatsApp: true,
            priority: 1
        },

        // Gatilhos simples/curtos para contato (MESMA prioridade do bloco principal)
        {
            patterns: [
                'whatsapp', 'whats', 'zap', 'telefone', 'fone', 'ligar',
                'número', 'numero', 'celular', 'contato', 'contato?', 'qual contato',
                'falar com vocês', 'falar com voces', 'telefone?', 'whatsapp?'
            ],
            response: () => KNOWLEDGE_BASE.contato.whatsapp,
            triggerWhatsApp: true,
            priority: 1
        },

        // CONTATO - Email
        {
            patterns: ['email', 'e-mail', 'correio', 'mail', 'qual o email', 'qual email', 'me passa o email', 'passa o email'],
            response: () => KNOWLEDGE_BASE.contato.email
        },

        // CONTATO - Redes Sociais
        {
            patterns: ['instagram', 'insta', 'facebook', 'face', 'redes sociais', 'redes', 'onde sigo', 'perfil'],
            response: () => KNOWLEDGE_BASE.contato.redes
        },

        // CANTON FAIR - Geral
        {
            patterns: ['canton fair', 'cantonfair', 'maior feira', 'o que é a feira', 'sobre a feira', 'me fala da feira', 'conta sobre a feira', 'feira de cantão', 'feira cantao'],
            response: () => getRandomItem(KNOWLEDGE_BASE.cantonFair.geral)
        },

        // CANTON FAIR - Tamanho
        {
            patterns: ['tamanho', 'grande', 'quantos estandes', 'quantos expositores', 'números', 'numeros', 'estatísticas', 'estatisticas', 'quantos'],
            response: () => KNOWLEDGE_BASE.cantonFair.tamanho
        },

        // CANTON FAIR - Experiência
        {
            patterns: ['como é', 'experiência', 'experiencia', 'vale a pena', 'é bom', 'funciona como'],
            response: () => KNOWLEDGE_BASE.cantonFair.experiencia
        },

        // CANTON FAIR - Por que ir
        {
            patterns: ['por que ir', 'porque ir', 'vantagens', 'benefícios de ir', 'beneficios de ir', 'motivos', 'razões', 'razoes'],
            response: () => KNOWLEDGE_BASE.cantonFair.porqueIr
        },

        // CANTON FAIR - Local
        {
            patterns: ['onde fica', 'local', 'localização', 'localizacao', 'cidade', 'guangzhou', 'cantão', 'cantao', 'endereço', 'endereco', 'onde acontece'],
            response: () => KNOWLEDGE_BASE.cantonFair.local
        },

        // DATAS
        {
            patterns: ['quando', 'dia', 'data', 'datas', 'abril', 'maio', 'quando acontece', 'quando é', 'período', 'periodo', 'próxima edição', 'proxima edicao'],
            response: () => KNOWLEDGE_BASE.datas.proxima
        },

        // FASES - Geral
        {
            patterns: ['fase', 'fases', 'setores', 'segmentos', 'categorias', 'divisão', 'divisao', 'como é dividida', 'como e dividida'],
            response: () => KNOWLEDGE_BASE.datas.fases
        },

        // FASE 1
        {
            patterns: ['fase 1', 'fase1', 'primeira fase', 'eletrônico', 'eletronico', 'tecnologia', 'máquina', 'maquina', 'industrial', 'automação', 'energia solar'],
            response: () => KNOWLEDGE_BASE.datas.fase1
        },

        // FASE 2
        {
            patterns: ['fase 2', 'fase2', 'segunda fase', 'decoração', 'decoracao', 'casa', 'móvel', 'movel', 'mobília', 'mobilia', 'cozinha', 'cerâmica', 'ceramica'],
            response: () => KNOWLEDGE_BASE.datas.fase2
        },

        // FASE 3
        {
            patterns: ['fase 3', 'fase3', 'terceira fase', 'moda', 'roupa', 'brinquedo', 'têxtil', 'textil', 'tecido', 'infantil', 'bebê', 'bebe'],
            response: () => KNOWLEDGE_BASE.datas.fase3
        },

        // STARVISION
        {
            patterns: ['starvision', 'star vision', 'empresa', 'vocês', 'vcs', 'quem são', 'quem sao', 'quem é a starvision'],
            response: () => KNOWLEDGE_BASE.starvision.sobre
        },

        // MISSÃO
        {
            patterns: ['missão', 'missao', 'código china', 'codigo china', 'o que é a missão', 'viagem', 'imersão', 'imersao'],
            response: () => KNOWLEDGE_BASE.starvision.missao
        },

        // LÍDERES - Rodrigo
        {
            patterns: ['rodrigo', 'rodrigo lima', 'ceo', 'fundador', 'dono'],
            response: () => KNOWLEDGE_BASE.lideres.rodrigo
        },

        // LÍDERES - Antonio
        {
            patterns: ['antonio', 'antônio', 'fogaça', 'fogaca'],
            response: () => KNOWLEDGE_BASE.lideres.antonio
        },

        // LÍDERES - Quem lidera
        {
            patterns: ['quem lidera', 'líder', 'lider', 'organizador', 'quem organiza', 'equipe', 'liderança'],
            response: () => KNOWLEDGE_BASE.lideres.ambos
        },

        // PACOTE - Geral
        {
            patterns: ['pacote', 'o que inclui', 'inclui o que', 'incluso', 'o que tem', 'o que vem', 'benefícios'],
            response: () => KNOWLEDGE_BASE.pacote.completo,
            triggerWhatsApp: true
        },

        // PACOTE - Preparação
        {
            patterns: ['preparação', 'preparacao', 'antes da viagem', 'workshop', 'preparo', 'treinamento', 'aula'],
            response: () => KNOWLEDGE_BASE.pacote.preparacao
        },

        // PACOTE - Logística
        {
            patterns: ['passagem', 'hotel', 'hospedagem', 'voo', 'aéreo', 'aereo', 'trem', 'transfer', 'logística', 'logistica'],
            response: () => KNOWLEDGE_BASE.pacote.logistica
        },

        // SERVIÇOS - Feira
        {
            patterns: ['serviço', 'servico', 'suporte', 'apoio', 'durante a feira', 'ajuda na feira', 'acompanhamento'],
            response: () => KNOWLEDGE_BASE.servicos.feira,
            triggerWhatsApp: true
        },

        // SERVIÇOS - Tradutor (movido para BLOCO 3 com prioridade máxima)
        // Mantendo aqui apenas para compatibilidade com termos genéricos
        {
            patterns: ['mandarim', 'chinês', 'chines', 'não falo', 'nao falo'],
            response: () => "Não se preocupe com o idioma.\nNossa equipe conta com tradutores profissionais para garantir uma comunicação clara e segura durante todo o processo."
        },

        // SERVIÇOS - Análise de Fornecedores
        {
            patterns: ['fornecedor', 'fornecedores', 'análise', 'analise', 'verificar', 'confiável', 'confiavel', 'seguro negociar'],
            response: () => KNOWLEDGE_BASE.servicos.analise,
            triggerWhatsApp: true
        },

        // OBJETIVOS
        {
            patterns: ['objetivo', 'objetivos', 'pra que serve', 'qual o propósito', 'qual o proposito', 'finalidade'],
            response: () => KNOWLEDGE_BASE.objetivos.geral,
            triggerWhatsApp: true
        },

        // NETWORKING
        {
            patterns: ['networking', 'contatos', 'conexões', 'conexoes', 'relacionamento', 'conhecer pessoas'],
            response: () => KNOWLEDGE_BASE.objetivos.networking,
            triggerWhatsApp: true
        },

        // CRESCIMENTO
        {
            patterns: ['crescer', 'crescimento', 'escalar', 'expandir', 'lucro', 'margem', 'marca própria'],
            response: () => KNOWLEDGE_BASE.objetivos.crescimento,
            triggerWhatsApp: true
        },

        // CULTURA CHINESA
        {
            patterns: ['cultura', 'cultural', 'costumes', 'guanxi', 'etiqueta', 'comportamento'],
            response: () => KNOWLEDGE_BASE.china.cultura,
            triggerWhatsApp: true
        },

        // SEGURANÇA
        {
            patterns: ['seguro', 'segurança', 'seguranca', 'perigoso', 'risco', 'medo', 'violência'],
            response: () => KNOWLEDGE_BASE.china.seguranca,
            triggerWhatsApp: true
        },

        // CIDADES
        {
            patterns: ['hong kong', 'shenzhen', 'cidades', 'roteiro', 'onde passa', 'visita'],
            response: () => KNOWLEDGE_BASE.china.cidades,
            triggerWhatsApp: true
        },

        // CLIMA
        {
            patterns: ['clima', 'tempo', 'temperatura', 'frio', 'calor', 'chuva', 'quente', 'chove', 'como é o clima', 'que roupa', 'roupa levar'],
            response: () => KNOWLEDGE_BASE.china.clima,
            triggerWhatsApp: true
        },

        // CURIOSIDADES
        {
            patterns: ['curiosidade', 'curiosidades', 'curioso', 'diferente', 'estranho', 'interessante', 'como é lá', 'como e la'],
            response: () => KNOWLEDGE_BASE.china.curiosidades,
            triggerWhatsApp: true
        },

        // GASTRONOMIA
        {
            patterns: ['comida', 'comidas', 'gastronomia', 'culinária', 'culinaria', 'restaurante', 'comer', 'dim sum', 'prato', 'alimentação', 'alimentacao'],
            response: () => KNOWLEDGE_BASE.china.gastronomia,
            triggerWhatsApp: true
        },

        // ROBÔS E TECNOLOGIA
        {
            patterns: ['robô', 'robo', 'robos', 'robôs', 'automação', 'automacao', 'drone', 'drones', 'IA', 'inteligência artificial', 'inteligencia artificial'],
            response: () => KNOWLEDGE_BASE.tecnologia.robos,
            triggerWhatsApp: true
        },

        // INOVAÇÃO
        {
            patterns: ['inovação', 'inovacao', 'tecnologia', 'tech', 'high tech', '5g', 'elétrico', 'eletrico', 'carro elétrico', 'byd', 'veículo elétrico'],
            response: () => KNOWLEDGE_BASE.tecnologia.inovacao,
            triggerWhatsApp: true
        },

        // STARVISION TECNOLOGIA
        {
            patterns: ['o que vocês trabalham', 'produtos starvision', 'o que a starvision faz', 'areas de atuação', 'segmentos', 'energia solar', 'equipamentos'],
            response: () => KNOWLEDGE_BASE.tecnologia.starvision,
            triggerWhatsApp: true
        },

        // IMPORTAÇÃO/EXPORTAÇÃO
        {
            patterns: ['importar', 'importação', 'importacao', 'exportar', 'exportação', 'exportacao', 'comprar china', 'trazer produtos'],
            response: () => `A Starvision é especialista em importação e exportação.\n\nDesde encontrar o fornecedor certo até a chegada do produto no Brasil, nossa equipe pode te ajudar em todo o processo.\n\nA Missão Código China é uma forma excelente de começar. Você conhece os fornecedores pessoalmente e já começa a construir relacionamentos.\n\nQuer saber mais sobre como podemos te ajudar?`
        },

        // VALORES/PREÇO
        {
            patterns: ['preço', 'preco', 'valor', 'quanto', 'custa', 'investimento', 'custo', 'quanto custa', 'qual o valor', 'qual valor', 'parcela', 'pagamento', 'pagar', 'forma de pagamento'],
            response: () => KNOWLEDGE_BASE.valores.resposta,
            triggerWhatsApp: true
        },

        // INTERESSE POSITIVO
        {
            patterns: ['quero', 'tenho interesse', 'interessado', 'me inscrever', 'participar', 'quero ir', 'vou ir', 'reservar', 'como faço pra ir', 'como me inscrevo'],
            response: () => "Que bom saber do seu interesse.\n\nPara dar o próximo passo, nosso time de especialistas precisa conhecer melhor seu perfil empresarial e objetivos. Eles vão te ajudar com todas as informações, proposta personalizada e orientações.\n\nVamos te conectar pelo WhatsApp?",
            triggerWhatsApp: true
        },

        // CONFIRMAÇÕES POSITIVAS
        {
            patterns: ['sim', 'vamos', 'bora', 'pode ser', 'claro', 'com certeza', 'positivo', 'ok', 'quero sim', 'vamos lá'],
            response: () => "Perfeito.\nVou te direcionar para um dos nossos especialistas. Eles estão prontos pra te ajudar com todas as informações e montar uma proposta sob medida pra você.",
            triggerWhatsApp: true
        },

        // AGRADECIMENTOS
        {
            patterns: ['obrigado', 'obrigada', 'valeu', 'vlw', 'thanks', 'agradeço', 'agradeco', 'muito obrigado'],
            response: () => "Imagina, foi um prazer te ajudar.\n\nSe quiser informações mais detalhadas ou uma proposta personalizada, nossos especialistas estão à disposição pelo WhatsApp.\n\nPosso te conectar com eles?"
        },

        // DESPEDIDAS
        {
            patterns: ['tchau', 'adeus', 'até', 'ate', 'flw', 'falou', 'bye', 'até mais', 'xau'],
            response: () => "Até mais. Foi bom conversar com você.\n\nQuando quiser saber mais sobre a Canton Fair ou a Missão Código China, é só voltar aqui.\n\nBons negócios."
        },

        // DÚVIDAS GERAIS
        {
            patterns: ['dúvida', 'duvida', 'pergunta', 'saber mais', 'me conta', 'explica', 'como funciona', 'não entendi', 'nao entendi'],
            response: () => "Claro, estou aqui pra isso.\n\nPosso te contar sobre:\n\n**Canton Fair** - a maior feira do mundo\n**Missão Código China** - nossa imersão completa\n**Datas e Fases** - quando acontece cada etapa\n**Quem lidera** - nossos especialistas\n**O que inclui** - todo o pacote\n**Contato** - telefone, WhatsApp, email\n\nQual tema te interessa mais?"
        },

        // NEGÓCIOS/EMPREENDEDORISMO
        {
            patterns: ['negócio', 'negocio', 'empreendedor', 'empresário', 'empresario', 'loja', 'comércio', 'comercio', 'minha empresa'],
            response: () => "Você é empreendedor, que bom.\n\nA Canton Fair é o lugar pra quem quer alavancar seu negócio. Lá você encontra fornecedores, negocia direto com fábricas, vê tendências antes da concorrência.\n\nQual é o seu ramo? Posso te indicar qual fase da feira é mais interessante pro seu negócio."
        },

        // PRIMEIRA VEZ
        {
            patterns: ['primeira vez', 'nunca fui', 'iniciante', 'começo', 'comeco', 'novo nisso', 'nunca importei'],
            response: () => "Primeira vez pensando em ir à China? Que bom.\n\nA Missão Código China é ideal pra você. Temos toda uma preparação antes da viagem:\n\n• Workshops de estratégia e negociação\n• Aulas de mandarim básico\n• Orientação personalizada pro seu segmento\n\nE durante a feira você nunca fica sozinho. Consultores e tradutores te acompanham em todo momento."
        },

        // MEDO/INSEGURANÇA
        {
            patterns: ['medo', 'insegurança', 'inseguro', 'receio', 'preocupado', 'nervoso', 'apreensivo'],
            response: () => "Entendo perfeitamente. É normal ter um pouco de receio quando é uma experiência nova.\n\nMas olha só: a Starvision já levou centenas de empresários pra China, muitos na primeira viagem internacional de negócios deles.\n\n**Por que ficar tranquilo:**\n• Preparação completa antes de ir\n• Consultores experientes acompanhando\n• Tradutores profissionais\n• Hotéis de categoria superior\n• Suporte durante toda a viagem\n\nVocê está em boas mãos."
        },

        // COMPARAÇÃO
        {
            patterns: ['diferença', 'diferente', 'comparado', 'melhor que', 'vantagem sobre', 'por que starvision', 'porque starvision'],
            response: () => "O que faz a Missão Código China especial?\n\n**Nossos diferenciais:**\n• 20+ anos de experiência no mercado\n• Preparação completa antes da viagem\n• Consultores que já fizeram 18+ edições\n• 300+ fábricas auditadas pelo CEO\n• Tradutores profissionais in loco\n• Análise de fornecedores\n• Networking com outros empresários BR\n• Suporte pós-viagem\n\nNão é só uma viagem turística. É uma experiência de transformação empresarial completa."
        },

        // SITE/PÁGINA
        {
            patterns: ['site', 'página', 'pagina', 'onde vejo', 'mais informações', 'documentos', 'material'],
            response: () => "Você está no lugar certo.\n\nEste site (codigochina.com) tem todas as informações sobre a Missão.\n\nRolando a página você encontra:\n• Sobre a Canton Fair\n• As 3 fases da feira\n• Quem lidera a missão\n• Todo o pacote incluso\n• Formulário de contato\n\nMas se preferir, posso te explicar qualquer parte aqui no chat. O que quer saber?"
        }
    ];

    // Respostas padrão mais humanizadas (sem emojis, tom direto e educado)
    const DEFAULT_RESPONSES = [
        "Hmm, deixa eu pensar... Não tenho certeza se entendi direitinho sua pergunta. Minha especialidade é falar sobre a Canton Fair e a Missão Código China.\n\nQuer saber sobre datas, o que está incluso, ou como funciona a feira?",
        "Essa é uma boa pergunta. Mas confesso que foge um pouquinho do meu conhecimento.\n\nSobre a Canton Fair e nossa Missão, posso te ajudar com tudo. O que você gostaria de saber?",
        "Olha, sobre isso específico talvez um dos nossos especialistas possa te ajudar melhor.\n\nMas se quiser saber sobre a Canton Fair, datas da próxima edição, ou o que inclui nosso pacote, estou por aqui.",
        "Não tenho essa informação na ponta da língua... Mas posso te ajudar muito com tudo sobre Canton Fair e Missão Código China.\n\nMe conta: qual seu interesse principal?"
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

    // Adiciona variação natural às respostas
    function humanizeResponse(response, userName) {
        // Ocasionalmente adiciona o nome do usuário
        if (userName && Math.random() > 0.75 && !response.includes(userName)) {
            const openers = [`${userName}, `, `Olha ${userName}, `, `Sabe ${userName}, `, `${userName}! `];
            response = getRandomItem(openers) + response.charAt(0).toLowerCase() + response.slice(1);
        }
        return response;
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
                    const welcomeMessage = `${greeting} empreendedor, tudo bem? 😊\n\nEu sou a Estela e vou lhe auxiliar.\n\nQual o seu nome?`;
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

    // Detectar intenção com REGRA DE OURO:
    // 1. Se contém palavras de IDIOMA → responde BLOCO 3
    // 2. Senão, se contém ESPECIALISTA / CONSULTOR / NOMES → BLOCO 2
    // 3. Senão, se contém CONTATO / WHATSAPP / TELEFONE → BLOCO 1
    function detectIntention(message) {
        const normalizedMessage = message.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[?!.,]/g, ''); // Remove pontuação

        // VERIFICAÇÃO ESPECIAL: Palavras-chave curtas de CONTATO
        // Para pessoas monossilábicas que digitam apenas "contato", "whatsapp", etc.
        const contactKeywords = [
            'contato', 'whatsapp', 'whats', 'zap', 'telefone', 'fone',
            'numero', 'celular', 'ligar', 'qual contato'
        ];

        for (const keyword of contactKeywords) {
            if (normalizedMessage === keyword || normalizedMessage.trim() === keyword) {
                // Retorna a intenção de contato diretamente
                return {
                    response: () => KNOWLEDGE_BASE.contato.whatsapp,
                    triggerWhatsApp: true,
                    priority: 10 // Prioridade máxima
                };
            }
        }

        // Procura a melhor correspondência considerando prioridade
        let bestMatch = null;
        let bestScore = 0;
        let bestPriority = -1;

        for (const intention of INTENTIONS) {
            for (const pattern of intention.patterns) {
                const normalizedPattern = pattern.toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[?!.,]/g, ''); // Remove pontuação do padrão também

                if (normalizedMessage.includes(normalizedPattern)) {
                    const priority = intention.priority || 0;

                    // Primeiro verifica prioridade, depois tamanho do padrão
                    if (priority > bestPriority ||
                        (priority === bestPriority && normalizedPattern.length > bestScore)) {
                        bestPriority = priority;
                        bestScore = normalizedPattern.length;
                        bestMatch = intention;
                    }
                }
            }
        }
        return bestMatch;
    }

    // Processar resposta do usuário
    function processUserResponse(message) {
        chatState.interactionCount++;
        chatState.conversationHistory.push({ role: 'user', message });

        // Palavras-chave que NÃO devem ser aceitas como nome
        const contactKeywords = [
            'contato', 'whatsapp', 'whats', 'zap', 'telefone', 'fone',
            'numero', 'celular', 'ligar', 'email', 'qual contato'
        ];

        const normalizedMsg = message.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[?!.,]/g, '')
            .trim();

        switch (chatState.step) {
            case 1:
                // Primeiro verifica se a pessoa digitou uma palavra-chave de contato
                // em vez do nome (usuários objetivos/monossilábicos)
                if (contactKeywords.includes(normalizedMsg)) {
                    // Pula a etapa do nome e responde com contato
                    chatState.userName = 'Visitante';
                    chatState.step = 2;

                    setTimeout(() => {
                        showTypingIndicator();
                        setTimeout(() => {
                            hideTypingIndicator();
                            addBotMessage(KNOWLEDGE_BASE.contato.whatsapp);
                            setTimeout(() => {
                                addWhatsAppButton();
                            }, 500);
                        }, CONFIG.typingDelay);
                    }, CONFIG.messageDelay);
                    return;
                }

                // Captura nome normalmente
                let userName = message.split(' ')[0];
                userName = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
                chatState.userName = userName;

                setTimeout(() => {
                    showTypingIndicator();
                    setTimeout(() => {
                        hideTypingIndicator();
                        const response = `Muito prazer, ${userName}! 🤝\n\nComo posso estar lhe ajudando?`;
                        addBotMessage(response);
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

                // Humaniza a resposta ocasionalmente
                response = humanizeResponse(response, chatState.userName);

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
                `${chatState.userName}, está gostando da nossa conversa?\n\nSe quiser informações mais detalhadas ou uma proposta personalizada, posso te conectar com um dos nossos especialistas pelo WhatsApp.`,
                `${chatState.userName}, que tal falar com alguém da nossa equipe comercial?\n\nEles podem te dar informações mais específicas e tirar todas as suas dúvidas.`,
                `${chatState.userName}, se você quiser dar o próximo passo, nossos especialistas estão prontos pra te ajudar pelo WhatsApp.\n\nÉ só clicar no botão abaixo.`
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

        const message = `Olá, me chamo ${name}!\n\nConversei com a Estela e gostaria de mais informações sobre a Missão Código China!`;

        return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    }

    function formatMessage(text) {
        // Converte **texto** para negrito
        let formatted = escapeHtml(text)
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        return formatted;
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
