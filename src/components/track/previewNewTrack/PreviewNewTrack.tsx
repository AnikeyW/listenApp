import React, { useState } from 'react';
import styles from './previewNewTrack.module.scss';
import Image from 'next/image';
import FileUpload from '@/components/fileUploud/FileUpload';
import { RiImageAddLine } from 'react-icons/ri';
import { useTrackStore } from '@/stores/trackStore';

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

  const onChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPicture({ error: '', img: e.target.files[0] });
      if (!FileReader) return;
      const img = new FileReader();
      img.onload = () => {
        if (img.result && typeof img.result === 'string') {
          setImagePreviewSrc(img.result);
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
        //todo
        <div>
          <label htmlFor={'isAlbumPicture'}>
            <input type="checkbox" id={'isAlbumPicture'} />
            Использовать постер альбома
          </label>
        </div>
      )}
    </div>
  );
};

export default PreviewNewTrack;
