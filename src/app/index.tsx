/* eslint-disable import/no-unresolved */
import React from 'react';
import { BackTop } from 'antd';
import RouterPages from 'pages';
import classNames from 'classnames';
import WithTheme from 'shared/ui/WithTheme';
import withProviders from './providers/index';
import './index.scss';
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';

const App = () => (
  <div className={classNames('app')}>
    <WithTheme>
      <BackTop />
      <RouterPages />
    </WithTheme>
  </div>
);

export default withProviders(App);
