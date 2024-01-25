import React, { FC, MouseEvent } from 'react';
import styles from './Content.module.scss';
import { usePlayerStore } from '@/stores/playerStore';
import Image from 'next/image';
import { audio } from '@/components/tracklist/TrackList';
import TrackProgress from '@/components/trackProgress/TrackProgress';
import { RiPlayFill, RiRewindFill, RiSpeedFill } from 'react-icons/ri';
import { PiPauseFill } from 'react-icons/pi';

const Content: FC = () => {
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
            <TrackProgress
              left={currentTime}
              right={duration}
              onChange={changeCurrentTime}
            />
          </div>
          <div className={styles.root__playerSettingsBtns}></div>
        </div>
      )}
    </>
  );
};

export default Content;
