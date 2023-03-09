import React from 'react';
import { Radio, Space } from 'antd';
import { AndroidFilled } from '@ant-design/icons';
import './Switcher.scss';
import { useTranslation } from 'react-i18next';

export const Switcher: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Radio.Group className="category-switcher" defaultValue="BIT">
      <Space direction="vertical">
        <Radio.Button
          value="BIT"
          className="category-switcher__button"
          defaultChecked
        >
          <div className="category-switcher__button-content">
            <AndroidFilled />
            {t('Products')}
          </div>
        </Radio.Button>
        <Radio.Button
          value="ELECTRO"
          className="category-switcher__button"
          disabled
        >
          <div className="category-switcher__button-content">
            <AndroidFilled />
            {t('Household appliances')}
          </div>
        </Radio.Button>
        <Radio.Button
          value="SMTHELSE"
          className="category-switcher__button"
          disabled
        >
          <div className="category-switcher__button-content">
            <AndroidFilled />
            {t('Electronics')}
          </div>
        </Radio.Button>
      </Space>
    </Radio.Group>
  );
};
