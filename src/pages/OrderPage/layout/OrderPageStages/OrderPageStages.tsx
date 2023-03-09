import React, { useContext } from 'react';
import { useParams } from 'react-router';
import { message, Typography, Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import { Payment } from 'features/client/payment';
import { clientEndpoints } from 'shared/api/client.endpoints';
import { sellerEndpoints } from 'shared/api/seller.endpoints';
import { Marker, Polyline, Popup } from 'react-leaflet';
import Map from 'widgets/Map/Map';
import { markers } from 'shared/ui/LeafletMarkers';
import CenterMap from 'features/common/centerMap/CenterMap';
import { OrderPageContext } from '../../OrderPage';

const { Paragraph } = Typography;

const OrderPageStages = () => {
  const { t } = useTranslation();
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
      {pageContext.orderStep === 1 ? (
        <>
          {pageContext.isForClient ? (
            <div className="order-page__stage-content-info">
              <Divider>Оплата</Divider>
              <Payment.Form sum={pageContext.data?.sum || 0} />
            </div>
          ) : null}
          {pageContext.isForSeller ? (
            <div className="order-page__stage-content-info">
              <Divider>{t('Processing payment')}</Divider>
              <Paragraph>
                Как только клиент оплатит заказ вам придет уведомление и вы
                сможете отправить посылку
              </Paragraph>
            </div>
          ) : null}
        </>
      ) : null}
      {pageContext.orderStep === 2 ? (
        <>
          {pageContext.isForClient ? (
            <div className="order-page__stage-content-info">
              <Divider>{t('Waiting to be shipped')}</Divider>
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
              <Divider>{t('Waiting to be shipped')}</Divider>
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
                {t('Send')}
              </ButtonMelon>
            </div>
          ) : null}
        </>
      ) : null}
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
              <Divider>{t('Order shipped to customer')}</Divider>
              {t('Order shipped to customer')}
            </div>
          ) : null}
        </>
      ) : null}
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
              <Divider>{t('Order completed')}</Divider>
              <Paragraph>Заказ завершён. Клиент доволен</Paragraph>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default OrderPageStages;
