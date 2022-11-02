import React, { useContext } from 'react';
import { List } from 'antd';
import { IOrderProduct } from 'shared/api/types/interfaces';
import { OrderPageContext } from '../../OrderPage';

const OrderPageProducts = () => {
  const pageContext = useContext(OrderPageContext);
  return (
    <div className="order-page__products-list">
      <List>
        {pageContext.data?.orderItemDtoList.map((item: IOrderProduct) => (
          <List.Item key={item.productId}>
            <div className="order-page__product-card">
              <div className="order-page__product-card-img" />
              <p>{item.productTitle}</p>
              <p>{item.amount} шт.</p>
              <p>{item.price}$</p>
            </div>
          </List.Item>
        ))}
        {pageContext.data?.orderItemDtoList.map((item: IOrderProduct) => (
          <List.Item key={item.productId}>
            <div className="order-page__product-card">
              <div className="order-page__product-card-img" />
              <p>{item.productTitle}</p>
              <p>{item.amount} шт.</p>
              <p>{item.price}$</p>
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default OrderPageProducts;
