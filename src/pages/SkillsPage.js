import React from 'react';
import styled from 'styled-components';
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
  
  h1 {
    font-size: 3rem;
    text-align: center;
    margin: 0;
  }
`;

const SkillsPage = () => {
  return (
    <>
      <SEOHelmet 
        title={seoData.skills.title}
        description={seoData.skills.description}
        canonicalUrl="/competences"
        schema={seoData.skills.schema}
      />
      <PageHeader>
        <h1>Mes Compétences</h1>
      </PageHeader>
      <SkillsSection />
    </>
  );
};

export default SkillsPage;
