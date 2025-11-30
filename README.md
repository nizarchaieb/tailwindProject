# Restaurant Universitaire esprit - RestoFlow

Projet HTML avec Tailwind CSS pour le restaurant universitaire ESPRIT.

## Structure du Projet

```
/tailwindProject
│── /src
│   ├── input.css  # Fichier source Tailwind CSS
│── /public
│   ├── index.html  # Page de contact
│   ├── badge.html  # Page du badge étudiant
│   ├── reset-password.html  # Page de réinitialisation de mot de passe
│   ├── style.css   # CSS généré après le build
│── package.json
│── tailwind.config.js
│── vercel.json
```

## Installation

```bash
npm install
```

## Développement

Pour compiler Tailwind CSS en mode watch (recompilation automatique) :

```bash
npm run dev
```

## Build

Pour compiler Tailwind CSS pour la production :

```bash
npm run build
```

## Déploiement sur Vercel

### Via GitHub

1. Poussez votre projet sur GitHub
2. Connectez-vous sur [Vercel](https://vercel.com)
3. Cliquez sur "New Project"
4. Importez votre repo GitHub
5. Vercel détectera automatiquement la configuration depuis `vercel.json`
6. Cliquez sur Deploy

Votre site sera disponible sur `https://nom-du-projet.vercel.app`

### Configuration Vercel

Le fichier `vercel.json` est déjà configuré avec :
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Dev Command**: `npm run dev`

## Pages disponibles

- `/index.html` - Page de contact
- `/badge.html` - Badge étudiant avec QR code
- `/reset-password.html` - Réinitialisation de mot de passe

## Technologies utilisées

- HTML5
- Tailwind CSS 3.4.1
- Vercel (déploiement)

