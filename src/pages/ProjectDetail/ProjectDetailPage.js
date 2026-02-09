import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaExternalLinkAlt, FaGithub, FaFigma, FaArrowRight } from 'react-icons/fa';
import SEOHelmet from '../../utils/SEOHelmet';
import { getProjectSEOData } from '../../data/seoData';

// Import des données de projets
import { projectsData } from '../../data/projectsData';

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simuler un temps de chargement
    setTimeout(() => {
      const foundProject = projectsData.find(p => p.id.toString() === projectId);
      
      if (foundProject) {
        setProject(foundProject);
        setIsLoading(false);
      } else {
        setNotFound(true);
        setIsLoading(false);
      }
    }, 300);
  }, [projectId]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <div className="loader"></div>
        <p>Chargement du projet...</p>
      </LoadingContainer>
    );
  }

  if (notFound) {
    return (
      <NotFoundContainer>
        <SEOHelmet 
          title="Projet non trouvé"
          description="Le projet demandé n'existe pas dans notre portfolio."
          canonicalUrl="/portfolio"
        />
        <h2>Projet non trouvé</h2>
        <p>Le projet que vous recherchez n'existe pas ou a été supprimé.</p>
        <BackLink to="/portfolio">
          Retour au portfolio
        </BackLink>
      </NotFoundContainer>
    );
  }

  // Obtenir les données SEO pour ce projet
  const seoData = getProjectSEOData(projectId, project);

  return (
    <>
      <SEOHelmet 
        title={project.title}
        description={project.description}
        canonicalUrl={`/project/${projectId}`}
        imageUrl={project.image}
        type="article"
        schema={seoData.schema}
      />
      
      <Header bgImage={project.image}>
        <HeaderContent>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {project.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Détails du projet
          </motion.p>
        </HeaderContent>
      </Header>
      
      <ProjectDetailContainer>
        <ContainerWrapper>
          <BackLink to="/portfolio">
            <FaArrowLeft /> <span>Retour au portfolio</span>
          </BackLink>
          
          <ProjectContent
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProjectImage>
              <img src={project.image} alt={project.title} />
            </ProjectImage>
            
            <ProjectInfo>
              <h2>{project.title}</h2>
              <p className="description">{project.fullDescription}</p>
              
              <ProjectSection>
                <h3>Technologies utilisées</h3>
                <TechList>
                  {project.technologies.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </ProjectSection>
              
              <ProjectSection>
                <h3>Liens du projet</h3>
                <ProjectLinks>
                  {project.liveLink && (
                    <ProjectLink href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> <span>Voir le site</span>
                    </ProjectLink>
                  )}
                  
                  {project.githubLink && (
                    <ProjectLink href={project.githubLink} target="_blank" rel="noopener noreferrer">
                      <FaGithub /> <span>Code source</span>
                    </ProjectLink>
                  )}
                  
                  {project.figmaLink && (
                    <ProjectLink href={project.figmaLink} target="_blank" rel="noopener noreferrer">
                      <FaFigma /> <span>Design Figma</span>
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectSection>
            </ProjectInfo>
          </ProjectContent>
          
          <CTASection
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Vous avez un projet similaire ?</h3>
            <p>
              Contactez-moi dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé.
              Je vous accompagnerai tout au long du processus pour vous assurer un résultat à la hauteur de vos attentes.
            </p>
            <CTAButton to={`/demande-devis?service=${project.category === 'sites-web' ? 'creation-site' : project.category === 'applications-web' ? 'applications' : project.category === 'ui-ux' ? 'design' : ''}`}>
              <FaArrowRight /> <span>Demander un devis</span>
            </CTAButton>
          </CTASection>
        </ContainerWrapper>
      </ProjectDetailContainer>
    </>
  );
};

// Styled Components
const ProjectDetailContainer = styled.div`
  padding: 60px 0;
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
    background-image: radial-gradient(circle at 10% 10%, rgba(26, 35, 126, 0.05) 0%, transparent 40%),
                    radial-gradient(circle at 90% 90%, rgba(26, 35, 126, 0.05) 0%, transparent 40%),
                    radial-gradient(circle at 50% 50%, rgba(26, 35, 126, 0.03) 0%, transparent 60%);
    z-index: 0;
  }
  
  &:after {
    content: 'PROJET';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 25vw;
    font-weight: 900;
    color: rgba(26, 35, 126, 0.02);
    white-space: nowrap;
    z-index: 0;
    pointer-events: none;
  }
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
  background-color: var(--color-white);
  padding: 12px 20px;
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 10;
  
  &:hover {
    color: var(--color-blue-dark);
    transform: translateX(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
  
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

const ProjectContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  z-index: 1;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectImage = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  height: auto;
  background-color: var(--color-white);
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: auto;
    max-height: 450px;
    object-fit: contain;
    display: block;
    transition: transform 0.5s ease;
    border-radius: 8px;
    
    &:hover {
      transform: scale(1.03);
    }
  }
  
  @media (max-width: 768px) {
    height: auto;
    
    img {
      max-height: 350px;
    }
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-blue), var(--color-orange));
  }
`;

const ProjectInfo = styled.div`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 35px;
  
  @media (max-width: 1024px) {
    padding: 25px;
  }
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-blue), var(--color-orange));
  }
  
  h2 {
    font-size: 2.5rem;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: black;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 15px;
    
    @media (max-width: 1024px) {
      font-size: 2rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 2px;
    }
  }
  
  .description {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-gray-dark);
    margin-bottom: 30px;
  }
`;

const ProjectSection = styled.div`
  margin-top: 30px;
  
  h3 {
    font-size: 1.5rem;
    color: var(--color-blue);
    margin-bottom: 18px;
    font-weight: 700;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 40px;
      height: 3px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 2px;
    }
  }
`;

const TechList = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
margin-top: 15px;
`;

const TechItem = styled.span`
  background: linear-gradient(to right, rgba(26, 35, 126, 0.08), rgba(26, 35, 126, 0.04));
  padding: 10px 18px;
  border-radius: 30px;
  font-size: 0.95rem;
  color: var(--color-blue);
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 1px solid rgba(26, 35, 126, 0.1);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  display: inline-flex;
  align-items: center;
  
  &:hover {
    background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
    color: var(--color-black);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(26, 35, 126, 0.2);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
  color: black;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 6px 15px rgba(26, 35, 126, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-blue-dark), var(--color-blue));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(26, 35, 126, 0.25);
    
    &:before {
      opacity: 1;
    }
  }
  
  svg {
    margin-right: 10px;
    position: relative;
    z-index: 2;
  }
  
  span {
    position: relative;
    z-index: 2;
  }
`;

const LoadingContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  .loader {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(26, 35, 126, 0.2);
    border-top: 5px solid var(--color-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  p {
    color: var(--color-gray-dark);
    font-weight: 500;
  }
`;

const NotFoundContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  
  h2 {
    font-size: 2rem;
    color: var(--color-blue);
    margin-bottom: 15px;
  }
  
  p {
    color: var(--color-gray-dark);
    margin-bottom: 30px;
    max-width: 500px;
  }
`;

const Header = styled.div`
  position: relative;
  height: 350px;
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'url("/assets/images/headers/portfolio-header.jpg")'};  
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
    content: 'PROJET';
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
  
  @media (max-width: 1024px) {
    height: 300px;
    
    &:after {
      font-size: 140px;
    }
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
    
    @media (max-width: 1024px) {
      font-size: 2.5rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
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

const ContainerWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 1230px) {
    max-width: 100%;
  }
`;

const CTASection = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 40px;
  margin-top: 60px;
  
  @media (max-width: 1024px) {
    padding: 30px;
    margin-top: 40px;
  }
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
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
  padding: 14px 28px;
  background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));
  color: #ffffff;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 15px rgba(255, 87, 34, 0.3);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(255, 87, 34, 0.35);
    color: #ffffff;
    
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
`;

export default ProjectDetailPage;
