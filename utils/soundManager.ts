// Sound Manager for DreamLife
// Manages all game sound effects and background music

export type SoundType =
  // UI Sounds
  | 'button_click'
  | 'menu_open'
  | 'menu_close'
  | 'tab_switch'

  // Game Actions
  | 'age_up'
  | 'stat_increase'
  | 'stat_decrease'
  | 'level_up'

  // Money Sounds
  | 'money_gain'
  | 'money_loss'
  | 'purchase'
  | 'sell'

  // Relationship Sounds
  | 'relationship_increase'
  | 'relationship_decrease'
  | 'new_relationship'
  | 'breakup'
  | 'gift'
  | 'argument'

  // Events
  | 'event_popup'
  | 'event_positive'
  | 'event_negative'
  | 'event_neutral'

  // Career
  | 'job_offer'
  | 'promotion'
  | 'fired'
  | 'salary_increase'

  // Business
  | 'business_start'
  | 'business_success'
  | 'business_fail'
  | 'revenue'

  // Special
  | 'achievement'
  | 'death'
  | 'birth'
  | 'graduation';

// Sound file mappings
const soundUrls: Record<SoundType, string> = {
  // UI Sounds
  button_click: '/sounds/ui/click.mp3',
  menu_open: '/sounds/ui/menu-open.mp3',
  menu_close: '/sounds/ui/menu-close.mp3',
  tab_switch: '/sounds/ui/tab.mp3',

  // Game Actions
  age_up: '/sounds/game/age-up.mp3',
  stat_increase: '/sounds/game/stat-up.mp3',
  stat_decrease: '/sounds/game/stat-down.mp3',
  level_up: '/sounds/game/level-up.mp3',

  // Money Sounds
  money_gain: '/sounds/money/money-gain.mp3',
  money_loss: '/sounds/money/money-loss.mp3',
  purchase: '/sounds/money/purchase.mp3',
  sell: '/sounds/money/sell.mp3',

  // Relationship Sounds
  relationship_increase: '/sounds/relationships/rel-up.mp3',
  relationship_decrease: '/sounds/relationships/rel-down.mp3',
  new_relationship: '/sounds/relationships/new-rel.mp3',
  breakup: '/sounds/relationships/breakup.mp3',
  gift: '/sounds/relationships/gift.mp3',
  argument: '/sounds/relationships/argument.mp3',

  // Events
  event_popup: '/sounds/events/event.mp3',
  event_positive: '/sounds/events/event-positive.mp3',
  event_negative: '/sounds/events/event-negative.mp3',
  event_neutral: '/sounds/events/event-neutral.mp3',

  // Career
  job_offer: '/sounds/career/job.mp3',
  promotion: '/sounds/career/promotion.mp3',
  fired: '/sounds/career/fired.mp3',
  salary_increase: '/sounds/career/salary-up.mp3',

  // Business
  business_start: '/sounds/business/business-start.mp3',
  business_success: '/sounds/business/business-success.mp3',
  business_fail: '/sounds/business/business-fail.mp3',
  revenue: '/sounds/business/revenue.mp3',

  // Special
  achievement: '/sounds/special/achievement.mp3',
  death: '/sounds/special/death.mp3',
  birth: '/sounds/special/birth.mp3',
  graduation: '/sounds/special/graduation.mp3',
};

// Fallback sound for missing files
const FALLBACK_SOUND = '/sounds/ui/click.mp3';

class SoundManager {
  private audioCache: Map<SoundType, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;
  private musicVolume: number = 0.3;

  constructor() {
    if (typeof window !== 'undefined') {
      // Load user preferences
      const savedEnabled = localStorage.getItem('soundEnabled');
      const savedVolume = localStorage.getItem('soundVolume');
      const savedMusicVolume = localStorage.getItem('musicVolume');

      this.enabled = savedEnabled !== null ? savedEnabled === 'true' : true;
      this.volume = savedVolume ? parseFloat(savedVolume) : 0.5;
      this.musicVolume = savedMusicVolume ? parseFloat(savedMusicVolume) : 0.3;
    }
  }

  // Preload a sound
  preload(soundType: SoundType) {
    if (typeof window === 'undefined') return;

    if (!this.audioCache.has(soundType)) {
      const audio = new Audio();
      audio.preload = 'auto';
      // For now, we'll generate tones or use placeholder
      // In production, replace with actual sound files
      this.audioCache.set(soundType, audio);
    }
  }

  // Play a sound effect
  play(soundType: SoundType, volumeOverride?: number) {
    if (!this.enabled || typeof window === 'undefined') return;

    try {
      // Get sound URL or fallback
      const soundUrl = soundUrls[soundType] || FALLBACK_SOUND;

      // Create a new audio instance each time for overlapping sounds
      const audio = new Audio(soundUrl);
      audio.volume = volumeOverride ?? this.volume;

      // Play with error handling for missing files
      audio.play().catch((error) => {
        // If sound file not found, try fallback
        if (soundUrl !== FALLBACK_SOUND) {
          const fallbackAudio = new Audio(FALLBACK_SOUND);
          fallbackAudio.volume = volumeOverride ?? this.volume;
          fallbackAudio.play().catch((e) => {
            console.warn('Failed to play fallback sound:', e);
          });
        } else {
          console.warn('Failed to play sound:', soundType, error);
        }
      });

    } catch (error) {
      console.warn('Failed to play sound:', soundType, error);
    }
  }

  // Enable/disable sounds
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', enabled.toString());
    }
  }

  // Set volume (0-1)
  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundVolume', this.volume.toString());
    }
  }

  // Set music volume (0-1)
  setMusicVolume(volume: number) {
    this.musicVolume = Math.max(0, Math.min(1, volume));
    if (typeof window !== 'undefined') {
      localStorage.setItem('musicVolume', this.musicVolume.toString());
    }
  }

  getEnabled() {
    return this.enabled;
  }

  getVolume() {
    return this.volume;
  }

  getMusicVolume() {
    return this.musicVolume;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
