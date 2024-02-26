import React, { FC, ReactNode } from 'react';
import styles from './MyLink.module.scss';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  href: string;
}

const MyLink: FC<Props> = ({ children, href }) => {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
};

export default MyLink;
