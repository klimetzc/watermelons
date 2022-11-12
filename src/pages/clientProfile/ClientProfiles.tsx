import React, { useEffect, useState } from 'react';
import { Alert, Breadcrumb } from 'antd';
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ClientProfile.scss';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import { dom } from 'shared/lib';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { UserProfile } from './layout/UserProfile';
import { UserOrders } from './layout/UserOrders';

const ClientProfiles = () => {
  dom.useTitle('Профиль пользователя');

  const { data: userData, isSuccess: isProfileLoaded } =
    clientEndpoints.useClientProfileQuery('');

  const { data: orders, isLoading: isOrdersLoading } =
    clientEndpoints.useClientOrdersQuery('');

  const [isUserProfileFilled, setIsUserProfileFilled] =
    useState<boolean>(false);

  useEffect(() => {
    if (userData?.name) setIsUserProfileFilled(true);
  }, [isProfileLoaded]);

  return (
    <div className="client-profile">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/categories">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Профиль</Breadcrumb.Item>
      </Breadcrumb>
      {!isUserProfileFilled ? (
        <Alert
          className="client-profile__alert"
          banner
          type="warning"
          message="Чтобы сделать заказ сперва нужно заполнить профиль"
          action={
            <Link to="/categories">
              <ButtonMelon sliced="both" type="link" size="small">
                Перейти к просмотру товаров
              </ButtonMelon>
            </Link>
          }
        />
      ) : null}
      <UserProfile userData={userData} />
      <div className="client-profile__orders">
        <p className="client-profile__orders-title">Заказы:</p>
        <div className="client-profile__orders-list">
          <UserOrders orders={orders} isOrdersLoading={isOrdersLoading} />
          {isOrdersLoading ? <LoadingOutlined /> : null}
        </div>
      </div>
    </div>
  );
};

export default ClientProfiles;
