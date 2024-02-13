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
              backgroundImage: `url(${
                process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture
              })`,
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
            <Image
              src={process.env.NEXT_PUBLIC_BASE_URL + activeTrack.picture}
              priority={true}
              alt={'trackPicture'}
              width={380}
              height={380}
              draggable={false}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default TrackImage;
