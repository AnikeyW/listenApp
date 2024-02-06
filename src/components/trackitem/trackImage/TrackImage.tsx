import React, { FC, memo, MouseEvent, useEffect } from 'react';
import Image from 'next/image';
import styles from './TrackImage.module.scss';
import { MdPlayArrow } from 'react-icons/md';
import animateIcon from '@/assets/sound.gif';
import { ITrack } from '@/types/track';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/tracklist/TrackList';

interface TrackImageProps {
  pauseLocal: boolean;
  track: ITrack;
  setPauseLocal: (value: boolean) => void;
  playHandler: (e: MouseEvent<HTMLElement>) => void;
  isActiveTrack: boolean;
}

const TrackImage: FC<TrackImageProps> = ({
  track,
  pauseLocal,
  setPauseLocal,
  playHandler,
  isActiveTrack,
}) => {
  const pause = usePlayerStore((state) => state.pause);
  const pauseTrack = usePlayerStore((state) => state.pauseTrack);

  const pauseHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    pauseTrack();
    setPauseLocal(true);
    audio.pause();
  };

  useEffect(() => {
    if (isActiveTrack) {
      if (pause) {
        setPauseLocal(true);
      } else {
        setPauseLocal(false);
      }
    }
  }, [pause]);

  return (
    <div className={styles.root}>
      <Image
        src={track.picture}
        alt={track.name}
        width={50}
        height={50}
        onClick={playHandler}
      />
      {pauseLocal && isActiveTrack && (
        <div className={styles.root__gif}>
          <MdPlayArrow size={40} onClick={playHandler} />
        </div>
      )}
      {!pauseLocal && isActiveTrack && (
        <div className={styles.root__gif}>
          <Image
            src={animateIcon}
            alt={'playing icon'}
            width={50}
            height={50}
            onClick={pauseHandler}
          />
        </div>
      )}
    </div>
  );
};

export default memo(TrackImage);
