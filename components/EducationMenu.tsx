'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { universityMajors, graduateMajors, getMajorById, type EducationMajor } from '@/data/educationCareers';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface EducationMenuProps {
  onClose: () => void;
  level: 'university' | 'graduate';
}

export default function EducationMenu({ onClose, level }: EducationMenuProps) {
  const { stats, education, setEducation, updateStats, addHistory } = useGameStore();
  const { playButtonClick, playMenuClose, playGraduation } = useSoundEffects();
  const [selectedMajor, setSelectedMajor] = useState<EducationMajor | null>(null);

  const availableMajors = level === 'university' ? universityMajors : graduateMajors;

  const canSelectMajor = (major: EducationMajor) => {
    return stats.smarts >= major.requiredSmarts;
  };

  const handleSelectMajor = (major: EducationMajor) => {
    playButtonClick();
    setSelectedMajor(major);
  };

  const handleConfirm = () => {
    if (!selectedMajor) {
      alert('Please select a major first!');
      return;
    }

    if (!canSelectMajor(selectedMajor)) {
      alert(`You need at least ${selectedMajor.requiredSmarts} smarts to study ${selectedMajor.name}!`);
      return;
    }

    // Set education with major
    setEducation({
      level: level,
      major: selectedMajor.id,
      graduated: false,
    });

    playGraduation();
    addHistory('milestone', `Started studying ${selectedMajor.name} at ${level === 'university' ? 'University' : 'Graduate School'}`);

    alert(`🎓 Congratulations! You're now studying ${selectedMajor.name}!`);
    onClose();
  };

  const handleClose = () => {
    playMenuClose();
    onClose();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Very Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

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
          className="bg-[#2c3e50] border border-primary/30 rounded-xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-glow"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 bg-gradient-to-r from-[#34495e] to-[#2c3e50]">
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold">
                🎓 {level === 'university' ? 'Choose Your University Major' : 'Choose Your Graduate Program'}
              </h1>
              <p className="text-[#92c9ad] text-xs sm:text-sm mt-1">
                Your major will determine which careers you can pursue
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          {/* Stats Display */}
          <div className="px-4 sm:px-6 py-4 bg-[#34495e]/50 border-b border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-400 text-xl sm:text-2xl">psychology</span>
                <span className="text-white font-semibold text-sm sm:text-base">Your Smarts: {stats.smarts}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-yellow-400 text-xl sm:text-2xl">school</span>
                <span className="text-white font-semibold text-sm sm:text-base">Current Age: {stats.age}</span>
              </div>
            </div>
          </div>

          {/* Majors Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {selectedMajor && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg"
              >
                <p className="text-white text-center">
                  <span className="text-[#92c9ad] font-bold">Selected:</span> {selectedMajor.icon} {selectedMajor.name}
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableMajors.map((major) => {
                const meetsRequirements = canSelectMajor(major);
                const isSelected = selectedMajor?.id === major.id;

                return (
                  <motion.div
                    key={major.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={meetsRequirements ? { scale: 1.02, y: -5 } : {}}
                    onClick={() => meetsRequirements && handleSelectMajor(major)}
                    className={`bg-[#34495e] rounded-xl p-6 border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-primary shadow-lg shadow-primary/30'
                        : meetsRequirements
                        ? 'border-white/10 hover:border-primary/30'
                        : 'border-red-500/30 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Icon and Title */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3">
                      <span className="text-3xl sm:text-4xl flex-shrink-0">{major.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base sm:text-lg truncate">{major.name}</h3>
                        <p className={`text-xs sm:text-sm font-semibold ${getDifficultyColor(major.difficulty)}`}>
                          {major.difficulty}
                        </p>
                      </div>
                      {isSelected && (
                        <span className="material-symbols-outlined text-primary text-2xl sm:text-3xl flex-shrink-0">
                          check_circle
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-xs sm:text-sm mb-4 break-words">{major.description}</p>

                    {/* Requirements */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Required Smarts:</span>
                        <span className={meetsRequirements ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                          {major.requiredSmarts}
                          {meetsRequirements ? ' ✓' : ' ✗'}
                        </span>
                      </div>
                    </div>

                    {/* Not Eligible Warning */}
                    {!meetsRequirements && (
                      <div className="mt-4 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <p className="text-red-400 text-xs text-center">
                          Not enough smarts (need {major.requiredSmarts - stats.smarts} more)
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-4 flex flex-col sm:flex-row gap-3">
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-gray-600 text-white rounded-lg font-bold hover:bg-gray-700 transition-all text-sm sm:text-base"
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleConfirm}
              disabled={!selectedMajor || !canSelectMajor(selectedMajor)}
              whileHover={selectedMajor && canSelectMajor(selectedMajor) ? { scale: 1.02 } : {}}
              whileTap={selectedMajor && canSelectMajor(selectedMajor) ? { scale: 0.98 } : {}}
              className={`flex-1 py-3 rounded-lg font-bold transition-all text-sm sm:text-base ${
                selectedMajor && canSelectMajor(selectedMajor)
                  ? 'bg-gradient-to-r from-primary to-emerald-400 text-white hover:shadow-lg hover:shadow-primary/50'
                  : 'bg-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedMajor ? `Study ${selectedMajor.name}` : 'Select a Major'}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
