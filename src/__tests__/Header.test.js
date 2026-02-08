import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from '../components/layout/Header';
import { LanguageProvider } from '../utils/LanguageContext';

// Mock pour IntersectionObserver qui n'est pas disponible dans l'environnement de test
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Wrapper pour rendre le Header avec tous les contextes nécessaires
const renderHeader = () => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <Header />
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  test('rend le logo et les liens de navigation', () => {
    renderHeader();
    
    // Vérifier que le logo est présent
    expect(screen.getByText(/El Hadji Dieng/i)).toBeInTheDocument();
    
    // Vérifier que les liens de navigation sont présents
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/À propos/i)).toBeInTheDocument();
    expect(screen.getByText(/Compétences/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Témoignages/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  test('ouvre et ferme le menu mobile lorsqu\'on clique sur le bouton hamburger', () => {
    renderHeader();
    
    // Le menu mobile devrait être fermé initialement
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveStyle('transform: translateX(100%)');
    
    // Cliquer sur le bouton hamburger pour ouvrir le menu
    const hamburgerButton = screen.getByTestId('hamburger-button');
    fireEvent.click(hamburgerButton);
    
    // Le menu mobile devrait être ouvert
    expect(mobileMenu).toHaveStyle('transform: translateX(0)');
    
    // Cliquer à nouveau pour fermer le menu
    fireEvent.click(hamburgerButton);
    
    // Le menu mobile devrait être fermé
    expect(mobileMenu).toHaveStyle('transform: translateX(100%)');
  });

  test('ferme le menu mobile lorsqu\'on clique sur un lien de navigation', () => {
    renderHeader();
    
    // Ouvrir le menu mobile
    const hamburgerButton = screen.getByTestId('hamburger-button');
    fireEvent.click(hamburgerButton);
    
    // Le menu mobile devrait être ouvert
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveStyle('transform: translateX(0)');
    
    // Cliquer sur un lien de navigation
    const homeLink = screen.getAllByText(/Accueil/i)[1]; // Prendre le lien dans le menu mobile
    fireEvent.click(homeLink);
    
    // Le menu mobile devrait être fermé
    expect(mobileMenu).toHaveStyle('transform: translateX(100%)');
  });
});
