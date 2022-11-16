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

export const getPercentFromValue = (current: number, value: number): number =>
  Math.ceil((current * 100) / value);

export const getCurrencyString = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'RUB':
      return '₽';
    case 'CNY':
      return '¥';
    case 'EUR':
      return '€';
    default:
      return '$';
  }
};
