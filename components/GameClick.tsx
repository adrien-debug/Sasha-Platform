'use client';

import { GameExercise } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MonsterIcon, StarIcon, CelebrationIcon } from './Icons';

interface GameClickProps {
  exercise: GameExercise;
  onComplete: (correct: boolean) => void;
}

export default function GameClick({ exercise, onComplete }: GameClickProps) {
  const [clicked, setClicked] = useState<boolean[]>([]);
  const [completed, setCompleted] = useState(false);

  const monsters = exercise.data.monsters || [];
  const targetLetter = exercise.question.match(/lettre (\w)/)?.[1] || '';

  const handleClick = (index: number) => {
    if (completed) return;
    const newClicked = [...clicked];
    newClicked[index] = true;
    setClicked(newClicked);

    // Vérifier si tous les bons monstres sont cliqués
    const correctIndices = monsters
      .map((m: any, idx: number) => (m.letter === targetLetter ? idx : -1))
      .filter(idx => idx !== -1);
    
    const allClicked = correctIndices.every(idx => newClicked[idx]);
    if (allClicked && correctIndices.length > 0) {
      setCompleted(true);
      setTimeout(() => {
        onComplete(true);
        setClicked([]);
        setCompleted(false);
      }, 2000);
    }
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-child-xl font-bold text-center mb-6 text-gray-800">
        {exercise.question}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {monsters.map((monster: any, idx: number) => {
          const isTarget = monster.letter === targetLetter;
          const isClicked = clicked[idx];

          return (
            <motion.button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`p-6 rounded-2xl text-child-lg font-bold transition-all relative ${
                isClicked
                  ? isTarget
                    ? 'bg-green-400 text-white scale-110 shadow-xl'
                    : 'bg-red-300 text-white opacity-50'
                  : 'bg-gradient-to-br from-yellow-100 to-orange-200 hover:from-yellow-200 hover:to-orange-300 text-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={completed || isClicked}
              initial={{ scale: 1 }}
              animate={isClicked && isTarget ? { scale: [1, 1.2, 1] } : {}}
            >
              <div className="mb-2 flex justify-center">
                <MonsterIcon size={32} className="text-current" />
              </div>
              <div className={`text-child-xl font-bold ${isTarget ? 'text-blue-600' : ''}`}>
                {monster.letter}
              </div>
              {isClicked && isTarget && (
                <motion.div
                  className="absolute -top-2 -right-2"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  <StarIcon size={32} className="text-yellow-400" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {completed && (
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center gap-3">
            <CelebrationIcon size={32} className="text-green-600" />
            <p className="text-child-xl font-bold text-green-600">
              Excellent ! Tu as capturé tous les bons monstres !
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

