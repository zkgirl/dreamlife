'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { soundManager } from '@/utils/soundManager';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface SettingsMenuProps {
  onClose: () => void;
}

export default function SettingsMenu({ onClose }: SettingsMenuProps) {
  const { playMenuClose, playButtonClick } = useSoundEffects();
  const [soundEnabled, setSoundEnabled] = useState(soundManager.getEnabled());
  const [soundVolume, setSoundVolume] = useState(soundManager.getVolume() * 100);
  const [musicVolume, setMusicVolume] = useState(soundManager.getMusicVolume() * 100);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autosaveEnabled, setAutosaveEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');

  // Load settings from localStorage
  useEffect(() => {
    const notifications = localStorage.getItem('notificationsEnabled');
    const autosave = localStorage.getItem('autosaveEnabled');
    const diff = localStorage.getItem('difficulty');

    if (notifications !== null) setNotificationsEnabled(notifications === 'true');
    if (autosave !== null) setAutosaveEnabled(autosave === 'true');
    if (diff) setDifficulty(diff as any);
  }, []);

  const handleSoundToggle = () => {
    const newValue = !soundEnabled;
    setSoundEnabled(newValue);
    soundManager.setEnabled(newValue);
    if (newValue) playButtonClick();
  };

  const handleSoundVolumeChange = (value: number) => {
    setSoundVolume(value);
    soundManager.setVolume(value / 100);
  };

  const handleMusicVolumeChange = (value: number) => {
    setMusicVolume(value);
    soundManager.setMusicVolume(value / 100);
  };

  const handleClose = () => {
    playMenuClose();
    onClose();
  };

  const handleSaveSettings = () => {
    localStorage.setItem('notificationsEnabled', notificationsEnabled.toString());
    localStorage.setItem('autosaveEnabled', autosaveEnabled.toString());
    localStorage.setItem('difficulty', difficulty);
    playButtonClick();
    alert('✅ Settings saved successfully!');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#2c3e50] border border-primary/30 rounded-xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-glow"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 bg-gradient-to-r from-[#34495e] to-[#2c3e50]">
            <h1 className="text-white text-xl sm:text-2xl font-bold">⚙️ Settings</h1>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="space-y-6">
              {/* Audio Settings */}
              <div className="bg-[#34495e] rounded-xl p-4 sm:p-6 border border-white/10">
                <h2 className="text-white text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">volume_up</span>
                  Audio
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">Sound Effects</p>
                      <p className="text-gray-400 text-sm">Button clicks and notifications</p>
                    </div>
                    <motion.button
                      onClick={handleSoundToggle}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 sm:w-14 h-7 sm:h-8 rounded-full transition-all flex-shrink-0 ${
                        soundEnabled ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: soundEnabled ? 20 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full ml-1 mt-1"
                      />
                    </motion.button>
                  </div>

                  {soundEnabled && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white text-sm">Sound Volume</p>
                        <p className="text-primary font-bold">{Math.round(soundVolume)}%</p>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={soundVolume}
                        onChange={(e) => handleSoundVolumeChange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold">Background Music</p>
                        <p className="text-gray-400 text-sm">Ambient soundtrack based on mood</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white text-sm">Music Volume</p>
                      <p className="text-primary font-bold">{Math.round(musicVolume)}%</p>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={musicVolume}
                      onChange={(e) => handleMusicVolumeChange(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Game Settings */}
              <div className="bg-[#34495e] rounded-xl p-4 sm:p-6 border border-white/10">
                <h2 className="text-white text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">sports_esports</span>
                  Gameplay
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">Notifications</p>
                      <p className="text-gray-400 text-sm">Show stat change alerts</p>
                    </div>
                    <motion.button
                      onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 sm:w-14 h-7 sm:h-8 rounded-full transition-all flex-shrink-0 ${
                        notificationsEnabled ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: notificationsEnabled ? 20 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full ml-1 mt-1"
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">Auto-save</p>
                      <p className="text-gray-400 text-sm">Automatically save progress</p>
                    </div>
                    <motion.button
                      onClick={() => setAutosaveEnabled(!autosaveEnabled)}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 sm:w-14 h-7 sm:h-8 rounded-full transition-all flex-shrink-0 ${
                        autosaveEnabled ? 'bg-primary' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        animate={{ x: autosaveEnabled ? 20 : 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full ml-1 mt-1"
                      />
                    </motion.button>
                  </div>

                  <div>
                    <p className="text-white font-semibold mb-2">Difficulty</p>
                    <div className="flex gap-2">
                      {(['easy', 'normal', 'hard'] as const).map((level) => (
                        <motion.button
                          key={level}
                          onClick={() => setDifficulty(level)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                            difficulty === level
                              ? 'bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-[#34495e] rounded-xl p-4 sm:p-6 border border-white/10">
                <h2 className="text-white text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl sm:text-2xl">info</span>
                  About
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-white font-semibold">Version:</span> 1.0.0</p>
                  <p><span className="text-white font-semibold">Developer:</span> DreamLife Team</p>
                  <p className="text-sm text-gray-400 mt-4">
                    DreamLife is a life simulation game where you make choices that shape your character's journey from birth to death.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-4 flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-red-500/20 text-red-400 rounded-lg font-bold hover:bg-red-500/30 transition-all text-sm sm:text-base"
            >
              Reset Game
            </motion.button>
            <motion.button
              onClick={handleSaveSettings}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 bg-gradient-to-r from-primary to-emerald-400 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-primary/50 transition-all text-sm sm:text-base"
            >
              Save Settings
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
