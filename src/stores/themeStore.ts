import { create } from 'zustand';
import {
  getInitialThemeFromLocalStorage,
  setThemeToLocalStorage,
} from '@/utils';

export type Theme = 'dark' | 'light';

interface IThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<IThemeState>()((set, getState) => ({
  theme: getInitialThemeFromLocalStorage() || 'dark',
  toggleTheme: () => {
    if (getState().theme === 'dark') {
      set({ theme: 'light' });
      setThemeToLocalStorage('light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      set({ theme: 'dark' });
      setThemeToLocalStorage('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  },
  setTheme: (theme) => {
    set({ theme });
  },
}));
