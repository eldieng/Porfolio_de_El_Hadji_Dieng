import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowRight, FaLaptopCode, FaPencilRuler, FaMobileAlt, FaSync, FaSearch, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../utils/LanguageContext';
import SectionHeader from '../common/SectionHeader';

const ServicesContainer = styled.section`
  padding: 70px 0;
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
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 25px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const ViewMoreButton = styled.button`
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
    border-color: var(--color-blue);
    
    &:after {
      transform: scaleX(1);
    }
    
    .service-icon img {
      transform: scale(1.1);
    }
  }
  
  &:hover ${ViewMoreButton} {
    background-color: white;
    color: var(--color-blue);
    border-color: var(--color-blue);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
  }
  
  &:hover ${ViewMoreButton}:hover {
    background-color: white;
    transform: translateY(-5px);
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
  font-size: 1.8rem;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  box-shadow: 0 5px 15px rgba(26, 35, 126, 0.15);
  
  svg {
    transition: transform 0.3s ease;
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
    left: 0;
    bottom: 0;
    width: 50px;
    height: 4px;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    border-radius: 2px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  ${ServiceCard}:hover & {
    color: var(--color-blue-dark);
    
    &:after {
      width: 70px;
      background: linear-gradient(to right, var(--color-blue-dark), var(--color-orange));
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



const ServicesSection = () => {
  const { language, translations } = useLanguage();
  const [hoveredCard, setHoveredCard] = React.useState(null);
  
  return (
    <ServicesContainer id="services">
      <SectionHeader
        backgroundText="SERVICES"
        title="Mes Services"
        subtitle="Je propose une gamme complète de services web pour répondre à vos besoins digitaux, de la conception à la mise en ligne."
      />
      
      <ServicesContent>
        <ServicesGrid>
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            id="creation-site"
            onMouseEnter={() => setHoveredCard('creation-site')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.location.href = '/services/creation-site'}
          >
            <ServiceIcon className="service-icon">
              <FaLaptopCode />
            </ServiceIcon>
            <ServiceTitle>Création de Sites Web</ServiceTitle>
            <ServiceDescription>
              Conception et développement de sites web modernes, responsives et optimisés pour tous les appareils.
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
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            id="design"
            onMouseEnter={() => setHoveredCard('design')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.location.href = '/services/design'}
          >
            <ServiceIcon className="service-icon">
              <FaPencilRuler />
            </ServiceIcon>
            <ServiceTitle>Design UI/UX</ServiceTitle>
            <ServiceDescription>
              Création d'interfaces utilisateur intuitives et esthétiques pour une expérience utilisateur optimale.
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
            id="applications"
            onMouseEnter={() => setHoveredCard('applications')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.location.href = '/services/applications'}
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
          
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            id="refonte"
            onMouseEnter={() => setHoveredCard('refonte')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.location.href = '/services/refonte'}
          >
            <ServiceIcon className="service-icon">
              <FaSync />
            </ServiceIcon>
            <ServiceTitle>Refonte de Sites Web</ServiceTitle>
            <ServiceDescription>
              Modernisation complète de sites web existants pour améliorer leur apparence, performances et expérience utilisateur.
            </ServiceDescription>
            <ButtonContainer>
              <ViewMoreButton 
                to="/services/refonte" 
                $cardHovered={hoveredCard === 'refonte'}
              >
                <span>Voir plus</span> <FaArrowRight />
              </ViewMoreButton>
            </ButtonContainer>
          </ServiceCard>
          
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            id="seo"
            onMouseEnter={() => setHoveredCard('seo')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.location.href = '/services/seo'}
          >
            <ServiceIcon className="service-icon">
              <FaSearch />
            </ServiceIcon>
            <ServiceTitle>Référencement SEO</ServiceTitle>
            <ServiceDescription>
              Optimisation de votre site pour les moteurs de recherche afin d'améliorer sa visibilité et générer plus de trafic.
            </ServiceDescription>
            <ButtonContainer>
              <ViewMoreButton 
                to="/services/seo" 
                $cardHovered={hoveredCard === 'seo'}
              >
                <span>Voir plus</span> <FaArrowRight />
              </ViewMoreButton>
            </ButtonContainer>
          </ServiceCard>
          
          <ServiceCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            id="maintenance"
            onMouseEnter={() => setHoveredCard('maintenance')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => window.location.href = '/services/maintenance'}
          >
            <ServiceIcon className="service-icon">
              <FaTools />
            </ServiceIcon>
            <ServiceTitle>Maintenance & Support</ServiceTitle>
            <ServiceDescription>
              Services de maintenance et support technique pour assurer le bon fonctionnement de votre site.
            </ServiceDescription>
            <ButtonContainer>
              <ViewMoreButton 
                to="/services/maintenance" 
                $cardHovered={hoveredCard === 'maintenance'}
              >
                <span>Voir plus</span> <FaArrowRight />
              </ViewMoreButton>
            </ButtonContainer>
          </ServiceCard>
        </ServicesGrid>
      </ServicesContent>
    </ServicesContainer>
  );
};

export default ServicesSection;
