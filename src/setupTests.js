// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-styled-components';
import { toHaveNoViolations } from 'jest-axe';

// Extension des matchers Jest pour inclure les tests d'accessibilité
expect.extend(toHaveNoViolations);

// Mock pour IntersectionObserver qui n'est pas disponible dans l'environnement de test
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock pour window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock pour window.scrollTo
window.scrollTo = jest.fn();

// Configuration pour les tests d'accessibilité
const originalConsoleError = console.error;
console.error = (...args) => {
  // Filtrer les avertissements liés aux tests d'accessibilité
  if (args[0].includes('Warning: An update to Component inside a test was not wrapped in act')) {
    return;
  }
  originalConsoleError(...args);
};
