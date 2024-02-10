import React from 'react';
import styles from './CreateTrackFormStepTwo.module.scss';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useTrackStore } from '@/stores/trackStore';

const CreateTrackFormStepTwo = () => {
  const picture = useTrackStore((state) => state.picture);
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

export default CreateTrackFormStepTwo;
