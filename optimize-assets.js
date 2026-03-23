const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const assetsDir = './assets';
const outputDir = './assets/optimized';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(assetsDir);

async function optimize() {
    console.log('--- Démarrage de l\'optimisation des assets ---');
    
    for (const file of files) {
        const filePath = path.join(assetsDir, file);
        const ext = path.extname(file).toLowerCase();
        
        // Optimisation des IMAGES (PNG, JPG -> WebP)
        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            const outputFileName = file.replace(ext, '.webp');
            const outputPath = path.join(outputDir, outputFileName);
            
            if (!fs.existsSync(outputPath)) {
                await sharp(filePath)
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`[Image] ${file} -> ${outputFileName} (OK)`);
            }
        }
    }
    console.log('--- Optimisation terminée ---');
    console.log('Les fichiers optimisés se trouvent dans assets/optimized/');
}

optimize().catch(console.error);
