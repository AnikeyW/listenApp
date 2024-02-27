'use client';
import React from 'react';
import styles from './page.module.scss';
import MyLink from '@/components/UI/myLink/MyLink';
import TrackItem from '@/components/track/trackitem/TrackItem';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';
import { usePathname, useRouter } from 'next/navigation';
import HorizontalCarusel from '@/components/UI/horizontalCarusel/HorizontalCarusel';
import HorizontalCaruselItem from '@/components/UI/horizontalCaruselItem/HorizontalCaruselItem';
import { useGetAllAlbums } from '@/hooks/album/useGetAllAlbums';
import { useGetMyTracks } from '@/hooks/track/useGetMyTracks';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const myTracks = useGetMyTracks();
  const getAllAlbums = useGetAllAlbums();

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
          )}
        </div>

        <div className={styles.block}>
          <div className={styles.block__title}>
            <h3>Мои альбомы</h3>
            <MyLink href={'albums'}>Показать все</MyLink>
          </div>

          {getAllAlbums.isSuccess && (
            <HorizontalCarusel key={'albums'}>
              {getAllAlbums.data.map((album, index) => (
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
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
