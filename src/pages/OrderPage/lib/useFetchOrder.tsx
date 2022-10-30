import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  IOrderProducts,
  ISellerOrderProducts,
} from '../../../shared/api/types/interfaces';
import clientApi from '../../../shared/api/client';
import sellerApi from '../../../shared/api/seller';

interface IUseFetchOrder {
  isForClient: boolean;
  isForSeller: boolean;
  setOrderStep: React.Dispatch<React.SetStateAction<number>>;
  setOrderData: React.Dispatch<
    React.SetStateAction<IOrderProducts | null | undefined>
  >;
  setSellerOrderData: React.Dispatch<
    React.SetStateAction<ISellerOrderProducts | null | undefined>
  >;
}

const useFetchOrder = ({
  isForClient,
  isForSeller,
  setOrderStep,
  setOrderData,
  setSellerOrderData,
}: IUseFetchOrder) => {
  const params = useParams();

  useEffect(() => {
    document.title = `Заказ #${params.orderId}`;
    if (isForClient) {
      clientApi
        .getOrder(params.orderId!)
        .then((res: IOrderProducts) => {
          console.log('order: ', res);
          switch (res.status) {
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
          setOrderData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (isForSeller) {
      sellerApi
        .getOrder(params.orderId!)
        .then((res: ISellerOrderProducts) => {
          switch (res.orderStatus) {
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
          setSellerOrderData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
};

export default useFetchOrder;
