import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccessibilityProvider, { useAccessibility } from '../components/accessibility/AccessibilityProvider';

// Composant de test pour accéder au contexte
const TestComponent = () => {
  const { 
    highContrast, 
    setHighContrast, 
    fontSize, 
    setFontSize, 
    reducedMotion, 
    setReducedMotion 
  } = useAccessibility();

  return (
    <div>
      <button 
        data-testid="toggle-contrast"
        onClick={() => setHighContrast(!highContrast)}
      >
        {highContrast ? 'Désactiver' : 'Activer'} le contraste élevé
      </button>
      <button 
        data-testid="increase-font"
        onClick={() => setFontSize(1.25)}
      >
        Augmenter la taille du texte
      </button>
      <button 
        data-testid="toggle-motion"
        onClick={() => setReducedMotion(!reducedMotion)}
      >
        {reducedMotion ? 'Activer' : 'Réduire'} les animations
      </button>
      <div data-testid="contrast-status">
        Contraste élevé: {highContrast ? 'activé' : 'désactivé'}
      </div>
      <div data-testid="font-status">
        Taille du texte: {fontSize}
      </div>
      <div data-testid="motion-status">
        Animations réduites: {reducedMotion ? 'activé' : 'désactivé'}
      </div>
    </div>
  );
};

describe('AccessibilityProvider', () => {
  test('fournit les valeurs et fonctions d\'accessibilité par défaut', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    // Vérifier les valeurs par défaut
    expect(screen.getByTestId('contrast-status')).toHaveTextContent('Contraste élevé: désactivé');
    expect(screen.getByTestId('font-status')).toHaveTextContent('Taille du texte: 1');
    expect(screen.getByTestId('motion-status')).toHaveTextContent('Animations réduites: désactivé');
  });

  test('permet de modifier le contraste élevé', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    // Activer le contraste élevé
    fireEvent.click(screen.getByTestId('toggle-contrast'));
    expect(screen.getByTestId('contrast-status')).toHaveTextContent('Contraste élevé: activé');

    // Désactiver le contraste élevé
    fireEvent.click(screen.getByTestId('toggle-contrast'));
    expect(screen.getByTestId('contrast-status')).toHaveTextContent('Contraste élevé: désactivé');
  });

  test('permet de modifier la taille du texte', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    // Augmenter la taille du texte
    fireEvent.click(screen.getByTestId('increase-font'));
    expect(screen.getByTestId('font-status')).toHaveTextContent('Taille du texte: 1.25');
  });

  test('permet de modifier les animations réduites', () => {
    render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    // Réduire les animations
    fireEvent.click(screen.getByTestId('toggle-motion'));
    expect(screen.getByTestId('motion-status')).toHaveTextContent('Animations réduites: activé');

    // Activer les animations
    fireEvent.click(screen.getByTestId('toggle-motion'));
    expect(screen.getByTestId('motion-status')).toHaveTextContent('Animations réduites: désactivé');
  });

  test('affiche et masque le menu d\'accessibilité', () => {
    render(
      <AccessibilityProvider>
        <div data-testid="content">Contenu du site</div>
      </AccessibilityProvider>
    );

    // Vérifier que le bouton d'accessibilité est présent
    const accessibilityButton = screen.getByLabelText("Ouvrir les options d'accessibilité");
    expect(accessibilityButton).toBeInTheDocument();

    // Vérifier que le menu est initialement fermé
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Ouvrir le menu
    fireEvent.click(accessibilityButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText("Options d'accessibilité")).toBeInTheDocument();

    // Fermer le menu
    const closeButton = screen.getByLabelText("Fermer les options d'accessibilité");
    fireEvent.click(closeButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
