import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaFileInvoiceDollar, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../../utils/ThemeContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: ${({ scrolled }) => scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: all 0.3s ease;
  padding: ${({ scrolled }) => scrolled ? '10px 0' : '20px 0'};
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  background-color: ${({ scrolled }) => scrolled ? 'var(--bg-header)' : 'transparent'};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ scrolled }) => scrolled ? 'var(--text-heading)' : 'var(--color-white)'};
  transition: color 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  
  span {
    color: var(--color-orange);
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: linear-gradient(to right, var(--color-orange), var(--color-orange-dark));
      border-radius: 3px;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: ${({ isOpen }) => isOpen ? '0' : '-100%'};
    width: 70%;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    background-color: var(--color-blue);
    transition: right 0.3s ease;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    padding: 20px;
    z-index: 1001;
  }
`;

const NavItem = styled.div`
  margin: 0 5px;
  
  @media (max-width: 992px) {
    margin: 10px 0;
  }
`;
const NavLink = styled(Link)`
  margin: 0 15px;
  font-weight: 500;
  color: ${({ scrolled }) => scrolled ? 'var(--text-primary)' : 'white'};
  position: relative;
  text-decoration: none;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--color-orange);
    transition: width 0.3s ease;
  }
  
  &:hover:after, &.active:after {
    width: 100%;
  }
  
  @media (max-width: 992px) {
    margin: 15px 0;
    color: var(--color-white);
  }
`;

const QuoteButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(to right, var(--color-orange), var(--color-orange-dark));
  color: black;
  padding: 10px 18px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(255, 153, 0, 0.3);
  margin-left: 15px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(255, 153, 0, 0.4);
  }
  
  @media (max-width: 992px) {
    margin: 20px auto 0;
  }
`;

const DarkModeToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${({ scrolled }) => scrolled ? 'var(--text-primary)' : 'var(--color-white)'};
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  margin-left: 10px;
  
  &:hover {
    background-color: rgba(255, 111, 0, 0.1);
    color: var(--color-orange);
    transform: scale(1.1);
  }
  
  @media (max-width: 992px) {
    color: var(--color-white);
    margin: 10px 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${({ scrolled }) => scrolled ? 'var(--text-heading)' : 'var(--color-white)'};
  cursor: pointer;
  z-index: 1001;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  // const toggleLanguage = () => {
  //   changeLanguage(language === 'fr' ? 'en' : 'fr');
  // };
  
  return (
    <HeaderContainer scrolled={isScrolled}>
      <Nav>
        <Logo to="/" scrolled={isScrolled}>
          El Hadji <span>Dieng</span>
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu} scrolled={isScrolled}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
        
        <NavLinks isOpen={isMobileMenuOpen}>
          <NavItem>
            <NavLink to="/" scrolled={isScrolled} onClick={closeMenu}>Accueil</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/a-propos" scrolled={isScrolled} onClick={closeMenu}>À Propos</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/competences" scrolled={isScrolled} onClick={closeMenu}>Compétences</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/portfolio" scrolled={isScrolled} onClick={closeMenu}>Portfolio</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/services" scrolled={isScrolled} onClick={closeMenu}>Services</NavLink>
          </NavItem>
          {/* Lien Blog supprimé - déplacé uniquement dans le Footer */}
          {/* Le lien vers la section témoignages a été supprimé */}
          <NavItem>
            <NavLink to="/contact" scrolled={isScrolled} onClick={closeMenu}>Contact</NavLink>
          </NavItem>
          
          <NavItem>
            <QuoteButton to="/demande-devis" onClick={closeMenu}>
              <FaFileInvoiceDollar /> Demander un devis
            </QuoteButton>
          </NavItem>
          
          <NavItem>
            <DarkModeToggle
              onClick={toggleDarkMode}
              scrolled={isScrolled}
              aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
              title={isDarkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </DarkModeToggle>
          </NavItem>
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
