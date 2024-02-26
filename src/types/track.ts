export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  owner: string;
  picture: string;
  audio: string;
  duration: number;
  albumId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTrackDtoType
  extends Omit<ITrack, '_id' | 'listens' | 'duration'> {}

export interface IComment {
  id: number;
  author: string;
  text: string;
}

export interface ITrackInfo extends ITrack {
  comments: IComment[];
}
