'use client';
import React from 'react';
import styles from './page.module.scss';
import TrackList from '@/components/track/tracklist/TrackList';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import SceletonTracksPage from '@/components/track/sceletonTracksPage/SceletonTracksPage';
import { useGetMyTracks } from '@/hooks/track/useGetMyTracks';

const Tracks = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetMyTracks();
  return (
    <div className={styles.root}>
      {isSuccess && <div className={styles.trackHeader}>Мои треки</div>}
      {isError && <ErrorMessage message={error.message} />}
      {isLoading && <SceletonTracksPage title={'Мои треки'} />}
      <div className={styles.trackListWrapper}>
        {isSuccess && data.length > 0 && <TrackList tracks={data} />}
      </div>
    </div>
  );
};

export default Tracks;