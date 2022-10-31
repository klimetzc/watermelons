import { useMemo } from 'react';

export const useDivideBy = <T, K extends keyof T>(
  array: T[] | null | undefined,
  param: K,
  value: string | boolean
): T[][] | null[] =>
  useMemo(() => {
    if (!array) return [null, null];
    const arrayTrueKey = array.filter((item) => item[param] === value);
    const arrayFalseKey = array.filter((item) => item[param] !== value);

    // eslint-disable-next-line consistent-return
    return [arrayTrueKey, arrayFalseKey];
  }, [array, param]);
