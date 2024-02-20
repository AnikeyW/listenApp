'use client';
import React, { useEffect } from 'react';
import styles from './MainSection.module.scss';
import { usePlayerStore } from '@/stores/playerStore';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/stores/authStore';

interface IMainSectionProps {
  children: React.ReactNode;
}

const MainSection: React.FC<IMainSectionProps> = ({ children }) => {
  const session = useSession();
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (session.data?.user) {
      setUser(session.data.user);
    }
  });
  return (
    <main
      className={`${styles.main} ${activeTrack ? styles.withActiveTrack : ''}`}
    >
      {children}
    </main>
  );
};

export default MainSection;
