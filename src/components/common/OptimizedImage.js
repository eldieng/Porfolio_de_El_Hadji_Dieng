import React from 'react';
import styled from 'styled-components';

/**
 * Composant d'image optimisé qui utilise AVIF et WebP avec fallback
 * @param {Object} props - Propriétés du composant
 * @param {string} props.src - Chemin de l'image source (jpg/png)
 * @param {string} props.alt - Texte alternatif pour l'image
 * @param {string} props.className - Classes CSS optionnelles
 * @param {Object} props.style - Styles inline optionnels
 * @param {boolean} props.lazy - Activer le lazy loading (par défaut: true)
 * @param {string} props.objectFit - Style d'ajustement de l'image (cover, contain, etc.)
 * @param {number} props.quality - Qualité de l'image WebP (0-100)
 * @param {boolean} props.avif - Activer le format AVIF (par défaut: true)
 */
const OptimizedImage = ({
  src,
  alt,
  className,
  style,
  lazy = true,
  objectFit = 'cover',
  quality = 80,
  avif = true,
  width,
  height,
  ...props
}) => {
  // Créer les chemins pour les formats optimisés
  const baseExt = src.replace(/\.(jpe?g|png)$/i, '');
  const webpSrc = `${baseExt}.webp`;
  const avifSrc = `${baseExt}.avif`;
  
  // Déterminer si l'image est dans un sous-dossier spécifique
  const isInSubfolder = src.includes('/Blog/') || src.includes('/projects/') || src.includes('/team/');
  
  // Construire les chemins pour les formats optimisés selon l'emplacement
  const webpPath = isInSubfolder 
    ? webpSrc.replace(/(\/[^/]+\/)/g, '$1webp/') 
    : webpSrc;
    
  const avifPath = isInSubfolder 
    ? avifSrc.replace(/(\/[^/]+\/)/g, '$1avif/') 
    : avifSrc;
  
  return (
    <picture className={className} style={style}>
      {avif && <source srcSet={avifPath} type="image/avif" />}
      <source srcSet={webpPath} type="image/webp" />
      <StyledImg 
        src={src} 
        alt={alt || ''} 
        loading={lazy ? 'lazy' : undefined}
        decoding="async"
        width={width}
        height={height}
        style={{ objectFit, ...style }}
        {...props}
      />
    </picture>
  );
};

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
`;

export default OptimizedImage;
