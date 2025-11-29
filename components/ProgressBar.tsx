'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  label?: string;
}

export default function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-child-lg font-black text-white drop-shadow-lg">{label}</span>
          <span className="text-child-lg font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {current} / {total}
          </span>
        </div>
      )}
      <div className="relative w-full h-8 bg-gray-900 rounded-full overflow-hidden shadow-2xl border-4 border-gray-700">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 relative"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Effet de brillance animé */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          {/* Particules */}
          {percent > 0 && (
            <div className="absolute inset-0">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: '50%',
                  }}
                  animate={{
                    y: ['-50%', '-150%'],
                    opacity: [1, 0],
                    scale: [1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
        {/* Texte au centre */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-black text-white drop-shadow-lg z-10">
            {Math.round(percent)}%
          </span>
        </div>
      </div>
    </div>
  );
}

