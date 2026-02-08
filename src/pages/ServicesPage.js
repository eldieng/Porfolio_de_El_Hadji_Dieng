import React from 'react';
import styled from 'styled-components';
import ServicesSection from '../components/sections/ServicesSection';
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

const ServicesPage = () => {
  return (
    <>
      <SEOHelmet 
        title={seoData.services.title}
        description={seoData.services.description}
        canonicalUrl="/services"
        schema={seoData.services.schema}
      />
      <PageHeader>
        <h1>Mes Services</h1>
      </PageHeader>
      <ServicesSection />
      {/* Section témoignages temporairement supprimée */}
    </>
  );
};

export default ServicesPage;
