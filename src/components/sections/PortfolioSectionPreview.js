import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

// Import des données de projets
import { projectsData } from '../../data/projectsData';
import SectionHeader from '../common/SectionHeader';
import OptimizedImage from '../common/OptimizedImage';

const PortfolioContainer = styled.section`
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


const PortfolioContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
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
    transition: transform 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: var(--color-blue);
    
    &:after {
      transform: scaleX(1);
    }
  }
`;

const ProjectImage = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
  
  picture, img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img,
  ${ProjectCard}:hover & picture img {
    transform: scale(1.05);
  }
`;

const ProjectInfo = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--color-blue);
  position: relative;
  transition: all 0.3s ease;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: var(--color-orange);
    transition: all 0.3s ease;
  }
  
  ${ProjectCard}:hover & {
    color: var(--color-blue-dark);
    
    &:after {
      width: 70px;
      background: linear-gradient(to right, var(--color-blue-dark), var(--color-orange));
    }
  }
`;

const ProjectDescription = styled.p`
  color: var(--color-gray-dark);
  line-height: 1.7;
  margin-bottom: 30px;
  font-size: 1rem;
  transition: all 0.3s ease;
  flex-grow: 1;
  
  ${ProjectCard}:hover & {
    color: var(--color-text);
  }
`;

const TechList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const TechItem = styled.span`
  font-size: 0.8rem;
  padding: 5px 12px;
  border-radius: 20px;
  background-color: var(--color-gray-light);
  color: var(--color-blue);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  ${ProjectCard}:hover & {
    border-color: rgba(26, 35, 126, 0.2);
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 10px;
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
  text-decoration: none;
  transition: all 0.3s ease;
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
    background-color: var(--color-blue);
    transition: width 0.3s ease;
    z-index: -1;
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--color-white);
    
    &:before {
      width: 100%;
    }
    
    svg {
      transform: translateX(5px);
    }
  }
  
  ${ProjectCard}:hover & {
    background-color: var(--color-orange);
    color: var(--color-black);
    border-color: var(--color-orange);
    transform: translateY(-5px);
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

const PortfolioSectionPreview = () => {
  // Sélectionner seulement 3 projets pour l'aperçu
  const featuredProjects = projectsData.slice(0, 3);

  return (
    <PortfolioContainer id="portfolio-preview">
      <SectionHeader
        backgroundText="PORTFOLIO"
        title="Mon Portfolio"
        subtitle="Découvrez mes projets récents et explorez mon travail dans différents domaines du développement web et du design."
      />
      
      <PortfolioContent>
        <ProjectsGrid>
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <ProjectImage>
                <OptimizedImage src={project.image} alt={project.title} objectFit="cover" />
              </ProjectImage>
              
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>
                  {project.description}
                </ProjectDescription>
                
                <TechList>
                  {project.technologies && project.technologies.slice(0, 3).map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
                
                <ButtonContainer>
                  <ViewMoreButton to={`/project/${project.id}`}>
                    <span>Voir les détails</span> <FaArrowRight />
                  </ViewMoreButton>
                </ButtonContainer>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        <ButtonWrapper>
          <SeeAllButton to="/portfolio">
            Voir tous les projets <FaArrowRight />
          </SeeAllButton>
        </ButtonWrapper>
      </PortfolioContent>
    </PortfolioContainer>
  );
};

export default PortfolioSectionPreview;
