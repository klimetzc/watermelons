import { Popconfirm } from 'antd';
import React from 'react';
import sellerApi from '../../../shared/api/seller';
import { IProduct } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

interface IDeleteProductBtn {
  id: string;
  products: IProduct[] | null;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
}

const DeleteProductBtn: React.FC<IDeleteProductBtn> = ({
  id,
  products,
  setProducts,
}) => {
  const onClick = () => {
    sellerApi.deleteProduct(id);
    const productsArray = products ? [...products] : [];
    productsArray.filter((item: IProduct) => `${id}` !== `${item.id}`);
    setProducts(productsArray);
  };

  return (
    <Popconfirm
      title="Вы действительно хотите удалить товар?"
      onConfirm={onClick}
    >
      <ButtonMelon>Удалить</ButtonMelon>
    </Popconfirm>
  );
};

export default DeleteProductBtn;
