import { Theme } from '@/stores/themeStore';

export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`;
  return formattedTime;
};

export const getThemeFromLocalStorage = (): string | null => {
  const theme = localStorage.getItem('theme');
  if (!theme) return null;
  return theme;
};

export const isTheme = (theme: string | null): theme is Theme => {
  if (!theme) return false;
  return theme === 'dark' || theme === 'light';
};

export const setThemeToLocalStorage = (theme: Theme) => {
  localStorage.setItem('theme', theme);
};

export const getInitialThemeFromLocalStorage = (): Theme => {
  if (typeof window != 'undefined') {
    const theme = localStorage.getItem('theme');
    if (!theme) return 'dark';
    if (isTheme(theme)) {
      return theme;
    } else {
      return 'dark';
    }
  } else {
    return 'dark';
  }
};

export const getAudioDuration = (audioFile: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.src = URL.createObjectURL(audioFile);
    audio.addEventListener('loadedmetadata', () => {
      URL.revokeObjectURL(audio.src); // Освобождаем ресурсы
      resolve(audio.duration);
    });
    audio.addEventListener('error', reject);
  });
};
