import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight, FaLaptopCode, FaPencilRuler, FaMobileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';

const ServicesContainer = styled.section`
  padding: 80px 0;
  background-color: var(--color-gray-light);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 20% 80%, rgba(26, 35, 126, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;


const ServicesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  z-index: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    
    &:after {
      transform: scaleX(1);
    }
  }
`;

const ServiceIcon = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
  color: var(--color-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  svg {
    font-size: 1.8rem;
    color: white;
    transition: all 0.3s ease;
  }
  
  ${ServiceCard}:hover & {
    background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));
    transform: scale(1.05) rotate(5deg);
    
    svg {
      transform: scale(1.1);
    }
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 15px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-weight: 700;
  color: var(--color-blue);
  display: inline-block;
  position: relative;
  padding-bottom: 12px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--color-orange);
    transition: all 0.3s ease;
  }
  
  ${ServiceCard}:hover & {
    color: var(--color-blue-dark);
    
    &:after {
      width: 60px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    }
  }
`;

const ServiceDescription = styled.p`
  color: var(--color-gray-dark);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  
  ${ServiceCard}:hover & {
    color: var(--color-text);
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 25px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const ViewMoreButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: var(--color-blue);
  border: 2px solid var(--color-blue);
  padding: 10px 20px;
  border-radius: 30px;
  font-weight: 600;
  margin-top: auto;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  align-self: flex-start;
  text-decoration: none;
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
    
    svg {
      transform: translateX(5px);
    }
  }
  
  ${ServiceCard}:hover & {
    background-color: var(--color-orange);
    color: black;
    border-color: var(--color-orange);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
  }
`;

const SeeAllButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  color: black;
  padding: 14px 30px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
  margin: 40px auto 0;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(to right, var(--color-orange), var(--color-orange-dark));
    transition: width 0.3s ease;
    z-index: -1;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(26, 35, 126, 0.3);
    
    &:before {
      width: 100%;
    }
    
    svg {
      transform: translateX(5px);
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const ServicesSectionPreview = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <ServicesContainer id="services-preview">
      <SectionHeader
        backgroundText="SERVICES"
        title="Mes Services"
        subtitle="Je propose une gamme complète de services pour répondre à vos besoins en développement web et design."
      />
      
      <ServicesContent>
        <ServicesGrid>
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            id="design"
            onMouseEnter={() => setHoveredCard('design')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <ServiceIcon className="service-icon">
              <FaPencilRuler />
            </ServiceIcon>
            <ServiceTitle>Web Design</ServiceTitle>
            <ServiceDescription>
              Création de designs modernes, attrayants et fonctionnels pour votre site web ou application.
            </ServiceDescription>
            <ButtonContainer>
              <ViewMoreButton 
                to="/services/design" 
                $cardHovered={hoveredCard === 'design'}
              >
                <span>Voir plus</span> <FaArrowRight />
              </ViewMoreButton>
            </ButtonContainer>
          </ServiceCard>
          
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            id="creation-site"
            onMouseEnter={() => setHoveredCard('creation-site')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <ServiceIcon className="service-icon">
              <FaLaptopCode />
            </ServiceIcon>
            <ServiceTitle>Développement Web</ServiceTitle>
            <ServiceDescription>
              Développement de sites web sur mesure, e-commerce et applications web avec les dernières technologies.
            </ServiceDescription>
            <ButtonContainer>
              <ViewMoreButton 
                to="/services/creation-site" 
                $cardHovered={hoveredCard === 'creation-site'}
              >
                <span>Voir plus</span> <FaArrowRight />
              </ViewMoreButton>
            </ButtonContainer>
          </ServiceCard>
          
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            id="applications"
            onMouseEnter={() => setHoveredCard('applications')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <ServiceIcon className="service-icon">
              <FaMobileAlt />
            </ServiceIcon>
            <ServiceTitle>Applications Web</ServiceTitle>
            <ServiceDescription>
              Développement d'applications web performantes et personnalisées pour répondre à vos besoins spécifiques.
            </ServiceDescription>
            <ButtonContainer>
              <ViewMoreButton 
                to="/services/applications" 
                $cardHovered={hoveredCard === 'applications'}
              >
                <span>Voir plus</span> <FaArrowRight />
              </ViewMoreButton>
            </ButtonContainer>
          </ServiceCard>
        </ServicesGrid>
        
        <ButtonWrapper>
          <SeeAllButton to="/services">
            Voir tous les services <FaArrowRight />
          </SeeAllButton>
        </ButtonWrapper>
      </ServicesContent>
    </ServicesContainer>
  );
};

export default ServicesSectionPreview;
