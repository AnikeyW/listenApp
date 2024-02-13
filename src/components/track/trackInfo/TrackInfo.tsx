import React, { FC, memo } from 'react';
import styles from './TrackInfo.module.scss';
import { ITrack } from '@/types/track';
import Image from 'next/image';

interface TrackInfoProps {
  track: ITrack;
  withPhoto: boolean;
}

const TrackInfo: FC<TrackInfoProps> = ({ track, withPhoto }) => {
  return (
    <div className={styles.track}>
      {withPhoto && (
        <div className={styles.track__img}>
          <Image
            src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
            alt={track.name}
            width={50}
            height={50}
            priority={true}
          />
        </div>
      )}

      <div className={styles.track__info}>
        <div className={styles.track__info__trackName}>{track.name}</div>
        <div className={styles.track__info__artistName}>{track.artist}</div>
      </div>
    </div>
  );
};

export default memo(TrackInfo);
