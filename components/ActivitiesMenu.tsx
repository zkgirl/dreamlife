'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';
import { useState } from 'react';
import { showStatChange } from './StatChangeNotification';

interface ActivitiesMenuProps {
  onClose: () => void;
}

const activityCategories = [
  {
    id: 'mind-body',
    name: 'Mind & Body',
    icon: 'psychology',
    description: 'Improve your well-being'
  },
  {
    id: 'salon',
    name: 'Salon & Spa',
    icon: 'content_cut',
    description: 'Enhance your appearance'
  },
  {
    id: 'surgery',
    name: 'Plastic Surgery',
    icon: 'syringe',
    description: 'Drastic appearance changes'
  },
  {
    id: 'crime',
    name: 'Crime',
    icon: 'masks',
    description: 'High-risk, high-reward'
  },
  {
    id: 'gambling',
    name: 'Gambling',
    icon: 'casino',
    description: 'Test your luck'
  },
  {
    id: 'social-media',
    name: 'Social Media',
    icon: 'thumb_up',
    description: 'Manage your online presence'
  },
  {
    id: 'pets',
    name: 'Pets',
    icon: 'pets',
    description: 'Adopt and care for animals'
  },
  {
    id: 'travel',
    name: 'Travel',
    icon: 'flight_takeoff',
    description: 'Explore the world'
  },
  {
    id: 'doctor',
    name: 'Doctor',
    icon: 'stethoscope',
    description: 'Seek medical attention'
  },
  {
    id: 'education',
    name: 'Education',
    icon: 'school',
    description: 'Further your learning'
  },
];

export default function ActivitiesMenu({ onClose }: ActivitiesMenuProps) {
  const { stats, education, updateStats, addMoney, spendMoney, addPet, addSocialMedia, addActivity, addHistory, addCrime, toggleEducationMenu } = useGameStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    // Check age restrictions
    if (categoryId === 'mind-body') {
      if (stats.age < 5) {
        alert('You are too young for these activities! (Minimum age: 5)');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'salon') {
      if (stats.age < 13) {
        alert('You are too young for the salon! (Minimum age: 13)');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'surgery') {
      if (stats.age < 18) {
        alert('You must be 18 or older for plastic surgery!');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'crime') {
      if (stats.age < 16) {
        alert('You are too young for criminal activities! (Minimum age: 16)');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'gambling') {
      if (stats.age < 18) {
        alert('You must be 18 or older to gamble!');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'social-media') {
      if (stats.age < 13) {
        alert('You are too young for social media! (Minimum age: 13)');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'pets') {
      if (stats.age < 10) {
        alert('You are too young to adopt a pet! (Minimum age: 10)');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'travel') {
      if (stats.age < 16) {
        alert('You are too young to travel alone! (Minimum age: 16)');
        return;
      }
      setSelectedCategory(categoryId);
    } else if (categoryId === 'doctor') {
      setSelectedCategory(categoryId);
    } else if (categoryId === 'education') {
      setSelectedCategory(categoryId);
    }
  };

  const renderMindBodyActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Mind & Body</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (stats.age < 14) {
              alert('You must be 14 or older to go to the gym!');
              return;
            }
            if (spendMoney(50)) {
              showStatChange('health', 10);
              showStatChange('looks', 5);
              updateStats({ health: 10, looks: 5 });
              addHistory('activity', 'Went to the gym');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Go to the Gym</h3>
              <p className="text-[#92c9ad] text-sm">+10 Health, +5 Looks • Age 14+</p>
            </div>
            <span className="text-primary font-bold">$50</span>
          </div>
        </button>

        <button
          onClick={() => {
            showStatChange('smarts', 5);
            showStatChange('happiness', 5);
            updateStats({ smarts: 5, happiness: 5 });
            addHistory('activity', 'Read a book');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Read a Book</h3>
            <p className="text-[#92c9ad] text-sm">+5 Smarts, +5 Happiness</p>
          </div>
        </button>

        <button
          onClick={() => {
            showStatChange('happiness', 10);
            showStatChange('health', 5);
            updateStats({ happiness: 10, health: 5 });
            addHistory('activity', 'Meditated');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Meditate</h3>
            <p className="text-[#92c9ad] text-sm">+10 Happiness, +5 Health</p>
          </div>
        </button>

        <button
          onClick={() => {
            if (stats.age < 10) {
              alert('You must be 10 or older to practice yoga!');
              return;
            }
            if (spendMoney(30)) {
              showStatChange('health', 8);
              showStatChange('happiness', 8);
              updateStats({ health: 8, happiness: 8 });
              addHistory('activity', 'Practiced yoga');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Practice Yoga</h3>
              <p className="text-[#92c9ad] text-sm">+8 Health, +8 Happiness • Age 10+</p>
            </div>
            <span className="text-primary font-bold">$30</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (stats.age < 8) {
              alert('You must be 8 or older to go running!');
              return;
            }
            showStatChange('health', 12);
            showStatChange('looks', 3);
            updateStats({ health: 12, looks: 3 });
            addHistory('activity', 'Went for a run');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Go Running</h3>
            <p className="text-[#92c9ad] text-sm">+12 Health, +3 Looks • Age 8+ • Free</p>
          </div>
        </button>

        <button
          onClick={() => {
            if (stats.age < 12) {
              alert('You must be 12 or older to play sports!');
              return;
            }
            if (spendMoney(40)) {
              showStatChange('health', 15);
              showStatChange('happiness', 10);
              updateStats({ health: 15, happiness: 10 });
              addHistory('activity', 'Played sports');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Play Sports</h3>
              <p className="text-[#92c9ad] text-sm">+15 Health, +10 Happiness • Age 12+</p>
            </div>
            <span className="text-primary font-bold">$40</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderSalonActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Salon & Spa</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (spendMoney(30)) {
              showStatChange('looks', 5);
              showStatChange('happiness', 5);
              updateStats({ looks: 5, happiness: 5 });
              addHistory('activity', 'Got a fresh haircut');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Get a Haircut</h3>
              <p className="text-[#92c9ad] text-sm">+5 Looks, +5 Happiness</p>
            </div>
            <span className="text-primary font-bold">$30</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(50)) {
              showStatChange('looks', 8);
              showStatChange('happiness', 8);
              updateStats({ looks: 8, happiness: 8 });
              addHistory('activity', 'Got a manicure and pedicure');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Manicure & Pedicure</h3>
              <p className="text-[#92c9ad] text-sm">+8 Looks, +8 Happiness</p>
            </div>
            <span className="text-primary font-bold">$50</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(150)) {
              showStatChange('looks', 12);
              showStatChange('happiness', 15);
              showStatChange('health', 5);
              updateStats({ looks: 12, happiness: 15, health: 5 });
              addHistory('activity', 'Enjoyed a spa day');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Full Spa Day</h3>
              <p className="text-[#92c9ad] text-sm">+12 Looks, +15 Happiness, +5 Health</p>
            </div>
            <span className="text-primary font-bold">$150</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(80)) {
              showStatChange('looks', 10);
              showStatChange('happiness', 6);
              updateStats({ looks: 10, happiness: 6 });
              addHistory('activity', 'Got a facial treatment');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Facial Treatment</h3>
              <p className="text-[#92c9ad] text-sm">+10 Looks, +6 Happiness</p>
            </div>
            <span className="text-primary font-bold">$80</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderSurgeryActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Plastic Surgery</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (spendMoney(5000)) {
              showStatChange('looks', 20);
              showStatChange('health', -5);
              updateStats({ looks: 20, health: -5 });
              addHistory('activity', 'Got a nose job');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Nose Job (Rhinoplasty)</h3>
              <p className="text-[#92c9ad] text-sm">+20 Looks, -5 Health</p>
            </div>
            <span className="text-primary font-bold">$5,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(2000)) {
              showStatChange('looks', 10);
              showStatChange('health', -2);
              updateStats({ looks: 10, health: -2 });
              addHistory('activity', 'Got Botox injections');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Botox</h3>
              <p className="text-[#92c9ad] text-sm">+10 Looks, -2 Health</p>
            </div>
            <span className="text-primary font-bold">$2,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(8000)) {
              showStatChange('looks', 25);
              showStatChange('health', -8);
              updateStats({ looks: 25, health: -8 });
              addHistory('activity', 'Got a facelift');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Facelift</h3>
              <p className="text-[#92c9ad] text-sm">+25 Looks, -8 Health</p>
            </div>
            <span className="text-primary font-bold">$8,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(3000)) {
              showStatChange('looks', 15);
              showStatChange('health', -4);
              updateStats({ looks: 15, health: -4 });
              addHistory('activity', 'Got lip fillers');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Lip Fillers</h3>
              <p className="text-[#92c9ad] text-sm">+15 Looks, -4 Health</p>
            </div>
            <span className="text-primary font-bold">$3,000</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderCrimeActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6 text-red-400">Crime</h2>
      <p className="text-white/60 text-sm mb-4">⚠️ Warning: Criminal activities have risks!</p>
      <div className="space-y-3">
        <button
          onClick={() => {
            const caught = Math.random() < 0.2;
            if (caught) {
              showStatChange('happiness', -20);
              showStatChange('money', -500);
              updateStats({ happiness: -20 });
              spendMoney(500);
              addHistory('activity', 'Attempted shoplifting but got caught!');
            } else {
              addMoney(200);
              showStatChange('money', 200);
              showStatChange('happiness', 5);
              updateStats({ happiness: 5 });
              addCrime('Shoplifting');
              addHistory('activity', 'Successfully shoplifted (+$200)');
            }
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-red-900/20 border border-red-500/30 hover:bg-red-900/30 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Shoplifting</h3>
              <p className="text-red-300 text-sm">20% arrest chance • +$200</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            const caught = Math.random() < 0.3;
            if (caught) {
              showStatChange('happiness', -30);
              showStatChange('money', -2000);
              updateStats({ happiness: -30 });
              spendMoney(2000);
              addHistory('activity', 'Attempted burglary but got caught!');
            } else {
              addMoney(1500);
              showStatChange('money', 1500);
              showStatChange('happiness', -10);
              updateStats({ happiness: -10 });
              addCrime('Burglary');
              addHistory('activity', 'Committed burglary (+$1,500)');
            }
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-red-900/20 border border-red-500/30 hover:bg-red-900/30 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Burglary</h3>
              <p className="text-red-300 text-sm">30% arrest chance • +$1,500</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            const caught = Math.random() < 0.15;
            if (caught) {
              showStatChange('happiness', -15);
              showStatChange('money', -1000);
              updateStats({ happiness: -15 });
              spendMoney(1000);
              addHistory('activity', 'Got caught pickpocketing!');
            } else {
              addMoney(500);
              showStatChange('money', 500);
              addCrime('Pickpocketing');
              addHistory('activity', 'Pickpocketed someone (+$500)');
            }
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-red-900/20 border border-red-500/30 hover:bg-red-900/30 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Pickpocketing</h3>
              <p className="text-red-300 text-sm">15% arrest chance • +$500</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => {
            const caught = Math.random() < 0.5;
            if (caught) {
              showStatChange('happiness', -40);
              showStatChange('money', -5000);
              updateStats({ happiness: -40 });
              spendMoney(5000);
              addHistory('activity', 'Grand theft auto - got arrested!');
            } else {
              addMoney(10000);
              showStatChange('money', 10000);
              showStatChange('happiness', -20);
              updateStats({ happiness: -20 });
              addCrime('Grand Theft Auto');
              addHistory('activity', 'Stole a car (+$10,000)');
            }
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-red-900/20 border border-red-500/30 hover:bg-red-900/30 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Grand Theft Auto</h3>
              <p className="text-red-300 text-sm">50% arrest chance • +$10,000</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );

  const renderGamblingActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Gambling</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (spendMoney(1000)) {
              if (Math.random() < 0.4) {
                addMoney(2500);
                showStatChange('money', 2500);
                showStatChange('happiness', 20);
                updateStats({ happiness: 20 });
                addHistory('activity', 'Won at the casino! (+$2,500)');
              } else {
                showStatChange('happiness', -10);
                updateStats({ happiness: -10 });
                addHistory('activity', 'Lost $1,000 at the casino');
              }
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Casino</h3>
              <p className="text-[#92c9ad] text-sm">40% win chance • Win $2,500</p>
            </div>
            <span className="text-primary font-bold">$1,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(50)) {
              if (Math.random() < 0.01) {
                addMoney(50000);
                showStatChange('money', 50000);
                showStatChange('happiness', 50);
                updateStats({ happiness: 50 });
                addHistory('activity', 'WON THE LOTTERY! (+$50,000)');
              } else {
                showStatChange('happiness', -5);
                updateStats({ happiness: -5 });
                addHistory('activity', 'Bought a lottery ticket - no luck');
              }
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Buy Lottery Ticket</h3>
              <p className="text-[#92c9ad] text-sm">1% win chance • Win $50,000</p>
            </div>
            <span className="text-primary font-bold">$50</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(500)) {
              if (Math.random() < 0.5) {
                addMoney(1200);
                showStatChange('money', 1200);
                showStatChange('happiness', 15);
                updateStats({ happiness: 15 });
                addHistory('activity', 'Won sports bet! (+$1,200)');
              } else {
                showStatChange('happiness', -8);
                updateStats({ happiness: -8 });
                addHistory('activity', 'Lost $500 on sports betting');
              }
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Sports Betting</h3>
              <p className="text-[#92c9ad] text-sm">50% win chance • Win $1,200</p>
            </div>
            <span className="text-primary font-bold">$500</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(200)) {
              if (Math.random() < 0.3) {
                addMoney(800);
                showStatChange('money', 800);
                showStatChange('happiness', 10);
                updateStats({ happiness: 10 });
                addHistory('activity', 'Won at poker! (+$800)');
              } else {
                showStatChange('happiness', -6);
                updateStats({ happiness: -6 });
                addHistory('activity', 'Lost $200 playing poker');
              }
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Play Poker</h3>
              <p className="text-[#92c9ad] text-sm">30% win chance • Win $800</p>
            </div>
            <span className="text-primary font-bold">$200</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderPetsActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Adopt a Pet</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (spendMoney(500)) {
              addPet({
                id: Date.now().toString(),
                name: 'Buddy',
                species: 'Dog',
                breed: 'Golden Retriever',
                age: 0,
                health: 100,
                happiness: 100,
              });
              showStatChange('happiness', 15);
              updateStats({ happiness: 15 });
              addHistory('activity', 'Adopted a dog named Buddy');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🐕 Adopt a Dog</h3>
              <p className="text-[#92c9ad] text-sm">+15 Happiness • Golden Retriever</p>
            </div>
            <span className="text-primary font-bold">$500</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(300)) {
              addPet({
                id: Date.now().toString(),
                name: 'Whiskers',
                species: 'Cat',
                breed: 'Persian',
                age: 0,
                health: 100,
                happiness: 100,
              });
              showStatChange('happiness', 12);
              updateStats({ happiness: 12 });
              addHistory('activity', 'Adopted a cat named Whiskers');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🐈 Adopt a Cat</h3>
              <p className="text-[#92c9ad] text-sm">+12 Happiness • Persian</p>
            </div>
            <span className="text-primary font-bold">$300</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(100)) {
              addPet({
                id: Date.now().toString(),
                name: 'Tweety',
                species: 'Bird',
                breed: 'Parakeet',
                age: 0,
                health: 100,
                happiness: 100,
              });
              showStatChange('happiness', 8);
              updateStats({ happiness: 8 });
              addHistory('activity', 'Adopted a bird named Tweety');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🦜 Adopt a Bird</h3>
              <p className="text-[#92c9ad] text-sm">+8 Happiness • Parakeet</p>
            </div>
            <span className="text-primary font-bold">$100</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(50)) {
              addPet({
                id: Date.now().toString(),
                name: 'Goldie',
                species: 'Fish',
                breed: 'Goldfish',
                age: 0,
                health: 100,
                happiness: 100,
              });
              showStatChange('happiness', 5);
              updateStats({ happiness: 5 });
              addHistory('activity', 'Adopted a fish named Goldie');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🐠 Adopt a Fish</h3>
              <p className="text-[#92c9ad] text-sm">+5 Happiness • Goldfish</p>
            </div>
            <span className="text-primary font-bold">$50</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderTravelActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Travel Destinations</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (spendMoney(3000)) {
              showStatChange('happiness', 30);
              showStatChange('health', 10);
              updateStats({ happiness: 30, health: 10 });
              addHistory('activity', 'Took a vacation to Hawaii');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🏝️ Hawaii</h3>
              <p className="text-[#92c9ad] text-sm">+30 Happiness, +10 Health</p>
            </div>
            <span className="text-primary font-bold">$3,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(5000)) {
              showStatChange('happiness', 35);
              showStatChange('smarts', 10);
              updateStats({ happiness: 35, smarts: 10 });
              addHistory('activity', 'Traveled to Paris, France');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🗼 Paris, France</h3>
              <p className="text-[#92c9ad] text-sm">+35 Happiness, +10 Smarts</p>
            </div>
            <span className="text-primary font-bold">$5,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(4000)) {
              showStatChange('happiness', 32);
              showStatChange('smarts', 8);
              updateStats({ happiness: 32, smarts: 8 });
              addHistory('activity', 'Visited Tokyo, Japan');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🗾 Tokyo, Japan</h3>
              <p className="text-[#92c9ad] text-sm">+32 Happiness, +8 Smarts</p>
            </div>
            <span className="text-primary font-bold">$4,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(2000)) {
              showStatChange('happiness', 25);
              showStatChange('health', 15);
              updateStats({ happiness: 25, health: 15 });
              addHistory('activity', 'Explored the Caribbean');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🏖️ Caribbean Cruise</h3>
              <p className="text-[#92c9ad] text-sm">+25 Happiness, +15 Health</p>
            </div>
            <span className="text-primary font-bold">$2,000</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(6000)) {
              showStatChange('happiness', 40);
              showStatChange('smarts', 12);
              updateStats({ happiness: 40, smarts: 12 });
              addHistory('activity', 'Safari adventure in Africa');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">🦁 African Safari</h3>
              <p className="text-[#92c9ad] text-sm">+40 Happiness, +12 Smarts</p>
            </div>
            <span className="text-primary font-bold">$6,000</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderDoctorActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Medical Care</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (spendMoney(200)) {
              showStatChange('health', 15);
              updateStats({ health: 15 });
              addHistory('activity', 'Had a medical checkup');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">General Checkup</h3>
              <p className="text-[#92c9ad] text-sm">+15 Health</p>
            </div>
            <span className="text-primary font-bold">$200</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(500)) {
              showStatChange('health', 30);
              updateStats({ health: 30 });
              addHistory('activity', 'Received medical treatment');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Medical Treatment</h3>
              <p className="text-[#92c9ad] text-sm">+30 Health</p>
            </div>
            <span className="text-primary font-bold">$500</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(50)) {
              showStatChange('health', 5);
              updateStats({ health: 5 });
              addHistory('activity', 'Got vaccinated');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Get Vaccinated</h3>
              <p className="text-[#92c9ad] text-sm">+5 Health</p>
            </div>
            <span className="text-primary font-bold">$50</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(1000)) {
              showStatChange('health', 50);
              updateStats({ health: 50 });
              addHistory('activity', 'Had surgery');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Surgery</h3>
              <p className="text-[#92c9ad] text-sm">+50 Health</p>
            </div>
            <span className="text-primary font-bold">$1,000</span>
          </div>
        </button>
      </div>
    </div>
  );

  const renderSocialMediaActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Social Media</h2>
      <div className="space-y-3">
        <button
          onClick={() => {
            addSocialMedia('Instagram');
            showStatChange('happiness', 5);
            updateStats({ happiness: 5 });
            addHistory('activity', 'Created an Instagram account');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Create Instagram Account</h3>
            <p className="text-[#92c9ad] text-sm">+5 Happiness</p>
          </div>
        </button>

        <button
          onClick={() => {
            addSocialMedia('TikTok');
            showStatChange('happiness', 8);
            updateStats({ happiness: 8 });
            addHistory('activity', 'Created a TikTok account');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Create TikTok Account</h3>
            <p className="text-[#92c9ad] text-sm">+8 Happiness</p>
          </div>
        </button>

        <button
          onClick={() => {
            addSocialMedia('YouTube');
            showStatChange('happiness', 6);
            updateStats({ happiness: 6 });
            addHistory('activity', 'Created a YouTube channel');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Create YouTube Channel</h3>
            <p className="text-[#92c9ad] text-sm">+6 Happiness</p>
          </div>
        </button>

        <button
          onClick={() => {
            addSocialMedia('Twitter');
            showStatChange('happiness', 4);
            updateStats({ happiness: 4 });
            addHistory('activity', 'Created a Twitter/X account');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Create Twitter/X Account</h3>
            <p className="text-[#92c9ad] text-sm">+4 Happiness</p>
          </div>
        </button>
      </div>
    </div>
  );

  const renderEducationActivities = () => (
    <div className="p-6">
      <button
        onClick={() => setSelectedCategory(null)}
        className="mb-4 text-[#92c9ad] hover:text-primary flex items-center gap-2"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Back
      </button>
      <h2 className="text-white text-2xl font-bold mb-6">Education</h2>
      <p className="text-white/60 mb-4">Education progresses automatically with age. Use this for extra learning!</p>
      <div className="space-y-3">
        <button
          onClick={() => {
            if (spendMoney(100)) {
              showStatChange('smarts', 10);
              updateStats({ smarts: 10 });
              addHistory('activity', 'Took an online course');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Take Online Course</h3>
              <p className="text-[#92c9ad] text-sm">+10 Smarts</p>
            </div>
            <span className="text-primary font-bold">$100</span>
          </div>
        </button>

        <button
          onClick={() => {
            if (spendMoney(500)) {
              showStatChange('smarts', 20);
              updateStats({ smarts: 20 });
              addHistory('activity', 'Attended a workshop');
              onClose();
            }
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-white font-bold">Attend Workshop</h3>
              <p className="text-[#92c9ad] text-sm">+20 Smarts</p>
            </div>
            <span className="text-primary font-bold">$500</span>
          </div>
        </button>

        <button
          onClick={() => {
            showStatChange('smarts', 8);
            updateStats({ smarts: 8 });
            addHistory('activity', 'Studied at the library');
            onClose();
          }}
          className="w-full text-left p-4 rounded-lg bg-[#193326]/50 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <div>
            <h3 className="text-white font-bold">Study at Library</h3>
            <p className="text-[#92c9ad] text-sm">+8 Smarts • Free</p>
          </div>
        </button>

        {/* University */}
        <button
          onClick={() => {
            if (stats.age < 18) {
              alert('You must be at least 18 years old to attend university!');
              return;
            }
            if (education.level === 'university' || education.level === 'graduate') {
              alert('You have already completed or are currently in university!');
              return;
            }
            toggleEducationMenu('university');
            onClose();
          }}
          disabled={stats.age < 18 || education.level === 'university' || education.level === 'graduate'}
          className={`w-full text-left p-4 rounded-lg border transition-colors ${
            stats.age < 18 || education.level === 'university' || education.level === 'graduate'
              ? 'bg-gray-700/50 border-gray-600 opacity-50 cursor-not-allowed'
              : 'bg-[#193326]/50 border-white/10 hover:bg-white/5'
          }`}
        >
          <div>
            <h3 className="text-white font-bold">🎓 Attend University</h3>
            <p className="text-[#92c9ad] text-sm">
              {stats.age < 18
                ? `Unlocks at age 18 (${18 - stats.age} years)`
                : education.level === 'university' || education.level === 'graduate'
                ? 'Already completed'
                : 'Choose your major • Age 18+'}
            </p>
          </div>
        </button>

        {/* Graduate School */}
        <button
          onClick={() => {
            if (stats.age < 22) {
              alert('You must be at least 22 years old to attend graduate school!');
              return;
            }
            if (education.level !== 'university' && education.level !== 'graduate') {
              alert('You must complete university first!');
              return;
            }
            if (education.level === 'graduate') {
              alert('You have already completed or are currently in graduate school!');
              return;
            }
            toggleEducationMenu('graduate');
            onClose();
          }}
          disabled={stats.age < 22 || (education.level !== 'university' && education.level !== 'graduate') || education.level === 'graduate'}
          className={`w-full text-left p-4 rounded-lg border transition-colors ${
            stats.age < 22 || (education.level !== 'university' && education.level !== 'graduate') || education.level === 'graduate'
              ? 'bg-gray-700/50 border-gray-600 opacity-50 cursor-not-allowed'
              : 'bg-[#193326]/50 border-white/10 hover:bg-white/5'
          }`}
        >
          <div>
            <h3 className="text-white font-bold">📚 Attend Graduate School</h3>
            <p className="text-[#92c9ad] text-sm">
              {stats.age < 22
                ? `Unlocks at age 22 (${22 - stats.age} years)`
                : education.level !== 'university' && education.level !== 'graduate'
                ? 'Requires university degree'
                : education.level === 'graduate'
                ? 'Already completed'
                : 'Advanced degrees • Age 22+'}
            </p>
          </div>
        </button>
      </div>
    </div>
  );

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
          className="bg-[#2c3e50] border border-white/10 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h1 className="text-white text-2xl font-bold">
              {selectedCategory ? 'Activities' : 'Activities'}
            </h1>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-white">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {selectedCategory === 'mind-body' ? (
              renderMindBodyActivities()
            ) : selectedCategory === 'salon' ? (
              renderSalonActivities()
            ) : selectedCategory === 'surgery' ? (
              renderSurgeryActivities()
            ) : selectedCategory === 'crime' ? (
              renderCrimeActivities()
            ) : selectedCategory === 'gambling' ? (
              renderGamblingActivities()
            ) : selectedCategory === 'pets' ? (
              renderPetsActivities()
            ) : selectedCategory === 'travel' ? (
              renderTravelActivities()
            ) : selectedCategory === 'doctor' ? (
              renderDoctorActivities()
            ) : selectedCategory === 'social-media' ? (
              renderSocialMediaActivities()
            ) : selectedCategory === 'education' ? (
              renderEducationActivities()
            ) : (
              <div className="p-6">
                <h1 className="text-white text-3xl font-bold mb-6">Activities</h1>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {activityCategories.map((category) => (
                    <motion.div
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="flex flex-1 gap-3 rounded-lg border border-white/10 bg-[#193326]/50 p-4 flex-col cursor-pointer hover:bg-white/5 hover:border-white/20 transition-all transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="material-symbols-outlined text-primary text-3xl">{category.icon}</span>
                      <div className="flex flex-col gap-1 mt-1">
                        <h2 className="text-white text-base font-bold leading-tight">{category.name}</h2>
                        <p className="text-[#92c9ad] text-sm font-normal leading-normal">{category.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer with Age Up Button */}
          <div className="border-t border-white/10 p-6 flex justify-center">
            <button
              onClick={onClose}
              className="w-full max-w-xs rounded-full h-14 px-5 bg-primary text-background-dark text-lg font-bold hover:bg-green-300 transition-colors transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
