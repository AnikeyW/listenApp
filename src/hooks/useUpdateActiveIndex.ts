import { RefObject, useEffect, useState } from 'react';

export const useUpdateActiveIndex = (
  containerRef: RefObject<HTMLDivElement>,
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const containerNode = containerRef?.current;

    if (!containerNode) {
      return;
    }

    const scroll = () => {
      const containerData = containerNode.getBoundingClientRect();
      const firstChildData =
        containerNode.firstElementChild?.getBoundingClientRect();

      if (!firstChildData) {
        return;
      }

      const shift = firstChildData.left - containerData.left;
      setActiveIndex(Math.abs(Math.round(shift / firstChildData.width)));
    };

    containerNode.addEventListener('scroll', scroll);

    return () => {
      containerNode.removeEventListener('scroll', scroll);
    };
  }, [containerRef]);

  return activeIndex;
};
