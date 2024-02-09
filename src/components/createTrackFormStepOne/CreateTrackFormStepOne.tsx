import React, { ChangeEvent, FC } from 'react';
import styles from './CreateTrackFormStepOne.module.scss';
import Input from '@/components/UI/Input/Input';
import { useCreateTrackStore } from '@/stores/createTrackStore';
import ErrorMessage from '@/components/UI/ErrorMessage/ErrorMessage';
import { useQuery } from '@tanstack/react-query';
import albumService from '@/services/Album.service';

const CreateTrackFormStepOne: FC = () => {
  const { name, setName, artist, setArtist, albumId, setAlbumId } =
    useCreateTrackStore((state) => state);
  const { data, isError, error, isSuccess } = useQuery({
    queryKey: ['getAlbums'],
    queryFn: albumService.getAll,
  });

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
        {name.error !== '' && <ErrorMessage message={name.error} />}
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
        {artist.error !== '' && <ErrorMessage message={artist.error} />}
      </div>
      {isSuccess && (
        <select
          name="albums"
          id="albums"
          value={albumId}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setAlbumId(event.target.value);
          }}
        >
          <option value="" disabled>
            Альбом
          </option>
          {data.map((album) => (
            <option key={album._id} value={album._id}>
              {album.name}
            </option>
          ))}
        </select>
      )}
    </form>
  );
};

export default CreateTrackFormStepOne;
