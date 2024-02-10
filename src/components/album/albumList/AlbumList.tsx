'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import styles from './AlbumList.module.scss';

import albumService from '@/services/Album.service';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import AlbumItem from '@/components/album/albumItem/AlbumItem';

const ddd = [
  {
    author: 'Miyagi & Эндшпиль',
    name: 'HATTORI',
    picture: 'image/1e0667f0-31fa-4a01-a0fd-7f442e214c41.jpg',
    tracks: [],
    _id: '65c4c8cc409626136d618bf4124',
  },
  {
    author: 'Miyagi & Эндшпиль',
    name: 'HATTORI',
    picture: 'image/1e0667f0-31fa-4a01-a0fd-7f442e214c41.jpg',
    tracks: [],
    _id: '65c4c8cc409626136d62318bf4124',
  },
  {
    author: 'Miyagi & Эндшпиль',
    name: 'HATTORI',
    picture: 'image/1e0667f0-31fa-4a01-a0fd-7f442e214c41.jpg',
    tracks: [],
    _id: '3252523er',
  },
  {
    author: 'Miyagi & Эндшпиль',
    name: 'HATTORI',
    picture: 'image/1e0667f0-31fa-4a01-a0fd-7f442e214c41.jpg',
    tracks: [],
    _id: '32525erhew23er',
  },
  {
    author: 'Miyagi & Эндшпиль',
    name: 'HATTORI',
    picture: 'image/1e0667f0-31fa-4a01-a0fd-7f442e214c41.jpg',
    tracks: [],
    _id: '32525wegwerh23er',
  },
  {
    author: 'Miyagi & Эндшпиль',
    name: 'HATTORI',
    picture: 'image/1e0667f0-31fa-4a01-a0fd-7f442e214c41.jpg',
    tracks: [],
    _id: '32525wwegwegwerh23er',
  },
  {
    author: 'Miyagi & Эндшпиль',
    name: 'HATTORI',
    picture: 'image/1e0667f0-31fa-4a01-a0fd-7f442e214c41.jpg',
    tracks: [],
    _id: '325we5wegwerh23er',
  },
];

const AlbumList = () => {
  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ['albums', 'getAlbums'],
    queryFn: albumService.getAll,
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
