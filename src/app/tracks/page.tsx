'use client';
import React from 'react';
import styles from './page.module.scss';
import TrackList from '@/components/track/tracklist/TrackList';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useQuery } from '@tanstack/react-query';
import trackService from '@/services/Track.service';
import Loader from '@/components/UI/Loader/Loader';

const Tracks = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => trackService.getAll(),
    staleTime: 120 * 1000,
  });

  return (
    <div className={styles.root}>
      <div className={styles.trackHeader}>Мои треки</div>
      {isError && <ErrorMessage message={error.message} />}
      {isLoading && <Loader />}
      {isSuccess && data.length > 0 && <TrackList tracks={data} />}
    </div>
  );
};

export default Tracks;
