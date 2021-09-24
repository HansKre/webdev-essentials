import { useState, useEffect } from 'react';

/**
 * Listens for `resize`-event of the window and returns window.innerWidth.
 * Note: every width-change is a state-change and hence a re-render!
 * @returns current window width and height
 */
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  } as { width: number; height: number });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
