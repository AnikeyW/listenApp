'use client';
import React from 'react';
import styles from './AlbumList.module.scss';

import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import AlbumItem from '@/components/album/albumItem/AlbumItem';
import { useGetAllAlbums } from '@/hooks/album/useGetAllAlbums';

const AlbumList = () => {
  const { data, isError, error, isSuccess } = useGetAllAlbums();

  return (
    <div className={styles.root}>
      {isError && <ErrorMessage message={error.message} />}
      {isSuccess &&
        data.map((album) => <AlbumItem album={album} key={album._id} />)}
    </div>
  );
};

export default AlbumList;
