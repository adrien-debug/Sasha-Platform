// Types pour la plateforme d'apprentissage de Sacha

export interface SessionStats {
  id: string;
  date: string; // ISO
  durationMinutes: number;
  exercisesDone: number;
  correctAnswers: number;
  totalAnswers: number;
  byCategory: {
    letters: { correct: number; total: number };
    numbers: { correct: number; total: number };
    syllables: { correct: number; total: number };
    words: { correct: number; total: number };
  };
  xpGained: number;
  levelAfterSession: number;
}

export interface ChildProfile {
  name: string; // "Sacha"
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  monsters: Monster[];
  badges: Badge[];
  settings: {
    sessionDuration: number; // minutes
    difficulty: 'beginner' | 'intermediate';
    soundEnabled: boolean;
  };
}

export interface Monster {
  id: string;
  name: string;
  stage: number; // 1, 2, 3 (évolution)
  unlockedAt: number; // niveau requis
  xp: number; // XP actuel du monstre
  maxXP: number; // XP nécessaire pour évoluer
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  earnedAt: string; // date ISO
  icon: string; // emoji ou nom d'icône
}

export interface GameExercise {
  id: string;
  type: 'link' | 'circle' | 'dragdrop' | 'click' | 'memory' | 'path';
  category: 'letters' | 'numbers' | 'syllables' | 'words';
  difficulty: number;
  question: string;
  data: any; // données spécifiques au type de jeu
  correctAnswer: any;
}

export interface DailySession {
  id: string;
  date: string; // ISO
  exercises: GameExercise[];
  completed: boolean;
  currentStep: number;
  totalSteps: number;
}

