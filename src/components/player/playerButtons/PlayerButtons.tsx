import React, { FC, MouseEvent } from 'react';
import styles from './PlayerButtons.module.scss';
import { RiPlayFill, RiRewindFill, RiSpeedFill } from 'react-icons/ri';
import { PiPauseFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/track/tracklist/TrackList';
import { useQuery } from '@tanstack/react-query';
import trackService from '@/services/Track.service';
import clsx from 'clsx';

type Player = 'playerFullScreen' | 'playerBar';

interface PlayerButtonsProps {
  player?: Player;
}

const PlayerButtons: FC<PlayerButtonsProps> = ({
  player = 'playerFullScreen',
}) => {
  const pause = usePlayerStore((state) => state.pause);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const pauseTrack = usePlayerStore((state) => state.pauseTrack);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const previousTrack = usePlayerStore((state) => state.previousTrack);

  const { data, isSuccess } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => trackService.getAll(),
    staleTime: 120 * 1000,
  });

  const play = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (pause) {
      playTrack();
    } else {
      pauseTrack();
    }
  };

  const nextTrackHandler = () => {
    if (isSuccess) {
      nextTrack(data);
    }
  };

  const previousTrackHandler = () => {
    if (isSuccess) {
      previousTrack(data);
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
      <div
        className={clsx(
          player === 'playerBar'
            ? styles.root__btnSmall
            : styles.root__btnLarge,
        )}
      >
        <RiRewindFill onClick={previousTrackHandler} />
      </div>
      <div onClick={play} className={styles.btn}>
        {pause ? (
          <RiPlayFill size={player === 'playerFullScreen' ? 60 : 30} />
        ) : (
          <PiPauseFill size={player === 'playerFullScreen' ? 60 : 30} />
        )}
      </div>

      <div
        className={clsx(
          player === 'playerBar'
            ? styles.root__btnSmall
            : styles.root__btnLarge,
        )}
      >
        <RiSpeedFill onClick={nextTrackHandler} />
      </div>
    </motion.div>
  );
};

export default PlayerButtons;
