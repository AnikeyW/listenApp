import React, { FC, MouseEvent } from 'react';
import styles from './PlayerButtons.module.scss';
import { RiPlayFill, RiRewindFill, RiSpeedFill } from 'react-icons/ri';
import { PiPauseFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/track/tracklist/TrackList';
import { useQuery } from '@tanstack/react-query';
import trackService from '@/services/Track.service';

type Player = 'full' | 'small';

interface PlayerButtonsProps {
  player?: Player;
}

const PlayerButtons: FC<PlayerButtonsProps> = ({ player = 'full' }) => {
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
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
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
      {player === 'full' && (
        <RiRewindFill size={35} onClick={previousTrackHandler} />
      )}
      <div onClick={play}>
        {pause ? (
          <RiPlayFill size={player === 'full' ? 60 : 30} />
        ) : (
          <PiPauseFill size={player === 'full' ? 60 : 30} />
        )}
      </div>

      {player === 'full' && (
        <RiSpeedFill size={35} onClick={nextTrackHandler} />
      )}
    </motion.div>
  );
};

export default PlayerButtons;
