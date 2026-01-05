# Missão Código China 2026 - Site

## Diretrizes de Desenvolvimento

### 🎯 Performance
- Otimizar todas as imagens antes de usar (WebP quando possível)
- Usar lazy loading para imagens abaixo do fold
- Minificar CSS e JS em produção
- Evitar bibliotecas pesadas desnecessárias

### 🔍 SEO
- **Alt Text**: TODAS as imagens devem ter atributo `alt` descritivo
- **Title**: Elementos interativos devem ter atributo `title`
- **Heading Hierarchy**: Usar apenas um `<h1>` por página
- **Semantic HTML**: Usar tags semânticas (`<header>`, `<main>`, `<section>`, `<footer>`)
- **Meta Tags**: Descrição, keywords, Open Graph, Twitter Cards
- **Idioma**: Definir `lang="pt-BR"` no HTML

### 📊 Analytics (A ser implementado)
- Google Analytics será adicionado posteriormente
- Todos os botões terão eventos de rastreamento
- CTAs principais terão métricas específicas

### 📁 Estrutura de Assets
```
assets/
├── fonts/
│   ├── AgrandirGrand-Bold.woff2    # Fonte para títulos (bold)
│   ├── AgrandirGrand-Bold.woff
│   ├── AgrandirGrand-Heavy.woff2   # Fonte para títulos (heavy)
│   └── AgrandirGrand-Heavy.woff
├── images/
│   ├── logo-starvision.png         # Logo da empresa
│   ├── logo-missao-china.png       # Logo Missão + Cavalo
│   └── hero-background.jpg         # Imagem de fundo da hero
└── videos/
    └── (vídeos futuros)
```

### 🔤 Tipografia
- **Títulos**: Agrandir Grand (fonte local - colocar arquivos em assets/fonts/)
- **Corpo/Texto**: Open Sans (Google Fonts - já configurado)

### 🎨 Paleta de Cores
- Vermelho Principal: `#C41E3A` (gradiente top)
- Preto: `#000000` (gradiente bottom)
- Branco: `#FFFFFF` (textos)
- Cinza Placeholder: `#666666`

### 📱 Responsividade
- Mobile First approach
- Breakpoints: 768px (tablet), 1024px (desktop)
