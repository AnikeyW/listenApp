'use client';
import React, { useEffect } from 'react';
import styles from './wrapper.module.scss';
import { useThemeStore } from '@/stores/themeStore';
import {
  getThemeFromLocalStorage,
  isTheme,
  setThemeToLocalStorage,
} from '@/utils';
import { usePlayerStore } from '@/stores/playerStore';
import Portal from '@/components/UI/Portal/Portal';
import ModalWithLayerEffect from '@/components/UI/ModalWithLayerEffect/ModalWithLayerEffect';
import PlayerFullScreen from '@/components/player/playerFullScreen/PlayerFullScreen';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme, setTheme } = useThemeStore((state) => state);
  const isShowPlayerFullScreen = usePlayerStore(
    (state) => state.isShowPlayerFullScreen,
  );
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );
  const setVolume = usePlayerStore((state) => state.setVolume);
  const y = useMotionValue(-200);
  const transform = useTransform(
    y,
    [-200, 0],
    ['translateY(0) scale(1)', 'translateY(32px) scale(0.96)'],
  );
  const borderRadius = useTransform(y, [-200, 0], ['0rem', '0.5rem']);

  useEffect(() => {
    const themeFromLocalStorage = getThemeFromLocalStorage();
    if (isTheme(themeFromLocalStorage)) {
      setVolume(Number(localStorage.getItem('volume')));
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
    <>
      <motion.div
        id={'root'}
        className={styles.wrapper}
        style={{ transform, transition: 'all linear 0.15s', borderRadius }}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        <Portal key={2}>
          <ModalWithLayerEffect
            y={y}
            isOpen={isShowPlayerFullScreen}
            onClose={() => setIsShowPlayerFullScreen(false)}
          >
            <PlayerFullScreen />
          </ModalWithLayerEffect>
        </Portal>
      </AnimatePresence>
    </>
  );
};

export default Wrapper;
