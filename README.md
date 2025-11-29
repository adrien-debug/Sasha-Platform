# 🎮 Aventure de Sacha - Plateforme d'apprentissage CP

Plateforme web complète d'apprentissage ludique pour enfants de CP (6 ans), spécialement conçue pour **Sacha**, avec un univers inspiré de Pokémon.

## 🌟 Fonctionnalités

### Pour l'enfant (Sacha)
- **Séance quotidienne** structurée en mini-jeux de 1-3 minutes
- **6 types de jeux pédagogiques** :
  - 🔗 Relie les paires (linker)
  - ⭕ Entoure la bonne réponse
  - 🖱️ Clique le bon (réaction rapide)
  - 🎯 Drag & Drop (glisser-déposer)
  - 🧩 Mémo-cartes (Memory)
  - 🛤️ Chemin à suivre (ordre des lettres/chiffres)
- **Système de progression** :
  - XP et niveaux
  - Monstres qui évoluent
  - Badges à débloquer
- **Interface adaptée** : gros boutons, couleurs vives, feedback immédiat

### Pour le parent
- **Tableau de bord** avec statistiques détaillées
- **Graphiques de progression** sur 6 mois
- **Points forts et faiblesses** identifiés
- **Suivi par compétence** (lettres, chiffres, syllabes, mots)

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Étapes

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer le serveur de développement** :
```bash
npm run dev
```

3. **Ouvrir dans le navigateur** :
```
http://localhost:3000
```

## 📁 Structure du projet

```
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil
│   ├── sacha/             # Espace enfant
│   │   ├── page.tsx       # Tableau de bord Sacha
│   │   ├── session/       # Séance en cours
│   │   └── reward/        # Page de récompense
│   ├── parent/            # Tableau de bord parent
│   └── settings/          # Réglages
├── components/            # Composants React réutilisables
│   ├── GameLink.tsx      # Jeu "Relie les paires"
│   ├── GameCircle.tsx    # Jeu "Entoure"
│   ├── GameClick.tsx     # Jeu "Clique le bon"
│   ├── GameDragDrop.tsx  # Jeu "Drag & Drop"
│   ├── GameMemory.tsx    # Jeu "Mémo-cartes"
│   ├── GamePath.tsx      # Jeu "Chemin"
│   ├── MonsterAvatar.tsx # Avatar de monstre
│   ├── ProgressBar.tsx   # Barre de progression
│   └── SoundButton.tsx   # Bouton de prononciation
├── lib/                   # Utilitaires
│   ├── storage.ts        # Gestion localStorage
│   ├── progression.ts   # Calcul XP, niveaux, évolutions
│   └── games.ts          # Génération d'exercices
└── types/                 # Types TypeScript
    └── index.ts          # Interfaces principales
```

## 🎯 Compétences pédagogiques

La plateforme couvre **6 mois** d'apprentissage progressif :

- **Mois 1-2** : Lettres (majuscules/minuscules), sons simples, chiffres 0-10
- **Mois 3-4** : Syllabes simples (ba/be/bi/bo/bu, ma/me/mi...), chiffres jusqu'à 20
- **Mois 5-6** : Mots simples (papa, maman, sac, rat...), chiffres jusqu'à 100

## 🎨 Design & UX

- **Couleurs** : Palette vive et chaleureuse (jaunes, bleus, rouges, verts pastels)
- **Typographie** : Taille minimum 18-20px pour les enfants
- **Interactions** : Animations douces (framer-motion), feedback immédiat
- **Accessibilité** : Boutons larges, contrastes élevés, navigation intuitive

## 💾 Stockage

Les données sont stockées dans le **localStorage** du navigateur :
- Profil de l'enfant
- Sessions et statistiques
- Progression et badges

> 💡 **Note** : Le code est structuré pour faciliter une migration future vers un backend (API routes Next.js ou base de données).

## 🔧 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Recharts** (graphiques)
- **Web Speech API** (prononciation)

## 📝 Scripts disponibles

```bash
npm run dev      # Développement
npm run build    # Production
npm run start    # Serveur de production
npm run lint     # Vérification du code
```

## 🎮 Utilisation

1. **Première visite** : Le profil de Sacha est automatiquement initialisé
2. **Séance quotidienne** : Cliquer sur "Commencer la séance" depuis `/sacha`
3. **Suivi parent** : Accéder à `/parent` pour voir les statistiques
4. **Réglages** : Modifier la durée, difficulté, sons depuis `/settings`

## 🌈 Univers des monstres

L'univers est **inspiré de Pokémon** mais **100% original** :
- **Luminis** ⚡ (monstre de départ)
- **Flamix** 🔥
- **Aquatos** 💧
- Et d'autres à débloquer !

Les monstres évoluent en 3 stades au fur et à mesure de la progression.

## 🏆 Système de badges

Badges débloquables :
- "Maître des lettres A-F"
- "Champion des chiffres 0-10"
- "Héros des syllabes ba/bo/bu"
- Et bien d'autres !

## 📊 Statistiques parent

Le tableau de bord parent affiche :
- Temps passé par séance
- Progression par compétence
- Points forts et faiblesses
- Historique sur 30 jours
- Dernière séance et détails

## 🎯 Prochaines améliorations possibles

- [ ] Ajout de sons réels (fichiers audio)
- [ ] Reconnaissance vocale pour la prononciation
- [ ] Plus de types de mini-jeux
- [ ] Mode multijoueur (compétition amicale)
- [ ] Export des statistiques (PDF)
- [ ] Thèmes personnalisables
- [ ] Mode hors-ligne (PWA)

## 📄 Licence

Ce projet est créé pour un usage éducatif personnel.

---

**Fait avec ❤️ pour Sacha** 🎮✨

