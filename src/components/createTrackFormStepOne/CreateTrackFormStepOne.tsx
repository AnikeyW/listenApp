import React, { FC } from 'react';
import styles from './CreateTrackFormStepOne.module.scss';
import Input from '@/components/UI/Input/Input';
import { useCreateTrackStore } from '@/stores/createTrackStore';

const CreateTrackFormStepOne: FC = () => {
  const { name, setName, artist, setArtist } = useCreateTrackStore(
    (state) => state,
  );

  return (
    <form className={styles.form}>
      <div className={styles.form__input}>
        <Input
          type="text"
          placeholder={'Название трека'}
          value={name.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName({ value: e.target.value, error: '' })
          }
        />
        {name.error !== '' && <p style={{ color: 'coral' }}>{name.error}</p>}
      </div>
      <div className={styles.form__input}>
        <Input
          type="text"
          placeholder={'Имя исполнителя'}
          value={artist.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setArtist({ value: e.target.value, error: '' })
          }
        />
        {artist.error !== '' && (
          <p style={{ color: 'coral' }}>{artist.error}</p>
        )}
      </div>
    </form>
  );
};

export default CreateTrackFormStepOne;
