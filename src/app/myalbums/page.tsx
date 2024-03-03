'use client';
import React from 'react';
import styles from './page.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useGetMyAlbums } from '@/hooks/album/useGetMyAlbums';
import AlbumList from '@/components/album/albumList/AlbumList';
import EmptyBlock from '@/components/UI/emptyBlock/EmptyBlock';

const Page = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetMyAlbums();
  return (
    <div className={styles.root}>
      {isSuccess && <div className={styles.root__title}>Мои альбомы</div>}
      {isError && <ErrorMessage message={error.message} />}
      {isLoading && <p>Загрузка</p>}
      <div className={styles.root__albums}>
        {isSuccess && data.length > 0 && <AlbumList albums={data} />}
        {isSuccess && data.length === 0 && (
          <EmptyBlock
            text={'Нет загруженных альбомов'}
            href={'/albums/create'}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
