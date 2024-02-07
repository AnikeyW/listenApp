import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios, { AxiosError } from 'axios';
import * as uuid from 'uuid';
import { upload } from '@vercel/blob/client';
import { getAudioDuration } from '@/utils';

interface ICreatetrackState {
  name: { value: string; error: string };
  artist: { value: string; error: string };
  text: { value: string; error: string };
  picture: { img: any; error: string };
  audioFile: { value: any; error: string };
  isLoading: boolean;
  error: string | null;
  setName: (payload: { value: string; error: string }) => void;
  setArtist: (payload: { value: string; error: string }) => void;
  setText: (payload: { value: string; error: string }) => void;
  setPicture: (payload: { img: any; error: string }) => void;
  setAudio: (payload: { value: any; error: string }) => void;
  validateStepOne: () => boolean;
  validateStepTwo: () => boolean;
  validateStepThree: () => boolean;
  createTrack: () => void;
}

export const useCreateTrackStore = create<ICreatetrackState>()(
  devtools((set, getState) => ({
    name: { value: '', error: '' },
    artist: { value: '', error: '' },
    text: { value: '', error: '' },
    picture: { img: null, error: '' },
    audioFile: { value: null, error: '' },
    isLoading: false,
    error: null,
    setName: (payload) => set({ name: payload }),
    setArtist: (payload) => set({ artist: payload }),
    setText: (payload) => set({ text: payload }),
    setPicture: (payload) => set({ picture: payload }),
    setAudio: (payload) => set({ audioFile: payload }),

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

    createTrack: async (): Promise<void> => {
      try {
        set({ error: null });
        set({ isLoading: true });
        // const imageExtension = getState().picture.img.name.split('.').pop();
        // const audioExtension = getState().audioFile.value.name.split('.').pop();
        // const imageName = uuid.v4() + '.' + imageExtension;
        // const audioName = uuid.v4() + '.' + audioExtension;
        // const imageBlob = await upload(imageName, getState().picture.img, {
        //   access: 'public',
        //   handleUploadUrl: '/api/image/upload',
        // });
        // const audioBlob = await upload(audioName, getState().audioFile.value, {
        //   access: 'public',
        //   handleUploadUrl: '/api/audio/upload',
        // });
        // const duration = await getAudioDuration(getState().audioFile.value);
        const formData = new FormData();
        formData.append('name', getState().name.value);
        formData.append('artist', getState().artist.value);
        formData.append('text', getState().text.value);
        formData.append('picture', getState().picture.img);
        formData.append('audio', getState().audioFile.value);
        // const data = {
        //   name: getState().name.value,
        //   artist: getState().artist.value,
        //   text: getState().text.value,
        //   picture: getState().picture.img,
        //   audio: getState().audioFile.value,
        //   // duration: Math.ceil(duration),
        // };
        console.log(formData);
        const response = await axios.post(
          process.env.NEXT_PUBLIC_BASE_URL + 'tracks',
          formData,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          },
        );
        set({
          name: { value: '', error: '' },
          artist: { value: '', error: '' },
          text: { value: '', error: '' },
          picture: { img: null, error: '' },
          audioFile: { value: null, error: '' },
        });
      } catch (err: unknown) {
        if (err instanceof AxiosError) {
          set({ error: err.message });
          return;
        }
        console.error(err);
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
