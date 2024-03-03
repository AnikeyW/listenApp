import { useLayoutEffect, useState } from 'react';

export function useWindowSize() {
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
}
