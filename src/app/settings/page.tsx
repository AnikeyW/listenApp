import React from 'react';
import styles from './page.module.scss';
import ThemeToggle from '@/components/UI/themeToggle/ThemeToggle';

const Page = () => {
  return (
    <div className={styles.root}>
      <ThemeToggle />
    </div>
  );
};

export default Page;
