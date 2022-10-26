import React, { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import sellerApi from '../../shared/api/seller';
import './SellerDashboard.scss';
import {
  IProduct,
  ISellerOrder,
  Seller,
} from '../../shared/api/types/interfaces';
import SellerProfile from './SellerProfile/SellerProfile';
import SellerProducts from './SellerProducts/SellerProducts';
import SellerOrders from './SellerOrders/SellerOrders';

const SellerDashboard = () => {
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
                setProducts={setSellerProducts}
              />
            ),
          },
          {
            label: 'Удаленные товары',
            key: '3',
            children: 'Тут ваши  удаленные товары',
          },
          {
            label: 'Активные заказы',
            key: '4',
            children: <SellerOrders orders={sellerOrders} />,
          },
          {
            label: 'Завершенные заказы',
            key: '5',
            children: 'Тут ваши завершенные заказы',
          },
        ]}
      />
    </div>
  );
};

export default SellerDashboard;
