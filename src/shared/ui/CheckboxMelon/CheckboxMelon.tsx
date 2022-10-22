import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import classNames from 'classnames';
import './CheckboxMelon.scss';

const CheckboxMelon: React.FC<CheckboxProps> = (props) => {
  const className = classNames('checkbox-melon');

  return <Checkbox className={className} {...props} />;
};

export default CheckboxMelon;
