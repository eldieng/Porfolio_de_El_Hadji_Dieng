import React from 'react';
import styled from 'styled-components';

const SectionHeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: ${({ $marginBottom }) => $marginBottom || '50px'};
  position: relative;
  
  &:before {
    content: '${({ $backgroundText }) => $backgroundText || ''}';
    position: absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 120px;
    font-weight: 800;
    color: rgba(0, 0, 0, 0.03);
    letter-spacing: 10px;
    z-index: 0;
    white-space: nowrap;
    pointer-events: none;
    
    @media (max-width: 768px) {
      font-size: 80px;
      top: -20px;
    }
    
    @media (max-width: 576px) {
      font-size: 60px;
      letter-spacing: 5px;
    }
  }

  body.dark-mode &:before {
    color: rgba(255, 255, 255, 0.03);
  }
  
  h2 {
    font-size: 2.8rem;
    margin-bottom: 18px;
    position: relative;
    display: inline-block;
    z-index: 1;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 2.3rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -12px;
      transform: translateX(-50%);
      width: 100px;
      height: 5px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 5px;
    }
  }
  
  p {
    max-width: 700px;
    margin: 0 auto;
    color: var(--text-secondary);
    font-size: 1.1rem;
    line-height: 1.6;
    position: relative;
    z-index: 1;
  }
`;

const SectionHeader = ({ backgroundText, title, subtitle, marginBottom, children }) => {
  return (
    <SectionHeaderWrapper $backgroundText={backgroundText} $marginBottom={marginBottom}>
      {children || (
        <>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </>
      )}
    </SectionHeaderWrapper>
  );
};

export default SectionHeader;
