import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from 'entities/product';
import { Bucket } from 'features/client/bucket';
import { IProductWithCount } from 'shared/api/types/interfaces';
import '../../BucketPage.scss';

interface IProps {
  products: IProductWithCount[];
}

const BucketPageProducts: React.FC<IProps> = ({ products }) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <>
    {products?.length ? (
      products.map((item) => (
        <Product.Card
          data={item}
          key={item.id}
          actions={<Bucket.CountController cardData={item} />}
        />
      ))
    ) : (
      <div>
        Упс! Похоже, ваша корзина пустует...{' '}
        <Link to="/categories">Пора это исправить!</Link>{' '}
      </div>
    )}
  </>
);

export default BucketPageProducts;
