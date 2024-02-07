import React, { FC, ReactNode, useRef } from 'react';
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
  const contentRef = useRef<HTMLDivElement>(null);

  const overlayAnimationStart = (variant: any) => {
    if (variant === 'open') {
      y.set(0);
    } else {
      y.set(-500);
    }
  };

  const overlayAnimationComplete = (variant: any) => {
    if (variant === 'closed') {
      y.set(-500);
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
                y.set(-info.offset.y);
              }}
              onDragEnd={(event, info) => {
                if (info.velocity.y > 300) {
                  onClose();
                }
                if (contentRef.current instanceof Element) {
                  if (
                    info.offset.y >
                    (contentRef.current.clientHeight - 100) / 2
                  ) {
                    onClose();
                    y.set(-500);
                  } else {
                    y.set(0);
                  }
                }
              }}
              className={styles.root__wrapper_content}
              onClick={(event) => event.stopPropagation()}
              ref={contentRef}
            >
              <div className={styles.root__wrapper_content_handle}></div>
              {children}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
export default ModalWithLayerEffect;
