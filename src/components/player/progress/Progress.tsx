import React from 'react';
import styles from './Progress.module.scss';
import TrackProgress from '@/components/track/trackProgress/TrackProgress';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/track/tracklist/TrackList';
import { formatTime } from '@/utils';
import { useWindowSize } from '@/hooks/useWindowWidth';

const Progress = () => {
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const windowWidth = useWindowSize();

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  return (
    <motion.div
      className={styles.root}
      drag={'y'}
      dragConstraints={{
        top: 0,
        bottom: 0,
      }}
      dragElastic={0}
    >
      {windowWidth > 640 && <motion.div>{formatTime(currentTime)}</motion.div>}
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
      {windowWidth > 640 && <motion.div>{formatTime(duration)}</motion.div>}
      {windowWidth < 640 && (
        <div className={styles.root__times}>
          <motion.div
            animate={
              (currentTime * 100) / duration < 12
                ? { translateY: '10px' }
                : { translateY: 0 }
            }
          >
            {formatTime(currentTime)}
          </motion.div>
          <motion.div
            animate={
              (currentTime * 100) / duration > 88
                ? { translateY: '10px' }
                : { translateY: 0 }
            }
          >
            {formatTime(duration)}
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Progress;
