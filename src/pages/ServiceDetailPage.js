import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaFileAlt } from 'react-icons/fa';
import SEOHelmet from '../utils/SEOHelmet';
import { getServiceSEOData } from '../data/seoData';
import servicesData from '../data/servicesData';

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-gray-light);
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--color-blue);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-bottom: 20px;
  padding: 12px 24px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(26, 35, 126, 0.1);
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
    
    svg {
      transform: translateX(-5px);
    }
  }
`;

const PageHeader = styled.div`
  position: relative;
  height: 350px;
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'url("/assets/images/headers/services-header.jpg")'};  
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: var(--color-white);
  margin-bottom: 0;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(26, 35, 126, 0.9), rgba(26, 35, 126, 0.8));
    z-index: 1;
  }
  
  &:after {
    content: 'SERVICE';
    position: absolute;
    bottom: -30px;
    right: -30px;
    font-size: 180px;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.05);
    z-index: 1;
    line-height: 1;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    height: 280px;
    
    &:after {
      font-size: 120px;
      bottom: -20px;
      right: -20px;
    }
  }
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
  
  h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 576px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
      font-size: 1.1rem;
    }
  }
`;

const ContentContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1230px) {
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
`;

const ServiceDescription = styled.div`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-blue), var(--color-blue-dark));
  }
  
  h2 {
    font-size: 2.2rem;
    margin-bottom: 20px;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: black;
    position: relative;
    display: inline-block;
    font-weight: 700;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    }
  }
  
  .description {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 30px;
    white-space: pre-line;
    color: var(--color-gray-dark);
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    
    h2 {
      font-size: 1.8rem;
    }
    
    .description {
      font-size: 1rem;
    }
  }
`;

const ServiceImage = styled.div`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-orange), var(--color-orange-dark));
  }
  
  img {
    width: 100%;
    height: auto;
    max-height: 450px;
    object-fit: contain;
    display: block;
    border-radius: 8px;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.03);
  }
  
  @media (max-width: 768px) {
    padding: 12px;
    
    img {
      max-height: 350px;
    }
  }
`;

const FeaturesSection = styled.div`
  margin-top: 40px;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-blue), var(--color-orange));
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: black;
    position: relative;
    display: inline-block;
    font-weight: 700;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    }
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    margin-top: 40px;
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

const FeaturesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  list-style: none;
  padding: 0;
  margin-top: 20px;
  
  li {
    padding: 15px 20px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.95));
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    font-weight: 500;
    color: var(--color-gray-dark);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
    
    svg {
      color: var(--color-orange);
      flex-shrink: 0;
      font-size: 1.1rem;
      background: linear-gradient(135deg, var(--color-blue), var(--color-orange));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    
    li {
      padding: 12px 15px;
      font-size: 0.9rem;
    }
  }
`;

const ProcessSection = styled.div`
  margin-top: 40px;
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-orange), var(--color-blue));
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: black;
    position: relative;
    display: inline-block;
    font-weight: 700;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 60px;
      height: 3px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    }
  }
  
  @media (max-width: 768px) {
    padding: 25px;
    margin-top: 40px;
    
    h3 {
      font-size: 1.5rem;
    }
  }
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const ProcessStep = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    
    .step-number {
      background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
      box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
    }
    
    .step-content {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }
  }
  
  .step-number {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
    box-shadow: 0 4px 10px rgba(26, 35, 126, 0.15);
    transition: all 0.3s ease;
    font-size: 1.1rem;
  }
  
  .step-content {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px 25px;
    border-radius: 10px;
    flex-grow: 1;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
    
    h4 {
      margin-top: 0;
      margin-bottom: 10px;
      background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
      -webkit-background-clip: text;
      -webkit-text-fill-color: black;
      font-weight: 600;
      font-size: 1.2rem;
    }
    
    p {
      color: var(--color-gray-dark);
      line-height: 1.6;
      margin: 0;
    }
  }
  
  @media (max-width: 768px) {
    .step-number {
      width: 35px;
      height: 35px;
      font-size: 0.9rem;
    }
    
    .step-content {
      padding: 15px 20px;
      
      h4 {
        font-size: 1.1rem;
      }
      
      p {
        font-size: 0.95rem;
      }
    }
  }
`;

const CTASection = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.03);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
  }
  
  h3 {
    font-size: 1.8rem;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: black;
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  p {
    font-size: 1.1rem;
    color: var(--color-gray-dark);
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto 30px;
  }
  
  @media (max-width: 768px) {
    padding: 30px 20px;
    
    h3 {
      font-size: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
  color: white;
  text-decoration: none;
  padding: 16px 30px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(26, 35, 126, 0.25);
    
    &:before {
      opacity: 1;
    }
    
    svg {
      transform: translateX(3px);
    }
  }
  
  svg {
    margin-right: 10px;
    position: relative;
    z-index: 2;
    transition: transform 0.3s ease;
  }
  
  span {
    position: relative;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    padding: 12px 24px;
    font-size: 1rem;
  }
`;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 20px;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--color-blue);
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
    max-width: 600px;
    color: var(--color-text);
  }
`;

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];
  
  // Obtenir les données SEO pour ce service
  const serviceSEO = getServiceSEOData(serviceId, service);

  // Variantes d'animation
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  if (!service) {
    return (
      <NotFoundContainer>
        <SEOHelmet 
          title="Service non trouvé"
          description="Le service demandé n'existe pas dans notre liste de services."
          canonicalUrl="/services"
        />
        <h1>Service non trouvé</h1>
        <p>Le service que vous recherchez n'existe pas ou a été supprimé.</p>
        <BackLink to="/services">
          <FaArrowLeft /> Retour aux services
        </BackLink>
      </NotFoundContainer>
    );
  }
  
  return (
    <PageContainer>
      <SEOHelmet 
        title={serviceSEO.title}
        description={serviceSEO.description}
        canonicalUrl={`/services/${serviceId}`}
        schema={serviceSEO.schema}
      />
      <PageHeader bgImage={service.image}>
        <HeaderContent>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {service.description}
          </motion.p>
        </HeaderContent>
      </PageHeader>
      
      <ContentContainer>
        <BackLink to="/services">
          <FaArrowLeft /> <span>Retour aux services</span>
        </BackLink>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <ServiceContent>
            <ServiceImage>
              <img src={service.image} alt={service.title} />
            </ServiceImage>
            
            <ServiceDescription>
              <h2>À propos de ce service</h2>
              <div className="description">{service.fullDescription}</div>
            </ServiceDescription>
          </ServiceContent>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FeaturesSection>
            <h3>Caractéristiques</h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <FeaturesList>
                {service.features.map((feature, index) => (
                  <motion.li key={index} variants={itemFade}>
                    <FaCheck /> {feature}
                  </motion.li>
                ))}
              </FeaturesList>
            </motion.div>
          </FeaturesSection>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ProcessSection>
            <h3>Mon processus</h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <ProcessSteps>
                {service.process.map((step, index) => (
                  <motion.div key={index} variants={itemFade}>
                    <ProcessStep>
                      <div className="step-number">{index + 1}</div>
                      <div className="step-content">
                        <h4>Étape {index + 1}</h4>
                        <p>{step}</p>
                      </div>
                    </ProcessStep>
                  </motion.div>
                ))}
              </ProcessSteps>
            </motion.div>
          </ProcessSection>
        </motion.div>
        
        <CTASection
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3>Intéressé par ce service ?</h3>
          <p>
            Contactez-moi dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
            Je vous accompagnerai tout au long du processus pour vous assurer un résultat à la hauteur de vos attentes.
          </p>
          <CTAButton to="/demande-devis">
            <FaFileAlt />
            <span>Demander un devis</span>
          </CTAButton>
        </CTASection>
      </ContentContainer>
    </PageContainer>
  );
};

export default ServiceDetailPage;
