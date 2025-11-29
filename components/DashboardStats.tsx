'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface StatCardProps {
  icon: string;
  label: string;
  value: number | string;
  color: string;
  description: string;
  isPercentage?: boolean;
}

function StatCard({ icon, label, value, color, description, isPercentage = true }: StatCardProps) {
  const percentage = isPercentage && typeof value === 'number' ? value : 100;

  const getGradientClass = (colorClass: string) => {
    const gradients: { [key: string]: string } = {
      'text-green-500': 'bg-gradient-to-r from-green-500 to-emerald-400',
      'text-red-500': 'bg-gradient-to-r from-red-500 to-pink-500',
      'text-blue-500': 'bg-gradient-to-r from-blue-500 to-cyan-400',
      'text-pink-500': 'bg-gradient-to-r from-pink-500 to-rose-400',
      'text-yellow-500': 'bg-gradient-to-r from-yellow-500 to-amber-400',
      'text-purple-500': 'bg-gradient-to-r from-purple-500 to-fuchsia-400',
    };
    return gradients[colorClass] || 'bg-gradient-to-r from-gray-500 to-gray-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(19, 236, 128, 0.2)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-[#34495e] rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Dreamy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.span
              className={`material-symbols-outlined text-2xl ${color}`}
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              {icon}
            </motion.span>
            <h3 className="text-white font-bold text-lg">{label}</h3>
          </div>
          <span className="text-white font-bold text-lg">
            {isPercentage && typeof value === 'number' ? `${Math.round(value)}%` : value}
          </span>
        </div>

        {/* Progress Bar with Gradient */}
        <div className="w-full bg-gray-700/50 rounded-full h-3 mb-2 overflow-hidden relative">
          <motion.div
            className={`h-3 rounded-full ${getGradientClass(color)} shadow-lg`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentage, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </motion.div>
        </div>

        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

interface DashboardStatsProps {
  onAgeUp: () => void;
  isTransitioning?: boolean;
  currentEvent?: any;
}

export default function DashboardStats({ onAgeUp, isTransitioning = false, currentEvent = null }: DashboardStatsProps) {
  const { stats, history, job } = useGameStore();
  const { playAgeUp } = useSoundEffects();

  const handleAgeUp = () => {
    playAgeUp();
    onAgeUp();
  };

  const getHappinessDescription = (value: number) => {
    if (value >= 80) return 'Feeling joyful';
    if (value >= 60) return 'Feeling good';
    if (value >= 40) return 'Feeling okay';
    if (value >= 20) return 'Feeling down';
    return 'Feeling miserable';
  };

  const getHealthDescription = (value: number) => {
    if (value >= 80) return 'In peak condition';
    if (value >= 60) return 'Feeling healthy';
    if (value >= 40) return 'Somewhat healthy';
    if (value >= 20) return 'Feeling unwell';
    return 'Very sick';
  };

  const getSmartsDescription = (value: number) => {
    if (value >= 80) return 'Feeling brilliant';
    if (value >= 60) return 'Feeling sharp';
    if (value >= 40) return 'Average intelligence';
    if (value >= 20) return 'Struggling mentally';
    return 'Very confused';
  };

  const getLooksDescription = (value: number) => {
    if (value >= 80) return 'Looking stunning';
    if (value >= 60) return 'Looking good';
    if (value >= 40) return 'Looking average';
    if (value >= 20) return 'Looking rough';
    return 'Looking terrible';
  };

  const getMoneyDescription = (value: number) => {
    if (value >= 1000000) return 'Extremely wealthy';
    if (value >= 100000) return 'Financially secure';
    if (value >= 10000) return 'Financially stable';
    if (value >= 1000) return 'Getting by';
    if (value >= 0) return 'Living paycheck to paycheck';
    return 'In debt';
  };

  const getFameDescription = (value: number) => {
    if (value >= 80) return 'World famous';
    if (value >= 60) return 'Very well-known';
    if (value >= 40) return 'Moderately famous';
    if (value >= 20) return 'Slightly well-known';
    return 'Unknown';
  };

  const lastYearEvents = history
    .filter(h => h.age === stats.age - 1)
    .slice(-4);

  return (
    <div className="p-8 bg-[#1a252f] min-h-screen relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5 animate-pulse-glow" />

      <div className="relative z-10">
        {/* Current Job Info */}
        {job && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#34495e] rounded-xl p-6 border border-white/10 hover:border-primary/30 mb-6 transition-all duration-300 animate-glow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#92c9ad] text-sm mb-1">Current Career</p>
                <h2 className="text-white text-2xl font-bold">{job.title}</h2>
                <p className="text-white/60 text-sm mt-1">Years Worked: {job.yearsWorked}</p>
              </div>
              <div className="text-right">
                <p className="text-[#92c9ad] text-sm mb-1">Annual Salary</p>
                <p className="text-white text-2xl font-bold">${job.salary.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        )}

      {/* Core Stats */}
      <h1 className="text-white text-4xl font-bold mb-6">Core Stats</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard
          icon="sentiment_satisfied"
          label="Happiness"
          value={stats.happiness}
          color="text-green-500"
          description={getHappinessDescription(stats.happiness)}
        />
        <StatCard
          icon="favorite"
          label="Health"
          value={stats.health}
          color="text-red-500"
          description={getHealthDescription(stats.health)}
        />
        <StatCard
          icon="psychology"
          label="Smarts"
          value={stats.smarts}
          color="text-blue-500"
          description={getSmartsDescription(stats.smarts)}
        />
        <StatCard
          icon="face"
          label="Looks"
          value={stats.looks}
          color="text-pink-500"
          description={getLooksDescription(stats.looks)}
        />
        <StatCard
          icon="account_balance_wallet"
          label="Money"
          value={`$${stats.money.toLocaleString()}`}
          color="text-yellow-500"
          description={getMoneyDescription(stats.money)}
          isPercentage={false}
        />
        <StatCard
          icon="star"
          label="Fame"
          value={stats.fame || 0}
          color="text-purple-500"
          description={getFameDescription(stats.fame || 0)}
        />
      </div>

      {/* Last Year's Events */}
      {lastYearEvents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-white text-3xl font-bold mb-6">Last Year's Events</h2>
          <div className="bg-[#34495e] rounded-xl p-6 border border-white/10">
            <div className="space-y-4">
              {lastYearEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-white/90"
                >
                  <span className="material-symbols-outlined text-primary mt-0.5">
                    {event.type === 'milestone' ? 'north' : event.type === 'activity' ? 'sports_esports' : 'book'}
                  </span>
                  <p>{event.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Age Up Button */}
      <div className="flex justify-end">
        <motion.button
          onClick={handleAgeUp}
          disabled={isTransitioning || currentEvent !== null}
          className={`flex items-center gap-2 font-bold py-4 px-8 rounded-full transition-all duration-300 relative overflow-hidden ${
            isTransitioning || currentEvent !== null
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#f39c12] to-[#e67e22] text-white hover:shadow-2xl hover:shadow-orange-500/50'
          }`}
          whileHover={!(isTransitioning || currentEvent !== null) ? { scale: 1.05 } : {}}
          whileTap={!(isTransitioning || currentEvent !== null) ? { scale: 0.95 } : {}}
        >
          {/* Glow effect */}
          {!(isTransitioning || currentEvent !== null) && (
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 animate-pulse-glow" />
          )}
          <span className="text-xl relative z-10">Age Up</span>
          <span className="material-symbols-outlined relative z-10">arrow_forward</span>
        </motion.button>
      </div>
      </div>
    </div>
  );
}
