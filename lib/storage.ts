// Utilitaires pour le stockage localStorage

import { ChildProfile, SessionStats, DailySession } from '@/types';

const STORAGE_KEYS = {
  PROFILE: 'sacha_profile',
  SESSIONS: 'sacha_sessions',
  DAILY_SESSION: 'sacha_daily_session',
  SETTINGS: 'sacha_settings',
} as const;

// Gestion du profil
export function getProfile(): ChildProfile | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveProfile(profile: ChildProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

export function initializeProfile(): ChildProfile {
  const defaultProfile: ChildProfile = {
    name: 'Sacha',
    level: 1,
    currentXP: 0,
    xpForNextLevel: 100,
    monsters: [
      {
        id: 'luminis-1',
        name: 'Luminis',
        stage: 1,
        unlockedAt: 1,
        xp: 0,
        maxXP: 50,
      },
    ],
    badges: [],
    settings: {
      sessionDuration: 30,
      difficulty: 'beginner',
      soundEnabled: true,
    },
  };
  saveProfile(defaultProfile);
  return defaultProfile;
}

// Gestion des sessions
export function getSessions(): SessionStats[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.SESSIONS);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveSession(session: SessionStats): void {
  if (typeof window === 'undefined') return;
  const sessions = getSessions();
  sessions.push(session);
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions));
}

// Gestion de la séance quotidienne
export function getDailySession(): DailySession | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEYS.DAILY_SESSION);
  if (!stored) return null;
  try {
    const session = JSON.parse(stored);
    // Vérifier si la séance est encore du jour
    const today = new Date().toISOString().split('T')[0];
    if (session.date !== today) {
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveDailySession(session: DailySession): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.DAILY_SESSION, JSON.stringify(session));
}

// Réinitialiser toutes les données
export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.SESSIONS);
  localStorage.removeItem(STORAGE_KEYS.DAILY_SESSION);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
}

