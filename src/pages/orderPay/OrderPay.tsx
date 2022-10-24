import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { IOrderProducts } from '../../shared/api/types/interfaces';
import './OrderPay.scss';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';

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
    title: 'Товар',
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
    title: 'Цена',
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

// const App: React.FC = () => (
// 	<Table columns={columns} dataSource={data} onChange={onChange} />
// );

const OrderPay: React.FC<IProps> = ({ order }) => {
  const { id, status, sum: price, orderItemDtoList: products } = order;
  return (
    <div className="order-pop-up">
      <h2>
        Заказ №{id} <span>статус: {status}</span>
      </h2>
      <Table columns={columns} dataSource={products} onChange={onChange} />
      <div className="order-pop-up__confirm">
        <span>Итого: {price} $</span>
        <ButtonMelon>Подтвердить</ButtonMelon>
      </div>
    </div>
  );
};
export default OrderPay;
