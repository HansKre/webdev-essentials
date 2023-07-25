import { useEffect, useState } from 'react';

type Props = {
  selector?: string;
};

type Dimensions = {
  width: number;
  height: number;
};

/**
 * Subscribes to `window.onresize`-event and notifies about dimension-changes.
 * @param {string} [selector] - An optional CSS-Selector
 * @returns {Dimensions} either current innerWidth and innerHeight of window or the clientWidth and clientHeight of the element specified by selector every time a window-resize-event happens.
 *
 * @example
 * const { width, height } = useWindowResize({ selector: "#root main > article[tabIndex='-1']" })
 */
export function useWindowResize(options: Props = { selector: '' }): Dimensions {
  const { selector } = options;
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function updateDimensions() {
      let element: Element | null | undefined;
      if (selector) {
        element = document.querySelector(selector);
      }
      setDimensions({
        width: element?.clientWidth || window.innerWidth,
        height: element?.clientHeight || window.innerHeight,
      });
    }
    window.addEventListener('resize', updateDimensions);
    updateDimensions();
    return () => window.removeEventListener('resize', updateDimensions);
  }, [selector]);
  return dimensions;
}
