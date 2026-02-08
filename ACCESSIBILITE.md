# Accessibilité du Portfolio

Ce document détaille les mesures d'accessibilité mises en œuvre dans ce portfolio pour assurer une expérience utilisateur inclusive et conforme aux normes WCAG (Web Content Accessibility Guidelines).

## Fonctionnalités d'accessibilité implémentées

### 1. Widget d'accessibilité

Un widget d'accessibilité a été ajouté au site, permettant aux utilisateurs de personnaliser leur expérience selon leurs besoins :

- **Mode contraste élevé** : Améliore la lisibilité pour les personnes malvoyantes en augmentant le contraste entre le texte et l'arrière-plan.
- **Taille de texte ajustable** : Permet aux utilisateurs d'augmenter la taille du texte sans utiliser le zoom du navigateur.
- **Réduction des animations** : Option pour désactiver ou réduire les animations pour les personnes sensibles aux mouvements ou souffrant de troubles vestibulaires.

### 2. Navigation au clavier

- **Lien d'évitement** : Un lien "Aller au contenu principal" apparaît lorsque l'utilisateur navigue au clavier, permettant d'éviter la navigation répétitive.
- **Focus visible** : Indicateurs de focus améliorés pour une meilleure visibilité lors de la navigation au clavier.
- **Ordre de tabulation logique** : L'ordre de tabulation suit la structure visuelle du site.

### 3. Compatibilité avec les technologies d'assistance

- **Attributs ARIA** : Utilisation appropriée des attributs ARIA pour améliorer la compatibilité avec les lecteurs d'écran.
- **Structure sémantique** : Utilisation correcte des balises HTML sémantiques (header, nav, main, section, etc.).
- **Textes alternatifs** : Toutes les images disposent de textes alternatifs descriptifs.

### 4. Design inclusif

- **Contraste de couleurs** : Respect des ratios de contraste WCAG AA (4.5:1 pour le texte normal, 3:1 pour les grands textes).
- **Responsive design** : Adaptation à tous les appareils et tailles d'écran.
- **Formulaires accessibles** : Labels explicites, messages d'erreur clairs et instructions d'aide.

## Conformité aux normes WCAG

Ce portfolio vise la conformité au niveau AA des WCAG 2.1, couvrant les principes fondamentaux :

1. **Perceptible** : L'information et les composants de l'interface utilisateur sont présentés de façon à ce qu'ils puissent être perçus.
2. **Utilisable** : Les composants de l'interface utilisateur et la navigation sont utilisables.
3. **Compréhensible** : L'information et l'utilisation de l'interface utilisateur sont compréhensibles.
4. **Robuste** : Le contenu est suffisamment robuste pour être interprété de manière fiable par une large variété d'agents utilisateurs, y compris les technologies d'assistance.

## Tests d'accessibilité

Les tests d'accessibilité suivants ont été mis en place :

- **Tests automatisés** : Utilisation de jest-axe pour détecter les problèmes d'accessibilité dans les composants React.
- **Tests manuels** : Navigation au clavier, tests avec lecteurs d'écran (NVDA, VoiceOver).
- **Vérification des contrastes** : Utilisation d'outils comme WebAIM Contrast Checker.

## Améliorations futures

- Implémentation d'un mode dyslexie avec une police adaptée.
- Ajout de sous-titres pour tout contenu vidéo.
- Tests utilisateurs avec des personnes en situation de handicap.
- Obtention d'une certification d'accessibilité officielle.

## Ressources

- [Web Content Accessibility Guidelines (WCAG) 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
