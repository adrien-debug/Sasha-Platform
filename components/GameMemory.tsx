'use client';

import { GameExercise } from '@/types';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionIcon, CelebrationIcon } from './Icons';

interface GameMemoryProps {
  exercise: GameExercise;
  onComplete: (correct: boolean) => void;
}

interface Card {
  id: number;
  content: string;
  type: 'letter' | 'image';
  flipped: boolean;
  matched: boolean;
}

export default function GameMemory({ exercise, onComplete }: GameMemoryProps) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  // Initialiser les cartes si nécessaire
  if (cards.length === 0) {
    const pairs = exercise.data.pairs || [
      { letter: 'A', image: '🍎' },
      { letter: 'B', image: '🐻' },
      { letter: 'C', image: '🐱' },
      { letter: 'D', image: '🐶' },
    ];
    
    const newCards: Card[] = [];
    pairs.forEach((pair: { letter: string; image: string }, idx: number) => {
      newCards.push(
        { id: idx * 2, content: pair.letter, type: 'letter', flipped: false, matched: false },
        { id: idx * 2 + 1, content: pair.image, type: 'image', flipped: false, matched: false }
      );
    });
    
    // Mélanger les cartes
    const shuffled = newCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }

  const handleCardClick = (cardId: number) => {
    if (completed || cards[cardId].flipped || cards[cardId].matched) return;
    if (flippedCards.length >= 2) return;

    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    const newCards = [...cards];
    newCards[cardId].flipped = true;
    setCards(newCards);

    if (newFlipped.length === 2) {
      // Vérifier si c'est une paire
      const [first, second] = newFlipped;
      const firstCard = cards[first];
      const secondCard = cards[second];

      // Logique simplifiée : vérifier si les types sont différents (lettre + image)
      const isPair = firstCard.type !== secondCard.type;

      setTimeout(() => {
        if (isPair) {
          // Paire trouvée
          const updatedCards = [...cards];
          updatedCards[first].matched = true;
          updatedCards[second].matched = true;
          setCards(updatedCards);

          // Vérifier si toutes les paires sont trouvées
          const allMatched = updatedCards.every(c => c.matched);
          if (allMatched) {
            setCompleted(true);
            setTimeout(() => {
              onComplete(true);
            }, 2000);
          }
        } else {
          // Pas une paire, retourner les cartes
          const updatedCards = [...cards];
          updatedCards[first].flipped = false;
          updatedCards[second].flipped = false;
          setCards(updatedCards);
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <h2 className="text-child-xl font-bold text-center mb-6 text-gray-800">
        {exercise.question || 'Retourne les cartes pour trouver les paires !'}
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, idx) => (
          <motion.button
            key={idx}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square rounded-2xl text-child-xl font-bold transition-all ${
              card.matched
                ? 'bg-green-300 opacity-50'
                : card.flipped
                ? 'bg-blue-200'
                : 'bg-gradient-to-br from-yellow-200 to-orange-300 hover:from-yellow-300 hover:to-orange-400'
            }`}
            whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
            whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
            disabled={card.matched || (flippedCards.length >= 2 && !card.flipped)}
          >
            {card.flipped || card.matched ? (
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                className="text-4xl"
              >
                {card.content}
              </motion.div>
            ) : (
              <QuestionIcon size={32} className="text-gray-600" />
            )}
          </motion.button>
        ))}
      </div>

      {completed && (
        <motion.div
          className="text-center mt-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center justify-center gap-3">
            <CelebrationIcon size={32} className="text-green-600" />
            <p className="text-child-xl font-bold text-green-600">
              Excellent ! Tu as trouvé toutes les paires !
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

