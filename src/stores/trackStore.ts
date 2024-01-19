import { create } from 'zustand';
import { ITrack } from '@/types/track';
import axios, { AxiosError } from 'axios';

interface ITrackState {
  tracks: ITrack[];
  isLoading: boolean;
  error: string | null;
  fetchTracks: (count?: number, offset?: number) => void;
  deleteTrack: (trackId: number) => void;
}

export const useTrackStore = create<ITrackState>()((set, getState) => ({
  tracks: [],
  isLoading: false,
  error: null,
  fetchTracks: async (count, offset): Promise<void> => {
    try {
      set({ error: null });
      set({ isLoading: true });
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + 'tracks',
        {params:{
            count,
            offset
          }}
      );
      set({ tracks: response.data });
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
  deleteTrack: async (trackId: number) => {
    try {
      const response = await axios.delete(
        process.env.NEXT_PUBLIC_BASE_URL + 'tracks/' + trackId,
      );
      if (response.status === 200) {
        const removedTrackId = response.data;
        const tracks = getState().tracks.filter(
          (track) => track.id !== removedTrackId,
        );
        set({ tracks });
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        set({ error: err.message });
        return;
      }
      console.error(err);
    }
  },
}));
