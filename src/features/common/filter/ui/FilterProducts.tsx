import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import SwitchMelon from '../../../../shared/ui/SwitchMelon/SwitchMelon';
import { IFilter, IFilterState } from '../types/interfaces';
import PriceSlider from './PriceSlider.section';
import './FilterProducts.scss';
import InputMelon from '../../../../shared/ui/InputMelon/InputMelon';

interface IProps {
  state: IFilterState;
  reset: IFilter;
}

export interface IFilters {
  checked: boolean;
}

const FilterProducts: React.FC<IProps> = ({
  state: { filter, setFilter },
  reset,
}) => {
  const { t } = useTranslation();
  const [isReset, setIsReset] = useState(false);

  return (
    <div className="filter">
      <InputMelon
        placeholder={t('Search for product')}
        className="filter__search"
        value={filter.search}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
        suffix={<SearchOutlined style={{ color: 'gray' }} />}
      />
      <div className="filter__toggles">
        <div className="filter__toggle">
          <SwitchMelon
            className="filter__switch-melon"
            checked={filter.filters.checked}
            onChange={(e) =>
              setFilter({
                ...filter,
                filters: {
                  ...filter.filters,
                  checked: e,
                },
              })
            }
          />
          <span className="filter__text">{t('Certified products')}</span>
        </div>
      </div>
      <div className="filter__price-slider price-slider">
        <PriceSlider
          state={{ filter, setFilter }}
          isReset={{ isReset, setIsReset }}
        />
      </div>

      <ButtonMelon
        onClick={() => {
          setFilter(reset);
          setIsReset(true);
        }}
      >
        {t('Reset all settings')}
      </ButtonMelon>
    </div>
  );
};
export default FilterProducts;
