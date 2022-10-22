/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addToBucket } from '../../bucket/model/bucket';
import type { RootState } from '../../../../app/store';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import categoriesApi from '../../../../shared/api/categories';
import { IProduct } from '../../../../shared/api/types/interfaces';
import './BuyBucketButton.scss';

interface IBuyBucketButton {
  cardData: IProduct;
  cardId: string;
}

const BuyBucketButton: React.FC<IBuyBucketButton> = ({ cardData, cardId }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [isBucketLoading, setIsBucketLoading] = useState<boolean>(false);
  const isSellerLogged = useSelector(
    (state: RootState) => state.sellerAuthReducer.isLoggedIn
  );

  const role = useSelector((state: RootState) => state.roleReducer.role);
  const onBuyClick = () => {
    console.log('buy');
  };
  const onBucketClick = () => {
    console.log(`add to bucket ${params.cardId} - ${cardId}`);
    setIsBucketLoading(true);
    categoriesApi
      .addToBucket(params.categoryId!, cardId)
      .then((res) => {
        console.log(res);
        dispatch(addToBucket(cardData));
        message.success('Товар добавлен в корзину');
      })
      .catch((err) => {
        console.log(err);
        message.error('При добавлении товара произошла ошибка...');
      })
      .finally(() => {
        setIsBucketLoading(false);
      });
  };

  return (
    <div className="buy-bucket-btns">
      <ButtonMelon
        sliced="right"
        size="large"
        onClick={onBuyClick}
        disabled={isSellerLogged || role === 'GHOST'}
      >
        Купить
      </ButtonMelon>
      <ButtonMelon
        loading={isBucketLoading}
        sliced="left"
        size="large"
        onClick={onBucketClick}
        disabled={isSellerLogged || role === 'GHOST'}
      >
        <ShoppingCartOutlined />
      </ButtonMelon>
    </div>
  );
};

export default BuyBucketButton;
