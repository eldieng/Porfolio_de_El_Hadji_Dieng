import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PortfolioSection from '../components/sections/PortfolioSection';
import { LanguageProvider } from '../utils/LanguageContext';

// Mock pour IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock des données de projets
jest.mock('../data/projectsData', () => ([
  {
    id: 1,
    title: 'Project 1',
    category: 'web-app',
    image: '/assets/images/projects/project1.png',
    description: 'Description of project 1',
    technologies: ['React', 'Node.js']
  },
  {
    id: 2,
    title: 'Project 2',
    category: 'wordpress',
    image: '/assets/images/projects/project2.png',
    description: 'Description of project 2',
    technologies: ['WordPress', 'PHP']
  },
  {
    id: 3,
    title: 'Project 3',
    category: 'ui-ux',
    image: '/assets/images/projects/project3.png',
    description: 'Description of project 3',
    technologies: ['Figma', 'Adobe XD']
  }
]));

const renderPortfolioSection = () => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        <PortfolioSection />
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('PortfolioSection Component', () => {
  test('rend le titre et la description de la section', () => {
    renderPortfolioSection();
    
    // Vérifier que le titre est présent
    expect(screen.getByText(/Mon Portfolio/i)).toBeInTheDocument();
  });

  test('affiche tous les projets initialement', () => {
    renderPortfolioSection();
    
    // Vérifier que tous les projets sont affichés
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
  });

  test('filtre les projets lorsqu\'on clique sur une catégorie', () => {
    renderPortfolioSection();
    
    // Cliquer sur le filtre WordPress
    const wordpressFilter = screen.getByText('WordPress');
    fireEvent.click(wordpressFilter);
    
    // Vérifier que seul le projet WordPress est affiché
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.queryByText('Project 3')).not.toBeInTheDocument();
  });

  test('réinitialise les filtres lorsqu\'on clique sur Tous', () => {
    renderPortfolioSection();
    
    // Cliquer sur un filtre
    const uiUxFilter = screen.getByText('UI/UX');
    fireEvent.click(uiUxFilter);
    
    // Vérifier que seul le projet UI/UX est affiché
    expect(screen.queryByText('Project 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Project 2')).not.toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
    
    // Cliquer sur le filtre Tous
    const allFilter = screen.getByText('Tous');
    fireEvent.click(allFilter);
    
    // Vérifier que tous les projets sont à nouveau affichés
    expect(screen.getByText('Project 1')).toBeInTheDocument();
    expect(screen.getByText('Project 2')).toBeInTheDocument();
    expect(screen.getByText('Project 3')).toBeInTheDocument();
  });

  test('les filtres ont la classe active lorsqu\'ils sont sélectionnés', () => {
    renderPortfolioSection();
    
    // Vérifier que le filtre Tous est actif initialement
    const allFilter = screen.getByText('Tous').closest('button');
    expect(allFilter).toHaveClass('active');
    
    // Cliquer sur le filtre Web App
    const webAppFilter = screen.getByText('Web App').closest('button');
    fireEvent.click(webAppFilter);
    
    // Vérifier que le filtre Web App est maintenant actif et que Tous ne l'est plus
    expect(webAppFilter).toHaveClass('active');
    expect(allFilter).not.toHaveClass('active');
  });
});
