import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import sellerApi from '../../shared/api/seller';
import './SellerDashboard.scss';
import {
  IProduct,
  IProductKeys,
  ISellerOrder,
  ISellerOrderKeys,
  Seller,
} from '../../shared/api/types/interfaces';
import SellerProfile from './layout/SellerProfile/SellerProfile';
import SellerProducts from './layout/SellerProducts/SellerProducts';
import SellerOrders from './layout/SellerOrders/SellerOrders';
import { dom, hooks } from '../../shared/lib';

const SellerDashboard = () => {
  dom.useTitle('Панель управления');
  const [sellerData, setSellerData] = useState<Seller | null>(null);
  const [sellerProducts, setSellerProducts] = useState<IProduct[] | null>(null);
  const [sellerOrders, setSellerOrders] = useState<ISellerOrder[] | null>(null);

  useEffect(() => {
    sellerApi
      .getProfile()
      .then((data: Seller) => {
        setSellerData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    sellerApi
      .getProducts()
      .then((data: IProduct[] | null) => {
        setSellerProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });

    sellerApi
      .getOrders()
      .then((data) => {
        setSellerOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
                products={sellerProducts}
                viewProducts={sellerOnsaleProducts}
                setProducts={setSellerProducts}
                emptyMessage="Вы еще не разместили товаров."
              />
            ),
          },
          {
            label: 'Удаленные товары',
            key: '3',
            children: (
              <SellerProducts
                products={sellerProducts}
                viewProducts={sellerDiscontinuedProducts}
                setProducts={setSellerProducts}
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
