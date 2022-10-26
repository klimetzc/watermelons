import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { IOrderProducts } from '../../shared/api/types/interfaces';
import './OrderPay.scss';

interface IProps {
  order: IOrderProducts;
}

interface DataType {
  productId: React.Key;
  productTitle: string;
  amount: number;
  price: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Наименование товара',
    dataIndex: 'productTitle',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.productTitle.localeCompare(b.productTitle),
  },
  {
    title: 'Количество',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Цена в $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
];

const onChange: TableProps<DataType>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const OrderPay: React.FC<IProps> = ({ order }) => {
  const { id, status, sum: price, orderItemDtoList: products } = order;
  const statusRu = status === 'CREATED' ? 'cформирован' : status;
  return (
    <div className="order-pop-up">
      <h2>
        Заказ №{id} <span>Cтатус: {statusRu}</span>
      </h2>
      <Table
        columns={columns}
        dataSource={products}
        onChange={onChange}
        size="small"
        pagination={false}
        footer={() => `Итого: ${price} $`}
      />
    </div>
  );
};
export default OrderPay;
