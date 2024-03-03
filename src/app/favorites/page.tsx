'use client';
import React from 'react';
import styles from './page.module.scss';
import PrivateRoute from '@/components/auth/privateRoute/PrivateRoute';
import { usePathname } from 'next/navigation';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import SceletonTracksPage from '@/components/track/sceletonTracksPage/SceletonTracksPage';
import TrackList from '@/components/track/tracklist/TrackList';
import { useGetFavoritesTracks } from '@/hooks/track/useGetFavoritesTracks';
import EmptyBlock from '@/components/UI/emptyBlock/EmptyBlock';

const Page = () => {
  const pathname = usePathname();

  const favoritesTracks = useGetFavoritesTracks(100, 0);

  return (
    <PrivateRoute callbackUrl={pathname}>
      <div className={styles.root}>
        {favoritesTracks.isSuccess && (
          <div className={styles.trackHeader}>Избранное</div>
        )}
        {favoritesTracks.isError && (
          <ErrorMessage message={favoritesTracks.error.message} />
        )}
        {favoritesTracks.isLoading && (
          <SceletonTracksPage title={'Избранное'} />
        )}
        <div className={styles.trackListWrapper}>
          {favoritesTracks.isSuccess && favoritesTracks.data.length > 0 && (
            <TrackList tracks={favoritesTracks.data} />
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Page;
