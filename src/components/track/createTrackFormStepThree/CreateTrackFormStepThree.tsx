import React, { FC } from 'react';
import Image from 'next/image';
import styles from './CreateTrackFormStepThree.module.scss';
import addAudioIcon from '@/assets/add-audio.png';
import FileUpload from '@/components/fileUploud/FileUpload';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useTrackStore } from '@/stores/trackStore';

const CreateTrackFormStepThree: FC = () => {
  const audioFile = useTrackStore((state) => state.audioFile);
  const setAudio = useTrackStore((state) => state.setAudio);

  const onChangeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudio({ value: e.target.files[0], error: '' });
    }
  };

  return (
    <>
      <FileUpload
        setFile={onChangeAudio}
        accept={'.wav,.aif,.aiff,.flac,.alac,.aac,.ogg,.mp3'}
      >
        <div className={styles.root}>
          {!audioFile.value ? (
            <>
              <div className={styles.root__addAudio}>
                <div className={styles.root__addAudio_text}>Добавить аудио</div>
                <div className={styles.root__addAudio_icon}>
                  <Image src={addAudioIcon} alt={''} width={50} height={50} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {!audioFile.value && audioFile.error !== '' && (
                  <ErrorMessage message={audioFile.error} />
                )}
              </div>
            </>
          ) : (
            <>
              <div className={styles.root__uploaded}>
                <p style={{ marginBottom: '0.5rem' }}>Аудио добавлено</p>
                <p>{audioFile.value.name}</p>
              </div>
              <div style={{ flex: 1 }}></div>
            </>
          )}
        </div>
      </FileUpload>
    </>
  );
};

export default CreateTrackFormStepThree;
