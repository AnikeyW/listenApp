import React, { FC, memo } from 'react';
import styles from './TrackDuration.module.scss';
import { formatTime } from '@/utils';
import { usePlayerStore } from '@/stores/playerStore';
import { ITrack } from '@/types/track';

interface TrackDurationProps {
  pauseLocal: boolean;
  track: ITrack;
  isActiveTrack: boolean;
}

const TrackDuration: FC<TrackDurationProps> = ({
  pauseLocal,
  track,
  isActiveTrack,
}) => {
  return (
    <>
      {!pauseLocal && isActiveTrack ? (
        <TrackCurrentDuration />
      ) : pauseLocal && isActiveTrack ? (
        <TrackCurrentDuration />
      ) : (
        <div className={styles.root}>{formatTime(track.duration)}</div>
      )}
    </>
  );
};

export default memo(TrackDuration);
const TrackCurrentDuration: FC = () => {
  const currentTime = usePlayerStore((state) => state.currentTime);
  return <div className={styles.root}>{formatTime(currentTime)}</div>;
};
