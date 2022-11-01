import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { message } from 'antd';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import PaymentForm from 'features/client/paymentForm/PaymentForm';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { sellerEndpoints } from 'shared/api/seller.endpoints';
import { OrderPageContext } from '../../OrderPage';

const OrderPageStages = () => {
  const pageContext = useContext(OrderPageContext);
  const params = useParams();
  const [
    clientUpdateOrderStatus,
    { isLoading: isClientUpdateOrderStatusLoading },
  ] = clientEndpoints.useClientSetOrderStatusMutation();
  const [
    sellerUpdateOrderStatus,
    { isLoading: isSellerUpdateOrderStatusLoading },
  ] = sellerEndpoints.useSellerSetOrderStatusMutation();

  const updateStatus = async () => {
    try {
      await sellerUpdateOrderStatus({
        status: 'SHIPPED',
        orderId: params.orderId!,
      }).unwrap();
    } catch (error) {
      message.error('При изменении статуса заказа произошла ошибка...');
    }
  };

  const setCompleted = async () => {
    try {
      await clientUpdateOrderStatus({
        status: 'COMPLETED',
        orderId: params.orderId!,
      }).unwrap();
    } catch (error) {
      message.error('При изменении статуса заказа произошла ошибка...');
    }
  };

  return (
    <div className="order-page__stage-content">
      {pageContext.orderStep === 1 ? (
        <>
          {pageContext.isForClient ? (
            <div>
              <PaymentForm sum={pageContext.data?.sum || 0} />
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
              loading={
                isClientUpdateOrderStatusLoading ||
                isSellerUpdateOrderStatusLoading
              }
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
              loading={
                isClientUpdateOrderStatusLoading ||
                isSellerUpdateOrderStatusLoading
              }
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
