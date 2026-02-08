import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaArrowRight, FaLinkedin, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import SectionHeader from '../common/SectionHeader';

const ContactContainer = styled.section`
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
    background-image: radial-gradient(circle at 90% 10%, rgba(26, 35, 126, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;


const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactInfoPreview = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
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
  
  p {
    margin-bottom: 30px;
    line-height: 1.8;
    color: var(--color-gray-dark);
  }
`;

const ContactInfoItems = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--color-blue);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  &:hover .icon {
    background-color: var(--color-orange);
    transform: translateY(-3px);
  }
  
  .info {
    text-align: left;
    
    h4 {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }
    
    p, a {
      margin-bottom: 0;
      color: var(--color-gray-dark);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    a:hover {
      color: var(--color-blue);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-blue);
    color: var(--color-white);
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--color-orange);
      transform: translateY(-3px);
    }
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

const ContactSectionPreview = () => {
  return (
    <ContactContainer id="contact-preview">
      <SectionHeader
        backgroundText="CONTACT"
        title="Me Contacter"
        subtitle="Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter."
      />
      
      <ContactContent>
        <ContactInfoPreview
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p>
            Je suis disponible pour des projets freelance, des collaborations ou des opportunités d'emploi.
            Contactez-moi par email, téléphone ou via les réseaux sociaux.
          </p>
          
          <ContactInfoItems>
            <ContactInfoItem>
              <div className="icon">
                <FaEnvelope />
              </div>
              <div className="info">
                <h4>Email</h4>
                <a href="mailto:el.elhadji.dieng@gmail.com">el.elhadji.dieng@gmail.com</a>
              </div>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <div className="icon">
                <FaPhoneAlt />
              </div>
              <div className="info">
                <h4>Téléphone</h4>
                <a href="tel:+221774548661">+221 77 454 86 61</a>
              </div>
            </ContactInfoItem>
            
            <ContactInfoItem>
              <div className="icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info">
                <h4>Adresse</h4>
                <p>Dakar, Parcelle Assainie U8, Sénégal</p>
              </div>
            </ContactInfoItem>
          </ContactInfoItems>
          
          <SocialLinks>
            <a href="https://www.linkedin.com/in/bambiste4/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/eldieng/" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com/elbambiste04" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/16c2u9cioC/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.tiktok.com/@bambiste4" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </SocialLinks>
          
          <SeeAllButton to="/contact">
            Envoyer un message <FaArrowRight />
          </SeeAllButton>
        </ContactInfoPreview>
      </ContactContent>
    </ContactContainer>
  );
};

export default ContactSectionPreview;
