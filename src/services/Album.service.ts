import { IAlbum } from '@/types/album';
import axios from 'axios';
import { ITrack } from '@/types/track';

class AlbumService {
  async getAll(): Promise<IAlbum[]> {
    return axios
      .get(process.env.NEXT_PUBLIC_BASE_URL + 'albums')
      .then((res) => res.data);
  }

  async create(data: any): Promise<IAlbum> {
    return axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + 'albums', data)
      .then((res) => res.data);
  }

  async addTrackToAlbum(albumId: string, trackId: string): Promise<ITrack> {
    return axios
      .post(process.env.NEXT_PUBLIC_BASE_URL + 'albums/addtrack', {
        albumId,
        trackId,
      })
      .then((res) => res.data);
  }

  async delete(albumId: string): Promise<string> {
    return axios
      .delete(process.env.NEXT_PUBLIC_BASE_URL + 'albums/' + albumId)
      .then((res) => res.data);
  }
}

export default new AlbumService();
