import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '../../utils/LanguageContext';

const HeroContainer = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/assets/images/home page.jpg');
  background-size: cover;
  background-position: center;
  color: var(--color-white);
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 1;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  span {
    color: var(--color-orange);
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 30px;
  max-width: 700px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 20px;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: var(--color-orange);
  color: var(--color-white);
  padding: 12px 25px;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-white);
    color: var(--color-orange);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  color: var(--color-white);
  padding: 12px 25px;
  border-radius: 5px;
  font-weight: 500;
  border: 2px solid var(--color-white);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--color-white);
    color: var(--color-blue);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  span {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
  
  .mouse {
    width: 30px;
    height: 50px;
    border: 2px solid var(--color-white);
    border-radius: 20px;
    position: relative;
    
    &:before {
      content: '';
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      background-color: var(--color-white);
      border-radius: 50%;
      animation: scrollAnimation 2s infinite;
    }
  }
  
  @keyframes scrollAnimation {
    0% {
      transform: translate(-50%, 0);
      opacity: 1;
    }
    100% {
      transform: translate(-50%, 20px);
      opacity: 0;
    }
  }
`;

const HeroSection = () => {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Optimisation: Déclencher les animations seulement après le chargement complet
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };
  
  return (
    <HeroContainer id="home">
      <HeroContent>
        <HeroTitle
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, type: 'tween' }}
        >
          Bonjour, je suis <span>El Hadji Dieng</span>
        </HeroTitle>
        <HeroSubtitle
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: prefersReducedMotion ? 0 : 0.2, type: 'tween' }}
        >
          Développeur Front-End | Webmaster | Designer UI/UX passionné par la création de sites web modernes et l'expérience utilisateur
        </HeroSubtitle>
        
        <ButtonGroup
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.8, delay: prefersReducedMotion ? 0 : 0.4, type: 'tween' }}
        >
          <PrimaryButton to="/portfolio">
            Voir mon portfolio <FaArrowRight />
          </PrimaryButton>
          <SecondaryButton to="/contact">
            Me contacter
          </SecondaryButton>
        </ButtonGroup>
      </HeroContent>
      
      {!prefersReducedMotion && (
        <ScrollIndicator
          onClick={scrollToNextSection}
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span>Défiler vers le bas</span>
          <div className="mouse"></div>
        </ScrollIndicator>
      )}
    </HeroContainer>
  );
};

export default HeroSection;
