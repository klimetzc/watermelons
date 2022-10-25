import { Popconfirm } from 'antd';
import React from 'react';
import { IProduct } from '../../../../shared/api/types/interfaces';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import './BucketPageSum.scss';

interface IProps {
  bucketProducts: [] | IProduct[];
  bucketSum: number;
  orderCreate: () => void;
  isOrderCreating: boolean;
}

const BucketPageSummary: React.FC<IProps> = ({
  bucketProducts,
  bucketSum,
  orderCreate,
  isOrderCreating,
}) => (
  <div className="bucket-page__summary">
    {bucketProducts?.length ? (
      <>
        <p className="bucket-page__bucket-quantity">
          Товаров: {bucketProducts.length} шт.
        </p>
        <p className="bucket-page__bucket-summary">
          Сумма заказа: {bucketSum} $
        </p>
        <Popconfirm
          title="Перейти к оформлению заказа?"
          onConfirm={orderCreate}
          okButtonProps={{ loading: isOrderCreating }}
        >
          <ButtonMelon type="primary" size="large">
            Перейти к оформлению
          </ButtonMelon>
        </Popconfirm>
      </>
    ) : (
      'Вы еще не выбрали товары'
    )}
  </div>
);

export default BucketPageSummary;
