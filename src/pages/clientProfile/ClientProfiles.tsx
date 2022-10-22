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
    clientApi
      .getProfile()
      .then((profileJson) => {
        // setUserData(profileJson);
        console.log('profile: ', profileJson);
        dispatch(updateProfile(profileJson));
      })
      .catch(() => {
        console.log('data fetching failed');
        // setUserData();
      });
    clientApi
      .getOrders()
      .then((json) => {
        console.log('orders:', json);
        setOrders(json);
      })
      .catch((err) => {
        console.log('order err:', err);
      });
    clientApi
      .getBucket()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    document.title = 'Профиль пользователя';
  }, []);

  return (
    <div className="client-profile">
      <nav>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/categories">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Профиль</Breadcrumb.Item>
        </Breadcrumb>
        {/* <p>user data: {userData}</p> */}
      </nav>
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
