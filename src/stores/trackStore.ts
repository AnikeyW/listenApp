import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ITrackState {
  name: { value: string; error: string };
  artist: { value: string; error: string };
  text: { value: string; error: string };
  picture: { img: any; error: string };
  audioFile: { value: any; error: string };
  albumId: string;
  useAlbumPictureCreatingTrack: boolean;
  setName: (payload: { value: string; error: string }) => void;
  setArtist: (payload: { value: string; error: string }) => void;
  setText: (payload: { value: string; error: string }) => void;
  setPicture: (payload: { img: any; error: string }) => void;
  setAudio: (payload: { value: any; error: string }) => void;
  setUseAlbumPictureCreatingTrack: (payload: boolean) => void;
  setAlbumId: (payload: string) => void;
  validateStepOne: () => boolean;
  validateStepTwo: () => boolean;
  validateStepThree: () => boolean;
  resetAllFields: () => void;
}

export const useTrackStore = create<ITrackState>()(
  devtools((set, getState) => ({
    name: { value: '', error: '' },
    artist: { value: '', error: '' },
    text: { value: '', error: '' },
    picture: { img: null, error: '' },
    audioFile: { value: null, error: '' },
    albumId: '',
    useAlbumPictureCreatingTrack: false,
    setName: (payload) => set({ name: payload }),
    setArtist: (payload) => set({ artist: payload }),
    setText: (payload) => set({ text: payload }),
    setPicture: (payload) => set({ picture: payload }),
    setAudio: (payload) => set({ audioFile: payload }),
    setAlbumId: (payload) => set({ albumId: payload }),

    setUseAlbumPictureCreatingTrack: (payload) => {
      set({ useAlbumPictureCreatingTrack: payload });
    },

    validateStepOne: () => {
      if (getState().name.value === '') {
        set({ name: { value: '', error: 'Обязательное поле' } });
      }
      if (getState().artist.value === '') {
        set({ artist: { value: '', error: 'Обязательное поле' } });
      }
      return getState().name.value !== '' && getState().artist.value !== '';
    },

    validateStepTwo: () => {
      if (!getState().picture.img) {
        set({ picture: { img: null, error: 'Изображение не загружено' } });
      }
      return getState().picture.img;
    },

    validateStepThree: () => {
      if (!getState().audioFile.value) {
        set({ audioFile: { value: null, error: 'Аудио не загружено' } });
      }
      return getState().audioFile.value;
    },
    resetAllFields: () => {
      set({
        name: { value: '', error: '' },
        artist: { value: '', error: '' },
        text: { value: '', error: '' },
        picture: { img: null, error: '' },
        audioFile: { value: null, error: '' },
        albumId: '',
        useAlbumPictureCreatingTrack: false,
      });
    },
  })),
);
