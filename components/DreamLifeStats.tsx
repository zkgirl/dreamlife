'use client';

import { motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';

export default function DreamLifeStats() {
  const { character, stats, job, education } = useGameStore();

  if (!character) return null;

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'happiness': return 'sentiment_very_satisfied';
      case 'health': return 'health_and_safety';
      case 'smarts': return 'psychology';
      case 'looks': return 'face_retouching_natural';
      case 'money': return 'payments';
      case 'fame': return 'star';
      default: return 'analytics';
    }
  };

  const getStatColor = (stat: string) => {
    switch (stat) {
      case 'happiness': return 'text-green-400';
      case 'health': return 'text-red-400';
      case 'smarts': return 'text-blue-400';
      case 'looks': return 'text-pink-400';
      case 'money': return 'text-yellow-400';
      case 'fame': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const getStatBarColor = (stat: string) => {
    switch (stat) {
      case 'happiness': return 'bg-green-400';
      case 'health': return 'bg-red-400';
      case 'smarts': return 'bg-blue-400';
      case 'looks': return 'bg-pink-400';
      case 'money': return 'bg-yellow-400';
      case 'fame': return 'bg-purple-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatDescription = (stat: string, value: number) => {
    if (stat === 'happiness') {
      if (value >= 80) return 'Feeling joyful';
      if (value >= 60) return 'Content';
      if (value >= 40) return 'Okay';
      return 'Unhappy';
    }
    if (stat === 'health') {
      if (value >= 80) return 'In peak condition';
      if (value >= 60) return 'Healthy';
      if (value >= 40) return 'Feeling weak';
      return 'Unwell';
    }
    if (stat === 'smarts') {
      if (value >= 80) return 'Feeling sharp';
      if (value >= 60) return 'Bright';
      if (value >= 40) return 'Average';
      return 'Struggling';
    }
    if (stat === 'looks') {
      if (value >= 80) return 'Looking great';
      if (value >= 60) return 'Looking good';
      if (value >= 40) return 'Average';
      return 'Need improvement';
    }
    return '';
  };

  return (
    <div className="flex flex-col gap-10 mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">{character.name}</h2>
            <p className="text-[#92c9ad] text-lg">Age: {stats.age} • {character.gender}</p>
            {job && <p className="text-[#92c9ad] text-sm">{job.title}</p>}
            {education && education.level !== 'none' && (
              <p className="text-[#92c9ad] text-sm capitalize">{education.level} {education.major && `- ${education.major}`}</p>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Happiness */}
        <motion.div
          className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${getStatColor('happiness')}`}>{getStatIcon('happiness')}</span>
              <p className="text-white text-base font-medium leading-normal">Happiness</p>
            </div>
            <motion.p
              key={stats.happiness}
              className="text-white text-sm font-normal leading-normal"
              initial={{ scale: 1.2, color: '#10b981' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(stats.happiness)}%
            </motion.p>
          </div>
          <div className="rounded-full bg-white/10">
            <motion.div
              className={`h-2 rounded-full ${getStatBarColor('happiness')}`}
              initial={{ width: 0 }}
              animate={{ width: `${stats.happiness}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/70 text-sm font-normal leading-normal">{getStatDescription('happiness', stats.happiness)}</p>
        </motion.div>

        {/* Health */}
        <motion.div
          className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${getStatColor('health')}`}>{getStatIcon('health')}</span>
              <p className="text-white text-base font-medium leading-normal">Health</p>
            </div>
            <motion.p
              key={stats.health}
              className="text-white text-sm font-normal leading-normal"
              initial={{ scale: 1.2, color: '#10b981' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(stats.health)}%
            </motion.p>
          </div>
          <div className="rounded-full bg-white/10">
            <motion.div
              className={`h-2 rounded-full ${getStatBarColor('health')}`}
              initial={{ width: 0 }}
              animate={{ width: `${stats.health}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/70 text-sm font-normal leading-normal">{getStatDescription('health', stats.health)}</p>
        </motion.div>

        {/* Smarts */}
        <motion.div
          className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${getStatColor('smarts')}`}>{getStatIcon('smarts')}</span>
              <p className="text-white text-base font-medium leading-normal">Smarts</p>
            </div>
            <motion.p
              key={stats.smarts}
              className="text-white text-sm font-normal leading-normal"
              initial={{ scale: 1.2, color: '#10b981' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(stats.smarts)}%
            </motion.p>
          </div>
          <div className="rounded-full bg-white/10">
            <motion.div
              className={`h-2 rounded-full ${getStatBarColor('smarts')}`}
              initial={{ width: 0 }}
              animate={{ width: `${stats.smarts}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/70 text-sm font-normal leading-normal">{getStatDescription('smarts', stats.smarts)}</p>
        </motion.div>

        {/* Looks */}
        <motion.div
          className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${getStatColor('looks')}`}>{getStatIcon('looks')}</span>
              <p className="text-white text-base font-medium leading-normal">Looks</p>
            </div>
            <motion.p
              key={stats.looks}
              className="text-white text-sm font-normal leading-normal"
              initial={{ scale: 1.2, color: '#10b981' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              {Math.round(stats.looks)}%
            </motion.p>
          </div>
          <div className="rounded-full bg-white/10">
            <motion.div
              className={`h-2 rounded-full ${getStatBarColor('looks')}`}
              initial={{ width: 0 }}
              animate={{ width: `${stats.looks}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/70 text-sm font-normal leading-normal">{getStatDescription('looks', stats.looks)}</p>
        </motion.div>

        {/* Money */}
        <motion.div
          className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined ${getStatColor('money')}`}>{getStatIcon('money')}</span>
              <p className="text-white text-base font-medium leading-normal">Money</p>
            </div>
            <motion.p
              key={stats.money}
              className="text-white text-sm font-normal leading-normal"
              initial={{ scale: 1.2, color: '#10b981' }}
              animate={{ scale: 1, color: '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              ${stats.money.toLocaleString()}
            </motion.p>
          </div>
          <div className="rounded-full bg-white/10">
            <motion.div
              className={`h-2 rounded-full ${getStatBarColor('money')}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((stats.money / 100000) * 100, 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-white/70 text-sm font-normal leading-normal">
            {stats.money >= 1000000 ? 'Wealthy' : stats.money >= 100000 ? 'Financially stable' : stats.money >= 10000 ? 'Getting by' : 'Struggling'}
          </p>
        </motion.div>

        {/* Fame (if exists) */}
        {stats.fame !== undefined && (
          <motion.div
            className="flex flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-4 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <span className={`material-symbols-outlined ${getStatColor('fame')}`}>{getStatIcon('fame')}</span>
                <p className="text-white text-base font-medium leading-normal">Fame</p>
              </div>
              <motion.p
                key={stats.fame}
                className="text-white text-sm font-normal leading-normal"
                initial={{ scale: 1.2, color: '#10b981' }}
                animate={{ scale: 1, color: '#ffffff' }}
                transition={{ duration: 0.3 }}
              >
                {Math.round(stats.fame)}%
              </motion.p>
            </div>
            <div className="rounded-full bg-white/10">
              <motion.div
                className={`h-2 rounded-full ${getStatBarColor('fame')}`}
                initial={{ width: 0 }}
                animate={{ width: `${stats.fame}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-white/70 text-sm font-normal leading-normal">
              {stats.fame >= 80 ? 'World-famous' : stats.fame >= 60 ? 'Famous' : stats.fame >= 40 ? 'Well-known' : 'Slightly well-known'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
