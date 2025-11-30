'use client';

import { motion } from 'framer-motion';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useEffect } from 'react';

interface EndingScreenProps {
  endingType: string;
  onRestart: () => void;
}

const endings: Record<string, { title: string; text: string; color: string }> = {
  lucid_awakening: {
    title: 'Lucid Awakening',
    text: 'You shatter the veil. The Guide smiles: "You were me all along." Fragments reform — you wake changed.',
    color: 'from-blue-500 to-purple-500',
  },
  eternal_embrace: {
    title: 'Eternal Embrace',
    text: 'The echoes pull you in. "Stay," they whisper. Your garden blooms forever.',
    color: 'from-purple-500 to-pink-500',
  },
  fractured_void: {
    title: 'Fractured Void',
    text: 'Cracks swallow all. The Guide fades: "Forgotten, like us." Silence.',
    color: 'from-red-500 to-gray-900',
  },
  loop_eternal: {
    title: 'Loop Eternal',
    text: 'Time folds. You relive... forever. Whose dream now?',
    color: 'from-indigo-500 to-cyan-500',
  },
  memory_thief: {
    title: 'Memory Thief',
    text: 'You steal the last fragment. Rich in shards, empty in echoes. The Guide weeps.',
    color: 'from-amber-500 to-red-500',
  },
};

export default function EndingScreen({ endingType, onRestart }: EndingScreenProps) {
  const { playAchievement, playButtonClick } = useSoundEffects();
  const ending = endings[endingType] || endings.lucid_awakening;

  // Play achievement sound when ending screen appears
  useEffect(() => {
    playAchievement();
  }, [playAchievement]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="text-center max-w-3xl w-full px-4"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r ${ending.color}
                     bg-clip-text text-transparent text-glow break-words`}
        >
          {ending.title}
        </motion.div>

        {/* Ending Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-relaxed text-dream-bloom mb-6 sm:mb-8 lg:mb-12 italic px-2 break-words"
        >
          {ending.text}
        </motion.p>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-12"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 1.5 + i * 0.1, duration: 0.5 }}
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-dream-bloom/50 animate-pulse-glow"
            />
          ))}
        </motion.div>

        {/* Restart Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          onClick={() => {
            playButtonClick();
            onRestart();
          }}
          className="choice-btn w-full sm:w-auto px-6 sm:px-10 lg:px-12 py-3 sm:py-3.5 lg:py-4 text-base sm:text-lg lg:text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dream Again
        </motion.button>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-4 sm:mt-6 lg:mt-8 text-dream-whisper/70 text-xs sm:text-sm px-2"
        >
          Every dream is different. Every ending reveals a truth.
        </motion.p>
      </motion.div>
    </div>
  );
}
