import { create } from 'zustand';

export interface GameStats {
  happiness: number; // 0-100
  health: number; // 0-100
  smarts: number; // 0-100
  looks: number; // 0-100
  money: number;
  age: number;
  fame?: number; // 0-100 for celebrities
  approval?: number; // 0-100 for politicians/celebrities
  shards?: number; // Premium currency for special choices
}

export interface Character {
  name: string;
  gender: 'Male' | 'Female';
  country: string;
  city: string;
}

export interface DetailedRelationship {
  id: string;
  name: string;
  type: 'parent' | 'sibling' | 'spouse' | 'partner' | 'child' | 'friend' | 'ex' | 'pet';
  relationship: number; // Bond strength 0-100
  age?: number;
  generosity?: number;
  craziness?: number;
  petulance?: number;
  alive: boolean;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  health: number;
  happiness: number;
}

export interface Job {
  id: string;
  title: string;
  salary: number;
  yearsWorked: number;
  category?: string;
}

export interface Business {
  id: string;
  name: string;
  type: string;
  value: number;
  revenue: number; // Annual revenue
  employees: number;
  reputation: number; // 0-100
  yearsOwned: number;
}

export interface Asset {
  id: string;
  type: 'house' | 'car' | 'other';
  name: string;
  value: number;
  condition?: number;
  yearPurchased: number;
}

export interface Education {
  level: 'none' | 'elementary' | 'middle' | 'high' | 'university' | 'graduate';
  major?: string;
  graduated: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface Symbol {
  id: string;
  name: string;
  unlocked: boolean;
}

export interface SocialMedia {
  platform: string;
  followers: number;
  verified: boolean;
}

export interface HistoryEntry {
  id: string;
  age: number;
  type: 'event' | 'activity' | 'milestone';
  text: string;
  timestamp: number;
}

export interface GameState {
  // Character
  character: Character | null;
  stats: GameStats;
  education: Education;

  // Life
  relationships: DetailedRelationship[];
  pets: Pet[];
  job: Job | null;
  businesses: Business[];
  assets: Asset[];
  crimes: string[];
  achievements: Achievement[];
  socialMedia: SocialMedia[];
  symbols: Symbol[];

  // Tracking
  activitiesDone: string[];
  history: HistoryEntry[];
  showHistory: boolean;
  eventsThisYear: number;

  // Game State
  gameStarted: boolean;
  gameEnded: boolean;
  isDead: boolean;
  causeOfDeath: string | null;
  currentEvent: any | null;
  showActivitiesMenu: boolean;
  showCareerMenu: boolean;
  showRelationshipsMenu: boolean;
  showBusinessMenu: boolean;
  showShoppingMenu: boolean;
  showAssetsMenu: boolean;
  showSettingsMenu: boolean;
  showEducationMenu: boolean;
  educationMenuLevel: 'university' | 'graduate' | null;
  guideWhisper: string | null;

  // Actions
  createCharacter: (char: Character, stats: GameStats, initialRelationships?: DetailedRelationship[]) => void;
  updateStats: (stats: Partial<GameStats>) => void;
  setAge: (age: number) => void;
  addMoney: (amount: number) => void;
  spendMoney: (amount: number) => boolean;

  setEducation: (education: Education) => void;
  setJob: (job: Job | null) => void;
  updateJob: (updates: Partial<Job>) => void;

  addBusiness: (business: Business) => void;
  updateBusiness: (id: string, updates: Partial<Business>) => void;
  removeBusiness: (id: string) => void;

  addRelationship: (relationship: DetailedRelationship) => void;
  updateRelationship: (id: string, updates: Partial<DetailedRelationship>) => void;
  removeRelationship: (id: string) => void;

  addPet: (pet: Pet) => void;
  updatePet: (id: string, updates: Partial<Pet>) => void;
  removePet: (id: string) => void;

  addAsset: (asset: Asset) => void;
  removeAsset: (id: string) => void;

  addCrime: (crime: string) => void;

  addAchievement: (achievement: Achievement) => void;
  unlockAchievement: (id: string) => void;

  addSocialMedia: (platform: string) => void;
  updateSocialMedia: (platform: string, followers: number) => void;

  addActivity: (activity: string) => void;
  addHistory: (type: 'event' | 'activity' | 'milestone', text: string) => void;

  setCurrentEvent: (event: any) => void;
  incrementEventCount: () => void;
  resetEventCount: () => void;
  toggleActivitiesMenu: () => void;
  toggleCareerMenu: () => void;
  toggleRelationshipsMenu: () => void;
  toggleBusinessMenu: () => void;
  toggleShoppingMenu: () => void;
  toggleAssetsMenu: () => void;
  toggleSettingsMenu: () => void;
  toggleEducationMenu: (level: 'university' | 'graduate' | null) => void;
  toggleHistory: () => void;
  startGame: () => void;
  endGame: (causeOfDeath: string) => void;
  resetGame: () => void;
  advanceYear: () => void;
}

const initialStats: GameStats = {
  happiness: 100,
  health: 100,
  smarts: 50,
  looks: 50,
  money: 0,
  age: 0,
};

const initialEducation: Education = {
  level: 'none',
  graduated: false,
};

const initialAchievements: Achievement[] = [
  { id: 'first_job', name: 'First Job', description: 'Get your first job', unlocked: false },
  { id: 'married', name: 'Married', description: 'Get married', unlocked: false },
  { id: 'millionaire', name: 'Millionaire', description: 'Earn $1,000,000', unlocked: false },
  { id: 'centenarian', name: 'Centenarian', description: 'Live to 100', unlocked: false },
  { id: 'famous', name: 'Famous', description: 'Become famous', unlocked: false },
];

export const useGameStore = create<GameState>((set, get) => ({
  // Initial State
  character: null,
  stats: initialStats,
  education: initialEducation,
  relationships: [],
  pets: [],
  job: null,
  businesses: [],
  assets: [],
  crimes: [],
  achievements: initialAchievements,
  socialMedia: [],
  symbols: [],
  activitiesDone: [],
  history: [],
  showHistory: false,
  eventsThisYear: 0,
  gameStarted: false,
  gameEnded: false,
  isDead: false,
  causeOfDeath: null,
  currentEvent: null,
  showActivitiesMenu: false,
  showCareerMenu: false,
  showRelationshipsMenu: false,
  showBusinessMenu: false,
  showShoppingMenu: false,
  showAssetsMenu: false,
  showSettingsMenu: false,
  showEducationMenu: false,
  educationMenuLevel: null,
  guideWhisper: null,

  // Actions
  createCharacter: (char, stats, initialRelationships) => set({
    character: char,
    stats,
    relationships: initialRelationships || [],
    gameStarted: true,
  }),

  updateStats: (newStats) => set((state) => {
    // Calculate new stat values with proper addition/subtraction
    const happiness = newStats.happiness !== undefined
      ? state.stats.happiness + newStats.happiness
      : state.stats.happiness;
    const health = newStats.health !== undefined
      ? state.stats.health + newStats.health
      : state.stats.health;
    const smarts = newStats.smarts !== undefined
      ? state.stats.smarts + newStats.smarts
      : state.stats.smarts;
    const looks = newStats.looks !== undefined
      ? state.stats.looks + newStats.looks
      : state.stats.looks;
    const money = newStats.money !== undefined
      ? state.stats.money + newStats.money
      : state.stats.money;
    const fame = newStats.fame !== undefined
      ? (state.stats.fame || 0) + newStats.fame
      : state.stats.fame;
    const approval = newStats.approval !== undefined
      ? (state.stats.approval || 0) + newStats.approval
      : state.stats.approval;

    const updatedStats = {
      ...state.stats,
      happiness: Math.max(0, Math.min(100, happiness)),
      health: Math.max(0, Math.min(100, health)),
      smarts: Math.max(0, Math.min(100, smarts)),
      looks: Math.max(0, Math.min(100, looks)),
      money,
      fame: fame !== undefined ? Math.max(0, Math.min(100, fame)) : undefined,
      approval: approval !== undefined ? Math.max(0, Math.min(100, approval)) : undefined,
    };

    // Check for millionaire achievement
    if (updatedStats.money >= 1000000 && !state.achievements.find(a => a.id === 'millionaire')?.unlocked) {
      get().unlockAchievement('millionaire');
    }

    // Check for famous achievement
    if (updatedStats.fame && updatedStats.fame >= 80 && !state.achievements.find(a => a.id === 'famous')?.unlocked) {
      get().unlockAchievement('famous');
    }

    return { stats: updatedStats };
  }),

  setAge: (age) => set((state) => ({
    stats: { ...state.stats, age },
  })),

  addMoney: (amount) => set((state) => ({
    stats: { ...state.stats, money: state.stats.money + amount },
  })),

  spendMoney: (amount) => {
    const state = get();
    if (state.stats.money >= amount) {
      set((state) => ({
        stats: { ...state.stats, money: state.stats.money - amount },
      }));
      return true;
    }
    return false;
  },

  setEducation: (education) => set({ education }),

  setJob: (job) => {
    set({ job });
    // Check for first job achievement
    if (job && !get().achievements.find(a => a.id === 'first_job')?.unlocked) {
      get().unlockAchievement('first_job');
    }
  },

  updateJob: (updates) => set((state) => ({
    job: state.job ? { ...state.job, ...updates } : null,
  })),

  addBusiness: (business) => set((state) => ({
    businesses: [...state.businesses, business],
  })),

  updateBusiness: (id, updates) => set((state) => ({
    businesses: state.businesses.map((b) =>
      b.id === id ? { ...b, ...updates } : b
    ),
  })),

  removeBusiness: (id) => set((state) => ({
    businesses: state.businesses.filter((b) => b.id !== id),
  })),

  addRelationship: (relationship) => set((state) => ({
    relationships: [...state.relationships, relationship],
  })),

  updateRelationship: (id, updates) => set((state) => ({
    relationships: state.relationships.map((r) =>
      r.id === id ? { ...r, ...updates } : r
    ),
  })),

  removeRelationship: (id) => set((state) => ({
    relationships: state.relationships.filter((r) => r.id !== id),
  })),

  addPet: (pet) => set((state) => ({
    pets: [...state.pets, pet],
  })),

  updatePet: (id, updates) => set((state) => ({
    pets: state.pets.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    ),
  })),

  removePet: (id) => set((state) => ({
    pets: state.pets.filter((p) => p.id !== id),
  })),

  addAsset: (asset) => set((state) => ({
    assets: [...state.assets, asset],
  })),

  removeAsset: (id) => set((state) => ({
    assets: state.assets.filter((a) => a.id !== id),
  })),

  addCrime: (crime) => set((state) => ({
    crimes: [...state.crimes, crime],
  })),

  addAchievement: (achievement) => set((state) => ({
    achievements: [...state.achievements, achievement],
  })),

  unlockAchievement: (id) => set((state) => ({
    achievements: state.achievements.map((a) =>
      a.id === id ? { ...a, unlocked: true, unlockedAt: state.stats.age } : a
    ),
  })),

  addSocialMedia: (platform) => set((state) => ({
    socialMedia: [...state.socialMedia, { platform, followers: 0, verified: false }],
  })),

  updateSocialMedia: (platform, followers) => set((state) => ({
    socialMedia: state.socialMedia.map((s) =>
      s.platform === platform ? { ...s, followers } : s
    ),
  })),

  addActivity: (activity) => set((state) => ({
    activitiesDone: [...state.activitiesDone, activity],
  })),

  addHistory: (type, text) => set((state) => ({
    history: [...state.history, {
      id: Date.now().toString() + Math.random(),
      age: state.stats.age,
      type,
      text,
      timestamp: Date.now(),
    }],
  })),

  setCurrentEvent: (event) => set({ currentEvent: event }),

  incrementEventCount: () => set((state) => ({
    eventsThisYear: state.eventsThisYear + 1,
  })),

  resetEventCount: () => set({ eventsThisYear: 0 }),

  toggleActivitiesMenu: () => set((state) => ({
    showActivitiesMenu: !state.showActivitiesMenu,
  })),

  toggleCareerMenu: () => set((state) => ({
    showCareerMenu: !state.showCareerMenu,
  })),

  toggleRelationshipsMenu: () => set((state) => ({
    showRelationshipsMenu: !state.showRelationshipsMenu,
  })),

  toggleBusinessMenu: () => set((state) => ({
    showBusinessMenu: !state.showBusinessMenu,
  })),

  toggleShoppingMenu: () => set((state) => ({
    showShoppingMenu: !state.showShoppingMenu,
  })),

  toggleAssetsMenu: () => set((state) => ({
    showAssetsMenu: !state.showAssetsMenu,
  })),

  toggleSettingsMenu: () => set((state) => ({
    showSettingsMenu: !state.showSettingsMenu,
  })),

  toggleEducationMenu: (level) => set((state) => ({
    showEducationMenu: level !== null ? true : !state.showEducationMenu,
    educationMenuLevel: level,
  })),

  toggleHistory: () => set((state) => ({
    showHistory: !state.showHistory,
  })),

  startGame: () => set({ gameStarted: true }),

  endGame: (causeOfDeath) => set({
    gameEnded: true,
    isDead: true,
    causeOfDeath,
  }),

  resetGame: () => set({
    character: null,
    stats: initialStats,
    education: initialEducation,
    relationships: [],
    pets: [],
    job: null,
    businesses: [],
    assets: [],
    crimes: [],
    achievements: initialAchievements,
    socialMedia: [],
    activitiesDone: [],
    history: [],
    showHistory: false,
    eventsThisYear: 0,
    gameStarted: false,
    gameEnded: false,
    isDead: false,
    causeOfDeath: null,
    currentEvent: null,
    showActivitiesMenu: false,
    showCareerMenu: false,
    showRelationshipsMenu: false,
    showBusinessMenu: false,
    showShoppingMenu: false,
    showAssetsMenu: false,
    showSettingsMenu: false,
    showEducationMenu: false,
    educationMenuLevel: null,
  }),

  advanceYear: () => set((state) => {
    const newAge = state.stats.age + 1;

    // Reset event count for new year
    const resetCount = true;

    // Age pets
    const updatedPets = state.pets.map(p => ({
      ...p,
      age: p.age + 1,
      health: Math.max(0, p.health - (p.age > 10 ? 5 : 0)),
    }));

    // Age relationships
    const updatedRelationships = state.relationships.map(r => {
      if (r.age !== undefined) {
        return { ...r, age: r.age + 1 };
      }
      return r;
    });

    // Check for death
    if (state.stats.health <= 0) {
      return {
        stats: { ...state.stats, age: newAge },
        pets: updatedPets,
        relationships: updatedRelationships,
        gameEnded: true,
        isDead: true,
        causeOfDeath: 'Poor health',
      };
    }

    // Check for centenarian achievement
    if (newAge >= 100 && !state.achievements.find(a => a.id === 'centenarian')?.unlocked) {
      get().unlockAchievement('centenarian');
    }

    if (newAge >= 120) {
      return {
        stats: { ...state.stats, age: newAge },
        pets: updatedPets,
        relationships: updatedRelationships,
        gameEnded: true,
        isDead: true,
        causeOfDeath: 'Old age',
      };
    }

    // Aging effects (reduced penalties)
    let healthChange = 0;
    let looksChange = 0;
    let happinessChange = Math.floor(Math.random() * 3) - 1; // Random -1 to +2

    if (newAge > 60) {
      healthChange = -Math.floor(Math.random() * 2); // Max -1
      looksChange = -Math.floor(Math.random() * 2); // Max -1
    }
    if (newAge > 80) {
      healthChange = -Math.floor(Math.random() * 3); // Max -2
      looksChange = -Math.floor(Math.random() * 2); // Max -1
    }

    // Job salary
    let moneyChange = 0;
    if (state.job) {
      moneyChange = state.job.salary;
    }

    // Business revenue
    const updatedBusinesses = state.businesses.map(b => ({
      ...b,
      yearsOwned: b.yearsOwned + 1,
    }));

    const businessRevenue = state.businesses.reduce((total, b) => total + b.revenue, 0);
    moneyChange += businessRevenue;

    return {
      stats: {
        ...state.stats,
        age: newAge,
        health: Math.max(0, Math.min(100, state.stats.health + healthChange)),
        looks: Math.max(0, Math.min(100, state.stats.looks + looksChange)),
        happiness: Math.max(0, Math.min(100, state.stats.happiness + happinessChange)),
        money: state.stats.money + moneyChange,
      },
      pets: updatedPets,
      relationships: updatedRelationships,
      businesses: updatedBusinesses,
      job: state.job ? { ...state.job, yearsWorked: state.job.yearsWorked + 1 } : null,
      eventsThisYear: 0, // Reset event count for new year
    };
  }),
}));
