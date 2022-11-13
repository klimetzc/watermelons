import { Col, Row, Tabs } from 'antd';
import { Order } from 'entities/order';
import { Preorder } from 'entities/preorder';
import React from 'react';
import { Link } from 'react-router-dom';
import { OrderData } from 'shared/api/types/interfaces';
import { useDivideBy } from 'shared/lib/hooks';
import '../ClientProfile.scss';

interface IUserOrders {
  orders: OrderData[] | undefined;
  isOrdersLoading: boolean;
}

export const UserOrders: React.FC<IUserOrders> = ({
  orders,
  isOrdersLoading,
}) => {
  const [doneOrders, activeOrders] = useDivideBy(orders, 'status', 'COMPLETED');
  return (
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
                    <Order.Card key={item.id} data={item} rootLink="profile" />
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
                    <Order.Card key={item.id} data={item} rootLink="profile" />
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
                <Preorder.Card rootLink="profile" id={1} />
              </Col>
              <Col span={24}>
                <Preorder.Card rootLink="profile" id={2} />
              </Col>
              <Col span={24}>
                <Preorder.Card rootLink="profile" id={3} />
              </Col>
            </Row>
          ),
        },
      ]}
    />
  );
};
