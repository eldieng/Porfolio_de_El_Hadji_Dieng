import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaDownload, FaUserGraduate, FaBriefcase, FaAward } from 'react-icons/fa';
import { useLanguage } from '../../utils/LanguageContext';

const AboutContainer = styled.section`
  padding: 100px 0;
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
    transform: perspective(1000px) rotateY(0deg);
  }
  
  &:hover img {
    transform: perspective(1000px) rotateY(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
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
    transition: all 0.3s ease;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    right: -15px;
    width: 80%;
    height: 80%;
    background: linear-gradient(135deg, rgba(26, 35, 126, 0.1), rgba(255, 87, 34, 0.1));
    border-radius: 15px;
    z-index: -2;
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
    
    @media (max-width: 576px) {
      font-size: 60px;
      letter-spacing: 5px;
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
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin: 40px 0;
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
  padding: 30px 20px;
  border-radius: 15px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
    
    &:before {
      transform: scaleX(1);
    }
    
    svg {
      transform: scale(1.2);
      color: var(--color-orange);
    }
  }
  
  svg {
    font-size: 2.2rem;
    color: var(--color-blue);
    margin-bottom: 15px;
    transition: all 0.4s ease;
  }
  
  h4 {
    font-size: 2.2rem;
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

const DownloadButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  color: var(--color-black);
  padding: 16px 35px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 1.1rem;
  margin-top: 30px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
  text-decoration: none;
  border: 2px solid var(--color-white);
  
  svg {
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, var(--color-orange), var(--color-orange-dark));
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(26, 35, 126, 0.3);
    
    &:before {
      transform: scaleX(1);
      transform-origin: left;
    }
    
    svg {
      transform: translateY(-3px);
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const AboutSection = () => {
  const { t } = useLanguage();
  
  return (
    <AboutContainer id="about">
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
            Je suis un développeur Front-End passionné avec plus de 5 ans d'expérience dans la création d'interfaces web modernes et interactives. Ma spécialité est de transformer des concepts créatifs en sites web performants et esthétiques, en combinant ma maîtrise des langages front-end avec mon sens aigu du design UI/UX.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            En tant que Webmaster expérimenté, je maîtrise parfaitement WordPress et ses outils de personnalisation comme Elementor Pro, ainsi que les technologies front-end essentielles (HTML5, CSS3, JavaScript, React). Mon expertise en design UI/UX me permet de créer des expériences utilisateur intuitives et engageantes. Je suis constamment à l'affût des dernières tendances web pour offrir des solutions digitales innovantes et adaptées aux besoins spécifiques de chaque projet.
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
            <StatItem
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <FaAward />
              <h4>15</h4>
              <p>Récompenses</p>
            </StatItem>
          </StatsContainer>
          
          <DownloadButton 
            href="/assets/cv/CV_Elhadji_Dieng.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(26, 35, 126, 0.3)" }}
            whileTap={{ y: -2 }}
          >
            <FaDownload /> Télécharger mon CV
          </DownloadButton>
        </AboutInfo>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;
