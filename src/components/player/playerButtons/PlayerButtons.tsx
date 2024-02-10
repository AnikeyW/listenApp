import React, { FC, MouseEvent } from 'react';
import styles from './PlayerButtons.module.scss';
import { RiPlayFill, RiRewindFill, RiSpeedFill } from 'react-icons/ri';
import { PiPauseFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/track/tracklist/TrackList';

type Player = 'full' | 'small';

interface PlayerButtonsProps {
  player?: Player;
}

const PlayerButtons: FC<PlayerButtonsProps> = ({ player = 'full' }) => {
  const pause = usePlayerStore((state) => state.pause);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const pauseTrack = usePlayerStore((state) => state.pauseTrack);

  const play = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
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
      {player === 'full' && <RiRewindFill size={35} />}
      <div onClick={play}>
        {pause ? (
          <RiPlayFill size={player === 'full' ? 60 : 30} />
        ) : (
          <PiPauseFill size={player === 'full' ? 60 : 30} />
        )}
      </div>

      {player === 'full' && <RiSpeedFill size={35} />}
    </motion.div>
  );
};

export default PlayerButtons;
