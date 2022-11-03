/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import 'antd/dist/antd.dark.css';
import { hooks } from 'shared/lib';

interface IWithAntdDarkTheme {
  children: React.ReactNode;
}

const useDisableImportedStyles = hooks.createUseDisableImportedStyles();

const WithAntdDarkTheme: React.FC<IWithAntdDarkTheme> = ({ children }) => {
  useDisableImportedStyles();
  return <>{children}</>;
};

export default WithAntdDarkTheme;
