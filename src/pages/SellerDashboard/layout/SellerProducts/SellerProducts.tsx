import React from 'react';
import { Product } from 'entities/product';
import AddProduct from 'features/seller/add-product/AddProduct';
import DeleteProductBtn from 'features/seller/delete-product/DeleteProductBtn';
import { IProduct } from 'shared/api/types/interfaces';
import './SellerProducts.scss';
import { useTranslation } from 'react-i18next';

interface IProps {
  viewProducts: IProduct[] | null | undefined;
  emptyMessage: string;
  isDeleted?: boolean;
}

const SellerProducts: React.FC<IProps> = ({
  viewProducts,
  emptyMessage,
  isDeleted,
}) => {
  const { t } = useTranslation();

  return (
    <div className="seller-dashboard__products">
      <h3 className="seller-dashboard__products-title">
        {t('Products')}: {isDeleted ? null : <AddProduct />}
      </h3>
      <div className="seller-dashboard__products-list">
        {viewProducts?.length ? (
          viewProducts.map((item) => (
            <Product.Card
              data={item}
              key={item.id}
              isCollabsVisble={!!item.preorder}
              actions={
                <DeleteProductBtn id={`${item.id}`} isDeleted={!!isDeleted} />
              }
            />
          ))
        ) : (
          <p className="seller-dashboard__products-empty">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;
