'use client';
import React from 'react';
import styles from './tracklist.module.scss';
import TrackItem from '@/components/trackitem/TrackItem';
import { ITrack } from '@/types/track';
import { usePlayerStore } from '@/stores/playerStore'

export let audio: any;

export const initAudio = () => {
  audio = new Audio();
};

interface TrackListProps {
  tracks: ITrack[];
}
const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  return (
    <div className={`${styles.tracklist} ${activeTrack ? styles.withActiveTrack : ''}`}>
      {tracks.length > 0 &&
        tracks.map((track) => <TrackItem track={track} key={track.id} />)}
    </div>
  );
};

export default TrackList;
