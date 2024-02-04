'use client';
import React, { useRef, useState } from 'react';

import styles from './trackitem.module.scss';

import { ITrack } from '@/types/track';
import TrackOptions from '@/components/trackitem/trackOptions/TrackOptions';
import TrackDuration from '@/components/trackitem/trackDuration/TrackDuration';
import TrackInfo from '@/components/trackitem/trackInfo/TrackInfo';
import TrackImage, {
  RefType,
} from '@/components/trackitem/trackImage/TrackImage';

interface ITrackItemProps {
  track: ITrack;
}

const TrackItem: React.FC<ITrackItemProps> = ({ track }) => {
  const [pauseLocal, setPauseLocal] = useState(true);
  const childRef = useRef<RefType>(null);

  const clickItemHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (childRef.current) {
      childRef.current.clickItemHandler(e);
    }
  };

  return (
    <div className={styles.track} onClick={clickItemHandler}>
      <TrackImage
        track={track}
        pauseLocal={pauseLocal}
        setPauseLocal={setPauseLocal}
        ref={childRef}
      />
      <TrackInfo track={track} />
      <TrackDuration track={track} pauseLocal={pauseLocal} />
      <TrackOptions track={track} />
    </div>
  );
};

export default TrackItem;
