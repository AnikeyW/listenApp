'use client';
import React, { MouseEvent } from 'react';
import styles from './Player.module.scss';
import Image from 'next/image';
import pauseIcon from '@/assets/pause-icon.svg';
import playIcon from '@/assets/play-icon.svg';
import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/tracklist/TrackList';
import { HiMiniXMark } from 'react-icons/hi2';
// import Sheet from 'react-modal-sheet';
import PlayerFullScreen from '@/components/player/playerFullScreen/PlayerFullScreen';
import { createPortal } from 'react-dom';
import Portal from '@/components/UI/Portal/Portal';

const Player = () => {
  const {
    pause,
    activeTrack,
    isShowPlayerFullScreen,
    playTrack,
    pauseTrack,
    setCurrentTime,
    setActiveTrack,
    setIsShowPlayerFullScreen,
  } = usePlayerStore((state) => state);

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

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  };

  const turnOffPlayer = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    audio.pause();
    setActiveTrack(null);
  };

  const showPlayerFullScreen = () => {
    setIsShowPlayerFullScreen(true);
  };

  return (
    <>
      {activeTrack ? (
        <div className={styles.player} onClick={showPlayerFullScreen}>
          <div className={styles.player__btn} onClick={play}>
            {!pause ? (
              <Image src={pauseIcon} alt={'pause'} width={24} height={24} />
            ) : (
              <Image src={playIcon} alt={'play'} width={24} height={24} />
            )}
          </div>
          <div className={styles.player__trackProgress}></div>
          <HiMiniXMark size={30} onClick={turnOffPlayer} />
        </div>
      ) : null}
      {/*<Sheet*/}
      {/*  isOpen={isShowPlayerFullScreen}*/}
      {/*  onClose={() => setIsShowPlayerFullScreen(false)}*/}
      {/*  // disableDrag={true}*/}
      {/*>*/}
      {/*  <Sheet.Container>*/}
      {/*    <Sheet.Content>*/}
      {/*      <PlayerFullScreen />*/}
      {/*    </Sheet.Content>*/}
      {/*  </Sheet.Container>*/}
      {/*  <Sheet.Backdrop />*/}
      {/*</Sheet>*/}
      <Portal
        isOpen={isShowPlayerFullScreen}
        onClose={() => setIsShowPlayerFullScreen(false)}
      >
        <PlayerFullScreen />
      </Portal>
    </>
  );
};

export default Player;
