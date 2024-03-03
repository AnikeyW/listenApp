import React, { FC } from 'react';
import styles from './AlbumItem.module.scss';
import { IAlbum } from '@/types/album';
import { useRouter } from 'next/navigation';

interface Props {
  album: IAlbum;
}

const AlbumItem: FC<Props> = ({ album }) => {
  const router = useRouter();
  return (
    <div
      className={styles.root}
      onClick={() => router.push('albums/' + album._id)}
    >
      <div className={styles.root__image}>
        <img
          src={process.env.NEXT_PUBLIC_BASE_URL + album.picture}
          alt="wegwe"
        />
      </div>
      <div className={styles.root__info}>
        <div className={styles.root__info_title}>{album.name}</div>
        <div className={styles.root__info_author}>{album.author}</div>
      </div>
    </div>
  );
};

export default AlbumItem;
