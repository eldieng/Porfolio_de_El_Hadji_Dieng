import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const TestimonialsContainer = styled.section`
  padding: 100px 0;
  background-color: var(--color-white);
`;

const SectionTitle = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
  h2 {
    font-size: 2.5rem;
    margin-bottom: 15px;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -10px;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background-color: var(--color-orange);
    }
  }
  
  p {
    max-width: 700px;
    margin: 0 auto;
    color: var(--color-gray-dark);
  }
`;

const TestimonialsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
`;

const TestimonialsSlider = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  height: auto;
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 500px;
  }
`;

const TestimonialSlide = styled(motion.div)`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
`;

const TestimonialCard = styled.div`
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 40px;
  max-width: 800px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-left: 5px solid var(--color-blue);
  
  &:before {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background-color: var(--color-white);
    transform-origin: center;
    transform: translateX(-50%) rotate(45deg);
    z-index: -1;
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: -20px;
  left: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  font-size: 1.2rem;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  font-style: italic;
  color: var(--color-gray-dark);
  position: relative;
  padding-left: 10px;
  
  &:before {
    content: '\201C';
    font-size: 4rem;
    position: absolute;
    left: -20px;
    top: -30px;
    color: var(--color-blue);
    opacity: 0.2;
  }
`;

const RatingStars = styled.div`
  display: flex;
  margin-bottom: 20px;
  
  svg {
    color: var(--color-orange);
    margin-right: 5px;
  }
`;

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;

const ClientImage = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ClientDetails = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  p {
    color: var(--color-gray-dark);
    font-size: 0.9rem;
  }
`;

const SliderControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 15px;
`;

const SliderDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active }) => active ? 'var(--color-blue)' : 'var(--color-gray-light)'};
  border: none;
  cursor: pointer;
  transition: all 0.5s ease;
  margin: 0 5px;
  
  &:hover {
    background-color: var(--color-orange);
    transform: scale(1.2);
  }
  
  ${({ active }) => active && `
    transform: scale(1.2);
  `}
`;

const SliderArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-white);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  font-size: 1.2rem;
  
  ${({ direction }) => direction === 'prev' ? 'left: 20px;' : 'right: 20px;'}
  
  &:hover {
    background-color: var(--color-blue);
    color: var(--color-white);
    transform: translateY(-50%) scale(1.1);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    ${({ direction }) => direction === 'prev' ? 'left: 10px;' : 'right: 10px;'}
  }
`;

// Données des témoignages avec texte statique et images locales
const testimonialsData = [
  {
    id: 1,
    name: "Sophie Martin",
    position: "Directrice Marketing",
    image: "/assets/images/testimonials/340287037_d2090ffb-1769-4853-916c-79c2a4ae2568.jpg",
    text: "Travailler avec El Hadji a été une expérience formidable. Il a compris mes besoins dès le début et a livré un site web qui représente parfaitement ma marque. Je recommande ses services sans hésitation.",
    rating: 5
  },
  {
    id: 2,
    name: "Thomas Dubois",
    position: "Entrepreneur",
    image: "/assets/images/testimonials/395229501_58f94cc3-ebe3-4531-944c-6f0ad2b370e6.jpg",
    text: "El Hadji a créé un site e-commerce qui a dépassé toutes mes attentes. Le site est non seulement beau mais aussi très fonctionnel et facile à utiliser. Mes ventes ont augmenté de 40% depuis le lancement.",
    rating: 5
  },
  {
    id: 3,
    name: "Marie Leroy",
    position: "Consultante UX",
    image: "/assets/images/testimonials/androgynous-avatar-non-binary-queer-person.jpg",
    text: "El Hadji possède une excellente compréhension du design et de l'expérience utilisateur. Il a transformé notre site vieillissant en une plateforme moderne et intuitive que nos clients adorent utiliser.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };
  
  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };
  
  // Changement automatique de slide toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.8
    })
  };
  
  return (
    <TestimonialsContainer id="testimonials">
      <SectionTitle>
        <h2>Témoignages Clients</h2>
        <p>
          Découvrez ce que mes clients disent de mon travail et de mes services.
        </p>
      </SectionTitle>
      
      <TestimonialsContent>
        <SliderArrow 
          direction="prev" 
          onClick={prevSlide}
          disabled={testimonialsData.length <= 1}
        >
          &larr;
        </SliderArrow>
        
        <TestimonialsSlider>
          {testimonialsData.map((testimonial, index) => (
            index === currentSlide && (
              <TestimonialSlide
                key={testimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <TestimonialCard>
                  <QuoteIcon>
                    <FaQuoteLeft />
                  </QuoteIcon>
                  <TestimonialText>
                    {testimonial.text}
                  </TestimonialText>
                  <RatingStars>
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        style={{ 
                          opacity: i < testimonial.rating ? 1 : 0.3,
                          color: i < testimonial.rating ? 'var(--color-orange)' : 'var(--color-gray-dark)'
                        }} 
                      />
                    ))}
                  </RatingStars>
                </TestimonialCard>
                
                <ClientInfo>
                  <ClientImage>
                    <img src={testimonial.image} alt={testimonial.name} width="70" height="70" loading="lazy" decoding="async" />
                  </ClientImage>
                  <ClientDetails>
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </ClientDetails>
                </ClientInfo>
              </TestimonialSlide>
            )
          ))}
        </TestimonialsSlider>
        
        <SliderArrow 
          direction="next" 
          onClick={nextSlide}
          disabled={testimonialsData.length <= 1}
        >
          &rarr;
        </SliderArrow>
        
        <SliderControls>
          {testimonialsData.map((_, index) => (
            <SliderDot 
              key={index} 
              active={index === currentSlide} 
              onClick={() => goToSlide(index)}
            />
          ))}
        </SliderControls>
      </TestimonialsContent>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;
