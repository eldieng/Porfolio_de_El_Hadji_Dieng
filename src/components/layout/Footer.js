import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';

const FooterContainer = styled.footer`
  background-color: var(--bg-footer);
  color: #ffffff;
  padding: 60px 0 20px;
  transition: background-color 0.3s ease;

  h1, h2, h3, h4, h5, h6, p, span {
    color: #ffffff;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 50px;
      height: 2px;
      background-color: var(--color-orange);
    }
  }
`;

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    margin-bottom: 12px;
    
    a {
      color: var(--color-white);
      transition: all 0.3s ease;
      display: inline-block;
      
      &:hover {
        color: var(--color-orange);
        transform: translateX(5px);
      }
    }
  }
`;

const ContactInfo = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
    color: var(--color-orange);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 20px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    margin-right: 10px;
    transition: all 0.3s ease;
    
    svg {
      color: var(--color-white);
      font-size: 1.2rem;
    }
    
    &:hover {
      background-color: var(--color-orange);
      transform: translateY(-3px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  
  a {
    color: var(--color-orange);
    font-weight: 500;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
          <h3>El Hadji Dieng</h3>
          <p>Web Master professionnel spécialisé dans la création de sites web modernes et performants. Je propose des solutions sur mesure pour répondre à vos besoins digitaux.</p>
          <SocialIcons>
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
          </SocialIcons>
        </FooterColumn>
        
        <FooterColumn>
          <h3>Liens Rapides</h3>
          <FooterLinks>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/a-propos">À Propos</Link></li>
            <li><Link to="/competences">Compétences</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <h3>Services</h3>
          <FooterLinks>
            <li><Link to="/services/creation-site">Création de Sites Web</Link></li>
            <li><Link to="/services/design">Design UI/UX</Link></li>
            <li><Link to="/services/applications">Applications Web</Link></li>
            <li><Link to="/services/refonte">Refonte de Sites</Link></li>
            <li><Link to="/services/seo">Référencement SEO</Link></li>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn>
          <h3>Contact</h3>
          <ContactInfo>
            <FaMapMarkerAlt />
            <span>Dakar, Parcelle Assainie U8, Sénégal</span>
          </ContactInfo>
          <ContactInfo>
            <FaPhoneAlt />
            <span><a href="tel:+221774548661" style={{color: 'inherit'}}>+221 77 454 86 61</a></span>
          </ContactInfo>
          <ContactInfo>
            <FaEnvelope />
            <span><a href="mailto:el.elhadji.dieng@gmail.com" style={{color: 'inherit'}}>el.elhadji.dieng@gmail.com</a></span>
          </ContactInfo>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {currentYear} El Hadji Dieng. Tous droits réservés. Conçu avec passion.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
