import React, { lazy } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
// import WithAntdDarkTheme from './WithAntdDarkTheme';

const WithAntdDarkTheme = lazy(() => import('./WithAntdDarkTheme'));
const WithAntdLightTheme = lazy(() => import('./WithAntdLightTheme'));

interface ThemeProps {
  children: React.ReactNode;
}

const WithTheme: React.FC<ThemeProps> = ({ children }) => {
  const isDarkThemeEnabled = useSelector(
    (state: RootState) => state.themeReducer.darkThemeEnabled
  );

  return (
    <div
      className={classNames(
        'app-full-width',
        isDarkThemeEnabled ? 'app-theme_dark' : false
      )}
    >
      <div
        className={classNames(
          'app-theme',
          isDarkThemeEnabled ? 'app-theme_dark' : false
        )}
      >
        {isDarkThemeEnabled ? (
          <WithAntdDarkTheme>{children}</WithAntdDarkTheme>
        ) : (
          <WithAntdLightTheme>{children}</WithAntdLightTheme>
        )}
      </div>
    </div>
  );
};

export default WithTheme;
