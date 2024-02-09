import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface IAlbumState {
  name: { value: string; error: string };
  author: { value: string; error: string };
  picture: { img: any; error: string };
  setName: (payload: { value: string; error: string }) => void;
  setAuthor: (payload: { value: string; error: string }) => void;
  setPicture: (payload: { img: any; error: string }) => void;
  validateStepOne: () => boolean;
  validateStepTwo: () => boolean;
}

export const useAlbumStore = create<IAlbumState>()(
  devtools((set, getState) => ({
    name: { value: '', error: '' },
    author: { value: '', error: '' },
    picture: { img: null, error: '' },
    setName: (payload) => set({ name: payload }),
    setAuthor: (payload) => set({ author: payload }),
    setPicture: (payload) => set({ picture: payload }),
    validateStepOne: () => {
      if (getState().name.value === '') {
        set({ name: { value: '', error: 'Обязательное поле' } });
      }
      if (getState().author.value === '') {
        set({ author: { value: '', error: 'Обязательное поле' } });
      }
      return getState().name.value !== '' && getState().author.value !== '';
    },

    validateStepTwo: () => {
      if (!getState().picture.img) {
        set({ picture: { img: null, error: 'Изображение не загружено' } });
      }
      return getState().picture.img;
    },
  })),
);
