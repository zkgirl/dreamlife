'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export default function GuideWhisper() {
  const { guideWhisper } = useGameStore();

  return (
    <AnimatePresence>
      {guideWhisper && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-16 sm:bottom-20 left-0 right-0 z-40 px-3 sm:px-4 lg:px-6"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-dream-void/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 border-2 border-dream-whisper/50
                          shadow-2xl shadow-dream-whisper/20">
              <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                <div className="text-xl sm:text-2xl lg:text-3xl opacity-50 flex-shrink-0">✧</div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs uppercase tracking-wider text-dream-whisper/70 mb-1 sm:mb-2">
                    Dream Guide
                  </div>
                  <p className="text-dream-bloom italic text-sm sm:text-base lg:text-lg break-words">
                    "{guideWhisper}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
