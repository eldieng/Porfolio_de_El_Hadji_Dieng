import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer le contexte de langue
const LanguageContext = createContext();

// Définir les traductions
const translations = {
  fr: {
    // Navigation
    home: 'Accueil',
    about: 'À Propos',
    skills: 'Compétences',
    portfolio: 'Portfolio',
    services: 'Services',
    testimonials: 'Témoignages',
    contact: 'Contact',
    
    // Hero Section
    hero: {
      greeting: 'Salut, je suis',
      subtitle: 'Web Master professionnel spécialisé dans la création de sites web modernes, performants et adaptés à vos besoins.',
      portfolioButton: 'Voir mon portfolio',
      contactButton: 'Me contacter',
      scroll: 'Défiler'
    },
    
    // About Section
    about: {
      aboutMe: 'À Propos de Moi',
      professionalWebMaster: 'Web Master Professionnel',
      aboutDescription1: 'Je suis El Hadji Dieng, un Web Master sénégalais passionné par la création d\'expériences web innovantes et performantes. Avec plus de 5 ans d\'expérience dans le développement web et le design, je m\'efforce de créer des solutions digitales qui répondent parfaitement aux besoins de mes clients.',
      aboutDescription2: 'Mon parcours m\'a permis d\'acquérir une solide expertise dans différents domaines du web, notamment le développement front-end et back-end, le design UI/UX, et l\'optimisation SEO. Je suis constamment à l\'affût des nouvelles technologies et tendances pour offrir des solutions modernes et efficaces.',
      yearsExperience: 'Années d\'expérience',
      completedProjects: 'Projets complétés',
      awards: 'Récompenses',
      downloadCV: 'Télécharger mon CV'
    },
    
    // Skills Section
    mySkills: 'Mes Compétences',
    skillsDescription: 'Je maîtrise un large éventail de technologies et d\'outils pour créer des solutions web complètes et performantes.',
    frontendDev: 'Développement Frontend',
    backendDev: 'Développement Backend',
    designCMS: 'Design & CMS',
    
    // Portfolio Section
    portfolio: {
      title: "Portfolio",
      subtitle: "Découvrez mes projets récents",
      myPortfolio: "Mon Portfolio",
      all: "Tous",
      web: "Web",
      mobile: "Mobile",
      design: "Design",
      viewProject: "Voir le projet",
      visitSite: "Visiter le site",
      closeModal: "Fermer",
      technologies: "Technologies utilisées",
      project1: {
        title: "Site E-commerce Responsive",
        category: "Web",
        description: "Une boutique en ligne moderne avec panier d'achat, paiement sécurisé et interface administrateur.",
        client: "MarketPlace Inc.",
        date: "Juin 2023",
        tech: "React, Node.js, MongoDB, Stripe"
      },
      project2: {
        title: "Application de Gestion de Tâches",
        category: "Mobile",
        description: "Une application mobile intuitive pour organiser vos tâches quotidiennes avec notifications et synchronisation cloud.",
        client: "TaskMaster Ltd.",
        date: "Avril 2023",
        tech: "React Native, Firebase, Redux"
      },
      project3: {
        title: "Refonte Site Vitrine Entreprise",
        category: "Web",
        description: "Modernisation complète d'un site d'entreprise avec amélioration des performances et de l'expérience utilisateur.",
        client: "TechSolutions SA",
        date: "Mars 2023",
        tech: "WordPress, Elementor, CSS personnalisé"
      },
      project4: {
        title: "Design UI/UX Application Bancaire",
        category: "Design",
        description: "Conception d'interfaces utilisateur modernes et sécurisées pour une application bancaire mobile.",
        client: "SecureBank",
        date: "Février 2023",
        tech: "Figma, Adobe XD, Prototypage"
      },
      project5: {
        title: 'Plateforme Éducative',
        description: 'Une plateforme en ligne pour les cours et formations avec système de suivi des progrès.',
        fullDescription: 'Cette plateforme éducative permet aux formateurs de créer des cours en ligne et aux étudiants de suivre leur progression. Elle comprend des fonctionnalités comme les quiz interactifs, les forums de discussion, la vidéoconférence, et un tableau de bord analytique. Le système est construit avec la stack MERN (MongoDB, Express, React, Node.js).'
      },
      project6: {
        title: 'Site Vitrine pour Restaurant',
        description: 'Un site vitrine élégant pour un restaurant haut de gamme avec réservation en ligne.',
        fullDescription: 'Ce site vitrine pour un restaurant gastronomique met en valeur le menu, l\'ambiance et la philosophie de l\'établissement. Il comprend une galerie de photos, un système de réservation en ligne, et une intégration avec Google Maps. Le design est élégant et reflète l\'identité visuelle du restaurant.'
      }
    },
    
    // Services Section
    myServices: 'Mes Services',
    servicesDescription: 'Je propose une gamme complète de services web pour répondre à vos besoins digitaux, de la conception à la mise en ligne.',
    websiteCreation: 'Création de Sites Web',
    websiteCreationDesc: 'Conception et développement de sites web sur mesure, adaptés à vos besoins et objectifs.',
    uiuxDesign: 'Design UI/UX',
    uiuxDesignDesc: 'Création d\'interfaces utilisateur intuitives et esthétiques pour une expérience optimale.',
    webApplications: 'Applications Web',
    webApplicationsDesc: 'Développement d\'applications web performantes et évolutives pour votre entreprise.',
    websiteRedesign: 'Refonte de Sites',
    websiteRedesignDesc: 'Modernisation et optimisation de votre site web existant pour de meilleures performances.',
    seoOptimization: 'Optimisation SEO',
    seoOptimizationDesc: 'Amélioration de la visibilité de votre site web dans les moteurs de recherche.',
    maintenanceSupport: 'Maintenance & Support',
    maintenanceSupportDesc: 'Services de maintenance et de support technique pour assurer le bon fonctionnement de votre site.',
    
    // Testimonials Section
    testimonials: 'Témoignages',
    testimonialsDescription: 'Découvrez ce que mes clients disent de mon travail et de ma collaboration avec eux.',
    
    // Contact Section
    contactMe: 'Me Contacter',
    contactDescription: 'Vous avez un projet en tête ou une question ? N\'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.',
    contactInfo: 'Informations de Contact',
    contactInfoDesc: 'Je suis disponible pour des projets freelance, des collaborations ou des opportunités d\'emploi. N\'hésitez pas à me contacter pour discuter de vos besoins.',
    email: 'Email',
    phone: 'Téléphone',
    location: 'Localisation',
    sendMessage: 'Envoyez-moi un message',
    fullName: 'Nom complet',
    subject: 'Sujet',
    message: 'Message',
    sending: 'Envoi en cours...',
    send: 'Envoyer le message',
    successMessage: 'Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.',
    
    // Form Validation
    nameRequired: 'Le nom est requis',
    emailRequired: 'L\'email est requis',
    emailInvalid: 'Adresse email invalide',
    subjectRequired: 'Le sujet est requis',
    messageRequired: 'Le message est requis',
    
    // Footer
    allRightsReserved: 'Tous droits réservés. Conçu avec passion.'
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    portfolio: 'Portfolio',
    services: 'Services',
    testimonials: 'Testimonials',
    contact: 'Contact',
    
    // Hero Section
    hero: {
      greeting: 'Hello, I am',
      subtitle: 'Professional Web Master specialized in creating modern, high-performance websites tailored to your needs.',
      portfolioButton: 'View my portfolio',
      contactButton: 'Contact me',
      scroll: 'Scroll'
    },
    
    // About Section
    about: {
      aboutMe: 'About Me',
      professionalWebMaster: 'Professional Web Master',
      aboutDescription1: 'I am El Hadji Dieng, a Senegalese Web Master passionate about creating innovative and high-performance web experiences. With over 5 years of experience in web development and design, I strive to create digital solutions that perfectly meet my clients\' needs.',
      aboutDescription2: 'My journey has allowed me to acquire solid expertise in different areas of the web, including front-end and back-end development, UI/UX design, and SEO optimization. I am constantly on the lookout for new technologies and trends to offer modern and effective solutions.',
      yearsExperience: 'Years of experience',
      completedProjects: 'Completed projects',
      awards: 'Awards',
      downloadCV: 'Download my CV'
    },
    
    // Skills Section
    mySkills: 'My Skills',
    skillsDescription: 'I master a wide range of technologies and tools to create comprehensive and high-performance web solutions.',
    frontendDev: 'Frontend Development',
    backendDev: 'Backend Development',
    designCMS: 'Design & CMS',
    
    // Portfolio Section
    portfolio: {
      myPortfolio: 'My Portfolio',
      portfolioDescription: 'Discover a selection of my most recent and representative projects in different areas of the web.',
      filters: {
        all: 'All',
        websites: 'Websites',
        uiUx: 'UI/UX - Mockups',
        webApps: 'Web Applications',
        redesign: 'Website Redesign'
      },
      projectDescription: 'Project description',
      technologiesUsed: 'Technologies used',
      sourceCode: 'Source code',
      figmaDesign: 'Figma design',
      viewProject: 'View project',
      
      // Projects
      project1: {
        title: 'Fashion E-commerce Website',
        description: 'A modern e-commerce website for a clothing store with integrated payment system.',
        fullDescription: 'This project is a complete e-commerce website developed for a fashion store. It includes a product catalog, shopping cart system, secure payment process via Stripe, and a customer area. The frontend is built with React and the backend with Node.js and Express, with a MongoDB database.'
      },
      project2: {
        title: 'Task Management Application',
        description: 'A web application for managing tasks with collaboration features.',
        fullDescription: 'This task management application allows users to create, organize and track their daily tasks. It offers collaboration features for teams, notifications, and real-time synchronization thanks to Firebase. The user interface is built with Vue.js and styled with Tailwind CSS.'
      },
      project3: {
        title: 'Mobile Application Mockup',
        description: 'UI/UX design for a food delivery mobile application.',
        fullDescription: 'This UI/UX design project includes the complete creation of the user interface for a food delivery mobile application. The process included user research, wireframe creation, high-fidelity mockup design, and interactive prototype creation. The design is modern, intuitive and optimized for user experience.'
      },
      project4: {
        title: 'Institutional Website Redesign',
        description: 'Complete redesign of a financial institution\'s website to improve user experience.',
        fullDescription: 'This redesign project transformed an outdated institutional website into a modern and responsive platform. The new site offers better navigation, a clean design, and an optimized user experience. Developed on WordPress with custom features, it includes an easy-to-use content management system for the client.'
      },
      project5: {
        title: 'Educational Platform',
        description: 'An online platform for courses and training with progress tracking system.',
        fullDescription: 'This educational platform allows trainers to create online courses and students to track their progress. It includes features such as interactive quizzes, discussion forums, video conferencing, and an analytical dashboard. The system is built with the MERN stack (MongoDB, Express, React, Node.js).'
      },
      project6: {
        title: 'Restaurant Showcase Website',
        description: 'An elegant showcase website for a high-end restaurant with online reservation.',
        fullDescription: 'This showcase website for a gourmet restaurant highlights the menu, ambiance and philosophy of the establishment. It includes a photo gallery, an online reservation system, and integration with Google Maps. The design is elegant and reflects the restaurant\'s visual identity.'
      }
    },
    
    // Services Section
    myServices: 'My Services',
    servicesDescription: 'I offer a complete range of web services to meet your digital needs, from design to deployment.',
    websiteCreation: 'Website Creation',
    websiteCreationDesc: 'Design and development of custom websites, adapted to your needs and goals.',
    uiuxDesign: 'UI/UX Design',
    uiuxDesignDesc: 'Creation of intuitive and aesthetic user interfaces for an optimal experience.',
    webApplications: 'Web Applications',
    webApplicationsDesc: 'Development of high-performance and scalable web applications for your business.',
    websiteRedesign: 'Website Redesign',
    websiteRedesignDesc: 'Modernization and optimization of your existing website for better performance.',
    seoOptimization: 'SEO Optimization',
    seoOptimizationDesc: 'Improving the visibility of your website in search engines.',
    maintenanceSupport: 'Maintenance & Support',
    maintenanceSupportDesc: 'Maintenance and technical support services to ensure the proper functioning of your site.',
    
    // Testimonials Section
    testimonials: 'Testimonials',
    testimonialsDescription: 'Discover what my clients say about my work and my collaboration with them.',
    
    // Contact Section
    contactMe: 'Contact Me',
    contactDescription: 'Do you have a project in mind or a question? Feel free to contact me, I will reply as soon as possible.',
    contactInfo: 'Contact Information',
    contactInfoDesc: 'I am available for freelance projects, collaborations, or job opportunities. Feel free to contact me to discuss your needs.',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    sendMessage: 'Send me a message',
    fullName: 'Full name',
    subject: 'Subject',
    message: 'Message',
    sending: 'Sending...',
    send: 'Send message',
    successMessage: 'Your message has been sent successfully! I will get back to you as soon as possible.',
    
    // Form Validation
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Invalid email address',
    subjectRequired: 'Subject is required',
    messageRequired: 'Message is required',
    
    // Footer
    allRightsReserved: 'All rights reserved. Designed with passion.'
  }
};

// Créer le Provider de langue
export const LanguageProvider = ({ children }) => {
  // Récupérer la langue sauvegardée ou utiliser le français par défaut
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'fr';
  });
  
  // Mettre à jour localStorage quand la langue change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Fonction pour changer de langue
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  
  // Fonction pour obtenir une traduction
  const t = (key) => {
    try {
      // Gestion des clés imbriquées (ex: 'about.aboutMe')
      if (key.includes('.')) {
        const keys = key.split('.');
        let value = translations[language];
        
        // Parcourir la hiérarchie des objets
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            // Clé non trouvée dans la hiérarchie
            return key;
          }
        }
        
        // Vérifier que la valeur finale est une chaîne ou un nombre
        if (typeof value === 'string' || typeof value === 'number') {
          return value;
        } else {
          // Si c'est un objet ou autre chose, retourner la clé pour éviter l'erreur React
          console.warn(`Translation key '${key}' returns an object instead of a string`);
          return key.split('.').pop() || key; // Retourne la dernière partie de la clé
        }
      }
      
      // Cas simple sans imbrication
      const value = translations[language][key];
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      } else if (value === undefined || value === null) {
        return key;
      } else {
        // Si c'est un objet ou autre chose, retourner la clé pour éviter l'erreur React
        console.warn(`Translation key '${key}' returns an object instead of a string`);
        return key;
      }
    } catch (error) {
      console.error(`Error in translation function for key '${key}':`, error);
      return key; // En cas d'erreur, retourner la clé
    }
  };
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
