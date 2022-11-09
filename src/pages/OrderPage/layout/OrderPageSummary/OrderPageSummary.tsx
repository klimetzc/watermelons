import React, { useContext } from 'react';
import { List } from 'antd';
import { useTranslation } from 'react-i18next';
import { ISellerOrderProducts } from 'shared/api/types/interfaces';
import moment from 'moment';
import { OrderPageContext } from '../../OrderPage';

const OrderPageSummary = () => {
  const { t } = useTranslation();
  const pageContext = useContext(OrderPageContext);
  return (
    <div className="order-page__summary">
      <List>
        <List.Item extra={pageContext.data?.id || 'ID не обнаружен'}>
          <p className="order-page__summary-paragraph">ID:</p>
        </List.Item>
        <List.Item
          extra={
            pageContext.data?.created
              ? `${moment(new Date(pageContext.data?.created)).format(
                  'YYYY-MM-DD - hh:mm:ss'
                )}`
              : 'not timestamp'
          }
        >
          <p className="order-page__summary-paragraph">{t('Order created')}</p>
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
            {pageContext.isForClient ? t('Seller') : t('Customer')}
          </p>
        </List.Item>
      </List>

      <p className="order-page__summary-price">
        {t('Total')}:{' '}
        {pageContext.isForClient
          ? pageContext.data?.sum || 0
          : pageContext.data?.sum || 0}{' '}
        $
      </p>
    </div>
  );
};

export default OrderPageSummary;
