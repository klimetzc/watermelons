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
}

const OrderCard: React.FC<IOrderCard> = ({ data }) => (
  <Link to={`/orders/${data.id}`}>
    <div className="order-card">
      <div className="order-card-time">
        {data.created} - {data.changed}
      </div>
      <p className="order-card__status">{data.status}</p>
      <p className="order-card__sum">{data.sum}</p>
      <p className="order-card__seller-name">
        {data?.sellerName || 'Селлера нет'}
      </p>
    </div>
  </Link>
);

export default OrderCard;
