'use client';
import React from 'react';
import styles from './page.module.scss';
import { useGetAllTracks } from '@/hooks/track/useGetAllTracks';
import MyLink from '@/components/UI/myLink/MyLink';
import TrackItem from '@/components/track/trackitem/TrackItem';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';
import { usePathname } from 'next/navigation';
import HorizontalCarusel from '@/components/UI/horizontalCarusel/HorizontalCarusel';
import HorizontalCaruselItem from '@/components/UI/horizontalCaruselItem/HorizontalCaruselItem';
import { useGetAllAlbums } from '@/hooks/album/useGetAllAlbums';
import AlbumItem from '@/components/album/albumItem/AlbumItem';

const Page = () => {
  const pathname = usePathname();
  const getAllTracks = useGetAllTracks();
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

          {getAllTracks.isSuccess && (
            <HorizontalCarusel>
              {new Array(Math.ceil(getAllTracks.data.length / 3))
                .fill(0)
                .map((_, index) => (
                  <HorizontalCaruselItem key={index}>
                    {getAllTracks.data
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
            <HorizontalCarusel>
              {getAllAlbums.data.map((album, index) => (
                <HorizontalCaruselItem key={index}>
                  <AlbumItem key={album._id} album={album} />
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
