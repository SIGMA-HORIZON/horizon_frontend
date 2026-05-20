"use client";

import React from 'react';
import { useTheme } from './ThemeContext';
import { Icon } from '@/components/Icon';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme}
      className="btn-ghost"
      title={`Passer au mode ${theme === 'light' ? 'sombre' : 'clair'}`}
      style={{ 
        padding: '8px', 
        borderRadius: '8px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '40px',
        height: '40px'
      }}
    >
      <Icon 
        name={theme === 'light' ? 'moon' : 'sun'} 
        size={20} 
        strokeWidth={2} 
        style={{ color: 'var(--g1-muted)' }}
      />
    </button>
  );
};
