'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Character, GameStats, DetailedRelationship } from '@/store/gameStore';
import { useSoundEffects } from '@/hooks/useSoundEffects';

interface CharacterCreationProps {
  onStart: (character: Character, stats: GameStats, initialRelationships?: DetailedRelationship[]) => void;
}

const locations = [
  { id: 'city', name: 'Bustling City', image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800' },
  { id: 'suburb', name: 'Quiet Suburb', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800' },
  { id: 'countryside', name: 'Rustic Countryside', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800' }
];

export default function CharacterCreation({ onStart }: CharacterCreationProps) {
  const { playButtonClick, playBirth, playTabSwitch } = useSoundEffects();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Non-binary'>('Male');
  const [location, setLocation] = useState('city');

  const handleStart = () => {
    if (!firstName || !lastName) {
      playButtonClick();
      alert('Please enter your name!');
      return;
    }

    playBirth();

    const character: Character = {
      name: `${firstName} ${lastName}`,
      gender: gender as 'Male' | 'Female',
      country: locations.find(l => l.id === location)?.name || 'City',
      city: locations.find(l => l.id === location)?.name || 'City',
    };

    const stats: GameStats = {
      happiness: 100,
      health: 100,
      smarts: Math.floor(Math.random() * 40) + 30,
      looks: Math.floor(Math.random() * 40) + 30,
      money: 0,
      age: 0,
    };

    // Create initial family relationships (mother and father)
    const motherNames = ['Emily', 'Sarah', 'Jennifer', 'Lisa', 'Mary', 'Patricia', 'Linda', 'Barbara', 'Elizabeth', 'Susan'];
    const fatherNames = ['Michael', 'James', 'David', 'John', 'Robert', 'William', 'Richard', 'Joseph', 'Thomas', 'Christopher'];

    const mother: DetailedRelationship = {
      id: Date.now().toString() + '_mother',
      name: `${motherNames[Math.floor(Math.random() * motherNames.length)]} ${lastName}`,
      type: 'parent',
      relationship: Math.floor(Math.random() * 30) + 70, // 70-100
      age: Math.floor(Math.random() * 15) + 25, // 25-40
      generosity: Math.floor(Math.random() * 100),
      craziness: Math.floor(Math.random() * 100),
      petulance: Math.floor(Math.random() * 100),
      alive: true,
    };

    const father: DetailedRelationship = {
      id: (Date.now() + 1).toString() + '_father',
      name: `${fatherNames[Math.floor(Math.random() * fatherNames.length)]} ${lastName}`,
      type: 'parent',
      relationship: Math.floor(Math.random() * 30) + 70, // 70-100
      age: Math.floor(Math.random() * 15) + 27, // 27-42
      generosity: Math.floor(Math.random() * 100),
      craziness: Math.floor(Math.random() * 100),
      petulance: Math.floor(Math.random() * 100),
      alive: true,
    };

    const initialRelationships = [mother, father];

    onStart(character, stats, initialRelationships);
  };

  return (
    <div className="relative min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#234836] px-4 sm:px-6 lg:px-10 py-3 fixed top-0 left-0 right-0 bg-[#11221a]/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3 sm:gap-4 text-white">
          <div className="size-5 sm:size-6">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_6_535)">
                <path clipRule="evenodd" d="M47.2426 24L24 47.2426L0.757355 24L24 0.757355L47.2426 24ZM12.2426 21H35.7574L24 9.24264L12.2426 21Z" fill="currentColor" fillRule="evenodd"></path>
              </g>
              <defs>
                <clipPath id="clip0_6_535">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-white text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em]">DreamLife</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-24 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Character Form */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div>
              <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">A New Life Awaits</p>
              <p className="text-[#92c9ad] text-base sm:text-lg font-normal leading-normal mt-2">Create your character and begin your journey.</p>
            </div>

            {/* Name Inputs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-end gap-4">
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">First Name</p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#32674d] bg-[#193326] h-14 placeholder:text-[#92c9ad] p-[15px] text-base font-normal leading-normal"
                  placeholder="e.g., Alex"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <p className="text-white text-base font-medium leading-normal pb-2">Last Name</p>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#32674d] bg-[#193326] h-14 placeholder:text-[#92c9ad] p-[15px] text-base font-normal leading-normal"
                  placeholder="e.g., Smith"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            {/* Gender Selection */}
            <div className="flex flex-col gap-2">
              <p className="text-white text-base font-medium leading-normal">Gender</p>
              <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-[#234836] p-1.5">
                <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-colors ${gender === 'Male' ? 'bg-[#11221a] shadow-[0_0_4px_rgba(0,0,0,0.1)] text-white' : 'text-[#92c9ad]'} text-sm font-medium leading-normal`}>
                  <span className="truncate">Male</span>
                  <input
                    className="invisible w-0"
                    name="gender-selection"
                    type="radio"
                    value="Male"
                    checked={gender === 'Male'}
                    onChange={() => {
                      playTabSwitch();
                      setGender('Male');
                    }}
                  />
                </label>
                <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-colors ${gender === 'Female' ? 'bg-[#11221a] shadow-[0_0_4px_rgba(0,0,0,0.1)] text-white' : 'text-[#92c9ad]'} text-sm font-medium leading-normal`}>
                  <span className="truncate">Female</span>
                  <input
                    className="invisible w-0"
                    name="gender-selection"
                    type="radio"
                    value="Female"
                    checked={gender === 'Female'}
                    onChange={() => {
                      playTabSwitch();
                      setGender('Female');
                    }}
                  />
                </label>
                <label className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-full px-2 transition-colors ${gender === 'Non-binary' ? 'bg-[#11221a] shadow-[0_0_4px_rgba(0,0,0,0.1)] text-white' : 'text-[#92c9ad]'} text-sm font-medium leading-normal`}>
                  <span className="truncate">Non-binary</span>
                  <input
                    className="invisible w-0"
                    name="gender-selection"
                    type="radio"
                    value="Non-binary"
                    checked={gender === 'Non-binary'}
                    onChange={() => {
                      playTabSwitch();
                      setGender('Non-binary' as any);
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Starting Location */}
            <div>
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">Starting Location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {locations.map((loc) => (
                  <label key={loc.id} className="relative cursor-pointer group">
                    <input
                      className="sr-only"
                      name="location"
                      type="radio"
                      value={loc.id}
                      checked={location === loc.id}
                      onChange={() => {
                        playTabSwitch();
                        setLocation(loc.id);
                      }}
                    />
                    <div
                      className={`overflow-hidden rounded-lg aspect-[4/3] ring-2 ${location === loc.id ? 'ring-primary' : 'ring-transparent'} bg-cover bg-center transition-all group-hover:opacity-90`}
                      style={{ backgroundImage: `url('${loc.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-3">
                        <h4 className="text-white font-bold">{loc.name}</h4>
                      </div>
                    </div>
                    <div className={`absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#11221a]/50 transition-all ${location === loc.id ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="material-symbols-outlined text-primary text-base">check</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <motion.button
                onClick={handleStart}
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-4 text-center text-lg font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Begin Your Journey
              </motion.button>
            </div>
          </div>

          {/* Right Column: Illustration Panel */}
          <div className="hidden lg:flex items-center justify-center p-4">
            <div
              className="w-full h-full min-h-[500px] rounded-xl bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200')" }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
}
