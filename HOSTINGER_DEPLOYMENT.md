# Guide de déploiement sur Hostinger

Ce document vous guide à travers les étapes pour déployer votre portfolio sur Hostinger.

## Prérequis
- Un compte Hostinger actif
- Accès au panneau de contrôle Hostinger
- Le dossier `build` de votre application React

## Étapes de déploiement

### 1. Préparation des fichiers
✅ Build de l'application React (déjà fait)
✅ Création du fichier `.htaccess` (déjà fait)

### 2. Téléchargement sur Hostinger

#### Option 1 : Via le gestionnaire de fichiers Hostinger
1. Connectez-vous à votre panneau de contrôle Hostinger
2. Accédez à "Gestionnaire de fichiers"
3. Naviguez vers le répertoire `public_html` (ou le sous-dossier correspondant à votre sous-domaine)
4. Téléchargez tout le contenu du dossier `build` de votre projet

#### Option 2 : Via FTP (recommandé pour les gros fichiers)
1. Utilisez un client FTP comme FileZilla
2. Connectez-vous avec vos identifiants Hostinger
   - Hôte : ftp.votredomaine.com (ou l'adresse fournie par Hostinger)
   - Nom d'utilisateur : votre nom d'utilisateur FTP
   - Mot de passe : votre mot de passe FTP
   - Port : 21
3. Transférez le contenu du dossier `build` vers le répertoire `public_html`

### 3. Configuration du domaine et SSL

1. Dans le panneau de contrôle Hostinger, accédez à "Domaines"
2. Assurez-vous que votre domaine est correctement configuré
3. Activez le SSL gratuit via Let's Encrypt dans la section "SSL"

### 4. Vérification du déploiement

1. Visitez votre site à l'adresse `https://votredomaine.com`
2. Vérifiez que toutes les pages et fonctionnalités fonctionnent correctement
3. Testez la navigation entre les pages pour s'assurer que les routes React fonctionnent
4. Vérifiez que le service worker fonctionne en testant le mode hors ligne

### 5. Résolution des problèmes courants

#### Les routes ne fonctionnent pas (page 404 lors de l'actualisation)
- Vérifiez que le fichier `.htaccess` est bien présent à la racine
- Assurez-vous que mod_rewrite est activé sur votre hébergement

#### Les ressources ne se chargent pas
- Vérifiez les chemins dans le code source
- Assurez-vous que tous les fichiers ont été correctement téléchargés

#### Le service worker ne fonctionne pas
- Vérifiez que le fichier `service-worker.js` est à la racine
- Assurez-vous que les chemins dans le service worker sont corrects

## Maintenance

Pour mettre à jour votre site :
1. Effectuez vos modifications localement
2. Exécutez `npm run build` pour générer un nouveau build
3. Téléchargez les fichiers modifiés sur Hostinger

## Support

Si vous rencontrez des problèmes avec votre hébergement :
- Consultez la documentation Hostinger : https://www.hostinger.fr/tutoriels/
- Contactez le support client Hostinger via le chat en direct ou le système de tickets
