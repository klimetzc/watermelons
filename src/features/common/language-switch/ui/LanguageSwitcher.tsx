import React from 'react';
import SelectMelon from 'shared/ui/SelectMelon/SelectMelon';
import { Select } from 'antd';
import { TranslationOutlined } from '@ant-design/icons';

const { Option } = Select;

const LanguageSwitcher = () => {
  const onChange = (value: string) => {
    switch (value) {
      case 'ru':
        localStorage.setItem('i18nextLng', 'ru');
        break;
      case 'en':
        localStorage.setItem('i18nextLng', 'en');
        break;
      case 'tr':
        localStorage.setItem('i18nextLng', 'tr');
        break;
      default:
        localStorage.setItem('i18nextLng', 'ru');
        break;
    }
    window.location.reload();
  };
  return (
    <SelectMelon
      onChange={onChange}
      defaultValue={localStorage.getItem('i18nextLng')?.slice(0, 2) || 'ru'}
      suffixIcon={<TranslationOutlined />}
      // style={{ minWidth: '150px' }}
    >
      <Option value="ru">Русский</Option>
      <Option value="tr">Türk</Option>
      <Option value="en">English</Option>
    </SelectMelon>
  );
};

export default LanguageSwitcher;
