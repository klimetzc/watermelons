import React from 'react';
import { Input, InputProps } from 'antd';
import classNames from 'classnames';
import './InputMelon.scss';

const InputMelon: React.FC<InputProps> = (props) => {
  const className = classNames('input-melon');

  return <Input className={className} {...props} />;
};

export default InputMelon;
