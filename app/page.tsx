'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { initializeProfile } from '@/lib/storage';
import { motion } from 'framer-motion';
import { LightningIcon, StarIcon, ChildIcon, ParentsIcon, FireIcon, WaterIcon } from '@/components/Icons';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Initialiser le profil si nécessaire
    const profile = initializeProfile();
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Particules flottantes - rendu uniquement côté client */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => {
            const randomX = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920);
            const randomY = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080);
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                initial={{
                  x: randomX,
                  y: randomY,
                }}
                animate={{
                  y: [randomY, randomY + (Math.random() * 200 - 100)],
                  x: [randomX, randomX + (Math.random() * 200 - 100)],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            );
          })}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="inline-block mb-6"
        >
          <div className="mb-4">
            <LightningIcon size={120} className="text-yellow-400" />
          </div>
        </motion.div>
        <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl animate-pulse-glow">
          AVENTURE DE SACHA
        </h1>
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <StarIcon size={32} className="text-yellow-400" />
          </motion.div>
          <p className="text-child-xl font-bold text-white drop-shadow-lg">
            Prêt à devenir un Maître d&apos;Apprentissage ?
          </p>
          <motion.div
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <StarIcon size={32} className="text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col gap-8 w-full max-w-lg relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/sacha" className="btn-primary text-center block">
            <div className="flex items-center justify-center gap-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChildIcon size={48} className="text-current" />
              </motion.div>
              <span className="text-2xl">Je suis <strong>SACHA</strong></span>
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl"
              >
                →
              </motion.span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/parent" className="btn-secondary text-center block">
            <div className="flex items-center justify-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ParentsIcon size={48} className="text-current" />
              </motion.div>
              <span className="text-2xl">Je suis le <strong>PARENT</strong></span>
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl"
              >
                →
              </motion.span>
            </div>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <StarIcon size={32} className="text-yellow-400" />
          </motion.div>
          <p className="text-child-xl font-bold text-white drop-shadow-lg">
            Apprends les lettres, les chiffres, les syllabes et les mots !
          </p>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <StarIcon size={32} className="text-yellow-400" />
          </motion.div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <LightningIcon size={40} className="text-yellow-400" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <FireIcon size={40} className="text-red-500" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            <WaterIcon size={40} className="text-blue-500" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

