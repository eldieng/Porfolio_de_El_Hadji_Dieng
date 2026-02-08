import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useReducedMotion } from 'framer-motion';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaExclamationTriangle, FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaShieldAlt } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
// import { useLanguage } from '../../utils/LanguageContext';
import emailjs from '@emailjs/browser';
import DOMPurify from 'dompurify';
import SectionHeader from '../common/SectionHeader';

const ContactContainer = styled.section`
  padding: 100px 0;
  background-color: var(--color-gray-light);
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(circle at 90% 10%, rgba(26, 35, 126, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }
`;


const ContactContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: var(--color-blue);
  }
  
  p {
    margin-bottom: 30px;
    line-height: 1.8;
  }
`;

const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--color-blue);
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }
  
  &:hover .icon {
    background-color: var(--color-orange);
    transform: translateY(-3px);
  }
  
  .info {
    h4 {
      font-size: 1.2rem;
      margin-bottom: 5px;
    }
    
    p {
      margin-bottom: 0;
      color: var(--color-gray-dark);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-blue);
    color: var(--color-white);
    font-size: 1.2rem;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: var(--color-orange);
      transform: translateY(-3px);
    }
  }
`;

const ContactForm = styled(motion.form)`
  background-color: var(--color-white);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, var(--color-blue), var(--color-orange));
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    margin-bottom: 25px;
    font-size: 1.5rem;
    color: var(--color-black);
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    color: var(--color-blue);
    font-size: 1.05rem;
    transition: all 0.3s ease;
    
    .required {
      color: #e53935;
      margin-left: 3px;
    }
  }
  
  input, textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--color-gray-light);
    border-radius: 8px;
    background-color: var(--color-white);
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: var(--color-blue);
      box-shadow: 0 0 0 2px rgba(26, 35, 126, 0.2);
    }
    
    &:hover {
      border-color: var(--color-blue);
    }
    
    &.error {
      border-color: #e53935;
      background-color: rgba(229, 57, 53, 0.05);
      
      &:focus {
        box-shadow: 0 0 0 2px rgba(229, 57, 53, 0.2);
      }
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
  
  .character-count {
    text-align: right;
    font-size: 0.8rem;
    color: var(--color-gray-dark);
    margin-top: 5px;
  }
  
  .error-message {
    color: #e53935;
    font-size: 0.9rem;
    margin-top: 5px;
    display: flex;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
    
    svg {
      margin-right: 5px;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .csrf-info {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: var(--color-gray-dark);
    margin-bottom: 15px;
    
    svg {
      margin-right: 8px;
      color: var(--color-blue);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
  
  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
    color: var(--color-blue);
    font-size: 1.05rem;
    transition: all 0.3s ease;
    
    .required {
      color: #e53935;
      margin-left: 3px;
    }
  }
  
  input, textarea {
    width: 100%;
    padding: 14px 18px;
    border: 2px solid var(--color-gray-light);
    border-radius: 10px;
    font-family: var(--font-primary);
    font-size: 1rem;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: rgba(255, 255, 255, 0.8);
    
    &:focus {
      outline: none;
      border-color: var(--color-blue);
      box-shadow: 0 5px 15px rgba(26, 35, 126, 0.1);
      background-color: white;
      transform: translateY(-2px);
    }
    
    &:hover {
      border-color: var(--color-blue);
    }
  }
  
  .error-message {
    color: #e53935;
    font-size: 0.9rem;
    margin-top: 8px;
    display: flex;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
    
    svg {
      margin-right: 5px;
      font-size: 0.9rem;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  color: var(--color-black);
  padding: 14px 30px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 1.05rem;
  border: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;
  box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
  
  svg {
    font-size: 1.1rem;
    transition: all 0.3s ease;
  }
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, var(--color-orange), var(--color-orange-dark));
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(26, 35, 126, 0.3);
    
    &:before {
      transform: scaleX(1);
      transform-origin: left;
    }
    
    svg {
      transform: rotate(15deg) translateX(3px);
    }
  }
  
  &:disabled {
    background: var(--color-gray-medium);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &:before {
      display: none;
    }
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

const FormSuccess = styled(motion.div)`
  background-color: #4caf50;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  p {
    margin: 5px 0;
    line-height: 1.5;
  }
  
  svg {
    margin-right: 10px;
    font-size: 1.2rem;
  }
  
  .info-container {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 15px;
    border-radius: 6px;
    margin-top: 15px;
    color: #333;
    border: 1px solid #ddd;
  }
  
  .info-row {
    display: flex;
    margin-bottom: 8px;
  }
  
  .info-label {
    font-weight: bold;
    width: 100px;
    flex-shrink: 0;
  }
  
  .info-value {
    flex-grow: 1;
    word-break: break-word;
  }
  
  .message-value {
    white-space: pre-wrap;
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 4px;
    border-left: 3px solid #4caf50;
    margin-top: 5px;
  }
`;

const FormError = styled(motion.div)`
  background-color: #f44336;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`;

const ContactSection = () => {
  // const { language, t } = useLanguage(); // Commenté car non utilisé
  const prefersReducedMotion = useReducedMotion();
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Champ honeypot pour anti-spam
    csrf_token: '' // Jeton CSRF
  });
  
  // Stockage des dernières données soumises pour affichage dans le message de confirmation
  const [submittedData, setSubmittedData] = useState(null);
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Génération d'un jeton CSRF au chargement du composant
  useEffect(() => {
    // Générer un jeton CSRF aléatoire
    const generateCSRFToken = () => {
      const array = new Uint32Array(8);
      window.crypto.getRandomValues(array);
      return Array.from(array, dec => dec.toString(16).padStart(2, '0')).join('');
    };
    
    const csrfToken = generateCSRFToken();
    setFormData(prev => ({ ...prev, csrf_token: csrfToken }));
    
    // Stocker le jeton dans sessionStorage pour vérification côté serveur
    sessionStorage.setItem('csrf_token', csrfToken);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Assainir l'entrée pour prévenir les attaques XSS
    const sanitizedValue = name === 'website' ? value : DOMPurify.sanitize(value);
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    // Valider le champ en temps réel si déjà touché
    if (touched[name]) {
      validateField(name, sanitizedValue);
    }
    
    // Effacer l'erreur lorsque l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };
  
  const validateField = (name, value) => {
    let errorMessage = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMessage = 'Le nom est requis';
        } else if (value.trim().length < 2) {
          errorMessage = 'Le nom doit contenir au moins 2 caractères';
        } else if (value.trim().length > 50) {
          errorMessage = 'Le nom ne doit pas dépasser 50 caractères';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          errorMessage = 'L\'email est requis';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          errorMessage = 'Veuillez entrer une adresse email valide (exemple: nom@domaine.com)';
        }
        break;
        
      case 'subject':
        if (!value.trim()) {
          errorMessage = 'Le sujet est requis';
        } else if (value.trim().length < 3) {
          errorMessage = 'Le sujet doit contenir au moins 3 caractères';
        } else if (value.trim().length > 100) {
          errorMessage = 'Le sujet ne doit pas dépasser 100 caractères';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          errorMessage = 'Le message est requis';
        } else if (value.trim().length < 10) {
          errorMessage = 'Le message doit contenir au moins 10 caractères';
        } else if (value.trim().length > 1000) {
          errorMessage = 'Le message ne doit pas dépasser 1000 caractères';
        }
        break;
        
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));
    
    return !errorMessage;
  };
  
  const validateForm = () => {
    // Marquer tous les champs comme touchés
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      if (['name', 'email', 'subject', 'message'].includes(key)) {
        allTouched[key] = true;
      }
    });
    setTouched(allTouched);
    
    // Valider tous les champs
    const isNameValid = validateField('name', formData.name);
    const isEmailValid = validateField('email', formData.email);
    const isSubjectValid = validateField('subject', formData.subject);
    const isMessageValid = validateField('message', formData.message);
    
    // Vérifier que le jeton CSRF stocké correspond à celui du formulaire
    const storedToken = sessionStorage.getItem('csrf_token');
    if (!storedToken || storedToken !== formData.csrf_token) {
      setErrors(prev => ({ ...prev, form: 'Erreur de sécurité: jeton invalide. Veuillez rafraîchir la page.' }));
      return false;
    }
    
    return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Protection anti-spam simple
    if (formData.website) {
      console.log('Tentative de spam détectée');
      return;
    }
    
    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(false);
      
      emailjs.send(
        'service_xqzvbip',
        'template_r1n9lnj',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: `[CONTACT] ${formData.subject}`,
          message: formData.message,
          time: new Date().toLocaleString(),
          formatted_message: `=== NOUVEAU MESSAGE DE CONTACT ===\n\nð\u009f\u0091\u00a4 Nom: ${formData.name}\nð\u009f\u0093\u00a7 Email: ${formData.email}\nð\u009f\u0093\u009d Sujet: ${formData.subject}\n\nð\u009f\u0093\u0084 Message:\n${formData.message}\n\nâ\u008f\u00b0 Date: ${new Date().toLocaleString()}\n\n=== FIN DU MESSAGE ===`
        },
        '8XdPQ1Z09eUin6E7g'
      )
      .then(() => {
        setSubmittedData({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          time: new Date().toLocaleString()
        });
        
        // Email de confirmation au visiteur
        emailjs.send(
          'service_xqzvbip',
          'template_confirmation',
          {
            to_name: formData.name,
            to_email: formData.email,
            subject: 'Confirmation de votre message',
            message: `Bonjour ${formData.name},\n\nNous avons bien reçu votre message concernant "${formData.subject}".\n\nNous vous répondrons dans les plus brefs délais.\n\nCordialement,\nEl Hadji Dieng`
          },
          '8XdPQ1Z09eUin6E7g'
        ).catch(err => console.error('Erreur confirmation:', err));
        
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 30000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitError(true);
        setErrorMessage('Une erreur s\'est produite lors de l\'envoi du message. Veuillez réessayer plus tard.');
        
        setTimeout(() => {
          setSubmitError(false);
        }, 5000);
      });
    }
  };
  
  return (
    <ContactContainer id="contact">
      <SectionHeader
        backgroundText="CONTACT"
        title="Me Contacter"
        subtitle="Vous avez un projet en tête ou une question ? N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais."
        marginBottom="70px"
      />
      
      <ContactContent>
        <ContactInfo
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>Informations de Contact</h3>
          <p>
            Je suis disponible pour des projets freelance, des collaborations ou des opportunités d'emploi. 
            N'hésitez pas à me contacter pour discuter de vos besoins.
          </p>
          
          <ContactInfoItem>
            <div className="icon">
              <FaEnvelope />
            </div>
            <div className="info">
              <h4>Email</h4>
              <p><a href="mailto:el.elhadji.dieng@gmail.com">el.elhadji.dieng@gmail.com</a></p>
            </div>
          </ContactInfoItem>
          
          <ContactInfoItem>
            <div className="icon">
              <FaPhoneAlt />
            </div>
            <div className="info">
              <h4>Téléphone</h4>
              <p><a href="tel:+221774548661">+221 77 454 86 61</a></p>
            </div>
          </ContactInfoItem>
          
          <ContactInfoItem>
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <div className="info">
              <h4>Localisation</h4>
              <p>Dakar, Parcelle Assainie U8, Sénégal</p>
            </div>
          </ContactInfoItem>
          
          <SocialLinks>
            <a href="https://www.linkedin.com/in/bambiste4/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://github.com/eldieng/" target="_blank" rel="noopener noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.instagram.com/elbambiste04" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/share/16c2u9cioC/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.tiktok.com/@bambiste4" target="_blank" rel="noopener noreferrer">
              <FaTiktok />
            </a>
          </SocialLinks>
        </ContactInfo>
        
        <ContactForm
          ref={formRef}
          initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
        >
          <h3>Envoyez-moi un message</h3>
          
          {submitSuccess && submittedData && (
            <FormSuccess
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaPaperPlane /> 
                  <strong>Votre message a été envoyé avec succès !</strong>
                </div>
                
                <div className="info-container">
                  <div className="info-row">
                    <div className="info-label">Nom:</div>
                    <div className="info-value">{submittedData.name}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Email:</div>
                    <div className="info-value">{submittedData.email}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Sujet:</div>
                    <div className="info-value">{submittedData.subject}</div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Message:</div>
                    <div className="info-value">
                      <div className="message-value">{submittedData.message}</div>
                    </div>
                  </div>
                  <div className="info-row">
                    <div className="info-label">Date:</div>
                    <div className="info-value">{submittedData.time}</div>
                  </div>
                </div>
                
                <p style={{ marginTop: '15px' }}>Je vous répondrai dès que possible.</p>
              </div>
            </FormSuccess>
          )}
          
          {submitError && (
            <FormError
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
            >
              <FaExclamationTriangle /> {errorMessage}
            </FormError>
          )}
          
          {/* Champ honeypot invisible pour la protection anti-spam */}
          <div style={{ display: 'none', position: 'absolute', left: '-5000px' }} aria-hidden="true">
            <input 
              type="text" 
              id="website" 
              name="website" 
              value={formData.website}
              onChange={handleChange}
              tabIndex="-1" 
              aria-hidden="true"
              autoComplete="off" 
            />
          </div>
          
          {/* Jeton CSRF caché */}
          <input 
            type="hidden" 
            name="csrf_token" 
            value={formData.csrf_token} 
          />
          
          <div className="csrf-info">
            <FaShieldAlt /> Formulaire sécurisé avec protection CSRF et anti-XSS
          </div>
          
          {errors.form && <div className="error-message"><FaExclamationTriangle />{errors.form}</div>}
          
          <FormGroup>
            <label htmlFor="name">Nom complet <span className="required">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Votre nom"
              className={touched.name && errors.name ? 'error' : ''}
              aria-required="true"
              aria-invalid={touched.name && errors.name ? 'true' : 'false'}
              maxLength="50"
            />
            {touched.name && errors.name && <div className="error-message"><FaExclamationTriangle />{errors.name}</div>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Votre adresse email"
              className={touched.email && errors.email ? 'error' : ''}
              aria-required="true"
              aria-invalid={touched.email && errors.email ? 'true' : 'false'}
              autoComplete="email"
            />
            {touched.email && errors.email && <div className="error-message"><FaExclamationTriangle />{errors.email}</div>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="subject">Sujet <span className="required">*</span></label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Sujet de votre message"
              className={touched.subject && errors.subject ? 'error' : ''}
              aria-required="true"
              aria-invalid={touched.subject && errors.subject ? 'true' : 'false'}
              maxLength="100"
            />
            {touched.subject && errors.subject && <div className="error-message"><FaExclamationTriangle />{errors.subject}</div>}
          </FormGroup>
          
          <FormGroup>
            <label htmlFor="message">Message <span className="required">*</span></label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Votre message"
              className={touched.message && errors.message ? 'error' : ''}
              aria-required="true"
              aria-invalid={touched.message && errors.message ? 'true' : 'false'}
              rows="5"
              maxLength="1000"
            ></textarea>
            {touched.message && errors.message && <div className="error-message"><FaExclamationTriangle />{errors.message}</div>}
            <div className="character-count">{formData.message.length}/1000</div>
          </FormGroup>
          
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            <FaPaperPlane />
          </SubmitButton>
        </ContactForm>
      </ContactContent>
    </ContactContainer>
  );
};

export default ContactSection;
