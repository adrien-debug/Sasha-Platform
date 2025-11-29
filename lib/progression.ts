// Utilitaires pour la progression et le calcul d'XP

import { ChildProfile, Monster } from '@/types';

// Calculer l'XP nécessaire pour un niveau
export function getXPForLevel(level: number): number {
  return 100 + (level - 1) * 50; // 100, 150, 200, 250...
}

// Ajouter de l'XP et vérifier le niveau
export function addXP(profile: ChildProfile, xpGained: number): ChildProfile {
  const newXP = profile.currentXP + xpGained;
  let newLevel = profile.level;
  let remainingXP = newXP;
  let xpForNext = getXPForLevel(newLevel);

  // Vérifier si on monte de niveau
  while (remainingXP >= xpForNext) {
    remainingXP -= xpForNext;
    newLevel++;
    xpForNext = getXPForLevel(newLevel);
  }

  return {
    ...profile,
    level: newLevel,
    currentXP: remainingXP,
    xpForNextLevel: xpForNext,
  };
}

// Vérifier si un monstre peut évoluer
export function canMonsterEvolve(monster: Monster): boolean {
  return monster.xp >= monster.maxXP && monster.stage < 3;
}

// Faire évoluer un monstre
export function evolveMonster(monster: Monster): Monster {
  if (!canMonsterEvolve(monster)) return monster;
  return {
    ...monster,
    stage: monster.stage + 1,
    xp: 0,
    maxXP: monster.maxXP * 2,
  };
}

// Ajouter de l'XP à un monstre
export function addMonsterXP(monster: Monster, xp: number): Monster {
  const newXP = monster.xp + xp;
  return {
    ...monster,
    xp: Math.min(newXP, monster.maxXP),
  };
}

// Obtenir le nom du niveau (pour l'affichage)
export function getLevelTitle(level: number): string {
  const titles: Record<number, string> = {
    1: 'Débutant',
    2: 'Explorateur',
    3: 'Aventurier',
    4: 'Explorateur des Voyelles',
    5: 'Maître des Chiffres',
    6: 'Héros des Syllabes',
    7: 'Champion des Mots',
    8: 'Guerrier de la Lecture',
    9: 'Légende',
    10: 'Maître Ultime',
  };
  return titles[level] || `Niveau ${level}`;
}

// Vérifier si un badge peut être débloqué
export function checkBadgeUnlock(
  profile: ChildProfile,
  category: 'letters' | 'numbers' | 'syllables' | 'words',
  threshold: number
): boolean {
  // Logique simplifiée : vérifier les sessions passées
  // Dans une vraie implémentation, on analyserait les statistiques
  return profile.level >= threshold;
}

