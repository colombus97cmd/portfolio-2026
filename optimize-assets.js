const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { exec } = require('child_process');

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

        // Optimisation des VIDÉOS (MP4 -> MP4 compressé via FFmpeg)
        if (ext === '.mp4') {
            const outputFileName = file.replace(ext, '-optimized.mp4');
            const outputPath = path.join(outputDir, outputFileName);

            if (!fs.existsSync(outputPath)) {
                console.log(`[Vidéo] Optimisation de ${file} en cours...`);
                // Commande FFmpeg : Réduit la résolution (max 720p) et compresse avec CRF 28
                const command = `ffmpeg -i "${filePath}" -vcodec libx264 -crf 28 -preset fast -filter:v scale=-2:720 -acodec aac -b:a 128k "${outputPath}"`;
                
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`[Erreur Vidéo] Impossible d'optimiser ${file}. Assurez-vous que FFmpeg est installé.`);
                        return;
                    }
                    console.log(`[Vidéo] ${file} -> ${outputFileName} (OK)`);
                });
            }
        }
    }
}

optimize().catch(console.error);
