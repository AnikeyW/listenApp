'use client';
import React from 'react';
import styles from './SceletonTracksPage.module.scss';

const SceletonTracksPage = () => {
  const arr = [1, 1, 1, 11, 1, 1, 11, 1, 1, 1, 1];
  console.log(arr);
  return (
    <div className={styles.root}>
      <div className={styles.root__title}>Мои треки</div>
      <div className={styles.root__list}>
        {arr.map((track) => (
          <div className={styles.root__item}>
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
