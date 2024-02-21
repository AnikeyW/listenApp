import { ITrack } from '@/types/track';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { audio } from '@/components/track/tracklist/TrackList';
import { TIME_TO_INCREMENT_TRACK_LISTENS } from '@/constants';
import trackService from '@/services/Track.service';

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
  initTrack: (
    track: ITrack,
    indexOfTrack: number,
    playlist: ITrack[] | undefined,
    isSuccessPlaylist: boolean,
  ) => void;
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
    pauseTrack: () => {
      const activeTrack = getState().activeTrack;
      if (activeTrack) {
        audio.pause();
        set({ pause: true });
      }
    },
    playTrack: () => {
      const activeTrack = getState().activeTrack;
      if (activeTrack) {
        audio.play();
        set({ pause: false });
      }
    },
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

        getState().initTrack(
          nextTrack,
          getState().indexOfActiveTrack!,
          playList,
          true,
        );
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

        getState().initTrack(
          previousTrack,
          getState().indexOfActiveTrack!,
          playList,
          true,
        );
      }
    },
    initTrack: (track, indexOfTrack, playlist, isSuccessPlaylist) => {
      set({
        activeTrack: track,
        indexOfActiveTrack: indexOfTrack,
        pause: false,
        currentTime: 0,
      });
      if (!localStorage.getItem('volume')) {
        localStorage.setItem('volume', '50');
      }
      audio.src = process.env.NEXT_PUBLIC_BASE_URL + track.audio;
      audio.volume = Number(localStorage.getItem('volume')) / 100;
      audio.isListened = false;
      audio.onloadedmetadata = () => {
        set({ duration: Math.ceil(audio.duration) });
        if (!getState().pause) {
          audio.play();
        }
      };
      audio.ontimeupdate = () => {
        set({ currentTime: Math.ceil(audio.currentTime) });
        if (
          Math.ceil(audio.currentTime) >= TIME_TO_INCREMENT_TRACK_LISTENS &&
          !audio.isListened
        ) {
          trackService.listen(track._id);
          audio.isListened = true;
        }
      };
      audio.onended = () => {
        if (isSuccessPlaylist) {
          getState().nextTrack(playlist!);
        }
      };
    },
  })),
);
