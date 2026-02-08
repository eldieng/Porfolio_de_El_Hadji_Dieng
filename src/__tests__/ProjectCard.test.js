import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import ProjectCard from '../components/projects/ProjectCard';

// Mock pour IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

const mockProject = {
  id: 1,
  title: 'Test Project',
  category: 'web-app',
  image: '/assets/images/projects/test-project.png',
  description: 'Test project description',
  fullDescription: 'This is a full description of the test project',
  technologies: ['React', 'Node.js', 'MongoDB'],
  liveLink: 'https://example.com',
  githubLink: 'https://github.com/example/test-project',
  figmaLink: ''
};

const renderProjectCard = (project = mockProject) => {
  return render(
    <BrowserRouter>
      <ProjectCard project={project} />
    </BrowserRouter>
  );
};

describe('ProjectCard Component', () => {
  test('rend correctement les informations du projet', () => {
    renderProjectCard();
    
    // Vérifier que le titre et la description sont présents
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test project description')).toBeInTheDocument();
    
    // Vérifier que l'image est présente avec le bon alt text
    const image = screen.getByAltText('Test Project');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/assets/images/projects/test-project.png');
  });

  test('affiche les technologies du projet', () => {
    renderProjectCard();
    
    // Vérifier que les technologies sont affichées
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
  });

  test('contient les liens vers le projet live et GitHub', () => {
    renderProjectCard();
    
    // Vérifier que les liens sont présents et pointent vers les bonnes URLs
    const liveLink = screen.getByTestId('live-link');
    expect(liveLink).toBeInTheDocument();
    expect(liveLink).toHaveAttribute('href', 'https://example.com');
    
    const githubLink = screen.getByTestId('github-link');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/example/test-project');
  });

  test('n\'affiche pas le lien Figma quand il n\'est pas fourni', () => {
    renderProjectCard();
    
    // Vérifier que le lien Figma n'est pas présent
    const figmaLinks = screen.queryAllByTestId('figma-link');
    expect(figmaLinks.length).toBe(0);
  });

  test('affiche le lien Figma quand il est fourni', () => {
    const projectWithFigma = {
      ...mockProject,
      figmaLink: 'https://figma.com/design/test'
    };
    
    renderProjectCard(projectWithFigma);
    
    // Vérifier que le lien Figma est présent et pointe vers la bonne URL
    const figmaLink = screen.getByTestId('figma-link');
    expect(figmaLink).toBeInTheDocument();
    expect(figmaLink).toHaveAttribute('href', 'https://figma.com/design/test');
  });

  test('ouvre la modal de détails quand on clique sur le bouton Détails', () => {
    renderProjectCard();
    
    // Cliquer sur le bouton Détails
    const detailsButton = screen.getByText('Détails');
    fireEvent.click(detailsButton);
    
    // Vérifier que la modal est ouverte et affiche la description complète
    expect(screen.getByText('This is a full description of the test project')).toBeInTheDocument();
  });
});
