import { useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';

export interface EmotionalTheme {
  mood: 'sad' | 'neutral' | 'happy';
  backgroundColor: string;
  sidebarColor: string;
  primaryColor: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  particleColor: string;
  shadowColor: string;
  textGlow: string;
}

export function useEmotionalTheme(): EmotionalTheme {
  const { stats } = useGameStore();

  return useMemo(() => {
    const happiness = stats.happiness;

    // Sad mood (0-33 happiness)
    if (happiness < 33) {
      return {
        mood: 'sad',
        backgroundColor: '#1a1a2e', // Dark blue-black
        sidebarColor: '#16213e', // Deep navy
        primaryColor: '#4a5568', // Muted gray-blue
        accentColor: '#5a7a9f', // Desaturated blue
        gradientFrom: '#2d3748', // Dark slate
        gradientTo: '#1a202c', // Almost black
        particleColor: '#4a5568', // Gray-blue particles
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        textGlow: 'rgba(74, 85, 104, 0.3)',
      };
    }

    // Neutral mood (34-66 happiness)
    if (happiness < 67) {
      return {
        mood: 'neutral',
        backgroundColor: '#1e293b', // Balanced slate
        sidebarColor: '#2c3e50', // Default slate blue
        primaryColor: '#3b82f6', // Standard blue
        accentColor: '#10b981', // Balanced green
        gradientFrom: '#34495e', // Slate
        gradientTo: '#2c3e50', // Darker slate
        particleColor: '#60a5fa', // Soft blue particles
        shadowColor: 'rgba(59, 130, 246, 0.3)',
        textGlow: 'rgba(59, 130, 246, 0.4)',
      };
    }

    // Happy mood (67-100 happiness)
    return {
      mood: 'happy',
      backgroundColor: '#1e3a5f', // Warm deep blue
      sidebarColor: '#2a5a7f', // Vibrant blue
      primaryColor: '#10b981', // Bright emerald
      accentColor: '#fbbf24', // Golden yellow
      gradientFrom: '#10b981', // Emerald
      gradientTo: '#3b82f6', // Bright blue
      particleColor: '#fbbf24', // Golden particles
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      textGlow: 'rgba(251, 191, 36, 0.5)',
    };
  }, [stats.happiness]);
}
