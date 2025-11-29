'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile, getSessions } from '@/lib/storage';
import { ChildProfile, SessionStats } from '@/types';
import MonsterAvatar from '@/components/MonsterAvatar';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CelebrationIcon } from '@/components/Icons';

export default function RewardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [lastSession, setLastSession] = useState<SessionStats | null>(null);

  useEffect(() => {
    const p = getProfile();
    const sessions = getSessions();
    if (!p) {
      router.push('/');
      return;
    }
    setProfile(p);
    if (sessions.length > 0) {
      setLastSession(sessions[sessions.length - 1]);
    }
  }, [router]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-child-lg">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="mb-8"
        >
          <div className="mb-6">
            <CelebrationIcon size={120} className="text-yellow-400" />
          </div>
          <h1 className="text-5xl font-bold text-orange-600 mb-4">
            Félicitations {profile.name} !
          </h1>
          <p className="text-child-xl text-gray-700 mb-8">
            Tu as terminé ta séance avec succès !
          </p>
        </motion.div>

        {lastSession && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card mb-8"
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Résultats de ta séance</h2>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-child-lg text-gray-600 mb-2">Exercices faits</p>
                <p className="text-4xl font-bold text-blue-600">{lastSession.exercisesDone}</p>
              </div>
              <div>
                <p className="text-child-lg text-gray-600 mb-2">Bonnes réponses</p>
                <p className="text-4xl font-bold text-green-600">
                  {lastSession.correctAnswers} / {lastSession.totalAnswers}
                </p>
              </div>
              <div>
                <p className="text-child-lg text-gray-600 mb-2">XP gagnée</p>
                <p className="text-4xl font-bold text-orange-600">+{lastSession.xpGained}</p>
              </div>
              <div>
                <p className="text-child-lg text-gray-600 mb-2">Niveau actuel</p>
                <p className="text-4xl font-bold text-purple-600">Niveau {profile.level}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Ton monstre</h2>
          <MonsterAvatar monster={profile.monsters[0]} size="large" showXP />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/sacha" className="btn-primary">
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

