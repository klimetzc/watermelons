import React from 'react';
import { Select, SelectProps } from 'antd';
import './SelectMelon.scss';
import classNames from 'classnames';

const SelectMelon: React.FC<SelectProps> = ({
  children,
  className,
  ...props
}) => (
  // const className = classNames(props.className, 'select-melon');

  <Select className={classNames('select-melon', className || '')} {...props}>
    {children}
  </Select>
);
export default SelectMelon;
