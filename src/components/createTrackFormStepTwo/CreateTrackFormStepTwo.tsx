import React from 'react';
import { useCreateTrackStore } from '@/stores/createTrackStore';

const CreateTrackFormStepTwo = () => {
  const picture = useCreateTrackStore((state) => state.picture);
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ flex: 1 }}></div>
      {!picture.img && picture.error !== '' && (
        <p
          style={{
            color: 'coral',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {picture.error}
        </p>
      )}
    </div>
  );
};

export default CreateTrackFormStepTwo;
