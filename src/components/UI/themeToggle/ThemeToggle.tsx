'use client';
import { HiOutlineMoon } from 'react-icons/hi';
import styles from './themeToggle.module.scss';
import { useThemeStore } from '@/stores/themeStore';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore((state) => state);

  return (
    <div
      className={styles.root}
      onClick={toggleTheme}
      style={
        theme === 'dark'
          ? { backgroundColor: '#b9b9b9' }
          : { backgroundColor: '#0f172a' }
      }
    >
      <HiOutlineMoon color={'white'} size={14} />
      <div
        className={styles.root__ball}
        style={
          theme === 'dark'
            ? { transform: 'translateX(1px)', background: '#0f172a' }
            : { transform: 'translateX(21px)', background: 'white' }
        }
      ></div>
      <div className={styles.root__sun}></div>
    </div>
  );
};

export default ThemeToggle;
