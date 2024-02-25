'use client';
import React from 'react';
import styles from './page.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import Button from '@/components/UI/Button/Button';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <PrivateRoute callbackUrl={pathname}>
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
    </PrivateRoute>
  );
};

export default Page;
