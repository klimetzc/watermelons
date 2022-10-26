import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderCard.scss';

interface OrderData {
  id: number;
  created: string;
  changed: string;
  status: string;
  sum: number;
  sellerName: string;
}

interface IOrderCard {
  data: OrderData;
  rootLink: 'dashboard' | 'profile';
}

const OrderCard: React.FC<IOrderCard> = ({ data, rootLink }) => (
  <Link to={`/${rootLink}/orders/${data.id}`}>
    <div
      className={classNames(
        'order-card',
        data.status === 'COMPLETED' ? 'order-card-completed' : false
      )}
    >
      <p className="order-card__id">{data.id}</p>
      <div className="order-card__time">{data.created}</div>
      <p className="order-card__status">{data.status}</p>
      <p className="order-card__sum">{data.sum} $</p>
      <p className="order-card__seller-name">{data?.sellerName || '-'}</p>
    </div>
  </Link>
);

export default OrderCard;
