'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { useEmotionalTheme } from '@/hooks/useEmotionalTheme';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface SidebarProps {
  currentPage?: 'dashboard' | 'activities' | 'career' | 'relationships' | 'assets';
}

export default function Sidebar({ currentPage = 'dashboard' }: SidebarProps) {
  const {
    character,
    stats,
    toggleActivitiesMenu,
    toggleCareerMenu,
    toggleRelationshipsMenu,
    toggleBusinessMenu,
    toggleShoppingMenu,
    toggleAssetsMenu,
    toggleSettingsMenu,
    toggleHistory
  } = useGameStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useEmotionalTheme();
  const { playButtonClick, playMenuOpen } = useSoundEffects();

  const handleNavClick = (itemId: string) => {
    playMenuOpen();
    setMobileMenuOpen(false); // Close mobile menu on selection
    switch (itemId) {
      case 'activities':
        toggleActivitiesMenu();
        break;
      case 'career':
        toggleCareerMenu();
        break;
      case 'relationships':
        toggleRelationshipsMenu();
        break;
      case 'business':
        toggleBusinessMenu();
        break;
      case 'shopping':
        toggleShoppingMenu();
        break;
      case 'assets':
        toggleAssetsMenu();
        break;
      default:
        // Dashboard - do nothing, already on dashboard
        playButtonClick();
        break;
    }
  };

  const navItems = [
    { id: 'dashboard', icon: 'grid_view', label: 'Dashboard' },
    { id: 'activities', icon: 'sports_esports', label: 'Activities' },
    { id: 'career', icon: 'work', label: 'Career' },
    { id: 'relationships', icon: 'favorite', label: 'Relationships' },
    { id: 'business', icon: 'business_center', label: 'Business' },
    { id: 'shopping', icon: 'shopping_bag', label: 'Shopping' },
    { id: 'assets', icon: 'home', label: 'Assets' },
  ];

  const SidebarContent = () => (
    <div className="relative z-10 flex flex-col h-full">
      {/* User Profile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary to-blue-500 bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30"
        >
          {character?.name?.charAt(0) || 'U'}
        </motion.div>
        <div>
          <h1 className="text-white text-lg font-bold">{character?.name || 'Player'}</h1>
          <p className="text-[#92c9ad] text-sm">Age: {stats.age}</p>
        </div>
      </motion.div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 mb-8 flex-1">
        {navItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleNavClick(item.id)}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-3 px-4 py-2.5 rounded transition-all duration-300 relative overflow-hidden group ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg shadow-primary/30'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {/* Shimmer effect for active item */}
            {currentPage === item.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
            <span className="material-symbols-outlined relative z-10">{item.icon}</span>
            <span className="text-sm font-medium relative z-10">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Settings (at bottom) */}
      <div className="border-t border-white/10 pt-4">
        <motion.button
          onClick={() => {
            playMenuOpen();
            setMobileMenuOpen(false);
            toggleSettingsMenu();
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="text-sm font-medium">Settings</span>
        </motion.button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger Button - Fixed top-left */}
      <motion.button
        onClick={() => {
          playButtonClick();
          setMobileMenuOpen(!mobileMenuOpen);
        }}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-to-br from-primary/90 to-emerald-400/90 backdrop-blur-sm p-3 rounded-full shadow-lg shadow-primary/30"
        whileTap={{ scale: 0.95 }}
      >
        <span className="material-symbols-outlined text-white">
          {mobileMenuOpen ? 'close' : 'menu'}
        </span>
      </motion.button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Sidebar */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] border-r border-primary/20 flex flex-col p-6 relative overflow-hidden transition-colors duration-1000 z-50 lg:hidden"
              style={{ backgroundColor: theme.sidebarColor }}
            >
              {/* Dreamy gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
                style={{
                  background: `linear-gradient(to bottom, ${theme.primaryColor}15, transparent, transparent)`,
                }}
              />
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex w-80 flex-shrink-0 border-r border-primary/20 flex-col p-6 relative overflow-hidden transition-colors duration-1000"
        style={{ backgroundColor: theme.sidebarColor }}
      >
        {/* Dreamy gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
          style={{
            background: `linear-gradient(to bottom, ${theme.primaryColor}15, transparent, transparent)`,
          }}
        />
        <SidebarContent />
      </aside>
    </>
  );
}
