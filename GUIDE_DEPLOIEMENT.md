# 🚀 Guide de déploiement sur GitHub Pages

## Ce que tu as reçu
Un dossier `portfolio/` avec tout le code source React de ton portfolio.

---

## Étape 1 — Créer un compte GitHub
1. Va sur **https://github.com**
2. Clique sur **Sign up** (gratuit)
3. Choisis un nom d'utilisateur (ex: `cherif-kone` ou `cherifkone047`)

---

## Étape 2 — Créer le dépôt
1. Une fois connecté, clique sur le **+** en haut à droite → **New repository**
2. Nom du dépôt : **`portfolio`** (exactement ce mot)
3. Laisse en **Public** (obligatoire pour GitHub Pages gratuit)
4. Ne coche rien d'autre → **Create repository**

---

## Étape 3 — Installer Git sur ton PC (si pas déjà fait)
Télécharge Git sur : https://git-scm.com/downloads  
Après installation, ouvre un terminal (CMD ou Git Bash).

---

## Étape 4 — Configurer et pousser ton code

Ouvre un terminal dans le dossier `portfolio/` et exécute ces commandes **une par une** :

```bash
# 1. Configure ton identité Git
git config --global user.name "Koné Cherif Moussa"
git config --global user.email "cherifkone047@gmail.com"

# 2. Initialise le dépôt
git init

# 3. Ajoute tous les fichiers
git add .

# 4. Premier commit
git commit -m "Initial commit - Portfolio Koné Cherif Moussa"

# 5. Renomme la branche principale
git branch -M main

# 6. Connecte à GitHub (remplace TON_USERNAME par ton nom d'utilisateur GitHub)
git remote add origin https://github.com/TON_USERNAME/portfolio.git

# 7. Envoie le code
git push -u origin main
```

---

## Étape 5 — Installer gh-pages et déployer

```bash
# Installe le package de déploiement
npm install gh-pages --save-dev
```

Ensuite, ouvre le fichier `package.json` et ajoute :

```json
{
  "homepage": "https://TON_USERNAME.github.io/portfolio",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    ...
  }
}
```

Puis lance le déploiement :

```bash
npm run deploy
```

---

## Étape 6 — Activer GitHub Pages
1. Va sur **https://github.com/TON_USERNAME/portfolio**
2. Clique sur **Settings** → **Pages** (dans le menu gauche)
3. Sous "Branch", sélectionne **gh-pages** → **Save**
4. Attends 2-3 minutes

---

## 🎉 Ton portfolio sera en ligne à :
**https://TON_USERNAME.github.io/portfolio**

---

## Mettre à jour ton portfolio plus tard
Chaque fois que tu modifies quelque chose :
```bash
npm run deploy
```
C'est tout ! Les changements sont en ligne en 2 minutes.

---

## ❓ Besoin d'aide ?
Demande à Claude ! Il peut t'aider à chaque étape.
