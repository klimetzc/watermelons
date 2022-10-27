import React from 'react';
import ProductCard from '../../../entities/product/ui/ProductCard';
import AddProduct from '../../../features/seller/add-product/AddProduct';
import DeleteProductBtn from '../../../features/seller/delete-product/DeleteProductBtn';
import { IProduct } from '../../../shared/api/types/interfaces';
import './SellerProducts.scss';

interface IProps {
  products: IProduct[] | null;
  viewProducts: IProduct[] | null;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[] | null>>;
  emptyMessage: string;
  isDeleted?: boolean;
}

const SellerProducts: React.FC<IProps> = ({
  products,
  viewProducts,
  setProducts,
  emptyMessage,
  isDeleted,
}) => (
  <div className="seller-dashboard__products">
    <h3 className="seller-dashboard__products-title">
      Список товаров:{' '}
      <AddProduct products={products} setProducts={setProducts} />
    </h3>
    <div className="seller-dashboard__products-list">
      {viewProducts?.length ? (
        viewProducts.map((item) => (
          <ProductCard
            data={item}
            key={item.id}
            actions={
              <DeleteProductBtn
                id={`${item.id}`}
                products={products}
                setProducts={setProducts}
                isDeleted={!!isDeleted}
              />
            }
          />
        ))
      ) : (
        <p className="seller-dashboard__products-empty">{emptyMessage}</p>
      )}
    </div>
  </div>
);

export default SellerProducts;
