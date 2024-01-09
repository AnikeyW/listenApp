import React from 'react';
import styles from './MainSection.module.scss';

interface IMainSectionProps {
  children: React.ReactNode;
}

const MainSection: React.FC<IMainSectionProps> = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default MainSection;
