'use client';
import React from 'react';
import styles from './tracklist.module.scss';
import TrackItem from '@/components/track/trackitem/TrackItem';
import { ITrack } from '@/types/track';

export let audio: any;

export const initAudio = () => {
  audio = new Audio();
};

interface TrackListProps {
  tracks: ITrack[];
}
const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <div className={styles.tracklist}>
      {tracks.length > 0 &&
        tracks.map((track, index) => (
          <TrackItem
            track={track}
            key={track._id}
            indexOfTrack={index}
            playlist={tracks}
          />
        ))}
    </div>
  );
};

export default TrackList;
