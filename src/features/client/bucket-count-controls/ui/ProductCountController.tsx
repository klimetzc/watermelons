import React, { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Button from 'antd/es/button';
import { message } from 'antd';
import './ProductCountController.scss';
import { IProductWithCount } from '../../../../shared/api/types/interfaces';
import categoriesApi from '../../../../shared/api/categories';
import { bucketActions } from '../../bucket/model/bucket';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import clientApi from '../../../../shared/api/client';

interface IProps {
  cardData: IProductWithCount;
}

const ProductCountController: React.FC<IProps> = ({ cardData }) => {
  const { count, idCategory, id, price, currency } = cardData;

  const dispatch = useDispatch();
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [isRemoveLoading, setIsRemoveLoading] = useState<boolean>(false);
  const [isRemoveGroupLoading, setIsRemoveGroupLoading] =
    useState<boolean>(false);

  const addProduct = () => {
    setIsAddLoading(true);
    categoriesApi
      .addToBucket(`${idCategory}`, `${id}`)
      .then(() => {
        dispatch(bucketActions.addToBucket(cardData));
        message.success('Товар добавлен в корзину');
      })
      .catch(() => {
        message.error('При добавлении товара произошла ошибка...');
      })
      .finally(() => {
        setIsAddLoading(false);
      });
  };

  const removeProduct = () => {
    setIsRemoveLoading(true);
    clientApi
      .removeItemFromBucket(`${id}`)
      .then(() => {
        dispatch(bucketActions.removeOneFromBucket(cardData));
        message.success('Товар удалён из корзины');
      })
      .catch(() => {
        message.error('При удалении товара произошла ошибка...');
      })
      .finally(() => {
        setIsRemoveLoading(false);
      });
  };

  const removeGroupProducts = () => {
    setIsRemoveGroupLoading(true);
    clientApi
      .removeGroupItemsFromBucket(`${id}`)
      .then(() => {
        dispatch(bucketActions.removeGroupFromBucket(id));
        message.success('Товары удалены из корзины');
      })
      .catch(() => {
        message.error('При удалении товара произошла ошибка...');
      })
      .finally(() => {
        setIsRemoveGroupLoading(false);
      });
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
