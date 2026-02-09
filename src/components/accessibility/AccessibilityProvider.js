import React, { createContext, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaWhatsapp } from 'react-icons/fa';

// Création du contexte d'accessibilité
const AccessibilityContext = createContext();

// Hook personnalisé pour utiliser le contexte d'accessibilité
export const useAccessibility = () => useContext(AccessibilityContext);

// Composant fournisseur d'accessibilité
export const AccessibilityProvider = ({ children }) => {
  // États pour les différentes fonctionnalités d'accessibilité
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1); // 1 = normal, 1.25 = grand, 1.5 = très grand
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

  // Vérifier les préférences système pour le mouvement réduit
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }

    const handleChange = (e) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Appliquer les styles d'accessibilité au document
  useEffect(() => {
    document.documentElement.style.setProperty('--font-size-multiplier', fontSize);
    
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if (reducedMotion) {
      document.body.classList.add('reduced-motion');
    } else {
      document.body.classList.remove('reduced-motion');
    }
  }, [highContrast, fontSize, reducedMotion]);

  // Valeur du contexte
  const value = {
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    reducedMotion,
    setReducedMotion,
    showAccessibilityMenu,
    setShowAccessibilityMenu,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
      <WhatsAppButton />
    </AccessibilityContext.Provider>
  );
};

// Bouton WhatsApp flottant
const WhatsAppButton = () => {
  return (
    <WhatsAppLink
      href="https://wa.me/221774548661"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactez-moi sur WhatsApp"
      title="Discuter sur WhatsApp"
    >
      <FaWhatsapp />
    </WhatsAppLink>
  );
};

// Styles du bouton WhatsApp
const WhatsAppLink = styled.a`
  position: fixed;
  bottom: 25px;
  right: 25px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #25D366;
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  font-size: 28px;
  animation: whatsappPulse 2s infinite;

  &:hover {
    background-color: #128C7E;
    transform: scale(1.1) translateY(-3px);
    box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
  }

  @keyframes whatsappPulse {
    0% {
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    }
    50% {
      box-shadow: 0 4px 25px rgba(37, 211, 102, 0.6);
    }
    100% {
      box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    }
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
`;

export default AccessibilityProvider;
