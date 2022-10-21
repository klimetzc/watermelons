import React from 'react';
import { Select } from 'antd';
import SelectMelon from '../../../shared/ui/SelectMelon/SelectMelon';
import { ISortState } from '../types/interfaces';
import './SortProduct.scss';

const { Option } = Select;

const SortProducts: React.FC<ISortState> = ({ sort, setSort }) => (
  <div className="sort">
    <span className="sort__title">Сортировка:</span>
    <SelectMelon className="sort__selector" value={sort} onChange={setSort}>
      <Option value="cheap">Сначала недорогие</Option>
      <Option value="expensive">Сначала дорогие</Option>
      <Option value="high-rating">Высокий рейтинг</Option>
      <Option value="low-rating">Низкий рейтинг</Option>
    </SelectMelon>
  </div>
);

export default SortProducts;
