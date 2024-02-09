'use client';
import React from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <button
        onClick={() => {
          router.replace('tracks/create');
        }}
      >
        добавить трек
      </button>
      <button
        onClick={() => {
          router.replace('albums/create');
        }}
      >
        добавить альбом
      </button>
    </div>
  );
};

export default Page;
