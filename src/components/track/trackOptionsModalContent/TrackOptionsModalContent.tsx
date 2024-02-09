import React, { FC, useState } from 'react';
import styles from './TrackOptionsModalContent.module.scss';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MdDeleteForever, MdPlaylistAdd } from 'react-icons/md';
import { ITrack } from '@/types/track';
import { useRouter } from 'next/navigation';
import { useTrackStore } from '@/stores/trackStore';
import { useQuery } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import { IAlbum } from '@/types/album';

interface Props {
  track: ITrack;
}

const TrackOptionsModalContent: FC<Props> = ({ track }) => {
  const router = useRouter();
  const deleteTrack = useTrackStore((state) => state.deleteTrack);
  const [isAddingToAlbum, setIsAddingToAlbum] = useState(false);
  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ['getAlbums'],
    queryFn: albumService.getAll,
  });

  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('del');
    deleteTrack(track._id);
  };

  const addToAlbumHandler = (albumId: string) => {
    console.log('addToAlbumHandler', albumId, track);
  };

  const redirectToAlbumHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    console.log('redirectToAlbumHandler');
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
          <div
            className={styles.root__optionList_item}
            onClick={redirectToAlbumHandler}
          >
            <span>К альбому</span>
          </div>
        ) : (
          <div
            className={styles.root__optionList_item}
            onClick={(e) => {
              e.stopPropagation();
              setIsAddingToAlbum(true);
            }}
          >
            <MdPlaylistAdd size={34} color={'#44944A'} />{' '}
            <span>Добавить в альбом</span>{' '}
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
