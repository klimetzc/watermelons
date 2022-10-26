import React from 'react';
import ProductCard from '../../../entities/product/ui/ProductCard';
import AddProduct from '../../../features/seller/add-product/AddProduct';
import DeleteProductBtn from '../../../features/seller/delete-product/DeleteProductBtn';
import { IProduct } from '../../../shared/api/types/interfaces';
import './SellerProducts.scss';

interface IProps {
  products: IProduct[] | null;
}

const SellerProducts: React.FC<IProps> = ({ products }) => (
  <div className="seller-dashboard__products">
    <h3 className="seller-dashboard__products-title">
      Список товаров: <AddProduct />
    </h3>
    <div className="seller-dashboard__products__list">
      {products?.length ? (
        products.map((item) => (
          <ProductCard
            data={item}
            key={item.id}
            actions={<DeleteProductBtn id={`${item.id}`} />}
          />
        ))
      ) : (
        <p className="seller-dashboard__products-empty">
          Вы еще не разместили товаров.
        </p>
      )}
    </div>
  </div>
);

export default SellerProducts;
