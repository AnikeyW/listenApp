'use client';
import React from 'react';
import styles from './page.module.scss';
import AlbumOptions from '@/components/album/albumOptions/AlbumOptions';
import TrackList from '@/components/track/tracklist/TrackList';
import { useQuery } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import Loader from '@/components/UI/Loader/Loader';

const Page = ({ params }: { params: { id: string } }) => {
  const albumQuery = useQuery({
    queryKey: ['albums', params.id],
    queryFn: () => albumService.getOne(params.id),
    staleTime: 60 * 1000,
  });

  return (
    <>
      {albumQuery.isPending && <Loader />}
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
