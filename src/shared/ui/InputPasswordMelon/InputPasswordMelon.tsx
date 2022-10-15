import { Input, InputProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import './InputPasswordMelon.scss';

const InputPasswordMelon: React.FC<InputProps> = (props) => {
  const className = classNames('input-password-melon');

  return <Input.Password className={className} {...props} />;
};

export default InputPasswordMelon;
