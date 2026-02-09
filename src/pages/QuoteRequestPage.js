import React, { useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaEnvelope, FaPhone, FaUser, FaEuroSign, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import servicesData from '../data/servicesData';
import emailjs from '@emailjs/browser';
import SEOHelmet from '../utils/SEOHelmet';
import { seoData } from '../data/seoData';

const PageContainer = styled.div`
  padding-top: 80px;
  position: relative;
  background-color: var(--color-gray-light);
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 20% 80%, rgba(26, 35, 126, 0.03) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const PageHeader = styled.div`
  height: 300px;
  
  @media (max-width: 1024px) {
    height: 250px;
  }
  background: linear-gradient(rgba(26, 35, 126, 0.85), rgba(26, 35, 126, 0.9)), url('/assets/images/quote-header.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: 'DEVIS';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 180px;
    font-weight: 800;
    color: rgba(255, 255, 255, 0.05);
    letter-spacing: 15px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1;
    
    @media (max-width: 768px) {
      font-size: 120px;
      letter-spacing: 10px;
    }
    
    @media (max-width: 576px) {
      font-size: 80px;
      letter-spacing: 5px;
    }
  }
`;

const HeaderContent = styled.div`
  text-align: center;
  z-index: 2;
  
  h1 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
    background: linear-gradient(to right, #ffffff, #e6e6e6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 1024px) {
      font-size: 2.3rem;
    }
    
    &:after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -10px;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(to right, var(--color-blue-light), var(--color-orange));
      border-radius: 2px;
    }
  }
  
  p {
    font-size: 1.2rem;
    max-width: 700px;
    margin: 0 auto;
    opacity: 0.9;
  }
`;

const BackButton = styled(Link)`
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: rgba(255, 255, 255, 0.15);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 18px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-weight: 500;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    
    svg {
      transform: translateX(-3px);
    }
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
  position: relative;
  z-index: 1;
  
  @media (max-width: 1024px) {
    padding: 50px 20px;
  }
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 1024px) {
    gap: 40px;
  }
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const FormSection = styled(motion.div)`
  background-color: var(--color-white);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-blue), var(--color-orange));
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: var(--color-blue);
    position: relative;
    display: inline-block;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: black;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 50px;
      height: 3px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 2px;
    }
  }
  
  @media (max-width: 768px) {
    padding: 30px 25px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  
  label {
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: var(--color-text-dark);
    
    svg {
      color: var(--color-blue);
      font-size: 1.1rem;
    }
  }
`;

const Input = styled.input`
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background-color: var(--color-white);
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  
  &:focus {
    border-color: var(--color-blue);
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.15);
    outline: none;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #aaa;
    opacity: 0.7;
  }
`;

const Select = styled.select`
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  appearance: none;
  background-color: var(--color-white);
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231a237e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  cursor: pointer;
  
  &:focus {
    border-color: var(--color-blue);
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.15);
    outline: none;
    transform: translateY(-1px);
  }
  
  &:hover {
    border-color: var(--color-blue-light);
  }
`;

const Textarea = styled.textarea`
  padding: 14px 18px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  min-height: 180px;
  resize: vertical;
  background-color: var(--color-white);
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
  line-height: 1.6;
  
  &:focus {
    border-color: var(--color-blue);
    box-shadow: 0 0 0 3px rgba(26, 35, 126, 0.15);
    outline: none;
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: #aaa;
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, var(--color-orange), var(--color-orange-dark));
  color: #ffffff;
  border: none;
  padding: 16px 32px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-top: 30px;
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 15px rgba(26, 35, 126, 0.2);
  align-self: flex-start;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-blue), var(--color-blue-dark));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(255, 87, 34, 0.35);
    color: #ffffff;
    
    &:before {
      opacity: 1;
    }
  }
  
  &:disabled {
    background: linear-gradient(135deg, #a0a0a0, #c0c0c0);
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    opacity: 0.7;
  }
  
  span {
    position: relative;
    z-index: 2;
  }
`;

const InfoSection = styled(motion.div)`
  h2 {
    font-size: 2rem;
    margin-bottom: 30px;
    color: var(--color-blue);
    position: relative;
    display: inline-block;
    background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -10px;
      width: 50px;
      height: 3px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 2px;
    }
  }
  
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const InfoCard = styled(motion.div)`
  background-color: var(--color-white);
  padding: 35px;
  border-radius: 15px;
  margin-bottom: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.07);
  border: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(to bottom, var(--color-blue), var(--color-orange));
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 18px;
    color: var(--color-blue);
    font-size: 1.5rem;
    font-weight: 700;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -8px;
      width: 40px;
      height: 3px;
      background: linear-gradient(to right, var(--color-blue), var(--color-orange));
      border-radius: 2px;
    }
  }
  
  p {
    margin-bottom: 25px;
    line-height: 1.7;
    color: var(--color-text);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      font-weight: 500;
      
      svg {
        color: var(--color-blue);
        background: rgba(26, 35, 126, 0.1);
        padding: 6px;
        border-radius: 50%;
        font-size: 0.8rem;
      }
    }
  }
`;

const ErrorMessage = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background-color: rgba(220, 53, 69, 0.1);
  border-left: 4px solid #dc3545;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  
  svg {
    color: #dc3545;
    font-size: 1.5rem;
    margin-top: 3px;
  }
  
  h3 {
    margin: 0 0 5px 0;
    color: #dc3545;
    font-size: 1.2rem;
  }
  
  p {
    margin: 0;
    color: var(--color-text-dark);
  }
`;

const SuccessMessage = styled(motion.div)`
  background-color: rgba(16, 185, 129, 0.1);
  padding: 25px 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.2);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: linear-gradient(to bottom, #10b981, #059669);
  }
  
  h3 {
    color: #065f46;
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
      color: #10b981;
    }
  }
  
  p {
    color: #065f46;
    margin: 0;
    line-height: 1.6;
  }
`;

const ServiceBanner = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: linear-gradient(135deg, rgba(26, 35, 126, 0.08), rgba(26, 35, 126, 0.04));
  border-left: 4px solid var(--color-blue);
  padding: 20px 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(26, 35, 126, 0.08);
  
  svg {
    color: var(--color-blue);
    font-size: 1.4rem;
    margin-top: 2px;
    flex-shrink: 0;
  }
  
  strong {
    color: var(--color-blue);
    font-size: 1.1rem;
  }
  
  p {
    margin: 5px 0 0;
    color: var(--color-gray-dark);
    font-size: 0.95rem;
  }
`;

const QuoteRequestPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const serviceParam = searchParams.get('service');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: serviceParam || '',
    budget: '',
    timeline: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);
    
    // Ajouter la date et l'heure au formulaire
    const formElement = formRef.current;
    const timeInput = document.createElement('input');
    timeInput.type = 'hidden';
    timeInput.name = 'time';
    timeInput.value = new Date().toLocaleString('fr-SN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Africa/Dakar'
    });
    formElement.appendChild(timeInput);
    
    emailjs.sendForm(
      'service_xqzvbip',
      'template_q0hjlg6',
      formRef.current,
      '8XdPQ1Z09eUin6E7g'
    )
    .then(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Supprimer le champ time après l'envoi
      const addedTime = formRef.current.querySelector('input[name="time"]');
      if (addedTime) addedTime.remove();
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: ''
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi:', error);
      setIsSubmitting(false);
      setSubmitError(true);
      setErrorMessage('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer plus tard ou me contacter directement par email.');
    });
  };
  
  return (
    <PageContainer>
      <SEOHelmet 
        title={seoData.quoteRequest.title}
        description={seoData.quoteRequest.description}
        canonicalUrl="/demande-devis"
        schema={seoData.quoteRequest.schema}
      />
      <PageHeader>
        <BackButton to="/services">
          <FaArrowLeft /> Retour aux services
        </BackButton>
        <HeaderContent>
          <h1>Demande de Devis</h1>
          <p>Remplissez le formulaire ci-dessous pour recevoir un devis personnalisé pour votre projet.</p>
        </HeaderContent>
      </PageHeader>
      
      <ContentContainer>
        {serviceParam && servicesData[serviceParam] && (
          <ServiceBanner
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaInfoCircle />
            <div>
              <strong>Service sélectionné :</strong> {servicesData[serviceParam].title}
              <p>Le service a été pré-sélectionné. Vous pouvez le modifier si besoin.</p>
            </div>
          </ServiceBanner>
        )}
        
        {isSubmitted && (
          <SuccessMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Demande envoyée avec succès !</h3>
            <p>Merci pour votre demande de devis. Je vous contacterai dans les plus brefs délais pour discuter de votre projet.</p>
          </SuccessMessage>
        )}
        
        {submitError && (
          <ErrorMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaExclamationTriangle />
            <div>
              <h3>Erreur lors de l'envoi</h3>
              <p>{errorMessage}</p>
            </div>
          </ErrorMessage>
        )}
        
        <FormContainer>
          <FormSection>
            <h2>Vos informations</h2>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <FormGroup>
                <label htmlFor="name"><FaUser /> Nom complet *</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom et prénom"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="email"><FaEnvelope /> Email *</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Votre adresse email"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="phone"><FaPhone /> Téléphone</label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Votre numéro de téléphone"
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="company">Entreprise</label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise (si applicable)"
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="service">Service souhaité *</label>
                <Select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="creation-site">Création de Sites Web</option>
                  <option value="design">Design Web & UX/UI</option>
                  <option value="applications">Applications Web</option>
                  <option value="refonte">Refonte de Sites Web</option>
                  <option value="seo">Référencement SEO</option>
                  <option value="maintenance">Maintenance & Support</option>
                  <option value="autre">Autre (précisez dans le message)</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="budget"><FaEuroSign /> Budget estimé</label>
                <Input
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Votre budget approximatif (en FCFA ou autre devise)"
                />
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="timeline">Délai souhaité</label>
                <Select
                  id="timeline"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                >
                  <option value="">Sélectionnez un délai</option>
                  <option value="urgent">Urgent (moins d'1 mois)</option>
                  <option value="1-2-mois">1-2 mois</option>
                  <option value="3-6-mois">3-6 mois</option>
                  <option value="plus-6-mois">Plus de 6 mois</option>
                  <option value="non-defini">Non défini</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <label htmlFor="message">Description de votre projet *</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, vos objectifs et vos besoins spécifiques..."
                  required
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </SubmitButton>
            </Form>
          </FormSection>
          
          <InfoSection>
            <h2>Informations</h2>
            
            <InfoCard>
              <h3>Processus de devis</h3>
              <p>
                Après réception de votre demande, je vous contacterai dans un délai de 48 heures ouvrées pour discuter plus en détail de votre projet.
                Un devis personnalisé vous sera ensuite envoyé par email.
              </p>
              <ul>
                <li><FaCheck /> Analyse de votre demande</li>
                <li><FaCheck /> Échange pour préciser vos besoins</li>
                <li><FaCheck /> Élaboration d'un devis détaillé</li>
                <li><FaCheck /> Proposition d'un planning prévisionnel</li>
              </ul>
            </InfoCard>
            
            <InfoCard>
              <h3>Pourquoi me choisir ?</h3>
              <ul>
                <li><FaCheck /> Expertise technique et créative</li>
                <li><FaCheck /> Approche personnalisée pour chaque projet</li>
                <li><FaCheck /> Communication transparente et régulière</li>
                <li><FaCheck /> Respect des délais et des budgets</li>
                <li><FaCheck /> Support et maintenance après livraison</li>
              </ul>
            </InfoCard>
          </InfoSection>
        </FormContainer>
      </ContentContainer>
    </PageContainer>
  );
};

export default QuoteRequestPage;
