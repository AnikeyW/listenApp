import React, { FC, ReactNode } from 'react';
import styles from './HorizontalCarusel.module.scss';

interface Props {
  children: ReactNode;
}

const HorizontalCarusel: FC<Props> = ({ children }) => {
  return <div className={styles.root}>{children}</div>;
};

export default HorizontalCarusel;
