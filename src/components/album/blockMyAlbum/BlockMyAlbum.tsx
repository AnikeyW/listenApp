'use client';
import React from 'react';
import MyLink from '@/components/UI/myLink/MyLink';
import HorizontalCarusel from '@/components/UI/horizontalCarusel/HorizontalCarusel';
import HorizontalCaruselItem from '@/components/UI/horizontalCaruselItem/HorizontalCaruselItem';
import styles from './BlockMyAlbum.module.scss';
import Block from '@/components/UI/block/Block';
import { useRouter } from 'next/navigation';
import { useGetMyAlbums } from '@/hooks/album/useGetMyAlbums';

const BlockMyAlbum = () => {
  const router = useRouter();
  const myAlbums = useGetMyAlbums();

  return (
    <Block title={'Мои альбомы'} linkHref={'albums'}>
      {myAlbums.isSuccess && (
        <>
          {myAlbums.data.length === 0 && (
            <div
              style={{
                height: '182px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <p>Нет загруженных альбомов</p>
              <MyLink href={'/albums/create'}>Загрузить</MyLink>
            </div>
          )}
          <HorizontalCarusel key={'albums'}>
            {myAlbums.data.map((album, index) => (
              <HorizontalCaruselItem key={index} width={'144px'}>
                <div
                  className={styles.album}
                  key={album._id}
                  onClick={() => router.push('albums/' + album._id)}
                >
                  <div className={styles.album__image}>
                    <img
                      src={process.env.NEXT_PUBLIC_BASE_URL + album.picture}
                      alt="wegwe"
                    />
                  </div>
                  <div className={styles.root__author}>{album.author}</div>
                  <div>{album.name}</div>
                </div>
              </HorizontalCaruselItem>
            ))}
          </HorizontalCarusel>
        </>
      )}
    </Block>
  );
};

export default BlockMyAlbum;
