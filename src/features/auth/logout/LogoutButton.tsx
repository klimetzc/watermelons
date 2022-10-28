import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { userAuth } from '../../../entities/user/model/auth';
import { sellerAuth } from '../../../entities/user/model/authSeller';
import './LogoutButton.scss';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onConfirm = () => {
    dispatch(userAuth.logout());
    dispatch(sellerAuth.logout());
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
