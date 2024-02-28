'use client';
import React from 'react';
import styles from './page.module.scss';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';
import { usePathname } from 'next/navigation';
import BlockMyTracks from '@/components/track/blockMyTracks/BlockMyTracks';
import BlockMyAlbum from '@/components/album/blockMyAlbum/BlockMyAlbum';

const Page = () => {
  const pathname = usePathname();

  return (
    <PrivateRoute callbackUrl={pathname}>
      <div className={styles.root}>
        <h2 className={styles.root__title}>Мои публикации</h2>
        <BlockMyTracks />
        <BlockMyAlbum />
      </div>
    </PrivateRoute>
  );
};

export default Page;
