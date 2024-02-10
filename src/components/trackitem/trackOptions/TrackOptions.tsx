import React, { FC, memo, useState } from 'react';
import styles from './TrackOptions.module.scss';
import Portal from '@/components/UI/Portal/Portal';
import Modal from '@/components/UI/Modal/Modal';
import { ITrack } from '@/types/track';
import TrackOptionsModalContent from '@/components/track/trackOptionsModalContent/TrackOptionsModalContent';

interface TrackOptionsProps {
  track: ITrack;
}

const TrackOptions: FC<TrackOptionsProps> = ({ track }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsOpenModal(true);
  };

  return (
    <>
      <div className={styles.options} onClick={openModal}>
        <span className={styles.options__dot}></span>
      </div>
      <Portal>
        <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
          <TrackOptionsModalContent
            track={track}
            setIsOpenModal={setIsOpenModal}
          />
        </Modal>
      </Portal>
    </>
  );
};

export default memo(TrackOptions);
