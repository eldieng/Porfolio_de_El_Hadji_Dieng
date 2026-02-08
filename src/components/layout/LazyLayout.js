import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';
import ErrorBoundary from '../common/ErrorBoundary';
import GlobalStyles from '../../styles/GlobalStyles';

// Header et Footer sont chargés directement (pas de lazy loading)
// car ce sont des composants de layout critiques visibles immédiatement
const LazyLayout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
      
      <main id="main-content">{children}</main>
      
      <ErrorBoundary>
        <Footer />
      </ErrorBoundary>
      
      <MobileBottomNav />
    </>
  );
};

// Plus besoin de préchargement car les composants sont importés directement
export const preloadLayoutComponents = () => {};

export default LazyLayout;
