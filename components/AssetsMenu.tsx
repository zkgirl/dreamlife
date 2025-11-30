'use client';
//assets
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { showStatChange } from './StatChangeNotification';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface AssetsMenuProps {
  onClose: () => void;
}

export default function AssetsMenu({ onClose }: AssetsMenuProps) {
  const { stats, assets, removeAsset, addMoney, addHistory } = useGameStore();
  const { playButtonClick, playMenuClose, playTabSwitch, playSell, playMoneyGain } = useSoundEffects();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'house' | 'car' | 'other'>('all');

  const houses = assets.filter(a => a.type === 'house');
  const cars = assets.filter(a => a.type === 'car');
  const others = assets.filter(a => a.type === 'other');

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  const handleSellAsset = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    // Calculate depreciation based on years owned
    const yearsOwned = stats.age - asset.yearPurchased;
    const depreciationRate = asset.type === 'house' ? 0.02 : 0.15; // Houses depreciate slower
    const depreciation = Math.min(yearsOwned * depreciationRate, 0.6); // Max 60% depreciation

    const condition = asset.condition || 100;
    const conditionMultiplier = condition / 100;

    const sellPrice = Math.floor(asset.value * (1 - depreciation) * conditionMultiplier);

    if (confirm(`Sell ${asset.name} for $${sellPrice.toLocaleString()}?\n\nOriginal Value: $${asset.value.toLocaleString()}\nCurrent Value: $${sellPrice.toLocaleString()}\nYears Owned: ${yearsOwned}`)) {
      playSell();
      playMoneyGain();
      addMoney(sellPrice);
      removeAsset(assetId);
      showStatChange('money', sellPrice);
      addHistory('activity', `Sold ${asset.name} for $${sellPrice.toLocaleString()}`);
      alert(`💰 Sold ${asset.name} for $${sellPrice.toLocaleString()}!`);
    } else {
      playButtonClick();
    }
  };

  const getAssetIcon = (type: string, name: string) => {
    if (type === 'house') {
      if (name.includes('Mansion')) return '🏰';
      if (name.includes('House')) return '🏡';
      if (name.includes('Apartment')) return '🏠';
      if (name.includes('Condo')) return '🏢';
      return '🏠';
    } else if (type === 'car') {
      if (name.includes('Supercar')) return '🏎️';
      if (name.includes('Sports')) return '🏎️';
      if (name.includes('Luxury')) return '🚙';
      if (name.includes('Motorcycle')) return '🏍️';
      if (name.includes('Bicycle')) return '🚲';
      return '🚗';
    }
    return '📦';
  };

  const renderAssetCard = (asset: any) => {
    const yearsOwned = stats.age - asset.yearPurchased;
    const depreciationRate = asset.type === 'house' ? 0.02 : 0.15;
    const depreciation = Math.min(yearsOwned * depreciationRate, 0.6);
    const condition = asset.condition || 100;
    const currentValue = Math.floor(asset.value * (1 - depreciation) * (condition / 100));
    const icon = getAssetIcon(asset.type, asset.name);

    return (
      <motion.div
        key={asset.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-[#34495e] rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all relative overflow-hidden group"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3 gap-2">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <span className="text-3xl sm:text-4xl flex-shrink-0">{icon}</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-white font-bold text-base sm:text-lg truncate">{asset.name}</h3>
                <p className="text-[#92c9ad] text-xs sm:text-sm capitalize">{asset.type}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Purchase Price:</span>
              <span className="text-white font-semibold">${asset.value.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Current Value:</span>
              <span className="text-green-400 font-bold">${currentValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Purchased:</span>
              <span className="text-white font-semibold">Age {asset.yearPurchased} ({yearsOwned} {yearsOwned === 1 ? 'year' : 'years'} ago)</span>
            </div>
            {asset.condition !== undefined && (
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Condition:</span>
                <span className={`font-bold ${
                  condition >= 80 ? 'text-green-400' :
                  condition >= 50 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {condition}%
                </span>
              </div>
            )}
          </div>

          {/* Condition Bar */}
          {asset.condition !== undefined && (
            <div className="w-full bg-gray-700/50 rounded-full h-2 mb-4">
              <motion.div
                className={`h-2 rounded-full ${
                  condition >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                  condition >= 50 ? 'bg-gradient-to-r from-yellow-500 to-amber-400' :
                  'bg-gradient-to-r from-red-500 to-orange-400'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${condition}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          )}

          <motion.button
            onClick={() => {
              playButtonClick();
              handleSellAsset(asset.id);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-yellow-500 to-orange-400 text-white rounded-full font-bold hover:shadow-lg transition-all text-sm sm:text-base"
          >
            💰 Sell for ${currentValue.toLocaleString()}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  const filteredAssets = selectedCategory === 'all'
    ? assets
    : assets.filter(a => a.type === selectedCategory);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => {
          playMenuClose();
          onClose();
        }}
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
              <h1 className="text-white text-xl sm:text-2xl font-bold">🏠 My Assets</h1>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 text-xs sm:text-sm">
                <span className="text-[#92c9ad]">
                  📦 {assets.length} {assets.length === 1 ? 'item' : 'items'}
                </span>
                <span className="text-[#92c9ad]">
                  💰 Total Value: ${totalValue.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                playMenuClose();
                onClose();
              }}
              className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
            {/* Categories Sidebar */}
            <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/10 p-4 bg-[#34495e]/50 overflow-x-auto lg:overflow-x-visible">
              <h2 className="text-white font-bold mb-4 text-base sm:text-lg">Categories</h2>
              <div className="flex lg:flex-col gap-2 lg:space-y-2 lg:space-y-0 overflow-x-auto lg:overflow-x-visible">
                {[
                  { id: 'all', label: 'All Assets', icon: '📦', count: assets.length },
                  { id: 'house', label: 'Real Estate', icon: '🏠', count: houses.length },
                  { id: 'car', label: 'Vehicles', icon: '🚗', count: cars.length },
                  { id: 'other', label: 'Other', icon: '📦', count: others.length },
                ].map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => {
                      if (selectedCategory !== category.id) {
                        playTabSwitch();
                      }
                      setSelectedCategory(category.id as any);
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-shrink-0 lg:w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 relative overflow-hidden ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-emerald-400 text-white shadow-lg'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {selectedCategory === category.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    )}
                    <div className="flex items-center gap-2 sm:gap-3 relative z-10">
                      <span className="text-lg sm:text-xl">{category.icon}</span>
                      <span className="text-xs sm:text-sm font-medium whitespace-nowrap">{category.label}</span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full relative z-10 flex-shrink-0 ${
                      selectedCategory === category.id
                        ? 'bg-white/20'
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10">
                <h3 className="text-white font-bold text-xs sm:text-sm mb-3">Portfolio Summary</h3>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Real Estate:</span>
                    <span className="text-white font-semibold">{houses.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Vehicles:</span>
                    <span className="text-white font-semibold">{cars.length}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-white/60">Total Worth:</span>
                    <span className="text-green-400 font-bold">${totalValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assets Grid */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
              {filteredAssets.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <span className="text-6xl mb-4">📦</span>
                  <h2 className="text-white text-2xl font-bold mb-2">No Assets Yet</h2>
                  <p className="text-white/60 text-center">
                    {selectedCategory === 'all'
                      ? "You don't own any assets yet. Visit the Shopping menu to purchase items!"
                      : `You don't own any ${selectedCategory === 'house' ? 'real estate' : selectedCategory === 'car' ? 'vehicles' : 'other items'} yet.`
                    }
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-white text-lg sm:text-xl font-bold mb-4">
                    {selectedCategory === 'all' && 'All Assets'}
                    {selectedCategory === 'house' && '🏠 Real Estate'}
                    {selectedCategory === 'car' && '🚗 Vehicles'}
                    {selectedCategory === 'other' && '📦 Other Items'}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAssets.map(renderAssetCard)}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
