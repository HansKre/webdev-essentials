import useWindowSize from './useWindowResize';

type Limit = 'up' | 'down' | 'between' | 'only';

enum Breakpoint {
  phone = 0,
  tablet = 768 /* width of iPad Mini */,
  desktop = 835 /* wider than iPad PRO 11 */,
}

function useBreakPoint(
  limit: Limit,
  start: keyof typeof Breakpoint,
  end?: keyof typeof Breakpoint
): boolean {
  const { width: windowWidth } = useWindowSize();
  if (limit === 'only') {
    return windowWidth === Breakpoint[start];
  }
  if (limit === 'up') {
    return windowWidth >= Breakpoint[start];
  }
  if (limit === 'down') {
    return windowWidth < Breakpoint[start];
  }
  if (limit === 'between' && end) {
    return windowWidth >= Breakpoint[start] && windowWidth < Breakpoint[end];
  }
  return false;
}

export default useBreakPoint;
