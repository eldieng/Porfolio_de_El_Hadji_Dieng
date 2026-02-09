import React from 'react';
import styled from 'styled-components';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
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
  
  @media (max-width: 1024px) {
    height: 250px;
  }
  
  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 0;
    
    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const AboutPage = () => {
  return (
    <>
      <SEOHelmet 
        title={seoData.about.title}
        description={seoData.about.description}
        canonicalUrl="/a-propos"
        schema={seoData.about.schema}
      />
      <PageHeader>
        <h1>À Propos de Moi</h1>
      </PageHeader>
      <AboutSection />
      <SkillsSection />
    </>
  );
};

export default AboutPage;
