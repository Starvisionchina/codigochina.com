const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const assetsDir = './assets/images';

// Lista de imagens a converter e suas configurações
const imagesToConvert = [
    // Hero e backgrounds (máx 1920px, qualidade 80%)
    { src: 'hero/hero-background.png', maxWidth: 1920, quality: 80 },
    { src: 'team/team-background.png', maxWidth: 1920, quality: 80 },

    // Fotos dos speakers (máx 600px, qualidade 85%)
    { src: 'speakers/foto-antonio-fogaca.jpg', maxWidth: 600, quality: 85 },
    { src: 'speakers/foto-rodrigo-lima.jpg', maxWidth: 600, quality: 85 },

    // Cards (máx 800px, qualidade 85%)
    { src: 'incluso/card-logistica.png', maxWidth: 800, quality: 85 },
    { src: 'incluso/card-preparacao.png', maxWidth: 800, quality: 85 },
    { src: 'incluso/card-suporte.png', maxWidth: 800, quality: 85 },

    // Fases (máx 800px, qualidade 85%)
    { src: 'phases/fase-1.png', maxWidth: 800, quality: 85 },
    { src: 'phases/fase-2.png', maxWidth: 800, quality: 85 },
    { src: 'phases/fase-3.png', maxWidth: 800, quality: 85 },

    // Foto evento (máx 800px, qualidade 85%)
    { src: 'about/foto-evento-canton.png', maxWidth: 800, quality: 85 },

    // Ícones grandes (máx 300px, qualidade 90%)
    { src: 'stats/icon-20anos.png', maxWidth: 300, quality: 90 },
    { src: 'stats/icon-50mil.png', maxWidth: 300, quality: 90 },
    { src: 'stats/icon-flor.png', maxWidth: 300, quality: 90 },

    // Ícones de serviços e missão (máx 200px, qualidade 90%)
    { src: 'services/icon-analise.png', maxWidth: 200, quality: 90 },
    { src: 'services/icon-consolidacao.png', maxWidth: 200, quality: 90 },
    { src: 'services/icon-suporte.png', maxWidth: 200, quality: 90 },
    { src: 'services/icon-visita.png', maxWidth: 200, quality: 90 },
    { src: 'mission/icon-networking.png', maxWidth: 200, quality: 90 },
    { src: 'mission/icon-culture.png', maxWidth: 200, quality: 90 },
    { src: 'mission/icon-ai.png', maxWidth: 200, quality: 90 },
    { src: 'mission/icon-growth.png', maxWidth: 200, quality: 90 },

    // Ícones de about (máx 100px, qualidade 90%)
    { src: 'about/icon-calendar.png', maxWidth: 100, quality: 90 },
    { src: 'about/icon-location.png', maxWidth: 100, quality: 90 },

    // Logos (manter tamanho, qualidade 90%)
    { src: 'hero/logo-missao-china.png', maxWidth: 500, quality: 90 },
    { src: 'header/logo-starvision.png', maxWidth: 300, quality: 90 },
    { src: 'team/logo-starvision-team.png', maxWidth: 400, quality: 90 },

    // Jornada poster
    { src: 'jornada/video-poster.png', maxWidth: 800, quality: 85 },
];

async function convertImage(config) {
    const srcPath = path.join(assetsDir, config.src);
    const destPath = srcPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    if (!fs.existsSync(srcPath)) {
        console.log(`⚠️ Não encontrado: ${srcPath}`);
        return null;
    }

    try {
        const originalSize = fs.statSync(srcPath).size;

        await sharp(srcPath)
            .resize(config.maxWidth, null, {
                withoutEnlargement: true,
                fit: 'inside'
            })
            .webp({ quality: config.quality })
            .toFile(destPath);

        const newSize = fs.statSync(destPath).size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`✅ ${config.src}`);
        console.log(`   ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${savings}% economia)`);

        return { original: originalSize, new: newSize };
    } catch (err) {
        console.error(`❌ Erro em ${config.src}:`, err.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Iniciando conversão de imagens para WebP...\n');

    let totalOriginal = 0;
    let totalNew = 0;

    for (const config of imagesToConvert) {
        const result = await convertImage(config);
        if (result) {
            totalOriginal += result.original;
            totalNew += result.new;
        }
    }

    console.log('\n========================================');
    console.log(`📊 RESULTADO FINAL:`);
    console.log(`   Original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Otimizado: ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Economia: ${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)} MB (${((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1)}%)`);
    console.log('========================================');
}

main();
