'use client';
import React, { FC, useRef, TouchEvent, useEffect } from 'react';
import styles from './PlayerFullScreen.module.scss';
import { usePlayerStore } from '@/stores/playerStore';
import Content from '@/components/player/playerFullScreen/content/Content';

const PlayerFullScreen: FC = () => {
  const isShowPlayerFullScreen = usePlayerStore(
    (state) => state.isShowPlayerFullScreen,
  );
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );
  const ref = useRef<any>(null);
  let startY: number;
  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    startY = e.touches[0].clientY;
    if (ref.current) {
      ref.current.addEventListener('touchmove', onTouchMove);
    }
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const newY = e.touches[0].clientY;
    if (newY - startY > 100) {
      ref.current.style.transform = 'translateY(100%)';
      setTimeout(() => {
        setIsShowPlayerFullScreen(false);
      }, 300);
    } else {
      ref.current.style.transform = 'translateY(0%)';
      // setTimeout(() => {
      //   setIsShowPlayerFullScreen(true);
      // }, 300);
      setIsShowPlayerFullScreen(true);
    }
  };

  const onTouchEnd = () => {
    ref.current.removeEventListener('touchmove', onTouchMove);
  };

  useEffect(() => {
    if (isShowPlayerFullScreen) {
      ref.current.style.transform = 'translateY(0%)';
    } else {
      ref.current.style.transform = 'translateY(100%)';
    }
  }, [isShowPlayerFullScreen]);

  return (
    <div
      style={{ display: isShowPlayerFullScreen ? 'block' : 'none' }}
      ref={ref}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={styles.root}
    >
      <Content />
    </div>
  );
};

export default PlayerFullScreen;
