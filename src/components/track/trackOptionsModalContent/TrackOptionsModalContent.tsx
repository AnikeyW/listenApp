import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './TrackOptionsModalContent.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDeleteForever,
  MdOutlineHeartBroken,
  MdOutlineSpeakerNotes,
} from 'react-icons/md';
import { ITrack } from '@/types/track';
import TrackInfo from '@/components/track/trackInfo/TrackInfo';
import { useAuthStore } from '@/stores/authStore';
import { useDeleteTrack } from '@/hooks/track/useDeleteTrack';
import TrackOptionsItem from '@/components/track/trackOptionsItem/TrackOptionsItem';
import { useDeleteTrackFromFavorites } from '@/hooks/track/useDeleteTrackFromFavorites';
import AddToAlbumOption from '@/components/track/addToAlbumOption/AddToAlbumOption';
import { useRouter } from 'next/navigation';

interface Props {
  track: ITrack;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const TrackOptionsModalContent: FC<Props> = ({ track, setIsOpenModal }) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const [isShowAlbumList, setIsShowAlbumList] = useState(false);

  const deleteTrackMutation = useDeleteTrack();
  const deleteTrackFromFavoritesMutation = useDeleteTrackFromFavorites();

  const deleteTrackFromFavoritesHandler = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
    deleteTrackFromFavoritesMutation.mutate({ trackId: track._id });
    setIsOpenModal(false);
  };

  const deleteHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    deleteTrackMutation.mutate(track._id);
    setIsOpenModal(false);
  };

  const trackInfoHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    router.push('tracks/' + track._id);
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__top}>
        <AnimatePresence>
          {isShowAlbumList && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 100 }}
              exit={{ opacity: 0 }}
              drag={'y'}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              dragElastic={0}
              className={styles.root__top_darkLayer}
            ></motion.div>
          )}
        </AnimatePresence>
        <TrackInfo track={track} withPhoto={true} />
      </div>

      <div className={styles.root__optionList}>
        <TrackOptionsItem
          title={'Информация о треке'}
          isShowDarkLayer={isShowAlbumList}
          icon={<MdOutlineSpeakerNotes size={34} color={'#333399'} />}
          handler={trackInfoHandler}
        />
        <AddToAlbumOption
          isShowAlbumList={isShowAlbumList}
          setIsShowAlbumList={setIsShowAlbumList}
          track={track}
          setIsOpenModal={setIsOpenModal}
        />
        {isAuth &&
          user?.favoritesTracks.find(
            (favTrack) => favTrack.trackId === track._id,
          ) && (
            <TrackOptionsItem
              title={'Удалить из избранного'}
              isShowDarkLayer={isShowAlbumList}
              icon={<MdOutlineHeartBroken size={34} color={'orange'} />}
              handler={deleteTrackFromFavoritesHandler}
            />
          )}
        {user?._id && user._id === track.owner && (
          <TrackOptionsItem
            title={'Удалить трек'}
            isShowDarkLayer={isShowAlbumList}
            icon={<MdDeleteForever size={34} color={'crimson'} />}
            handler={deleteHandler}
          />
        )}
      </div>
      <AnimatePresence>
        {isShowAlbumList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            drag={'y'}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={0}
            className={styles.root__darkBottom}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackOptionsModalContent;
