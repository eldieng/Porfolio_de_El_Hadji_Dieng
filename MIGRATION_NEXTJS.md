# Guide de Migration vers Next.js

Ce document décrit les étapes pour migrer le portfolio vers Next.js afin d'implémenter le Server-Side Rendering (SSR) et la Static Site Generation (SSG).

## Avantages de Next.js

- **Amélioration du SEO** : Le rendu côté serveur permet aux moteurs de recherche d'indexer facilement votre contenu
- **Meilleures performances** : Chargement initial plus rapide et meilleure expérience utilisateur
- **Génération statique** : Possibilité de pré-générer les pages au moment de la compilation
- **Optimisation automatique des images** : Conversion automatique en WebP, redimensionnement, etc.

## Structure du projet

```
/pages
  /index.js         # Page d'accueil (équivalent à HomePage.js)
  /blog/index.js    # Page de liste des articles
  /blog/[slug].js   # Page d'article individuel (route dynamique)
  /projets.js       # Page des projets
  /contact.js       # Page de contact
  /a-propos.js      # Page à propos
  /_app.js          # Composant racine pour la configuration globale
  /_document.js     # Personnalisation du document HTML

/components         # Vos composants React actuels
/public             # Actifs statiques (images, etc.)
/styles             # Styles globaux et thèmes
/lib                # Fonctions utilitaires
/data               # Données statiques (blogData.js, projectsData.js, etc.)
```

## Étapes de migration

### 1. Configuration initiale

- Installer Next.js et ses dépendances
- Configurer les variables d'environnement
- Mettre à jour les scripts dans package.json

### 2. Migration des composants

- Adapter les composants React existants pour Next.js
- Remplacer react-router-dom par le système de routage de Next.js
- Adapter les imports et les chemins de fichiers

### 3. Implémentation du SSR/SSG

#### Pour le blog

```javascript
// pages/blog/[slug].js
export async function getStaticPaths() {
  // Récupérer tous les slugs des articles
  const slugs = blogPosts.map(post => ({ params: { slug: post.slug } }));
  return {
    paths: slugs,
    fallback: false // ou 'blocking' pour générer de nouvelles pages à la demande
  };
}

export async function getStaticProps({ params }) {
  // Récupérer les données de l'article par slug
  const post = getBlogPostBySlug(params.slug);
  return {
    props: { post },
    // Régénérer la page toutes les 24 heures
    revalidate: 86400
  };
}
```

#### Pour la page d'accueil

```javascript
// pages/index.js
export async function getStaticProps() {
  const recentPosts = getRecentBlogPosts(3);
  const featuredProjects = getFeaturedProjects();
  
  return {
    props: {
      recentPosts,
      featuredProjects
    },
    revalidate: 86400
  };
}
```

### 4. Optimisation des images

Utiliser le composant Image de Next.js pour l'optimisation automatique :

```javascript
import Image from 'next/image';

// Au lieu de <img src="..." />
<Image 
  src="/assets/images/Blog/article.jpg"
  alt="Description"
  width={800}
  height={600}
  placeholder="blur"
  quality={80}
/>
```

### 5. Mise à jour du SEO

Remplacer react-helmet-async par next/head :

```javascript
import Head from 'next/head';

// Dans votre composant
<Head>
  <title>El Hadji Dieng - Portfolio</title>
  <meta name="description" content="..." />
  <script type="application/ld+json">
    {JSON.stringify(structuredData)}
  </script>
</Head>
```

## Déploiement

Next.js peut être déployé sur Vercel (recommandé), Netlify, ou tout autre service compatible :

```bash
npm install -g vercel
vercel
```

## Ressources utiles

- [Documentation officielle Next.js](https://nextjs.org/docs)
- [Tutoriel de migration React vers Next.js](https://nextjs.org/docs/migrating/from-react)
- [Optimisation des images avec Next.js](https://nextjs.org/docs/basic-features/image-optimization)
