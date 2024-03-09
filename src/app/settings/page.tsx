import React from 'react';
import styles from './page.module.scss';
import ThemeToggle from '@/components/UI/themeToggle/ThemeToggle';
import ProfileInfo from '@/components/auth/profileInfo/ProfileInfo';
import { APP_VERSION } from '@/constants';

const Page = () => {
  return (
    <div className={styles.root}>
      <ProfileInfo />
      <div className={styles.root__options}>
        <ThemeToggle />
      </div>
      <div className={styles.root__version}>v.{APP_VERSION}</div>
    </div>
  );
};

export default Page;
