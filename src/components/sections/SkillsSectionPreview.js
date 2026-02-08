import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaFigma, FaArrowRight, FaWordpress } from 'react-icons/fa';
import { SiNotion, SiJira } from 'react-icons/si';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';

const SkillsContainer = styled.section`
  padding: 80px 0;
  background-color: var(--color-gray-light);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 80% 20%, rgba(26, 35, 126, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 20% 80%, rgba(255, 87, 34, 0.02) 0%, transparent 50%);
    pointer-events: none;
  }
`;


const SkillsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SkillsPreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SkillCard = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 12px;
  padding: 20px 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    
    &:after {
      transform: scaleX(1);
    }
    
    svg {
      color: var(--color-blue);
      transform: scale(1.1);
    }
    
    h4 {
      color: var(--color-blue);
    }
  }
`;

const SkillIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: var(--color-blue-dark);
  transition: all 0.3s ease;
  
  svg {
    filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.1));
    transition: all 0.3s ease;
  }
`;

const SkillName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--color-text);
  transition: all 0.3s ease;
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
  margin: 20px auto 0;
  
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
  margin-top: 20px;
`;

const SkillsSectionPreview = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const skillVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <SkillsContainer id="skills-preview">
      <SectionHeader
        backgroundText="SKILLS"
        title="Mes Compétences"
        subtitle="Découvrez les technologies et outils que j'utilise pour créer des expériences web exceptionnelles."
      />
      
      <SkillsContent>
        <SkillsPreviewGrid
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SkillCard variants={skillVariants} 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ 
              opacity: 1, 
              y: 0, 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ 
              duration: 0.7,
              delay: 0.1,
              type: "spring",
              stiffness: 100
            }}
            viewport={{ once: true }}
          >
            <SkillIcon style={{ fontSize: "3rem", color: "var(--color-blue)" }}>
              <FaWordpress />
            </SkillIcon>
            <SkillName style={{ fontSize: "1.1rem", fontWeight: 700 }}>WordPress</SkillName>
          </SkillCard>
          
          <SkillCard variants={skillVariants}>
            <SkillIcon>
              <FaReact />
            </SkillIcon>
            <SkillName>React</SkillName>
          </SkillCard>
          
          <SkillCard variants={skillVariants}>
            <SkillIcon>
              <FaNodeJs />
            </SkillIcon>
            <SkillName>Node.js</SkillName>
          </SkillCard>
          
          <SkillCard variants={skillVariants}>
            <SkillIcon>
              <FaFigma />
            </SkillIcon>
            <SkillName>Figma</SkillName>
          </SkillCard>
          
          <SkillCard variants={skillVariants}>
            <SkillIcon>
              <SiNotion />
            </SkillIcon>
            <SkillName>Notion</SkillName>
          </SkillCard>
          
          <SkillCard variants={skillVariants}>
            <SkillIcon>
              <SiJira />
            </SkillIcon>
            <SkillName>Jira</SkillName>
          </SkillCard>
        </SkillsPreviewGrid>
        
        <ButtonWrapper>
          <SeeAllButton to="/competences">
            Voir toutes mes compétences <FaArrowRight />
          </SeeAllButton>
        </ButtonWrapper>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default SkillsSectionPreview;
