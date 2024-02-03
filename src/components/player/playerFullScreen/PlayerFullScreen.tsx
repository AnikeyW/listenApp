'use client';
import React, { FC, MouseEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RiPlayFill, RiRewindFill, RiSpeedFill } from 'react-icons/ri';
import { PiPauseFill } from 'react-icons/pi';
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
        <div className={styles.root}>
          <div className={styles.root__handle}></div>

          <motion.div
            variants={{
              play: {
                opacity: 1,
              },
              pause: {
                opacity: 0,
              },
            }}
            animate={!pause ? 'play' : 'pause'}
            exit={'pause'}
            transition={{ ease: 'easeOut', duration: 0.25 }}
            className={styles.root__bgGlass}
            style={{
              background: `url(${
                process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture
              })`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          ></motion.div>
          <motion.div
            animate={
              !pause ? { transform: 'scale(1.1)' } : { transform: 'scale(1)' }
            }
            transition={{ duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }}
            className={styles.root__image}
          >
            <Image
              src={process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture}
              alt={'trackPicture'}
              width={400}
              height={400}
            />
          </motion.div>
          <motion.div
            className={styles.root__progressTrack}
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
          <div className={styles.root__trackInfo}>
            <div className={styles.root__trackInfo_name}>
              {activeTrack.name}
            </div>
            <div className={styles.root__trackInfo_artist}>
              {activeTrack.artist}
            </div>
          </div>
          <motion.div
            className={styles.root__btns}
            drag={'y'}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={0}
          >
            <RiRewindFill size={35} />
            <div onClick={play}>
              {pause ? <RiPlayFill size={60} /> : <PiPauseFill size={60} />}
            </div>

            <RiSpeedFill size={35} />
          </motion.div>
          <motion.div
            className={styles.root__volume}
            drag={'y'}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={0}
          >
            <VolumeRange />
          </motion.div>
          <div className={styles.root__playerSettingsBtns}></div>
        </div>
      )}
    </>
  );
};

export default PlayerFullScreen;
