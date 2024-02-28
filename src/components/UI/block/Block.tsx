import React, { FC, ReactNode } from 'react';
import styles from './Block.module.scss';
import MyLink from '@/components/UI/myLink/MyLink';

interface Props {
  title: string;
  linkHref: string;
  children: ReactNode;
}

const Block: FC<Props> = ({ title, linkHref, children }) => {
  return (
    <div className={styles.block}>
      <div className={styles.block__title}>
        <h3>{title}</h3>
        <MyLink href={linkHref}>Показать все</MyLink>
      </div>
      {children}
    </div>
  );
};

export default Block;
