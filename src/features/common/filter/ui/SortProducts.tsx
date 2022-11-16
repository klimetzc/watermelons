import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import SelectMelon from '../../../../shared/ui/SelectMelon/SelectMelon';
import { ISortState } from '../types/interfaces';
import './SortProduct.scss';

const { Option } = Select;

const SortProducts: React.FC<ISortState> = ({ sort, setSort }) => {
  const { t } = useTranslation();

  return (
    <div className="sort">
      <span className="sort__title">{t('Sorting')}:</span>
      <SelectMelon className="sort__selector" value={sort} onChange={setSort}>
        <Option value="cheap">{t('Price min')}</Option>
        <Option value="expensive">{t('Price max')}</Option>
        <Option value="high-rating">{t('Hight-rated')}</Option>
        <Option value="low-rating">{t('Low-rated')}</Option>
      </SelectMelon>
    </div>
  );
};

export default SortProducts;
