import { IAlbum } from '@/types/album';
import axios from 'axios';

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
}

export default new AlbumService();
