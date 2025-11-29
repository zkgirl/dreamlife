'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export default function HistoryPanel() {
  const { history, showHistory, toggleHistory } = useGameStore();

  if (!showHistory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={toggleHistory}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">📜 Life History</h2>
              <button
                onClick={toggleHistory}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-purple-100 mt-2">Your journey through life</p>
          </div>

          {/* History List */}
          <div className="overflow-y-auto max-h-[calc(80vh-140px)] p-6">
            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No history yet</p>
                <p className="text-sm mt-2">Start making choices to build your story!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {[...history].reverse().map((entry) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border-l-4 border-indigo-500 pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                            Age {entry.age}
                          </span>
                          <span className="text-xs text-gray-500">
                            {getTypeIcon(entry.type)} {entry.type}
                          </span>
                        </div>
                        <p className="text-gray-800">{entry.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function getTypeIcon(type: 'event' | 'activity' | 'milestone') {
  switch (type) {
    case 'event':
      return '🎭';
    case 'activity':
      return '⚡';
    case 'milestone':
      return '🏆';
    default:
      return '📝';
  }
}
