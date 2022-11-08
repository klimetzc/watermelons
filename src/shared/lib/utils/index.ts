import { Grid } from 'antd';

type Breakpoints = 'xs' | 'sm' | 'md' | 'ld' | 'xl' | 'xxl';

export const isResolutionLessThan = (size: Breakpoints) => {
  const { useBreakpoint } = Grid;
  const breakpoints = useBreakpoint();
  const currentBreakpoints = Object.entries(breakpoints)
    .filter((point) => !!point[1])
    .map((resulution) => resulution[0]);
  return !currentBreakpoints.includes(size);
};
