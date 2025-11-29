// Education majors and their corresponding career paths

export interface EducationMajor {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiredSmarts: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
}

export interface CareerPath {
  title: string;
  icon: string;
  baseSalary: number;
  maxSalary: number;
  requiredMajor?: string[]; // If undefined, no major required
  requiredEducation: 'high' | 'university' | 'graduate';
  category: string;
  minAge: number;
}

// University Majors
export const universityMajors: EducationMajor[] = [
  {
    id: 'computer_science',
    name: 'Computer Science',
    icon: '💻',
    description: 'Programming, algorithms, and software development',
    requiredSmarts: 60,
    difficulty: 'Hard',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    description: 'Design and build systems and structures',
    requiredSmarts: 65,
    difficulty: 'Hard',
  },
  {
    id: 'medicine',
    name: 'Medicine (Pre-Med)',
    icon: '🏥',
    description: 'Prepare for medical school and healthcare',
    requiredSmarts: 70,
    difficulty: 'Very Hard',
  },
  {
    id: 'business',
    name: 'Business Administration',
    icon: '💼',
    description: 'Management, finance, and entrepreneurship',
    requiredSmarts: 50,
    difficulty: 'Medium',
  },
  {
    id: 'law',
    name: 'Pre-Law',
    icon: '⚖️',
    description: 'Prepare for law school and legal career',
    requiredSmarts: 65,
    difficulty: 'Hard',
  },
  {
    id: 'psychology',
    name: 'Psychology',
    icon: '🧠',
    description: 'Study of human behavior and mental processes',
    requiredSmarts: 55,
    difficulty: 'Medium',
  },
  {
    id: 'education',
    name: 'Education',
    icon: '📚',
    description: 'Teaching and educational administration',
    requiredSmarts: 50,
    difficulty: 'Medium',
  },
  {
    id: 'nursing',
    name: 'Nursing',
    icon: '👨‍⚕️',
    description: 'Patient care and healthcare services',
    requiredSmarts: 60,
    difficulty: 'Hard',
  },
  {
    id: 'arts',
    name: 'Arts & Humanities',
    icon: '🎨',
    description: 'Creative arts, literature, and culture',
    requiredSmarts: 45,
    difficulty: 'Easy',
  },
  {
    id: 'communications',
    name: 'Communications',
    icon: '📢',
    description: 'Media, journalism, and public relations',
    requiredSmarts: 50,
    difficulty: 'Medium',
  },
];

// Graduate School Majors
export const graduateMajors: EducationMajor[] = [
  {
    id: 'mba',
    name: 'MBA (Business)',
    icon: '💼',
    description: 'Master of Business Administration',
    requiredSmarts: 65,
    difficulty: 'Hard',
  },
  {
    id: 'medical_degree',
    name: 'Doctor of Medicine (MD)',
    icon: '🩺',
    description: 'Become a licensed physician',
    requiredSmarts: 80,
    difficulty: 'Very Hard',
  },
  {
    id: 'law_degree',
    name: 'Juris Doctor (JD)',
    icon: '⚖️',
    description: 'Law degree to practice as attorney',
    requiredSmarts: 75,
    difficulty: 'Very Hard',
  },
  {
    id: 'phd_engineering',
    name: 'PhD Engineering',
    icon: '⚙️',
    description: 'Advanced research in engineering',
    requiredSmarts: 75,
    difficulty: 'Very Hard',
  },
  {
    id: 'phd_cs',
    name: 'PhD Computer Science',
    icon: '💻',
    description: 'Research in computer science',
    requiredSmarts: 75,
    difficulty: 'Very Hard',
  },
  {
    id: 'masters_education',
    name: 'Master of Education',
    icon: '📚',
    description: 'Advanced teaching credentials',
    requiredSmarts: 60,
    difficulty: 'Medium',
  },
];

// Career Paths with Education Requirements
export const careerPaths: CareerPath[] = [
  // No degree required
  {
    title: 'Cashier',
    icon: '🏪',
    baseSalary: 25000,
    maxSalary: 35000,
    requiredEducation: 'high',
    category: 'Retail',
    minAge: 16,
  },
  {
    title: 'Fast Food Worker',
    icon: '🍔',
    baseSalary: 22000,
    maxSalary: 30000,
    requiredEducation: 'high',
    category: 'Food Service',
    minAge: 16,
  },
  {
    title: 'Warehouse Worker',
    icon: '📦',
    baseSalary: 30000,
    maxSalary: 45000,
    requiredEducation: 'high',
    category: 'Logistics',
    minAge: 18,
  },
  {
    title: 'Delivery Driver',
    icon: '🚚',
    baseSalary: 35000,
    maxSalary: 50000,
    requiredEducation: 'high',
    category: 'Transportation',
    minAge: 18,
  },

  // Computer Science Careers
  {
    title: 'Junior Software Developer',
    icon: '💻',
    baseSalary: 65000,
    maxSalary: 85000,
    requiredMajor: ['computer_science', 'engineering'],
    requiredEducation: 'university',
    category: 'Technology',
    minAge: 22,
  },
  {
    title: 'Software Engineer',
    icon: '💻',
    baseSalary: 90000,
    maxSalary: 150000,
    requiredMajor: ['computer_science', 'engineering'],
    requiredEducation: 'university',
    category: 'Technology',
    minAge: 22,
  },
  {
    title: 'Data Scientist',
    icon: '📊',
    baseSalary: 95000,
    maxSalary: 160000,
    requiredMajor: ['computer_science', 'engineering'],
    requiredEducation: 'university',
    category: 'Technology',
    minAge: 22,
  },
  {
    title: 'AI/ML Engineer',
    icon: '🤖',
    baseSalary: 120000,
    maxSalary: 200000,
    requiredMajor: ['phd_cs', 'computer_science'],
    requiredEducation: 'graduate',
    category: 'Technology',
    minAge: 26,
  },

  // Engineering Careers
  {
    title: 'Mechanical Engineer',
    icon: '⚙️',
    baseSalary: 70000,
    maxSalary: 110000,
    requiredMajor: ['engineering'],
    requiredEducation: 'university',
    category: 'Engineering',
    minAge: 22,
  },
  {
    title: 'Civil Engineer',
    icon: '🏗️',
    baseSalary: 68000,
    maxSalary: 105000,
    requiredMajor: ['engineering'],
    requiredEducation: 'university',
    category: 'Engineering',
    minAge: 22,
  },
  {
    title: 'Electrical Engineer',
    icon: '⚡',
    baseSalary: 75000,
    maxSalary: 120000,
    requiredMajor: ['engineering'],
    requiredEducation: 'university',
    category: 'Engineering',
    minAge: 22,
  },
  {
    title: 'Chief Engineer',
    icon: '⚙️',
    baseSalary: 110000,
    maxSalary: 180000,
    requiredMajor: ['phd_engineering', 'engineering'],
    requiredEducation: 'graduate',
    category: 'Engineering',
    minAge: 30,
  },

  // Medical Careers
  {
    title: 'Registered Nurse',
    icon: '👨‍⚕️',
    baseSalary: 65000,
    maxSalary: 95000,
    requiredMajor: ['nursing'],
    requiredEducation: 'university',
    category: 'Healthcare',
    minAge: 22,
  },
  {
    title: 'Physician',
    icon: '🩺',
    baseSalary: 180000,
    maxSalary: 350000,
    requiredMajor: ['medical_degree'],
    requiredEducation: 'graduate',
    category: 'Healthcare',
    minAge: 28,
  },
  {
    title: 'Surgeon',
    icon: '🏥',
    baseSalary: 250000,
    maxSalary: 500000,
    requiredMajor: ['medical_degree'],
    requiredEducation: 'graduate',
    category: 'Healthcare',
    minAge: 32,
  },

  // Business Careers
  {
    title: 'Business Analyst',
    icon: '💼',
    baseSalary: 60000,
    maxSalary: 90000,
    requiredMajor: ['business', 'economics'],
    requiredEducation: 'university',
    category: 'Business',
    minAge: 22,
  },
  {
    title: 'Marketing Manager',
    icon: '📊',
    baseSalary: 70000,
    maxSalary: 120000,
    requiredMajor: ['business', 'communications'],
    requiredEducation: 'university',
    category: 'Business',
    minAge: 24,
  },
  {
    title: 'Senior Manager',
    icon: '💼',
    baseSalary: 95000,
    maxSalary: 160000,
    requiredMajor: ['mba', 'business'],
    requiredEducation: 'graduate',
    category: 'Business',
    minAge: 28,
  },
  {
    title: 'CEO',
    icon: '👔',
    baseSalary: 200000,
    maxSalary: 1000000,
    requiredMajor: ['mba', 'business'],
    requiredEducation: 'graduate',
    category: 'Business',
    minAge: 35,
  },

  // Legal Careers
  {
    title: 'Paralegal',
    icon: '⚖️',
    baseSalary: 45000,
    maxSalary: 70000,
    requiredMajor: ['law'],
    requiredEducation: 'university',
    category: 'Legal',
    minAge: 22,
  },
  {
    title: 'Attorney',
    icon: '⚖️',
    baseSalary: 85000,
    maxSalary: 180000,
    requiredMajor: ['law_degree'],
    requiredEducation: 'graduate',
    category: 'Legal',
    minAge: 25,
  },
  {
    title: 'Senior Partner (Law)',
    icon: '⚖️',
    baseSalary: 250000,
    maxSalary: 800000,
    requiredMajor: ['law_degree'],
    requiredEducation: 'graduate',
    category: 'Legal',
    minAge: 35,
  },

  // Education Careers
  {
    title: 'Elementary Teacher',
    icon: '📚',
    baseSalary: 45000,
    maxSalary: 70000,
    requiredMajor: ['education'],
    requiredEducation: 'university',
    category: 'Education',
    minAge: 22,
  },
  {
    title: 'High School Teacher',
    icon: '🏫',
    baseSalary: 50000,
    maxSalary: 75000,
    requiredMajor: ['education'],
    requiredEducation: 'university',
    category: 'Education',
    minAge: 22,
  },
  {
    title: 'Principal',
    icon: '🎓',
    baseSalary: 85000,
    maxSalary: 120000,
    requiredMajor: ['masters_education', 'education'],
    requiredEducation: 'graduate',
    category: 'Education',
    minAge: 30,
  },

  // Psychology Careers
  {
    title: 'School Counselor',
    icon: '🧠',
    baseSalary: 50000,
    maxSalary: 75000,
    requiredMajor: ['psychology'],
    requiredEducation: 'university',
    category: 'Healthcare',
    minAge: 22,
  },
  {
    title: 'Clinical Psychologist',
    icon: '🧠',
    baseSalary: 70000,
    maxSalary: 120000,
    requiredMajor: ['psychology'],
    requiredEducation: 'graduate',
    category: 'Healthcare',
    minAge: 26,
  },

  // Arts Careers
  {
    title: 'Graphic Designer',
    icon: '🎨',
    baseSalary: 45000,
    maxSalary: 75000,
    requiredMajor: ['arts'],
    requiredEducation: 'university',
    category: 'Creative',
    minAge: 22,
  },
  {
    title: 'Art Director',
    icon: '🎨',
    baseSalary: 70000,
    maxSalary: 120000,
    requiredMajor: ['arts'],
    requiredEducation: 'university',
    category: 'Creative',
    minAge: 25,
  },

  // Communications Careers
  {
    title: 'Journalist',
    icon: '📰',
    baseSalary: 40000,
    maxSalary: 70000,
    requiredMajor: ['communications'],
    requiredEducation: 'university',
    category: 'Media',
    minAge: 22,
  },
  {
    title: 'Public Relations Manager',
    icon: '📢',
    baseSalary: 60000,
    maxSalary: 110000,
    requiredMajor: ['communications', 'business'],
    requiredEducation: 'university',
    category: 'Media',
    minAge: 24,
  },
];

// Helper functions
export function getMajorById(id: string): EducationMajor | undefined {
  return [...universityMajors, ...graduateMajors].find(m => m.id === id);
}

export function getAvailableCareers(education: string, major?: string): CareerPath[] {
  return careerPaths.filter(career => {
    // Check education level
    if (education === 'high' && career.requiredEducation !== 'high') return false;
    if (education === 'university' && career.requiredEducation === 'graduate') return false;

    // Check major requirement
    if (career.requiredMajor && major) {
      return career.requiredMajor.includes(major);
    }

    // If no major required, allow
    return !career.requiredMajor;
  });
}

export function canApplyForCareer(career: CareerPath, education: string, major?: string): boolean {
  // Check education level
  if (education === 'high' && career.requiredEducation !== 'high') return false;
  if (education === 'university' && (career.requiredEducation === 'graduate')) return false;
  if (education !== 'graduate' && career.requiredEducation === 'graduate') return false;

  // Check major requirement
  if (career.requiredMajor) {
    if (!major) return false;
    return career.requiredMajor.includes(major);
  }

  return true;
}
