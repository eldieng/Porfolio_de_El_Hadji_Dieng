/**
 * Données SEO pour chaque page du site
 * Contient les méta-descriptions, titres et données structurées Schema.org
 */

// Données de base pour le profil
const baseProfileData = {
  name: "El Hadji Dieng",
  jobTitle: "Développeur Web & Webmaster à Dakar, Sénégal",
  image: "/assets/images/profile.jpg",
  sameAs: [
    "https://www.linkedin.com/in/bambiste4/",
    "https://github.com/eldieng/",
    "https://www.instagram.com/elbambiste04",
    "https://www.facebook.com/share/16c2u9cioC/",
    "https://www.tiktok.com/@bambiste4"
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dakar",
    addressRegion: "Parcelle Assainie U8",
    addressCountry: "SN",
    postalCode: "12500"
  },
  email: "el.elhadji.dieng@gmail.com",
  telephone: "+221774548661",
  url: "https://elhadji-dieng.com",
  areaServed: [
    { "@type": "Country", name: "Sénégal" },
    { "@type": "Place", name: "Afrique de l'Ouest" },
    { "@type": "Place", name: "International" }
  ]
};

// Schema LocalBusiness pour le référencement local Google Maps / Google My Business
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "El Hadji Dieng - Développeur Web & Webmaster",
  image: "https://elhadji-dieng.com/assets/images/profile.jpg",
  url: "https://elhadji-dieng.com",
  telephone: "+221774548661",
  email: "el.elhadji.dieng@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Parcelle Assainie U8",
    addressLocality: "Dakar",
    addressCountry: "SN",
    postalCode: "12500"
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 14.6937,
    longitude: -17.4441
  },
  priceRange: "$$",
  areaServed: [
    { "@type": "Country", name: "Sénégal" },
    { "@type": "Country", name: "Côte d'Ivoire" },
    { "@type": "Country", name: "Mali" },
    { "@type": "Country", name: "Guinée" },
    { "@type": "Country", name: "Burkina Faso" },
    { "@type": "Country", name: "Mauritanie" },
    { "@type": "Country", name: "France" }
  ],
  serviceType: [
    "Création de sites web",
    "Développement d'applications web",
    "Design UI/UX",
    "Référencement SEO",
    "Maintenance web",
    "WordPress"
  ],
  knowsLanguage: ["fr", "wo"],
  sameAs: [
    "https://www.linkedin.com/in/bambiste4/",
    "https://github.com/eldieng/"
  ]
};

// Données SEO pour chaque page
const seoData = {
  home: {
    title: "El Hadji Dieng - Développeur Web & Webmaster à Dakar, Sénégal",
    description: "El Hadji Dieng, développeur web et webmaster freelance basé à Dakar, Sénégal. Création de sites web, applications web, design UI/UX. Services au Sénégal, Afrique de l'Ouest et à l'international.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        ...baseProfileData,
        description: "Développeur web et webmaster freelance basé à Dakar, Sénégal. Spécialisé dans la création de sites web modernes, applications web et design UI/UX. Services disponibles au Sénégal, en Afrique de l'Ouest et à l'international."
      },
      localBusinessSchema
    ]
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
    description: "Services professionnels de développement web, design UI/UX, WordPress, applications web et SEO à Dakar, Sénégal. Disponible en Afrique de l'Ouest et à l'international.",
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
    description: "Contactez El Hadji Dieng à Dakar, Sénégal pour vos projets web. Freelance disponible au Sénégal, en Afrique de l'Ouest et à l'international.",
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

export { seoData, localBusinessSchema, getServiceSEOData, getProjectSEOData, getBlogPostSEOData };
