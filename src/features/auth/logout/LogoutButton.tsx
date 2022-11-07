import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Popconfirm, Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <Popconfirm
      onConfirm={onConfirm}
      title={t('Sure logout?')}
      okText={t('yes')}
      cancelText={t('no')}
      icon={false}
    >
      <Tooltip placement="right" title={t('Logout')}>
        <LogoutOutlined className="logout-btn__icon" />{' '}
      </Tooltip>
    </Popconfirm>
  );
};

export default LogoutButton;
