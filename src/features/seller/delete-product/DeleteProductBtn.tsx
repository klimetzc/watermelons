import { Popconfirm } from 'antd';
import React from 'react';
import sellerApi from '../../../shared/api/seller';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

interface IDeleteProductBtn {
  id: string;
}

const DeleteProductBtn: React.FC<IDeleteProductBtn> = ({ id }) => {
  const onClick = () => {
    sellerApi.deleteProduct(id);
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
