import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import classNames from 'classnames';
import './DatePickerMelon.scss';

const DatePickerMelon: React.FC<DatePickerProps> = ({
  className,
  ...props
}) => (
  <DatePicker
    className={classNames('date-picker-melon', className || '')}
    {...props}
  />
);

export default DatePickerMelon;
