import { CreateAlbumDtoType, IAlbum } from '@/types/album';
import axios from 'axios';
import { ITrack } from '@/types/track';
import $api from '@/http';

class AlbumService {
  async getAll(): Promise<IAlbum[]> {
    return axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + 'albums')
      .then((res) => res.data);
  }

  async getMyAlbums(): Promise<IAlbum[]> {
    const response = await $api.get('albums/useralbums');
    return response.data;
  }

  async create(data: CreateAlbumDtoType): Promise<IAlbum> {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Blob) {
        formData.append(key, value, key);
      } else {
        formData.append(key, value as string);
      }
    });

    return $api.post('albums', formData).then((res) => res.data);
  }

  async addTrackToAlbum(albumId: string, trackId: string): Promise<ITrack> {
    return $api
      .post('albums/addtrack', {
        albumId,
        trackId,
      })
      .then((res) => res.data);
  }

  async delete(albumId: string): Promise<string> {
    return $api.delete('albums/' + albumId).then((res) => res.data);
  }

  async getOne(albumId: string): Promise<IAlbum> {
    return axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + 'albums/' + albumId)
      .then((res) => res.data);
  }
}

export default new AlbumService();
