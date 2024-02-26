'use client';
import React from 'react';
import styles from './page.module.scss';
import AlbumOptions from '@/components/album/albumOptions/AlbumOptions';
import TrackList from '@/components/track/tracklist/TrackList';
import SceletonAlbum from '@/components/album/sceletonAlbum/SceletonAlbum';
import { useGetAlbumById } from '@/hooks/album/useGetAlbumById';

const Page = ({ params }: { params: { id: string } }) => {
  const albumQuery = useGetAlbumById(params.id);

  return (
    <>
      {albumQuery.isPending && <SceletonAlbum />}
      {albumQuery.isSuccess && (
        <div className={styles.root}>
          <div className={styles.root__info}>
            <div className={styles.root__info_image}>
              <img
                src={process.env.NEXT_PUBLIC_BASE_URL + albumQuery.data.picture}
                alt="album photo"
              />
            </div>
            <div className={styles.root__info_nameAndOptions}>
              <div className={styles.root__info_nameAndOptions_name}>
                {albumQuery.data.name}
              </div>
              <AlbumOptions album={albumQuery.data} />
            </div>
          </div>
          <div className={styles.root__trackList}>
            <TrackList tracks={albumQuery.data.tracks} />
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
