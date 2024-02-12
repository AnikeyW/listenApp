import { ITrack } from '@/types/track';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { audio } from '@/components/track/tracklist/TrackList';

interface IPlayerState {
  activeTrack: ITrack | null;
  indexOfActiveTrack: number | null;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  isShowPlayerFullScreen: boolean;
  pauseTrack: () => void;
  playTrack: () => void;
  setCurrentTime: (value: number) => void;
  setVolume: (value: number) => void;
  setDuration: (value: number) => void;
  setActiveTrack: (track: ITrack | null) => void;
  setIndexOfActiveTrack: (index: number | null) => void;
  setIsShowPlayerFullScreen: (value: boolean) => void;
  nextTrack: (playList: ITrack[]) => void;
  previousTrack: (playList: ITrack[]) => void;
}

export const usePlayerStore = create<IPlayerState>()(
  devtools((set, getState) => ({
    activeTrack: null,
    indexOfActiveTrack: null,
    currentTime: 0,
    duration: 0,
    pause: true,
    volume: 50,
    isShowPlayerFullScreen: false,
    pauseTrack: () => set({ pause: true }),
    playTrack: () => set({ pause: false }),
    setCurrentTime: (value) => set({ currentTime: value }),
    setVolume: (value) => set({ volume: value }),
    setDuration: (value) => set({ duration: value }),
    setIndexOfActiveTrack: (index) => set({ indexOfActiveTrack: index }),
    setActiveTrack: (track) => set({ activeTrack: track, currentTime: 0 }),
    setIsShowPlayerFullScreen: (value) =>
      set({ isShowPlayerFullScreen: value }),
    nextTrack: (playList) => {
      const indOfActTrack = getState().indexOfActiveTrack;

      if (indOfActTrack !== null) {
        audio.pause();

        let nextTrack;

        if (getState().indexOfActiveTrack === playList.length - 1) {
          nextTrack = playList[0];
          set({ indexOfActiveTrack: 0 });
        } else {
          nextTrack = playList[indOfActTrack + 1];
          set({ indexOfActiveTrack: indOfActTrack + 1 });
        }

        audio.src = process.env.NEXT_PUBLIC_BASE_URL! + nextTrack;

        set({ activeTrack: nextTrack, currentTime: 0 });
      }
    },
    previousTrack: (playList) => {
      const indOfActTrack = getState().indexOfActiveTrack;

      if (indOfActTrack !== null) {
        audio.pause();

        let previousTrack;

        if (indOfActTrack === 0) {
          previousTrack = playList[playList.length - 1];
          set({ indexOfActiveTrack: playList.length - 1 });
        } else {
          previousTrack = playList[indOfActTrack - 1];
          set({ indexOfActiveTrack: indOfActTrack - 1 });
        }

        audio.src = process.env.NEXT_PUBLIC_BASE_URL! + previousTrack;

        set({ activeTrack: previousTrack, currentTime: 0 });
      }
    },
  })),
);
