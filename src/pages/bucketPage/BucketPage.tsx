import { DeleteOutlined, HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import ProductCard from '../../entities/product/ui/ProductCard';
import { IProduct } from '../../shared/api/types/interfaces';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import './BucketPage.scss';

const getSumOfProductArray = (productsArray: IProduct[]) =>
  productsArray.reduce((acc: number, item: IProduct) => {
    const currentSum = acc + item.price;
    return currentSum;
  }, 0);

const BucketPage = () => {
  const bucketProducts = useSelector(
    (state: RootState) => state.bucketReducer.bucket
  );
  const [bucketSum] = useState<number>(() => {
    if (bucketProducts?.length) {
      const copiedArray: IProduct[] = [...bucketProducts];
      console.log('copied:', copiedArray);
      return getSumOfProductArray(copiedArray);
    }
    return 0;
  });

  useEffect(() => {
    document.title = 'Корзина';
  }, []);

  return (
    <div className="bucket-page">
      <nav className="bucket-page__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/welcome">
              <HomeOutlined />
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Корзина</Breadcrumb.Item>
        </Breadcrumb>
      </nav>
      <main className="bucket-page__layout">
        <div className="bucket-page__products">
          {bucketProducts?.length ? (
            bucketProducts.map((item) => (
              <ProductCard
                data={item}
                key={item.id}
                actions={
                  <ButtonMelon>
                    Удалить из корзины <DeleteOutlined />
                  </ButtonMelon>
                }
              />
            ))
          ) : (
            <div>
              Упс! Похоже, ваша корзина пустует...{' '}
              <Link to="/categories">Пора это исправить!</Link>{' '}
            </div>
          )}
        </div>
        <div className="bucket-page__summary">
          {bucketProducts?.length ? (
            <>
              <p className="bucket-page__bucket-quantity">
                Товаров: {bucketProducts.length} шт.
              </p>
              <p className="bucket-page__bucket-summary">
                Сумма заказа: {bucketSum} $
              </p>
            </>
          ) : (
            'Вы еще не выбрали товары'
          )}
          <ButtonMelon type="primary" size="large">
            Перейти к оформлению
          </ButtonMelon>
        </div>
      </main>
    </div>
  );
};

export default BucketPage;
