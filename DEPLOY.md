# 🚀 Guide de déploiement GitHub + Vercel

## 📦 Étape 1 : Créer le dépôt GitHub

### Option A : Via l'interface GitHub
1. Allez sur https://github.com/new
2. Créez un nouveau dépôt (ex: `sasha-pikatchu`)
3. **Ne cochez PAS** "Initialize with README"
4. Cliquez sur "Create repository"

### Option B : Via la ligne de commande
```bash
# Créer le dépôt sur GitHub (remplacez USERNAME par votre nom d'utilisateur)
gh repo create sasha-pikatchu --public --source=. --remote=origin --push
```

## 🔗 Étape 2 : Connecter le dépôt local à GitHub

```bash
# Remplacez USERNAME et REPO_NAME par vos valeurs
git remote add origin https://github.com/USERNAME/sasha-pikatchu.git
git branch -M main
git push -u origin main
```

## ⚡ Étape 3 : Déployer sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)
1. Allez sur https://vercel.com
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "Add New Project"
4. Importez votre dépôt `sasha-pikatchu`
5. Vercel détectera automatiquement Next.js
6. Cliquez sur "Deploy"

### Méthode 2 : Via Vercel CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Pour la production
vercel --prod
```

## ⚙️ Configuration Vercel

Le fichier `vercel.json` est déjà configuré avec :
- Framework : Next.js
- Build command : `npm run build`
- Région : Europe (cdg1)

## 🌐 Variables d'environnement (si nécessaire)

Si vous avez besoin de variables d'environnement :
1. Allez dans votre projet Vercel
2. Settings > Environment Variables
3. Ajoutez vos variables

## 📝 Commandes utiles

```bash
# Vérifier le statut git
git status

# Ajouter des fichiers
git add .

# Commit
git commit -m "Description des changements"

# Push vers GitHub
git push

# Vercel redéploiera automatiquement après chaque push
```

## 🔄 Déploiement automatique

Une fois connecté, Vercel déploiera automatiquement :
- À chaque push sur `main` → Production
- À chaque pull request → Preview

## 🌍 URLs

Après le déploiement, vous aurez :
- URL de production : `https://votre-projet.vercel.app`
- URL de preview : `https://votre-projet-git-branch.vercel.app`

## ✅ Checklist

- [ ] Dépôt GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Projet Vercel créé
- [ ] Déploiement réussi
- [ ] Site accessible en ligne

