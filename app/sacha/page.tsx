'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getProfile, getDailySession, saveDailySession, saveProfile, saveSession } from '@/lib/storage';
import { generateDailySession } from '@/lib/games';
import { addXP, getLevelTitle } from '@/lib/progression';
import { ChildProfile, DailySession, SessionStats } from '@/types';
import MonsterAvatar from '@/components/MonsterAvatar';
import ProgressBar from '@/components/ProgressBar';
import { motion } from 'framer-motion';
import { LightningIcon, SettingsIcon, TargetIcon, CelebrationIcon, RocketIcon, MonsterIcon, TrophyIcon, MuscleIcon } from '@/components/Icons';

export default function SachaPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [dailySession, setDailySession] = useState<DailySession | null>(null);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.push('/');
      return;
    }
    setProfile(p);

    // Charger ou créer la séance du jour
    let session = getDailySession();
    if (!session) {
      const exercises = generateDailySession();
      session = {
        id: `session-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        exercises,
        completed: false,
        currentStep: 0,
        totalSteps: exercises.length,
      };
      saveDailySession(session);
    }
    setDailySession(session);
  }, [router]);

  if (!profile || !dailySession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-child-lg">Chargement...</p>
      </div>
    );
  }

  const handleStartSession = () => {
    router.push(`/sacha/session`);
  };

  return (
    <div className="min-h-screen p-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* En-tête avec profil */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8 pokemon-card"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <MonsterAvatar monster={profile.monsters[0]} size="large" showXP />
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl font-black mb-3 bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent"
                >
                  <span className="flex items-center gap-2">
                    Salut {profile.name.toUpperCase()} ! <LightningIcon size={32} className="text-yellow-400" />
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-child-xl font-bold text-gray-800 mb-4"
                >
                  Niveau {profile.level} – {getLevelTitle(profile.level)}
                </motion.p>
                <ProgressBar
                  current={profile.currentXP}
                  total={profile.xpForNextLevel}
                  label="XP"
                />
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href="/settings" className="block">
                <SettingsIcon size={40} className="text-gray-700" />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Séance du jour */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="card mb-8 pokemon-card"
        >
          <motion.h2
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl font-black text-center mb-6 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
          >
            <span className="flex items-center justify-center gap-3">
              <TargetIcon size={32} className="text-red-600" />
              SÉANCE DU JOUR
            </span>
          </motion.h2>
          
          {dailySession.completed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4"
              >
                <CelebrationIcon size={64} className="text-green-600" />
              </motion.div>
              <p className="text-child-xl font-black text-green-600 mb-4 drop-shadow-lg">
                BRAVO ! Tu as terminé ta séance d&apos;aujourd&apos;hui !
              </p>
              <p className="text-child-lg text-gray-700 mb-6">
                Reviens demain pour une nouvelle aventure !
              </p>
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-child-xl font-bold text-gray-800 mb-6">
                Prêt pour une nouvelle aventure ? Tu vas faire <span className="text-red-600 text-3xl">{dailySession.totalSteps}</span> exercices amusants !
              </p>
              <ProgressBar
                current={dailySession.currentStep}
                total={dailySession.totalSteps}
                label="Progression"
              />
              <motion.button
                onClick={handleStartSession}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary mt-8 text-2xl px-12 py-6"
              >
                <span className="flex items-center gap-2">
                  <RocketIcon size={24} className="text-current" />
                  COMMENCER LA SÉANCE
                </span>
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Mon équipe de monstres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card mb-8 pokemon-card"
        >
          <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <span className="flex items-center justify-center gap-3">
              <MonsterIcon size={32} className="text-purple-600" />
              MON ÉQUIPE DE MONSTRES
            </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {profile.monsters.map((monster, idx) => (
              <motion.div
                key={monster.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
              >
                <MonsterAvatar monster={monster} size="medium" showXP />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mes badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card pokemon-card"
        >
          <h2 className="text-4xl font-black text-center mb-8 bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
            <span className="flex items-center justify-center gap-3">
              <TrophyIcon size={32} className="text-yellow-500" />
              MES BADGES
            </span>
          </h2>
          {profile.badges.length === 0 ? (
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-center py-8"
            >
              <p className="text-child-xl font-bold text-gray-700">
                <span className="flex items-center justify-center gap-2">
                  Aucun badge encore. Continue à apprendre pour en gagner ! <MuscleIcon size={24} className="text-orange-500" />
                </span>
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {profile.badges.map((badge, idx) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + idx * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="monster-card text-center"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl mb-3"
                  >
                    {badge.icon}
                  </motion.div>
                  <p className="text-child-lg font-black text-gray-800">{badge.title}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

