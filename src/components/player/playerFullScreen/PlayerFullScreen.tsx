import React, { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './PlayerFullScreen.module.scss';
import VolumeRange from '@/components/volumeRange/VolumeRange';
import PlayerButtons from '@/components/player/playerButtons/PlayerButtons';
import Progress from '@/components/player/progress/Progress';
import TrackImage from '@/components/player/trackImage/TrackImage';
import PlayerTrackInfo from '@/components/player/playerTrackInfo/PlayerTrackInfo';
import FavoriteButton from '@/components/player/favoriteButton/FavoriteButton';

const PlayerFullScreen: FC = () => {
  return (
    <>
      <div className={styles.root}>
        <TrackImage />
        <Progress />
        <PlayerTrackInfo />

        <div className={styles.root__btns}>
          <PlayerButtons />
          <FavoriteButton />
          <motion.div
            className={styles.root__volume}
            drag={'y'}
            dragConstraints={{
              top: 0,
              bottom: 0,
            }}
            dragElastic={0}
          >
            <VolumeRange />
          </motion.div>
          <div className={styles.root__playerSettingsBtns}></div>
        </div>
      </div>
    </>
  );
};

export default PlayerFullScreen;
