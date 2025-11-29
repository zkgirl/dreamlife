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
          className="fixed bottom-20 left-0 right-0 z-40 px-6"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-dream-void/90 backdrop-blur-xl rounded-2xl p-6 border-2 border-dream-whisper/50
                          shadow-2xl shadow-dream-whisper/20">
              <div className="flex items-start gap-4">
                <div className="text-3xl opacity-50">✧</div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-dream-whisper/70 mb-2">
                    Dream Guide
                  </div>
                  <p className="text-dream-bloom italic text-lg">
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
