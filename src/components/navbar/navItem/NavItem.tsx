import React, { FC, ReactNode } from 'react';
import styles from './NavItem.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItemProps {
  path: string;
  pathTitle: string;
  icon: ReactNode;
}

const NavItem: FC<NavItemProps> = ({ path, pathTitle, icon }) => {
  const pathname = usePathname();
  return (
    <li>
      <Link
        className={`${styles.link} ${pathname === path ? styles.active : ''}`}
        href={path}
      >
        <div className={styles.linkTitle}>
          {icon}
          <div>{pathTitle}</div>
        </div>
      </Link>
    </li>
  );
};

export default NavItem;
