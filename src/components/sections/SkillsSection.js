import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaFigma, FaWordpress, FaGitAlt, FaSlack, FaTrello } from 'react-icons/fa';
import { SiAdobexd, SiPhp, SiMysql, SiMongodb, SiNotion, SiJira } from 'react-icons/si';
import { useLanguage } from '../../utils/LanguageContext';
import SectionHeader from '../common/SectionHeader';

const SkillsContainer = styled.section`
  padding: 100px 0;
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

const SkillCategories = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 30px 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.03);
  overflow: hidden;
  cursor: pointer;
  
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
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(26, 35, 126, 0.03), rgba(255, 87, 34, 0.03));
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    
    &:before {
      transform: scaleX(1);
    }
    
    &:after {
      opacity: 1;
    }
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 25px;
    color: var(--color-blue);
    position: relative;
    padding-bottom: 15px;
    z-index: 1;
    font-weight: 700;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 4px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 2px;
    }
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 10px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  cursor: pointer;
  margin-bottom: 2px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateX(8px);
    
    &:before {
      opacity: 1;
    }
    
    svg {
      transform: scale(1.2);
      color: var(--color-orange);
    }
    
    .progress-bar .progress {
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    }
    
    h4 {
      color: var(--color-blue);
    }
  }
  
  svg {
    font-size: 1.5rem;
    min-width: 25px;
    color: var(--color-blue);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.1));
  }
  
  .skill-info {
    flex: 1;
    width: 100%;
    overflow: hidden;
    
    h4 {
      font-size: 1.1rem;
      margin-bottom: 8px;
      font-weight: 600;
      color: var(--color-text);
      transition: all 0.3s ease;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .progress-bar {
      height: 6px;
      background-color: var(--color-gray-light);
      border-radius: 3px;
      overflow: hidden;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
      
      .progress {
        height: 100%;
        background-color: var(--color-blue);
        border-radius: 3px;
        width: ${props => props.progress || '0%'};
        position: relative;
        transition: all 0.3s ease;
        overflow: hidden;
        
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.2) 25%,
            transparent 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.2) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            transparent 75%,
            transparent
          );
          background-size: 20px 20px;
          animation: shimmer 2s linear infinite;
          
          @keyframes shimmer {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 20px 0;
            }
          }
        }
      }
    }
  }
`;

const SkillsSection = () => {
  // const { t } = useLanguage(); // Commenté car non utilisé
  
  // Variants pour les animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const categoryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5,
        staggerChildren: 0.1
      }
    }
  };
  
  const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10 
      }
    }
  };
  
  return (
    <SkillsContainer id="skills">
      <SectionHeader backgroundText="SKILLS" marginBottom="70px">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Mes Compétences
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Découvrez les technologies et outils que je maîtrise pour créer des solutions web performantes et attrayantes.
        </motion.p>
      </SectionHeader>
      
      <SkillsContent>
        <SkillCategories as={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <SkillCategory
            variants={categoryVariants}
          >
            <motion.h3 variants={skillItemVariants}>Développement Frontend</motion.h3>
            <SkillsList as={motion.div} variants={skillItemVariants}>
              <SkillItem progress="95%" variants={skillItemVariants}>
                <FaHtml5 />
                <div className="skill-info">
                  <h4>HTML5</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="90%" variants={skillItemVariants}>
                <FaCss3Alt />
                <div className="skill-info">
                  <h4>CSS3/SASS</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="85%" variants={skillItemVariants}>
                <FaJs />
                <div className="skill-info">
                  <h4>JavaScript</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="80%" variants={skillItemVariants}>
                <FaReact />
                <div className="skill-info">
                  <h4>React</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </SkillItem>
            </SkillsList>
          </SkillCategory>
          
          <SkillCategory
            variants={categoryVariants}
          >
            <motion.h3 variants={skillItemVariants}>Développement Backend</motion.h3>
            <SkillsList as={motion.div} variants={skillItemVariants}>
              <SkillItem progress="75%" variants={skillItemVariants}>
                <FaNodeJs />
                <div className="skill-info">
                  <h4>Node.js</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="80%" variants={skillItemVariants}>
                <SiPhp />
                <div className="skill-info">
                  <h4>PHP</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="85%" variants={skillItemVariants}>
                <SiMysql />
                <div className="skill-info">
                  <h4>MySQL</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="70%" variants={skillItemVariants}>
                <SiMongodb />
                <div className="skill-info">
                  <h4>MongoDB</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '70%' }}></div>
                  </div>
                </div>
              </SkillItem>
            </SkillsList>
          </SkillCategory>
          
          <SkillCategory
            variants={categoryVariants}
          >
            <motion.h3 variants={skillItemVariants}>Design & CMS</motion.h3>
            <SkillsList as={motion.div} variants={skillItemVariants}>
              <SkillItem progress="90%" variants={skillItemVariants}>
                <FaFigma />
                <div className="skill-info">
                  <h4>Figma</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="85%" variants={skillItemVariants}>
                <SiAdobexd />
                <div className="skill-info">
                  <h4>Adobe XD</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="95%" variants={skillItemVariants}>
                <FaWordpress />
                <div className="skill-info">
                  <h4>WordPress</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="85%" variants={skillItemVariants}>
                <FaGitAlt />
                <div className="skill-info">
                  <h4>Git/GitHub</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </SkillItem>
            </SkillsList>
          </SkillCategory>
          
          <SkillCategory
            variants={categoryVariants}
          >
            <motion.h3 variants={skillItemVariants}>Outils Collaboratifs</motion.h3>
            <SkillsList as={motion.div} variants={skillItemVariants}>
              <SkillItem progress="90%" variants={skillItemVariants}>
                <FaSlack />
                <div className="skill-info">
                  <h4>Slack</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '90%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="85%" variants={skillItemVariants}>
                <SiNotion />
                <div className="skill-info">
                  <h4>Notion</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="80%" variants={skillItemVariants}>
                <FaTrello />
                <div className="skill-info">
                  <h4>Trello</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </SkillItem>
              
              <SkillItem progress="75%" variants={skillItemVariants}>
                <SiJira />
                <div className="skill-info">
                  <h4>Jira</h4>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </SkillItem>
            </SkillsList>
          </SkillCategory>
        </SkillCategories>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default SkillsSection;
