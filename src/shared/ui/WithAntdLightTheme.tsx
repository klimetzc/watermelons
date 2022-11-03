/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import 'antd/dist/antd.css';

interface IWithAntdLightTheme {
  children: React.ReactNode;
}

const WithAntdLightTheme: React.FC<IWithAntdLightTheme> = ({ children }) => (
  <>{children}</>
);

export default WithAntdLightTheme;
