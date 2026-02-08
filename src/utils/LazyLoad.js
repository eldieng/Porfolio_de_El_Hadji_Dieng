import React, { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Composant stylisé pour le loader
const LoaderContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.height || '300px'};
  width: 100%;
  background-color: var(--color-white);
`;

const SpinnerWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--color-blue);
`;

// Composant de chargement réutilisable
export const SectionLoader = ({ height }) => (
  <LoaderContainer height={height}>
    <SpinnerWrapper>
      <Spinner 
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </SpinnerWrapper>
  </LoaderContainer>
);

// Fonction utilitaire pour créer un composant à chargement différé
export const lazyWithPreload = (factory) => {
  const Component = lazy(factory);
  Component.preload = factory;
  return Component;
};

// Composant d'enveloppe pour le chargement différé des sections
export const LazySection = ({ component: Component, height, ...props }) => {
  return (
    <Suspense fallback={<SectionLoader height={height} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default LazySection;
