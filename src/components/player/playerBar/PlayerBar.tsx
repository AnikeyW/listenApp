'use client';
import React, { MouseEvent } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { motion, Variants, AnimatePresence } from 'framer-motion';

import styles from './PlayerBar.module.scss';

import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/track/tracklist/TrackList';

import PlayerButtons from '@/components/player/playerButtons/PlayerButtons';
import Progress from '@/components/player/progress/Progress';
import VolumeRange from '@/components/volumeRange/VolumeRange';
import TrackInfo from '@/components/track/trackInfo/TrackInfo';
import Image from 'next/image';

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
          <div className={styles.player__controls}>
            <PlayerButtons player={'playerBar'} />
          </div>
          <div className={styles.player__trackInfo}>
            <div className={styles.track}>
              <div className={styles.track__img}>
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture}
                  alt={activeTrack.name}
                  width={50}
                  height={50}
                  priority={true}
                />
              </div>

              <div className={styles.track__info}>
                <div className={styles.track__info__trackName}>
                  {activeTrack.name}
                </div>
                <div className={styles.track__info__artistName}>
                  {activeTrack.artist}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.player__progress}>
            <Progress />
          </div>
          <div className={styles.player__volume}>
            <VolumeRange />
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
