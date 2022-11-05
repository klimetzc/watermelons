import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { message, Typography, Divider } from 'antd';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import PaymentForm from 'features/client/paymentForm/PaymentForm';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { sellerEndpoints } from 'shared/api/seller.endpoints';
import { Marker, Polyline, Popup } from 'react-leaflet';
import Map from 'widgets/Map/Map';
import { markers } from 'shared/ui/LeafletMarkers';
import CenterMap from 'features/common/centerMap/CenterMap';
import { OrderPageContext } from '../../OrderPage';

const { Paragraph } = Typography;

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
      <Map center={[68.970663, 33.074918]} zoom={14}>
        <Marker position={[68.970663, 33.074918]} icon={markers.markerMe}>
          <Popup>Ваш дом.</Popup>
        </Marker>
        <Marker position={[68.964521, 33.072118]} icon={markers.markerOrder}>
          <Popup>Ваша посылка</Popup>
        </Marker>
        <Polyline
          positions={[
            [68.970663, 33.074918],
            [68.964521, 33.072118],
          ]}
        />
        <CenterMap />
      </Map>
      {/* CREATED */}
      {pageContext.orderStep === 1 ? (
        <>
          {pageContext.isForClient ? (
            <div className="order-page__stage-content-info">
              <Divider>Оплата</Divider>
              <PaymentForm sum={pageContext.data?.sum || 0} />
            </div>
          ) : null}
          {pageContext.isForSeller ? (
            <div className="order-page__stage-content-info">
              <Divider>Ожидание оплаты</Divider>
              <Paragraph>
                Как только клиенты оплатит заказ вам придет уведомление и вы
                сможете отправить посылку
              </Paragraph>
            </div>
          ) : null}
        </>
      ) : null}
      {/* PAYED */}
      {pageContext.orderStep === 2 ? (
        <>
          {pageContext.isForClient ? (
            <div className="order-page__stage-content-info">
              <Divider>Ожидает отправки</Divider>
              <Paragraph>
                Пожалуйста, ожидайте отправки товара от поставщика, в среднем
                это занимает до 72 часов...
              </Paragraph>
              <Paragraph>
                Слева на карте вы можете отслеживать геолокацию заказа
              </Paragraph>
            </div>
          ) : null}
          {pageContext.isForSeller ? (
            <div className="order-page__stage-content-info">
              <Divider>Ожидает вашей отправки</Divider>
              <Paragraph>
                Клиент оплатил заказ, теперь вы можете спокойно отправить
                посылку!
              </Paragraph>
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
            </div>
          ) : null}
        </>
      ) : null}
      {/* SHIPPED */}
      {pageContext.orderStep === 3 ? (
        <>
          {pageContext.isForClient ? (
            <div className="order-page__stage-content-info">
              <Divider>Заказ отправлен</Divider>
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
            </div>
          ) : null}
          {pageContext.isForSeller ? (
            <div className="order-page__stage-content-info">
              <Divider>Заказ отправлен</Divider>
              Заказ отправлен к клиенту
            </div>
          ) : null}
        </>
      ) : null}
      {/* COMPLETED */}
      {pageContext.orderStep === 4 ? (
        <>
          {pageContext.isForClient ? (
            <div className="order-page__stage-content-info">
              <Divider>Заказ завершён</Divider>
              <Paragraph>Заказ доставлен, возвращайтесь к нам ещё :)</Paragraph>
            </div>
          ) : null}
          {pageContext.isForSeller ? (
            <div className="order-page__stage-content-info">
              <Divider>Заказ завершён</Divider>
              <Paragraph>Заказ завершён. Клиент доволен</Paragraph>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default OrderPageStages;
