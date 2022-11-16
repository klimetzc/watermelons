import React, { useEffect, useState } from 'react';
import { Slider } from 'antd';
import { useTranslation } from 'react-i18next';
import InputNumberMelon from '../../../../shared/ui/InputNumberMelon/InputPhoneMelon';
import CheckboxMelon from '../../../../shared/ui/CheckboxMelon/CheckboxMelon';
import { IFilterState, IisResetState } from '../types/interfaces';
import './PriceSlider.scss';

interface IProps {
  state: IFilterState;
  isReset: IisResetState;
}

const PriceSlider: React.FC<IProps> = ({
  state: { filter, setFilter },
  isReset: { isReset, setIsReset },
}) => {
  const { t } = useTranslation();
  const step = 10;
  const [min, max] = [10, 100000];
  const [range, setMinmax] = useState({ min: 10, max: 100000 });
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setIsReset(false);
    setActive(false);
    setMinmax({ min: 10, max: 100000 });
  }, [isReset]);

  useEffect(() => {
    if (active) setFilter({ ...filter, range: [range.min, range.max] });
    else setFilter({ ...filter, range: [min, max] });
  }, [range, active]);

  const changeMin = (value: number) => {
    if (Number.isNaN(value) || value < min) return setMinmax({ ...range, min });
    if (value > max) return setMinmax({ min: max, max });

    if (range.max < value) return setMinmax({ min: value, max: value });
    return setMinmax({ ...range, min: value });
  };
  const changeMax = (value: number) => {
    if (Number.isNaN(value) || value < min) return setMinmax({ min, max: min });
    if (value > max) return setMinmax({ ...range, max });
    if (range.min > value) return setMinmax({ min: value, max: value });
    return setMinmax({ ...range, max: value });
  };

  return (
    <>
      <CheckboxMelon
        checked={active}
        onChange={(e) => setActive(e.target.checked)}
      >
        {t('Price')}
      </CheckboxMelon>
      <div className="price-slider__range">
        <InputNumberMelon
          className="price-slider__input-number"
          value={range.min}
          onChange={(e) => changeMin(Number(e))}
          disabled={!active}
        />
        <span>-</span>
        <InputNumberMelon
          className="price-slider__input-number"
          value={range.max}
          onChange={(e) => changeMax(Number(e))}
          disabled={!active}
        />
      </div>

      <Slider
        step={step}
        min={min}
        max={max}
        range={{ draggableTrack: true }}
        value={[range.min, range.max]}
        onChange={(e: number[]) => setMinmax({ min: e[0], max: e[1] })}
        disabled={!active}
      />
    </>
  );
};

export default PriceSlider;
