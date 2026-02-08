// Animations pour Framer Motion

// Animation de fondu
export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.4
    }
  }
};

// Animation d'apparition depuis la gauche
export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0, 
    x: -50,
    transition: {
      duration: 0.4
    }
  }
};

// Animation d'apparition depuis la droite
export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0, 
    x: 50,
    transition: {
      duration: 0.4
    }
  }
};

// Animation de zoom
export const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

// Animation pour les éléments de liste avec délai
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1]
    }
  }
};

// Animation pour les cartes
export const cardAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1]
    }
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.8, 0.25, 1]
    }
  }
};
