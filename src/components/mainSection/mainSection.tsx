'use client';
import React from 'react';
import styles from './MainSection.module.scss';
import { usePlayerStore } from '@/stores/playerStore';

interface IMainSectionProps {
  children: React.ReactNode;
}

const MainSection: React.FC<IMainSectionProps> = ({ children }) => {
  const activeTrack = usePlayerStore((state) => state.activeTrack);

  return (
    <main
      className={`${styles.main} ${activeTrack ? styles.withActiveTrack : ''}`}
    >
      {children}
    </main>
  );
};

export default MainSection;
