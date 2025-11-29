'use client';

import { useEffect, useState } from 'react';
import { getProfile, getSessions } from '@/lib/storage';
import { ChildProfile, SessionStats } from '@/types';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';
import { CheckIcon, MuscleIcon, ClockIcon, TargetIcon, MonsterIcon, TrophyIcon } from '@/components/Icons';

export default function ParentPage() {
  const [profile, setProfile] = useState<ChildProfile | null>(null);
  const [sessions, setSessions] = useState<SessionStats[]>([]);

  useEffect(() => {
    const p = getProfile();
    const s = getSessions();
    setProfile(p);
    setSessions(s);
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-child-lg">Chargement...</p>
      </div>
    );
  }

  // Préparer les données pour les graphiques
  const last30Days = sessions.slice(-30);
  const chartData = last30Days.map(session => ({
    date: new Date(session.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
    duration: session.durationMinutes,
    correct: session.correctAnswers,
    total: session.totalAnswers,
    xp: session.xpGained,
  }));

  // Calculer les statistiques globales
  const totalSessions = sessions.length;
  const totalExercises = sessions.reduce((sum, s) => sum + s.exercisesDone, 0);
  const totalCorrect = sessions.reduce((sum, s) => sum + s.correctAnswers, 0);
  const totalAnswers = sessions.reduce((sum, s) => sum + s.totalAnswers, 0);
  const averageCorrect = totalAnswers > 0 ? Math.round((totalCorrect / totalAnswers) * 100) : 0;

  // Calculer les points forts et faiblesses
  const categoryStats = {
    letters: { correct: 0, total: 0 },
    numbers: { correct: 0, total: 0 },
    syllables: { correct: 0, total: 0 },
    words: { correct: 0, total: 0 },
  };

  sessions.forEach(session => {
    Object.keys(categoryStats).forEach(cat => {
      categoryStats[cat as keyof typeof categoryStats].correct += session.byCategory[cat as keyof typeof session.byCategory].correct;
      categoryStats[cat as keyof typeof categoryStats].total += session.byCategory[cat as keyof typeof session.byCategory].total;
    });
  });

  const categoryPercentages = Object.entries(categoryStats).map(([cat, stats]) => ({
    category: cat,
    percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
  }));

  const strengths = categoryPercentages.filter(c => c.percentage >= 80).map(c => c.category);
  const weaknesses = categoryPercentages.filter(c => c.percentage < 60).map(c => c.category);

  // Dernière séance
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const lastSessionDate = lastSession ? new Date(lastSession.date).toLocaleDateString('fr-FR') : 'Aucune';

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800">Tableau de bord parent</h1>
          <Link href="/" className="btn-secondary">
            Retour à l&apos;accueil
          </Link>
        </div>

        {/* Vue d'ensemble */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <p className="text-child-lg text-gray-600 mb-2">Niveau actuel</p>
            <p className="text-4xl font-bold text-orange-600">{profile.level}</p>
          </div>
          <div className="card text-center">
            <p className="text-child-lg text-gray-600 mb-2">Séances totales</p>
            <p className="text-4xl font-bold text-blue-600">{totalSessions}</p>
          </div>
          <div className="card text-center">
            <p className="text-child-lg text-gray-600 mb-2">Exercices faits</p>
            <p className="text-4xl font-bold text-green-600">{totalExercises}</p>
          </div>
          <div className="card text-center">
            <p className="text-child-lg text-gray-600 mb-2">Taux de réussite</p>
            <p className="text-4xl font-bold text-purple-600">{averageCorrect}%</p>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Temps passé par séance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="duration" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Progression par compétence</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryPercentages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Points forts et faiblesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-2">
              <CheckIcon size={24} className="text-green-600" />
              Points forts
            </h2>
            {strengths.length > 0 ? (
              <ul className="space-y-2">
                {strengths.map(cat => (
                  <li key={cat} className="text-child-lg text-gray-700">
                    • {cat === 'letters' ? 'Lettres' : cat === 'numbers' ? 'Chiffres' : cat === 'syllables' ? 'Syllabes' : 'Mots'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-child-lg text-gray-600">En cours d&apos;analyse...</p>
            )}
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4 text-orange-600 flex items-center gap-2">
              <MuscleIcon size={24} className="text-orange-600" />
              Points à renforcer
            </h2>
            {weaknesses.length > 0 ? (
              <ul className="space-y-2">
                {weaknesses.map(cat => (
                  <li key={cat} className="text-child-lg text-gray-700">
                    • {cat === 'letters' ? 'Lettres' : cat === 'numbers' ? 'Chiffres' : cat === 'syllables' ? 'Syllabes' : 'Mots'}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-child-lg text-gray-600">Aucun point faible identifié !</p>
            )}
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Informations</h2>
          <div className="space-y-2 text-child-lg text-gray-700">
            <p>📅 Dernière séance : <strong>{lastSessionDate}</strong></p>
            {lastSession && (
              <p className="flex items-center gap-2">
                <ClockIcon size={20} className="text-gray-700" />
                Durée : <strong>{lastSession.durationMinutes} minutes</strong>
              </p>
            )}
            <p className="flex items-center gap-2">
              <TargetIcon size={20} className="text-gray-700" />
              XP totale : <strong>{profile.currentXP} / {profile.xpForNextLevel}</strong>
            </p>
            <p className="flex items-center gap-2">
              <MonsterIcon size={20} className="text-gray-700" />
              Monstres débloqués : <strong>{profile.monsters.length}</strong>
            </p>
            <p className="flex items-center gap-2">
              <TrophyIcon size={20} className="text-gray-700" />
              Badges obtenus : <strong>{profile.badges.length}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

