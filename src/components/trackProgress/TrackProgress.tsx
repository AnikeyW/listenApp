import React from 'react';
import styles from './trackProgress.module.scss';
import { formatTime } from '@/utils';

interface ITrackProgressProps {
  left: number;
  right: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackProgress: React.FC<ITrackProgressProps> = ({
  right,
  left,
  onChange,
}) => {
  return (
    <div className={styles.trackProgress}>
      <div className={styles.trackProgress__range}>
        <input
          type="range"
          min={0}
          max={right}
          value={left}
          onChange={onChange}
        />
      </div>

      <div className={styles.trackProgress__times}>
        <div>{formatTime(left)}</div>
        <div>{formatTime(right)}</div>
      </div>
    </div>
  );
};

export default TrackProgress;
