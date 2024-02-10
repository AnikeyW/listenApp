'use client';
import React from 'react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button/Button';

const Page = () => {
  const router = useRouter();
  return (
    <div className={styles.root}>
      <div className={styles.root__btns}>
        <Button
          onClick={() => {
            router.replace('tracks/create');
          }}
        >
          Добавить трек
        </Button>
        <Button
          onClick={() => {
            router.replace('albums/create');
          }}
        >
          Добавить альбом
        </Button>
      </div>
    </div>
  );
};

export default Page;
