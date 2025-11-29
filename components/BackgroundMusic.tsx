'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { soundManager } from '@/utils/soundManager';

export default function BackgroundMusic() {
  const { stats } = useGameStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState<'sad' | 'neutral' | 'happy'>('neutral');

  // Determine mood based on happiness
  useEffect(() => {
    const happiness = stats.happiness;
    if (happiness < 33) {
      setCurrentMood('sad');
    } else if (happiness < 67) {
      setCurrentMood('neutral');
    } else {
      setCurrentMood('happy');
    }
  }, [stats.happiness]);

  // Initialize audio
  useEffect(() => {
    if (typeof window === 'undefined') return;

    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = soundManager.getMusicVolume() * 0.25; // Reduced volume

    // Auto-play on user interaction
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().catch(() => {
          // Auto-play blocked, user needs to interact first
        });
        setIsPlaying(true);
      }
      // Remove listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update volume when settings change
  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        audioRef.current.volume = soundManager.getMusicVolume() * 0.25; // Reduced volume
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Play background music based on mood
  useEffect(() => {
    if (!audioRef.current || !isPlaying) return;

    // Map moods to music files
    const musicFiles = {
      sad: '/sounds/bgmusic/sad-dramatic-piano-sad-alone-drama-262415.mp3',
      neutral: '/sounds/bgmusic/neutral-chill-out-lounge-full-366196.mp3',
      happy: '/sounds/bgmusic/happy-background-music-442792.mp3',
    };

    // Update the audio source and play
    const currentSrc = musicFiles[currentMood];
    if (audioRef.current.src !== currentSrc) {
      audioRef.current.src = currentSrc;
      audioRef.current.volume = soundManager.getMusicVolume() * 0.25; // Reduced volume
      audioRef.current.play().catch((error) => {
        console.warn('Failed to play background music:', error);
      });
    }
  }, [currentMood, isPlaying]);

  return null; // No UI, just background functionality
}
