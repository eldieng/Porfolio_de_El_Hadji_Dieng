import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';

/**
 * Moniteur de performance qui mesure et enregistre les métriques Web Vitals
 * et les envoie à Google Analytics pour analyse
 */
const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Importer Web Vitals uniquement côté client
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Fonction pour envoyer les métriques à Google Analytics
        const sendToAnalytics = ({ name, delta, id }) => {
          ReactGA.event({
            category: 'Web Vitals',
            action: name,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            label: id,
            nonInteraction: true,
          });
        };

        // Mesurer et envoyer les métriques Web Vitals
        getCLS(sendToAnalytics);  // Cumulative Layout Shift
        getFID(sendToAnalytics);  // First Input Delay
        getFCP(sendToAnalytics);  // First Contentful Paint
        getLCP(sendToAnalytics);  // Largest Contentful Paint
        getTTFB(sendToAnalytics); // Time to First Byte
      });

      // Mesurer le temps de chargement des composants lazy-loaded
      const measureLazyLoadTime = () => {
        // Observer les performances de navigation
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Filtrer les entrées liées au chargement de chunks
            if (entry.name.includes('chunk') && entry.initiatorType === 'script') {
              ReactGA.event({
                category: 'Chunk Loading',
                action: 'Load Time',
                label: entry.name.split('/').pop(),
                value: Math.round(entry.duration),
                nonInteraction: true,
              });
            }
          });
        });

        // Observer les ressources réseau
        observer.observe({ entryTypes: ['resource'] });

        return () => observer.disconnect();
      };

      // Activer la mesure des performances uniquement en production
      if (process.env.NODE_ENV === 'production') {
        measureLazyLoadTime();
      }
    }
  }, []);

  // Ce composant ne rend rien visuellement
  return null;
};

export default PerformanceMonitor;
