import React from 'react';
import styles from './trackProgress.module.scss';

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
      <input
        type="range"
        min={0}
        max={right}
        value={left}
        onChange={onChange}
      />
      <div>
        {left} / {right}
      </div>
    </div>
  );
};

export default TrackProgress;
