'use client';

import { useState } from 'react';
import { SoundOnIcon, SoundOffIcon } from './Icons';

interface SoundButtonProps {
  text: string;
  className?: string;
}

export default function SoundButton({ text, className = '' }: SoundButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    if (typeof window === 'undefined') return;
    
    setIsPlaying(true);
    
    // Utiliser la Web Speech API pour prononcer le texte
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8; // Un peu plus lent pour un enfant
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      // Fallback : simuler avec un timeout
      setTimeout(() => setIsPlaying(false), 1000);
    }
  };

  return (
    <button
      onClick={playSound}
      disabled={isPlaying}
      className={`p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors ${className} ${
        isPlaying ? 'opacity-50' : ''
      }`}
      aria-label={`Écouter la prononciation de ${text}`}
    >
      {isPlaying ? <SoundOnIcon size={24} className="text-current" /> : <SoundOffIcon size={24} className="text-current" />}
    </button>
  );
}

