export const APP_VERSION = '0.1.0';
export const TIME_TO_INCREMENT_TRACK_LISTENS = 20;

export enum mutationKey {
  UPDATE_USER_IMAGE = 'updateUserImage',
  DELETE_TRACK = 'deleteTrack',
  CREATE_TRACK = 'createTrack',
  CREATE_ALBUM = 'createAlbum',
  ADD_TRACK_TO_ALBUM = 'addTrackToAlbum',
  DELETE_ALBUM = 'deleteAlbum',
  ADD_TRACK_TO_FAVORITES = 'addTrackToFavorites',
  DELETE_TRACK_FROM_FAVORITES = 'deleteTrackFromFavorites',
}

export enum queryKey {
  GET_ALL_TRACKS = 'tracks',
  GET_ALL_ALBUMS = 'albums',
  GET_MY_TRACKS = 'getMyTracks',
  GET_MY_ALBUMS = 'getMyAlbums',
  GET_SEARCH_TRACKS = 'searchTracks',
  GET_FAVORITES_TRACKS = 'getFavoritesTracks',
}
