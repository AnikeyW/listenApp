'use client';
import React, { FC } from 'react';
import styles from './SceletonTracksPage.module.scss';

interface Props {
  title: string;
}

const SceletonTracksPage: FC<Props> = ({ title }) => {
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  return (
    <div className={styles.root}>
      <div className={styles.root__title}>{title}</div>
      <div className={styles.root__list}>
        {arr.map((track) => (
          <div key={track} className={styles.root__item}>
            <div className={styles.root__image}></div>
            <div className={styles.root__info}>
              <div className={styles.root__trackName}></div>
              <div className={styles.root__author}></div>
            </div>
            <div className={styles.root__duration}></div>
            <div className={styles.root__options}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SceletonTracksPage;
