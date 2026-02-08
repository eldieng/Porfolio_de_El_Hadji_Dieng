/**
 * Configuration des métadonnées pour les partages sociaux
 * Open Graph et Twitter Cards
 */

const socialMetaData = {
  defaultImage: '/assets/images/profile.jpg', // Image par défaut pour les partages
  siteName: 'El Hadji Dieng - Développeur Front-End | Webmaster | Designer UI/UX',
  twitterUsername: '@bambiste4',
  defaultLocale: 'fr_FR',
  themeColor: '#1a237e', // Couleur principale du site
};

/**
 * Génère les balises Open Graph pour une page
 * @param {Object} pageData - Données de la page (titre, description, image)
 * @param {string} url - URL complète de la page
 * @returns {Object} - Métadonnées Open Graph
 */
export const getOpenGraphTags = (pageData, url) => {
  const image = pageData.imageUrl || socialMetaData.defaultImage;
  
  return {
    'og:title': pageData.title,
    'og:description': pageData.description,
    'og:image': image.startsWith('http') ? image : `https://elhadji-dieng.com${image}`,
    'og:url': url,
    'og:type': pageData.type || 'website',
    'og:site_name': socialMetaData.siteName,
    'og:locale': socialMetaData.defaultLocale,
  };
};

/**
 * Génère les balises Twitter Card pour une page
 * @param {Object} pageData - Données de la page (titre, description, image)
 * @returns {Object} - Métadonnées Twitter Card
 */
export const getTwitterCardTags = (pageData) => {
  const image = pageData.imageUrl || socialMetaData.defaultImage;
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': socialMetaData.twitterUsername,
    'twitter:creator': socialMetaData.twitterUsername,
    'twitter:title': pageData.title,
    'twitter:description': pageData.description,
    'twitter:image': image.startsWith('http') ? image : `https://elhadji-dieng.com${image}`,
  };
};

export default socialMetaData;
