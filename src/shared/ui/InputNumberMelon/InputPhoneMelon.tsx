import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import classNames from 'classnames';
import './InputPhoneMelon.scss';

const InputPhoneMelon: React.FC<InputNumberProps> = (props) => {
  const className = classNames('input-number-melon');

  return <InputNumber className={className} {...props} />;
};

export default InputPhoneMelon;
