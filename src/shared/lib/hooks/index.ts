/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import { useMemo, useEffect } from 'react';

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

const switchableGlobalStyleSheets: StyleSheet[] = [];
type useDisableImportedStyles = () => void;

// Магия вне Хогвартса всё же не работает
export const createUseDisableImportedStyles = (
  immediatelyUnloadStyle = true
): useDisableImportedStyles => {
  let localStyleSheet: StyleSheet;
  return () => {
    useEffect(() => {
      if (document.styleSheets.length < 1) return;

      if (localStyleSheet == null) {
        localStyleSheet = document.styleSheets[document.styleSheets.length - 1];
        switchableGlobalStyleSheets.push(localStyleSheet);
      }

      if (!immediatelyUnloadStyle) {
        switchableGlobalStyleSheets.forEach(
          (styleSheet) => (styleSheet.disabled = true)
        );
      }

      localStyleSheet.disabled = false;

      if (immediatelyUnloadStyle)
        return () => {
          if (localStyleSheet != null) localStyleSheet.disabled = true;
        };
    });
  };
};
