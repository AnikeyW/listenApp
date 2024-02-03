'use client';
import React, { MouseEvent } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { MdOutlinePause, MdPlayArrow } from 'react-icons/md';

import styles from './Player.module.scss';

import { usePlayerStore } from '@/stores/playerStore';
import { audio } from '@/components/tracklist/TrackList';

import PlayerFullScreen from '@/components/player/playerFullScreen/PlayerFullScreen';
import Portal from '@/components/UI/Portal/Portal';
import ModalWithLayerEffect from '@/components/UI/ModalWithLayerEffect/ModalWithLayerEffect';

const Player = () => {
  const {
    pause,
    activeTrack,
    isShowPlayerFullScreen,
    playTrack,
    pauseTrack,
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
          <div className={styles.player__playPausebtn} onClick={play}>
            {!pause ? <MdOutlinePause size={30} /> : <MdPlayArrow size={30} />}
          </div>
          <div className={styles.player__trackInfo}>
            <div className={styles.player__trackInfo_name}>
              {activeTrack.name}
            </div>
            <div className={styles.player__trackInfo_artist}>
              {activeTrack.artist}
            </div>
          </div>
          <div className={styles.player__closeBtn}>
            <HiMiniXMark size={30} onClick={turnOffPlayer} />
          </div>
        </div>
      ) : null}

      <Portal>
        <ModalWithLayerEffect
          isOpen={isShowPlayerFullScreen}
          onClose={() => setIsShowPlayerFullScreen(false)}
        >
          <PlayerFullScreen />
        </ModalWithLayerEffect>
      </Portal>
    </>
  );
};

export default Player;
