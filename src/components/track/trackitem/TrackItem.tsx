'use client';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';

import styles from './trackitem.module.scss';

import { ITrack } from '@/types/track';
import TrackOptions from '@/components/track/trackOptions/TrackOptions';
import TrackDuration from '@/components/track/trackDuration/TrackDuration';
import TrackInfo from '@/components/track/trackInfo/TrackInfo';
import TrackImage from '@/components/track/trackImage/TrackImage';
import { usePlayerStore } from '@/stores/playerStore';
import { audio, initAudio } from '@/components/track/tracklist/TrackList';

interface ITrackItemProps {
  track: ITrack;
}

const TrackItem: React.FC<ITrackItemProps> = ({ track }) => {
  const [pauseLocal, setPauseLocal] = useState(true);
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const setActiveTrack = usePlayerStore((state) => state.setActiveTrack);
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );
  const timeRef = useRef(Date.now());

  const clickItemHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (activeTrack && activeTrack?._id === track._id) {
      setIsShowPlayerFullScreen(true);
    } else {
      playHandler(e);
    }
  };

  const playHandler = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (activeTrack?._id === track._id) {
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

  const setInitAudio = () => {
    if (activeTrack && !pauseLocal) {
      if (!localStorage.getItem('volume')) {
        localStorage.setItem('volume', '50');
      }
      audio.src = process.env.NEXT_PUBLIC_BASE_URL + activeTrack.audio;
      // audio.src = process.env.NEXT_PUBLIC_BASE_URL + activeTrack.audio;
      audio.volume = Number(localStorage.getItem('volume')) / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        audio.play();
      };
      audio.ontimeupdate = () => {
        if (Date.now() - timeRef.current > 1000) {
          setCurrentTime(Math.ceil(audio.currentTime));
          timeRef.current = Date.now();
        }
      };
    }
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

  return (
    <div className={styles.track} onClick={clickItemHandler}>
      <TrackImage
        track={track}
        pauseLocal={pauseLocal}
        setPauseLocal={setPauseLocal}
        playHandler={playHandler}
        isActiveTrack={activeTrack?._id === track._id}
      />
      <TrackInfo track={track} />
      <TrackDuration
        track={track}
        pauseLocal={pauseLocal}
        isActiveTrack={activeTrack?._id === track._id}
      />
      <TrackOptions track={track} />
    </div>
  );
};

export default TrackItem;
