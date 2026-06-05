"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  root.classList.toggle('light-theme', theme === 'light');
  document.body.classList.toggle('light-theme', theme === 'light');
  localStorage.setItem('horizon-theme', theme);
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('horizon-theme') as Theme | null;
    const initial: Theme =
      savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : window.matchMedia('(prefers-color-scheme: light)').matches
          ? 'light'
          : 'dark';
    setTheme(initial);
    applyThemeToDocument(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyThemeToDocument(theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
