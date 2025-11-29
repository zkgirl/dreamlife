'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { showStatChange } from './StatChangeNotification';
import { careerPaths, canApplyForCareer, getMajorById, type CareerPath } from '@/data/educationCareers';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface CareerMenuProps {
  onClose: () => void;
}

export default function CareerMenu({ onClose }: CareerMenuProps) {
  const { stats, education, job, setJob, addHistory, updateStats } = useGameStore();
  const { playJobOffer, playMenuClose, playButtonClick } = useSoundEffects();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(careerPaths.map(c => c.category)))];

  // Filter careers based on category
  const filteredCareers = selectedCategory === 'all'
    ? careerPaths
    : careerPaths.filter(c => c.category === selectedCategory);

  const canApply = (career: CareerPath) => {
    if (job) return false; // Already have a job
    if (stats.age < career.minAge) return false; // Too young
    return canApplyForCareer(career, education.level, education.major);
  };

  const getMissingRequirement = (career: CareerPath): string | null => {
    // Check age requirement
    if (stats.age < career.minAge) {
      return `Must be ${career.minAge}+ years old (${career.minAge - stats.age} more years)`;
    }

    // Check education level
    if (education.level === 'high' && career.requiredEducation !== 'high') {
      return `Requires ${career.requiredEducation === 'university' ? 'University' : 'Graduate'} degree`;
    }
    if (education.level === 'university' && career.requiredEducation === 'graduate') {
      return 'Requires Graduate degree';
    }
    if (education.level !== 'graduate' && career.requiredEducation === 'graduate') {
      return 'Requires Graduate degree';
    }

    // Check major requirement
    if (career.requiredMajor && !education.major) {
      return `Requires major in: ${career.requiredMajor.join(', ')}`;
    }
    if (career.requiredMajor && education.major && !career.requiredMajor.includes(education.major)) {
      const majorNames = career.requiredMajor.map(m => getMajorById(m)?.name || m);
      return `Requires major in: ${majorNames.join(' or ')}`;
    }

    return null;
  };

  const applyForJob = (career: CareerPath) => {
    if (!canApply(career)) {
      const requirement = getMissingRequirement(career);
      alert(requirement || 'You cannot apply for this job');
      return;
    }

    // Interview success based on smarts
    const interviewChance = Math.min(0.9, stats.smarts / 100);
    const success = Math.random() < interviewChance;

    if (success) {
      setJob({
        id: Date.now().toString(),
        title: career.title,
        salary: career.baseSalary,
        yearsWorked: 0,
        category: career.category,
      });
      playJobOffer();
      showStatChange('happiness', 20);
      updateStats({ happiness: 20 });
      addHistory('milestone', `Got hired as ${career.title}!`);
      alert(`🎉 Congratulations! You've been hired as a ${career.title}!\nStarting salary: $${career.baseSalary.toLocaleString()}/year`);
      onClose();
    } else {
      showStatChange('happiness', -10);
      updateStats({ happiness: -10 });
      addHistory('event', `Failed interview for ${career.title}`);
      alert(`❌ Unfortunately, you didn't get the ${career.title} position. Keep improving your skills!`);
    }
  };

  const handleClose = () => {
    playMenuClose();
    onClose();
  };

  const currentMajorName = education.major ? getMajorById(education.major)?.name : 'None';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#2c3e50] border border-primary/30 rounded-xl shadow-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-glow"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 bg-gradient-to-r from-[#34495e] to-[#2c3e50]">
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold">💼 Career Opportunities</h1>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 text-xs sm:text-sm">
                <span className="text-[#92c9ad]">
                  🎓 Education: {education.level === 'none' ? 'None' : education.level}
                </span>
                {education.major && (
                  <span className="text-[#92c9ad]">
                    📚 Major: {currentMajorName}
                  </span>
                )}
                {job && (
                  <span className="text-yellow-400">
                    💼 Current Job: {job.title}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Categories Sidebar */}
            <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-[#34495e]/50 overflow-x-auto lg:overflow-y-auto">
              <h2 className="text-white font-bold mb-4 text-base sm:text-lg">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => {
                  const count = category === 'all'
                    ? careerPaths.length
                    : careerPaths.filter(c => c.category === category).length;

                  return (
                    <motion.button
                      key={category}
                      onClick={() => {
                        playButtonClick();
                        setSelectedCategory(category);
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {selectedCategory === category && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      )}
                      <span className="text-sm font-medium relative z-10 capitalize">{category}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full relative z-10 ${
                        selectedCategory === category
                          ? 'bg-white/20'
                          : 'bg-primary/20 text-primary'
                      }`}>
                        {count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Jobs Grid */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {job && (
                <div className="mb-6 p-3 sm:p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-center font-semibold text-sm sm:text-base">
                    ⚠️ You already have a job as {job.title}. Quit your current job before applying for a new one.
                  </p>
                </div>
              )}

              <h2 className="text-white text-xl sm:text-2xl font-bold mb-4 capitalize">
                {selectedCategory === 'all' ? 'All Careers' : `${selectedCategory} Careers`}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCareers.map((career, index) => {
                  const eligible = canApply(career);
                  const requirement = getMissingRequirement(career);

                  return (
                    <motion.div
                      key={`${career.title}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={eligible ? { scale: 1.02, y: -5 } : {}}
                      className={`bg-[#34495e] rounded-xl p-4 sm:p-5 border transition-all ${
                        eligible
                          ? 'border-white/10 hover:border-primary/30'
                          : 'border-red-500/20 opacity-70'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-2 sm:gap-3 mb-3">
                        <span className="text-2xl sm:text-3xl flex-shrink-0">{career.icon}</span>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold text-base sm:text-lg truncate">{career.title}</h3>
                          <p className="text-[#92c9ad] text-xs sm:text-sm capitalize">{career.category}</p>
                        </div>
                      </div>

                      {/* Salary Range */}
                      <div className="mb-4 p-2 sm:p-3 bg-white/5 rounded-lg">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/60">Starting:</span>
                          <span className="text-green-400 font-bold">${career.baseSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Max:</span>
                          <span className="text-emerald-400 font-bold">${career.maxSalary.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-2 mb-4">
                        <div className="text-sm">
                          <span className="text-white/60">Min Age: </span>
                          <span className={`font-semibold ${stats.age >= career.minAge ? 'text-green-400' : 'text-red-400'}`}>
                            {career.minAge}+ {stats.age >= career.minAge ? '✓' : '✗'}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-white/60">Education: </span>
                          <span className="text-white font-semibold capitalize">{career.requiredEducation}</span>
                        </div>
                        {career.requiredMajor && (
                          <div className="text-sm">
                            <span className="text-white/60">Major: </span>
                            <span className="text-white font-semibold">
                              {career.requiredMajor.map(m => getMajorById(m)?.name || m).join(' or ')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Status Badge */}
                      {!eligible && requirement && (
                        <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <p className="text-red-400 text-xs text-center">{requirement}</p>
                        </div>
                      )}

                      {/* Apply Button */}
                      <motion.button
                        onClick={() => applyForJob(career)}
                        disabled={!eligible || !!job}
                        whileHover={eligible && !job ? { scale: 1.05 } : {}}
                        whileTap={eligible && !job ? { scale: 0.95 } : {}}
                        className={`w-full py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                          eligible && !job
                            ? 'bg-gradient-to-r from-primary to-emerald-400 text-white hover:shadow-lg'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {job ? 'Already Employed' : eligible ? '📝 Apply Now' : '🔒 Not Eligible'}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>

              {filteredCareers.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64">
                  <span className="text-6xl mb-4">💼</span>
                  <h2 className="text-white text-2xl font-bold mb-2">No Careers Available</h2>
                  <p className="text-white/60">Try selecting a different category</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
