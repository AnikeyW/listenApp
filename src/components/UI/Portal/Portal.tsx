import { useRef, useEffect, useState, ReactNode, FC } from 'react';
import { createPortal } from 'react-dom';
import styles from './portal.module.scss';

interface PortalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Portal: FC<PortalProps> = ({ isOpen, onClose, children }) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#overlays');
    setMounted(true);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <>{isOpen && <div className={styles.portal}>{children}</div>}</>,
        ref.current,
      )
    : null;
};

export default Portal;
