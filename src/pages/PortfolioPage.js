import React from 'react';
import styled from 'styled-components';
import PortfolioSection from '../components/sections/PortfolioSection';
import { useLanguage } from '../utils/LanguageContext';
import SEOHelmet from '../utils/SEOHelmet';
import { seoData } from '../data/seoData';

const PageHeader = styled.div`
  height: 300px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/banner_page.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  
  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 0;
  }
`;

const PortfolioPage = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <SEOHelmet 
        title={seoData.portfolio.title}
        description={seoData.portfolio.description}
        canonicalUrl="/portfolio"
        schema={seoData.portfolio.schema}
      />
      <PageHeader>
        <h1>Mon Portfolio</h1>
      </PageHeader>
      <PortfolioSection />
    </>
  );
};

export default PortfolioPage;
