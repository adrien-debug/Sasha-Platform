// Génération d'exercices de jeux pour les séances

import { GameExercise } from '@/types';

// Exercices de lettres (niveau débutant)
export function generateLetterExercises(count: number): GameExercise[] {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'M', 'P', 'S', 'T'];
  const exercises: GameExercise[] = [];

  for (let i = 0; i < count; i++) {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    
    // Jeu "Entoure la bonne réponse"
    exercises.push({
      id: `letter-circle-${i}`,
      type: 'circle',
      category: 'letters',
      difficulty: 1,
      question: `Entoure la lettre ${letter}`,
      data: {
        options: [
          ...letters.filter(l => l !== letter).slice(0, 3),
          letter,
        ].sort(() => Math.random() - 0.5),
      },
      correctAnswer: letter,
    });

    // Jeu "Clique le bon"
    exercises.push({
      id: `letter-click-${i}`,
      type: 'click',
      category: 'letters',
      difficulty: 1,
      question: `Clique sur tous les monstres avec la lettre ${letter}`,
      data: {
        monsters: Array.from({ length: 8 }, (_, idx) => ({
          id: `monster-${idx}`,
          letter: idx % 4 === 0 ? letter : letters[Math.floor(Math.random() * letters.length)],
        })),
      },
      correctAnswer: Array.from({ length: 8 }, (_, idx) => idx % 4 === 0),
    });
  }

  return exercises;
}

// Exercices de chiffres (niveau débutant)
export function generateNumberExercises(count: number): GameExercise[] {
  const numbers = Array.from({ length: 11 }, (_, i) => i); // 0-10
  const exercises: GameExercise[] = [];

  for (let i = 0; i < count; i++) {
    const number = numbers[Math.floor(Math.random() * numbers.length)];
    
    exercises.push({
      id: `number-circle-${i}`,
      type: 'circle',
      category: 'numbers',
      difficulty: 1,
      question: `Entoure le chiffre ${number}`,
      data: {
        options: [
          ...numbers.filter(n => n !== number).slice(0, 3),
          number,
        ].sort(() => Math.random() - 0.5),
      },
      correctAnswer: number,
    });
  }

  return exercises;
}

// Exercices de syllabes
export function generateSyllableExercises(count: number): GameExercise[] {
  const syllables = ['ma', 'me', 'mi', 'mo', 'mu', 'ba', 'be', 'bi', 'bo', 'bu', 'sa', 'se', 'si', 'so', 'su'];
  const exercises: GameExercise[] = [];

  for (let i = 0; i < count; i++) {
    const syllable = syllables[Math.floor(Math.random() * syllables.length)];
    
    // Jeu "Relie les paires"
    const otherSyllables = syllables.filter(s => s !== syllable).slice(0, 3);
    exercises.push({
      id: `syllable-link-${i}`,
      type: 'link',
      category: 'syllables',
      difficulty: 2,
      question: `Relie la syllabe "${syllable}" à la même syllabe`,
      data: {
        left: [syllable, ...otherSyllables],
        right: [syllable, ...otherSyllables].sort(() => Math.random() - 0.5),
      },
      correctAnswer: { left: syllable, right: syllable },
    });

    // Jeu "Drag & Drop"
    exercises.push({
      id: `syllable-drag-${i}`,
      type: 'dragdrop',
      category: 'syllables',
      difficulty: 2,
      question: `Assemble le mot avec les syllabes`,
      data: {
        target: syllable + syllable, // ex: "mama"
        pieces: [syllable, syllable, ...syllables.filter(s => s !== syllable).slice(0, 2)],
      },
      correctAnswer: [syllable, syllable],
    });
  }

  return exercises;
}

// Exercices de mots simples
export function generateWordExercises(count: number): GameExercise[] {
  const words = ['papa', 'maman', 'sac', 'rat', 'chat', 'lune', 'soleil', 'maison'];
  const exercises: GameExercise[] = [];

  for (let i = 0; i < count; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    
    // Jeu "Chemin à suivre"
    const wordLetters = word.split('').map((l, idx) => ({ id: idx, letter: l.toUpperCase() }));
    // Mélanger les lettres pour le jeu
    const shuffledLetters = [...wordLetters].sort(() => Math.random() - 0.5);
    exercises.push({
      id: `word-path-${i}`,
      type: 'path',
      category: 'words',
      difficulty: 3,
      question: `Clique dans l'ordre les lettres pour écrire "${word.toUpperCase()}"`,
      data: {
        word: word.toUpperCase(),
        letters: shuffledLetters,
      },
      correctAnswer: wordLetters.map(l => shuffledLetters.findIndex(sl => sl.id === l.id)),
    });
  }

  return exercises;
}

// Générer une séance quotidienne complète
export function generateDailySession(): GameExercise[] {
  const exercises: GameExercise[] = [];
  
  // Échauffement (5 min) - 2 exercices rapides
  exercises.push(...generateLetterExercises(1));
  exercises.push(...generateNumberExercises(1));
  
  // Atelier Lettres & Sons (10 min) - 3 exercices
  exercises.push(...generateLetterExercises(2));
  exercises.push(...generateNumberExercises(1));
  
  // Atelier Syllabes & Mots (10 min) - 3 exercices
  exercises.push(...generateSyllableExercises(2));
  exercises.push(...generateWordExercises(1));
  
  // Mini-évaluation (5 min) - 2 exercices
  exercises.push(...generateLetterExercises(1));
  exercises.push(...generateNumberExercises(1));
  
  return exercises;
}

