'use client';
import React, { useEffect } from 'react';
import styles from './page.module.scss';
import TrackList from '@/components/tracklist/TrackList';
import { ITrack } from '@/types/track';
import { useTrackStore } from '@/stores/trackStore';
import ErrorMessage from '@/components/errorMessage/ErrorMessage';

const Tracks = () => {
  const tracks: ITrack[] = useTrackStore((state) => state.tracks);
  const isLoading = useTrackStore((state) => state.isLoading);
  const error = useTrackStore((state) => state.error);
  const fetchTracks = useTrackStore((state) => state.fetchTracks);

  useEffect(() => {
    fetchTracks(100, 0);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.trackHeader}>
        Мои треки
      </div>
      {error && <ErrorMessage message={error} />}
      {isLoading && <div>Загрузка...</div>}
      {tracks && tracks.length > 0 && <TrackList tracks={tracks} />}
    </div>
  );
};

export default Tracks;
