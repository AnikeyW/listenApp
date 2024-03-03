'use client';
import React, { FC } from 'react';
import styles from './AlbumList.module.scss';

import { IAlbum } from '@/types/album';
import AlbumItem from '@/components/album/albumItem/AlbumItem';

interface Props {
  albums: IAlbum[];
}

const AlbumList: FC<Props> = ({ albums }) => {
  return (
    <div className={styles.root}>
      {albums.length > 0 &&
        albums.map((album) => <AlbumItem album={album} key={album._id} />)}
    </div>
  );
};

export default AlbumList;
