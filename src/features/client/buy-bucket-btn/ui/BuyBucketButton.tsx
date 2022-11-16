/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { message } from 'antd';
import { ShoppingCartOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { bucketActions } from '../../bucket/model/bucket';
import type { RootState } from '../../../../app/store';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import { IProduct } from '../../../../shared/api/types/interfaces';
import './BuyBucketButton.scss';
import { categoriesEndpoints } from '../../../../shared/api/categories.endpoints';

interface IBuyBucketButton {
  cardData: IProduct;
  cardId: string;
}

const BuyBucketButton: React.FC<IBuyBucketButton> = ({ cardData, cardId }) => {
  const dispatch = useDispatch();
  const [addToBucket, { isLoading: isBucketLoading }] =
    categoriesEndpoints.useAddToBucketMutation();
  const isSellerLogged = useSelector(
    (state: RootState) => state.sellerAuthReducer.isLoggedIn
  );
  const isClientLogged = useSelector(
    (state: RootState) => state.userAuthReducer.isLoggedIn
  );

  const role = useSelector((state: RootState) => state.roleReducer.role);

  const onBuyClick = () => {
    console.log('buy');
    // Предполагается оформление заказа с одним продуктом
  };

  const onBucketClick = async () => {
    try {
      await addToBucket({
        categoryId: `${cardData.idCategory}`,
        productId: cardId,
      }).unwrap();
      dispatch(bucketActions.addToBucket(cardData));
      message.success('Товар добавлен в корзину');
    } catch (error) {
      message.error('При добавлении товара произошла ошибка...');
    }
  };

  return (
    <div className="buy-bucket-btns">
      {isClientLogged && (
        <>
          <ButtonMelon
            sliced="right"
            size="large"
            onClick={onBuyClick}
            disabled={isSellerLogged || role === 'GHOST'}
          >
            <UsergroupAddOutlined />
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
        </>
      )}
    </div>
  );
};

export default BuyBucketButton;
