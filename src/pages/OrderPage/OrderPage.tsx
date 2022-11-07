import React, { useState, createContext, useMemo, useEffect } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './OrderPage.scss';
import {
  IOrderProducts,
  ISellerOrderProducts,
} from 'shared/api/types/interfaces';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { sellerEndpoints } from 'shared/api/seller.endpoints';
import { dom } from 'shared/lib';
import OrderPageSummary from './layout/OrderPageSummary/OrderPageSummary';
import OrderPageProducts from './layout/OrderPageProducts/OrderPageProducts';
import OrderPageStages from './layout/OrderPageStages/OrderPageStages';
import OrderPageSteps from './layout/OrderPageSteps/OrderPageSteps';

interface IOrderPageContext {
  isForClient: boolean;
  isForSeller: boolean;
  data: IOrderProducts | ISellerOrderProducts | null | undefined;
  orderStep: number;
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
  const { data: clientData } = clientEndpoints.useClientOrderQuery(
    params.orderId!
  );
  const { data: sellerData } = sellerEndpoints.useSellerOrderQuery(
    params.orderId!
  );

  const [orderStep, setOrderStep] = useState<number>(0);

  useEffect(() => {
    switch (isForClient ? clientData?.status : sellerData?.orderStatus) {
      case 'CREATED':
        setOrderStep(1);
        break;
      case 'PAYED':
        setOrderStep(2);
        break;
      case 'SHIPPED':
        setOrderStep(3);
        break;
      case 'COMPLETED':
        setOrderStep(4);
        break;
      default:
        break;
    }
  }, [sellerData, clientData]);

  const OrderPageProviderValue = useMemo(
    (): IOrderPageContext => ({
      isForClient,
      isForSeller,
      data: isForClient ? clientData : sellerData,
      orderStep,
    }),
    [isForClient, isForSeller, orderStep, clientData, sellerData]
  );

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
