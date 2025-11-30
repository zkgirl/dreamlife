'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { showStatChange } from './StatChangeNotification';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface RelationshipsMenuProps {
  onClose: () => void;
}

const firstNames = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Harper', 'Skyler', 'Blake', 'Cameron', 'Drew', 'Emerson', 'Finley'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Wilson', 'Moore', 'Taylor', 'Thomas'];

export default function RelationshipsMenu({ onClose }: RelationshipsMenuProps) {
  const { stats, character, relationships, addRelationship, updateRelationship, removeRelationship, spendMoney, addMoney, updateStats, addHistory, unlockAchievement } = useGameStore();
  const { playButtonClick, playMenuClose, playTabSwitch, playNewRelationship, playBreakup, playGift, playArgument, playRelationshipIncrease, playRelationshipDecrease, playMoneyGain } = useSoundEffects();
  const [selectedTab, setSelectedTab] = useState<'all' | 'dating' | 'family' | 'friends'>('all');
  const [expandedRelId, setExpandedRelId] = useState<string | null>(null);

  const partner = relationships.find(r => r.type === 'spouse' || r.type === 'partner');
  const parents = relationships.filter(r => r.type === 'parent');
  const siblings = relationships.filter(r => r.type === 'sibling');
  const children = relationships.filter(r => r.type === 'child');
  const friends = relationships.filter(r => r.type === 'friend');
  const exes = relationships.filter(r => r.type === 'ex');

  const handleFindDate = () => {
    if (stats.age < 16) {
      playButtonClick();
      alert('You are too young to date!');
      return;
    }

    if (partner) {
      playButtonClick();
      alert('You are already in a relationship!');
      return;
    }

    if (!spendMoney(50)) {
      playButtonClick();
      alert('You need $50 to go on a date!');
      return;
    }

    playNewRelationship();

    const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${randomFirst} ${randomLast}`;

    const relationshipScore = Math.floor(Math.random() * 40) + 30; // 30-70

    addRelationship({
      id: Date.now().toString(),
      name,
      type: 'partner',
      relationship: relationshipScore,
      age: stats.age + Math.floor(Math.random() * 6) - 3, // Similar age
      generosity: Math.floor(Math.random() * 100),
      craziness: Math.floor(Math.random() * 100),
      petulance: Math.floor(Math.random() * 100),
      alive: true,
    });

    showStatChange('happiness', 15);
    updateStats({ happiness: 15 });
    addHistory('milestone', `Started dating ${name}`);
  };

  const handlePropose = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    if (stats.age < 18) {
      playButtonClick();
      alert('You are too young to get married!');
      return;
    }

    if (!spendMoney(5000)) {
      playButtonClick();
      alert('You need $5,000 for a wedding!');
      return;
    }

    if (rel.relationship < 70) {
      playButtonClick();
      alert(`${rel.name} said no! Your relationship isn't strong enough.`);
      showStatChange('happiness', -20);
      updateStats({ happiness: -20 });
      return;
    }

    playNewRelationship();

    updateRelationship(relId, { type: 'spouse' });
    showStatChange('happiness', 30);
    updateStats({ happiness: 30 });
    addHistory('milestone', `Married ${rel.name}!`);
    unlockAchievement('married');
  };

  const handleMakeLove = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    if (stats.age < 18) {
      playButtonClick();
      alert('You are too young!');
      return;
    }

    // Relationship bonding
    playRelationshipIncrease();
    const increase = Math.floor(Math.random() * 10) + 10; // 10-20
    updateRelationship(relId, { relationship: Math.min(100, rel.relationship + increase) });
    showStatChange('happiness', 20);
    updateStats({ happiness: 20 });
    addHistory('activity', `Had an intimate moment with ${rel.name}`);

    // Check for existing children count
    const existingChildren = children.length;

    // 30% chance of pregnancy (reduced if already have children)
    const baseChance = 0.3;
    const adjustedChance = Math.max(0.05, baseChance - (existingChildren * 0.05));
    const hasChild = Math.random() < adjustedChance;

    if (hasChild) {
      // Determine baby's gender randomly
      const isBoy = Math.random() > 0.5;
      const babyFirstName = isBoy
        ? ['Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Lucas', 'Benjamin', 'Henry', 'Alexander'][Math.floor(Math.random() * 10)]
        : ['Emma', 'Olivia', 'Ava', 'Sophia', 'Isabella', 'Charlotte', 'Amelia', 'Mia', 'Harper', 'Evelyn'][Math.floor(Math.random() * 10)];

      const babyName = `${babyFirstName} ${character?.name.split(' ')[1] || 'Smith'}`;

      // Add child relationship
      addRelationship({
        id: Date.now().toString(),
        name: babyName,
        type: 'child',
        relationship: 100, // Start with max bond
        age: 0,
        generosity: Math.floor(Math.random() * 100),
        craziness: Math.floor(Math.random() * 100),
        petulance: Math.floor(Math.random() * 100),
        alive: true,
      });

      playNewRelationship();
      showStatChange('happiness', 50);
      updateStats({ happiness: 50 });
      addHistory('milestone', `${babyName} was born!`);

      setTimeout(() => {
        alert(`🍼 Congratulations! ${rel.name} is pregnant!\n\nYou have a ${isBoy ? 'baby boy' : 'baby girl'}: ${babyName}! 👶`);
      }, 500);
    }
  };

  const handleBreakup = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    playBreakup();
    updateRelationship(relId, { type: 'ex', relationship: Math.max(0, rel.relationship - 50) });
    showStatChange('happiness', -15);
    updateStats({ happiness: -15 });
    addHistory('event', `Broke up with ${rel.name}`);
  };

  const handleSpendTime = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    playRelationshipIncrease();
    const increase = Math.floor(Math.random() * 10) + 5; // 5-15
    updateRelationship(relId, { relationship: Math.min(100, rel.relationship + increase) });
    showStatChange('happiness', 8);
    updateStats({ happiness: 8 });
    addHistory('activity', `Spent quality time with ${rel.name}`);
  };

  const handleConversation = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    playRelationshipIncrease();
    const increase = Math.floor(Math.random() * 5) + 3; // 3-8
    updateRelationship(relId, { relationship: Math.min(100, rel.relationship + increase) });
    showStatChange('happiness', 5);
    updateStats({ happiness: 5 });
    addHistory('activity', `Had a conversation with ${rel.name}`);
  };

  const handleCompliment = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    playRelationshipIncrease();
    const increase = Math.floor(Math.random() * 8) + 5; // 5-13
    updateRelationship(relId, { relationship: Math.min(100, rel.relationship + increase) });
    showStatChange('happiness', 3);
    updateStats({ happiness: 3 });
    addHistory('activity', `Complimented ${rel.name}`);
  };

  const handleGiveGift = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    const giftCost = rel.type === 'spouse' || rel.type === 'partner' ? 200 : 100;

    if (!spendMoney(giftCost)) {
      playButtonClick();
      alert(`You need $${giftCost} to buy a gift!`);
      return;
    }

    playGift();
    const increase = Math.floor(Math.random() * 15) + 10; // 10-25
    updateRelationship(relId, { relationship: Math.min(100, rel.relationship + increase) });
    showStatChange('happiness', 15);
    updateStats({ happiness: 15 });
    addHistory('activity', `Gave a gift to ${rel.name}`);
  };

  const handleAskForMoney = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    const generosity = rel.generosity || 50;
    const relationshipLevel = rel.relationship || 50;

    // Success chance based on generosity and relationship
    const successChance = (generosity * 0.5 + relationshipLevel * 0.5) / 100;

    if (Math.random() < successChance) {
      // Success - they give you money
      playMoneyGain();
      const amount = Math.floor(Math.random() * 500) + 100; // $100-$600
      addMoney(amount);
      showStatChange('money', amount);

      // Small relationship decrease
      const decrease = Math.floor(Math.random() * 5) + 2; // -2 to -7
      updateRelationship(relId, { relationship: Math.max(0, rel.relationship - decrease) });

      addHistory('activity', `${rel.name} gave you $${amount}`);
      alert(`💰 ${rel.name} gave you $${amount}!`);
    } else {
      // Failure - they refused
      playRelationshipDecrease();
      const decrease = Math.floor(Math.random() * 15) + 10; // -10 to -25
      updateRelationship(relId, { relationship: Math.max(0, rel.relationship - decrease) });
      showStatChange('happiness', -10);
      updateStats({ happiness: -10 });

      addHistory('event', `${rel.name} refused to give you money`);
      alert(`😞 ${rel.name} refused to give you money. They seem upset.`);
    }
  };

  const handleArgue = (relId: string) => {
    const rel = relationships.find(r => r.id === relId);
    if (!rel) return;

    playArgument();
    const decrease = Math.floor(Math.random() * 20) + 10; // -10 to -30
    updateRelationship(relId, { relationship: Math.max(0, rel.relationship - decrease) });
    showStatChange('happiness', -8);
    updateStats({ happiness: -8 });
    addHistory('event', `Had an argument with ${rel.name}`);
  };

  const handleMakeFriend = () => {
    playNewRelationship();
    const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${randomFirst} ${randomLast}`;

    addRelationship({
      id: Date.now().toString(),
      name,
      type: 'friend',
      relationship: Math.floor(Math.random() * 30) + 40, // 40-70
      age: stats.age + Math.floor(Math.random() * 10) - 5, // Similar age
      generosity: Math.floor(Math.random() * 100),
      craziness: Math.floor(Math.random() * 100),
      petulance: Math.floor(Math.random() * 100),
      alive: true,
    });

    showStatChange('happiness', 10);
    updateStats({ happiness: 10 });
    addHistory('event', `Made a new friend: ${name}`);
  };

  const handleAddSibling = () => {
    playNewRelationship();
    const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
    const name = `${randomFirst} ${character?.name.split(' ')[1] || 'Smith'}`;

    const ageOffset = Math.floor(Math.random() * 10) - 5; // -5 to +5 years
    const siblingAge = Math.max(0, stats.age + ageOffset);

    addRelationship({
      id: Date.now().toString(),
      name,
      type: 'sibling',
      relationship: Math.floor(Math.random() * 30) + 60, // 60-90
      age: siblingAge,
      generosity: Math.floor(Math.random() * 100),
      craziness: Math.floor(Math.random() * 100),
      petulance: Math.floor(Math.random() * 100),
      alive: true,
    });

    showStatChange('happiness', 15);
    updateStats({ happiness: 15 });
    addHistory('milestone', `${name} is now part of your family`);
  };

  const toggleExpanded = (relId: string) => {
    setExpandedRelId(expandedRelId === relId ? null : relId);
  };

  const renderRelationshipCard = (rel: any) => {
    const isExpanded = expandedRelId === rel.id;
    const canInteract = rel.type !== 'ex' && rel.alive;

    return (
      <motion.div
        key={rel.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#34495e] rounded-xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all"
      >
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg">{rel.name}</h3>
              <p className="text-[#92c9ad] text-sm capitalize flex items-center gap-2">
                {rel.type}
                {rel.age && <span className="text-white/60">• Age {rel.age}</span>}
                {!rel.alive && <span className="text-red-400">• Deceased</span>}
              </p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-xl">{rel.relationship}%</p>
              <p className="text-white/60 text-xs">Bond</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700/50 rounded-full h-2 mb-3">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(rel.relationship, 100)}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>

          {/* Attributes (if expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-3 border-t border-white/10 pt-3 mt-3"
              >
                <div className="grid grid-cols-3 gap-2 text-center">
                  {typeof rel.generosity === 'number' && (
                    <div>
                      <p className="text-xs text-white/60">Generosity</p>
                      <p className="text-sm font-bold text-green-400">{rel.generosity}%</p>
                    </div>
                  )}
                  {typeof rel.craziness === 'number' && (
                    <div>
                      <p className="text-xs text-white/60">Craziness</p>
                      <p className="text-sm font-bold text-orange-400">{rel.craziness}%</p>
                    </div>
                  )}
                  {typeof rel.petulance === 'number' && (
                    <div>
                      <p className="text-xs text-white/60">Petulance</p>
                      <p className="text-sm font-bold text-red-400">{rel.petulance}%</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
            <button
              onClick={() => {
                playButtonClick();
                toggleExpanded(rel.id);
              }}
              className="w-full sm:w-auto px-3 py-1.5 bg-white/10 text-white rounded-full hover:bg-white/20 text-xs font-semibold transition-all"
            >
              {isExpanded ? '👁️ Hide' : '👁️ Details'}
            </button>

            {canInteract && (
              <>
                <button
                  onClick={() => {
                    playButtonClick();
                    handleSpendTime(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-primary/20 text-primary rounded-full hover:bg-primary/30 text-xs font-semibold transition-all"
                >
                  ⏰ Spend Time
                </button>
                <button
                  onClick={() => {
                    playButtonClick();
                    handleConversation(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 text-xs font-semibold transition-all"
                >
                  💬 Chat
                </button>
                <button
                  onClick={() => {
                    playButtonClick();
                    handleCompliment(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-yellow-500/20 text-yellow-400 rounded-full hover:bg-yellow-500/30 text-xs font-semibold transition-all"
                >
                  ⭐ Compliment
                </button>
                <button
                  onClick={() => {
                    playButtonClick();
                    handleGiveGift(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 text-xs font-semibold transition-all"
                >
                  🎁 Gift (${rel.type === 'spouse' || rel.type === 'partner' ? '200' : '100'})
                </button>
                <button
                  onClick={() => {
                    playButtonClick();
                    handleAskForMoney(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 text-xs font-semibold transition-all"
                >
                  💰 Ask Money
                </button>
                <button
                  onClick={() => {
                    playButtonClick();
                    handleArgue(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 text-xs font-semibold transition-all"
                >
                  😠 Argue
                </button>
              </>
            )}

            {(rel.type === 'partner' || rel.type === 'spouse') && (
              <>
                {rel.type === 'partner' && (
                  <button
                    onClick={() => {
                      playButtonClick();
                      handlePropose(rel.id);
                    }}
                    className="w-full sm:w-auto px-3 py-1.5 bg-pink-500/20 text-pink-400 rounded-full hover:bg-pink-500/30 text-xs font-semibold transition-all"
                  >
                    💍 Propose ($5,000)
                  </button>
                )}
                <button
                  onClick={() => {
                    playButtonClick();
                    handleMakeLove(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-rose-500/20 text-rose-400 rounded-full hover:bg-rose-500/30 text-xs font-semibold transition-all"
                >
                  💕 Make Love
                </button>
                <button
                  onClick={() => {
                    playButtonClick();
                    handleBreakup(rel.id);
                  }}
                  className="w-full sm:w-auto px-3 py-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 text-xs font-semibold transition-all"
                >
                  💔 Break Up
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

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
          className="bg-[#2c3e50] border border-primary/30 rounded-xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col animate-glow"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 sm:px-6 py-4 bg-gradient-to-r from-[#34495e] to-[#2c3e50]">
            <h1 className="text-white text-xl sm:text-2xl font-bold">❤️ Relationships</h1>
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

          {/* Tabs */}
          <div className="flex border-b border-white/10 px-4 sm:px-6 overflow-x-auto">
            {[
              { id: 'all', label: 'All', icon: '👥' },
              { id: 'dating', label: 'Dating', icon: '💕' },
              { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
              { id: 'friends', label: 'Friends', icon: '👫' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (selectedTab !== tab.id) {
                    playTabSwitch();
                  }
                  setSelectedTab(tab.id as any);
                }}
                className={`px-3 sm:px-4 py-3 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                  selectedTab === tab.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {selectedTab === 'all' && (
              <div className="space-y-6">
                {/* Partner */}
                {partner && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                      💑 Partner
                    </h2>
                    {renderRelationshipCard(partner)}
                  </div>
                )}

                {/* Parents */}
                {parents.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                      👨‍👩 Parents
                    </h2>
                    <div className="space-y-2">
                      {parents.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                {/* Siblings */}
                {siblings.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                      👫 Siblings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {siblings.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                {/* Friends */}
                {friends.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                      👥 Friends ({friends.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {friends.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                {/* Children */}
                {children.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                      👶 Children
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {children.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                {/* Exes */}
                {exes.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3 flex items-center gap-2">
                      💔 Exes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exes.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="border-t border-white/10 pt-6">
                  <h2 className="text-white text-lg font-bold mb-3">Quick Actions</h2>
                  <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
                    <motion.button
                      onClick={() => {
                        playButtonClick();
                        handleMakeFriend();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-bold hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      👋 Make a New Friend
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        playButtonClick();
                        handleAddSibling();
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-full font-bold hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      👫 Add Sibling
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'dating' && (
              <div className="space-y-4">
                <div className="bg-[#34495e] rounded-xl p-4 sm:p-6 border border-white/10 text-center">
                  <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">💕 Find Love</h2>
                  <p className="text-white/60 text-sm sm:text-base mb-4">
                    {stats.age < 16
                      ? 'You are too young to date (min age: 16)'
                      : partner
                      ? `You are already dating ${partner.name}`
                      : 'Looking for someone special?'}
                  </p>
                  {!partner && stats.age >= 16 && (
                    <button
                      onClick={handleFindDate}
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full font-bold hover:shadow-lg hover:shadow-pink-500/50 transition-all text-sm sm:text-base"
                    >
                      🌹 Find a Date ($50)
                    </button>
                  )}
                </div>

                {partner && renderRelationshipCard(partner)}

                {exes.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3">Past Relationships</h2>
                    <div className="space-y-2">
                      {exes.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTab === 'family' && (
              <div className="space-y-6">
                {parents.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3">👨‍👩 Parents</h2>
                    <div className="space-y-2">
                      {parents.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                {siblings.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3">👫 Siblings</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {siblings.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                {children.length > 0 && (
                  <div>
                    <h2 className="text-white text-xl font-bold mb-3">👶 Children</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {children.map(renderRelationshipCard)}
                    </div>
                  </div>
                )}

                <div className="border-t border-white/10 pt-4">
                  <motion.button
                    onClick={handleAddSibling}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-400 text-white rounded-full font-bold hover:shadow-lg transition-all"
                  >
                    👫 Add Sibling
                  </motion.button>
                </div>
              </div>
            )}

            {selectedTab === 'friends' && (
              <div className="space-y-6">
                {friends.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {friends.map(renderRelationshipCard)}
                  </div>
                )}

                <div className="border-t border-white/10 pt-4">
                  <motion.button
                    onClick={handleMakeFriend}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-bold hover:shadow-lg transition-all"
                  >
                    👋 Make a New Friend
                  </motion.button>
                </div>

                {friends.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-white/60 text-lg mb-4">You haven't made any friends yet</p>
                    <p className="text-white/40 text-sm">Click the button above to make your first friend!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
