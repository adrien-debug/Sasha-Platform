'use client';

import { GameExercise } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { SparkleIcon, CelebrationIcon, MuscleIcon } from './Icons';

interface GameDragDropProps {
  exercise: GameExercise;
  onComplete: (correct: boolean) => void;
}

export default function GameDragDrop({ exercise, onComplete }: GameDragDropProps) {
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pieces, setPieces] = useState<string[]>(exercise.data.pieces || []);
  const [completed, setCompleted] = useState(false);

  const target = exercise.data.target || '';
  const targetLength = target.length / 2; // Supposons que chaque syllabe fait 2 caractères

  const handleDragStart = (e: React.DragEvent, piece: string) => {
    e.dataTransfer.setData('piece', piece);
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    const piece = e.dataTransfer.getData('piece');
    const newSlots = [...slots];
    newSlots[slotIndex] = piece;
    setSlots(newSlots);
    setPieces(pieces.filter(p => p !== piece));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleValidate = () => {
    const expected = exercise.correctAnswer || [];
    const isCorrect = JSON.stringify(slots) === JSON.stringify(expected);
    setCompleted(true);
    setTimeout(() => {
      onComplete(isCorrect);
      setSlots([]);
      setPieces(exercise.data.pieces || []);
      setCompleted(false);
    }, 1500);
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-child-xl font-bold text-center mb-6 text-gray-800">
        {exercise.question}
      </h2>

      <div className="mb-8">
        <p className="text-child-lg text-center mb-4 text-gray-600">
          Mot à former : <strong className="text-2xl text-blue-600">{target}</strong>
        </p>
        <div className="flex justify-center gap-4">
          {Array.from({ length: targetLength }).map((_, idx) => (
            <div
              key={idx}
              onDrop={(e) => handleDrop(e, idx)}
              onDragOver={handleDragOver}
              className={`w-24 h-24 border-4 border-dashed rounded-2xl flex items-center justify-center text-child-lg font-bold ${
                slots[idx]
                  ? 'bg-green-100 border-green-400'
                  : 'bg-gray-100 border-gray-300'
              }`}
            >
              {slots[idx] || '?'}
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-child-lg text-center mb-4 text-gray-600">
          Glisse les syllabes ici :
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {pieces.map((piece, idx) => (
            <motion.div
              key={idx}
              draggable
              onDragStart={(e) => handleDragStart(e, piece)}
              className="p-4 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-2xl text-child-lg font-bold cursor-move shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileDrag={{ scale: 1.2, opacity: 0.5 }}
            >
              {piece}
            </motion.div>
          ))}
        </div>
      </div>

      {slots.every(s => s !== null) && !completed && (
        <motion.button
          onClick={handleValidate}
          className="btn-primary w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="flex items-center gap-2">
            Valider <SparkleIcon size={20} className="text-current" />
          </span>
        </motion.button>
      )}

      {completed && (
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-center gap-3">
            {JSON.stringify(slots) === JSON.stringify(exercise.correctAnswer) ? (
              <>
                <CelebrationIcon size={32} className="text-green-500" />
                <p className="text-child-xl font-bold">Parfait !</p>
              </>
            ) : (
              <>
                <MuscleIcon size={32} className="text-orange-500" />
                <p className="text-child-xl font-bold">Continue !</p>
              </>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

