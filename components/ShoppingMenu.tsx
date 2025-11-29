'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { showStatChange } from './StatChangeNotification';

interface ShoppingMenuProps {
  onClose: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
  category: string;
  icon: string;
  description: string;
  minAge?: number;
  effects?: {
    happiness?: number;
    looks?: number;
    health?: number;
    fame?: number;
  };
}

const shopItems: ShopItem[] = [
  // Vehicles
  { id: 'bicycle', name: 'Bicycle', price: 500, category: 'vehicles', icon: '🚲', description: 'Eco-friendly transport', effects: { happiness: 5, health: 5 } },
  { id: 'motorcycle', name: 'Motorcycle', price: 8000, category: 'vehicles', icon: '🏍️', description: 'Fast and stylish', minAge: 18, effects: { happiness: 15, looks: 10 } },
  { id: 'compact_car', name: 'Compact Car', price: 18000, category: 'vehicles', icon: '🚗', description: 'Reliable daily driver', minAge: 18, effects: { happiness: 20 } },
  { id: 'luxury_sedan', name: 'Luxury Sedan', price: 65000, category: 'vehicles', icon: '🚙', description: 'Comfortable luxury', minAge: 18, effects: { happiness: 35, looks: 20, fame: 5 } },
  { id: 'sports_car', name: 'Sports Car', price: 120000, category: 'vehicles', icon: '🏎️', description: 'Speed and status', minAge: 18, effects: { happiness: 50, looks: 30, fame: 15 } },
  { id: 'supercar', name: 'Supercar', price: 500000, category: 'vehicles', icon: '🚗', description: 'Ultimate luxury', minAge: 18, effects: { happiness: 80, looks: 50, fame: 30 } },

  // Real Estate
  { id: 'studio_apt', name: 'Studio Apartment', price: 150000, category: 'realestate', icon: '🏠', description: 'Cozy starter home', minAge: 18, effects: { happiness: 25 } },
  { id: 'condo', name: 'Condo', price: 350000, category: 'realestate', icon: '🏢', description: 'Modern living space', minAge: 18, effects: { happiness: 40, looks: 10 } },
  { id: 'house', name: 'Family House', price: 650000, category: 'realestate', icon: '🏡', description: 'Spacious family home', minAge: 18, effects: { happiness: 60, looks: 20 } },
  { id: 'mansion', name: 'Mansion', price: 2000000, category: 'realestate', icon: '🏰', description: 'Luxurious estate', minAge: 18, effects: { happiness: 100, looks: 40, fame: 25 } },

  // Electronics
  { id: 'smartphone', name: 'Smartphone', price: 1000, category: 'electronics', icon: '📱', description: 'Latest flagship phone', effects: { happiness: 15, looks: 5 } },
  { id: 'laptop', name: 'Gaming Laptop', price: 2500, category: 'electronics', icon: '💻', description: 'Powerful gaming machine', effects: { happiness: 25 } },
  { id: 'tablet', name: 'Tablet', price: 800, category: 'electronics', icon: '📱', description: 'Portable entertainment', effects: { happiness: 10 } },
  { id: 'console', name: 'Gaming Console', price: 500, category: 'electronics', icon: '🎮', description: 'Next-gen gaming', effects: { happiness: 20 } },
  { id: 'tv_4k', name: '85" 4K TV', price: 3500, category: 'electronics', icon: '📺', description: 'Home theater experience', effects: { happiness: 30 } },
  { id: 'smartwatch', name: 'Smartwatch', price: 400, category: 'electronics', icon: '⌚', description: 'Fitness tracker', effects: { happiness: 10, health: 5 } },

  // Fashion
  { id: 'designer_outfit', name: 'Designer Outfit', price: 2000, category: 'fashion', icon: '👔', description: 'High fashion', effects: { happiness: 20, looks: 15 } },
  { id: 'sneaker_collection', name: 'Sneaker Collection', price: 5000, category: 'fashion', icon: '👟', description: 'Limited edition sneakers', effects: { happiness: 25, looks: 10, fame: 5 } },
  { id: 'luxury_suit', name: 'Luxury Suit', price: 8000, category: 'fashion', icon: '🤵', description: 'Tailored perfection', effects: { happiness: 30, looks: 25, fame: 10 } },
  { id: 'jewelry_set', name: 'Jewelry Set', price: 15000, category: 'fashion', icon: '💎', description: 'Diamonds and gold', effects: { happiness: 35, looks: 30, fame: 15 } },

  // Luxury Items
  { id: 'luxury_watch', name: 'Luxury Watch', price: 25000, category: 'luxury', icon: '⌚', description: 'Swiss craftsmanship', effects: { happiness: 40, looks: 20, fame: 15 } },
  { id: 'yacht', name: 'Yacht', price: 1500000, category: 'luxury', icon: '🛥️', description: 'Sail in style', minAge: 21, effects: { happiness: 90, looks: 50, fame: 40 } },
  { id: 'private_jet', name: 'Private Jet', price: 5000000, category: 'luxury', icon: '✈️', description: 'Fly anywhere, anytime', minAge: 21, effects: { happiness: 100, looks: 60, fame: 50 } },
  { id: 'art_collection', name: 'Art Collection', price: 500000, category: 'luxury', icon: '🖼️', description: 'Priceless masterpieces', effects: { happiness: 50, looks: 30, fame: 20 } },

  // Experiences
  { id: 'concert_vip', name: 'VIP Concert Tickets', price: 1500, category: 'experiences', icon: '🎤', description: 'Front row experience', effects: { happiness: 30 } },
  { id: 'cruise', name: 'Luxury Cruise', price: 8000, category: 'experiences', icon: '🚢', description: 'Two-week adventure', minAge: 18, effects: { happiness: 45, health: 15 } },
  { id: 'spa_retreat', name: 'Spa Retreat Weekend', price: 3000, category: 'experiences', icon: '💆', description: 'Ultimate relaxation', effects: { happiness: 35, health: 20 } },
  { id: 'skydiving', name: 'Skydiving Experience', price: 300, category: 'experiences', icon: '🪂', description: 'Adrenaline rush', minAge: 18, effects: { happiness: 25, health: 5 } },
];

const categories = [
  { id: 'vehicles', name: 'Vehicles', icon: 'directions_car', color: 'text-orange-500' },
  { id: 'realestate', name: 'Real Estate', icon: 'home', color: 'text-green-500' },
  { id: 'electronics', name: 'Electronics', icon: 'devices', color: 'text-blue-500' },
  { id: 'fashion', name: 'Fashion', icon: 'checkroom', color: 'text-pink-500' },
  { id: 'luxury', name: 'Luxury', icon: 'diamond', color: 'text-purple-500' },
  { id: 'experiences', name: 'Experiences', icon: 'celebration', color: 'text-yellow-500' },
];

export default function ShoppingMenu({ onClose }: ShoppingMenuProps) {
  const { stats, spendMoney, updateStats, addAsset, addHistory } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('vehicles');

  const filteredItems = shopItems.filter(item => item.category === selectedCategory);

  const handlePurchase = (item: ShopItem) => {
    // Check age restriction
    if (item.minAge && stats.age < item.minAge) {
      alert(`You must be at least ${item.minAge} years old to purchase this! (${item.minAge - stats.age} more years)`);
      return;
    }

    if (stats.money < item.price) {
      alert(`You need $${item.price.toLocaleString()} to buy this! You only have $${stats.money.toLocaleString()}`);
      return;
    }

    if (spendMoney(item.price)) {
      // Add to assets if it's a physical item
      if (item.category === 'vehicles' || item.category === 'realestate') {
        addAsset({
          id: Date.now().toString(),
          type: item.category === 'vehicles' ? 'car' : 'house',
          name: item.name,
          value: item.price,
          yearPurchased: stats.age,
        });
      }

      // Apply effects
      if (item.effects) {
        Object.entries(item.effects).forEach(([stat, value]) => {
          if (typeof value === 'number') {
            showStatChange(stat, value);
          }
        });
        updateStats(item.effects);
      }

      addHistory('activity', `Purchased ${item.name} for $${item.price.toLocaleString()}`);
      alert(`🎉 Purchased ${item.name}!`);
    }
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
          className="bg-[#2c3e50] border border-primary/30 rounded-xl shadow-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-glow"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 bg-gradient-to-r from-[#34495e] to-[#2c3e50]">
            <div>
              <h1 className="text-white text-xl sm:text-2xl font-bold">🛍️ Dream Shop</h1>
              <p className="text-[#92c9ad] text-xs sm:text-sm">Your money: ${stats.money.toLocaleString()}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Categories Sidebar */}
            <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-[#34495e]/50 overflow-x-auto lg:overflow-x-visible">
              <h2 className="text-white font-bold mb-4 text-base sm:text-lg">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {selectedCategory === category.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}
                    <span className={`material-symbols-outlined ${category.color} relative z-10`}>
                      {category.icon}
                    </span>
                    <span className="text-sm font-medium relative z-10">{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Items Grid */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              <h2 className="text-white text-xl sm:text-2xl font-bold mb-4">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-[#34495e] rounded-xl p-4 sm:p-6 border border-white/10 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      <div className="text-3xl sm:text-4xl mb-3">{item.icon}</div>
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1 truncate">{item.name}</h3>
                      <p className="text-gray-400 text-sm sm:text-base mb-3">{item.description}</p>

                      {/* Age Restriction */}
                      {item.minAge && (
                        <p className={`text-xs mb-2 ${stats.age >= item.minAge ? 'text-green-400' : 'text-red-400'}`}>
                          {stats.age >= item.minAge ? '✓' : '🔒'} Age {item.minAge}+
                        </p>
                      )}

                      {/* Effects */}
                      {item.effects && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(item.effects).map(([stat, value]) => (
                            <span
                              key={stat}
                              className="px-2 py-1 bg-primary/20 text-primary rounded-full text-xs"
                            >
                              +{value} {stat}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price and Buy Button */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-yellow-400 font-bold text-base sm:text-lg flex-shrink-0">
                          ${item.price.toLocaleString()}
                        </span>
                        <motion.button
                          onClick={() => handlePurchase(item)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          disabled={Boolean(stats.money < item.price || (item.minAge && stats.age < item.minAge))}
                          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
                            stats.money >= item.price && (!item.minAge || stats.age >= item.minAge)
                              ? 'bg-gradient-to-r from-primary to-emerald-400 text-white hover:shadow-lg hover:shadow-primary/50'
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {item.minAge && stats.age < item.minAge
                            ? 'Too Young'
                            : stats.money >= item.price
                            ? 'Buy'
                            : 'Too Expensive'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
