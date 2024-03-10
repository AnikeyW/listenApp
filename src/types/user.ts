interface IFavoriteTrack {
  trackId: string;
  addedAt: string;
}

export interface IUser {
  _id: string;
  image: string;
  email: string;
  name: string;
  favoritesTracks: IFavoriteTrack[];
}
