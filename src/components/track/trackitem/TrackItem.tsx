'use client';
import React, { MouseEvent, useEffect, useState } from 'react';

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
  indexOfTrack: number;
  playlist: ITrack[];
}

const TrackItem: React.FC<ITrackItemProps> = ({
  track,
  indexOfTrack,
  playlist,
}) => {
  const [pauseLocal, setPauseLocal] = useState(true);
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const setPlayList = usePlayerStore((state) => state.setPlayList);
  const initTrack = usePlayerStore((state) => state.initTrack);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const setIsShowPlayerFullScreen = usePlayerStore(
    (state) => state.setIsShowPlayerFullScreen,
  );

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
    if (activeTrack?._id !== track._id) {
      setPlayList(playlist);
      initTrack(track, indexOfTrack);
    }
    playTrack();
    setPauseLocal(false);
  };

  useEffect(() => {
    if (!audio) {
      initAudio();
    }
  }, []);

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
