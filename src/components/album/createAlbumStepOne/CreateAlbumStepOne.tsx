'use client';
import React from 'react';
import styles from './CreateAlbumStepOne.module.scss';
import Input from '@/components/UI/Input/Input';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useAlbumStore } from '@/stores/albumStore';

const CreateAlbumStepOne = () => {
  const { name, setName, author, setAuthor } = useAlbumStore((state) => state);

  return (
    <form className={styles.form}>
      <div className={styles.form__input}>
        <Input
          type="text"
          placeholder={'Название альбома'}
          value={name.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName({ value: e.target.value, error: '' })
          }
        />
        {name.error !== '' && <ErrorMessage message={name.error} />}
      </div>
      <div className={styles.form__input}>
        <Input
          type="text"
          placeholder={'Имя автора'}
          value={author.value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAuthor({ value: e.target.value, error: '' })
          }
        />
        {author.error !== '' && <ErrorMessage message={author.error} />}
      </div>
    </form>
  );
};

export default CreateAlbumStepOne;
