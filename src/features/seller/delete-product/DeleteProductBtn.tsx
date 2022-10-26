import { Popconfirm } from 'antd';
import React, { useState } from 'react';

import sellerApi from '../../../shared/api/seller';
import { IProduct } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

interface IDeleteProductBtn {
  id: string;
  products: IProduct[] | null;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
  isDeleted: boolean;
}

const DeleteProductBtn: React.FC<IDeleteProductBtn> = ({
  id,
  products,
  setProducts,
  isDeleted,
}) => {
  const [isDeleteButtonLoading, setIsDeleteButtonLoading] =
    useState<boolean>(false);

  const deleteProduct = () => {
    setIsDeleteButtonLoading(true);
    sellerApi
      .deleteProduct(id)
      .then(() => {
        const productsArray = products ? [...products] : [];
        productsArray.forEach((item: IProduct) => {
          if (`${id}` === `${item.id}`) item.discontinued = true;
        });
        console.log(productsArray);

        setProducts(productsArray);
      })
      .finally(() => {
        setIsDeleteButtonLoading(false);
      });
  };

  return (
    <Popconfirm
      title="Вы действительно хотите удалить товар?"
      onConfirm={deleteProduct}
    >
      <ButtonMelon loading={isDeleteButtonLoading} disabled={isDeleted}>
        {isDeleted ? 'Товар удалён' : 'Удалить'}
      </ButtonMelon>
    </Popconfirm>
  );
};

export default DeleteProductBtn;
