'use client';
import React from 'react';
import styles from './BlockMyAlbum.module.scss';

import HorizontalCarusel from '@/components/UI/horizontalCarusel/HorizontalCarusel';
import HorizontalCaruselItem from '@/components/UI/horizontalCaruselItem/HorizontalCaruselItem';
import Block from '@/components/UI/block/Block';
import { useGetMyAlbums } from '@/hooks/album/useGetMyAlbums';
import AlbumItem from '@/components/album/albumItem/AlbumItem';
import EmptyBlock from '@/components/UI/emptyBlock/EmptyBlock';

const BlockMyAlbum = () => {
  const myAlbums = useGetMyAlbums();

  return (
    <Block title={'Мои альбомы'} linkHref={'myalbums'}>
      {myAlbums.isSuccess && (
        <>
          {myAlbums.data.length === 0 && (
            <EmptyBlock
              text={'Нет загруженных альбомов'}
              href={'/albums/create'}
            />
          )}
          <HorizontalCarusel key={'albums'}>
            {myAlbums.data.map((album) => (
              <HorizontalCaruselItem key={album._id}>
                <AlbumItem album={album} />
              </HorizontalCaruselItem>
            ))}
          </HorizontalCarusel>
        </>
      )}
    </Block>
  );
};

export default BlockMyAlbum;
