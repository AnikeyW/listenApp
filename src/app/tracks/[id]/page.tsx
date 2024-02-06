import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import styles from './page.module.scss';

const Page = async ({ params }: { params: { id: string } }) => {
  const track = await fetchTrackInfo(params.id);

  return (
    <div className={styles.root}>
      <Link href={'/tracks'}>К трекам link</Link>
      <div style={{ display: 'flex' }}>
        <Image
          src={track.picture}
          // src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
          alt={'picture'}
          width={200}
          height={200}
        />
        <div>
          <div>Название: {track.name}</div>
          <div>Исполнитель: {track.artist}</div>
          <div>Прослушиваний: {track.listens}</div>
        </div>
      </div>
      <div>
        <h2>Слова</h2>
        <p>{track.text}</p>
      </div>
    </div>
  );
};

export default Page;
const fetchTrackInfo = async (trackId: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + 'tracks/' + trackId,
    );
    return response.data;
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      throw err;
    }
    console.error(err);
  }
};
