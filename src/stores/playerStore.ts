import { ITrack } from '@/types/track';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IPlayerState {
  activeTrack: null | ITrack;
  audio: any;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  pauseTrack: () => void;
  playTrack: () => void;
  setCurrentTime: (value: number) => void;
  setVolume: (value: number) => void;
  setDuration: (value: number) => void;
  setActiveTrack: (track: ITrack | null) => void;
  setAudio: (webAudio: any) => void;
}

export const usePlayerStore = create<IPlayerState>()(
  devtools((set) => ({
    activeTrack: null,
    audio: null,
    currentTime: 0,
    duration: 0,
    pause: true,
    volume: 50,
    pauseTrack: () => set({ pause: true }),
    setAudio: (webAudio) => set({ audio: webAudio }),
    playTrack: () => set({ pause: false }),
    setCurrentTime: (value) => set({ currentTime: value }),
    setVolume: (value) => set({ volume: value }),
    setDuration: (value) => set({ duration: value }),
    setActiveTrack: (track) =>
      set({ activeTrack: track, duration: 0, currentTime: 0 }),
  })),
);
