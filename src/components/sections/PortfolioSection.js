import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../utils/LanguageContext';
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Import des données de projets
import { projectsData } from '../../data/projectsData';
import SectionHeader from '../common/SectionHeader';

const PortfolioContainer = styled.section`
  padding: 100px 0;
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

const FilterButtons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    gap: 10px;
  }
`;

const FilterButton = styled.button`
  background-color: ${({ active }) => active ? 'var(--color-blue)' : 'transparent'};
  color: ${({ active }) => active ? 'var(--color-white)' : 'var(--color-gray-dark)'};
  border: 2px solid ${({ active }) => active ? 'var(--color-blue)' : 'var(--color-gray-light)'};
  padding: 10px 24px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${({ active }) => active ? '0 4px 15px rgba(26, 35, 126, 0.2)' : 'none'};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-blue);
    opacity: 0;
    transform: scale(0.5);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: -1;
  }
  
  &:hover {
    color: var(--color-white);
    border-color: var(--color-blue);
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(26, 35, 126, 0.25);
    
    &:before {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
  
  @media (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 991px) and (min-width: 577px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  cursor: pointer;
  height: 100%;
  
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
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.5s ease;
  }
  
  ${ProjectCard}:hover & img {
    transform: scale(1.05);
  }
  
  @media (min-width: 992px) {
    height: 200px;
  }
  
  @media (min-width: 1200px) {
    height: 220px;
  }
`;


const ProjectInfo = styled.div`
  padding: 30px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 18px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-weight: 700;
  color: var(--color-blue);
  display: inline-block;
  position: relative;
  padding-bottom: 15px;
  
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
  gap: 10px;
  margin-bottom: 25px;
`;

const TechItem = styled.span`
  background: linear-gradient(to right, rgba(26, 35, 126, 0.1), rgba(26, 35, 126, 0.05));
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--color-blue);
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(26, 35, 126, 0.1);
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
  
  ${ProjectCard}:hover & {
    background-color: var(--color-blue);
    color: var(--color-white);
    border-color: var(--color-blue);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
  }
  
  ${ProjectCard}:hover &:hover {
    background-color: var(--color-orange);
    color: var(--color-black);
    border-color: var(--color-orange);
    transform: translateY(-5px);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-gray-light);
  color: var(--color-blue);
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  
  svg {
    font-size: 1rem;
  }
  
  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
  }
`;

const PortfolioSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { language } = useLanguage();
  const shouldReduceMotion = useRef(false);
  const sectionRef = useRef(null);
  
  // Filtrer les projets en fonction de la catégorie sélectionnée
  useEffect(() => {
    const filtered = selectedCategory === 'all' 
      ? projectsData 
      : projectsData.filter(project => project.category === selectedCategory);
    
    setFilteredProjects(filtered);
  }, [selectedCategory]);
  
  // Catégories pour le filtre
  const categories = [
    { id: 'all', label: 'Tous', labelKey: 'portfolio.filters.all' },
    { id: 'sites-web', label: 'Sites Web WordPress', labelKey: 'portfolio.filters.websites' },
    { id: 'applications-web', label: 'Applications Web', labelKey: 'portfolio.filters.webapps' },
    { id: 'ui-ux', label: 'UI/UX Design', labelKey: 'portfolio.filters.uiux' }
  ];


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sectionElement = sectionRef.current;
    if (sectionElement) {
      const animatedElements = sectionElement.querySelectorAll('.animate-on-scroll');
      animatedElements.forEach((el) => observer.observe(el));
    }
    
    return () => {
      if (sectionElement) {
        const animatedElements = sectionElement.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <PortfolioContainer id="portfolio" ref={sectionRef}>
      <SectionHeader
        backgroundText="PORTFOLIO"
        title="Mon Portfolio"
        subtitle="Découvrez mes projets récents et explorez mon travail dans différents domaines du développement web et du design."
        marginBottom="70px"
      />
      
      <PortfolioContent>
        <FilterButtons>
          {categories.map((category) => (
            <FilterButton 
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              aria-label={`Filtrer par ${category.label}`}
            >
              {language === 'fr' ? category.label : category.labelKey}
            </FilterButton>
          ))}
        </FilterButtons>
        
        <ProjectsGrid>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => {
                if (!shouldReduceMotion.current) {
                  window.location.href = `/project/${project.id}`;
                }
              }}
            >
              <ProjectImage>
                <img src={project.image} alt={project.title} loading="lazy" decoding="async" width="400" height="220" />
              </ProjectImage>
              
              <ProjectInfo>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>
                  {project.description}
                </ProjectDescription>
                
                <TechList>
                  {project.technologies && project.technologies.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
                
                <ButtonContainer>
                  <ViewMoreButton to={`/project/${project.id}`}>
                    <span>Voir les détails</span> <FaArrowRight />
                  </ViewMoreButton>
                </ButtonContainer>
                
                <ProjectLinks>
                  {project.githubUrl && (
                    <ProjectLink 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Voir le code source sur GitHub"
                    >
                      <FaGithub />
                    </ProjectLink>
                  )}
                  {project.liveUrl && (
                    <ProjectLink 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="Voir le site en ligne"
                    >
                      <FaExternalLinkAlt />
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectInfo>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </PortfolioContent>
    </PortfolioContainer>
  );
};

export default PortfolioSection;
