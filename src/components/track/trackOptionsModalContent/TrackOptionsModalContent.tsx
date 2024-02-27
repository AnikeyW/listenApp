import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './TrackOptionsModalContent.module.scss';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdCancel,
  MdDeleteForever,
  MdMoveUp,
  MdPlaylistAdd,
} from 'react-icons/md';
import { ITrack } from '@/types/track';
import { usePathname, useRouter } from 'next/navigation';
import TrackInfo from '@/components/track/trackInfo/TrackInfo';
import { useAuthStore } from '@/stores/authStore';
import { useDeleteTrack } from '@/hooks/track/useDeleteTrack';
import { useAddTrackToAlbum } from '@/hooks/album/useAddTrackToAlbum';
import { useGetMyAlbums } from '@/hooks/album/useGetMyAlbums';

interface Props {
  track: ITrack;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const TrackOptionsModalContent: FC<Props> = ({ track, setIsOpenModal }) => {
  const user = useAuthStore((state) => state.user);
  const [isShowAlbumList, setIsShowAlbumList] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const deleteTrackMutation = useDeleteTrack();

  const getMyAlbums = useGetMyAlbums();

  const addTrackToAlbumMutation = useAddTrackToAlbum();

  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteTrackMutation.mutate(track._id);
    setIsOpenModal(false);
  };

  const addToAlbumHandler = (albumId: string) => {
    addTrackToAlbumMutation.mutate({ albumId, trackId: track._id });
    setIsOpenModal(false);
  };

  const redirectToAlbumHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.replace('albums/' + track.albumId);
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
              className={styles.root__darkLayer}
            ></motion.div>
          )}
        </AnimatePresence>
        <TrackInfo track={track} withPhoto={true} />
      </div>
      <AnimatePresence>
        {isShowAlbumList && getMyAlbums.isSuccess && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '140px' }}
            exit={{ height: 0 }}
            className={styles.albumList}
          >
            {getMyAlbums.data.length === 0 ? (
              <div>Нет альбомов</div>
            ) : (
              <div>Мои альбомы:</div>
            )}
            {getMyAlbums.data.map((album) => (
              <motion.div
                dragPropagation
                className={styles.album}
                key={album._id}
                onClick={() => addToAlbumHandler(album._id)}
              >
                <div className={styles.album__img}>
                  <Image
                    src={process.env.NEXT_PUBLIC_BASE_URL + album.picture}
                    alt={album.name}
                    width={50}
                    height={50}
                    priority={true}
                  />
                </div>
                <div className={styles.album__info}>
                  <div className={styles.album__info__albumName}>
                    {album.name}
                  </div>
                  <div className={styles.album__info__authorName}>
                    {album.author}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.root__optionList}>
        {track.albumId ? (
          <>
            {pathname.split('/')[1] !== 'albums' && (
              <div
                className={styles.root__optionList_item}
                onClick={redirectToAlbumHandler}
              >
                <MdMoveUp size={34} color={'#448194'} />
                <span>К альбому</span>
              </div>
            )}
          </>
        ) : (
          <>
            {user?._id && user._id === track.owner ? (
              <>
                {!isShowAlbumList ? (
                  <div
                    className={styles.root__optionList_item}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsShowAlbumList((prevState) => !prevState);
                    }}
                  >
                    <MdPlaylistAdd size={34} color={'#44944A'} />{' '}
                    <span>
                      Добавить в альбом{' '}
                      {addTrackToAlbumMutation.isPending && '...'}
                    </span>
                  </div>
                ) : (
                  <div
                    className={styles.root__optionList_itemCancel}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsShowAlbumList((prevState) => !prevState);
                    }}
                  >
                    {' '}
                    <MdCancel size={34} color={'crimson'} />
                    <span>Отменить</span>
                  </div>
                )}
              </>
            ) : null}
          </>
        )}
        {user?._id && user._id === track.owner && (
          <div className={styles.root__optionList_item} onClick={deleteHandler}>
            <MdDeleteForever size={34} color={'crimson'} />
            <span>Удалить трек</span>
            <AnimatePresence>
              {isShowAlbumList && (
                <motion.div
                  className={styles.root__darkLayerOptionList}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 100 }}
                  exit={{ opacity: 0 }}
                  drag={'y'}
                  dragConstraints={{
                    top: 0,
                    bottom: 0,
                  }}
                  dragElastic={0}
                ></motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOptionsModalContent;
