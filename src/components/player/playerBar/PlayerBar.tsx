'use client';
import React, { MouseEvent } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { motion, Variants, AnimatePresence } from 'framer-motion';

import styles from './PlayerBar.module.scss';

import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/track/tracklist/TrackList';

import PlayerButtons from '@/components/player/playerButtons/PlayerButtons';

const playerVariants: Variants = {
  open: {
    translateY: 0,
    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
  },
  closed: {
    translateY: '100%',
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
  },
};

const PlayerBar = () => {
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const setIndexOfActiveTrack = usePlayerStore(
    (state) => state.setIndexOfActiveTrack,
  );
  const setActiveTrack = usePlayerStore((state) => state.setActiveTrack);
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );

  const turnOffPlayer = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    audio.pause();
    setActiveTrack(null);
    setIndexOfActiveTrack(null);
  };

  const showPlayerFullScreen = () => {
    const isMobileScreen = window.matchMedia('(max-width: 640px)').matches;
    if (isMobileScreen) {
      setIsShowPlayerFullScreen(true);
    }
  };

  return (
    <AnimatePresence>
      {activeTrack && (
        <motion.div
          variants={playerVariants}
          initial={'closed'}
          animate={'open'}
          exit={'closed'}
          className={styles.player}
          onClick={showPlayerFullScreen}
          key={1}
        >
          <PlayerButtons player={'playerBar'} />
          <div className={styles.player__trackInfo}>
            <div className={styles.player__trackInfo_name}>
              {activeTrack.name}
            </div>
            <div className={styles.player__trackInfo_artist}>
              {activeTrack.artist}
            </div>
          </div>
          <div className={styles.player__closeBtn}>
            <HiMiniXMark size={30} onClick={turnOffPlayer} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayerBar;