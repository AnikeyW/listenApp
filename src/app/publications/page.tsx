'use client';
import React from 'react';
import styles from './page.module.scss';
import MyLink from '@/components/UI/myLink/MyLink';
import TrackItem from '@/components/track/trackitem/TrackItem';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';
import { usePathname, useRouter } from 'next/navigation';
import HorizontalCarusel from '@/components/UI/horizontalCarusel/HorizontalCarusel';
import HorizontalCaruselItem from '@/components/UI/horizontalCaruselItem/HorizontalCaruselItem';
import { useGetMyTracks } from '@/hooks/track/useGetMyTracks';
import { useGetMyAlbums } from '@/hooks/album/useGetMyAlbums';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const myTracks = useGetMyTracks();
  const myAlbums = useGetMyAlbums();

  return (
    <PrivateRoute callbackUrl={pathname}>
      <div className={styles.root}>
        <h2 className={styles.root__title}>Мои публикации</h2>
        <div className={styles.block}>
          <div className={styles.block__title}>
            <h3>Мои треки</h3>
            <MyLink href={'tracks'}>Показать все</MyLink>
          </div>

          {myTracks.isSuccess && (
            <>
              {myTracks.data.length === 0 && (
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
                  <p>Нет загруженных треков</p>
                  <MyLink href={'/tracks/create'}>Загрузить</MyLink>
                </div>
              )}
              <HorizontalCarusel key={'tracks'}>
                {new Array(Math.ceil(myTracks.data.length / 3))
                  .fill(0)
                  .map((_, index) => (
                    <HorizontalCaruselItem key={index} width={'88%'}>
                      {myTracks.data
                        .slice(index * 3, index * 3 + 3)
                        .map((track, i) => (
                          <TrackItem
                            key={track._id}
                            track={track}
                            indexOfTrack={3 * index + i}
                          />
                        ))}
                    </HorizontalCaruselItem>
                  ))}
              </HorizontalCarusel>
            </>
          )}
        </div>

        <div className={styles.block}>
          <div className={styles.block__title}>
            <h3>Мои альбомы</h3>
            <MyLink href={'albums'}>Показать все</MyLink>
          </div>

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
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
