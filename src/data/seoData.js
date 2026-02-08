/**
 * Données SEO pour chaque page du site
 * Contient les méta-descriptions, titres et données structurées Schema.org
 */

// Données de base pour le profil
const baseProfileData = {
  name: "El Hadji Dieng",
  jobTitle: "Développeur Front-End | Webmaster | Designer UI/UX",
  image: "/assets/images/profile.jpg",
  sameAs: [
    "https://www.linkedin.com/in/bambiste4/",
    "https://github.com/eldieng/",
    "https://www.instagram.com/elbambiste04",
    "https://www.facebook.com/share/16c2u9cioC/",
    "https://www.tiktok.com/@bambiste4"
  ],
  address: {
    addressLocality: "Dakar",
    addressRegion: "Parcelle Assainie U8",
    addressCountry: "Sénégal"
  },
  email: "el.elhadji.dieng@gmail.com",
  telephone: "+221 77 454 86 61",
  url: "https://elhadji-dieng.com"
};

// Données SEO pour chaque page
const seoData = {
  home: {
    title: "Accueil | El Hadji Dieng - Développeur Front-End | Webmaster | Designer UI/UX",
    description: "El Hadji Dieng, webmaster et développeur front-end basé à Dakar, Sénégal. Création de sites web modernes avec expertise dans le domaine numérique.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      ...baseProfileData,
      description: "Webmaster et développeur front-end spécialisé dans la création de sites web modernes avec des connaissances approfondies dans le domaine numérique."
    }
  },
  about: {
    title: "À Propos",
    description: "Découvrez mon parcours, mes compétences et ma passion pour le développement front-end et la gestion de sites web. Expertise dans la création d'interfaces web modernes.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      ...baseProfileData,
      description: "Webmaster et développeur front-end passionné par la création d'interfaces web modernes et l'optimisation de l'expérience utilisateur."
    }
  },
  skills: {
    title: "Compétences",
    description: "Mes compétences techniques en développement front-end, webmastering et design d'interfaces. Maîtrise de WordPress, React, Node.js et outils collaboratifs comme Notion et Jira.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Person",
      ...baseProfileData,
      knowsAbout: [
        "Développement Front-End", 
        "Webmastering", 
        "React", 
        "WordPress", 
        "HTML/CSS", 
        "JavaScript", 
        "Node.js",
        "Design UI/UX",
        "Figma",
        "Notion",
        "Jira",
        "Outils Collaboratifs"
      ]
    }
  },
  portfolio: {
    title: "Portfolio",
    description: "Découvrez mes projets de développement web, design UI/UX et applications. Sites web, applications web et designs pour des clients de divers secteurs.",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Portfolio de El Hadji Dieng",
      description: "Collection de projets de développement web et design UI/UX réalisés par El Hadji Dieng.",
      author: {
        "@type": "Person",
        name: baseProfileData.name
      }
    }
  },
  services: {
    title: "Services",
    description: "Services professionnels de développement web, design UI/UX, création de sites WordPress, applications web et optimisation SEO à Dakar, Sénégal.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Services proposés par El Hadji Dieng",
      description: "Liste des services professionnels de développement web et design proposés par El Hadji Dieng.",
      itemListElement: [
        {
          "@type": "Service",
          position: 1,
          name: "Création de Sites Web",
          description: "Conception et développement de sites web modernes, responsives et optimisés pour tous les appareils."
        },
        {
          "@type": "Service",
          position: 2,
          name: "Design Web & UX/UI",
          description: "Création d'interfaces utilisateur attrayantes et intuitives pour offrir une expérience utilisateur exceptionnelle."
        },
        {
          "@type": "Service",
          position: 3,
          name: "Applications Web",
          description: "Développement d'applications web performantes et personnalisées pour répondre à vos besoins spécifiques."
        },
        {
          "@type": "Service",
          position: 4,
          name: "Référencement SEO",
          description: "Optimisation de votre site pour les moteurs de recherche afin d'améliorer sa visibilité et générer plus de trafic."
        }
      ]
    }
  },
  contact: {
    title: "Contact",
    description: "Contactez El Hadji Dieng pour vos projets de développement web et design. Disponible pour des missions freelance, collaborations ou opportunités d'emploi.",
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact El Hadji Dieng",
      description: "Page de contact pour joindre El Hadji Dieng, développeur web et designer UI/UX à Dakar, Sénégal.",
      mainEntity: {
        "@type": "Person",
        name: baseProfileData.name,
        email: baseProfileData.email,
        telephone: baseProfileData.telephone,
        address: baseProfileData.address
      }
    }
  },
  quoteRequest: {
    title: "Demande de Devis",
    description: "Demandez un devis personnalisé pour votre projet de développement web ou design. Je vous répondrai dans les plus brefs délais avec une proposition adaptée à vos besoins.",
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Demande de Devis - El Hadji Dieng",
      description: "Formulaire de demande de devis pour les services de développement web et design proposés par El Hadji Dieng.",
      mainEntity: {
        "@type": "Service",
        provider: {
          "@type": "Person",
          name: baseProfileData.name
        },
        description: "Services de développement web et design UI/UX"
      }
    }
  },
  blog: {
    title: "Blog & Ressources",
    description: "Découvrez mes articles, tutoriels et conseils sur le développement web, le design UI/UX et les technologies web modernes.",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Blog de El Hadji Dieng",
      description: "Articles, tutoriels et ressources sur le développement web et le design UI/UX par El Hadji Dieng.",
      author: {
        "@type": "Person",
        name: baseProfileData.name,
        url: baseProfileData.url
      }
    }
  }
};

// Fonction pour obtenir les données SEO d'un service spécifique
const getServiceSEOData = (serviceId, serviceData) => {
  if (!serviceData) return null;
  
  return {
    title: serviceData.title,
    description: `${serviceData.description} Services professionnels de ${serviceData.title.toLowerCase()} par El Hadji Dieng à Dakar, Sénégal.`,
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: serviceData.title,
      description: serviceData.fullDescription.substring(0, 200) + "...",
      provider: {
        "@type": "Person",
        name: baseProfileData.name,
        url: baseProfileData.url
      },
      serviceType: serviceData.title,
      url: `${baseProfileData.url}/services/${serviceId}`
    }
  };
};

// Fonction pour obtenir les données SEO d'un projet spécifique
const getProjectSEOData = (projectId, projectData) => {
  if (!projectData) return null;
  
  return {
    title: projectData.title,
    description: `${projectData.description}. Un projet de ${projectData.category} réalisé par El Hadji Dieng utilisant ${projectData.technologies.join(', ')}.`,
    imageUrl: projectData.image,
    type: "article",
    schema: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: projectData.title,
      description: projectData.fullDescription,
      creator: {
        "@type": "Person",
        name: baseProfileData.name,
        url: baseProfileData.url
      },
      image: `${baseProfileData.url}${projectData.image}`,
      url: projectData.liveLink || `${baseProfileData.url}/portfolio/${projectId}`,
      datePublished: "2023-01-01" // À remplacer par la vraie date si disponible
    }
  };
};

// Fonction pour obtenir les données SEO d'un article de blog spécifique
const getBlogPostSEOData = (post) => {
  if (!post) return null;
  
  return {
    title: `${post.title} | Blog d'El Hadji Dieng`,
    description: post.excerpt,
    imageUrl: post.image,
    type: "article",
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      image: `${baseProfileData.url}${post.image}`,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: "El Hadji Dieng",
        url: baseProfileData.url
      },
      publisher: {
        "@type": "Person",
        name: "El Hadji Dieng",
        url: baseProfileData.url
      },
      description: post.excerpt,
      keywords: post.tags.join(", "),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${baseProfileData.url}/blog/${post.slug}`
      }
    }
  };
};

export { seoData, getServiceSEOData, getProjectSEOData, getBlogPostSEOData };
