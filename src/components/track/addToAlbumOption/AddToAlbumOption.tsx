import React, { Dispatch, FC, SetStateAction } from 'react';
import styles from './AddToAlbumOption.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import TrackOptionsItem from '@/components/track/trackOptionsItem/TrackOptionsItem';
import { MdCancel, MdMoveUp, MdPlaylistAdd } from 'react-icons/md';
import { useGetMyAlbums } from '@/hooks/album/useGetMyAlbums';
import { useAddTrackToAlbum } from '@/hooks/album/useAddTrackToAlbum';
import { usePathname, useRouter } from 'next/navigation';
import { ITrack } from '@/types/track';
import { useAuthStore } from '@/stores/authStore';

interface Props {
  isShowAlbumList: boolean;
  setIsShowAlbumList: Dispatch<SetStateAction<boolean>>;
  track: ITrack;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const AddToAlbumOption: FC<Props> = ({
  isShowAlbumList,
  setIsShowAlbumList,
  track,
  setIsOpenModal,
}) => {
  const user = useAuthStore((state) => state.user);
  const getMyAlbums = useGetMyAlbums();
  const addTrackToAlbumMutation = useAddTrackToAlbum();
  const pathname = usePathname();
  const router = useRouter();

  const addToAlbumHandler = (albumId: string) => {
    addTrackToAlbumMutation.mutate({ albumId, trackId: track._id });
    setIsOpenModal(false);
  };

  const redirectToAlbumHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.push('albums/' + track.albumId);
  };

  const toggleIsShowAlbumListHandler = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
    setIsShowAlbumList((prevState) => !prevState);
  };

  return (
    <>
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
      {track.albumId ? (
        <>
          {pathname.split('/')[1] !== 'albums' && (
            <TrackOptionsItem
              title={'К альбому'}
              isShowDarkLayer={false}
              icon={<MdMoveUp size={34} color={'#448194'} />}
              handler={redirectToAlbumHandler}
            />
          )}
        </>
      ) : (
        <>
          {user?._id && user._id === track.owner ? (
            <>
              {!isShowAlbumList ? (
                <TrackOptionsItem
                  title={'Добавить в альбом'}
                  isShowDarkLayer={false}
                  icon={<MdPlaylistAdd size={34} color={'#44944A'} />}
                  handler={toggleIsShowAlbumListHandler}
                />
              ) : (
                <TrackOptionsItem
                  title={'Отменить'}
                  isShowDarkLayer={false}
                  icon={<MdCancel size={34} color={'crimson'} />}
                  handler={toggleIsShowAlbumListHandler}
                />
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default AddToAlbumOption;
