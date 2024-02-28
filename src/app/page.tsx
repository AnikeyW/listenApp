import React from 'react';
import styles from './page.module.scss';
import BlockPopularTracks from '@/components/track/blockPopularTracks/BlockPopularTracks';

export default function Home() {
  return (
    <div className={styles.root}>
      <BlockPopularTracks />
    </div>
  );
}
