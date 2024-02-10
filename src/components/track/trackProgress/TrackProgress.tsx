import React from 'react';
import styles from './trackProgress.module.scss';
import { formatTime } from '@/utils';
import { motion } from 'framer-motion';

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
        <motion.div
          animate={
            (left * 100) / right < 12
              ? { translateY: '10px' }
              : { translateY: 0 }
          }
        >
          {formatTime(left)}
        </motion.div>
        <motion.div
          animate={
            (left * 100) / right > 88
              ? { translateY: '10px' }
              : { translateY: 0 }
          }
        >
          {formatTime(right)}
        </motion.div>
      </div>
    </div>
  );
};

export default TrackProgress;
