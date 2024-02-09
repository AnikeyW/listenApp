'use client';
import React, { FC, useState } from 'react';
import styles from './AlbumOptions.module.scss';
import Portal from '@/components/UI/Portal/Portal';
import Modal from '@/components/UI/Modal/Modal';
import { IAlbum } from '@/types/album';
import AlbumOptionsModalContent from '@/components/album/albumOptionsModalContent/AlbumOptionsModalContent';

interface Props {
  album: IAlbum;
}

const AlbumOptions: FC<Props> = ({ album }) => {
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
          <AlbumOptionsModalContent album={album} />
        </Modal>
      </Portal>
    </>
  );
};

export default AlbumOptions;
