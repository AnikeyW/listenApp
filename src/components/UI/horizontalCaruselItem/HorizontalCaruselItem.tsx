import React, { FC, ReactNode } from 'react';
import styles from './HorizontalCaruselItem.module.scss';

type VisibleItemsType = 1 | 2;

interface Props {
  children: ReactNode;
  width: string;
}

const HorizontalCaruselItem: FC<Props> = ({ children, width }) => {
  return (
    <div className={styles.root} style={{ minWidth: width }}>
      {children}
    </div>
  );
};

export default HorizontalCaruselItem;
