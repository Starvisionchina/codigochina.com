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

    // Variações de expressões para tornar mais humano
    const EXPRESSIONS = {
        starters: ['Olha,', 'Sabe,', 'Então,', 'Ah,', 'Pois é,', ''],
        fillers: ['na verdade', 'sinceramente', 'te conto', 'olha só'],
        enthusiasm: ['Muito legal!', 'Que demais!', 'Adorei a pergunta!', 'Boa pergunta!', 'Excelente!'],
        transitions: ['E tem mais...', 'O legal é que...', 'Além disso...', 'Detalhe importante:'],
        closings: ['Me conta mais sobre você!', 'O que mais quer saber?', 'Posso ajudar com mais algo?', 'Ficou alguma dúvida?']
    };

    // Base de Conhecimento Completa e Humanizada
    const KNOWLEDGE_BASE = {
        // CANTON FAIR
        cantonFair: {
            geral: [
                "A Canton Fair é simplesmente a MAIOR feira de negócios do mundo! 🌍 Ela acontece duas vezes por ano em Guangzhou, na China. Imagina só: mais de 60 mil estandes e 280 mil compradores internacionais circulando! É de ficar impressionado!",
                "Te conto: a Canton Fair é o sonho de todo importador brasileiro! 🤩 Lá você encontra fornecedores de praticamente TUDO que existe. E não é exagero - são mais de 3.500 produtos inéditos lançados a cada edição!",
                "A Canton Fair é a maior e mais completa feira multissetorial do planeta! Sediada em Guangzhou, esse evento é o epicentro global para quem busca oportunidades de importação. Tem empresário que transforma completamente o negócio depois de ir lá!"
            ],
            tamanho: "Os números são impressionantes, olha só! 📊\n\n• Mais de 60 mil estandes\n• 280 mil compradores de todo o mundo\n• 3.500+ produtos inéditos por edição\n• 20x maior que a Expo São Paulo!\n\nÉ MUITA coisa pra ver em poucos dias - por isso ter um guia experiente faz toda diferença!",
            experiencia: "Participar da Canton Fair é uma experiência única, de verdade! 🎯 Você caminha por pavilhões gigantescos, conhece fornecedores cara a cara, testa produtos na hora e negocia direto com as fábricas. É completamente diferente de ficar só pesquisando pela internet!",
            porqueIr: "Por que ir à Canton Fair? Deixa eu te contar! 🚀\n\n1️⃣ Negociar DIRETO com fabricantes (os melhores preços!)\n2️⃣ Ver e testar produtos pessoalmente\n3️⃣ Descobrir lançamentos antes da concorrência\n4️⃣ Criar relacionamentos duradouros\n5️⃣ Entender a cultura de negócios chinesa\n\nMuitos empresários dizem que é uma experiência que muda a visão de negócios!",
            local: "A feira acontece no Canton Fair Complex, em Guangzhou (também conhecida como Cantão), no sul da China! 📍 É um complexo ENORME - 20 vezes maior que a Expo São Paulo!\n\nO endereço é: Canton Fair Complex, Guangdong Province, Guangzhou, China.\n\nGuangzhou é uma cidade incrível, moderna e cheia de história!"
        },

        // DATAS E FASES
        datas: {
            proxima: "A próxima edição da Canton Fair será em Abril de 2026! 📅\n\nA Missão Código China acontece de 10 de Abril a 4 de Maio.\n\nAs fases da feira são:\n• Fase 1: 15-19 de Abril\n• Fase 2: 23-27 de Abril  \n• Fase 3: 31 de Abril - 4 de Maio\n\nCada fase foca em setores diferentes da indústria!",
            fase1: "A Fase 1 (15-19 de Abril) é focada em tecnologia e indústria! 🔌\n\nVocê encontra:\n• Eletrônicos e eletrodomésticos\n• Produtos de TI e tecnologia\n• Máquinas industriais e automação\n• Veículos e mobilidade inteligente\n• Iluminação e energia solar\n• Ferramentas e hardware\n• Pavilhão internacional\n\nSe você trabalha com tecnologia, essa fase é imperdível!",
            fase2: "A Fase 2 (23-27 de Abril) é o paraíso da decoração e casa! 🏠\n\nTem de tudo:\n• Cerâmicas e utensílios de cozinha\n• Vidros artísticos e decoração\n• Presentes e relógios\n• Materiais de construção\n• Mobiliário\n• Produtos de jardim\n• Pavilhão internacional\n\nÉ uma fase lindíssima, cheia de inspiração!",
            fase3: "A Fase 3 (31 de Abril - 4 de Maio) é o mundo da moda e lifestyle! 👗\n\nEncontra-se:\n• Brinquedos e produtos infantis\n• Moda masculina e feminina\n• Roupas esportivas e acessórios\n• Têxteis para casa\n• Papelaria e escritório\n• Alimentos e produtos de saúde\n• Especialidades chinesas\n\nPerfeita pra quem trabalha com varejo!",
            fases: "A Canton Fair é dividida em 3 fases incríveis! 📅\n\n🔌 **Fase 1** (15-19 Abril): Eletrônicos, tecnologia, máquinas\n🏠 **Fase 2** (23-27 Abril): Casa, decoração, mobiliário\n👗 **Fase 3** (31 Abril - 4 Maio): Moda, brinquedos, lifestyle\n\nQual fase combina mais com o seu negócio? Me conta que eu te explico melhor!"
        },

        // STARVISION
        starvision: {
            sobre: "A Starvision nasceu da paixão por conectar o Brasil à China! 🤝 São mais de 20 anos ajudando empresários brasileiros a importar, exportar e fazer negócios na Ásia.\n\nO CEO, Rodrigo Lima, já participou de 18 edições da Canton Fair e auditou mais de 300 fábricas! É muita experiência acumulada que agora ele compartilha com você!",
            experiencia: "A Starvision tem mais de 20 anos de expertise em negócios com a China! 📈\n\nNesse tempo, já apoiamos clientes em importações que superam US$ 100 milhões no total. É uma trajetória construída com muito trabalho e resultados concretos!",
            missao: "A Missão Código China é nossa imersão completa na Canton Fair! ✈️\n\nNão é só uma viagem - é uma experiência de transformação! Você vai preparado, acompanhado e com todo suporte para fazer negócios de verdade.\n\nComeça com workshops online, passa pela experiência presencial na China, e continua com suporte pós-viagem!"
        },

        // LÍDERES DA MISSÃO
        lideres: {
            rodrigo: "**Rodrigo Lima Fernandes** é o CEO da Starvision e um dos maiores especialistas em negócios Brasil-China! 👨‍💼\n\n• 20+ anos de experiência prática\n• 18 edições da Canton Fair participadas\n• 300+ fábricas auditadas\n• US$ 100 milhões em importações apoiadas\n\nEle começou em 2006, quando foi pra China sem Google Tradutor, GPS e smartphones! Hoje lidera a missão com um objetivo: ajudar empresários brasileiros a acessar oportunidades reais no maior mercado do mundo.",
            antonio: "**Antonio Fogaça** é Mestre em Escalar Negócios e Internacionalizar Marcas! 🚀\n\nA trajetória dele é incrível:\n• Começou vendendo geladinhos quando jovem\n• Aos 17 foi pros EUA estudar Comércio Exterior\n• Fundou sua primeira empresa de importação\n• Aos 21 já mentorava empresários\n• Hoje fatura 7 dígitos mensais!\n\nComo CEO da Sol & Energia, expandiu a empresa para vários estados e até pros Estados Unidos. Um especialista em alavancagem de empresas!",
            ambos: "A Missão é liderada por dois especialistas incríveis! 👨‍💼👨‍💼\n\n**Rodrigo Lima** - CEO da Starvision, 20+ anos de experiência, 18 edições da Canton Fair e 300+ fábricas auditadas.\n\n**Antonio Fogaça** - Mestre em escalar negócios, empreendedor há 25 anos, fatura 7 dígitos mensais.\n\nJuntos, eles trazem experiência prática e visão estratégica pra sua jornada empreendedora!"
        },

        // PACOTE E INCLUSO
        pacote: {
            completo: "O pacote da Missão Código China é super completo! ✨\n\n**Preparação:**\n• Workshops online de estratégia e negociação\n• Aulas de mandarim básico\n• Consultoria especializada\n• Kit exclusivo (agenda, mala, camiseta...)\n\n**Logística:**\n• Passagens aéreas internacionais\n• Hospedagem premium com café\n• Trem bala entre cidades\n• Ingressos para a Canton Fair\n\n**Suporte local:**\n• Tradutores profissionais\n• Consultores acompanhando\n• Experiências culturais\n• Jantar de networking",
            preparacao: "Antes de embarcar, você passa por uma preparação completa! 📚\n\n**Workshops Online:**\n• Estratégias de negociação\n• Como se comportar nos negócios chineses\n• Dicas sobre importação\n\n**Aulas de Mandarim:**\n• Introdução à língua\n• Frases práticas para negócios\n• Interação cultural\n\n**Consultoria:**\n• Orientação especializada\n• Análise do seu segmento\n• Preparação personalizada\n\nVocê chega na China PREPARADO!",
            logistica: "A logística é toda organizada pra você! ✈️\n\n• **Passagens aéreas** internacionais (ida e volta)\n• **Hospedagem premium** em hotéis de categoria superior com café da manhã\n• **Trem bala** entre as cidades (Hong Kong - Shenzhen - Guangzhou)\n• **Ingressos** garantidos para a Canton Fair\n• **Certificado** oficial da Missão Código China\n\nTudo incluso, sem preocupação!",
            suporte: "Durante a feira você tem suporte total! 🛤️\n\n**Visita Orientada:**\nConsultores especializados te guiam pelo gigantesco centro de convenções.\n\n**Suporte Linguístico:**\nTradutores profissionais (mandarim e inglês) nas negociações.\n\n**Análise de Fornecedores:**\nAjudamos a verificar credenciais e confiabilidade.\n\n**Consolidação Diária:**\nReunião em grupo pra compartilhar descobertas e planejar!\n\nVocê nunca está sozinho!"
        },

        // OBJETIVOS DA MISSÃO
        objetivos: {
            geral: "Os objetivos da Missão são transformadores! 🎯\n\n**Networking Global:**\nConexão direta com fornecedores internacionais.\n\n**Imersão Cultural:**\nAprender sobre cultura e práticas comerciais chinesas.\n\n**Tendências de Mercado:**\nDescobrir novidades tecnológicas e oportunidades.\n\n**Crescimento Estratégico:**\nAumentar margem, criar marca própria, inovar!\n\nÉ uma experiência completa de transformação empresarial!",
            networking: "O networking na Canton Fair é INCRÍVEL! 🌐 Imagina você cercado por mais de 280 mil compradores de todo o mundo e milhares de fornecedores!\n\nVocê faz contatos que podem mudar completamente seu negócio. E ainda tem o jantar de networking com fornecedores selecionados!",
            crescimento: "A Missão é projetada pro seu crescimento! 📈\n\n• Aumentar margens de lucro\n• Fortalecer competitividade\n• Criar marca própria\n• Reduzir dependência de intermediários\n• Abrir espaço pra inovação\n\nMuitos empresários transformam seus negócios depois de participar!"
        },

        // SERVIÇOS DURANTE A FEIRA
        servicos: {
            feira: "Durante a Canton Fair você terá suporte estratégico completo! 🧭\n\n**Visita Orientada:**\nConsultores especializados em sourcing internacional te guiam pelo pavilhão.\n\n**Suporte Linguístico:**\nTradutores profissionais facilitam a comunicação técnica e comercial.\n\n**Análise de Fornecedores:**\nVerificação de credenciais e capacidade produtiva.\n\n**Consolidação do Dia:**\nReunião em grupo pra compartilhar descobertas e planejar os próximos dias!",
            tradutor: "Não precisa se preocupar com o idioma! 🗣️\n\nNossos tradutores profissionais te acompanham nas negociações. São especializados em:\n• Mandarim\n• Inglês\n• Terminologia técnica e comercial\n\nAlém disso, antes da viagem você tem aulas de mandarim básico pra situações do dia a dia!",
            analise: "Fazemos análise completa dos fornecedores! 🔍\n\nAjudamos a verificar:\n• Credenciais da empresa\n• Capacidade produtiva\n• Confiabilidade\n• Histórico de exportação\n\nIsso reduz muito os riscos em futuras operações!"
        },

        // CHINA E CULTURA
        china: {
            cultura: "A cultura de negócios chinesa é fascinante! 🇨🇳\n\nO conceito de **Guanxi** (relacionamento pessoal) é muito valorizado. Por isso fazemos:\n• Jantares de networking\n• Imersões culturais\n• Visitas guiadas às cidades\n\nEntender a cultura faz toda diferença nas negociações!",
            seguranca: "A China é muito segura para turistas de negócios! 🔒\n\nGuangzhou é uma cidade moderna, organizada e tranquila. Além disso, você estará sempre:\n• Acompanhado pela equipe Starvision\n• Com guias locais experientes\n• Em hotéis de categoria superior\n\nPode ir tranquilo!",
            cidades: "A Missão passa por 3 cidades incríveis! 🌆\n\n**Hong Kong:**\nMetrópole financeira, mistura de culturas.\n\n**Shenzhen:**\nA \"Silicon Valley\" da China, centro tecnológico.\n\n**Guangzhou:**\nOnde fica a Canton Fair, cidade histórica e comercial.\n\nViagem de trem bala entre elas - uma experiência à parte!"
        },

        // CONTATOS
        contato: {
            telefone: "Claro! 📞 Nosso telefone e WhatsApp é:\n\n**(51) 3103-1030**\n\nPode ligar ou mandar mensagem que nossa equipe vai te atender! Se preferir, posso te direcionar pra falar com um especialista agora mesmo! 😊",
            email: "Claro! 📧 Nosso email é:\n\n**contato@e-starvision.com**\n\nPode enviar sua mensagem que respondemos rapidinho! Mas se quiser uma resposta mais rápida, liga ou manda WhatsApp pro (51) 3103-1030! 😊",
            instagram: "Siga a Starvision no Instagram! 📸\n\n**@starvisionchina**\n\nLá compartilhamos conteúdo sobre importação, China e as experiências das nossas missões!",
            redes: "Nos siga nas redes sociais! 📱\n\n📸 Instagram: @starvisionchina\n📘 Facebook: StarVision Import Export\n📞 WhatsApp: (51) 3103-1030\n📧 Email: contato@e-starvision.com\n\nEstamos sempre compartilhando conteúdo útil!"
        },

        // VALORES E INVESTIMENTO
        valores: {
            resposta: "Ótima pergunta! 💬\n\nOs valores da Missão Código China são personalizados conforme:\n• Tipo de pacote escolhido\n• Opção de acomodação\n• Necessidades específicas do seu negócio\n\nPara te passar informações precisas e montar uma proposta sob medida, nosso time comercial precisa entender melhor seu perfil e objetivos.\n\nQue tal conversar com um especialista? Ele pode te explicar tudo em detalhes!"
        },

        // ESTATÍSTICAS
        estatisticas: {
            numeros: "Os números da Canton Fair impressionam! 📊\n\n• **+50 mil** expositores na edição de Abril/2026\n• **+20 anos** de expertise da Starvision\n• **+280 mil** compradores internacionais circulando\n• **+60 mil** estandes disponíveis\n• **+3.500** produtos inéditos por edição\n\nÉ simplesmente a maior feira do mundo!"
        }
    };

    // Padrões de intenção e respostas
    const INTENTIONS = [
        // SAUDAÇÕES
        {
            patterns: ['oi', 'olá', 'ola', 'hey', 'eai', 'e ai', 'bom dia', 'boa tarde', 'boa noite', 'oie', 'oii', 'opa', 'hello', 'hi'],
            response: () => {
                const greeting = getGreeting();
                return `${greeting}! 😊 Que bom te ver por aqui!\n\nEu sou a Estela, assistente virtual da Starvision. Estou aqui pra te ajudar com tudo sobre a Canton Fair e a Missão Código China!\n\nMe conta, o que você gostaria de saber?`;
            },
            isGreeting: true
        },

        // CONTATO - Telefone/WhatsApp
        {
            patterns: ['telefone', 'fone', 'ligar', 'whatsapp', 'whats', 'zap', 'número', 'numero', 'celular', 'contato telefone', 'qual o whatsapp', 'qual whatsapp', 'me passa o whatsapp', 'passa o whatsapp', 'qual o telefone', 'qual telefone', 'como falo', 'como contato'],
            response: () => KNOWLEDGE_BASE.contato.telefone
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
            patterns: ['quando', 'data', 'datas', 'abril', 'maio', 'quando acontece', 'quando é', 'período', 'periodo', 'próxima edição', 'proxima edicao'],
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
            response: () => KNOWLEDGE_BASE.pacote.completo
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
            response: () => KNOWLEDGE_BASE.servicos.feira
        },

        // SERVIÇOS - Tradutor
        {
            patterns: ['tradutor', 'tradução', 'traducao', 'idioma', 'língua', 'lingua', 'mandarim', 'chinês', 'chines', 'falar', 'comunicação', 'comunicacao', 'não falo', 'nao falo'],
            response: () => KNOWLEDGE_BASE.servicos.tradutor
        },

        // SERVIÇOS - Análise de Fornecedores
        {
            patterns: ['fornecedor', 'fornecedores', 'análise', 'analise', 'verificar', 'confiável', 'confiavel', 'seguro negociar'],
            response: () => KNOWLEDGE_BASE.servicos.analise
        },

        // OBJETIVOS
        {
            patterns: ['objetivo', 'objetivos', 'pra que serve', 'qual o propósito', 'qual o proposito', 'finalidade'],
            response: () => KNOWLEDGE_BASE.objetivos.geral
        },

        // NETWORKING
        {
            patterns: ['networking', 'contatos', 'conexões', 'conexoes', 'relacionamento', 'conhecer pessoas'],
            response: () => KNOWLEDGE_BASE.objetivos.networking
        },

        // CRESCIMENTO
        {
            patterns: ['crescer', 'crescimento', 'escalar', 'expandir', 'lucro', 'margem', 'marca própria'],
            response: () => KNOWLEDGE_BASE.objetivos.crescimento
        },

        // CULTURA CHINESA
        {
            patterns: ['cultura', 'cultural', 'costumes', 'guanxi', 'etiqueta', 'comportamento'],
            response: () => KNOWLEDGE_BASE.china.cultura
        },

        // SEGURANÇA
        {
            patterns: ['seguro', 'segurança', 'seguranca', 'perigoso', 'risco', 'medo', 'violência'],
            response: () => KNOWLEDGE_BASE.china.seguranca
        },

        // CIDADES
        {
            patterns: ['hong kong', 'shenzhen', 'cidades', 'roteiro', 'onde passa', 'visita'],
            response: () => KNOWLEDGE_BASE.china.cidades
        },

        // IMPORTAÇÃO/EXPORTAÇÃO
        {
            patterns: ['importar', 'importação', 'importacao', 'exportar', 'exportação', 'exportacao', 'comprar china', 'trazer produtos'],
            response: () => `A Starvision é especialista em importação e exportação! 📦\n\nDesde encontrar o fornecedor certo até a chegada do produto no Brasil, nossa equipe pode te ajudar em todo o processo.\n\nA Missão Código China é uma forma excelente de começar - você conhece os fornecedores pessoalmente e já começa a construir relacionamentos!\n\nQuer saber mais sobre como podemos te ajudar?`
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
            response: () => "Que maravilha! 🎉 Fico muito feliz com seu interesse!\n\nPara dar o próximo passo, nosso time de especialistas precisa conhecer melhor seu perfil empresarial e objetivos. Eles vão te ajudar com todas as informações, proposta personalizada e orientações!\n\nVamos te conectar pelo WhatsApp?",
            triggerWhatsApp: true
        },

        // CONFIRMAÇÕES POSITIVAS
        {
            patterns: ['sim', 'vamos', 'bora', 'pode ser', 'claro', 'com certeza', 'positivo', 'ok', 'quero sim', 'vamos lá'],
            response: () => "Perfeito! 👍\n\nVou te direcionar para um dos nossos especialistas. Eles estão prontos pra te ajudar com todas as informações e montar uma proposta sob medida pra você!",
            triggerWhatsApp: true
        },

        // AGRADECIMENTOS
        {
            patterns: ['obrigado', 'obrigada', 'valeu', 'vlw', 'thanks', 'agradeço', 'agradeco', 'muito obrigado'],
            response: () => "Imagina! 😊 Foi um prazer te ajudar!\n\nSe quiser informações mais detalhadas ou uma proposta personalizada, nossos especialistas estão à disposição pelo WhatsApp!\n\nPosso te conectar com eles?"
        },

        // DESPEDIDAS
        {
            patterns: ['tchau', 'adeus', 'até', 'ate', 'flw', 'falou', 'bye', 'até mais', 'xau'],
            response: () => "Até mais! 👋 Foi ótimo conversar com você!\n\nQuando quiser saber mais sobre a Canton Fair ou a Missão Código China, é só voltar aqui. Tô sempre por aqui!\n\nBons negócios! 🚀"
        },

        // DÚVIDAS GERAIS
        {
            patterns: ['dúvida', 'duvida', 'pergunta', 'saber mais', 'me conta', 'explica', 'como funciona', 'não entendi', 'nao entendi'],
            response: () => "Claro, estou aqui pra isso! 😊\n\nPosso te contar sobre:\n\n🌏 **Canton Fair** - a maior feira do mundo\n✈️ **Missão Código China** - nossa imersão completa\n📅 **Datas e Fases** - quando acontece cada etapa\n👨‍💼 **Quem lidera** - nossos especialistas\n📦 **O que inclui** - todo o pacote\n📞 **Contato** - telefone, WhatsApp, email\n\nQual tema te interessa mais?"
        },

        // NEGÓCIOS/EMPREENDEDORISMO
        {
            patterns: ['negócio', 'negocio', 'empreendedor', 'empresário', 'empresario', 'loja', 'comércio', 'comercio', 'minha empresa'],
            response: () => "Ah, você é empreendedor! 💼 Que incrível!\n\nA Canton Fair é O lugar pra quem quer alavancar seu negócio. Lá você encontra fornecedores, negocia direto com fábricas, vê tendências antes da concorrência... É transformador!\n\nQual é o seu ramo? Posso te indicar qual fase da feira é mais interessante pro seu negócio!"
        },

        // PRIMEIRA VEZ
        {
            patterns: ['primeira vez', 'nunca fui', 'iniciante', 'começo', 'comeco', 'novo nisso', 'nunca importei'],
            response: () => "Primeira vez pensando em ir à China? Que passo importante! 🌟\n\nA Missão Código China é PERFEITA pra você! Temos toda uma preparação antes da viagem:\n\n📚 Workshops de estratégia e negociação\n🗣️ Aulas de mandarim básico\n🤝 Orientação personalizada pro seu segmento\n\nE durante a feira você nunca fica sozinho - consultores e tradutores te acompanham em todo momento!\n\nZero estresse, total segurança! 😊"
        },

        // MEDO/INSEGURANÇA
        {
            patterns: ['medo', 'insegurança', 'inseguro', 'receio', 'preocupado', 'nervoso', 'apreensivo'],
            response: () => "Entendo perfeitamente! É normal ter um pouco de receio quando é uma experiência nova. 🤗\n\nMas olha só: a Starvision já levou centenas de empresários pra China, muitos na primeira viagem internacional de negócios deles!\n\n**Por que ficar tranquilo:**\n✅ Preparação completa antes de ir\n✅ Consultores experientes acompanhando\n✅ Tradutores profissionais\n✅ Hotéis de categoria superior\n✅ Suporte 24h durante toda a viagem\n\nVocê está em boas mãos! 😊"
        },

        // COMPARAÇÃO
        {
            patterns: ['diferença', 'diferente', 'comparado', 'melhor que', 'vantagem sobre', 'por que starvision', 'porque starvision'],
            response: () => "O que faz a Missão Código China especial? ⭐\n\n**Nossos diferenciais:**\n• 20+ anos de experiência no mercado\n• Preparação completa antes da viagem\n• Consultores que já fizeram 18+ edições\n• 300+ fábricas auditadas pelo CEO\n• Tradutores profissionais in loco\n• Análise de fornecedores\n• Networking com outros empresários BR\n• Suporte pós-viagem\n\nNão é só uma viagem turística - é uma experiência de transformação empresarial completa!"
        },

        // SITE/PÁGINA
        {
            patterns: ['site', 'página', 'pagina', 'onde vejo', 'mais informações', 'documentos', 'material'],
            response: () => "Você está no lugar certo! 🌐\n\nEste site (codigochina.com) tem todas as informações sobre a Missão!\n\nRolando a página você encontra:\n• Sobre a Canton Fair\n• As 3 fases da feira\n• Quem lidera a missão\n• Todo o pacote incluso\n• Formulário de contato\n\nMas se preferir, posso te explicar qualquer parte aqui no chat! O que quer saber?"
        }
    ];

    // Respostas padrão mais humanizadas
    const DEFAULT_RESPONSES = [
        "Hmm, deixa eu pensar... 🤔 Não tenho certeza se entendi direitinho sua pergunta! Minha especialidade é falar sobre a Canton Fair e a Missão Código China.\n\nQuer saber sobre datas, o que está incluso, ou como funciona a feira?",
        "Essa é uma boa pergunta! Mas confesso que foge um pouquinho do meu conhecimento. 😅\n\nSobre a Canton Fair e nossa Missão, posso te ajudar com tudo! O que você gostaria de saber?",
        "Olha, sobre isso específico talvez um dos nossos especialistas possa te ajudar melhor! 💬\n\nMas se quiser saber sobre a Canton Fair, datas da próxima edição, ou o que inclui nosso pacote, estou por aqui!",
        "Não tenho essa informação na ponta da língua... 🙈 Mas posso te ajudar muito com tudo sobre Canton Fair e Missão Código China!\n\nMe conta: qual seu interesse principal?"
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
                    const welcomeMessage = `${greeting}! 😊 Bem-vindo à Starvision!\n\nEu sou a Estela, sua assistente virtual. Estou aqui pra te ajudar com tudo sobre a Canton Fair e a Missão Código China!\n\nPrimeiro, como posso te chamar?`;
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

        // Procura a melhor correspondência
        let bestMatch = null;
        let bestScore = 0;

        for (const intention of INTENTIONS) {
            for (const pattern of intention.patterns) {
                if (normalizedMessage.includes(pattern)) {
                    // Prioriza padrões mais longos (mais específicos)
                    if (pattern.length > bestScore) {
                        bestScore = pattern.length;
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
                            `Prazer em te conhecer, ${userName}! 🤝\n\nE aí, como posso te ajudar hoje? Quer saber sobre a Canton Fair, a Missão Código China, ou já tem alguma dúvida específica?`,
                            `Que nome bonito, ${userName}! 😊\n\nMe conta: você já conhece a Canton Fair ou é a primeira vez que ouve falar dela?`,
                            `Olá, ${userName}! É um prazer! ✨\n\nEstou aqui pra te ajudar com tudo sobre a maior feira de negócios do mundo! O que te traz aqui hoje?`,
                            `Legal te conhecer, ${userName}! 🙌\n\nSobre o que gostaria de conversar? Canton Fair, a Missão, datas, o que inclui... Só me falar!`
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
                `${chatState.userName}, está gostando da nossa conversa? 😊\n\nSe quiser informações mais detalhadas ou uma proposta personalizada, posso te conectar com um dos nossos especialistas pelo WhatsApp!`,
                `Ei ${chatState.userName}! Que tal falar com alguém da nossa equipe comercial? 💬\n\nEles podem te dar informações mais específicas e tirar todas as suas dúvidas!`,
                `${chatState.userName}, olha só: se você quiser dar o próximo passo, nossos especialistas estão prontos pra te ajudar pelo WhatsApp! 🚀\n\nÉ só clicar no botão abaixo!`
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
            message += `\n\n[Assuntos: ${topics.substring(0, 100)}]`;
        }

        message += `\n\n[Origem: codigochina.com]`;

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
