# 🌟 DreamLife - Life Simulator Game

**DreamLife** is a comprehensive life simulation game inspired by BitLife, where you make choices that shape your character's journey from birth to death. Live a virtual life, make important decisions, build careers, relationships, and create your unique story!

## 🎮 About

DreamLife allows you to experience life through a virtual character. Every decision matters - from your education and career choices to your relationships and lifestyle. Will you become a successful CEO, a renowned doctor, or start your own business empire? The choice is yours!

---

## ✨ Current Features

### 🎭 Core Gameplay
- **Character Creation** - Create your character with custom name, gender, and starting location
- **Age Progression** - Age up year by year with the "Age Up" button
- **Life Events** - Random events appear throughout your life (max 3 per year, 70% chance)
- **Event Choices** - Make decisions that affect your stats and life trajectory
- **Skip Events** - Close button (X) to skip events you don't want to answer

### 📊 Stats System
- **Happiness** (0-100) - Affected by life choices, relationships, and activities
- **Health** (0-100) - Impacts life expectancy, affected by activities and aging
- **Smarts** (0-100) - Influences job success, education, and opportunities
- **Looks** (0-100) - Affected by aging, gym, salon, and plastic surgery
- **Money** - Track your wealth, earn from jobs, spend on activities
- **Fame** (Optional) - For celebrity/politician paths

### 💼 Career & Education
- **17 Different Jobs** across multiple career paths
  - 💼 Entry Level: Cashier, Waiter, Janitor, Delivery Driver
  - 🏢 High School Required: Receptionist, Bank Teller, Sales Associate
  - 🎓 University Required: Software Engineer ($85k), Accountant ($65k), Teacher, Nurse ($70k), Marketing Manager, Architect
  - 📚 Graduate Required: Doctor ($200k), Lawyer ($150k), Professor, CEO ($300k)

- **Education System**
  - Automatic progression: Elementary → Middle → High School
  - **University** (Age 18+) - Choose from 20 majors
  - **Graduate School** (Age 22+) - Advanced degrees (MBA, Law, Medicine, PhD)

- **Job Features**
  - Apply for jobs (interview success based on Smarts)
  - Ask for raises (10% salary increase chance)
  - Quit jobs anytime
  - Major-specific job requirements

- **Entrepreneurship**
  - Start your own business ($50,000 startup cost)
  - Name your company
  - Become CEO with $100k+ salary

### ⚡ Activities Menu
- **Mind & Body**
  - Go to Gym (+10 Health, +5 Looks) - $50
  - Read a Book (+5 Smarts, +5 Happiness)
  - Meditate (+10 Happiness, +5 Health)

- **Salon & Spa**
  - Haircut (+5 Looks, +5 Happiness) - $30
  - Manicure (+3 Looks, +5 Happiness) - $40
  - Spa Day (+8 Looks, +15 Happiness, +5 Health) - $150

- **Plastic Surgery**
  - Botox (+10 Looks, -2 Health) - $500
  - Rhinoplasty (+20 Looks, -5 Health) - $5,000 (80% success)
  - Facelift (+25 Looks, -8 Health) - $8,000

- **Crime**
  - Pickpocket (70% success)
  - Shoplift (60% success)
  - Burglary (40% success)

- **Gambling**
  - Casino ($1,000 bet, 40% win)
  - Horse Racing ($500 bet, 30% win)
  - Lottery ($5 ticket, 0.1% jackpot)

- **Social Media**
  - Create Instagram
  - Post content (+Fame)

- **Pets**
  - Adopt Dog ($500)
  - Adopt Cat ($300)

- **Travel**
  - Hawaii Vacation ($3,000)
  - Luxury Cruise ($5,000)

- **Doctor**
  - General Checkup (+15 Health) - $200
  - Therapy (+20 Happiness, +5 Health) - $150

### 📜 Life History
- **Complete timeline** of all life events, activities, and milestones
- **Color-coded entries**: 🎭 Events, ⚡ Activities, 🏆 Milestones
- Shows age when each event occurred
- Beautiful modal interface

### 🎯 Visual Feedback
- **Real-time stat notifications** - See +10 Happiness, -5 Health instantly
- **Animated stat bars** - Smooth transitions when stats change
- **Color-coded notifications** - Green for gains, red for losses
- **Smooth animations** - Powered by Framer Motion

### 👥 Relationships
- Track relationships with family, friends, and pets
- Relationship percentage (0-100)
- View all relationships in stats panel

### 🎨 Beautiful UI
- Dreamy particle background
- Gradient color schemes
- Smooth animations and transitions
- Responsive design
- Modal popups for events and menus

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **UI Components**: Custom React components

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dreamlife.git
cd dreamlife

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit `http://localhost:3000` to play DreamLife!

---

## 🎯 Roadmap - Planned Features to Match BitLife

### 🏠 Property & Assets
- [ ] Buy houses, cars, and luxury items
- [ ] Property condition and value tracking
- [ ] Real estate investment
- [ ] Asset depreciation/appreciation

### 💑 Advanced Relationships
- [ ] Dating system with dating apps
- [ ] Marriage and divorce mechanics
- [ ] Have and raise children
- [ ] Family interactions (spend time, compliment, insult, argue)
- [ ] Relationship decay over time
- [ ] Death of relatives and aging

### 🎓 Enhanced Education
- [ ] Study harder mechanics
- [ ] Grade tracking and report cards
- [ ] Scholarships and financial aid
- [ ] Student loans
- [ ] Dropout options
- [ ] School clubs and extracurricular activities
- [ ] Bullying and school events

### 💼 Career Advancement
- [ ] Promotions based on performance
- [ ] Job performance reviews
- [ ] Office politics and workplace drama
- [ ] Fired/layoff events
- [ ] Resume builder
- [ ] Multiple job offers to choose from
- [ ] Part-time jobs for students
- [ ] Work harder option

### 🏥 Advanced Health System
- [ ] Random illness and disease events
- [ ] Doctor visits and treatments
- [ ] Hospital stays
- [ ] STD mechanics
- [ ] Addiction system (drugs, alcohol)
- [ ] Rehab and recovery centers
- [ ] Mental health tracking
- [ ] Gym membership system

### ⚖️ Legal System
- [ ] Lawsuits (sue or be sued)
- [ ] Prison/jail system
- [ ] Escape attempts
- [ ] Parole and probation
- [ ] Legal representation and lawyers
- [ ] Criminal record impact on jobs

### 🎪 Entertainment & Fame
- [ ] Actor/Musician career paths
- [ ] Social media influencer career
- [ ] Book deals and commercials
- [ ] Fame management system
- [ ] Scandals and PR disasters
- [ ] Fan interactions
- [ ] Paparazzi events

### 👑 Royalty Mode
- [ ] Be born into royalty
- [ ] Inherit throne
- [ ] Royal duties and responsibilities
- [ ] Execute subjects
- [ ] Abdicate option
- [ ] Royal family dynamics

### 🎲 Additional Features
- [ ] Custom life scenarios
- [ ] Challenge mode with specific goals
- [ ] **Achievements and ribbons** system
- [ ] Character legacy (play as your children)
- [ ] Time machine feature
- [ ] God mode
- [ ] Will/Testament system
- [ ] Inheritance mechanics
- [ ] Emigration to different countries

### 🌍 World Features
- [ ] Multiple countries to live in
- [ ] Immigration system
- [ ] Country-specific events and laws
- [ ] Different opportunities per country
- [ ] Currency conversion

### 💰 Financial System
- [ ] Bank accounts
- [ ] Investments (stocks, crypto, real estate)
- [ ] Loans and mortgages
- [ ] Credit cards and debt management
- [ ] Bankruptcy system
- [ ] Tax system
- [ ] Retirement funds and pensions

### 🎮 Mini-Games
- [ ] Memory test challenges
- [ ] License exams (driver's, pilot's)
- [ ] Interview simulations
- [ ] Gambling mini-games
- [ ] Sports and competition events

### 📱 More Activities
- [ ] Nightlife (clubs, bars)
- [ ] Volunteering and charity work
- [ ] Learning musical instruments
- [ ] Martial arts training
- [ ] Voice and acting lessons
- [ ] Library visits
- [ ] Zoo and museum trips
- [ ] Movie theater visits
- [ ] Vacation destinations worldwide

### 🎭 Events & Scenarios
- [ ] 500+ life events across all ages
- [ ] Childhood events (bullying, playground, school)
- [ ] Teen events (dating, peer pressure, parties)
- [ ] Adult events (marriage proposals, midlife crisis)
- [ ] Senior events (retirement, grandchildren)
- [ ] Random encounters
- [ ] Emergency situations

---

## 🎮 How to Play

1. **Create Your Character** - Choose name, gender, and location
2. **Age Up** - Click "⏰ Age Up" to progress through life
3. **Make Choices** - Respond to life events or skip them with ❌
4. **Build Your Career** - Go to university, apply for jobs, start businesses
5. **Do Activities** - Improve your stats through various activities
6. **Manage Money** - Earn from jobs, spend on activities and purchases
7. **Track Progress** - Check your history to see your life story
8. **Live Your Life** - Create your unique journey!

---

## 📂 Project Structure

```
dreamlife/
├── app/
│   └── page.tsx                    # Main game page
├── components/
│   ├── CharacterCreation.tsx       # Character creation screen
│   ├── DreamLifeStats.tsx          # Stats display
│   ├── EventPopup.tsx              # Life event modal
│   ├── ActivitiesMenu.tsx          # Activities selection
│   ├── CareerMenu.tsx              # Career & education
│   ├── HistoryPanel.tsx            # Life history
│   ├── DeathScreen.tsx             # End of life
│   ├── DreamyParticles.tsx         # Background effects
│   └── StatChangeNotification.tsx  # Stat change popups
├── store/
│   └── gameStore.ts                # Zustand state management
├── data/
│   └── events.json                 # Life events database
└── public/
    └── ...                         # Static assets
```

---

## 🎨 Game Balance

- Events appear with **70% chance** when aging up
- Maximum **3 events per year** to prevent overwhelming gameplay
- Stats properly **accumulate** (addition, not replacement)
- **Reduced aging penalties** for balanced progression
- **Smart-based success rates** for jobs and education
- **Realistic costs** for activities and purchases
- **Career progression** based on education and experience

---

## 🤝 Contributing

This project is actively being developed to match the full feature set of BitLife. Contributions, suggestions, and ideas are welcome!

---

## 📝 License

This project is for educational and personal use. Inspired by BitLife.

---

## 🙏 Credits

- **Inspired by**: BitLife - The popular mobile life simulator
- **Built with**: Modern web technologies
- **Created with ❤️** for life simulation enthusiasts

---

## 📞 Support

For questions, bugs, or feature requests, please create an issue in the repository.

---

**🌟 Live your dream life in DreamLife! 🌟**

*Making choices, building careers, creating stories - one year at a time.*
