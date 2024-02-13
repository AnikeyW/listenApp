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
import { useQuery } from '@tanstack/react-query';
import trackService from '@/services/Track.service';

interface ITrackItemProps {
  track: ITrack;
  indexOfTrack: number;
}

const TrackItem: React.FC<ITrackItemProps> = ({ track, indexOfTrack }) => {
  const [pauseLocal, setPauseLocal] = useState(true);
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const pause = usePlayerStore((state) => state.pause);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const setActiveTrack = usePlayerStore((state) => state.setActiveTrack);
  const setIndexOfActiveTrack = usePlayerStore(
    (state) => state.setIndexOfActiveTrack,
  );
  const setDuration = usePlayerStore((state) => state.setDuration);
  const setCurrentTime = usePlayerStore((state) => state.setCurrentTime);
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );
  const timeRef = useRef(Date.now());

  const { data, isSuccess } = useQuery({
    queryKey: ['tracks'],
    queryFn: () => trackService.getAll(),
    staleTime: 120 * 1000,
  });

  const clickItemHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (activeTrack && activeTrack?._id === track._id) {
      const isMobileScreen = window.matchMedia('(max-width: 640px)').matches;
      if (isMobileScreen) {
        setIsShowPlayerFullScreen(true);
      }
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
    setIndexOfActiveTrack(indexOfTrack);
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
      audio.volume = Number(localStorage.getItem('volume')) / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        if (!pause) {
          audio.play();
        }
      };
      audio.ontimeupdate = () => {
        if (Date.now() - timeRef.current > 1000) {
          setCurrentTime(Math.ceil(audio.currentTime));
          timeRef.current = Date.now();
        }
      };
      audio.onended = () => {
        if (isSuccess) {
          nextTrack(data);
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

      <div className={styles.track__info}>
        <TrackInfo track={track} withPhoto={false} />
      </div>

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
