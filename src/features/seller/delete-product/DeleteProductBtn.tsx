import { message, Popconfirm } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { sellerEndpoints } from '../../../shared/api/seller.endpoints';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

interface IDeleteProductBtn {
  id: string;
  isDeleted: boolean;
}

const DeleteProductBtn: React.FC<IDeleteProductBtn> = ({ id, isDeleted }) => {
  const { t } = useTranslation();
  const [deleteProduct, { isLoading: isDeleteButtonLoading }] =
    sellerEndpoints.useSellerDeleteProductMutation();

  const onDelete = async () => {
    try {
      await deleteProduct(id).unwrap();
    } catch (error) {
      message.error(t('Error'));
    }
  };

  return (
    <Popconfirm
      title="Вы действительно хотите удалить товар?"
      onConfirm={onDelete}
    >
      <ButtonMelon loading={isDeleteButtonLoading} disabled={isDeleted}>
        {isDeleted ? t('Product deleted') : t('Delete')}
      </ButtonMelon>
    </Popconfirm>
  );
};

export default DeleteProductBtn;
