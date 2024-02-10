'use client';
import React, { FC, useEffect } from 'react';
import styles from './PictureFromAlbum.module.scss';
import { useTrackStore } from '@/stores/trackStore';

interface Props {
  getAlbumPicture: () => '';
}

const PictureFromAlbum: FC<Props> = ({ getAlbumPicture }) => {
  const useAlbumPictureCreatingTrack = useTrackStore(
    (state) => state.useAlbumPictureCreatingTrack,
  );
  const setUseAlbumPictureCreatingTrack = useTrackStore(
    (state) => state.setUseAlbumPictureCreatingTrack,
  );
  const setPicture = useTrackStore((state) => state.setPicture);

  useEffect(() => {
    if (useAlbumPictureCreatingTrack) {
      setPicture({ img: getAlbumPicture(), error: '' });
    } else {
      setPicture({ img: null, error: '' });
    }
  }, [useAlbumPictureCreatingTrack]);

  return (
    <div className={styles.root}>
      <label htmlFor={'isAlbumPicture'}>
        <input
          type="checkbox"
          id={'isAlbumPicture'}
          checked={useAlbumPictureCreatingTrack}
          onChange={(event) => {
            setUseAlbumPictureCreatingTrack(event.target.checked);
          }}
        />
        Использовать постер альбома
      </label>
    </div>
  );
};

export default PictureFromAlbum;
