import { useEffect, useState } from 'react';

function useWindowWidthAndHeight() {
  const [dimentions, setDimentions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () =>
      setDimentions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return dimentions;
}

export default useWindowWidthAndHeight;
