# 🚀 Déploiement sur Vercel

## ✅ Code déjà sur GitHub !

Votre code est maintenant sur : **https://github.com/adrien-debug/Sasha-Platform**

## ⚡ Déploiement Vercel (2 minutes)

### Méthode 1 : Interface Vercel (Recommandé)

1. **Allez sur** https://vercel.com
2. **Connectez-vous** avec votre compte GitHub
3. **Cliquez** sur "Add New Project"
4. **Importez** le dépôt `Sasha-Platform`
5. **Vercel détecte** automatiquement :
   - Framework : Next.js ✅
   - Build Command : `npm run build` ✅
   - Install Command : `npm install` ✅
6. **Cliquez** sur "Deploy"

C'est tout ! 🎉

### Méthode 2 : Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer (première fois)
vercel

# Déployer en production
vercel --prod
```

## 🌐 Après le déploiement

Vous obtiendrez une URL comme :
- **Production** : `https://sasha-platform.vercel.app`
- **Preview** : `https://sasha-platform-git-main.vercel.app`

## 🔄 Déploiement automatique

Vercel déploiera automatiquement :
- ✅ À chaque push sur `main` → **Production**
- ✅ À chaque Pull Request → **Preview**

## ⚙️ Configuration

Le fichier `vercel.json` est déjà configuré avec :
- Framework : Next.js
- Région : Europe (cdg1)
- Build automatique

## 📝 Prochaines étapes

1. ✅ Code sur GitHub
2. ⏳ Déployer sur Vercel
3. 🎉 Site en ligne !

## 🔗 Liens utiles

- **GitHub** : https://github.com/adrien-debug/Sasha-Platform
- **Vercel Dashboard** : https://vercel.com/dashboard
- **Documentation Vercel** : https://vercel.com/docs

