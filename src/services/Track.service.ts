import axios from 'axios';
import { CreateTrackDtoType, ITrack } from '@/types/track';
import $api from '@/http';
import { IUser } from '@/types/user';

class TrackService {
  async getMyTracks(
    userId: string,
    count?: number,
    offset?: number,
  ): Promise<ITrack[]> {
    const response = await $api.get<ITrack[]>(`tracks/usertracks`, {
      params: {
        userId: userId,
        count: count ? count : 100,
        offset: offset ? offset : 0,
      },
    });
    return response.data;
  }

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
    return $api
      .delete(process.env.NEXT_PUBLIC_BASE_URL + 'tracks/' + trackId)
      .then((res) => res.data);
  }

  async addTrackToFavorites(trackId: string, userId: string): Promise<IUser> {
    return $api
      .patch('tracks/tofavorites', {
        trackId,
        userId,
      })
      .then((res) => res.data);
  }

  async listen(trackId: string): Promise<void> {
    return axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + 'tracks/listen/' + trackId,
    );
  }

  async search(query: string): Promise<ITrack[]> {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + 'tracks/search',
      {
        params: {
          query: query,
        },
      },
    );
    return response.data;
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
