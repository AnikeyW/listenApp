import React, { FC } from 'react';
import Image from 'next/image';
import addAudioIcon from '@/assets/add-audio.png';
import FileUpload from '@/components/fileUploud/FileUpload';
import { useCreateTrackStore } from '@/stores/createTrackStore';

const CreateTrackFormStepThree: FC = () => {
  const audio = useCreateTrackStore((state) => state.audio);
  const setAudio = useCreateTrackStore((state) => state.setAudio);

  const onChangeAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudio({ value: e.target.files[0], error: '' });
    }
  };

  return (
    <>
      <FileUpload setFile={onChangeAudio} accept={'audio/*'}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {!audio.value ? (
            <>
              <div style={{ flex: 2, display: 'flex' }}>
                <div style={{ alignSelf: 'center', fontSize: '16px' }}>
                  Добавить аудио
                </div>
                <div style={{ alignSelf: 'center' }}>
                  <Image src={addAudioIcon} alt={''} width={50} height={50} />
                </div>
              </div>

              <p style={{ color: 'coral', flex: 1 }}>
                {!audio.value && audio.error !== '' ? audio.error : ''}
              </p>
            </>
          ) : (
            <>
              <div
                style={{
                  flex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                }}
              >
                <p style={{ marginBottom: '0.5rem' }}>Аудио добавлено</p>
                <p>{audio.value.name}</p>
              </div>
              <p style={{ flex: 1 }}></p>
            </>
          )}
        </div>
      </FileUpload>
    </>
  );
};

export default CreateTrackFormStepThree;
