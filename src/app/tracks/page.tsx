'use client';
import React, { useEffect } from 'react';
import styles from './page.module.scss';
import TrackList from '@/components/tracklist/TrackList';
import { ITrack } from '@/types/track';
import { useTrackStore } from '@/stores/trackStore';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';

const tracks: ITrack[] = [
  {
    id: 1,
    name: 'Голгофа',
    text: 'wegwe',
    duration: 208,
    listens: 10,
    audio: '/audio/golgofa.mp3',
    picture: '/picture/narative.jpg',
    artist: 'Miyagi',
  },
  {
    id: 2,
    name: 'Круговорот',
    text: 'wegwe',
    duration: 159,
    listens: 10,
    audio: '/audio/krugovorot.mp3',
    picture: '/picture/narative.jpg',
    artist: 'Miyagi',
  },
  {
    id: 3,
    name: 'Река',
    text: 'wegwe',
    duration: 195,
    listens: 10,
    audio: '/audio/reka.mp3',
    picture: '/picture/narative.jpg',
    artist: 'Miyagi',
  },
];

const Tracks = () => {
  // const tracks: ITrack[] = useTrackStore((state) => state.tracks);
  const isLoading = useTrackStore((state) => state.isLoading);
  const error = useTrackStore((state) => state.error);
  // const fetchTracks = useTrackStore((state) => state.fetchTracks);

  useEffect(() => {
    // fetchTracks(100, 0);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.trackHeader}>Мои треки</div>
      {error && <ErrorMessage message={error} />}
      {isLoading && <div>Загрузка...</div>}
      {!isLoading && tracks && tracks.length > 0 && (
        <TrackList tracks={tracks} />
      )}
    </div>
  );
};

export default Tracks;
