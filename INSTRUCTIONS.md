# 🚀 Instructions de démarrage rapide

## Installation

1. **Ouvrir un terminal** dans le dossier du projet

2. **Installer les dépendances** :
```bash
npm install
```

3. **Lancer le serveur de développement** :
```bash
npm run dev
```

4. **Ouvrir le navigateur** sur : `http://localhost:3000`

## Première utilisation

1. Sur la page d'accueil, cliquer sur **"Je suis Sacha"**
2. Le profil est automatiquement créé avec un monstre de départ (Luminis)
3. Cliquer sur **"Commencer la séance"** pour démarrer les exercices
4. Suivre les instructions à l'écran pour chaque mini-jeu

## Navigation

- **`/`** : Page d'accueil
- **`/sacha`** : Espace de jeu de Sacha
- **`/sacha/session`** : Séance en cours
- **`/sacha/reward`** : Page de récompense après une séance
- **`/parent`** : Tableau de bord parent (statistiques)
- **`/settings`** : Réglages (durée, difficulté, sons)

## Fonctionnalités principales

### Pour Sacha
- ✅ Séance quotidienne avec mini-jeux variés
- ✅ Système de progression (XP, niveaux)
- ✅ Monstres qui évoluent
- ✅ Badges à débloquer
- ✅ Feedback immédiat et animations

### Pour le parent
- ✅ Statistiques détaillées
- ✅ Graphiques de progression
- ✅ Points forts et faiblesses
- ✅ Historique des séances

## Personnalisation

Les données sont stockées dans le **localStorage** du navigateur. Pour réinitialiser :
1. Aller dans `/settings`
2. Cliquer sur "Réinitialiser toutes les données"
3. Confirmer l'action

## Notes importantes

- Les sons utilisent la **Web Speech API** du navigateur
- Les données sont stockées localement (pas de serveur requis)
- Compatible avec tous les navigateurs modernes
- Responsive (fonctionne sur tablette)

## Support

En cas de problème :
1. Vérifier que Node.js 18+ est installé
2. Vérifier que les dépendances sont bien installées (`npm install`)
3. Vérifier la console du navigateur pour les erreurs

---

**Bon apprentissage à Sacha ! 🎮✨**

