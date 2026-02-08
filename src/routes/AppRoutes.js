import React, { Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazyWithPreload } from '../utils/LazyLoad';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';
import PageTransition from '../components/common/PageTransition';

// Importation différée des pages
const HomePage = lazyWithPreload(() => import('../pages/HomePage'));
const AboutPage = lazyWithPreload(() => import('../pages/AboutPage'));
const SkillsPage = lazyWithPreload(() => import('../pages/SkillsPage'));
const PortfolioPage = lazyWithPreload(() => import('../pages/PortfolioPage'));
const ProjectDetailPage = lazyWithPreload(() => import('../pages/ProjectDetail/ProjectDetailPage'));
const ServicesPage = lazyWithPreload(() => import('../pages/ServicesPage'));
const ServiceDetailPage = lazyWithPreload(() => import('../pages/ServiceDetailPage'));
const QuoteRequestPage = lazyWithPreload(() => import('../pages/QuoteRequestPage'));
const ContactPage = lazyWithPreload(() => import('../pages/ContactPage'));

// Nouvelles pages du blog
const BlogPage = lazyWithPreload(() => import('../pages/BlogPage'));
const BlogPostPage = lazyWithPreload(() => import('../pages/BlogPostPage'));

// Page d'erreur 404
const PageNotFound = lazyWithPreload(() => import('../pages/PageNotFound'));

// Préchargement des pages les plus fréquemment visitées
export const preloadFrequentPages = () => {
  if (typeof window !== 'undefined') {
    // Préchargement après un délai pour ne pas interférer avec le chargement initial
    setTimeout(() => {
      AboutPage.preload();
      PortfolioPage.preload();
      ContactPage.preload();
      BlogPage.preload(); // Préchargement de la page blog
    }, 2000);
  }
};

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <ErrorBoundary refreshOnError={true}>
      <Suspense fallback={<LoadingSpinner />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/a-propos" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/competences" element={<PageTransition><SkillsPage /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
            <Route path="/project/:projectId" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
            <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
            <Route path="/services/:serviceId" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
            <Route path="/demande-devis" element={<PageTransition><QuoteRequestPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
            <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogPostPage /></PageTransition>} />
            <Route path="*" element={<PageTransition><PageNotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
