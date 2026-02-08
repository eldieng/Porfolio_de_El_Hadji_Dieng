import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: ${props => props.primary ? 'var(--color-blue)' : props.secondary ? 'var(--color-orange)' : 'transparent'};
  color: ${props => (props.primary || props.secondary) ? 'var(--color-white)' : 'var(--color-blue)'};
  border: 2px solid ${props => props.primary ? 'var(--color-blue)' : props.secondary ? 'var(--color-orange)' : 'var(--color-blue)'};
  padding: ${props => props.small ? '8px 20px' : '12px 30px'};
  border-radius: 30px;
  font-weight: 600;
  font-size: ${props => props.small ? '0.9rem' : '1rem'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-decoration: none;
  box-shadow: ${props => (props.primary || props.secondary) ? '0 4px 15px rgba(0, 0, 0, 0.1)' : 'none'};
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${props => props.primary ? 'var(--color-orange)' : props.secondary ? 'var(--color-blue)' : 'var(--color-blue)'};
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  &:hover {
    color: var(--color-white);
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
    
    &:before {
      transform: scaleX(1);
      transform-origin: left;
    }
    
    svg {
      transform: translateX(3px);
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &:hover {
      transform: none;
      box-shadow: none;
      
      &:before {
        transform: scaleX(0);
      }
    }
  }
  
  svg {
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  
  @media (max-width: 576px) {
    width: ${props => props.fullWidthMobile ? '100%' : 'auto'};
  }
`;

const Button = ({ children, to, href, ...props }) => {
  if (to) {
    return (
      <StyledButton as={Link} to={to} {...props}>
        {children}
      </StyledButton>
    );
  }
  
  if (href) {
    return (
      <StyledButton as="a" href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </StyledButton>
    );
  }
  
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
