/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { hooks } from 'shared/lib';
// import 'antd/dist/antd.css';

interface IWithAntdLightTheme {
  children: React.ReactNode;
}

const useDisableImportedStyles = hooks.createUseDisableImportedStyles();

const WithAntdLightTheme: React.FC<IWithAntdLightTheme> = ({ children }) => {
  useDisableImportedStyles();
  return <>{children}</>;
};

export default WithAntdLightTheme;
