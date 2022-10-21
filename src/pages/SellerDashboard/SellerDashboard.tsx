import React, { useEffect, useState } from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Breadcrumb, Descriptions, Rate, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import sellerApi from '../../shared/api/seller';
import './SellerDashboard.scss';
import {
  IProduct,
  ISellerOrder,
  Seller,
} from '../../shared/api/types/interfaces';
import ProductCard from '../../entities/product/ui/ProductCard';
import AddProduct from '../../features/add-product/AddProduct';
import DeleteProductBtn from '../../features/delete-product/DeleteProductBtn';
import EditSellerButton from '../../features/edit-seller/EditSellerButton';

const SellerDashboard = () => {
  const [sellerData, setSellerData] = useState<Seller | null>(null);
  const [sellerProducts, setSellerProducts] = useState<IProduct[] | null>(null);
  const [sellerOrders, setSellerOrders] = useState<ISellerOrder[] | null>(null);

  useEffect(() => {
    sellerApi
      .getProfile()
      .then((data: Seller) => {
        console.log(data);
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
      <nav className="seller-dashboard__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Панель управления</Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      <Descriptions
        className="seller-dashboard__description"
        title={`Профиль продавца ${sellerData?.name || ''}`}
        bordered
        column={2}
        extra={
          <div className="seller-dashboard__extra">
            <Tooltip title="Баланс (удержано)">
              <p className="seller-dashboard__extra-money">
                {sellerData?.balance || 0}$
                <span className="seller-dashboard__charge">
                  ({sellerData?.holdBalance || 0}$)
                </span>
              </p>
            </Tooltip>
            <EditSellerButton />
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
        }
      >
        <Descriptions.Item label="ID">
          {sellerData?.id || '001'}
        </Descriptions.Item>
        <Descriptions.Item label="Имя">
          {sellerData?.name || 'Имя не установлено'}
        </Descriptions.Item>
        <Descriptions.Item label="Страна">
          {sellerData?.country || 'Страна не установлена'}
        </Descriptions.Item>
        <Descriptions.Item label="E-mail">...</Descriptions.Item>
        <Descriptions.Item label="Рейтинг">
          <Rate
            value={sellerData?.rating !== null ? sellerData?.rating : 4.7}
            allowHalf
            disabled
          />{' '}
          {sellerData?.rating !== null ? sellerData?.rating : 4.7}
        </Descriptions.Item>
        <Descriptions.Item label="Успешных заказов:">
          {sellerData?.completedOrders || 0}
        </Descriptions.Item>
        <Descriptions.Item label="Комиссия на продажи">
          {sellerData?.charge || 0}%
        </Descriptions.Item>
        <Descriptions.Item label="Валюта">
          {sellerData?.currency || 'USD'}
        </Descriptions.Item>
      </Descriptions>

      <div className="seller-dashboard__products">
        <h3 className="seller-dashboard__products-title">
          Список товаров: <AddProduct />
        </h3>
        {sellerProducts?.length ? (
          sellerProducts.map((item) => (
            <ProductCard
              data={item}
              key={item.id}
              actions={<DeleteProductBtn id={`${item.id}`} />}
            />
          ))
        ) : (
          <p className="seller-dashboard__products-empty">
            Вы еще не разместили товаров.
          </p>
        )}
      </div>

      <div className="seller-dashboard__orders">
        <h3 className="seller-dashboard__products-title">
          Список ваших активных заказов:
        </h3>
        {sellerOrders?.length ? (
          sellerOrders.map((item) => <div key={item.id}>{item.toString()}</div>)
        ) : (
          <p className="seller-dashboard__orders-empty">
            Ваши товары еще пока не заказали
          </p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
