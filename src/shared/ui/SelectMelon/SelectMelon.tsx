import React from 'react';
import { Select, SelectProps } from 'antd';
import './SelectMelon.scss';
import classNames from 'classnames';

const SelectMelon: React.FC<SelectProps> = ({ children, ...props }) => {
  const className = classNames('select-melon');

  return (
    <Select className={className} {...props}>
      {children}
    </Select>
  );
};

export default SelectMelon;
