'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Choice {
  text: string;
  effects?: any;
  requireMoney?: number;
  [key: string]: any;
}

interface EventPopupProps {
  event: {
    id: string;
    text: string;
    choices: Choice[];
    category?: string;
  } | null;
  money: number;
  onChoice: (choice: Choice) => void;
  onDismiss: () => void;
  isVisible: boolean;
}

const eventImages = {
  career: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
  relationship: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
  health: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
  education: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
  finance: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
  default: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800'
};

export default function EventPopup({ event, money, onChoice, onDismiss, isVisible }: EventPopupProps) {
  if (!event || !isVisible) return null;

  const canAfford = (choice: Choice) => {
    if (choice.requireMoney) {
      return money >= choice.requireMoney;
    }
    return true;
  };

  const eventImage = event.category && eventImages[event.category as keyof typeof eventImages]
    ? eventImages[event.category as keyof typeof eventImages]
    : eventImages.default;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 pointer-events-auto"
        onClick={onDismiss}
      >
        {/* Dreamy floating particles in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, Math.random() * window.innerHeight],
                x: [null, Math.random() * window.innerWidth],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-2xl mx-4 flex-col items-stretch justify-start rounded-xl bg-[#2c3e50] shadow-2xl overflow-hidden border border-primary/30 animate-glow max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex h-10 w-10 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 backdrop-blur-sm"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          {/* Event Image */}
          <div className="aspect-h-2 aspect-w-4 w-full h-32 sm:h-48">
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url("${eventImage}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c3e50] to-transparent"></div>
            </div>
          </div>

          <div className="flex w-full grow flex-col items-stretch justify-center gap-4 sm:gap-6 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {/* Modal Header & Description */}
            <div className="flex flex-col gap-2">
              {event.category && (
                <p className="text-xs sm:text-sm font-medium text-primary capitalize">{event.category} Event</p>
              )}
              <p className="text-xl sm:text-2xl font-bold leading-tight tracking-tighter text-white">Life Event</p>
              <p className="text-sm sm:text-base font-normal leading-relaxed text-white/80">
                {event.text}
              </p>
            </div>

            {/* Button Group */}
            <div className="flex flex-col items-stretch gap-3">
              {event.choices.map((choice, index) => {
                const affordable = canAfford(choice);
                const isPrimary = index === 0;

                return (
                  <motion.button
                    key={index}
                    onClick={() => {
                      console.log('Choice clicked:', choice.text);
                      if (affordable) {
                        onChoice(choice);
                      }
                    }}
                    disabled={!affordable}
                    className={`group flex min-w-[84px] cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-full h-12 sm:h-12 px-4 sm:px-5 text-sm sm:text-base font-bold leading-normal tracking-wide transition-all relative z-10 ${
                      !affordable
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : isPrimary
                        ? 'bg-gradient-to-r from-primary to-emerald-400 text-background-dark hover:shadow-lg hover:shadow-primary/50'
                        : 'bg-primary/20 text-white hover:bg-primary/40 border border-primary/30'
                    }`}
                    whileHover={affordable ? { scale: 1.02, y: -2 } : {}}
                    whileTap={affordable ? { scale: 0.98 } : {}}
                  >
                    {/* Shimmer effect on hover */}
                    {affordable && isPrimary && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
                    )}
                    <span className="truncate relative z-10">{choice.text}</span>
                    {choice.requireMoney && (
                      <span className={`text-xs sm:text-sm relative z-10 flex-shrink-0 ${affordable ? '' : 'line-through'}`}>
                        ${choice.requireMoney.toLocaleString()}
                      </span>
                    )}
                  </motion.button>
                );
              })}

              <button
                onClick={() => {
                  console.log('Ignore clicked');
                  onDismiss();
                }}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-transparent text-white/60 transition-colors hover:bg-white/10 text-base font-medium leading-normal tracking-wide relative z-10"
              >
                <span className="truncate">Ignore this</span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
