import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './TrackOptionsModalContent.module.scss';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MdDeleteForever, MdMoveUp, MdPlaylistAdd } from 'react-icons/md';
import { ITrack } from '@/types/track';
import { usePathname, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import TrackInfo from '@/components/track/trackInfo/TrackInfo';
import { useAuthStore } from '@/stores/authStore';
import { useDeleteTrack } from '@/hooks/track/useDeleteTrack';
import { useGetAllAlbums } from '@/hooks/album/useGetAllAlbums';

interface Props {
  track: ITrack;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const TrackOptionsModalContent: FC<Props> = ({ track, setIsOpenModal }) => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const [isShowAlbumList, setIsShowAlbumList] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const deleteTrackMutation = useDeleteTrack();

  const { data, isSuccess } = useGetAllAlbums();

  const addTrackToAlbumMutation = useMutation({
    mutationKey: ['addTrackToAlbum'],
    mutationFn: ({ albumId, trackId }: { albumId: string; trackId: string }) =>
      albumService.addTrackToAlbum(albumId, trackId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tracks'] });
      queryClient.invalidateQueries({ queryKey: ['albums'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

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
        <TrackInfo track={track} withPhoto={true} />
      </div>
      <AnimatePresence>
        {isShowAlbumList && isSuccess && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: '140px' }}
            exit={{ height: 0 }}
            className={styles.albumList}
          >
            {data.length === 0 ? (
              <div>Нет альбомов</div>
            ) : (
              <div>Мои альбомы:</div>
            )}
            {data.map((album) => (
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
            {user?.email && user.email === track.owner ? (
              <div
                className={styles.root__optionList_item}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsShowAlbumList((prevState) => !prevState);
                }}
              >
                <MdPlaylistAdd size={34} color={'#44944A'} />{' '}
                <span>
                  Добавить в альбом {addTrackToAlbumMutation.isPending && '...'}
                </span>
              </div>
            ) : null}
          </>
        )}
        {user?.email && user.email === track.owner && (
          <div className={styles.root__optionList_item} onClick={deleteHandler}>
            <MdDeleteForever size={34} color={'crimson'} />
            <span>Удалить трек</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOptionsModalContent;
