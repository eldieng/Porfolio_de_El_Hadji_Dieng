import { createGlobalStyle } from 'styled-components';

const AccessibilityStyles = createGlobalStyle`
  /* Styles pour le mode contraste élevé */
  body.high-contrast {
    --background-color: #000000;
    --text-color: #ffffff;
    --primary-color: #ffff00;
    --secondary-color: #00ffff;
    --accent-color: #ff00ff;
    --card-bg: #333333;
    --border-color: #ffffff;
    
    background-color: var(--background-color);
    color: var(--text-color);
  }

  body.high-contrast a {
    color: var(--primary-color);
    text-decoration: underline;
  }

  body.high-contrast button {
    border: 2px solid var(--text-color);
    color: var(--text-color);
    background-color: var(--background-color);
  }

  body.high-contrast img {
    filter: grayscale(100%) contrast(120%);
  }

  body.high-contrast input,
  body.high-contrast textarea,
  body.high-contrast select {
    background-color: var(--background-color);
    color: var(--text-color);
    border: 2px solid var(--text-color);
  }

  /* Styles pour la taille de police ajustable */
  html {
    font-size: calc(16px * var(--font-size-multiplier, 1));
  }

  /* Styles pour les animations réduites */
  body.reduced-motion * {
    animation-duration: 0.001s !important;
    transition-duration: 0.001s !important;
  }

  /* Focus styles pour l'accessibilité au clavier */
  *:focus {
    outline: 3px solid var(--accent-color, #4a90e2);
    outline-offset: 2px;
  }

  /* Skip to content link */
  .skip-to-content {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: var(--background-color);
    padding: 8px;
    z-index: 100;
    transition: top 0.3s;
  }

  .skip-to-content:focus {
    top: 0;
  }

  /* Amélioration des contrastes pour les éléments interactifs */
  button, 
  a.button, 
  input[type="submit"] {
    &:hover, &:focus {
      filter: brightness(1.2);
    }
  }

  /* Amélioration de l'espacement pour la lisibilité */
  p, li, td, th, label, input, textarea, select, button {
    line-height: 1.5;
  }

  /* Styles pour les attributs ARIA */
  [aria-hidden="true"] {
    display: none;
  }

  [aria-expanded="true"] {
    border: 2px solid var(--accent-color, #4a90e2);
  }
`;

export default AccessibilityStyles;
