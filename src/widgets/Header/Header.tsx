import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Skeleton } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import type { RootState } from '../../app/store';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import useCheckClient from '../../features/auth/model/useCheckClient';
// import useCheckSeller from '../../features/auth/model/useCheckSeller';
import './Header.scss';
import BucketWidget from '../../features/bucket/ui/BucketWidget';

const Header: React.FC = () => {
  const { isLoading } = useCheckClient();
  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );
  const isSellerLoggedIn = useSelector<RootState>(
    (state) => state.sellerAuthReducer.isLoggedIn
  );

  useEffect(() => {
    console.log('я перерендерился и вызвал загрузку с сервера');
    console.log('header login state: ', isClientLogged);
  }, []);

  return (
    <header className="page-header">
      <div className="page-header__logo">
        <Link to="/categories" className="page-header__logo">
          <div className="page-header__logo-image" />
          <span className="page-header__logo-text">Watermelons</span>
        </Link>
      </div>
      {isLoading ? (
        <Skeleton.Button active />
      ) : isClientLogged ? (
        <BucketWidget
          onClick={() => {
            console.log('click');
          }}
        />
      ) : isSellerLoggedIn ? (
        <p>панель управления товарами</p>
      ) : (
        <div className="page-header__auth-links">
          <Link to="/signin">
            <ButtonMelon>Войти</ButtonMelon>
          </Link>
          <Link to="/signup">
            <ButtonMelon type="primary">Зарегистрироваться</ButtonMelon>
          </Link>
        </div>
      )}
      {isClientLogged || isSellerLoggedIn ? (
        <Link to={isClientLogged ? '/profile' : '/welcome'}>
          <Avatar
            className="page-header__avatar"
            size={40}
            shape="square"
            icon={<UserOutlined />}
          />
        </Link>
      ) : (
        ''
      )}
    </header>
  );
};

export default Header;
