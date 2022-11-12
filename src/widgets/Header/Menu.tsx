import { SettingFilled, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Drawer, Skeleton } from 'antd';
import { RootState } from 'app/store';
import LogoutButton from 'features/auth/logout/LogoutButton';
import useCheckLogin from 'features/auth/user-status/lib/useCheckLogin';
import BucketWidget from 'features/client/bucket/ui/BucketWidget';
import LanguageSwitcher from 'features/common/language-switch/ui/LanguageSwitcher';
import ThemeChanger from 'features/common/theme-changer/ui/ThemeChanger';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Menu.scss';

interface IMenu {
  isOpen: boolean;
  onClose: () => void;
}

export const Menu: React.FC<IMenu> = ({ onClose, isOpen = false }) => {
  const { t } = useTranslation();
  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );
  const isSellerLoggedIn = useSelector<RootState>(
    (state) => state.sellerAuthReducer.isLoggedIn
  );
  const { isLoading } = useCheckLogin();
  return (
    <Drawer
      title="Menu"
      className="header-menu"
      open={isOpen}
      onClose={onClose}
    >
      <div className="header-menu__column">
        {isLoading ? (
          <Skeleton.Button active />
        ) : isClientLogged ? (
          <Button type="text" onClick={onClose}>
            <BucketWidget
              onClick={() => {
                console.log('click');
              }}
            />
          </Button>
        ) : isSellerLoggedIn ? (
          <>
            <Link to="/dashboard" onClick={onClose}>
              <p className="header-menu__admin-link">
                {t('Control panel')}{' '}
                <SettingFilled style={{ fontSize: '20px' }} />
              </p>
            </Link>
            <LogoutButton />
          </>
        ) : null}
        {isClientLogged ? (
          <>
            <Link
              to={isClientLogged ? '/profile' : '/welcome'}
              onClick={onClose}
            >
              <Avatar
                className="header-menu__avatar"
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
        <ThemeChanger />
        <LanguageSwitcher />
      </div>
    </Drawer>
  );
};
