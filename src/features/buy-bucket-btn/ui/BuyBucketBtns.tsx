import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

interface IBuyBucketBtns {
  isSellerLogged: boolean;
  role: string;
  onBuyClick: () => void;
  onBucketClick: () => void;
}

const BuyBucketBtns: React.FC<IBuyBucketBtns> = ({
  isSellerLogged,
  role,
  onBuyClick,
  onBucketClick,
}) => (
  <>
    <ButtonMelon
      sliced="right"
      size="large"
      onClick={onBuyClick}
      disabled={isSellerLogged || role === 'GHOST'}
    >
      Купить
    </ButtonMelon>
    <ButtonMelon
      sliced="left"
      size="large"
      onClick={onBucketClick}
      disabled={isSellerLogged || role === 'GHOST'}
    >
      <ShoppingCartOutlined />
    </ButtonMelon>
  </>
);

export default BuyBucketBtns;
