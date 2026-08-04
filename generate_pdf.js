const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Lancement de Puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const filePath = `file:///${path.resolve(__dirname, 'cv.html').replace(/\\/g, '/')}`;
  console.log(`Chargement de la page: ${filePath}`);
  
  await page.setViewport({ width: 1100, height: 1555, deviceScaleFactor: 2 });
  
  await page.goto(filePath, { waitUntil: 'load', timeout: 60000 });
  
  const outputPath = path.resolve(__dirname, 'assets/CV MMI.pdf');
  console.log(`Génération du PDF vers: ${outputPath}`);
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    scale: 0.72 // 794 (A4 width) / 1100 (container width) = 0.72
  });
  
  await browser.close();
  console.log('PDF généré avec succès !');
})();
