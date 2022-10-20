import React from 'react';
import { Checkbox, CheckboxProps } from 'antd';
import classNames from 'classnames';
import './CheckboxMelon.scss';

const SwitchMelon: React.FC<CheckboxProps> = (props) => {
  const className = classNames('checkbox-melon');

  return <Checkbox className={className} {...props} />;
};

export default SwitchMelon;
