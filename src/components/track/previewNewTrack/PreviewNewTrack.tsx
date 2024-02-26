import React, { useCallback, useState } from 'react';
import styles from './previewNewTrack.module.scss';
import Image from 'next/image';
import FileUpload from '@/components/fileUploud/FileUpload';
import { RiImageAddLine } from 'react-icons/ri';
import { useTrackStore } from '@/stores/trackStore';
import PictureFromAlbum from '@/components/track/pictureFromAlbum/PictureFromAlbum';
import { useGetAllAlbums } from '@/hooks/album/useGetAllAlbums';

type Props = {
  step: number;
};

const PreviewNewTrack: React.FC<Props> = (props) => {
  const name = useTrackStore((state) => state.name);
  const artist = useTrackStore((state) => state.artist);
  const picture = useTrackStore((state) => state.picture);
  const albumId = useTrackStore((state) => state.albumId);
  const setPicture = useTrackStore((state) => state.setPicture);
  const [imagePreviewSrc, setImagePreviewSrc] = useState<string>('');

  const useAlbumPictureCreatingTrack = useTrackStore(
    (state) => state.useAlbumPictureCreatingTrack,
  );
  const setUseAlbumPictureCreatingTrack = useTrackStore(
    (state) => state.setUseAlbumPictureCreatingTrack,
  );

  const getAlbumsQuery = useGetAllAlbums();

  const getAlbumPicture = useCallback((): string => {
    if (getAlbumsQuery.isFetched) {
      return (
        getAlbumsQuery.data!.find((album) => {
          return album._id === albumId;
        })?.picture || ''
      );
    }
    return '';
  }, [getAlbumsQuery.data, useAlbumPictureCreatingTrack]);

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture({ error: '', img: e.target.files[0] });
      if (!FileReader) return;
      const img = new FileReader();
      img.onload = () => {
        if (img.result && typeof img.result === 'string') {
          setImagePreviewSrc(img.result);
          setUseAlbumPictureCreatingTrack(false);
        }
      };
      img.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className={styles.previewBox}>
      <div className={styles.previewBox__img}>
        {props.step === 2 ? (
          <FileUpload setFile={onChangePicture} accept={'image/*'}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '1rem',
              }}
            >
              {useAlbumPictureCreatingTrack ? (
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + getAlbumPicture()}
                  alt={'preview'}
                  width={250}
                  height={250}
                  style={{ borderRadius: '1rem' }}
                />
              ) : (
                <>
                  {picture.img && imagePreviewSrc ? (
                    <Image
                      src={imagePreviewSrc}
                      alt={'preview'}
                      width={250}
                      height={250}
                      style={{ borderRadius: '1rem' }}
                    />
                  ) : (
                    <RiImageAddLine size={100} />
                  )}
                </>
              )}
            </div>
          </FileUpload>
        ) : (
          <>
            {picture.img && imagePreviewSrc && (
              <Image
                src={imagePreviewSrc}
                alt={'preview'}
                width={250}
                height={250}
                style={{ borderRadius: '1rem' }}
              />
            )}
            {useAlbumPictureCreatingTrack && (
              <Image
                src={process.env.NEXT_PUBLIC_BASE_URL + getAlbumPicture()}
                alt={'preview'}
                width={250}
                height={250}
                style={{ borderRadius: '1rem' }}
              />
            )}
          </>
        )}
      </div>

      {props.step !== 1 && (
        <div className={styles.previewBox__info}>
          <div className={styles.previewBox__info_name}>{name.value}</div>
          <div className={styles.previewBox__info_artist}>{artist.value}</div>
        </div>
      )}
      {albumId !== '' && props.step === 2 && (
        <PictureFromAlbum getAlbumPicture={getAlbumPicture} />
      )}
    </div>
  );
};

export default PreviewNewTrack;
