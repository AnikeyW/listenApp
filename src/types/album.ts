import { ITrack } from '@/types/track';

export interface IAlbum {
  _id: string;
  name: string;
  owner: string;
  author: string;
  picture: string;
  tracks: ITrack[];
}

export interface CreateAlbumDtoType
  extends Omit<IAlbum, '_id' | 'tracks' | 'owner'> {}
