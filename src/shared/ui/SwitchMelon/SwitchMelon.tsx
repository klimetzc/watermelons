import React from 'react';
import { Switch, SwitchProps } from 'antd';
import classNames from 'classnames';

const SwitchMelon: React.FC<SwitchProps> = (props) => {
  const className = classNames('switch-melon');

  return <Switch className={className} {...props} />;
};

export default SwitchMelon;
