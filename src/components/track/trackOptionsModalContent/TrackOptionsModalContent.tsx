import React, { FC } from 'react';
import styles from './TrackOptionsModalContent.module.scss';
import Image from 'next/image';
import { MdDeleteForever, MdPlaylistAdd } from 'react-icons/md';
import { ITrack } from '@/types/track';
import { useRouter } from 'next/navigation';
import { useTrackStore } from '@/stores/trackStore';

interface Props {
  track: ITrack;
}

const TrackOptionsModalContent: FC<Props> = ({ track }) => {
  const router = useRouter();
  const deleteTrack = useTrackStore((state) => state.deleteTrack);

  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteTrack(track._id);
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

      <div className={styles.root__optionList}>
        {track.albumId ? (
          <div
            className={styles.root__optionList_item}
            onClick={() => {
              router.replace('albums/' + track.albumId);
            }}
          >
            <span>К альбому</span>
          </div>
        ) : (
          <div className={styles.root__optionList_item}>
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
