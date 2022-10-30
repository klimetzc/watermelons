import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { OrderPageContext } from '../../OrderPage';
import ButtonMelon from '../../../../shared/ui/ButtonMelon/ButtonMelon';
import PaymentForm from '../../../../features/client/paymentForm/PaymentForm';
import clientApi from '../../../../shared/api/client';
import sellerApi from '../../../../shared/api/seller';

const OrderPageStages = () => {
  const pageContext = useContext(OrderPageContext);
  const params = useParams();
  const updateStatus = () => {
    sellerApi
      .setOrderStatus('SHIPPED', params.orderId!)
      .then((res) => {
        pageContext.setSellerOrderData!(res);
        pageContext.setOrderStep!(3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setCompleted = () => {
    clientApi
      .setOrderStatus('COMPLETED', params.orderId!)
      .then(() => {
        pageContext.setOrderStep!(4);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="order-page__stage-content">
      {pageContext.orderStep === 1 ? (
        <>
          {pageContext.isForClient ? (
            <div>
              <PaymentForm
                setOrderStep={pageContext.setOrderStep}
                sum={pageContext.orderData?.sum || 0}
              />
            </div>
          ) : null}
          {pageContext.isForSeller ? (
            <div>Заказ ожидает оплаты от клиента...</div>
          ) : null}
        </>
      ) : null}

      {pageContext.orderStep === 2 ? (
        <>
          {pageContext.isForClient
            ? 'Пожалуйста, ожидайте отправки товара от поставщика, в среднем это занимает до 72 часов...'
            : null}
          {pageContext.isForSeller ? (
            <ButtonMelon
              onClick={() => {
                updateStatus();
              }}
            >
              Отправить
            </ButtonMelon>
          ) : null}
        </>
      ) : null}

      {pageContext.orderStep === 3 ? (
        <>
          {pageContext.isForClient ? (
            <ButtonMelon
              onClick={() => {
                setCompleted();
              }}
            >
              Подтвердить получение
            </ButtonMelon>
          ) : null}
          {pageContext.isForSeller ? 'Заказ отправлен к клиенту' : null}
        </>
      ) : null}

      {pageContext.orderStep === 4 ? (
        <>
          {pageContext.isForClient
            ? 'Заказ доставлен, возвращайтесь к нам ещё :)'
            : null}
          {pageContext.isForSeller ? (
            <div>Заказ завершён. Клиент доволен </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default OrderPageStages;
