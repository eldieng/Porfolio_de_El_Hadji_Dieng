import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import SEOHelmet from '../utils/SEOHelmet';
import { seoData } from '../data/seoData';
import { lazyWithPreload, LazySection } from '../utils/LazyLoad';
import ErrorBoundary from '../components/common/ErrorBoundary';

// Importation différée des sections avec l'utilitaire lazyWithPreload
const AboutSectionPreview = lazyWithPreload(() => import('../components/sections/AboutSectionPreview'));
const SkillsSectionPreview = lazyWithPreload(() => import('../components/sections/SkillsSectionPreview'));
const PortfolioSectionPreview = lazyWithPreload(() => import('../components/sections/PortfolioSectionPreview'));
const ServicesSectionPreview = lazyWithPreload(() => import('../components/sections/ServicesSectionPreview'));
const BlogSectionEnhanced = lazyWithPreload(() => import('../components/sections/BlogSectionEnhanced'));
const ContactSection = lazyWithPreload(() => import('../components/sections/ContactSection'));

// Préchargement des sections critiques en arrière-plan
// Cette fonction peut être appelée après le chargement initial de la page
const preloadCriticalSections = () => {
  AboutSectionPreview.preload();
  PortfolioSectionPreview.preload();
};

// Préchargement des sections secondaires
const preloadSecondarySections = () => {
  SkillsSectionPreview.preload();
  ServicesSectionPreview.preload();
  BlogSectionEnhanced.preload();
  ContactSection.preload();
};

// Déclenchement du préchargement après le chargement initial
if (typeof window !== 'undefined') {
  // Précharger les sections critiques après 1 seconde
  setTimeout(preloadCriticalSections, 1000);
  
  // Précharger les sections secondaires après 3 secondes
  setTimeout(preloadSecondarySections, 3000);
}

const HomePage = () => {
  return (
    <>
      <SEOHelmet 
        title={seoData.home.title}
        description={seoData.home.description}
        canonicalUrl="/"
        schema={seoData.home.schema}
      />
      {/* La section Hero est chargée immédiatement car c'est la première chose que l'utilisateur voit */}
      <HeroSection />
      
      {/* Chargement différé des autres sections avec le composant LazySection */}
      <ErrorBoundary>
        <LazySection component={AboutSectionPreview} height="400px" />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LazySection component={SkillsSectionPreview} height="350px" />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LazySection component={PortfolioSectionPreview} height="450px" />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LazySection component={ServicesSectionPreview} height="400px" />
      </ErrorBoundary>
      
      {/* Section témoignages temporairement supprimée */}
      
      <ErrorBoundary>
        <LazySection component={BlogSectionEnhanced} height="450px" />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <LazySection component={ContactSection} height="350px" />
      </ErrorBoundary>
    </>  
  );
};

export default HomePage;
