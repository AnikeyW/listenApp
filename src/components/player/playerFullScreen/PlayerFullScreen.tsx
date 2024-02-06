import React, { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './PlayerFullScreen.module.scss';
import VolumeRange from '@/components/volumeRange/VolumeRange';
import PlayerButtons from '@/components/player/playerButtons/PlayerButtons';
import Progress from '@/components/player/playerFullScreen/progress/Progress';
import TrackImage from '@/components/player/playerFullScreen/trackImage/TrackImage';
import TrackInfo from '@/components/player/playerFullScreen/trackInfo/TrackInfo';

const PlayerFullScreen: FC = () => {
  return (
    <>
      <div className={styles.root}>
        <TrackImage />
        <Progress />
        <TrackInfo />
        <PlayerButtons />
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
    </>
  );
};

export default PlayerFullScreen;
