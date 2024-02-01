'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import styles from './trackitem.module.scss';
import deleteIcon from '../../assets/delete-icon.svg';
import animateIcon from '../../assets/sound.gif';

import { usePlayerStore } from '@/stores/playerStore';
import { useTrackStore } from '@/stores/trackStore';
import { ITrack } from '@/types/track';
import { audio, initAudio } from '@/components/tracklist/TrackList';
import { formatTime } from '@/utils';

interface ITrackItemProps {
  track: ITrack;
}

const TrackItem: React.FC<ITrackItemProps> = ({ track }) => {
  const [pauseLocal, setPauseLocal] = useState(true);
  const pause = usePlayerStore((state) => state.pause);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const pauseTrack = usePlayerStore((state) => state.pauseTrack);
  const volume = usePlayerStore((state) => state.volume);
  const setActiveTrack = usePlayerStore((state) => state.setActiveTrack);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const currentTime = usePlayerStore((state) => state.currentTime);
  const deleteTrack = useTrackStore((state) => state.deleteTrack);
  const router = useRouter();

  const playHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (activeTrack?.id === track.id) {
      audio.play();
      playTrack();
      setPauseLocal(false);
      return;
    }
    setActiveTrack(track);
    setInitAudio();
    playTrack();
    setPauseLocal(false);
  };

  const pauseHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    pauseTrack();
    setPauseLocal(true);
    audio.pause();
  };

  useEffect(() => {
    if (!audio) {
      initAudio();
    } else {
      if (activeTrack) {
        setPauseLocal(false);
      }
      setInitAudio();
    }
  }, [activeTrack]);

  const setInitAudio = () => {
    if (activeTrack && !pauseLocal) {
      audio.src = process.env.NEXT_PUBLIC_BASE_URL + activeTrack.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        audio.play();
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteTrack(track.id);
  };

  return (
    <div
      className={styles.track}
      onClick={() => router.push('/tracks/' + track.id)}
    >
      <div className={styles.track__img}>
        <Image
          src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
          alt={track.name}
          width={50}
          height={50}
          onClick={playHandler}
        />
        {!pause && !pauseLocal && activeTrack?.id === track.id && (
          <div className={styles.track__img_gif}>
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
      <div className={styles.track__info}>
        <div className={styles.track__info__trackName}>{track.name}</div>
        <div className={styles.track__info__artistName}>{track.artist}</div>
      </div>

      <div className={styles.track__duration}>
        {!pause && !pauseLocal && activeTrack?.id === track.id
          ? formatTime(currentTime)
          : formatTime(track.duration)}
      </div>
      <div>
        <Image
          onClick={deleteHandler}
          src={deleteIcon}
          alt={'delete'}
          width={24}
        />
      </div>
    </div>
  );
};

export default TrackItem;
