'use client';

import { Monster } from '@/types';
import { motion } from 'framer-motion';
import { LightningIcon, FireIcon, WaterIcon, MonsterIcon } from './Icons';

interface MonsterAvatarProps {
  monster: Monster;
  size?: 'small' | 'medium' | 'large';
  showXP?: boolean;
}

const sizeClasses = {
  small: 'w-20 h-20 text-3xl',
  medium: 'w-32 h-32 text-5xl',
  large: 'w-48 h-48 text-8xl',
};

const monsterIcons: Record<string, React.ComponentType<{ className?: string; size?: number }>[]> = {
  'luminis': [LightningIcon, LightningIcon, LightningIcon],
  'flamix': [FireIcon, FireIcon, FireIcon],
  'aquatos': [WaterIcon, WaterIcon, WaterIcon],
};

const monsterColors: Record<string, { bg: string; border: string; glow: string }> = {
  'luminis': {
    bg: 'from-yellow-300 via-yellow-400 to-orange-400',
    border: 'border-yellow-500',
    glow: 'shadow-yellow-500/50',
  },
  'flamix': {
    bg: 'from-red-300 via-orange-400 to-red-500',
    border: 'border-red-500',
    glow: 'shadow-red-500/50',
  },
  'aquatos': {
    bg: 'from-blue-300 via-cyan-400 to-blue-500',
    border: 'border-blue-500',
    glow: 'shadow-blue-500/50',
  },
};

export default function MonsterAvatar({ monster, size = 'medium', showXP = false }: MonsterAvatarProps) {
  const IconComponent = monsterIcons[monster.name.toLowerCase()]?.[monster.stage - 1] || MonsterIcon;
  const iconSize = size === 'large' ? 64 : size === 'medium' ? 48 : 32;
  const xpPercent = (monster.xp / monster.maxXP) * 100;
  const colors = monsterColors[monster.name.toLowerCase()] || {
    bg: 'from-purple-300 via-pink-400 to-purple-500',
    border: 'border-purple-500',
    glow: 'shadow-purple-500/50',
  };

  return (
    <motion.div
      className="flex flex-col items-center relative"
      whileHover={{ scale: 1.15, y: -10 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {/* Effet de brillance */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            `0 0 20px ${colors.glow.replace('shadow-', '').replace('/50', '')}`,
            `0 0 40px ${colors.glow.replace('shadow-', '').replace('/50', '')}`,
            `0 0 20px ${colors.glow.replace('shadow-', '').replace('/50', '')}`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Carte Pokémon style */}
      <div className={`${sizeClasses[size]} relative rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center border-4 ${colors.border} shadow-2xl ${colors.glow} pokemon-card`}>
        {/* Effet de particules */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="relative z-10 drop-shadow-lg"
        >
          <IconComponent size={iconSize} className="text-current" />
        </motion.div>
        
        {/* Badge de niveau */}
        <div className={`absolute -top-2 -right-2 ${size === 'large' ? 'w-12 h-12' : size === 'medium' ? 'w-10 h-10' : 'w-8 h-8'} bg-red-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg`}>
          <span className={`${size === 'large' ? 'text-lg' : size === 'medium' ? 'text-sm' : 'text-xs'} font-black text-white`}>
            {monster.stage}
          </span>
        </div>
      </div>
      
      <motion.p
        className="text-child-lg font-black mt-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {monster.name.toUpperCase()}
      </motion.p>
      
      {showXP && (
        <div className="w-full max-w-xs mt-4">
          <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden border-2 border-gray-700 shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 relative"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-white drop-shadow-lg">
                {monster.xp} / {monster.maxXP} XP
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

