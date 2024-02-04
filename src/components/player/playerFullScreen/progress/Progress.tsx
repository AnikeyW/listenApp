import React from 'react';
import styles from './Progress.module.scss';
import TrackProgress from '@/components/trackProgress/TrackProgress';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/tracklist/TrackList';

const Progress = () => {
  const currentTime = usePlayerStore((state) => state.currentTime);
  const duration = usePlayerStore((state) => state.duration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);

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
      <TrackProgress
        left={currentTime}
        right={duration}
        onChange={changeCurrentTime}
      />
    </motion.div>
  );
};

export default Progress;
