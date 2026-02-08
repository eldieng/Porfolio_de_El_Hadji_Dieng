import React from 'react';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.fluid ? '100%' : '1200px'};
  margin: 0 auto;
  padding: ${props => props.noPadding ? '0' : '0 20px'};
  
  @media (max-width: 1230px) {
    max-width: 100%;
  }
`;

const Container = ({ children, fluid, noPadding, className }) => {
  return (
    <ContainerWrapper 
      fluid={fluid} 
      noPadding={noPadding}
      className={className}
    >
      {children}
    </ContainerWrapper>
  );
};

export default Container;
