import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Descriptions } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { updateProfile } from '../../entities/user/model/profile';
import clientApi from '../../shared/api/client';
import Header from '../../widgets/Header/Header';
import './ClientProfile.scss';
import EditProfile from '../../features/edit-profile/EditProfile';

import { RootState } from '../../app/store';

// interface IUserData {
//   name: string;
//   surname: string;
//   family: string;
//   address: string;
//   phone: number | string;
// }

const ClientProfiles = () => {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.clientProfileReducer.userdata
  );
  const [orders, setOrders] = useState<string>('none');

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
        setOrders(json?.length ? json : 'empty array');
      })
      .catch((err) => {
        console.log('order err:', err);
        setOrders('error');
      });
    document.title = 'Профиль пользователя';
  }, []);

  return (
    <>
      <Header />
      <div className="client-profile">
        <div>
          Эту страницу видят только зарегистрированные пользователи (клиенты)
          {/* <p>user data: {userData}</p> */}
        </div>
        <Descriptions
          title="Профиль пользователя"
          bordered
          column={1}
          extra={
            <>
              <EditProfile /> <Avatar size="large" icon={<UserOutlined />} />
            </>
          }
        >
          <Descriptions.Item label="Name">
            {userData?.name || 'Информация отсутствует'}
          </Descriptions.Item>
          <Descriptions.Item label="Surname">
            {userData?.surname || 'Информация отсутствует'}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {userData?.phone || 'Информация отсутствует'}
          </Descriptions.Item>
          <Descriptions.Item label="Address">
            {userData?.address || 'Информация отсутствует'}
          </Descriptions.Item>
          <Descriptions.Item label="Family">
            {userData?.family || 'Информация отсутствует'}
          </Descriptions.Item>
        </Descriptions>
        <div>orders: {orders}</div>
      </div>
    </>
  );
};

export default ClientProfiles;
