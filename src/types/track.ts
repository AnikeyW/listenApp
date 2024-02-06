export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  duration: number;
}

export interface IComment {
  id: number;
  author: string;
  text: string;
}

export interface ITrackInfo extends ITrack {
  comments: IComment[];
}

export interface IAlbum {
  id: number;
  name: string;
  picture: string;
}
