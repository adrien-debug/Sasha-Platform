'use client';

import { GameExercise } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SoundButton from './SoundButton';
import { StarIcon, SparkleIcon, CelebrationIcon, MuscleIcon } from './Icons';

interface GameCircleProps {
  exercise: GameExercise;
  onComplete: (correct: boolean) => void;
}

export default function GameCircle({ exercise, onComplete }: GameCircleProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  const handleSelect = (option: string | number) => {
    if (completed) return;
    const optionStr = String(option);
    if (selected.includes(optionStr)) {
      setSelected(selected.filter(s => s !== optionStr));
    } else {
      setSelected([...selected, optionStr]);
    }
  };

  const handleValidate = () => {
    const correctAnswer = String(exercise.correctAnswer);
    const isCorrect = selected.includes(correctAnswer) && selected.length === 1;
    setCompleted(true);
    setTimeout(() => {
      onComplete(isCorrect);
      setSelected([]);
      setCompleted(false);
    }, 1500);
  };

  const options = exercise.data.options || [];

  return (
    <div className="card max-w-4xl mx-auto pokemon-card">
      <div className="flex items-center justify-center gap-4 mb-8">
        <motion.h2
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-child-xl font-black text-center bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent"
        >
          {exercise.question}
        </motion.h2>
        <SoundButton text={exercise.question} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {options.map((option: string | number, idx: number) => {
          const optionStr = String(option);
          const isSelected = selected.includes(optionStr);
          const isCorrect = optionStr === String(exercise.correctAnswer);

          return (
            <motion.button
              key={idx}
              onClick={() => handleSelect(option)}
              className={`p-8 rounded-3xl text-child-xl font-black transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white scale-110 shadow-2xl border-4 border-green-700 animate-glow'
                  : 'bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 hover:from-blue-200 hover:via-purple-200 hover:to-pink-200 text-gray-800 border-2 border-gray-300'
              }`}
              whileHover={{ scale: isSelected ? 1.1 : 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              disabled={completed}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
              <span className="relative z-10 drop-shadow-lg">{option}</span>
              {isSelected && (
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

      {selected.length > 0 && !completed && (
        <motion.button
          onClick={handleValidate}
          className="btn-primary w-full text-2xl py-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="flex items-center gap-2">
            VALIDER <SparkleIcon size={20} className="text-current" />
          </span>
        </motion.button>
      )}

      {completed && (
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            {selected.includes(String(exercise.correctAnswer)) ? (
              <CelebrationIcon size={64} className="text-green-500" />
            ) : (
              <MuscleIcon size={64} className="text-orange-500" />
            )}
          </motion.div>
          <p className="text-child-xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            {selected.includes(String(exercise.correctAnswer)) ? 'BRAVO !' : 'CONTINUE !'}
          </p>
        </motion.div>
      )}
    </div>
  );
}

