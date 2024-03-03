import React from 'react';
import styles from './FavoriteButton.module.scss';
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { useAuthStore } from '@/stores/authStore';
import { usePlayerStore } from '@/stores/playerStore';
import { useAddTrackToFavorites } from '@/hooks/track/useAddTrackToFavorites';

const FavoriteButton = () => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const user = useAuthStore((state) => state.user);
  const activeTrack = usePlayerStore((state) => state.activeTrack);
  const addTrackToFavoritesMutation = useAddTrackToFavorites();

  const addTrackToFavoritesHander = () => {
    addTrackToFavoritesMutation.mutate({
      trackId: activeTrack?._id!,
    });
  };

  return (
    <div className={styles.root}>
      {isAuth && user ? (
        <>
          {user.favoritesTracks.find((id) => id === activeTrack?._id) ? (
            <MdOutlineFavorite size={34} />
          ) : (
            <MdOutlineFavoriteBorder
              size={34}
              onClick={addTrackToFavoritesHander}
            />
          )}
        </>
      ) : // <MdOutlineFavoriteBorder size={34} color={'#c6c6c6'} />
      null}
    </div>
  );
};

export default FavoriteButton;
