# Guide de déploiement sur Hostinger - elhadji-dieng.com

**Date**: Octobre 2025  
**Domaine**: elhadji-dieng.com  
**Hébergeur**: Hostinger  

---

## 📋 Table des matières

1. [Préparation du build](#préparation-du-build)
2. [Configuration Hostinger](#configuration-hostinger)
3. [Déploiement du site](#déploiement-du-site)
4. [Configuration SSL/HTTPS](#configuration-ssl-https)
5. [Configuration DNS](#configuration-dns)
6. [Vérifications post-déploiement](#vérifications-post-déploiement)

---

## 🏗️ Préparation du build

### 1. Créer le build de production

```bash
# Dans le dossier du projet
cd "F:\Les bases de programmations\Porfolio_de_El_Hadji_Dieng complet\portfolio-el-hadji-dieng"

# Créer le build
npm run build
```

Cela va créer un dossier `build/` avec tous les fichiers optimisés.

### 2. Vérifier le build

Le dossier `build/` doit contenir :
- `index.html`
- `static/` (CSS, JS, images)
- `assets/` (vos fichiers)
- `sitemap.xml`
- `robots.txt`
- `manifest.json`

---

## ⚙️ Configuration Hostinger

### 1. Accéder à votre hébergement

1. Connectez-vous à **hPanel** : https://hpanel.hostinger.com/
2. Cliquez sur votre domaine **elhadji-dieng.com**
3. Allez dans **Gestionnaire de fichiers** (File Manager)

### 2. Préparer le répertoire

**Option A : Via File Manager (Interface web)**

1. Dans le File Manager, naviguez vers `public_html/`
2. **Supprimez tous les fichiers par défaut** (index.html, etc.)
3. Le dossier `public_html/` doit être vide

**Option B : Via FTP (Recommandé pour les gros fichiers)**

Voir la section [Déploiement via FTP](#déploiement-via-ftp) ci-dessous.

---

## 📤 Déploiement du site

### Méthode 1 : Via File Manager (Simple)

#### Étape 1 : Compresser le build
```bash
# Sur Windows (PowerShell)
Compress-Archive -Path "build\*" -DestinationPath "portfolio-build.zip"
```

#### Étape 2 : Upload via File Manager
1. Dans hPanel → **File Manager**
2. Naviguez vers `public_html/`
3. Cliquez sur **Upload** (en haut à droite)
4. Sélectionnez `portfolio-build.zip`
5. Attendez la fin de l'upload
6. Cliquez droit sur `portfolio-build.zip` → **Extract**
7. Supprimez le fichier zip après extraction

#### Étape 3 : Vérifier la structure
```
public_html/
├── index.html
├── static/
│   ├── css/
│   ├── js/
│   └── media/
├── assets/
├── sitemap.xml
├── robots.txt
└── manifest.json
```

### Méthode 2 : Via FTP (Recommandé)

#### Étape 1 : Obtenir les identifiants FTP

1. Dans hPanel → **Comptes FTP**
2. Notez les informations :
   ```
   Hôte FTP: ftp.elhadji-dieng.com (ou IP fournie)
   Nom d'utilisateur: votre_username
   Mot de passe: votre_password
   Port: 21
   ```

#### Étape 2 : Installer un client FTP

**FileZilla** (Gratuit et recommandé) :
- Télécharger : https://filezilla-project.org/
- Installer FileZilla Client

#### Étape 3 : Se connecter via FTP

1. Ouvrir FileZilla
2. Entrer les informations :
   - **Hôte** : `ftp.elhadji-dieng.com`
   - **Nom d'utilisateur** : votre username
   - **Mot de passe** : votre password
   - **Port** : 21
3. Cliquer sur **Connexion rapide**

#### Étape 4 : Uploader les fichiers

1. **Côté local** (gauche) : Naviguez vers le dossier `build/`
2. **Côté serveur** (droite) : Naviguez vers `public_html/`
3. **Sélectionnez tous les fichiers** dans `build/`
4. **Glissez-déposez** vers `public_html/`
5. Attendez la fin du transfert (peut prendre 5-10 minutes)

---

## 🔒 Configuration SSL/HTTPS

### 1. Activer le SSL gratuit

Hostinger offre un **certificat SSL gratuit** (Let's Encrypt) :

1. Dans hPanel → **SSL**
2. Sélectionnez **elhadji-dieng.com**
3. Cliquez sur **Installer le SSL**
4. Choisissez **Let's Encrypt** (gratuit)
5. Attendez 5-10 minutes pour l'activation

### 2. Forcer HTTPS

#### Via .htaccess (Recommandé)

Créez un fichier `.htaccess` dans `public_html/` avec ce contenu :

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Force www (optionnel)
RewriteCond %{HTTP_HOST} ^elhadji-dieng\.com [NC]
RewriteRule ^(.*)$ https://www.elhadji-dieng.com/$1 [L,R=301]

# Configuration pour React Router (SPA)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Compression Gzip
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache des fichiers statiques
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/pdf "access plus 1 month"
  ExpiresByType image/x-icon "access plus 1 year"
</IfModule>

# Sécurité
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

**Comment créer le fichier .htaccess** :

**Via File Manager** :
1. Dans `public_html/`
2. Cliquez sur **New File**
3. Nommez-le `.htaccess`
4. Cliquez droit → **Edit**
5. Collez le contenu ci-dessus
6. Sauvegardez

**Via FTP** :
1. Créez un fichier `.htaccess` sur votre ordinateur
2. Collez le contenu
3. Uploadez-le dans `public_html/`

---

## 🌐 Configuration DNS

### Vérifier la configuration DNS

1. Dans hPanel → **DNS / Nameservers**
2. Vérifiez que les enregistrements pointent vers Hostinger :

```
Type: A
Nom: @
Valeur: [IP de votre serveur Hostinger]
TTL: 14400

Type: A
Nom: www
Valeur: [IP de votre serveur Hostinger]
TTL: 14400

Type: CNAME
Nom: www
Valeur: elhadji-dieng.com
TTL: 14400
```

**Note** : La propagation DNS peut prendre 24-48 heures.

### Vérifier la propagation DNS

Utilisez ces outils :
- https://www.whatsmydns.net/
- https://dnschecker.org/

Entrez `elhadji-dieng.com` et vérifiez que l'IP correspond à votre serveur Hostinger.

---

## ✅ Vérifications post-déploiement

### 1. Tester le site

Visitez votre site :
- ✅ http://elhadji-dieng.com (doit rediriger vers HTTPS)
- ✅ https://elhadji-dieng.com
- ✅ https://www.elhadji-dieng.com

### 2. Vérifier les pages

Testez toutes les pages principales :
- [ ] Page d'accueil : `https://elhadji-dieng.com/`
- [ ] À propos : `https://elhadji-dieng.com/about`
- [ ] Portfolio : `https://elhadji-dieng.com/portfolio`
- [ ] Blog : `https://elhadji-dieng.com/blog`
- [ ] Services : `https://elhadji-dieng.com/services`
- [ ] Contact : `https://elhadji-dieng.com/contact`

### 3. Vérifier les fichiers techniques

- [ ] Sitemap : `https://elhadji-dieng.com/sitemap.xml`
- [ ] Robots : `https://elhadji-dieng.com/robots.txt`
- [ ] Manifest : `https://elhadji-dieng.com/manifest.json`

### 4. Tester les fonctionnalités

- [ ] Navigation (menu, liens)
- [ ] Formulaire de contact
- [ ] Newsletter
- [ ] Filtres du portfolio
- [ ] Pagination du blog
- [ ] Menu mobile (bottom nav)
- [ ] Responsive design

### 5. Vérifier le SSL

Visitez : https://www.ssllabs.com/ssltest/
- Entrez : `elhadji-dieng.com`
- Objectif : Note A ou A+

### 6. Tester la performance

**Google PageSpeed Insights** :
https://pagespeed.web.dev/
- Testez : `https://elhadji-dieng.com`
- Objectif : Score > 90

**GTmetrix** :
https://gtmetrix.com/
- Testez votre site
- Objectif : Grade A

---

## 🔧 Configuration Google Search Console

### 1. Ajouter la propriété

1. Allez sur : https://search.google.com/search-console
2. Cliquez sur **Ajouter une propriété**
3. Choisissez **Préfixe d'URL**
4. Entrez : `https://elhadji-dieng.com`

### 2. Vérifier la propriété

**Méthode recommandée : Balise HTML**

1. Google vous donne une balise comme :
   ```html
   <meta name="google-site-verification" content="VOTRE_CODE_ICI" />
   ```

2. **Ajoutez cette balise** dans `public/index.html` :
   ```html
   <head>
     <meta charset="utf-8" />
     <meta name="google-site-verification" content="VOTRE_CODE_ICI" />
     ...
   </head>
   ```

3. **Rebuild et redéployez** :
   ```bash
   npm run build
   # Puis uploadez le nouveau index.html
   ```

4. Retournez sur Search Console et cliquez sur **Vérifier**

### 3. Soumettre le sitemap

1. Dans Search Console → **Sitemaps**
2. Entrez : `sitemap.xml`
3. Cliquez sur **Envoyer**

---

## 📊 Configuration Google Analytics

### 1. Créer une propriété GA4

1. Allez sur : https://analytics.google.com/
2. Créez une nouvelle propriété
3. Nom : "Portfolio El Hadji Dieng"
4. URL : `https://elhadji-dieng.com`

### 2. Obtenir l'ID de mesure

Vous obtiendrez un ID comme : `G-XXXXXXXXXX`

### 3. Mettre à jour le code

**Dans `src/App.js`** (ligne 14) :
```javascript
ReactGA.initialize('G-VOTRE_NOUVEAU_ID');
```

### 4. Rebuild et redéployer

```bash
npm run build
# Uploadez les nouveaux fichiers
```

---

## 🔄 Mise à jour du site

### Pour mettre à jour le contenu

1. **Modifier le code** localement
2. **Tester** : `npm start`
3. **Créer le build** : `npm run build`
4. **Uploader** via FTP ou File Manager
5. **Vider le cache** du navigateur (Ctrl + F5)

### Script de déploiement rapide (PowerShell)

Créez un fichier `deploy.ps1` :

```powershell
# Build du projet
Write-Host "Building project..." -ForegroundColor Green
npm run build

# Compresser le build
Write-Host "Compressing build..." -ForegroundColor Green
Compress-Archive -Path "build\*" -DestinationPath "portfolio-build.zip" -Force

Write-Host "Build ready! Upload portfolio-build.zip to Hostinger" -ForegroundColor Yellow
```

Exécutez : `.\deploy.ps1`

---

## 🚨 Dépannage

### Problème : Page blanche après déploiement

**Solution** : Vérifiez le fichier `.htaccess` (voir section SSL)

### Problème : Erreur 404 sur les routes

**Solution** : Assurez-vous que le `.htaccess` contient les règles de réécriture pour React Router

### Problème : Images ne s'affichent pas

**Solution** : Vérifiez que le dossier `assets/` est bien uploadé dans `public_html/`

### Problème : CSS/JS ne se charge pas

**Solution** : 
1. Videz le cache du navigateur (Ctrl + Shift + Delete)
2. Vérifiez que le dossier `static/` est bien uploadé

### Problème : SSL non activé

**Solution** :
1. Attendez 10-15 minutes après l'installation
2. Videz le cache DNS : `ipconfig /flushdns` (Windows)
3. Contactez le support Hostinger si le problème persiste

---

## 📞 Support Hostinger

Si vous rencontrez des problèmes :

- **Chat en direct** : Disponible 24/7 dans hPanel
- **Email** : support@hostinger.com
- **Base de connaissances** : https://support.hostinger.com/

---

## ✅ Checklist finale de déploiement

### Avant le déploiement
- [ ] Build créé avec succès (`npm run build`)
- [ ] Fichiers vérifiés dans le dossier `build/`
- [ ] Google Analytics ID mis à jour
- [ ] EmailJS configuré
- [ ] Utterances configuré

### Déploiement
- [ ] Fichiers uploadés dans `public_html/`
- [ ] Structure des dossiers correcte
- [ ] Fichier `.htaccess` créé
- [ ] SSL activé et fonctionnel
- [ ] HTTPS forcé

### Post-déploiement
- [ ] Site accessible via https://elhadji-dieng.com
- [ ] Toutes les pages fonctionnent
- [ ] Formulaires testés
- [ ] Images chargées
- [ ] Navigation mobile OK
- [ ] Google Search Console configuré
- [ ] Sitemap soumis
- [ ] Google Analytics fonctionnel

### SEO
- [ ] Meta tags vérifiés
- [ ] Données structurées validées
- [ ] Performance testée (PageSpeed)
- [ ] SSL Grade A
- [ ] Sitemap indexé

---

## 🎉 Félicitations !

Votre portfolio est maintenant en ligne sur **https://elhadji-dieng.com** ! 🚀

**Prochaines étapes** :
1. Partager votre site sur les réseaux sociaux
2. Ajouter le lien dans votre CV
3. Soumettre à des annuaires de portfolios
4. Créer des backlinks de qualité
5. Publier régulièrement sur le blog

**Bon succès avec votre portfolio ! 🎯**
