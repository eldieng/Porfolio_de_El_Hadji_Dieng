import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactSection from '../components/sections/ContactSection';
import { LanguageProvider } from '../utils/LanguageContext';
import emailjs from '@emailjs/browser';

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  sendForm: jest.fn(() => Promise.resolve({ text: 'Success' }))
}));

// Mock pour IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Wrapper pour rendre le ContactSection avec tous les contextes nécessaires
const renderContactSection = () => {
  return render(
    <LanguageProvider>
      <ContactSection />
    </LanguageProvider>
  );
};

describe('ContactSection Component', () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks();
  });

  test('rend le formulaire de contact avec tous les champs', () => {
    renderContactSection();
    
    // Vérifier que le titre est présent
    expect(screen.getByText(/Contactez-moi/i)).toBeInTheDocument();
    
    // Vérifier que tous les champs du formulaire sont présents
    expect(screen.getByLabelText(/Nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Sujet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    
    // Vérifier que le bouton d'envoi est présent
    expect(screen.getByText(/Envoyer/i)).toBeInTheDocument();
  });

  test('affiche des erreurs de validation lorsque le formulaire est soumis avec des champs vides', async () => {
    renderContactSection();
    
    // Soumettre le formulaire sans remplir les champs
    const submitButton = screen.getByText(/Envoyer/i);
    fireEvent.click(submitButton);
    
    // Vérifier que les messages d'erreur sont affichés
    expect(screen.getByText(/Le nom est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/L'email est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/Le sujet est requis/i)).toBeInTheDocument();
    expect(screen.getByText(/Le message est requis/i)).toBeInTheDocument();
  });

  test('valide le format de l\'email', async () => {
    renderContactSection();
    
    // Remplir le champ email avec un format invalide
    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    
    // Soumettre le formulaire
    const submitButton = screen.getByText(/Envoyer/i);
    fireEvent.click(submitButton);
    
    // Vérifier que le message d'erreur pour l'email est affiché
    expect(screen.getByText(/Veuillez entrer une adresse email valide/i)).toBeInTheDocument();
  });

  test('envoie le formulaire avec succès lorsque tous les champs sont remplis correctement', async () => {
    renderContactSection();
    
    // Remplir tous les champs du formulaire
    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Sujet/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a test message' } });
    
    // Soumettre le formulaire
    const submitButton = screen.getByText(/Envoyer/i);
    fireEvent.click(submitButton);
    
    // Vérifier que EmailJS.sendForm a été appelé avec les bons arguments
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      'service_xqzvbip',
      'template_r1n9lnj',
      expect.any(Object),
      '8XdPQ1Z09eUin6E7g'
    );
    
    // Attendre que le message de succès s'affiche
    await waitFor(() => {
      expect(screen.getByText(/Votre message a été envoyé avec succès/i)).toBeInTheDocument();
    });
  });

  test('affiche un message d\'erreur lorsque l\'envoi échoue', async () => {
    // Modifier le mock pour simuler une erreur
    emailjs.sendForm.mockImplementationOnce(() => Promise.reject({ text: 'Error' }));
    
    renderContactSection();
    
    // Remplir tous les champs du formulaire
    fireEvent.change(screen.getByLabelText(/Nom/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Sujet/i), { target: { value: 'Test Subject' } });
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a test message' } });
    
    // Soumettre le formulaire
    const submitButton = screen.getByText(/Envoyer/i);
    fireEvent.click(submitButton);
    
    // Attendre que le message d'erreur s'affiche
    await waitFor(() => {
      expect(screen.getByText(/Une erreur est survenue/i)).toBeInTheDocument();
    });
  });
});
