import React, { useState, createContext, useMemo } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './OrderPage.scss';
import useFetchOrder from './lib/useFetchOrder';
import {
  IOrderProducts,
  ISellerOrderProducts,
} from '../../shared/api/types/interfaces';
import { dom } from '../../shared/lib';
import OrderPageSummary from './layout/OrderPageSummary/OrderPageSummary';
import OrderPageProducts from './layout/OrderPageProducts/OrderPageProducts';
import OrderPageStages from './layout/OrderPageStages/OrderPageStages';
import OrderPageSteps from './layout/OrderPageSteps/OrderPageSteps';

interface IOrderPageContext {
  isForClient: boolean;
  isForSeller: boolean;
  orderData: IOrderProducts | null | undefined;
  sellerOrderData: ISellerOrderProducts | null | undefined;
  setSellerOrderData: React.Dispatch<
    React.SetStateAction<ISellerOrderProducts | null | undefined>
  > | null;
  orderStep: number;
  setOrderStep: React.Dispatch<React.SetStateAction<number>> | null;
}

export const OrderPageContext = createContext<IOrderPageContext>(
  {} as IOrderPageContext
);

interface IOrderPage {
  isForClient: boolean;
  isForSeller: boolean;
}

const OrderPage: React.FC<IOrderPage> = ({ isForClient, isForSeller }) => {
  const params = useParams();
  dom.useTitle(`Заказ #${params.orderId}`);
  console.log(isForClient, isForSeller);

  const [orderData, setOrderData] = useState<IOrderProducts | null>();
  const [sellerOrderData, setSellerOrderData] =
    useState<ISellerOrderProducts | null>();
  const [orderStep, setOrderStep] = useState<number>(0);

  const OrderPageProviderValue = useMemo(
    (): IOrderPageContext => ({
      isForClient,
      isForSeller,
      orderData,
      sellerOrderData,
      setSellerOrderData,
      orderStep,
      setOrderStep,
    }),
    [
      isForClient,
      isForSeller,
      orderData,
      sellerOrderData,
      setSellerOrderData,
      orderStep,
      setOrderStep,
    ]
  );

  useFetchOrder({
    isForClient,
    isForSeller,
    setOrderStep,
    setOrderData,
    setSellerOrderData,
  });

  return (
    <OrderPageContext.Provider value={OrderPageProviderValue}>
      <div className="order-page">
        <div className="order-page__nav">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/categories">
                <HomeOutlined />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <>
                {isForClient ? <Link to="/profile">Профиль</Link> : null}
                {isForSeller ? (
                  <Link to="/dashboard">Панель управления</Link>
                ) : null}
              </>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Заказ № {params.orderId}</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className="order-page__order-stage">
          <h2 className="order-page__order-title">Заказ #{params.orderId}</h2>
          <OrderPageSteps />
          <OrderPageStages />
        </div>

        <div className="order-page__products">
          <OrderPageProducts />
          <OrderPageSummary />
        </div>
      </div>
    </OrderPageContext.Provider>
  );
};

export default OrderPage;
