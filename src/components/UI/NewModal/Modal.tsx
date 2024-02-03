import React, { FC, ReactNode, useRef } from 'react';
import styles from './Modal.module.scss';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface NewModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
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

const contentVariants: Variants = {
  open: {
    translateY: 0,
    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
  },
  closed: {
    translateY: '100%',
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
  },
};

const Modal: FC<NewModalProps> = ({ isOpen, onClose, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
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
              className={styles.root__wrapper_overlay}
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            ></motion.div>

            <motion.div
              variants={contentVariants}
              initial={{ translateY: '100%' }}
              animate={'open'}
              exit={'closed'}
              drag={'y'}
              dragConstraints={{
                top: 0,
                bottom: 0,
              }}
              dragElastic={{
                top: 0.05,
                bottom: 1,
              }}
              onDragEnd={(event: DragEvent, info) => {
                if (info.velocity.y > 300) {
                  onClose();
                }
                if (contentRef.current instanceof Element) {
                  if (
                    info.offset.y >
                    //100 - is paddingBottom of content div, that is laying under viewport
                    (contentRef.current.clientHeight - 100) / 2
                  ) {
                    onClose();
                  }
                }
              }}
              ref={contentRef}
              className={styles.root__wrapper_content}
              onClick={(event) => event.stopPropagation()}
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

export default Modal;
