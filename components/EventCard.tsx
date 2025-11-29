'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

interface Choice {
  text: string;
  effects: any;
  guideWhisper?: string;
  requireShards?: number;
  symbolUnlock?: string;
  jobUnlock?: string;
  relationshipAdd?: any;
  relationshipRemove?: string;
  assetUnlock?: string;
}

interface EventCardProps {
  event: {
    id: string;
    text: string;
    choices: Choice[];
  };
  onChoice: (choice: Choice) => void;
}

export default function EventCard({ event, onChoice }: EventCardProps) {
  const { stats } = useGameStore();

  const canAfford = (choice: Choice) => {
    if (choice.requireShards) {
      return (stats.shards || 0) >= choice.requireShards;
    }
    return true;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -40 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="dream-card max-w-2xl w-full"
      >
        {/* Event Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl leading-relaxed text-center mb-8 text-dream-bloom"
        >
          {event.text}
        </motion.p>

        {/* Choices */}
        <div className="flex flex-col gap-4">
          {event.choices.map((choice, index) => {
            const affordable = canAfford(choice);

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => affordable && onChoice(choice)}
                disabled={!affordable}
                className={`choice-btn text-left ${
                  !affordable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={affordable ? { scale: 1.02 } : {}}
                whileTap={affordable ? { scale: 0.98 } : {}}
              >
                <div className="flex justify-between items-center">
                  <span>{choice.text}</span>
                  {choice.requireShards && (
                    <span className="text-amber-400 text-sm ml-2">
                      {choice.requireShards} shards
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
