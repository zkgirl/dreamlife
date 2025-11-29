'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { showStatChange } from './StatChangeNotification';

interface BusinessMenuProps {
  onClose: () => void;
}

interface BusinessType {
  id: string;
  name: string;
  icon: string;
  description: string;
  startupCost: number;
  baseRevenue: number;
  baseEmployees: number;
  minAge: number;
  requirements?: string;
}

const businessTypes: BusinessType[] = [
  {
    id: 'lemonade',
    name: 'Lemonade Stand',
    icon: '🍋',
    description: 'Start small with a classic lemonade stand',
    startupCost: 100,
    baseRevenue: 200, // Reduced from 500
    baseEmployees: 0,
    minAge: 8,
  },
  {
    id: 'food_truck',
    name: 'Food Truck',
    icon: '🚚',
    description: 'Mobile food business serving delicious meals',
    startupCost: 15000,
    baseRevenue: 8000, // Reduced from 30000
    baseEmployees: 2,
    minAge: 18,
  },
  {
    id: 'coffee_shop',
    name: 'Coffee Shop',
    icon: '☕',
    description: 'Cozy cafe serving coffee and pastries',
    startupCost: 50000,
    baseRevenue: 18000, // Reduced from 75000
    baseEmployees: 5,
    minAge: 21,
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍽️',
    description: 'Fine dining establishment',
    startupCost: 150000,
    baseRevenue: 45000, // Reduced from 200000
    baseEmployees: 15,
    minAge: 25,
  },
  {
    id: 'tech_startup',
    name: 'Tech Startup',
    icon: '💻',
    description: 'Innovative technology company',
    startupCost: 100000,
    baseRevenue: 50000, // Reduced from 250000
    baseEmployees: 10,
    minAge: 22,
    requirements: 'University degree required',
  },
  {
    id: 'gym',
    name: 'Fitness Center',
    icon: '💪',
    description: 'Modern gym with equipment and classes',
    startupCost: 200000,
    baseRevenue: 40000, // Reduced from 180000
    baseEmployees: 12,
    minAge: 25,
  },
  {
    id: 'real_estate',
    name: 'Real Estate Agency',
    icon: '🏢',
    description: 'Property sales and management',
    startupCost: 80000,
    baseRevenue: 60000, // Reduced from 300000
    baseEmployees: 8,
    minAge: 25,
  },
  {
    id: 'hotel',
    name: 'Boutique Hotel',
    icon: '🏨',
    description: 'Luxury accommodations for travelers',
    startupCost: 500000,
    baseRevenue: 120000, // Reduced from 600000
    baseEmployees: 30,
    minAge: 30,
  },
  {
    id: 'investment_firm',
    name: 'Investment Firm',
    icon: '📈',
    description: 'Manage investments and portfolios',
    startupCost: 1000000,
    baseRevenue: 250000, // Reduced from 1500000
    baseEmployees: 20,
    minAge: 30,
    requirements: 'Graduate degree required',
  },
];

export default function BusinessMenu({ onClose }: BusinessMenuProps) {
  const { stats, education, businesses, addBusiness, updateBusiness, removeBusiness, spendMoney, addMoney, updateStats, addHistory } = useGameStore();
  const [selectedTab, setSelectedTab] = useState<'start' | 'manage'>('start');
  const [expandedBusinessId, setExpandedBusinessId] = useState<string | null>(null);

  const canStartBusiness = (businessType: BusinessType) => {
    if (stats.age < businessType.minAge) return false;
    if (stats.money < businessType.startupCost) return false;
    if (businessType.requirements) {
      if (businessType.requirements.includes('University') && education.level !== 'university' && education.level !== 'graduate') {
        return false;
      }
      if (businessType.requirements.includes('Graduate') && education.level !== 'graduate') {
        return false;
      }
    }
    return true;
  };

  const handleStartBusiness = (businessType: BusinessType) => {
    if (!canStartBusiness(businessType)) {
      if (stats.age < businessType.minAge) {
        alert(`You must be at least ${businessType.minAge} years old to start this business!`);
      } else if (stats.money < businessType.startupCost) {
        alert(`You need $${businessType.startupCost.toLocaleString()} to start this business!`);
      } else if (businessType.requirements) {
        alert(`Requirements not met: ${businessType.requirements}`);
      }
      return;
    }

    if (!spendMoney(businessType.startupCost)) {
      return;
    }

    const newBusiness = {
      id: Date.now().toString(),
      name: businessType.name,
      type: businessType.id,
      value: businessType.startupCost,
      revenue: businessType.baseRevenue,
      employees: businessType.baseEmployees,
      reputation: 50, // Start at 50%
      yearsOwned: 0,
    };

    addBusiness(newBusiness);
    showStatChange('happiness', 20);
    updateStats({ happiness: 20 });
    addHistory('milestone', `Started a new business: ${businessType.name}`);

    alert(`🎉 You started ${businessType.name}! It will generate $${businessType.baseRevenue.toLocaleString()} per year.`);
  };

  const handleUpgradeBusiness = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId);
    if (!business) return;

    const upgradeCost = Math.floor(business.value * 0.5); // 50% of business value

    if (!spendMoney(upgradeCost)) {
      alert(`You need $${upgradeCost.toLocaleString()} to upgrade this business!`);
      return;
    }

    const revenueIncrease = Math.floor(business.revenue * 0.3); // 30% revenue boost
    const newReputation = Math.min(100, business.reputation + 10);

    updateBusiness(businessId, {
      value: business.value + upgradeCost,
      revenue: business.revenue + revenueIncrease,
      reputation: newReputation,
      employees: business.employees + 2,
    });

    showStatChange('happiness', 15);
    updateStats({ happiness: 15 });
    addHistory('activity', `Upgraded ${business.name}`);

    alert(`✨ Business upgraded! Revenue increased to $${(business.revenue + revenueIncrease).toLocaleString()}/year`);
  };

  const handleSellBusiness = (businessId: string) => {
    const business = businesses.find(b => b.id === businessId);
    if (!business) return;

    const salePrice = Math.floor(business.value * (business.reputation / 100) * 1.2);

    if (confirm(`Sell ${business.name} for $${salePrice.toLocaleString()}?`)) {
      addMoney(salePrice);
      removeBusiness(businessId);
      showStatChange('money', salePrice);
      addHistory('milestone', `Sold ${business.name} for $${salePrice.toLocaleString()}`);

      alert(`💰 Sold ${business.name} for $${salePrice.toLocaleString()}!`);
    }
  };

  const toggleExpanded = (businessId: string) => {
    setExpandedBusinessId(expandedBusinessId === businessId ? null : businessId);
  };

  const totalRevenue = businesses.reduce((sum, b) => sum + b.revenue, 0);
  const totalEmployees = businesses.reduce((sum, b) => sum + b.employees, 0);

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
          className="bg-[#2c3e50] border border-primary/30 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-glow"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-gradient-to-r from-[#34495e] to-[#2c3e50]">
            <div>
              <h1 className="text-white text-2xl font-bold">💼 Business Empire</h1>
              {businesses.length > 0 && (
                <div className="flex gap-4 mt-1 text-sm">
                  <span className="text-[#92c9ad]">
                    💰 ${totalRevenue.toLocaleString()}/year
                  </span>
                  <span className="text-[#92c9ad]">
                    👥 {totalEmployees} employees
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 px-6">
            <button
              onClick={() => setSelectedTab('start')}
              className={`px-4 py-3 font-semibold transition-all ${
                selectedTab === 'start'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              🚀 Start Business
            </button>
            <button
              onClick={() => setSelectedTab('manage')}
              className={`px-4 py-3 font-semibold transition-all ${
                selectedTab === 'manage'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              📊 Manage ({businesses.length})
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {selectedTab === 'start' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {businessTypes.map((businessType) => {
                  const canStart = canStartBusiness(businessType);

                  return (
                    <motion.div
                      key={businessType.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: canStart ? 1.02 : 1, y: canStart ? -5 : 0 }}
                      className={`bg-[#34495e] rounded-xl p-5 border border-white/10 ${
                        canStart ? 'hover:border-primary/50 cursor-pointer' : 'opacity-60'
                      } transition-all`}
                    >
                      <div className="text-4xl mb-3">{businessType.icon}</div>
                      <h3 className="text-white font-bold text-lg mb-2">{businessType.name}</h3>
                      <p className="text-white/70 text-sm mb-3">{businessType.description}</p>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Startup Cost:</span>
                          <span className="text-yellow-400 font-bold">${businessType.startupCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Revenue/Year:</span>
                          <span className="text-green-400 font-bold">${businessType.baseRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Min Age:</span>
                          <span className="text-white font-bold">{businessType.minAge}</span>
                        </div>
                        {businessType.requirements && (
                          <div className="text-xs text-orange-400 bg-orange-500/10 rounded px-2 py-1">
                            {businessType.requirements}
                          </div>
                        )}
                      </div>

                      <motion.button
                        onClick={() => handleStartBusiness(businessType)}
                        disabled={!canStart}
                        whileHover={canStart ? { scale: 1.05 } : {}}
                        whileTap={canStart ? { scale: 0.95 } : {}}
                        className={`w-full py-2 rounded-full font-bold transition-all ${
                          canStart
                            ? 'bg-gradient-to-r from-primary to-emerald-400 text-white hover:shadow-lg'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {canStart ? '🚀 Start Business' : '🔒 Not Available'}
                      </motion.button>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {businesses.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-white/60 text-lg mb-4">You don't own any businesses yet</p>
                    <p className="text-white/40 text-sm">Start your entrepreneurial journey in the Start Business tab!</p>
                  </div>
                ) : (
                  businesses.map((business) => {
                    const isExpanded = expandedBusinessId === business.id;

                    return (
                      <motion.div
                        key={business.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#34495e] rounded-xl border border-white/10 overflow-hidden"
                      >
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-3xl">{businessTypes.find(t => t.id === business.type)?.icon || '💼'}</span>
                                <div>
                                  <h3 className="text-white font-bold text-xl">{business.name}</h3>
                                  <p className="text-[#92c9ad] text-sm">Owned for {business.yearsOwned} {business.yearsOwned === 1 ? 'year' : 'years'}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-green-400 font-bold text-xl">${business.revenue.toLocaleString()}</p>
                              <p className="text-white/60 text-xs">Annual Revenue</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-white/5 rounded-lg p-3 text-center">
                              <p className="text-white/60 text-xs mb-1">Value</p>
                              <p className="text-white font-bold">${business.value.toLocaleString()}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-center">
                              <p className="text-white/60 text-xs mb-1">Employees</p>
                              <p className="text-white font-bold">{business.employees}</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-center">
                              <p className="text-white/60 text-xs mb-1">Reputation</p>
                              <p className="text-white font-bold">{business.reputation}%</p>
                            </div>
                          </div>

                          {/* Reputation Bar */}
                          <div className="w-full bg-gray-700/50 rounded-full h-2 mb-4">
                            <motion.div
                              className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-green-500"
                              initial={{ width: 0 }}
                              animate={{ width: `${business.reputation}%` }}
                              transition={{ duration: 0.8 }}
                            />
                          </div>

                          <div className="flex gap-2 flex-wrap">
                            <button
                              onClick={() => toggleExpanded(business.id)}
                              className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 text-sm font-semibold transition-all"
                            >
                              {isExpanded ? 'Hide Details' : 'Show Details'}
                            </button>
                            <button
                              onClick={() => handleUpgradeBusiness(business.id)}
                              className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 text-sm font-semibold transition-all"
                            >
                              ⬆️ Upgrade (${Math.floor(business.value * 0.5).toLocaleString()})
                            </button>
                            <button
                              onClick={() => handleSellBusiness(business.id)}
                              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 text-sm font-semibold transition-all"
                            >
                              💰 Sell (${Math.floor(business.value * (business.reputation / 100) * 1.2).toLocaleString()})
                            </button>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="mt-4 pt-4 border-t border-white/10 space-y-2 text-sm"
                              >
                                <p className="text-white/80">
                                  <span className="text-white/60">Business Type:</span> {businessTypes.find(t => t.id === business.type)?.name}
                                </p>
                                <p className="text-white/80">
                                  <span className="text-white/60">Estimated Sell Price:</span> ${Math.floor(business.value * (business.reputation / 100) * 1.2).toLocaleString()}
                                </p>
                                <p className="text-white/80">
                                  <span className="text-white/60">ROI:</span> {((business.revenue / business.value) * 100).toFixed(1)}% per year
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
