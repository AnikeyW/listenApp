import React from 'react';
import styles from './TrackInfo.module.scss';
import { usePlayerStore } from '@/stores/playerStore';

const TrackInfo = () => {
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  return (
    <>
      {activeTrack && (
        <div className={styles.root}>
          <div className={styles.root__name}>{activeTrack.name}</div>
          <div className={styles.root__artist}>{activeTrack.artist}</div>
        </div>
      )}
    </>
  );
};

export default TrackInfo;
