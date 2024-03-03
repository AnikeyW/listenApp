import React, { FC, useState } from 'react';
import styles from './volumeRange.module.scss';
import { audio } from '@/components/track/tracklist/TrackList';
import { usePlayerStore } from '@/stores/playerStore';
import { MdOutlineVolumeUp, MdOutlineVolumeOff } from 'react-icons/md';

const VolumeRange: FC = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const [isMuted, setIsMuted] = useState(false);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>): void => {
    e.stopPropagation();
    const volumeValue = Math.ceil(Number(e.target.value));
    if (volume !== volumeValue) {
      audio.volume = volumeValue / 100;
      if (Math.abs(volumeValue - volume) >= Math.abs(1)) {
        setVolume(volumeValue);
        localStorage.setItem('volume', volumeValue.toString());
      }
    }
  };

  const muteOn = () => {
    audio.muted = true;
    setIsMuted(true);
  };

  const muteOff = () => {
    audio.muted = false;
    setIsMuted(false);
  };

  return (
    <div className={styles.root}>
      {isMuted ? (
        <div className={styles.root__volumeIcon} onClick={muteOff}>
          <MdOutlineVolumeOff size={28} />
        </div>
      ) : (
        <div className={styles.root__volumeIcon} onClick={muteOn}>
          <MdOutlineVolumeUp size={28} />
        </div>
      )}

      <input
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={changeVolume}
      />
    </div>
  );
};

export default VolumeRange;
