import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Breadcrumb, Descriptions } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { updateProfile } from '../../entities/user/client/model/profile';
import clientApi from '../../shared/api/client';
import EditProfile from '../../features/client/edit-profile/EditProfile';
import { RootState } from '../../app/store';
import OrderCard from '../../entities/user/order/ui/OrderCard';
import './ClientProfile.scss';

interface OrderData {
  id: number;
  created: string;
  changed: string;
  status: string;
  sum: number;
  sellerName: string;
}

const ClientProfiles = () => {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.clientProfileReducer.userdata
  );
  const [orders, setOrders] = useState<OrderData[] | null>(null);

  useEffect(() => {
    document.title = 'Профиль пользователя';

    clientApi
      .getProfile()
      .then((profileJson) => {
        dispatch(updateProfile(profileJson));
      })
      .catch((err) => {
        console.log(err);
      });

    clientApi
      .getOrders()
      .then((json) => {
        setOrders(json);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

      <Descriptions
        className="client-profile__description"
        title="Профиль пользователя"
        bordered
        column={1}
        extra={
          <>
            <EditProfile /> <Avatar size="large" icon={<UserOutlined />} />
          </>
        }
      >
        <Descriptions.Item label="Имя">
          {userData?.name || 'Информация отсутствует'}
        </Descriptions.Item>
        <Descriptions.Item label="Фамилия">
          {userData?.family || 'Информация отсутствует'}
        </Descriptions.Item>
        <Descriptions.Item label="Отчество">
          {userData?.surname || 'Информация отсутствует'}
        </Descriptions.Item>
        <Descriptions.Item label="Адрес">
          {userData?.address || 'Информация отсутствует'}
        </Descriptions.Item>
        <Descriptions.Item label="Телефон">
          {userData?.phone || 'Информация отсутствует'}
        </Descriptions.Item>
      </Descriptions>
      <div className="client-profile__orders">
        <p className="client-profile__orders-title">Заказы:</p>
        <div className="client-profile__orders-list">
          {/* TODO Переделать в <ul> когда заказы появятся */}
          {orders?.length ? (
            <div>
              {' '}
              {orders.map((item) => (
                <OrderCard key={item.id} data={item} />
              ))}{' '}
            </div>
          ) : (
            <p className="client-profile__orders-empty">
              У вас еще не было заказов.{' '}
              <Link to="/categories">Перейти к покупкам?</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfiles;
