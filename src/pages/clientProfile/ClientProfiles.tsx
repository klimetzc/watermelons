import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Avatar, Breadcrumb, Descriptions } from 'antd';
import { HomeOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  setIsFilled,
  updateProfile,
} from '../../entities/user/client/model/profile';
import clientApi from '../../shared/api/client';
import EditProfile from '../../features/client/edit-profile/EditProfile';
import { RootState } from '../../app/store';
import OrderCard from '../../entities/user/order/ui/OrderCard';
import './ClientProfile.scss';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';

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
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(true);
  const isUserProfileFilled = useSelector(
    (state: RootState) => state.clientProfileReducer.isFilled
  );

  useEffect(() => {
    document.title = 'Профиль пользователя';

    clientApi
      .getProfile()
      .then((profileJson) => {
        if (profileJson?.name) dispatch(setIsFilled(true));

        dispatch(updateProfile(profileJson));
      })
      .catch((err) => {
        console.log(err);
      });

    clientApi
      .getOrders()
      .then((json) => {
        setIsOrdersLoading(false);
        setOrders(json);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsOrdersLoading(false);
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

      <Descriptions
        className="client-profile__description"
        title="Профиль пользователя"
        bordered
        column={1}
        extra={
          <>
            <ButtonMelon
              onClick={() => {
                setIsEditOpen(true);
              }}
            >
              Edit
            </ButtonMelon>
            <EditProfile
              isModalOpen={isEditOpen}
              setIsModalOpen={setIsEditOpen}
            />{' '}
            <Avatar
              size="large"
              icon={<UserOutlined />}
              src="https://img.freepik.com/free-photo/attractive-curly-woman-purple-cashmere-sweater-fuchsia-sunglasses-poses-isolated-wall_197531-24158.jpg?w=1380&t=st=1666612660~exp=1666613260~hmac=695d0bade27feba8b87a07f89fd4af7904314f8159d8e3bd98d3821bf7f77c51"
            />
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
          {isOrdersLoading ? <LoadingOutlined /> : null}
          {orders?.length ? (
            <>
              {' '}
              {orders.map((item) => (
                <OrderCard key={item.id} data={item} rootLink="profile" />
              ))}{' '}
            </>
          ) : (
            <p className="client-profile__orders-empty">
              {isOrdersLoading ? null : (
                <>
                  <span>У вас еще не было заказов. </span>
                  <Link to="/categories">Перейти к покупкам?</Link>
                </>
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProfiles;
