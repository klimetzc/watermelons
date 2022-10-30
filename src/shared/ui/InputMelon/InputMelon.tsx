import React from 'react';
import { Input, InputProps } from 'antd';
import classNames from 'classnames';
import './InputMelon.scss';

const InputMelon: React.FC<InputProps> = ({ className, ...props }) => (
  <Input className={classNames('input-melon', className || '')} {...props} />
);

export default InputMelon;
