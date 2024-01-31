'use client';
import React from 'react';
import {
  HiHome,
  HiOutlineViewList,
  HiPlusCircle,
  HiAdjustments,
} from 'react-icons/hi';
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
            <div className={styles.linkTitle}>
              <HiHome size={24} />
              <div>Главная</div>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathname === '/tracks/create' ? styles.active : ''
            }`}
            href="/tracks/create"
          >
            <div className={styles.linkTitle}>
              <HiPlusCircle size={24} />
              <div>Добавить</div>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathname === '/tracks' ? styles.active : ''
            }`}
            href="/tracks"
          >
            <div className={styles.linkTitle}>
              <HiOutlineViewList size={24} />
              <div>Треки</div>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className={`${styles.link} ${
              pathname === '/settings' ? styles.active : ''
            }`}
            href="/settings"
          >
            <div className={styles.linkTitle}>
              <HiAdjustments size={24} />
              <div>Настройки</div>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
