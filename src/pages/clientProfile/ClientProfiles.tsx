import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Breadcrumb, Col, Descriptions, Row, Tabs } from 'antd';
import { HomeOutlined, LoadingOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import EditProfile from 'features/client/edit-profile/EditProfile';
import OrderCard from 'entities/order/ui/OrderCard';
import './ClientProfile.scss';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import { dom } from 'shared/lib';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { useDivideBy } from 'shared/lib/hooks';
import { Preorder } from 'entities/preorder';

const ClientProfiles = () => {
  dom.useTitle('Профиль пользователя');

  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { data: userData, isSuccess: isProfileLoaded } =
    clientEndpoints.useClientProfileQuery('');
  const { data: orders, isLoading: isOrdersLoading } =
    clientEndpoints.useClientOrdersQuery('');
  const [doneOrders, activeOrders] = useDivideBy(orders, 'status', 'COMPLETED');
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
          <Tabs
            className="client-profile__tabs"
            defaultActiveKey="1"
            size="large"
            items={[
              {
                label: 'Активные',
                key: '1',
                children: (
                  <div className="client-profile__orders-list">
                    {activeOrders?.length ? (
                      <>
                        {' '}
                        {activeOrders.map((item) => (
                          <OrderCard
                            key={item.id}
                            data={item}
                            rootLink="profile"
                          />
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
                ),
              },
              {
                label: 'Завершённые',
                key: '2',
                children: (
                  <div className="client-profile__orders-list">
                    {doneOrders?.length ? (
                      <>
                        {' '}
                        {doneOrders.map((item) => (
                          <OrderCard
                            key={item.id}
                            data={item}
                            rootLink="profile"
                          />
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
                ),
              },
              {
                label: 'Предзаказы',
                key: '3',
                children: (
                  <Row style={{ gap: '10px' }}>
                    <Col span={24}>
                      <Preorder.Card id={1} />
                    </Col>
                    <Col span={24}>
                      <Preorder.Card id={2} />
                    </Col>
                    <Col span={24}>
                      <Preorder.Card id={3} />
                    </Col>
                  </Row>
                ),
              },
            ]}
          />
          {isOrdersLoading ? <LoadingOutlined /> : null}
        </div>
      </div>
    </div>
  );
};

export default ClientProfiles;
