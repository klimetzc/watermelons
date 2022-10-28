import React, { useContext } from 'react';
import { List } from 'antd';
import { OrderPageContext } from '../../OrderPage';

const OrderPageSummary = () => {
  const pageContext = useContext(OrderPageContext);
  return (
    <div className="order-page__summary">
      <List>
        <List.Item
          extra={
            pageContext.orderData?.id ||
            pageContext.sellerOrderData?.id ||
            'ID не обнаружен'
          }
        >
          <p className="order-page__summary-paragraph">Идентификатор заказа:</p>
        </List.Item>
        <List.Item
          extra={
            pageContext.isForClient
              ? `${new Date(pageContext.orderData?.created!).getFullYear()}-${
                  new Date(pageContext.orderData?.created!).getMonth() + 1
                }-${new Date(
                  pageContext.orderData?.created!
                ).getDate()} ${new Date(
                  pageContext.orderData?.created!
                ).getHours()}:${new Date(
                  pageContext.orderData?.created!
                ).getMinutes()}:${new Date(
                  pageContext.orderData?.created!
                ).getSeconds()}`
              : `${new Date(
                  pageContext.sellerOrderData?.created!
                ).getFullYear()}-${
                  new Date(pageContext.sellerOrderData?.created!).getMonth() + 1
                }-${new Date(
                  pageContext.sellerOrderData?.created!
                ).getDate()} ${new Date(
                  pageContext.sellerOrderData?.created!
                ).getHours()}:${new Date(
                  pageContext.sellerOrderData?.created!
                ).getMinutes()}:${new Date(
                  pageContext.sellerOrderData?.created!
                ).getSeconds()}`
          }
        >
          <p className="order-page__summary-paragraph">Создан</p>
        </List.Item>
        <List.Item
          extra={
            pageContext.isForClient
              ? pageContext.orderData?.sellerName || 'Без имени'
              : pageContext.sellerOrderData?.clientName || 'Без имени'
          }
        >
          <p className="order-page__summary-paragraph">
            {pageContext.isForClient ? 'Продавец' : 'Покупатель'}
          </p>
        </List.Item>
      </List>

      <p className="order-page__summary-price">
        Сумма заказа:{' '}
        {pageContext.isForClient
          ? pageContext.orderData?.sum || 0
          : pageContext.sellerOrderData?.sum || 0}{' '}
        $
      </p>
    </div>
  );
};

export default OrderPageSummary;
