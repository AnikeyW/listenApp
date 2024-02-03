'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import Image from 'next/image';

import styles from './trackitem.module.scss';
import animateIcon from '../../assets/sound.gif';

import { usePlayerStore } from '@/stores/playerStore';
import { useTrackStore } from '@/stores/trackStore';
import { ITrack } from '@/types/track';
import { audio, initAudio } from '@/components/tracklist/TrackList';
import { formatTime } from '@/utils';
import { MdPlayArrow, MdDeleteForever } from 'react-icons/md';
import Portal from '@/components/UI/Portal/Portal';
import Modal from '@/components/UI/NewModal/Modal';

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
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );
  const deleteTrack = useTrackStore((state) => state.deleteTrack);

  const [isOpenModal, setIsOpenModal] = useState(false);

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

  useEffect(() => {
    if (pause) {
      setPauseLocal(true);
    } else {
      setPauseLocal(false);
    }
  }, [pause]);

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

  const clickItemHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (activeTrack && activeTrack?.id === track.id) {
      setIsShowPlayerFullScreen(true);
    } else {
      playHandler(e);
    }
  };

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpenModal(true);
  };

  return (
    <div className={styles.track} onClick={clickItemHandler}>
      <div className={styles.track__img}>
        <Image
          src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
          alt={track.name}
          width={50}
          height={50}
          onClick={playHandler}
        />
        {pause && pauseLocal && activeTrack?.id === track.id && (
          <div className={styles.track__img_gif}>
            <MdPlayArrow size={40} onClick={playHandler} />
          </div>
        )}
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
          : pause && pauseLocal && activeTrack?.id === track.id
            ? formatTime(currentTime)
            : formatTime(track.duration)}
      </div>
      <div className={styles.track__options} onClick={openModal}>
        <span className={styles.track__options_dot}></span>
      </div>
      <Portal>
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <div className={styles.track__modal}>
            <div className={styles.track__modal_top}>
              <div className={styles.track}>
                <div className={styles.track__img}>
                  <Image
                    src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
                    alt={track.name}
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.track__info}>
                  <div className={styles.track__info__trackName}>
                    {track.name}
                  </div>
                  <div className={styles.track__info__artistName}>
                    {track.artist}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={styles.track__modal_deleteTrack}
              onClick={deleteHandler}
            >
              <MdDeleteForever size={34} />
              <span>Удалить</span>
            </div>
          </div>
        </Modal>
      </Portal>
    </div>
  );
};

export default TrackItem;
