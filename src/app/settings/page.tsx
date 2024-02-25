import React from 'react';
import styles from './page.module.scss';
import ThemeToggle from '@/components/UI/themeToggle/ThemeToggle';
import ProfileInfo from '@/components/auth/profileInfo/ProfileInfo';

const Page = () => {
  return (
    <div className={styles.root}>
      <ProfileInfo />
      <ThemeToggle />
    </div>
  );
};

export default Page;
