import React, { createContext, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';

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
      <AccessibilityWidget />
    </AccessibilityContext.Provider>
  );
};

// Composant widget d'accessibilité
const AccessibilityWidget = () => {
  const {
    highContrast,
    setHighContrast,
    fontSize,
    setFontSize,
    reducedMotion,
    setReducedMotion,
    showAccessibilityMenu,
    setShowAccessibilityMenu,
  } = useAccessibility();

  return (
    <>
      <AccessibilityButton
        aria-label="Ouvrir les options d'accessibilité"
        onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
      >
        <AccessibilityIcon aria-hidden="true" />
      </AccessibilityButton>

      {showAccessibilityMenu && (
        <AccessibilityMenu role="dialog" aria-label="Options d'accessibilité">
          <h3>Options d'accessibilité</h3>
          
          <AccessibilityOption>
            <label htmlFor="high-contrast">
              <input
                id="high-contrast"
                type="checkbox"
                checked={highContrast}
                onChange={() => setHighContrast(!highContrast)}
              />
              Contraste élevé
            </label>
          </AccessibilityOption>

          <AccessibilityOption>
            <label htmlFor="font-size">Taille du texte:</label>
            <select
              id="font-size"
              value={fontSize}
              onChange={(e) => setFontSize(parseFloat(e.target.value))}
              aria-label="Sélectionner la taille du texte"
            >
              <option value="1">Normal</option>
              <option value="1.25">Grand</option>
              <option value="1.5">Très grand</option>
            </select>
          </AccessibilityOption>

          <AccessibilityOption>
            <label htmlFor="reduced-motion">
              <input
                id="reduced-motion"
                type="checkbox"
                checked={reducedMotion}
                onChange={() => setReducedMotion(!reducedMotion)}
              />
              Réduire les animations
            </label>
          </AccessibilityOption>

          <CloseButton
            onClick={() => setShowAccessibilityMenu(false)}
            aria-label="Fermer les options d'accessibilité"
          >
            Fermer
          </CloseButton>
        </AccessibilityMenu>
      )}
    </>
  );
};

// Styles des composants
const AccessibilityButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-blue);
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 2px 10px var(--shadow-color);
  transition: background-color 0.3s;

  &:hover, &:focus {
    background-color: var(--color-orange);
    outline: 2px solid white;
  }

  &:focus {
    outline: 3px solid var(--color-orange);
    outline-offset: 2px;
  }
`;

const AccessibilityIcon = styled.span`
  &:before {
    content: '♿';
    font-size: 24px;
  }
`;

const AccessibilityMenu = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 280px;
  background-color: var(--bg-card);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
  z-index: 1000;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: background-color 0.3s ease, color 0.3s ease;

  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-heading);
  }

  .high-contrast & {
    background-color: black;
    color: white;
    border: 2px solid white;
  }
`;

const AccessibilityOption = styled.div`
  margin-bottom: 15px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }

  select {
    margin-top: 5px;
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid var(--input-border);
    background-color: var(--input-bg);
    color: var(--text-primary);
    transition: background-color 0.3s ease, color 0.3s ease;

    .high-contrast & {
      background-color: black;
      color: white;
      border-color: white;
    }
  }
`;

const CloseButton = styled.button`
  width: 100%;
  padding: 8px;
  background-color: var(--color-blue);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover, &:focus {
    background-color: var(--color-orange);
  }

  &:focus {
    outline: 3px solid var(--color-orange);
    outline-offset: 2px;
  }

  .high-contrast & {
    background-color: white;
    color: black;
    border: 2px solid black;
  }
`;

export default AccessibilityProvider;
