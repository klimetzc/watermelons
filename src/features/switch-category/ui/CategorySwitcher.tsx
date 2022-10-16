import React from 'react';
import { Radio, Space } from 'antd';
import { AndroidFilled } from '@ant-design/icons';
// import { useDispatch } from 'react-redux';
import './CategorySwitcher.scss';

const CategorySwitcher: React.FC = () => (
  // const dispatch = useDispatch();

  <Radio.Group className="category-switcher" defaultValue="BIT">
    <Space direction="vertical">
      <Radio.Button
        value="BIT"
        className="category-switcher__button"
        defaultChecked
      >
        <div className="category-switcher__button-content">
          <AndroidFilled />
          Бытовая техника
        </div>
      </Radio.Button>
      <Radio.Button
        value="ELECTRO"
        className="category-switcher__button"
        disabled
      >
        <div className="category-switcher__button-content">
          <AndroidFilled />
          Электроника
        </div>
      </Radio.Button>
      <Radio.Button
        value="SMTHELSE"
        className="category-switcher__button"
        disabled
      >
        <div className="category-switcher__button-content">
          <AndroidFilled />
          Электроника
        </div>
      </Radio.Button>
    </Space>
  </Radio.Group>
);
export default CategorySwitcher;
