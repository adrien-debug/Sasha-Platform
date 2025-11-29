'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile, saveProfile, resetAllData } from '@/lib/storage';
import { ChildProfile } from '@/types';
import Link from 'next/link';
import { SettingsIcon, SoundOnIcon, SoundOffIcon, WarningIcon } from '@/components/Icons';

export default function SettingsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.push('/');
      return;
    }
    setProfile(p);
  }, [router]);

  const handleSettingChange = (key: keyof ChildProfile['settings'], value: any) => {
    if (!profile) return;
    const updated = {
      ...profile,
      settings: {
        ...profile.settings,
        [key]: value,
      },
    };
    setProfile(updated);
    saveProfile(updated);
  };

  const handleReset = () => {
    resetAllData();
    router.push('/');
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-child-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 flex items-center gap-3">
            <SettingsIcon size={48} className="text-gray-800" />
            Réglages
          </h1>
          <Link href="/sacha" className="btn-secondary">
            Retour
          </Link>
        </div>

        <div className="card mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Durée de la séance</h2>
          <div className="flex gap-4">
            {[20, 30, 40].map(duration => (
              <button
                key={duration}
                onClick={() => handleSettingChange('sessionDuration', duration)}
                className={`flex-1 py-4 px-6 rounded-2xl text-child-lg font-bold transition-all ${
                  profile.settings.sessionDuration === duration
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {duration} min
              </button>
            ))}
          </div>
        </div>

        <div className="card mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Niveau de difficulté</h2>
          <div className="flex gap-4">
            {(['beginner', 'intermediate'] as const).map(difficulty => (
              <button
                key={difficulty}
                onClick={() => handleSettingChange('difficulty', difficulty)}
                className={`flex-1 py-4 px-6 rounded-2xl text-child-lg font-bold transition-all ${
                  profile.settings.difficulty === difficulty
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {difficulty === 'beginner' ? 'Débutant' : 'Intermédiaire'}
              </button>
            ))}
          </div>
        </div>

        <div className="card mb-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Sons</h2>
          <button
            onClick={() => handleSettingChange('soundEnabled', !profile.settings.soundEnabled)}
            className={`w-full py-4 px-6 rounded-2xl text-child-lg font-bold transition-all ${
              profile.settings.soundEnabled
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              {profile.settings.soundEnabled ? (
                <>
                  <SoundOnIcon size={24} className="text-current" />
                  Sons activés
                </>
              ) : (
                <>
                  <SoundOffIcon size={24} className="text-current" />
                  Sons désactivés
                </>
              )}
            </span>
          </button>
        </div>

        <div className="card">
          <h2 className="text-3xl font-bold mb-6 text-red-600">Zone de danger</h2>
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-4 px-6 rounded-2xl text-child-lg font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-all"
            >
              Réinitialiser toutes les données
            </button>
          ) : (
            <div className="space-y-4">
              <p className="text-child-lg text-gray-700">
                <span className="flex items-start gap-2">
                  <WarningIcon size={24} className="text-red-600 flex-shrink-0 mt-1" />
                  Êtes-vous sûr ? Cette action supprimera toutes les données (progression, sessions, badges).
                </span>
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleReset}
                  className="flex-1 py-4 px-6 rounded-2xl text-child-lg font-bold bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Oui, réinitialiser
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-4 px-6 rounded-2xl text-child-lg font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

