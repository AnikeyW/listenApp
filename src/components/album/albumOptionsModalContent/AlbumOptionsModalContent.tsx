import React, { FC } from 'react';
import { IAlbum } from '@/types/album';
import Image from 'next/image';
import { MdDeleteForever } from 'react-icons/md';
import styles from './AlbumOptionsModalContent.module.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import albumService from '@/services/Album.service';
import { useRouter } from 'next/navigation';

interface Props {
  album: IAlbum;
}

const AlbumOptionsModalContent: FC<Props> = ({ album }) => {
  const queryCleint = useQueryClient();
  const router = useRouter();
  const deleteAlbumMutation = useMutation({
    mutationKey: ['deleteAlbum'],
    mutationFn: (albumId: string) => albumService.delete(albumId),
    onSuccess: () => {
      queryCleint.fetchQuery({ queryKey: ['albums'] });
      queryCleint.invalidateQueries({ queryKey: ['tracks'] });
    },
  });

  const deleteAlbumHandler = () => {
    deleteAlbumMutation.mutate(album._id);
    router.replace('/');
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__top}>
        <div className={styles.album}>
          <div className={styles.album__img}>
            <Image
              src={process.env.NEXT_PUBLIC_BASE_URL + album.picture}
              alt={album.name}
              width={50}
              height={50}
              priority={true}
            />
          </div>
          <div className={styles.album__info}>
            <div className={styles.album__info__albumName}>{album.name}</div>
            <div className={styles.album__info__authorName}>{album.author}</div>
          </div>
        </div>
      </div>

      <div className={styles.root__options} onClick={deleteAlbumHandler}>
        <MdDeleteForever size={34} />
        <span>Удалить альбом</span>
      </div>
    </div>
  );
};

export default AlbumOptionsModalContent;
