'use client';
import React, { useState } from 'react';
import styles from './page.module.scss';
import BlockPopularTracks from '@/components/track/blockPopularTracks/BlockPopularTracks';
import TrackSearch from '@/components/UI/trackSearch/TrackSearch';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchTracks } from '@/hooks/track/useSearchTracks';
import TrackList from '@/components/track/tracklist/TrackList';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 200);

  const seachedTracks = useSearchTracks(debouncedSearch);

  return (
    <div className={styles.root}>
      <TrackSearch search={searchQuery} setSearch={setSearchQuery} />
      {searchQuery !== '' ? (
        <>
          {seachedTracks.isSuccess && <TrackList tracks={seachedTracks.data} />}
        </>
      ) : (
        <BlockPopularTracks />
      )}
    </div>
  );
}
