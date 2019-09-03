import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(
    window.innerWidth > window.innerHeight
      ? window.innerWidth
      : window.innerHeight
  );

  useEffect(() => {
    const handleResize = () =>
      setWidth(
        window.innerWidth > window.innerHeight
          ? window.innerWidth
          : window.innerHeight
      );
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return width;
}

export default useWindowWidth;
