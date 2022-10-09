import React from 'react';
import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import './ButtonMelon.scss';

interface IButtonProps extends ButtonProps {
  sliced?: 'left' | 'right' | 'both';
}

const ButtonMelon: React.FC<IButtonProps> = ({ children, ...props }) => {
  const className = classNames(
    'button-melon',
    props.sliced ? `button-melon_sliced-${props.sliced}` : false
  );

  return (
    <Button {...props} className={className}>
      {children}
    </Button>
  );
};

export default ButtonMelon;
