import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../../../entities/user/model/auth';
import { logout as sellerLogout } from '../../../entities/user/seller/model/auth';
import './LogoutButton.scss';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onConfirm = () => {
    dispatch(logout());
    dispatch(sellerLogout());
    localStorage.removeItem('JWT');
    localStorage.removeItem('role');
    navigate('/welcome');
  };

  return (
    <Popconfirm
      onConfirm={onConfirm}
      title="Вы уверены, что хотите выйти?"
      okText="Да"
      cancelText="Нет"
      icon={false}
    >
      <Tooltip placement="right" title="Выйти">
        <LogoutOutlined className="logout-btn__icon" />{' '}
      </Tooltip>
    </Popconfirm>
  );
};

export default LogoutButton;
