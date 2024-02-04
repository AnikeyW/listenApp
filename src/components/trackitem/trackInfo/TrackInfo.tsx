import React, { FC, memo } from 'react';
import styles from './TrackInfo.module.scss';
import { ITrack } from '@/types/track';

interface TrackInfoProps {
  track: ITrack;
}

const TrackInfo: FC<TrackInfoProps> = ({ track }) => {
  return (
    <div className={styles.root}>
      <div className={styles.root__trackName}>{track.name}</div>
      <div className={styles.root__artistName}>{track.artist}</div>
    </div>
  );
};

export default memo(TrackInfo);
