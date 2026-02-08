import React, { Component } from 'react';
import styled from 'styled-components';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  min-height: 300px;
  text-align: center;
  background-color: var(--color-white);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  margin: 20px 0;
`;

const ErrorIcon = styled.div`
  font-size: 50px;
  color: var(--color-orange);
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--color-blue-dark);
`;

const ErrorMessage = styled.p`
  font-size: 1.1rem;
  color: var(--color-gray-dark);
  margin-bottom: 25px;
  max-width: 600px;
`;

const RetryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(to right, var(--color-blue), var(--color-blue-dark));
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(26, 35, 126, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(26, 35, 126, 0.3);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour afficher l'UI de secours
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez également enregistrer l'erreur dans un service de rapport d'erreurs
    console.error("Erreur capturée par ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Envoyer l'erreur à un service d'analyse comme Google Analytics
    if (window.ReactGA) {
      window.ReactGA.exception({
        description: `${error.toString()} | ${errorInfo.componentStack}`,
        fatal: true
      });
    }
  }

  handleRetry = () => {
    // Réinitialiser l'état d'erreur
    this.setState({ hasError: false, error: null, errorInfo: null });
    
    // Recharger la page si nécessaire
    if (this.props.refreshOnError) {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Vous pouvez rendre n'importe quelle UI de secours
      return (
        <ErrorContainer>
          <ErrorIcon>
            <FaExclamationTriangle />
          </ErrorIcon>
          <ErrorTitle>Oups ! Quelque chose s'est mal passé</ErrorTitle>
          <ErrorMessage>
            Nous sommes désolés, une erreur s'est produite lors du chargement de cette section. 
            Veuillez réessayer ou rafraîchir la page.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>
            <FaRedo /> Réessayer
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
