import React, { useState } from 'react';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import SearchMelon from '../../../shared/ui/SearchMelon/SearchMelon';
import SwitchMelon from '../../../shared/ui/SwitchMelon/SwitchMelon';
import { IFilter, IFilterState } from '../types/interfaces';
import PriceSlider from './PriceSlider.section';
import './FilterProducts.scss';

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
  const [isReset, setIsReset] = useState(false);

  return (
    <div className="filter">
      <SearchMelon
        placeholder="Введите название товара"
        className="filter__search"
        value={filter.search}
        hasShadow={false}
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
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
          <span className="filter__text">Только проверенные</span>
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
        Сбросить настройки
      </ButtonMelon>
    </div>
  );
};
export default FilterProducts;
