import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import { message } from 'antd';
import './ProductCountController.scss';
import { IProductWithCount } from 'shared/api/types/interfaces';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { bucketActions } from 'features/client/bucket/model/bucket';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import { categoriesEndpoints } from 'shared/api/categories.endpoints';

interface IProps {
  cardData: IProductWithCount;
}

const ProductCountController: React.FC<IProps> = ({ cardData }) => {
  const { count, idCategory, id, price, currency } = cardData;

  const dispatch = useDispatch();
  const [addToBucket, { isLoading: isAddLoading }] =
    categoriesEndpoints.useAddToBucketMutation();
  const [removeFromBucket, { isLoading: isRemoveLoading }] =
    clientEndpoints.useRemoveItemFromBucketMutation();
  const [removeGroupFromBucket, { isLoading: isRemoveGroupLoading }] =
    clientEndpoints.useRemoveGroupItemsFromBucketMutation();

  const addProduct = async () => {
    try {
      await addToBucket({
        categoryId: `${idCategory}`,
        productId: `${id}`,
      }).unwrap();
      dispatch(bucketActions.addToBucket(cardData));
      message.success('Товар добавлен в корзину');
    } catch (error) {
      message.error('При добавлении товара произошла ошибка...');
    }
  };

  const removeProduct = async () => {
    try {
      await removeFromBucket(`${id}`).unwrap();
      dispatch(bucketActions.removeOneFromBucket(cardData));
      message.success('Товар удалён из корзины');
    } catch (error) {
      message.error('При удалении товара произошла ошибка...');
    }
  };

  const removeGroupProducts = async () => {
    try {
      await removeGroupFromBucket(`${id}`).unwrap();
      dispatch(bucketActions.removeGroupFromBucket(id));
      message.success('Товары удалены из корзины');
    } catch (error) {
      message.error('При удалении товара произошла ошибка...');
    }
  };

  const sum = useMemo(() => count * price, [count]);

  return (
    <div className="product-count-controller">
      <div className="product-count-controller__input controller">
        <ButtonMelon
          disabled={isRemoveLoading}
          sliced="right"
          className="controller__button controller__button_remove"
          onClick={removeProduct}
        >
          <MinusOutlined />
        </ButtonMelon>
        <Button type="text" shape="default" className="controller__count">
          {count}
        </Button>
        <ButtonMelon
          disabled={isAddLoading}
          sliced="left"
          className="controller__button controller__button_add"
          onClick={addProduct}
        >
          <PlusOutlined />
        </ButtonMelon>
      </div>
      <ButtonMelon
        className="product-count-controller__delete-all"
        loading={isRemoveGroupLoading}
        onClick={removeGroupProducts}
      >
        Удалить всё <DeleteOutlined />
      </ButtonMelon>
      <span className="product-count-controller__sum">
        На сумму {sum} {currency}
      </span>
    </div>
  );
};

export default ProductCountController;
