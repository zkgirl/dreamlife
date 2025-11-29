'use client';

import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import DreamyParticles from './DreamyParticles';
import { useEmotionalTheme } from '@/hooks/useEmotionalTheme';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage?: 'dashboard' | 'activities' | 'career' | 'relationships' | 'assets';
}

export default function DashboardLayout({ children, currentPage = 'dashboard' }: DashboardLayoutProps) {
  const theme = useEmotionalTheme();

  return (
    <div
      className="min-h-screen flex relative transition-colors duration-1000"
      style={{ backgroundColor: theme.backgroundColor }}
    >
      <DreamyParticles />

      {/* Sidebar */}
      <Sidebar currentPage={currentPage} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-10">
        {children}
      </main>

      {/* Emotional overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`
        }}
      />
    </div>
  );
}
