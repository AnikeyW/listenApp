export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  duration: number;
  albumId: string | null;
}

export interface IComment {
  id: number;
  author: string;
  text: string;
}

export interface ITrackInfo extends ITrack {
  comments: IComment[];
}
