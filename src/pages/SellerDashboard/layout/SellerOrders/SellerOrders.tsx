import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ISellerOrder } from 'shared/api/types/interfaces';
import './SellerOrders.scss';

interface IProps {
  orders: ISellerOrder[] | null;
  emptyMessage: string;
}

const SellerOrders: React.FC<IProps> = ({ orders, emptyMessage }) => {
  const { t } = useTranslation();

  return (
    <div className="seller-dashboard__orders">
      <h3 className="seller-dashboard__orders-title">{t('Active orders')}:</h3>
      {orders?.length ? (
        orders.map((item) => (
          <Link
            to={`/dashboard/orders/${item.id}`}
            className="seller-dashboard__order-card"
            key={item.id}
          >
            <p>{item.id}</p>
            <p>{item.orderStatus}</p>
            <p>{item.clientName}</p>
          </Link>
        ))
      ) : (
        <p className="seller-dashboard__orders-empty">{emptyMessage}</p>
      )}
    </div>
  );
};
export default SellerOrders;
