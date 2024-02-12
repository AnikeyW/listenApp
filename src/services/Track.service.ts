import axios from 'axios';
import { CreateTrackDtoType, ITrack } from '@/types/track';

class TrackService {
  async getAll(count?: number, offset?: number): Promise<ITrack[]> {
    return axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + 'tracks', {
        params: {
          count: count ? count : 100,
          offset: offset ? offset : 0,
        },
      })
      .then((res) => res.data);
  }

  async delete(trackId: string): Promise<string> {
    return axios
      .delete(process.env.NEXT_PUBLIC_BASE_URL + 'tracks/' + trackId)
      .then((res) => res.data);
  }

  async create(data: CreateTrackDtoType): Promise<ITrack> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value, key);
      } else {
        formData.append(key, value as string);
      }
    });

    return axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + 'tracks', formData)
      .then((res) => res.data);
  }
}

export default new TrackService();
