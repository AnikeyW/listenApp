'use client';
import React from 'react';
import styles from './navbar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <Link
            className={`${styles.link} ${
              pathname === '/' ? styles.active : ''
            }`}
            href="/"
          >
            Главная
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathname === '/albums' ? styles.active : ''
            }`}
            href="/albums"
          >
            Альбомы
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathname === '/tracks' ? styles.active : ''
            }`}
            href="/tracks"
          >
            Треки
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
