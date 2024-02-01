export interface ITrack {
  id: number;
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
