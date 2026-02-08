import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Variables CSS pour les couleurs selon la charte graphique */
  /* Les polices Google Fonts sont chargées via <link> dans index.html pour de meilleures performances */
  :root {
    --color-blue: #1a237e; /* Bleu roi */
    --color-blue-light: #3949ab;
    --color-white: #ffffff;
    --color-gray-dark: #333333;
    --color-orange: #ff6f00; /* Orange secondaire */
    --color-orange-dark: #e65100; /* Orange foncé */
    --color-gray-light: #f5f5f5;
    --color-gray-medium: #888888;
    --font-primary: 'Poppins', sans-serif;
    --font-secondary: 'Inter', sans-serif;
    --font-tertiary: 'Montserrat', sans-serif;

    /* Variables sémantiques (Light Mode par défaut) */
    --bg-primary: #ffffff;
    --bg-secondary: #f5f5f5;
    --bg-card: #ffffff;
    --bg-header: rgba(255, 255, 255, 0.95);
    --bg-footer: #1a237e;
    --text-primary: #333333;
    --text-secondary: #666666;
    --text-heading: #1a237e;
    --border-color: #e0e0e0;
    --shadow-color: rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 5px 15px rgba(0, 0, 0, 0.1);
    --shadow-large: 0 10px 25px rgba(0, 0, 0, 0.1);
    --code-bg: #f5f5f5;
    --input-bg: #ffffff;
    --input-border: #cccccc;
  }

  /* Dark Mode */
  body.dark-mode {
    --bg-primary: #0f0f1a;
    --bg-secondary: #1a1a2e;
    --bg-card: #1e1e32;
    --bg-header: rgba(15, 15, 26, 0.95);
    --bg-footer: #0a0a15;
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0b0;
    --text-heading: #ffffff;
    --border-color: #2a2a40;
    --shadow-color: rgba(0, 0, 0, 0.3);
    --shadow-medium: 0 5px 15px rgba(0, 0, 0, 0.3);
    --shadow-large: 0 10px 25px rgba(0, 0, 0, 0.4);
    --code-bg: #1a1a2e;
    --input-bg: #1e1e32;
    --input-border: #3a3a50;
    --color-blue-light: #5c6bc0;
    --color-gray-light: #1a1a2e;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-primary);
    color: var(--text-primary);
    background-color: var(--bg-primary);
    line-height: 1.6;
    overflow-x: hidden;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--color-orange);
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-secondary);
    font-weight: 600;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: var(--text-heading);
  }

  p {
    margin-bottom: 1rem;
  }

  button, .btn {
    font-family: var(--font-primary);
    cursor: pointer;
    border: none;
    outline: none;
    background: var(--color-blue);
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  button:hover, .btn:hover {
    background: var(--color-orange);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  section {
    padding: 80px 0;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* Animations de base */
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.5s forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default GlobalStyles;
