import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import ScrollToTop from './utils/ScrollToTop';
import LazyLayout, { preloadLayoutComponents } from './components/layout/LazyLayout';
import { LanguageProvider } from './utils/LanguageContext';
import AccessibilityProvider from './components/accessibility/AccessibilityProvider';
import AccessibilityStyles from './styles/accessibilityStyles';
import { ThemeToggleProvider } from './utils/ThemeContext';
import AppRoutes, { preloadFrequentPages } from './routes/AppRoutes';
import PerformanceMonitor from './utils/PerformanceMonitor';

// Initialisation de Google Analytics via variable d'environnement
const GA_ID = process.env.REACT_APP_GA_ID || 'G-MKTC8H5VWL';
ReactGA.initialize(GA_ID);

// Composant pour suivre les changements de page
const RouteTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Envoyer la page vue à Google Analytics
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  
  return null;
};

function App() {
  useEffect(() => {
    // Précharger les pages fréquemment visitées après le chargement initial
    preloadFrequentPages();
    // Précharger les composants de mise en page
    preloadLayoutComponents();
  }, []);

  return (
    <HelmetProvider>
      <ThemeToggleProvider>
        <LanguageProvider>
          <AccessibilityProvider>
            <AccessibilityStyles />
            <Router>
              <RouteTracker />
              <PerformanceMonitor />
              <ScrollToTop>
                <a href="#main-content" className="skip-to-content">Aller au contenu principal</a>
                <LazyLayout>
                  <AppRoutes />
                </LazyLayout>
              </ScrollToTop>
            </Router>
          </AccessibilityProvider>
        </LanguageProvider>
      </ThemeToggleProvider>
    </HelmetProvider>
  );
}

export default App;
