'use client';
import React from 'react';
import {
  HiHome,
  HiOutlineViewList,
  HiPlusCircle,
  HiAdjustments,
  HiHeart,
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
    path: '/favorites',
    pathTitle: 'Избранное',
    icon: <HiHeart size={24} />,
  },
  {
    path: '/create',
    pathTitle: 'Добавить',
    icon: <HiPlusCircle size={24} />,
  },
  {
    path: '/publications',
    pathTitle: 'Публикации',
    icon: <HiOutlineViewList size={24} />,
  },
  {
    path: '/settings',
    pathTitle: 'Настройки',
    icon: <HiAdjustments size={24} />,
  },
];

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map((item) => (
          <NavItem
            path={item.path}
            pathTitle={item.pathTitle}
            icon={item.icon}
            key={item.path}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
