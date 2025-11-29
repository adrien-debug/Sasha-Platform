'use client';

import { GameExercise } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, CrossIcon } from './Icons';

interface GameLinkProps {
  exercise: GameExercise;
  onComplete: (correct: boolean) => void;
}

export default function GameLink({ exercise, onComplete }: GameLinkProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const handleLeftClick = (item: string) => {
    if (completed) return;
    setSelectedLeft(item);
    if (selectedRight) {
      checkAnswer(item, selectedRight);
    }
  };

  const handleRightClick = (item: string) => {
    if (completed) return;
    setSelectedRight(item);
    if (selectedLeft) {
      checkAnswer(selectedLeft, item);
    }
  };

  const checkAnswer = (left: string, right: string) => {
    const isCorrect = left === right;
    setCompleted(true);
    setTimeout(() => {
      onComplete(isCorrect);
      setSelectedLeft(null);
      setSelectedRight(null);
      setCompleted(false);
    }, 1500);
  };

  const leftItems = exercise.data.left || [];
  const rightItems = exercise.data.right || [];

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-child-xl font-bold text-center mb-6 text-gray-800">
        {exercise.question}
      </h2>

      <div className="flex justify-between gap-8">
        {/* Colonne gauche */}
        <div className="flex-1 space-y-4">
          <h3 className="text-child-lg font-bold text-center text-blue-600 mb-4">
            Clique ici
          </h3>
          {leftItems.map((item: string, idx: number) => (
            <motion.button
              key={idx}
              onClick={() => handleLeftClick(item)}
              className={`w-full p-6 rounded-2xl text-child-lg font-bold transition-all ${
                selectedLeft === item
                  ? 'bg-green-400 text-white scale-110 shadow-lg'
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={completed}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Ligne de connexion (visuelle) */}
        {selectedLeft && selectedRight && (
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div
              className={`w-32 h-2 rounded-full ${
                selectedLeft === selectedRight ? 'bg-green-500' : 'bg-red-500'
              }`}
            />
            <div className="text-center mt-2 text-child-lg font-bold flex items-center justify-center gap-2">
              {selectedLeft === selectedRight ? (
                <>
                  <CheckIcon size={20} className="text-green-500" />
                  <span>Bravo !</span>
                </>
              ) : (
                <>
                  <CrossIcon size={20} className="text-red-500" />
                  <span>Réessaie !</span>
                </>
              )}
            </div>
          </motion.div>
        )}

        {/* Colonne droite */}
        <div className="flex-1 space-y-4">
          <h3 className="text-child-lg font-bold text-center text-purple-600 mb-4">
            Puis ici
          </h3>
          {rightItems.map((item: any, idx: number) => (
            <motion.button
              key={idx}
              onClick={() => handleRightClick(item.id || item)}
              className={`w-full p-6 rounded-2xl text-child-lg font-bold transition-all ${
                selectedRight === (item.id || item)
                  ? 'bg-purple-400 text-white scale-110 shadow-lg'
                  : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={completed}
            >
              {item.label || item}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

