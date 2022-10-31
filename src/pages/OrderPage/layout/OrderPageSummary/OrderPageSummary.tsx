import React, { useContext } from 'react';
import { List } from 'antd';
import { OrderPageContext } from '../../OrderPage';
import { ISellerOrderProducts } from '../../../../shared/api/types/interfaces';

const OrderPageSummary = () => {
  const pageContext = useContext(OrderPageContext);
  return (
    <div className="order-page__summary">
      <List>
        <List.Item extra={pageContext.data?.id || 'ID не обнаружен'}>
          <p className="order-page__summary-paragraph">Идентификатор заказа:</p>
        </List.Item>
        <List.Item
          extra={
            pageContext.isForClient
              ? `${new Date(pageContext.data?.created!).getFullYear()}-${
                  new Date(pageContext.data?.created!).getMonth() + 1
                }-${new Date(pageContext.data?.created!).getDate()} ${new Date(
                  pageContext.data?.created!
                ).getHours()}:${new Date(
                  pageContext.data?.created!
                ).getMinutes()}:${new Date(
                  pageContext.data?.created!
                ).getSeconds()}`
              : `${new Date(pageContext.data?.created!).getFullYear()}-${
                  new Date(pageContext.data?.created!).getMonth() + 1
                }-${new Date(pageContext.data?.created!).getDate()} ${new Date(
                  pageContext.data?.created!
                ).getHours()}:${new Date(
                  pageContext.data?.created!
                ).getMinutes()}:${new Date(
                  pageContext.data?.created!
                ).getSeconds()}`
          }
        >
          <p className="order-page__summary-paragraph">Создан</p>
        </List.Item>
        <List.Item
          extra={
            pageContext.isForClient
              ? pageContext.data?.sellerName || 'Без имени'
              : (pageContext.data as ISellerOrderProducts)?.clientName ||
                'Без имени'
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
          ? pageContext.data?.sum || 0
          : pageContext.data?.sum || 0}{' '}
        $
      </p>
    </div>
  );
};

export default OrderPageSummary;
