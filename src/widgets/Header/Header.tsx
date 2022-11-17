import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Button, Skeleton } from 'antd';
import { MenuOutlined, SettingFilled, UserOutlined } from '@ant-design/icons';
import type { RootState } from 'app/store';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import { userStatus } from 'features/auth/user-status';
import './Header.scss';
import { Bucket } from 'features/client/bucket';
import { Logout } from 'features/auth/logout';
import ThemeChanger from 'features/common/theme-changer/ui/ThemeChanger';
import LanguageSwitcher from 'features/common/language-switch/ui/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu } from './Menu';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isLoading } = userStatus.useCheckLogin();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );
  const isSellerLoggedIn = useSelector<RootState>(
    (state) => state.sellerAuthReducer.isLoggedIn
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    console.log('header render');
  }, []);

  return (
    <motion.header
      className="page-header"
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: 'spring',
        stiffness: 50,
        damping: 20,
      }}
    >
      <div className="page-header__logo">
        <Link to="/welcome" className="page-header__logo">
          <div className="page-header__logo-image" />
          <span className="page-header__logo-text">Watermelons</span>
        </Link>
        <div className="page-header__logo-themer">
          <ThemeChanger />
          <LanguageSwitcher />
        </div>
      </div>

      {isLoading ? (
        <Skeleton.Button active />
      ) : isClientLogged ? (
        <div className="page-header__bucket">
          <Bucket.Widget
            onClick={() => {
              console.log('click');
            }}
          />
        </div>
      ) : isSellerLoggedIn ? (
        <>
          <Link to="/dashboard">
            <p className="page-header__admin-link">
              {t('Control panel')}{' '}
              <SettingFilled style={{ fontSize: '20px' }} />
            </p>
          </Link>
          <div className="page-header__logout">
            <Logout.Button />
          </div>
        </>
      ) : (
        <div className="page-header__auth-links">
          <Link to="/signin">
            <ButtonMelon hasShadow className="page-header__auth-links-btn">
              {t('Login')}
            </ButtonMelon>
          </Link>
          <Link to="/signup">
            <ButtonMelon
              hasShadow
              type="primary"
              className="page-header__auth-links-btn"
            >
              {t('Signup')}
            </ButtonMelon>
          </Link>
        </div>
      )}
      {isClientLogged ? (
        <>
          <Link
            className="page-header__profile-link"
            to={isClientLogged ? '/profile' : '/welcome'}
          >
            <Avatar
              className="page-header__avatar"
              size={40}
              shape="square"
              src="https://img.freepik.com/free-photo/attractive-curly-woman-purple-cashmere-sweater-fuchsia-sunglasses-poses-isolated-wall_197531-24158.jpg?w=1380&t=st=1666607179~exp=1666607779~hmac=3bce6fca4329adcd9fc0c6a00b316fbab2e15a7127560790b779450369b16eb8"
              icon={<UserOutlined />}
            />
          </Link>
          <div className="page-header__logout">
            <Logout.Button />
          </div>
        </>
      ) : (
        ''
      )}
      <Button
        className="page-header__menu-btn"
        type="text"
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <MenuOutlined />
      </Button>

      <Menu isOpen={isMenuOpen} onClose={closeMenu} />
    </motion.header>
  );
};

export default Header;
