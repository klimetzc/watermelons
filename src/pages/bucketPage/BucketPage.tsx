import React, { useMemo } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, message, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { RootState } from 'app/store';
import { IProduct } from 'shared/api/types/interfaces';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import './BucketPage.scss';
import { Bucket } from 'features/client/bucket';
import { bucketActions } from 'features/client/bucket/model/bucket';
import OrderPay from 'features/client/orderPay/OrderPay';
import { dom } from 'shared/lib';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { motion } from 'framer-motion';
import { pageAnimationVariants } from 'shared/constants/pageAnimationVariants';
import useCollapse from './hooks/useCollapse';
import useOrder from './hooks/useOrder';
import BucketPageSummary from './layout/BucketPageSummary/BucketPageSum';
import BucketPageProducts from './layout/BucketPageProducts/BucketPageProducts';

const getSumOfProductArray = (productsArray: IProduct[]) =>
  productsArray.reduce((acc: number, item: IProduct) => {
    const currentSum = acc + item.price;
    return currentSum;
  }, 0);

const BucketPage = () => {
  dom.useTitle('Корзина');
  const dispatch = useDispatch();
  const { data: bucketProducts } = clientEndpoints.useBucketQuery('');

  const collapsedProducts = useCollapse(bucketProducts || []);
  const orderData = useOrder(collapsedProducts);

  const bucketSum = useMemo(() => {
    if (bucketProducts?.length) {
      const copiedArray: IProduct[] = [...bucketProducts];
      return getSumOfProductArray(copiedArray);
    }
    return 0;
  }, [bucketProducts]);

  const [
    postOrder,
    {
      isLoading: isOrderCreating,
      isSuccess: isOrderCreated,
      data: orderProducts,
      reset,
    },
  ] = clientEndpoints.useClientPostOrderMutation();

  const orderCreate = async () => {
    try {
      await postOrder(orderData).unwrap();
      dispatch(bucketActions.clearBucket());
    } catch (error) {
      message.error('При оформлении заказа произошла ошибка...');
    }
  };

  return (
    <motion.div
      className="bucket-page"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageAnimationVariants}
    >
      <Modal
        open={isOrderCreated}
        onCancel={reset}
        footer={
          <Link to={`../profile/orders/${orderProducts?.id}`}>
            <ButtonMelon type="primary">Перейти на страницу оплаты</ButtonMelon>
          </Link>
        }
      >
        {!!orderProducts && <OrderPay order={orderProducts} />}
      </Modal>
      <div className="bucket-page__nav">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/categories">
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
            bucketProducts={bucketProducts || []}
            bucketSum={bucketSum}
            orderCreate={orderCreate}
            isOrderCreating={isOrderCreating}
          />
          {bucketProducts?.length ? <Bucket.ClearBucket /> : ''}
        </div>
      </main>
    </motion.div>
  );
};

export default BucketPage;
