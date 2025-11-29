# ⚡ Déploiement rapide GitHub + Vercel

## 🚀 Étapes rapides

### 1. Créer le dépôt GitHub

```bash
# Option A : Avec GitHub CLI (si installé)
gh repo create sasha-pikatchu --public --source=. --remote=origin --push

# Option B : Manuellement
# 1. Allez sur https://github.com/new
# 2. Créez un dépôt "sasha-pikatchu"
# 3. Exécutez :
git remote add origin https://github.com/VOTRE_USERNAME/sasha-pikatchu.git
git branch -M main
git push -u origin main
```

### 2. Déployer sur Vercel

1. **Allez sur** https://vercel.com
2. **Connectez-vous** avec GitHub
3. **Cliquez** "Add New Project"
4. **Sélectionnez** votre dépôt `sasha-pikatchu`
5. **Vercel détecte** automatiquement Next.js
6. **Cliquez** "Deploy"

C'est tout ! 🎉

## 📋 Commandes Git utiles

```bash
# Voir le statut
git status

# Ajouter tous les changements
git add .

# Commit
git commit -m "Description"

# Push vers GitHub
git push

# Vercel redéploiera automatiquement !
```

## 🌐 Après le déploiement

Vous obtiendrez une URL comme :
- `https://sasha-pikatchu.vercel.app`

Vercel déploie automatiquement à chaque push sur `main` !

## ✅ Checklist

- [x] Git initialisé
- [x] Fichiers commités
- [x] Configuration Vercel créée
- [ ] Dépôt GitHub créé
- [ ] Code poussé sur GitHub
- [ ] Projet Vercel créé
- [ ] Site déployé en ligne

