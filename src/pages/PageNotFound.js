import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaSearch } from 'react-icons/fa';
import SEOHelmet from '../utils/SEOHelmet';

const PageNotFound = () => {
  return (
    <>
      <SEOHelmet
        title="Page non trouvée | El Hadji Dieng"
        description="La page que vous recherchez n'existe pas ou a été déplacée."
        canonicalUrl="/404"
      />
      
      <NotFoundContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorCode>404</ErrorCode>
        <Title>Page non trouvée</Title>
        <Description>
          La page que vous recherchez n'existe pas ou a été déplacée.
        </Description>
        
        <ButtonsContainer>
          <HomeButton to="/">
            <FaHome /> Retour à l'accueil
          </HomeButton>
          <SearchButton to="/blog">
            <FaSearch /> Explorer le blog
          </SearchButton>
        </ButtonsContainer>
      </NotFoundContainer>
    </>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  text-align: center;
  background-color: var(--color-light);
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin: 20px 0;
  color: var(--color-blue-dark);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 500px;
  margin-bottom: 30px;
  color: var(--color-gray-dark);
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    width: 100%;
    max-width: 250px;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
  }
`;

const HomeButton = styled(Button)`
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  color: white;
  box-shadow: 0 4px 10px rgba(26, 35, 126, 0.3);
  
  &:hover {
    box-shadow: 0 6px 15px rgba(26, 35, 126, 0.4);
  }
`;

const SearchButton = styled(Button)`
  background-color: white;
  color: var(--color-blue-dark);
  border: 2px solid var(--color-blue);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  
  &:hover {
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }
`;

export default PageNotFound;
