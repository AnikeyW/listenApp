import React, { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './PlayerFullScreen.module.scss';
import VolumeRange from '@/components/volumeRange/VolumeRange';
import PlayerButtons from '@/components/player/playerButtons/PlayerButtons';
import Progress from '@/components/player/progress/Progress';
import TrackImage from '@/components/player/trackImage/TrackImage';
// import TrackInfo from '@/components/player/trackInfo/TrackInfo';
import PlayerTrackInfo from '@/components/player/playerTrackInfo/PlayerTrackInfo';

const PlayerFullScreen: FC = () => {
  return (
    <>
      <div className={styles.root}>
        <TrackImage />
        <Progress />
        {/*<TrackInfo />*/}
        <PlayerTrackInfo />
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
