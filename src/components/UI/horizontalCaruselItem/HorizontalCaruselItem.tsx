import React, { FC, ReactNode } from 'react';
import styles from './HorizontalCaruselItem.module.scss';

interface Props {
  children: ReactNode;
}

const HorizontalCaruselItem: FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default HorizontalCaruselItem;
