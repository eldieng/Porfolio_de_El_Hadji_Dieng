import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../utils/LanguageContext';

// Composants à tester
import Header from '../components/layout/Header';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import SkillsSection from '../components/sections/SkillsSection';

// Étendre les matchers de Jest pour inclure toHaveNoViolations
expect.extend(toHaveNoViolations);

// Mock pour IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Wrapper pour rendre les composants avec tous les contextes nécessaires
const renderWithProviders = (ui) => {
  return render(
    <BrowserRouter>
      <LanguageProvider>
        {ui}
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('Accessibilité des composants', () => {
  it('Header ne devrait pas avoir de violations d\'accessibilité', async () => {
    const { container } = renderWithProviders(<Header />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('AboutSection ne devrait pas avoir de violations d\'accessibilité', async () => {
    const { container } = renderWithProviders(<AboutSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('ContactSection ne devrait pas avoir de violations d\'accessibilité', async () => {
    const { container } = renderWithProviders(<ContactSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('PortfolioSection ne devrait pas avoir de violations d\'accessibilité', async () => {
    const { container } = renderWithProviders(<PortfolioSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('SkillsSection ne devrait pas avoir de violations d\'accessibilité', async () => {
    const { container } = renderWithProviders(<SkillsSection />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
