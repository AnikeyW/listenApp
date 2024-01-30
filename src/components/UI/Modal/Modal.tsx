import React, { FC, ReactNode } from 'react';
import styles from './Modal.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.root}>
          <div className={styles.root__wrapper}>
            <motion.div
              variants={{
                open: {
                  opacity: 1,
                  transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
                },
                closed: {
                  opacity: 0,
                  transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
                },
              }}
              initial={'closed'}
              animate={'open'}
              exit={'closed'}
              onAnimationStart={(variant) => {
                if (variant === 'open') {
                  set(document.documentElement, { background: 'black' });

                  set(document.getElementById('root')!, {
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem',
                    overflow: 'hidden',
                    transform: 'scale(0.94) translateY(1.5rem)',
                    transitionProperty: 'all',
                    transitionDuration: '0.4s',
                    transitionTimingFunction:
                      'cubic-bezier(0.36, 0.66, 0.04, 1)',
                  });
                } else {
                  reset(document.getElementById('root')!, 'transform');
                  reset(
                    document.getElementById('root')!,
                    'borderTopLeftRadius',
                  );
                  reset(
                    document.getElementById('root')!,
                    'borderTopRightRadius',
                  );
                  reset(document.getElementById('root')!, 'overflow');
                }
              }}
              onAnimationComplete={(variant) => {
                if (variant === 'closed') {
                  reset(document.documentElement);
                  reset(document.getElementById('root')!);
                  // document.documentElement.style.background = '';
                  // document.getElementById('root')!.style.transform = '';
                }
              }}
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

export default Modal;

type Styles = {
  [key in keyof CSSStyleDeclaration]?: string;
};

let cache = new Map<HTMLElement, Styles>();

function set(el: HTMLElement, styles: Styles) {
  let originalStyles: Styles = {};
  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key) && key) {
      originalStyles[key] = el.style[key];
      el.style[key] = styles[key] || '';
    }
  }

  cache.set(el, originalStyles);
}

function reset(el: HTMLElement, prop?: string) {
  let originalStyles: Styles | undefined = cache.get(el);

  if (prop && originalStyles) {
    // @ts-ignore
    el.style[prop] = originalStyles[prop];
    return;
  }
  if (originalStyles) {
    Object.entries(originalStyles).forEach(([key, value]) => {
      // @ts-ignore
      el.style[key] = value;
    });
  }
}
