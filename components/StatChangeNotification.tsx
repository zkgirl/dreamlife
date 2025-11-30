'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { soundManager } from '@/utils/soundManager';

interface StatChange {
  id: string;
  stat: string;
  change: number;
  icon: string;
}

let notificationQueue: StatChange[] = [];
let addToQueue: ((change: StatChange) => void) | null = null;

export function showStatChange(stat: string, change: number) {
  if (change === 0) return;

  const icons: { [key: string]: string } = {
    happiness: '😊',
    health: '💪',
    smarts: '🧠',
    looks: '✨',
    money: '💰',
    fame: '⭐',
  };

  const notification: StatChange = {
    id: Date.now().toString() + Math.random(),
    stat: stat.charAt(0).toUpperCase() + stat.slice(1),
    change,
    icon: icons[stat.toLowerCase()] || '📊',
  };

  if (addToQueue) {
    addToQueue(notification);
  }
}

export default function StatChangeNotification() {
  const [notifications, setNotifications] = useState<StatChange[]>([]);

  useEffect(() => {
    addToQueue = (change: StatChange) => {
      setNotifications((prev) => [...prev, change]);
      
      // Play appropriate sound based on stat change
      if (change.change > 0) {
        if (change.stat.toLowerCase() === 'money') {
          soundManager.play('money_gain');
        } else {
          soundManager.play('stat_increase');
        }
      } else {
        if (change.stat.toLowerCase() === 'money') {
          soundManager.play('money_loss');
        } else {
          soundManager.play('stat_decrease');
        }
      }
      
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== change.id));
      }, 2000);
    };

    return () => {
      addToQueue = null;
    };
  }, []);

  return (
    <div className="fixed top-20 sm:top-24 right-2 sm:right-4 z-50 space-y-2 pointer-events-none max-w-[calc(100vw-1rem)]">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg font-bold text-white text-sm sm:text-base ${
              notification.change > 0
                ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                : 'bg-gradient-to-r from-red-500 to-rose-600'
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl flex-shrink-0">{notification.icon}</span>
              <span className="truncate">
                {notification.change > 0 ? '+' : ''}
                {notification.change} {notification.stat}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
