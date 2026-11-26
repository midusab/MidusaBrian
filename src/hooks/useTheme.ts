import { useCallback, useEffect, useState } from 'react';
import { ThemeMode } from '../types/portfolio';

const THEME_STORAGE_KEY = 'midusa-theme';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'dark';
    const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
    if (theme === 'dark') {
      document.documentElement.style.backgroundColor = '#0B0D10';
      document.documentElement.style.color = '#F5F5F5';
    } else {
      document.documentElement.style.backgroundColor = '#FFFFFF';
      document.documentElement.style.color = '#0B0D10';
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
  };
}
