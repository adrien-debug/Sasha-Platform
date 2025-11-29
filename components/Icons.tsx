'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const LightningIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const FireIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2.5 2.5 5 4.5 5 7.5a6.5 6.5 0 1 1-13 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5-2.5z" fill="currentColor"/>
  </svg>
);

export const WaterIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="currentColor"/>
    <path d="M12 2.69v6.37m0 0v6.37m0-6.37L6.34 8.35m5.66 0L17.66 8.35" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
);

export const MonsterIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2"/>
    <circle cx="8" cy="9" r="2" fill="currentColor"/>
    <circle cx="16" cy="9" r="2" fill="currentColor"/>
    <path d="M8 15c0 2 1.5 4 4 4s4-2 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const StarIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
  </svg>
);

export const TrophyIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2m8-6h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2m-6 4h4a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 2v4M12 18v4" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const TargetIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

export const RocketIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4.5 16.5c0-1.5.5-4.5 2-6.5s4-4 5.5-4 4.5 1.5 5.5 4 2 5 2 6.5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 18l-3-3m3 3l3-3m-3 3v3" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const SettingsIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const CelebrationIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2v4M12 18v4M2 12h4m12 0h4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="3" fill="currentColor"/>
    <path d="M6.34 6.34l2.83 2.83m5.66 5.66l2.83 2.83M17.66 6.34l-2.83 2.83M6.34 17.66l2.83-2.83" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const MuscleIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 12c-1 0-2-1-2-2s1-2 2-2 2 1 2 2-1 2-2 2zM3 12c1 0 2-1 2-2S4 8 3 8s-2 1-2 2 1 2 2 2z" fill="currentColor"/>
    <path d="M12 3c0 1-1 2-2 2S8 4 8 3s1-2 2-2 2 1 2 2z" fill="currentColor"/>
  </svg>
);

export const CheckIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CrossIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const QuestionIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const SparkleIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <path d="M6.34 6.34l2.83 2.83m5.66 5.66l2.83 2.83M17.66 6.34l-2.83 2.83M6.34 17.66l2.83-2.83" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

export const SoundOnIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const SoundOffIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor"/>
    <path d="M23 9l-6 6m0-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ChildIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="4" fill="currentColor"/>
    <path d="M6 21c0-4 2.5-6 6-6s6 2 6 6" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const ParentsIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="7" r="3" fill="currentColor"/>
    <circle cx="15" cy="7" r="3" fill="currentColor"/>
    <path d="M6 20c0-2 1.5-3 3-3s3 1 3 3M12 20c0-2 1.5-3 3-3s3 1 3 3" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const WarningIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L2 22h20L12 2z" fill="currentColor" opacity="0.2"/>
    <path d="M12 9v6M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ClockIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const ArrowRightIcon = ({ className = '', size = 24 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

