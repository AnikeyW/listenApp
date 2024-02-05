'use client';
import React from 'react';
import {
  HiHome,
  HiOutlineViewList,
  HiPlusCircle,
  HiAdjustments,
} from 'react-icons/hi';

import styles from './navbar.module.scss';
import NavItem from '@/components/navbar/navItem/NavItem';

const navLinks = [
  {
    path: '/',
    pathTitle: 'Главная',
    icon: <HiHome size={24} />,
  },
  {
    path: '/tracks/create',
    pathTitle: 'Добавить',
    icon: <HiPlusCircle size={24} />,
  },
  {
    path: '/tracks',
    pathTitle: 'Треки',
    icon: <HiOutlineViewList size={24} />,
  },
  {
    path: '/settings',
    pathTitle: 'Настройки',
    icon: <HiAdjustments size={24} />,
  },
];

const Navbar = () => {
  console.log('nav');
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map((item) => (
          <NavItem
            path={item.path}
            pathTitle={item.pathTitle}
            icon={item.icon}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
