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

// Schema FAQ pour la page services (rich snippets Google)
const servicesFAQSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Combien coûte la création d'un site web à Dakar ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le coût de création d'un site web à Dakar varie selon le type de projet : site vitrine à partir de 150 000 FCFA, site e-commerce à partir de 300 000 FCFA, application web sur devis. Contactez-moi pour un devis personnalisé gratuit."
      }
    },
    {
      "@type": "Question",
      name: "Quel est le délai de création d'un site web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le délai moyen est de 2 à 4 semaines pour un site vitrine, 4 à 8 semaines pour un site e-commerce ou une application web. Le délai exact dépend de la complexité du projet et de vos besoins spécifiques."
      }
    },
    {
      "@type": "Question",
      name: "Proposez-vous la maintenance de sites web ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, je propose des forfaits de maintenance web incluant les mises à jour de sécurité, les sauvegardes régulières, le monitoring de performance et le support technique. Disponible au Sénégal et en Afrique de l'Ouest."
      }
    },
    {
      "@type": "Question",
      name: "Travaillez-vous avec des clients hors du Sénégal ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolument ! Je travaille avec des clients au Sénégal, en Afrique de l'Ouest (Côte d'Ivoire, Mali, Guinée, Burkina Faso) et à l'international, notamment en France. La collaboration se fait à distance via des outils modernes."
      }
    }
  ]
};

// Schema BreadcrumbList pour la navigation
const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://elhadji-dieng.com${item.path}`
  }))
});

// Données SEO pour chaque page
const seoData = {
  home: {
    title: "Développeur Web Dakar, Sénégal - Création Site Web | El Hadji Dieng",
    description: "El Hadji Dieng, développeur web freelance à Dakar. Création de sites web professionnels, applications web, design UI/UX et référencement SEO. Devis gratuit pour votre projet au Sénégal et en Afrique de l'Ouest.",
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
    title: "Développeur Web Freelance Dakar - Parcours & Expertise | El Hadji Dieng",
    description: "Découvrez le parcours d'El Hadji Dieng, développeur web et webmaster freelance à Dakar. Expert en création de sites web modernes, React, WordPress et design UI/UX au Sénégal.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        ...baseProfileData,
        description: "Webmaster et développeur front-end passionné par la création d'interfaces web modernes et l'optimisation de l'expérience utilisateur."
      },
      getBreadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "À Propos", path: "/a-propos" }])
    ]
  },
  skills: {
    title: "Compétences Développeur Web - React, WordPress, Node.js | El Hadji Dieng",
    description: "Compétences techniques d'El Hadji Dieng : développement front-end (React, JavaScript, HTML/CSS), webmastering (WordPress), design UI/UX (Figma), Node.js et outils collaboratifs. Dakar, Sénégal.",
    schema: [
      {
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
      },
      getBreadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Compétences", path: "/competences" }])
    ]
  },
  portfolio: {
    title: "Portfolio Développeur Web Dakar - Projets & Réalisations | El Hadji Dieng",
    description: "Découvrez les projets web réalisés par El Hadji Dieng à Dakar : sites vitrines, e-commerce, applications web et designs UI/UX pour des clients au Sénégal et en Afrique de l'Ouest.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Portfolio de El Hadji Dieng - Développeur Web à Dakar",
        description: "Collection de projets de développement web et design UI/UX réalisés par El Hadji Dieng à Dakar, Sénégal.",
        author: {
          "@type": "Person",
          name: baseProfileData.name
        }
      },
      getBreadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Portfolio", path: "/portfolio" }])
    ]
  },
  services: {
    title: "Création Site Web Dakar - Services Web, SEO & Design | El Hadji Dieng",
    description: "Services de création de sites web à Dakar : sites vitrines, e-commerce, applications web, design UI/UX, référencement SEO et maintenance. Développeur freelance au Sénégal. Devis gratuit.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Services de développement web à Dakar par El Hadji Dieng",
        description: "Services professionnels de création de sites web, design et SEO à Dakar, Sénégal.",
        itemListElement: [
          {
            "@type": "Service",
            position: 1,
            name: "Création de Sites Web à Dakar",
            description: "Conception et développement de sites web modernes, responsives et optimisés. Sites vitrines, e-commerce, blogs.",
            provider: { "@type": "Person", name: "El Hadji Dieng" },
            areaServed: { "@type": "Country", name: "Sénégal" }
          },
          {
            "@type": "Service",
            position: 2,
            name: "Design Web & UX/UI",
            description: "Création d'interfaces utilisateur attrayantes et intuitives avec Figma pour une expérience utilisateur exceptionnelle.",
            provider: { "@type": "Person", name: "El Hadji Dieng" }
          },
          {
            "@type": "Service",
            position: 3,
            name: "Développement d'Applications Web",
            description: "Applications web performantes avec React et Node.js pour répondre à vos besoins spécifiques.",
            provider: { "@type": "Person", name: "El Hadji Dieng" }
          },
          {
            "@type": "Service",
            position: 4,
            name: "Référencement SEO au Sénégal",
            description: "Optimisation pour les moteurs de recherche : audit SEO, optimisation on-page, référencement local à Dakar et au Sénégal.",
            provider: { "@type": "Person", name: "El Hadji Dieng" }
          }
        ]
      },
      servicesFAQSchema,
      getBreadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Services", path: "/services" }])
    ]
  },
  contact: {
    title: "Contacter un Développeur Web à Dakar | El Hadji Dieng - Freelance Sénégal",
    description: "Contactez El Hadji Dieng, développeur web freelance à Dakar, Sénégal. Disponible pour vos projets de création de sites web, design et SEO au Sénégal et en Afrique de l'Ouest. Réponse sous 48h.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contacter El Hadji Dieng - Développeur Web Dakar",
        description: "Contactez El Hadji Dieng pour vos projets de création de sites web à Dakar, Sénégal.",
        mainEntity: {
          "@type": "Person",
          name: baseProfileData.name,
          email: baseProfileData.email,
          telephone: baseProfileData.telephone,
          address: baseProfileData.address
        }
      },
      getBreadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Contact", path: "/contact" }])
    ]
  },
  quoteRequest: {
    title: "Devis Création Site Web Dakar - Gratuit & Sans Engagement | El Hadji Dieng",
    description: "Demandez un devis gratuit pour votre projet web à Dakar : site vitrine, e-commerce, application web, design UI/UX ou SEO. Réponse personnalisée sous 48h par El Hadji Dieng, développeur freelance.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Devis Création Site Web à Dakar - El Hadji Dieng",
        description: "Formulaire de demande de devis gratuit pour les services de développement web à Dakar, Sénégal.",
        mainEntity: {
          "@type": "Service",
          provider: {
            "@type": "Person",
            name: baseProfileData.name
          },
          description: "Services de développement web, design UI/UX et SEO à Dakar, Sénégal"
        }
      },
      getBreadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Demande de Devis", path: "/demande-devis" }])
    ]
  },
  blog: {
    title: "Blog Développement Web & Design - Tutoriels & Conseils | El Hadji Dieng",
    description: "Articles, tutoriels et conseils sur le développement web, design UI/UX, React, WordPress et SEO par El Hadji Dieng, développeur web à Dakar, Sénégal. Ressources gratuites.",
    schema: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog Développement Web - El Hadji Dieng",
        description: "Articles et tutoriels sur le développement web, le design UI/UX et le SEO par El Hadji Dieng, développeur à Dakar.",
        author: {
          "@type": "Person",
          name: baseProfileData.name,
          url: baseProfileData.url
        }
      },
      getBreadcrumbSchema([{ name: "Accueil", path: "/" }, { name: "Blog", path: "/blog" }])
    ]
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
