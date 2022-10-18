import React from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import type { RootState } from '../../../app/store';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

interface IBuyBucketButton {
  cardId?: string | number;
}

const BuyBucketButton: React.FC<IBuyBucketButton> = ({ cardId }) => {
  // const dispatch = useDispatch();
  const params = useParams();
  const isSellerLogged = useSelector(
    (state: RootState) => state.sellerAuthReducer.isLoggedIn
  );
  // const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const onBuyClick = () => {
    console.log('buy');
  };
  const onBucketClick = () => {
    console.log(`add to bucket ${params.cardId} - ${cardId}`);
  };

  return (
    <>
      <ButtonMelon
        sliced="right"
        size="large"
        onClick={onBuyClick}
        disabled={isSellerLogged}
      >
        Купить
      </ButtonMelon>
      <ButtonMelon
        sliced="left"
        size="large"
        onClick={onBucketClick}
        disabled={isSellerLogged}
      >
        <ShoppingCartOutlined />
      </ButtonMelon>
    </>
  );
};

export default BuyBucketButton;
