import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Composant qui défile automatiquement vers le haut de la page lors des changements de route
 * À utiliser dans le composant App principal, enveloppant les routes
 */
const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Défilement vers le haut avec une petite animation
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]); // Se déclenche à chaque changement de route

  return children;
};

export default ScrollToTop;
