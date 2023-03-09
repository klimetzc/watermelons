import React from 'react';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import enUS from 'antd/es/locale/en_US';
import trTR from 'antd/es/locale/tr_TR';

const getAntdDefaultLanguage = (
  lang: string | null = localStorage.getItem('i18nextLng')
) => {
  switch (lang) {
    case 'ru':
      return ruRU;
    case 'en':
      return enUS;
    case 'tr':
      return trTR;
    default:
      return ruRU;
      break;
  }
};

ConfigProvider.config({
  theme: {
    primaryColor: localStorage.getItem('darkThemeEnabled')
      ? '#065fd4'
      : '#ff6c75',
  },
});

const withAntdConfig = (component: () => React.ReactNode) => () =>
  (
    <ConfigProvider locale={getAntdDefaultLanguage()}>
      {component()}
    </ConfigProvider>
  );

export default withAntdConfig;
