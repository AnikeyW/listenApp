import React from 'react';
import styles from './CreateAlbumStepTwo.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useAlbumStore } from '@/stores/albumStore';

const CreateAlbumStepTwo = () => {
  const picture = useAlbumStore((state) => state.picture);

  return (
    <div className={styles.root}>
      <div style={{ flex: 1 }}></div>
      {!picture.img && picture.error !== '' && (
        <div className={styles.root__error}>
          <ErrorMessage message={picture.error} />
        </div>
      )}
    </div>
  );
};

export default CreateAlbumStepTwo;
