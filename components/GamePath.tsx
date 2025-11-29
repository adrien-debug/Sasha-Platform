'use client';

import { GameExercise } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CelebrationIcon } from './Icons';

interface GamePathProps {
  exercise: GameExercise;
  onComplete: (correct: boolean) => void;
}

export default function GamePath({ exercise, onComplete }: GamePathProps) {
  const [selected, setSelected] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const letters = exercise.data.letters || [];
  const correctOrder = exercise.correctAnswer || [];

  const handleClick = (clickedIndex: number) => {
    if (completed) return;
    if (selected.includes(clickedIndex)) return; // Déjà sélectionné
    
    const nextExpected = selected.length;
    const expectedIndex = correctOrder[nextExpected];
    
    if (clickedIndex === expectedIndex) {
      const newSelected = [...selected, clickedIndex];
      setSelected(newSelected);
      
      // Vérifier si c'est complet
      if (newSelected.length === correctOrder.length) {
        setCompleted(true);
        setTimeout(() => {
          onComplete(true);
          setSelected([]);
          setCompleted(false);
        }, 2000);
      }
    } else {
      // Mauvaise lettre, réinitialiser
      setSelected([]);
    }
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-child-xl font-bold text-center mb-6 text-gray-800">
        {exercise.question}
      </h2>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {letters.map((letter: any, idx: number) => {
          const isSelected = selected.includes(idx);
          const nextExpectedIndex = correctOrder[selected.length];
          const isNext = idx === nextExpectedIndex && !completed;
          const orderInSelection = selected.indexOf(idx);

          return (
            <motion.button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`p-6 rounded-2xl text-child-xl font-bold transition-all relative ${
                isSelected
                  ? 'bg-green-400 text-white scale-110 shadow-xl'
                  : isNext
                  ? 'bg-yellow-300 text-gray-800 animate-pulse border-4 border-yellow-500'
                  : 'bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-gray-800'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={completed || isSelected}
            >
              {letter.letter}
              {isSelected && (
                <motion.div
                  className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center text-child font-bold text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {orderInSelection + 1}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="text-center mb-4">
          <p className="text-child-lg text-gray-600">
            Lettres choisies : <strong className="text-2xl text-blue-600">
              {selected.map(idx => letters[idx].letter).join('')}
            </strong>
          </p>
        </div>
      )}

      {completed && (
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-center gap-3">
            <CelebrationIcon size={32} className="text-green-600" />
            <p className="text-child-xl font-bold text-green-600">
              Excellent ! Tu as formé le mot correctement !
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

