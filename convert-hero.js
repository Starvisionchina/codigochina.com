const sharp = require('sharp');
const fs = require('fs');

// Converter hero-background.jpg para WebP
const srcPath = './assets/images/hero/hero-background.jpg';
const destPath = './assets/images/hero/hero-background.webp';

sharp(srcPath)
    .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality: 80 })
    .toFile(destPath)
    .then(() => {
        const originalSize = fs.statSync(srcPath).size;
        const newSize = fs.statSync(destPath).size;
        console.log(`✅ hero-background.jpg convertido`);
        console.log(`   ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${((originalSize - newSize) / originalSize * 100).toFixed(1)}% economia)`);
    })
    .catch(err => console.error(`❌ Erro:`, err.message));
