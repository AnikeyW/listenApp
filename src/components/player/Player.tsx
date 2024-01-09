'use client';
import React, { useEffect, useRef } from 'react';
import styles from './Player.module.scss';
import Image from 'next/image';
import pauseIcon from '@/assets/pause-icon.svg';
import playIcon from '@/assets/play-icon.svg';
import TrackProgress from '@/components/trackProgress/TrackProgress';
import volumeIcon from '@/assets/volume-icon.svg';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/tracklist/TrackList';

const Player = () => {
  const {
    pause,
    duration,
    currentTime,
    volume,
    activeTrack,
    playTrack,
    pauseTrack,
    setVolume,
    setCurrentTime,
    setDuration,
  } = usePlayerStore((state) => state);

  // useEffect(() => {
  //   if (!audio) {
  //     initAudio();
  //   } else {
  //     setInitAudio();
  //     if (activeTrack) {
  //       play();
  //     }
  //   }
  // }, [activeTrack]);

  const setInitAudio = () => {
    if (activeTrack) {
      audio.src = process.env.NEXT_PUBLIC_BASE_URL + activeTrack.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };
    }
  };

  const play = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  return (
    <>
      {activeTrack ? (
        <div className={styles.player}>
          <div className={styles.player__btn} onClick={play}>
            {!pause ? (
              <Image src={pauseIcon} alt={'pause'} width={24} height={24} />
            ) : (
              <Image src={playIcon} alt={'play'} width={24} height={24} />
            )}
          </div>
          <div className={styles.player__trackProgress}>
            <TrackProgress
              left={currentTime}
              right={duration}
              onChange={changeCurrentTime}
            />
          </div>
          <Image
            src={volumeIcon}
            alt={'volume'}
            width={24}
            height={24}
            style={{ marginLeft: 'auto' }}
          />
          <TrackProgress left={volume} right={100} onChange={changeVolume} />
        </div>
      ) : null}
    </>
  );
};

export default Player;
