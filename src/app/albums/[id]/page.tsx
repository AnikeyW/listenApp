import React from 'react';
import axios, { AxiosError } from 'axios';
import styles from './page.module.scss';
import { IAlbum } from '@/types/album';

const Page = async ({ params }: { params: { id: string } }) => {
  const album: IAlbum = await getAlbumById(params.id);

  return (
    <div className={styles.root}>
      <div className={styles.root__info}>
        <div className={styles.root__info_image}>
          <img
            src={process.env.NEXT_PUBLIC_BASE_URL + album.picture}
            alt="album photo"
          />
        </div>
        <div className={styles.root__info_title}>{album.name}</div>
      </div>
      <div className={styles.root__trackList}></div>
    </div>
  );
};

export default Page;
const getAlbumById = async (id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + 'albums/' + id,
    );
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw err;
    }
    console.error(err);
  }
};
