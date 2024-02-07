import React, { FC, memo, useState } from 'react';
import Image from 'next/image';
import { MdDeleteForever } from 'react-icons/md';
import styles from './TrackOptions.module.scss';
import Portal from '@/components/UI/Portal/Portal';
import Modal from '@/components/UI/Modal/Modal';
import { ITrack } from '@/types/track';
import { useTrackStore } from '@/stores/trackStore';

interface TrackOptionsProps {
  track: ITrack;
}

const TrackOptions: FC<TrackOptionsProps> = ({ track }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const deleteTrack = useTrackStore((state) => state.deleteTrack);

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpenModal(true);
  };

  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    deleteTrack(track._id);
  };

  return (
    <>
      <div className={styles.options} onClick={openModal}>
        <span className={styles.options__dot}></span>
      </div>
      <Portal>
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <div className={styles.trackModal}>
            <div className={styles.trackModal__top}>
              <div className={styles.track}>
                <div className={styles.track__img}>
                  <img
                    // src={track.picture}
                    src={process.env.NEXT_PUBLIC_BASE_URL + track.picture}
                    alt={track.name}
                    width={50}
                    height={50}
                  />
                </div>
                <div className={styles.track__info}>
                  <div className={styles.track__info__trackName}>
                    {track.name}
                  </div>
                  <div className={styles.track__info__artistName}>
                    {track.artist}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={styles.trackModal__deleteTrack}
              onClick={deleteHandler}
            >
              <MdDeleteForever size={34} />
              <span>Удалить</span>
            </div>
          </div>
        </Modal>
      </Portal>
    </>
  );
};

export default memo(TrackOptions);
