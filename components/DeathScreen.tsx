'use client';

import { motion } from 'framer-motion';

interface DeathScreenProps {
  age: number;
  causeOfDeath: string;
  money: number;
  onRestart: () => void;
}

export default function DeathScreen({ age, causeOfDeath, money, onRestart }: DeathScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl p-8"
      >
        {/* Tombstone Effect */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-gray-700 rounded-t-full p-12 shadow-2xl mb-8"
        >
          <div className="text-6xl mb-4">🪦</div>
          <h1 className="text-5xl font-bold text-white mb-4">R.I.P.</h1>
          <div className="text-2xl text-gray-300 mb-2">You lived to age {age}</div>
          <div className="text-lg text-gray-400">{causeOfDeath}</div>
        </motion.div>

        {/* Final Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-xl p-6 mb-8"
        >
          <div className="text-white">
            <div className="text-sm text-gray-400 mb-2">Final Net Worth</div>
            <div className="text-4xl font-bold text-green-400">
              ${money.toLocaleString()}
            </div>
          </div>
        </motion.div>

        {/* Restart Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          onClick={onRestart}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-lg hover:from-pink-600 hover:to-rose-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start a New Life
        </motion.button>
      </motion.div>
    </div>
  );
}
