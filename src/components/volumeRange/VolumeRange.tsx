import React, { FC } from 'react';
import styles from './volumeRange.module.scss';
import { audio } from '@/components/tracklist/TrackList';
import { usePlayerStore } from '@/stores/playerStore';

// interface IVolumeRangeProps {
//   left: number;
//   right: number;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }

const VolumeRange: FC = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    const volumeValue = Math.ceil(Number(e.target.value));
    if (volume !== volumeValue) {
      audio.volume = volumeValue / 100;
      setVolume(volumeValue);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__range}>
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={changeVolume}
        />
      </div>
    </div>
  );
};

export default VolumeRange;
