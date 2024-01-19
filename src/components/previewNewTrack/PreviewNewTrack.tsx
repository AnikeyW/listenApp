import React from 'react';
import styles from './previewNewTrack.module.scss';
import Image from 'next/image';
import { IFormDataStep1 } from '@/app/tracks/create/page';

interface PreviewNewTrackProps {
  picture: any;
  imagePreviewSrc: string;
  formDataStep1: IFormDataStep1;
}

const PreviewNewTrack: React.FC<PreviewNewTrackProps> = ({
  imagePreviewSrc,
  formDataStep1,
  picture,
}) => {
  return (
    <div className={styles.previewBox}>
      <div className={styles.previewBox__img}>
        {picture && (
          <Image
            src={imagePreviewSrc}
            alt={'preview'}
            width={250}
            height={250}
            style={{ borderRadius: '1rem' }}
          />
        )}
      </div>

      <div className={styles.previewBox__info}>
        <div className={styles.previewBox__info_name}>{formDataStep1.name}</div>
        <div className={styles.previewBox__info_artist}>
          {formDataStep1.artist}
        </div>
      </div>
    </div>
  );
};

export default PreviewNewTrack;
