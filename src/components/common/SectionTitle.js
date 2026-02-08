import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionTitle = ({ title, subtitle, centered = true, light = false }) => {
  return (
    <TitleContainer centered={centered}>
      <Title 
        as={motion.h2}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        light={light}
      >
        {title}
        <Underline light={light} />
      </Title>
      
      {subtitle && (
        <Subtitle 
          as={motion.p}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          light={light}
        >
          {subtitle}
        </Subtitle>
      )}
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  margin-bottom: 50px;
  text-align: ${props => props.centered ? 'center' : 'left'};
  max-width: 800px;
  margin-left: ${props => props.centered ? 'auto' : '0'};
  margin-right: ${props => props.centered ? 'auto' : '0'};
  padding: 0 20px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
  color: ${props => props.light ? 'var(--color-white)' : 'var(--color-blue-dark)'};
  position: relative;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  
  @media (max-width: 576px) {
    font-size: 1.8rem;
  }
`;

const Underline = styled.span`
  display: block;
  width: 80px;
  height: 4px;
  background: ${props => props.light 
    ? 'linear-gradient(to right, var(--color-white), rgba(255, 255, 255, 0.7))' 
    : 'linear-gradient(to right, var(--color-blue), var(--color-blue-dark))'};
  margin: 15px auto 0;
  border-radius: 2px;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${props => props.light ? 'rgba(255, 255, 255, 0.9)' : 'var(--color-gray-dark)'};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export default SectionTitle;
