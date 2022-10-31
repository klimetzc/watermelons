import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import './SellerDashboard.scss';
import {
  IProduct,
  IProductKeys,
  ISellerOrder,
  ISellerOrderKeys,
} from '../../shared/api/types/interfaces';
import SellerProfile from './layout/SellerProfile/SellerProfile';
import SellerProducts from './layout/SellerProducts/SellerProducts';
import SellerOrders from './layout/SellerOrders/SellerOrders';
import { dom, hooks } from '../../shared/lib';
import { sellerEndpoints } from '../../shared/api/seller.endpoints';

const SellerDashboard = () => {
  dom.useTitle('Панель управления');
  const { data: sellerData } = sellerEndpoints.useSellerProfileQuery('');
  const { data: sellerProducts } = sellerEndpoints.useSellerProductsQuery('');
  const { data: sellerOrders } = sellerEndpoints.useSellerOrdersQuery('');

  const [sellerDiscontinuedProducts, sellerOnsaleProducts] = hooks.useDivideBy<
    IProduct,
    IProductKeys
  >(sellerProducts, 'discontinued', true);
  const [sellerCompletedOrders, sellerUncompletedOrders] = hooks.useDivideBy<
    ISellerOrder,
    ISellerOrderKeys
  >(sellerOrders, 'orderStatus', 'COMPLETED');

  return (
    <div className="seller-dashboard">
      <div className="seller-dashboard__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Панель управления</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        size="large"
        className="seller-dashboard__tabs"
        items={[
          {
            label: 'Профиль',
            key: '1',
            children: <SellerProfile data={sellerData} />,
          },
          {
            label: 'Товары',
            key: '2',
            children: (
              <SellerProducts
                viewProducts={sellerOnsaleProducts}
                emptyMessage="Вы еще не разместили товаров."
              />
            ),
          },
          {
            label: 'Удаленные товары',
            key: '3',
            children: (
              <SellerProducts
                viewProducts={sellerDiscontinuedProducts}
                emptyMessage="У вас нет удалённых с продажи товаров"
                isDeleted
              />
            ),
          },
          {
            label: 'Активные заказы',
            key: '4',
            children: (
              <SellerOrders
                orders={sellerUncompletedOrders}
                emptyMessage="Активных заказов нет"
              />
            ),
          },
          {
            label: 'Завершенные заказы',
            key: '5',
            children: (
              <SellerOrders
                orders={sellerCompletedOrders}
                emptyMessage="Завершенных заказов нет"
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default SellerDashboard;
