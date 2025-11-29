'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile, getDailySession, saveDailySession, saveProfile, saveSession } from '@/lib/storage';
import { addXP, addMonsterXP, evolveMonster, canMonsterEvolve } from '@/lib/progression';
import { ChildProfile, DailySession, GameExercise, SessionStats } from '@/types';
import ProgressBar from '@/components/ProgressBar';
import GameLink from '@/components/GameLink';
import GameCircle from '@/components/GameCircle';
import GameClick from '@/components/GameClick';
import GameDragDrop from '@/components/GameDragDrop';
import GamePath from '@/components/GamePath';
import GameMemory from '@/components/GameMemory';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, MonsterIcon } from '@/components/Icons';

export default function SessionPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [session, setSession] = useState<DailySession | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    total: 0,
    byCategory: {
      letters: { correct: 0, total: 0 },
      numbers: { correct: 0, total: 0 },
      syllables: { correct: 0, total: 0 },
      words: { correct: 0, total: 0 },
    },
    startTime: Date.now(),
  });

  useEffect(() => {
    const p = getProfile();
    const s = getDailySession();
    if (!p || !s) {
      router.push('/sacha');
      return;
    }
    setProfile(p);
    setSession(s);
    setCurrentExerciseIndex(s.currentStep);
  }, [router]);

  const handleExerciseComplete = (correct: boolean) => {
    if (!session || !profile) return;

    const exercise = session.exercises[currentExerciseIndex];
    const newStats = { ...sessionStats };
    newStats.total++;
    if (correct) {
      newStats.correct++;
      newStats.byCategory[exercise.category].correct++;
    }
    newStats.byCategory[exercise.category].total++;
    setSessionStats(newStats);

    // Passer à l'exercice suivant
    setTimeout(() => {
      const nextIndex = currentExerciseIndex + 1;
      if (nextIndex >= session.exercises.length) {
        // Séance terminée
        finishSession(newStats);
      } else {
        setCurrentExerciseIndex(nextIndex);
        const updatedSession = {
          ...session,
          currentStep: nextIndex,
        };
        saveDailySession(updatedSession);
        setSession(updatedSession);
      }
    }, 2000);
  };

  const finishSession = (stats: typeof sessionStats) => {
    if (!session || !profile) return;

    const durationMinutes = Math.round((Date.now() - stats.startTime) / 60000);
    const xpGained = stats.correct * 10 + (stats.total - stats.correct) * 2; // 10 XP par bonne réponse, 2 par mauvaise

    // Mettre à jour le profil
    const updatedProfile = addXP(profile, xpGained);
    
    // Ajouter de l'XP au monstre principal
    if (updatedProfile.monsters.length > 0) {
      updatedProfile.monsters[0] = addMonsterXP(updatedProfile.monsters[0], xpGained);
      if (canMonsterEvolve(updatedProfile.monsters[0])) {
        updatedProfile.monsters[0] = evolveMonster(updatedProfile.monsters[0]);
      }
    }

    saveProfile(updatedProfile);

    // Sauvegarder la session
    const sessionStatsData: SessionStats = {
      id: session.id,
      date: new Date().toISOString(),
      durationMinutes,
      exercisesDone: stats.total,
      correctAnswers: stats.correct,
      totalAnswers: stats.total,
      byCategory: stats.byCategory,
      xpGained,
      levelAfterSession: updatedProfile.level,
    };
    saveSession(sessionStatsData);

    // Marquer la séance comme terminée
    const completedSession: DailySession = {
      ...session,
      completed: true,
      currentStep: session.exercises.length,
    };
    saveDailySession(completedSession);

    // Rediriger vers la page de récompense
    router.push('/sacha/reward');
  };

  if (!session || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-child-lg">Chargement...</p>
      </div>
    );
  }

  const currentExercise = session.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / session.exercises.length) * 100;

  const renderGame = () => {
    switch (currentExercise.type) {
      case 'link':
        return <GameLink exercise={currentExercise} onComplete={handleExerciseComplete} />;
      case 'circle':
        return <GameCircle exercise={currentExercise} onComplete={handleExerciseComplete} />;
      case 'click':
        return <GameClick exercise={currentExercise} onComplete={handleExerciseComplete} />;
      case 'dragdrop':
        return <GameDragDrop exercise={currentExercise} onComplete={handleExerciseComplete} />;
      case 'path':
        return <GamePath exercise={currentExercise} onComplete={handleExerciseComplete} />;
      case 'memory':
        return <GameMemory exercise={currentExercise} onComplete={handleExerciseComplete} />;
      default:
        return <div>Type de jeu non reconnu</div>;
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Barre de progression */}
        <div className="card mb-6">
          <ProgressBar
            current={currentExerciseIndex + 1}
            total={session.exercises.length}
            label={`Exercice ${currentExerciseIndex + 1} sur ${session.exercises.length}`}
          />
          <div className="mt-4 flex justify-between items-center">
            <p className="text-child-lg text-gray-600">
              <span className="flex items-center gap-2">
                <CheckIcon size={20} className="text-green-500" />
                {sessionStats.correct} / {sessionStats.total} bonnes réponses
              </span>
            </p>
            <button
              onClick={() => router.push('/sacha')}
              className="text-child-lg text-gray-600 hover:text-gray-800"
            >
              Quitter
            </button>
          </div>
        </div>

        {/* Message d'encouragement */}
        <div className="text-center mb-6">
          <motion.div
            key={currentExerciseIndex}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-2xl p-4 inline-block"
          >
            <p className="text-child-lg font-bold text-gray-800">
              <span className="flex items-center gap-2">
                <MonsterIcon size={24} className="text-purple-600" />
                Allez, on continue {profile.name} ! Tu es sur la bonne voie !
                <MonsterIcon size={24} className="text-purple-600" />
              </span>
            </p>
          </motion.div>
        </div>

        {/* Jeu actuel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExerciseIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            {renderGame()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

