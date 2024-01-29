'use client';
import React, { FC, MouseEvent } from 'react';
import Image from 'next/image';
import { RiPlayFill, RiRewindFill, RiSpeedFill } from 'react-icons/ri';
import { PiPauseFill } from 'react-icons/pi';
import { motion } from 'framer-motion';
import styles from './PlayerFullScreen.module.scss';
import TrackProgress from '@/components/trackProgress/TrackProgress';
import VolumeRange from '@/components/volumeRange/VolumeRange';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/tracklist/TrackList';

const PlayerFullScreen: FC = () => {
  const {
    activeTrack,
    currentTime,
    duration,
    pause,
    isShowPlayerFullScreen,
    setCurrentTime,
    playTrack,
    pauseTrack,
  } = usePlayerStore((state) => state);

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

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
    <>
      {activeTrack && (
        <motion.div
          animate={{ translateY: isShowPlayerFullScreen ? '100%' : '0%' }}
          className={styles.root}
        >
          <div className={styles.root__image}>
            <Image
              src={process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture}
              alt={'trackPicture'}
              width={300}
              height={300}
            />
          </div>
          <div className={styles.root__progressTrack}>
            <TrackProgress
              left={currentTime}
              right={duration}
              onChange={changeCurrentTime}
            />
          </div>
          <div className={styles.root__trackInfo}>
            <div className={styles.root__trackInfo_name}>
              {activeTrack.name}
            </div>
            <div className={styles.root__trackInfo_artist}>
              {activeTrack.artist}
            </div>
          </div>
          <div className={styles.root__btns}>
            <RiRewindFill color={'white'} size={35} />
            <div onClick={play}>
              {pause ? (
                <RiPlayFill color={'white'} size={60} />
              ) : (
                <PiPauseFill color={'white'} size={60} />
              )}
            </div>

            <RiSpeedFill color={'white'} size={35} />
          </div>
          <div className={styles.root__volume}>
            <VolumeRange />
          </div>
          <div className={styles.root__playerSettingsBtns}></div>
        </motion.div>
      )}
    </>
  );
};

export default PlayerFullScreen;
