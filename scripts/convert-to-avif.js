const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

/**
 * Convertit les images d'un répertoire en format AVIF
 * @param {string} sourceDir - Répertoire source des images
 * @param {string} destDir - Répertoire de destination pour les AVIF
 */
async function convertDirectoryToAVIF(sourceDir, destDir) {
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
    if (stats.isDirectory() && item !== 'webp' && item !== 'avif') {
      const nestedDestDir = path.join(destDir, item);
      await convertDirectoryToAVIF(sourcePath, nestedDestDir);
    } 
    // Si c'est une image, la convertir
    else if (stats.isFile() && /\.(jpe?g|png)$/i.test(item)) {
      const fileName = path.parse(item).name;
      const destPath = path.join(destDir, `${fileName}.avif`);
      
      try {
        await sharp(sourcePath)
          .avif({
            quality: 65,  // Qualité AVIF (0-100)
            effort: 7     // Niveau d'effort de compression (0-9)
          })
          .toFile(destPath);
        
        console.log(`Converted: ${item} → ${path.basename(destPath)}`);
      } catch (error) {
        console.error(`Error converting ${item}: ${error.message}`);
      }
    }
  }
}

(async () => {
  console.log('Starting image conversion to AVIF format...');
  
  // Répertoire racine des images
  const imagesRoot = path.join(__dirname, '../public/assets/images');
  const avifRoot = path.join(__dirname, '../public/assets/images');
  
  // Convertir toutes les images
  await convertDirectoryToAVIF(imagesRoot, avifRoot);
  
  console.log('All AVIF conversions completed!');
})();
