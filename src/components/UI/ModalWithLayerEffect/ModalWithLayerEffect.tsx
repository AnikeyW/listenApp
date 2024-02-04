import React, { FC, ReactNode } from 'react';
import styles from './ModalWithLayerEffect.module.scss';
import { AnimatePresence, motion, Variants, MotionValue } from 'framer-motion';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  y: MotionValue<number>;
}

const overlayVariants: Variants = {
  open: {
    opacity: 1,
    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
  },
};

const ModalWithLayerEffect: FC<ModalProps> = ({
  y,
  isOpen,
  onClose,
  children,
}) => {
  const overlayAnimationStart = (variant: any) => {
    if (variant === 'open') {
      y.set(0);
    } else {
      y.set(-200);
    }
  };

  const overlayAnimationComplete = (variant: any) => {
    if (variant === 'closed') {
      y.set(-200);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.root}>
          <div className={styles.root__wrapper}>
            <motion.div
              variants={overlayVariants}
              initial={'closed'}
              animate={'open'}
              exit={'closed'}
              onAnimationStart={overlayAnimationStart}
              onAnimationComplete={overlayAnimationComplete}
              className={styles.root__wrapper_overlay}
              onClick={onClose}
            ></motion.div>

            <motion.div
              initial={{ translateY: '100%' }}
              animate={{
                translateY: 0,
                transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                translateY: '100%',
                transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
              }}
              drag={'y'}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              dragElastic={{
                top: 0.05,
                bottom: 1,
              }}
              onDrag={(event, info) => {
                console.log(info);
                y.set(-info.offset.y);
              }}
              onDragEnd={(event, info) => {
                if (info.velocity.y > 300) {
                  onClose();
                }
                if (info.offset.y > 350) {
                  onClose();
                  y.set(-200);
                } else {
                  y.set(0);
                }
              }}
              className={styles.root__wrapper_content}
              onClick={(event) => event.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default ModalWithLayerEffect;
