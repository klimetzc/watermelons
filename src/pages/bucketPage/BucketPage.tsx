import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../app/store';
import ProductCard from '../../entities/product/ui/ProductCard';
import { IOrderProducts, IProduct } from '../../shared/api/types/interfaces';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import './BucketPage.scss';
import ProductCountController from '../../features/client/bucket-count-controls/ui/ProductCountController';
import ClearBucketBtn from '../../features/client/clearBucket/ui/ClearBucketBtn';
import clientApi from '../../shared/api/client';
import useCollapse from './hooks/useCollapse';
import useOrder from './hooks/useOrder';
import { clearBucket } from '../../features/client/bucket/model/bucket';
import OrderPay from '../orderPay/OrderPay';

const getSumOfProductArray = (productsArray: IProduct[]) =>
  productsArray.reduce((acc: number, item: IProduct) => {
    const currentSum = acc + item.price;
    return currentSum;
  }, 0);

const BucketPage = () => {
  const dispatch = useDispatch();
  const bucketProducts = useSelector(
    (state: RootState) => state.bucketReducer.bucket
  );

  const collapsedProducts = useCollapse(bucketProducts);
  const orderData = useOrder(collapsedProducts);
  const [orderProducts, setOrderProducts] = useState<IOrderProducts | null>(
    null
  );

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

  const [isOrderCreating, setIsOrderCreating] = useState<boolean>(false);
  const orderCreate = () => {
    setIsOrderCreating(true);
    clientApi
      .postOrder(orderData)
      .then((responce) => {
        dispatch(clearBucket());
        setOrderProducts(responce);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsOrderCreating(false));
  };

  return (
    <div className="bucket-page">
      {!!orderProducts && (
        <div className="bucket-page__pop-up">
          <OrderPay order={orderProducts} />
        </div>
      )}
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
        <div className="bucket-page__side">
          <div className="bucket-page__summary">
            {bucketProducts?.length ? (
              <>
                <p className="bucket-page__bucket-quantity">
                  Товаров: {bucketProducts.length} шт.
                </p>
                <p className="bucket-page__bucket-summary">
                  Сумма заказа: {bucketSum} $
                </p>
                <ButtonMelon
                  type="primary"
                  size="large"
                  onClick={orderCreate}
                  disabled={isOrderCreating}
                >
                  Перейти к оформлению
                </ButtonMelon>
              </>
            ) : (
              'Вы еще не выбрали товары'
            )}
          </div>
          {bucketProducts?.length ? <ClearBucketBtn /> : ''}
        </div>
      </main>
    </div>
  );
};

export default BucketPage;
