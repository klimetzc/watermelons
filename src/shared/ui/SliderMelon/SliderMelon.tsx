import React from 'react';
import { Slider } from 'antd';
import classNames from 'classnames';
import './SliderMelon.scss';

const SliderMelon: React.FC = (props) => {
  const className = classNames('slider-melon');

  return <Slider className={className} {...props} />;
};

export default SliderMelon;
