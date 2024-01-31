'use client';
import React, { useEffect } from 'react';
import styles from './wrapper.module.scss';
import { useThemeStore } from '@/stores/themeStore';
import {
  getThemeFromLocalStorage,
  isTheme,
  setThemeToLocalStorage,
} from '@/utils';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useThemeStore((state) => state);

  useEffect(() => {
    const themeFromLocalStorage = getThemeFromLocalStorage();

    if (isTheme(themeFromLocalStorage)) {
      setTheme(themeFromLocalStorage);
      document.documentElement.setAttribute(
        'data-theme',
        themeFromLocalStorage,
      );
    } else {
      document.documentElement.setAttribute('data-theme', theme);
      setThemeToLocalStorage(theme);
    }
  }, []);

  return (
    <div id={'root'} className={styles.wrapper}>
      {children}
    </div>
  );
};

export default Wrapper;
