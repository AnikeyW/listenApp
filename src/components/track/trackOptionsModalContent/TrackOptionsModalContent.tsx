import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import styles from './TrackOptionsModalContent.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdDeleteForever, MdMoveUp, MdPlaylistAdd } from 'react-icons/md';
import { ITrack } from '@/types/track';
import { usePathname, useRouter } from 'next/navigation';
import { useTrackStore } from '@/stores/trackStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import albumService from '@/services/Album.service';

interface Props {
  track: ITrack;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const TrackOptionsModalContent: FC<Props> = ({ track, setIsOpenModal }) => {
  const router = useRouter();
  const pathname = usePathname();
  const deleteTrack = useTrackStore((state) => state.deleteTrack);
  const [isAddingToAlbum, setIsAddingToAlbum] = useState(false);
  const { data, isSuccess } = useQuery({
    queryKey: ['getAlbums'],
    queryFn: albumService.getAll,
  });
  const { isPending, mutate } = useMutation({
    mutationKey: ['tracks', 'albums', 'addTrackToAlbum'],
    mutationFn: ({ albumId, trackId }: { albumId: string; trackId: string }) =>
      albumService.addTrackToAlbum(albumId, trackId),
  });

  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('del');
    deleteTrack(track._id);
    setIsOpenModal(false);
  };

  const addToAlbumHandler = (albumId: string) => {
    console.log('addToAlbumHandler', albumId, track);
    mutate({ albumId, trackId: track._id });
    setIsOpenModal(false);
  };

  const redirectToAlbumHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    router.replace('albums/' + track.albumId);
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__top}>
        <div className={styles.track}>
          <div className={styles.track__img}>
            <Image
              src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
              alt={track.name}
              width={50}
              height={50}
              priority={true}
            />
          </div>
          <div className={styles.track__info}>
            <div className={styles.track__info__trackName}>{track.name}</div>
            <div className={styles.track__info__artistName}>{track.artist}</div>
          </div>
        </div>
      </div>

      {isAddingToAlbum && isSuccess && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}>
          {data.length === 0 && <div>Нет альбомов</div>}
          {data.map((album) => (
            <div
              style={{ padding: '0 0.5rem' }}
              key={album._id}
              onClick={() => addToAlbumHandler(album._id)}
            >
              <div className={styles.album}>
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
              </div>
            </div>
          ))}
        </motion.div>
      )}

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
          <div
            className={styles.root__optionList_item}
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingToAlbum(true);
            }}
          >
            <MdPlaylistAdd size={34} color={'#44944A'} />{' '}
            <span>Добавить в альбом {isPending && '...'}</span>
          </div>
        )}
        <div className={styles.root__optionList_item} onClick={deleteHandler}>
          <MdDeleteForever size={34} color={'crimson'} />
          <span>Удалить трек</span>
        </div>
      </div>
    </div>
  );
};

export default TrackOptionsModalContent;
