const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const path = require('path');
const fs = require('fs');

/**
 * Convertit les images d'un répertoire en format WebP
 * @param {string} sourceDir - Répertoire source des images
 * @param {string} destDir - Répertoire de destination pour les WebP
 */
async function convertDirectoryToWebP(sourceDir, destDir) {
  console.log(`Processing directory: ${sourceDir}`);
  
  // Créer le répertoire de destination s'il n'existe pas
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Obtenir la liste des fichiers et dossiers
  const items = fs.readdirSync(sourceDir);
  
  for (const item of items) {
    const sourcePath = path.join(sourceDir, item);
    const stats = fs.statSync(sourcePath);
    
    // Si c'est un dossier, traiter récursivement
    if (stats.isDirectory() && item !== 'webp') {
      const nestedDestDir = path.join(destDir, item);
      await convertDirectoryToWebP(sourcePath, nestedDestDir);
    } 
    // Si c'est une image, la convertir
    else if (stats.isFile() && /\.(jpe?g|png)$/i.test(item)) {
      const fileName = path.parse(item).name;
      const destPath = path.join(destDir, `${fileName}.webp`);
      
      await imagemin([sourcePath], {
        destination: destDir,
        plugins: [
          imageminWebp({
            quality: 80,  // Ajustez selon vos besoins (0-100)
            method: 6     // 0 (rapide) à 6 (meilleure compression)
          })
        ]
      });
      
      // Renommer le fichier de sortie si nécessaire
      const outputFile = path.join(destDir, path.basename(sourcePath).replace(/\.(jpe?g|png)$/i, '.webp'));
      if (fs.existsSync(outputFile) && outputFile !== destPath) {
        fs.renameSync(outputFile, destPath);
      }
      
      console.log(`Converted: ${item} → ${path.basename(destPath)}`);
    }
  }
}

(async () => {
  console.log('Starting image conversion to WebP format...');
  
  // Répertoire racine des images
  const imagesRoot = path.join(__dirname, '../public/assets/images');
  const webpRoot = path.join(__dirname, '../public/assets/images');
  
  // Convertir toutes les images
  await convertDirectoryToWebP(imagesRoot, webpRoot);
  
  console.log('All conversions completed!');
})();
