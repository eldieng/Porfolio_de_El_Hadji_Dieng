import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaEnvelope, FaBlog } from 'react-icons/fa';

const BottomNavContainer = styled(motion.nav)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 10px var(--shadow-color);
  z-index: 999;
  display: none;
  padding: 8px 0 max(8px, env(safe-area-inset-bottom));
  backdrop-filter: blur(10px);
  background-color: var(--bg-header);
  transition: background-color 0.3s ease;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
`;

const NavItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: ${({ $isActive }) => $isActive ? 'var(--color-blue)' : 'var(--color-gray-dark)'};
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 12px;
  position: relative;
  min-width: 60px;
  
  &:active {
    transform: scale(0.95);
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 1.4rem;
  margin-bottom: 4px;
  position: relative;
  
  ${({ $isActive }) => $isActive && `
    color: var(--color-blue);
  `}
`;

const NavLabel = styled.span`
  font-size: 0.7rem;
  font-weight: ${({ $isActive }) => $isActive ? '600' : '500'};
  text-align: center;
  white-space: nowrap;
  
  ${({ $isActive }) => $isActive && `
    color: var(--color-blue);
  `}
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: var(--color-orange);
`;

/**
 * Menu de navigation mobile en bas de l'écran (Bottom Navigation Bar)
 * Affiche uniquement sur mobile (< 768px)
 */
const MobileBottomNav = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Masquer/afficher la barre lors du scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Afficher si on scroll vers le haut, masquer si on scroll vers le bas
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navItems = [
    { path: '/', icon: FaHome, label: 'Accueil' },
    { path: '/a-propos', icon: FaUser, label: 'À propos' },
    { path: '/portfolio', icon: FaBriefcase, label: 'Portfolio' },
    { path: '/blog', icon: FaBlog, label: 'Blog' },
    { path: '/contact', icon: FaEnvelope, label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <BottomNavContainer
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <NavList>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <NavItem key={item.path}>
              <NavLink 
                to={item.path} 
                $isActive={active}
                aria-label={item.label}
                aria-current={active ? 'page' : undefined}
              >
                <IconWrapper 
                  $isActive={active}
                  whileTap={{ scale: 0.9 }}
                >
                  {active && (
                    <ActiveIndicator
                      layoutId="activeIndicator"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon />
                </IconWrapper>
                <NavLabel $isActive={active}>{item.label}</NavLabel>
              </NavLink>
            </NavItem>
          );
        })}
      </NavList>
    </BottomNavContainer>
  );
};

export default MobileBottomNav;
