'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './AlbumList.module.scss';

import albumService from '@/services/Album.service';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import AlbumItem from '@/components/album/albumItem/AlbumItem';

const AlbumList = () => {
  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ['albums'],
    queryFn: albumService.getAll,
    // staleTime: 120 * 1000,
  });

  return (
    <div className={styles.root}>
      {isError && <ErrorMessage message={error.message} />}
      {isSuccess &&
        data.map((album) => <AlbumItem album={album} key={album._id} />)}
    </div>
  );
};

export default AlbumList;
