import React, { FC } from 'react';
import styles from './PlayerTrackInfo.module.scss';
import Image from 'next/image';
import { usePlayerStore } from '@/stores/playerStore';

const PlayerTrackInfo: FC = () => {
  const activeTrack = usePlayerStore((state) => state.activeTrack);

  return (
    <>
      {activeTrack && (
        <div className={styles.track}>
          <div className={styles.track__img}>
            <Image
              src={process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture}
              alt={activeTrack.name}
              width={50}
              height={50}
              priority={true}
            />
          </div>

          <div className={styles.track__info}>
            <div className={styles.track__info__trackName}>
              {activeTrack.name}
            </div>
            <div className={styles.track__info__artistName}>
              {activeTrack.artist}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlayerTrackInfo;
