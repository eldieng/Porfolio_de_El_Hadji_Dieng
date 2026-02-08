import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SpinnerContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: var(--color-white);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Spinner = styled(motion.div)`
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SpinnerCircle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: var(--color-blue);
  margin-bottom: 15px;
`;

const LoadingText = styled(motion.p)`
  font-size: 16px;
  font-weight: 500;
  color: var(--color-blue);
  margin-top: 10px;
  background: linear-gradient(to right, var(--color-blue), var(--color-orange));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Spinner>
        <SpinnerCircle
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <LoadingText
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1, 0.98]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Chargement...
        </LoadingText>
      </Spinner>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
