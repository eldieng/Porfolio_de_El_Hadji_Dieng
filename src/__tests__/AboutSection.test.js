import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutSection from '../components/sections/AboutSection';
import { LanguageProvider } from '../utils/LanguageContext';

// Mock pour IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Wrapper pour rendre l'AboutSection avec tous les contextes nécessaires
const renderAboutSection = () => {
  return render(
    <LanguageProvider>
      <AboutSection />
    </LanguageProvider>
  );
};

describe('AboutSection Component', () => {
  test('rend la section À propos avec les informations correctes', () => {
    renderAboutSection();
    
    // Vérifier que le titre est présent
    expect(screen.getByText(/À propos de moi/i)).toBeInTheDocument();
    
    // Vérifier que les informations personnelles sont présentes
    expect(screen.getByText(/El Hadji Dieng/i)).toBeInTheDocument();
    expect(screen.getByText(/Développeur Full Stack/i)).toBeInTheDocument();
    
    // Vérifier que les statistiques sont présentes
    expect(screen.getByText(/Projets Complétés/i)).toBeInTheDocument();
    expect(screen.getByText(/Années d'expérience/i)).toBeInTheDocument();
    expect(screen.getByText(/Clients Satisfaits/i)).toBeInTheDocument();
  });

  test('le bouton de téléchargement du CV est présent avec le bon lien', () => {
    renderAboutSection();
    
    // Vérifier que le bouton de téléchargement du CV est présent
    const downloadButton = screen.getByText(/Télécharger mon CV/i);
    expect(downloadButton).toBeInTheDocument();
    
    // Vérifier que le lien pointe vers le bon fichier
    const downloadLink = downloadButton.closest('a');
    expect(downloadLink).toHaveAttribute('href', '/assets/cv/cv-el-hadji-dieng.pdf');
    expect(downloadLink).toHaveAttribute('target', '_blank');
    expect(downloadLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
