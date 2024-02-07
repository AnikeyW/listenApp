import React from 'react';
import { motion } from 'framer-motion';
import styles from './TrackImage.module.scss';
import Image from 'next/image';
import { usePlayerStore } from '@/stores/playerStore';

const TrackImage = () => {
  const pause = usePlayerStore((state) => state.pause);
  const activeTrack = usePlayerStore((state) => state.activeTrack);

  return (
    <>
      {activeTrack && (
        <div className={styles.root}>
          <motion.div
            variants={{
              play: {
                opacity: 1,
              },
              pause: {
                opacity: 0,
              },
            }}
            animate={!pause ? 'play' : 'pause'}
            exit={'pause'}
            transition={{ ease: 'easeOut', duration: 0.25 }}
            className={styles.root__imageBlur}
            style={{
              background: `url(${activeTrack.picture})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></motion.div>
          <motion.div
            animate={
              !pause ? { transform: 'scale(1.1)' } : { transform: 'scale(1)' }
            }
            transition={{ duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }}
            className={styles.root__image}
          >
            <img
              src={activeTrack.picture}
              // src={process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture}
              alt={'trackPicture'}
              width={400}
              height={400}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default TrackImage;
