import React from 'react';
import { Helmet } from 'react-helmet-async';
import { getOpenGraphTags, getTwitterCardTags } from '../data/socialMetaData';

/**
 * Composant SEOHelmet pour gérer les méta-données SEO et le partage social
 * @param {Object} props - Propriétés du composant
 * @param {string} props.title - Titre de la page
 * @param {string} props.description - Description de la page
 * @param {string} props.canonicalUrl - URL canonique de la page
 * @param {string} props.imageUrl - URL de l'image pour le partage social
 * @param {string} props.type - Type de contenu (website, article, etc.)
 * @param {Object} props.schema - Données structurées Schema.org au format JSON-LD
 */
const SEOHelmet = ({ 
  title, 
  description, 
  canonicalUrl = window.location.href, 
  imageUrl = '/assets/images/profile.jpg',
  type = 'website',
  schema = null
}) => {
  // URL de base du site
  const siteUrl = 'https://elhadji-dieng.com';
  
  // Nom complet pour les titres - si le titre contient déjà le nom, on ne l'ajoute pas
  const fullTitle = title.includes('El Hadji Dieng') ? title : `${title} | El Hadji Dieng - Développeur Web Dakar`;
  
  // Construction de l'URL complète pour l'image
  const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`;
  
  // URL canonique complète
  const fullCanonicalUrl = canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`;
  
  // Préparation des données pour les métadonnées sociales
  const pageData = {
    title: fullTitle,
    description,
    imageUrl,
    type
  };
  
  // Génération des tags Open Graph et Twitter Card
  const ogTags = getOpenGraphTags(pageData, fullCanonicalUrl);
  const twitterTags = getTwitterCardTags(pageData);
  
  return (
    <Helmet>
      {/* Méta tags de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonicalUrl} />
      <meta name="author" content="El Hadji Dieng" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#1a237e" />
      <meta name="language" content="fr" />
      <meta name="geo.region" content="SN" />
      <meta name="geo.placename" content="Dakar" />
      
      {/* Open Graph pour Facebook, LinkedIn, etc. */}
      {Object.entries(ogTags).map(([property, content]) => (
        <meta key={property} property={property} content={content} />
      ))}
      
      {/* Twitter Card */}
      {Object.entries(twitterTags).map(([name, content]) => (
        <meta key={name} name={name} content={content} />
      ))}
      
      {/* Liens vers les profils sociaux pour améliorer le SEO */}
      <link rel="me" href="https://www.linkedin.com/in/bambiste4/" />
      <link rel="me" href="https://github.com/eldieng/" />
      
      {/* Schema.org JSON-LD pour les données structurées */}
      {schema && Array.isArray(schema) ? (
        schema.map((s, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))
      ) : schema ? (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ) : null}
      
      {/* Liens vers les ressources importantes */}
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
};

export default SEOHelmet;
