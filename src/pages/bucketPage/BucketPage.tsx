import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import ProductCard from '../../entities/product/ui/ProductCard';
import { IProduct } from '../../shared/api/types/interfaces';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import './BucketPage.scss';
import useCollapse from './useCollapse';
import ProductCountController from '../../features/client/bucket-count-controls/ui/ProductCountController';

const getSumOfProductArray = (productsArray: IProduct[]) =>
  productsArray.reduce((acc: number, item: IProduct) => {
    const currentSum = acc + item.price;
    return currentSum;
  }, 0);

const BucketPage = () => {
  const bucketProducts = useSelector(
    (state: RootState) => state.bucketReducer.bucket
  );

  const collapsedProducts = useCollapse(bucketProducts);

  const bucketSum = useMemo(() => {
    if (bucketProducts?.length) {
      const copiedArray: IProduct[] = [...bucketProducts];
      return getSumOfProductArray(copiedArray);
    }
    return 0;
  }, [bucketProducts]);

  useEffect(() => {
    document.title = 'Корзина';
  }, []);

  return (
    <div className="bucket-page">
      <div className="bucket-page__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Корзина</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <main className="bucket-page__layout">
        <section className="bucket-page__products">
          {collapsedProducts?.length ? (
            collapsedProducts.map((item) => (
              <ProductCard
                data={item}
                key={item.id}
                actions={<ProductCountController cardData={item} />}
              />
            ))
          ) : (
            <div>
              Упс! Похоже, ваша корзина пустует...{' '}
              <Link to="/categories">Пора это исправить!</Link>{' '}
            </div>
          )}
        </section>
        <div className="bucket-page__summary">
          {bucketProducts?.length ? (
            <>
              <p className="bucket-page__bucket-quantity">
                Товаров: {bucketProducts.length} шт.
              </p>
              <p className="bucket-page__bucket-summary">
                Сумма заказа: {bucketSum} $
              </p>
              <ButtonMelon type="primary" size="large">
                Перейти к оформлению
              </ButtonMelon>
            </>
          ) : (
            'Вы еще не выбрали товары'
          )}
        </div>
      </main>
    </div>
  );
};

export default BucketPage;
