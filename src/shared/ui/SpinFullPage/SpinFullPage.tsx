import React from 'react';
import { Spin } from 'antd';
import './SpinFullPage.scss';
import { LoadingOutlined } from '@ant-design/icons';

const SpinFullPage = () => (
  <div className="spin-full-page">
    <Spin
      size="large"
      indicator={<LoadingOutlined className="spin-indicator" />}
    />
    <p className="spin-full-page__description">Загрузка ...</p>
  </div>
);

export default SpinFullPage;
