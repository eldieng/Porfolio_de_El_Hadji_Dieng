import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaUserGraduate, FaBriefcase } from 'react-icons/fa';

const AboutContainer = styled.section`
  padding: 80px 0;
  background-color: var(--color-white);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 80% 90%, rgba(26, 35, 126, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const AboutImage = styled(motion.div)`
  position: relative;
  
  img {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
    transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  &:before {
    content: '';
    position: absolute;
    top: -20px;
    left: -20px;
    width: 100%;
    height: 100%;
    border: 5px solid transparent;
    border-image: linear-gradient(to right, var(--color-blue), var(--color-orange)) 1;
    border-radius: 15px;
    z-index: -1;
  }
`;

const AboutInfo = styled(motion.div)`
  position: relative;
  
  &:before {
    content: 'ABOUT';
    position: absolute;
    top: -40px;
    left: 0;
    font-size: 120px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.03);
    letter-spacing: 10px;
    z-index: 0;
    white-space: nowrap;
    pointer-events: none;
    
    @media (max-width: 768px) {
      font-size: 80px;
      top: -30px;
    }
  }
  
  h2 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    position: relative;
    z-index: 1;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
    
    @media (max-width: 768px) {
      font-size: 2.3rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 100px;
      height: 5px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 5px;
    }
  }
  
  h3 {
    font-size: 1.6rem;
    color: var(--color-blue);
    margin-bottom: 25px;
    margin-top: 30px;
    font-weight: 600;
    position: relative;
    z-index: 1;
  }
  
  p {
    margin-bottom: 25px;
    line-height: 1.9;
    font-size: 1.05rem;
    color: var(--color-gray-dark);
    position: relative;
    z-index: 1;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin: 30px 0;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    gap: 15px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const StatItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  padding: 25px 20px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
  
  svg {
    font-size: 2rem;
    margin-bottom: 15px;
    color: var(--color-blue);
    transition: all 0.3s ease;
  }
  
  h4 {
    font-size: 2rem;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
    font-weight: 700;
  }
  
  p {
    font-size: 1rem;
    margin-bottom: 0;
    color: var(--color-gray-dark);
    font-weight: 500;
  }
`;

const ViewMoreButton = styled(Link)`
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

const AboutSectionPreview = () => {
  return (
    <AboutContainer id="about-preview">
      <AboutContent>
        <AboutImage
          initial={{ opacity: 0, x: -50, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15, 
            delay: 0.1 
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <img src="/assets/images/profile.jpg" alt="El Hadji Dieng" />
        </AboutImage>
        
        <AboutInfo
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15, 
            delay: 0.2 
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2>À propos de moi</h2>
          <h3>Développeur Front-End | Webmaster | Designer UI/UX</h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Je suis un développeur Front-End passionné avec plus de 5 ans d'expérience dans la création de sites web et d'applications modernes. Ma spécialité est de concevoir des interfaces utilisateur élégantes et fonctionnelles qui offrent une expérience utilisateur exceptionnelle.
          </motion.p>
          
          <StatsContainer
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <FaUserGraduate />
              <h4>5+</h4>
              <p>Années d'expérience</p>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <FaBriefcase />
              <h4>50+</h4>
              <p>Projets réalisés</p>
            </StatItem>
          </StatsContainer>
          
          <ViewMoreButton 
            to="/a-propos"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            En savoir plus <FaArrowRight />
          </ViewMoreButton>
        </AboutInfo>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSectionPreview;
