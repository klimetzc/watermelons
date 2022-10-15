import React from 'react';
import { BackTop } from 'antd';
import withProviders from './providers/index';
import RouterPages from '../pages';
import './index.scss';
import 'antd/dist/antd.css';

const App = () => (
  <div className="app">
    <BackTop />
    <RouterPages />
  </div>
);

export default withProviders(App);
