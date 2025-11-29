'use client';

import { motion } from 'framer-motion';

interface Choice {
  text: string;
  effects?: any;
  requireMoney?: number;
  [key: string]: any;
}

interface EventCardProps {
  event: {
    id: string;
    text: string;
    choices: Choice[];
  };
  money: number;
  onChoice: (choice: Choice) => void;
}

export default function DreamLifeEventCard({ event, money, onChoice }: EventCardProps) {
  const canAfford = (choice: Choice) => {
    if (choice.requireMoney) {
      return money >= choice.requireMoney;
    }
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-xl p-8 max-w-2xl w-full"
    >
      {/* Event Text */}
      <div className="text-center mb-8">
        <p className="text-xl text-gray-800 leading-relaxed">
          {event.text}
        </p>
      </div>

      {/* Choices */}
      <div className="space-y-3">
        {event.choices.map((choice, index) => {
          const affordable = canAfford(choice);

          return (
            <motion.button
              key={index}
              onClick={() => affordable && onChoice(choice)}
              disabled={!affordable}
              className={`w-full text-left px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
                affordable
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={affordable ? { scale: 1.02, y: -2 } : {}}
              whileTap={affordable ? { scale: 0.98 } : {}}
            >
              <div className="flex justify-between items-center">
                <span>{choice.text}</span>
                {choice.requireMoney && (
                  <span className={`text-sm ml-2 ${affordable ? 'opacity-80' : ''}`}>
                    ${choice.requireMoney.toLocaleString()}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
