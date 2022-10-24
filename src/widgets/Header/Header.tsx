import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Skeleton } from 'antd';
import { SettingFilled, UserOutlined } from '@ant-design/icons';
import type { RootState } from '../../app/store';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import useCheckClient from '../../features/auth/lib/useCheckClient';
import './Header.scss';
import BucketWidget from '../../features/client/bucket/ui/BucketWidget';
import LogoutButton from '../../features/auth/logout/LogoutButton';

const Header: React.FC = () => {
  const { isLoading } = useCheckClient();
  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );
  const isSellerLoggedIn = useSelector<RootState>(
    (state) => state.sellerAuthReducer.isLoggedIn
  );

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
        <>
          <Link to="/dashboard">
            <p className="page-header__admin-link">
              Панель управления <SettingFilled style={{ fontSize: '20px' }} />
            </p>
          </Link>
          <LogoutButton />
        </>
      ) : (
        <div className="page-header__auth-links">
          <Link to="/signin">
            <ButtonMelon hasShadow className="page-header__auth-links-btn">
              Войти
            </ButtonMelon>
          </Link>
          <Link to="/signup">
            <ButtonMelon
              hasShadow
              type="primary"
              className="page-header__auth-links-btn"
            >
              Зарегистрироваться
            </ButtonMelon>
          </Link>
        </div>
      )}
      {isClientLogged ? (
        <>
          <Link to={isClientLogged ? '/profile' : '/welcome'}>
            <Avatar
              className="page-header__avatar"
              size={40}
              shape="square"
              src="https://img.freepik.com/free-photo/attractive-curly-woman-purple-cashmere-sweater-fuchsia-sunglasses-poses-isolated-wall_197531-24158.jpg?w=1380&t=st=1666607179~exp=1666607779~hmac=3bce6fca4329adcd9fc0c6a00b316fbab2e15a7127560790b779450369b16eb8"
              icon={<UserOutlined />}
            />
          </Link>
          <LogoutButton />
        </>
      ) : (
        ''
      )}
    </header>
  );
};

export default Header;
