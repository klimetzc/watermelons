import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Modal } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { IOrderProducts, IProduct } from '../../../shared/api/types/interfaces';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import './BucketPage.scss';
import ClearBucketBtn from '../../../features/client/clearBucket/ui/ClearBucketBtn';
import clientApi from '../../../shared/api/client';
import useCollapse from '../hooks/useCollapse';
import useOrder from '../hooks/useOrder';
import { clearBucket } from '../../../features/client/bucket/model/bucket';
import OrderPay from '../../orderPay/OrderPay';
import BucketPageSummary from './BucketPageSummary/BucketPageSum';
import BucketPageProducts from './BucketPageProducts/BucketPageProducts';

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
  const [isOrderCreated, setIsOrderCreated] = useState<boolean>(false);
  const orderCreate = () => {
    setIsOrderCreating(true);
    clientApi
      .postOrder(orderData)
      .then((responce) => {
        dispatch(clearBucket());
        setOrderProducts(responce);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsOrderCreating(false);
        setIsOrderCreated(true);
      });
  };

  return (
    <div className="bucket-page">
      <Modal
        open={isOrderCreated}
        onCancel={() => setIsOrderCreated(false)}
        footer={
          <Link to={`../profile/orders/${orderProducts?.id}`}>
            <ButtonMelon>Перейти на страницу оплаты</ButtonMelon>
          </Link>
        }
      >
        {!!orderProducts && <OrderPay order={orderProducts} />}
      </Modal>
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
          <BucketPageProducts products={collapsedProducts} />
        </section>
        <div className="bucket-page__side">
          <BucketPageSummary
            bucketProducts={bucketProducts}
            bucketSum={bucketSum}
            orderCreate={orderCreate}
            isOrderCreating={isOrderCreating}
          />
          {bucketProducts?.length ? <ClearBucketBtn /> : ''}
        </div>
      </main>
    </div>
  );
};

export default BucketPage;
