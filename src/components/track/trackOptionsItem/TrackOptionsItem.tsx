import React, { FC, ReactNode } from 'react';
import styles from './TrackOptionsItem.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  icon: ReactNode;
  title: string;
  handler: (e: React.MouseEvent<HTMLDivElement>) => void;
  isShowAlbumList: boolean;
}

const TrackOptionsItem: FC<Props> = ({
  icon,
  title,
  handler,
  isShowAlbumList,
}) => {
  return (
    <div className={styles.root} onClick={handler}>
      {icon}
      <span>{title}</span>
      <AnimatePresence>
        {isShowAlbumList && (
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className={styles.root__darkLayerOptionList}
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            drag={'y'}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={0}
          ></motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TrackOptionsItem;
