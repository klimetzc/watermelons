import React from 'react';
import withProviders from './providers/index';
import RouterPages from '../pages';
import './index.scss';
import 'antd/dist/antd.css';

const App = () => (
  <div className="app">
    <RouterPages />
  </div>
);

export default withProviders(App);
