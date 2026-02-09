import React from 'react';
import styled from 'styled-components';
import ContactSection from '../components/sections/ContactSection';
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

const ContactPage = () => {
  return (
    <>
      <SEOHelmet 
        title={seoData.contact.title}
        description={seoData.contact.description}
        canonicalUrl="/contact"
        schema={seoData.contact.schema}
      />
      <PageHeader>
        <h1>Me Contacter</h1>
      </PageHeader>
      <ContactSection />
    </>
  );
};

export default ContactPage;
