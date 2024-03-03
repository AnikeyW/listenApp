import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './HorizontalCarusel.module.scss';
import { MdArrowForwardIos, MdArrowBackIosNew } from 'react-icons/md';
import { useUpdateActiveIndex } from '@/hooks/useUpdateActiveIndex';
import { useWindowSize } from '@/hooks/useWindowWidth';

interface Props {
  children: ReactNode;
  itemsLength: number;
}

const HorizontalCarusel: FC<Props> = ({ children, itemsLength }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollActiveIndex = useUpdateActiveIndex(containerRef);
  const windowWidth = useWindowSize();

  useEffect(() => {
    setActiveIndex(scrollActiveIndex);
  }, [scrollActiveIndex]);

  const move = (index: number) => {
    const containerNode = containerRef?.current;

    if (!containerNode) {
      return;
    }

    setActiveIndex(index);

    const firstChildData =
      containerNode.firstElementChild?.getBoundingClientRect();
    if (!firstChildData) {
      return;
    }

    containerNode.scrollTo({
      left: index * firstChildData.width,
      behavior: 'smooth',
    });
  };

  const leftClickHandler = () => {
    move(Math.max(0, activeIndex - 1));
  };

  const rightClickHandler = () => {
    if (windowWidth >= 992) {
      move(Math.min(activeIndex + 1, itemsLength - 2));
    } else {
      move(Math.min(activeIndex + 1, itemsLength - 1));
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.root} ref={containerRef}>
        {children}
        {activeIndex !== 0 && (
          <div
            className={clsx(styles.root__btn, styles.root__btnLeft)}
            onClick={leftClickHandler}
          >
            <MdArrowBackIosNew />
          </div>
        )}

        {activeIndex !== itemsLength - (windowWidth >= 992 ? 2 : 1) && (
          <div
            className={clsx(styles.root__btn, styles.root__btnRight)}
            onClick={rightClickHandler}
          >
            <MdArrowForwardIos />
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalCarusel;
