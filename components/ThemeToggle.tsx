"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Icon } from '@/components/Icon';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === 'light' ? 'sombre' : 'clair';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      title={`Passer au mode ${nextLabel}`}
      aria-label={`Passer au mode ${nextLabel}`}
      aria-pressed={theme === 'light'}
    >
      <Icon
        name={theme === 'light' ? 'moon' : 'sun'}
        size={20}
        strokeWidth={2}
      />
    </button>
  );
};
