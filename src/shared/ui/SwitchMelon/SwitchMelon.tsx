import React from 'react';
import { Switch, SwitchProps } from 'antd';
import classNames from 'classnames';

const SwitchMelon: React.FC<SwitchProps> = ({ className, ...props }) => (
  <Switch className={classNames('switch-melon', className || '')} {...props} />
);

export default SwitchMelon;
