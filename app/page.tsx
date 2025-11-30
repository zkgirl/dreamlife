'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import CharacterCreation from '@/components/CharacterCreation';
import DashboardStats from '@/components/DashboardStats';
import DashboardLayout from '@/components/DashboardLayout';
import DeathScreen from '@/components/DeathScreen';
import DreamyParticles from '@/components/DreamyParticles';
import ActivitiesMenu from '@/components/ActivitiesMenu';
import CareerMenu from '@/components/CareerMenu';
import EducationMenu from '@/components/EducationMenu';
import RelationshipsMenu from '@/components/RelationshipsMenu';
import BusinessMenu from '@/components/BusinessMenu';
import ShoppingMenu from '@/components/ShoppingMenu';
import AssetsMenu from '@/components/AssetsMenu';
import SettingsMenu from '@/components/SettingsMenu';
import EventPopup from '@/components/EventPopup';
import StatChangeNotification, { showStatChange } from '@/components/StatChangeNotification';
import BackgroundMusic from '@/components/BackgroundMusic';

import eventsData from '@/data/events.json';

export default function Home() {
  const {
    character,
    stats,
    gameStarted,
    gameEnded,
    isDead,
    causeOfDeath,
    currentEvent,
    job,
    education,
    relationships,
    showActivitiesMenu,
    showCareerMenu,
    showEducationMenu,
    educationMenuLevel,
    showRelationshipsMenu,
    showBusinessMenu,
    showShoppingMenu,
    showAssetsMenu,
    showSettingsMenu,
    showHistory,
    eventsThisYear,
    createCharacter,
    setCurrentEvent,
    updateStats,
    advanceYear,
    setJob,
    setEducation,
    addRelationship,
    updateRelationship,
    removeRelationship,
    addAsset,
    addCrime,
    spendMoney,
    addMoney,
    resetGame,
    toggleActivitiesMenu,
    toggleCareerMenu,
    toggleEducationMenu,
    toggleRelationshipsMenu,
    toggleBusinessMenu,
    toggleShoppingMenu,
    toggleAssetsMenu,
    toggleSettingsMenu,
    toggleHistory,
    addHistory,
    incrementEventCount,
  } = useGameStore();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  // Get next event based on age and conditions
  const getNextEvent = () => {
    // Auto education progression
    if (stats.age === 6) {
      setEducation({ level: 'elementary', graduated: false });
    } else if (stats.age === 11) {
      setEducation({ level: 'middle', graduated: false });
    } else if (stats.age === 14) {
      setEducation({ level: 'high', graduated: false });
    }

    // Filter events based on conditions
    const availableEvents = eventsData.filter((event: any) => {
      // Age range check
      if (event.ageRange) {
        const [minAge, maxAge] = event.ageRange;
        if (stats.age < minAge || stats.age > maxAge) return false;
      }

      // Education requirement
      if (event.requireEducation && education.level !== event.requireEducation) {
        return false;
      }

      // Job requirement
      if (event.requireJob && !job) return false;

      // Relationship requirement
      if (event.requireRelationship) {
        const hasRelType = relationships.some(r => r.type === event.requireRelationship);
        if (!hasRelType) return false;
      }

      return true;
    });

    if (availableEvents.length === 0) {
      // Generic year event
      return {
        id: 'year_passed',
        text: `Another year has passed. You are now ${stats.age} years old.`,
        choices: [
          {
            text: 'Continue',
            effects: {}
          }
        ]
      };
    }

    // Random event
    return availableEvents[Math.floor(Math.random() * availableEvents.length)];
  };

  // Initialize first event ONLY when game starts (not on every currentEvent change)
  useEffect(() => {
    if (gameStarted && !currentEvent && !gameEnded && stats.age === 0) {
      const firstEvent = getNextEvent();
      setCurrentEvent(firstEvent);
      setShowEventPopup(true);
      incrementEventCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStarted, gameEnded]);

  // Handle choice
  const handleChoice = async (choice: any) => {
    console.log('handleChoice called with:', choice);
    setIsTransitioning(true);
    setShowEventPopup(false);

    // Add to history
    if (currentEvent) {
      addHistory('event', `${currentEvent.text} - Chose: ${choice.text}`);
    }

    // Check money requirement
    if (choice.requireMoney && stats.money < choice.requireMoney) {
      setIsTransitioning(false);
      setShowEventPopup(true);
      return;
    }

    // Apply basic stat effects
    if (choice.effects) {
      // Show notifications for each stat change
      Object.entries(choice.effects).forEach(([stat, value]) => {
        if (typeof value === 'number') {
          showStatChange(stat, value);
        }
      });
      updateStats(choice.effects);
    }

    // Handle job offer
    if (choice.jobOffer) {
      setJob({
        id: Date.now().toString(),
        title: choice.jobOffer.title,
        salary: choice.jobOffer.salary,
        yearsWorked: 0,
      });
    }

    // Handle salary increase
    if (choice.salaryIncrease && job) {
      setJob({
        ...job,
        salary: job.salary + choice.salaryIncrease,
      });
    }

    // Handle job removal
    if (choice.jobRemove) {
      setJob(null);
    }

    // Handle education update
    if (choice.educationUpdate) {
      setEducation({
        level: choice.educationUpdate.level,
        major: choice.educationUpdate.major,
        graduated: false,
      });
    }

    // Handle relationship add
    if (choice.relationshipAdd) {
      addRelationship({
        id: Date.now().toString(),
        name: choice.relationshipAdd.name || 'New Person',
        type: choice.relationshipAdd.type,
        relationship: 50,
        alive: true,
      });
    }

    // Handle relationship update
    if (choice.relationshipUpdate && relationships.length > 0) {
      const firstRel = relationships[0];
      updateRelationship(firstRel.id, choice.relationshipUpdate);
    }

    // Handle relationship remove
    if (choice.relationshipRemove && relationships.length > 0) {
      const firstRel = relationships[0];
      removeRelationship(firstRel.id);
    }

    // Handle asset add
    if (choice.assetAdd && spendMoney(choice.requireMoney || 0)) {
      addAsset({
        id: Date.now().toString(),
        type: choice.assetAdd.type,
        name: choice.assetAdd.name,
        value: choice.assetAdd.value,
        yearPurchased: stats.age,
      });
    }

    // Handle crime
    if (choice.crimeAdd) {
      addCrime(choice.crimeAdd);
      // Arrest chance
      if (choice.arrestChance && Math.random() < choice.arrestChance) {
        updateStats({ happiness: -20, money: -1000 });
      }
    }

    // Handle gambling
    if (choice.gambleWin) {
      if (Math.random() < choice.gambleWin) {
        addMoney(choice.gambleAmount || 0);
      }
    }

    // Handle business
    if (choice.businessSuccess) {
      if (Math.random() < choice.businessSuccess) {
        addMoney(100000);
        updateStats({ happiness: 30 });
      } else {
        updateStats({ happiness: -20 });
      }
    }

    // Wait for animations
    await new Promise(resolve => setTimeout(resolve, 800));

    // Clear current event (don't show another event automatically)
    setCurrentEvent(null);

    setIsTransitioning(false);
  };

  // Handle age up (separate from events)
  const handleAgeUp = async () => {
    setIsTransitioning(true);

    // Advance age
    advanceYear();

    // Add milestone to history
    addHistory('milestone', `Turned ${stats.age + 1} years old`);

    // Wait for animations
    await new Promise(resolve => setTimeout(resolve, 800));

    // Only show event if we haven't reached the limit (max 3 per year)
    // eventsThisYear was reset to 0 when we aged up
    // 70% chance of event when aging up
    const shouldShowEvent = Math.random() < 0.7 && eventsThisYear < 3;

    if (shouldShowEvent) {
      const nextEvent = getNextEvent();
      setCurrentEvent(nextEvent);
      setShowEventPopup(true);
      incrementEventCount();
    }

    setIsTransitioning(false);
  };

  // Handle dismissing event without answering
  const handleDismissEvent = () => {
    console.log('handleDismissEvent called');
    setShowEventPopup(false);
    setCurrentEvent(null);
    addHistory('event', 'Ignored a life event');
  };

  // Character creation
  if (!gameStarted || !character) {
    return (
      <main className="relative">
        <DreamyParticles />
        <CharacterCreation onStart={createCharacter} />
      </main>
    );
  }

  // Death screen
  if (gameEnded && isDead) {
    return (
      <main className="relative">
        <DreamyParticles />
        <DeathScreen
          age={stats.age}
          causeOfDeath={causeOfDeath || 'Unknown cause'}
          money={stats.money}
          onRestart={resetGame}
        />
      </main>
    );
  }

  // Main game
  return (
    <DashboardLayout>
      {/* Background Music */}
      <BackgroundMusic />

      {/* Dashboard Stats */}
      <DashboardStats
        onAgeUp={handleAgeUp}
        isTransitioning={isTransitioning}
        currentEvent={currentEvent}
      />

      {/* Event Popup */}
      <EventPopup
        event={currentEvent}
        money={stats.money}
        onChoice={handleChoice}
        onDismiss={handleDismissEvent}
        isVisible={showEventPopup && !isTransitioning}
      />

      {/* Career Menu */}
      <AnimatePresence>
        {showCareerMenu && (
          <CareerMenu onClose={toggleCareerMenu} />
        )}
      </AnimatePresence>

      {/* Activities Menu */}
      <AnimatePresence>
        {showActivitiesMenu && (
          <ActivitiesMenu onClose={toggleActivitiesMenu} />
        )}
      </AnimatePresence>

      {/* Education Menu */}
      <AnimatePresence>
        {showEducationMenu && educationMenuLevel && (
          <EducationMenu onClose={() => toggleEducationMenu(null)} level={educationMenuLevel} />
        )}
      </AnimatePresence>

      {/* Relationships Menu */}
      <AnimatePresence>
        {showRelationshipsMenu && (
          <RelationshipsMenu onClose={toggleRelationshipsMenu} />
        )}
      </AnimatePresence>

      {/* Business Menu */}
      <AnimatePresence>
        {showBusinessMenu && (
          <BusinessMenu onClose={toggleBusinessMenu} />
        )}
      </AnimatePresence>

      {/* Shopping Menu */}
      <AnimatePresence>
        {showShoppingMenu && (
          <ShoppingMenu onClose={toggleShoppingMenu} />
        )}
      </AnimatePresence>

      {/* Assets Menu */}
      <AnimatePresence>
        {showAssetsMenu && (
          <AssetsMenu onClose={toggleAssetsMenu} />
        )}
      </AnimatePresence>

      {/* Settings Menu */}
      <AnimatePresence>
        {showSettingsMenu && (
          <SettingsMenu onClose={toggleSettingsMenu} />
        )}
      </AnimatePresence>


      {/* Stat Change Notifications */}
      <StatChangeNotification />
    </DashboardLayout>
  );
}
