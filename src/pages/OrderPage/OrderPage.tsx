/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import {
  CheckCircleOutlined,
  CoffeeOutlined,
  CreditCardOutlined,
  HomeOutlined,
  MailOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Breadcrumb, List, Steps } from 'antd';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './OrderPage.scss';
import clientApi from '../../shared/api/client';
import ButtonMelon from '../../shared/ui/ButtonMelon/ButtonMelon';
import sellerApi from '../../shared/api/seller';
import PaymentForm from '../../features/client/paymentForm/PaymentForm';
// import { ISellerOrder } from '../../shared/api/types/interfaces';

const { Step } = Steps;

interface IOrderProduct {
  productId: number;
  amount: number;
  price: number;
  productTitle: string;
}

interface IOrderProducts {
  id: number;
  created: string;
  changed: string;
  status: string;
  sum: number;
  sellerName: string;
  orderItemDtoList: IOrderProduct[];
}

interface ISellerOrderProducts {
  id: number;
  address: string;
  created: string;
  changed: string;
  clientName: string;
  orderStatus: string;
  sum: number;
  sellerName: string;
  orderItemDtoList: IOrderProduct[];
}

interface IOrderPage {
  isForClient: boolean;
  isForSeller: boolean;
}

const OrderPage: React.FC<IOrderPage> = ({ isForClient, isForSeller }) => {
  const params = useParams();
  console.log(isForClient, isForSeller);

  const [orderData, setOrderData] = useState<IOrderProducts | null>();
  const [sellerOrderData, setSellerOrderData] =
    useState<ISellerOrderProducts | null>();
  const [orderStep, setOrderStep] = useState<number>(0);

  const updateStatus = () => {
    sellerApi
      .setOrderStatus('SHIPPED', params.orderId!)
      .then((res) => {
        setSellerOrderData(res);
        setOrderStep(3);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setCompleted = () => {
    clientApi
      .setOrderStatus('COMPLETED', params.orderId!)
      .then(() => {
        setOrderStep(4);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return (
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
        <Steps current={orderStep} direction="horizontal">
          <Step
            title="Создан"
            description={orderData?.created}
            icon={<UnorderedListOutlined />}
          />
          <Step
            title="Ожидает оплаты..."
            description="Чек придёт на почту"
            icon={<CreditCardOutlined />}
          />
          <Step
            title="Ожидает отправки"
            description="Подробнее можно спросить у поставщика"
            icon={<CoffeeOutlined />}
          />
          <Step
            title="Отправлен"
            description="Заказ отправляется"
            icon={<MailOutlined />}
          />
          <Step
            title="Завершён"
            description="Заказ завершён и ожидает получения"
            icon={<CheckCircleOutlined />}
          />
        </Steps>

        <div className="order-page__stage-content">
          {orderStep === 1 ? (
            <>
              {isForClient ? (
                <div>
                  <PaymentForm
                    setOrderStep={setOrderStep}
                    sum={orderData?.sum || 0}
                  />
                </div>
              ) : null}
              {isForSeller ? (
                <div>Заказ ожидает оплаты от клиента...</div>
              ) : null}
            </>
          ) : null}

          {orderStep === 2 ? (
            <>
              {isForClient
                ? 'Пожалуйста, ожидайте отправки товара от поставщика, в среднем это занимает до 72 часов...'
                : null}
              {isForSeller ? (
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

          {orderStep === 3 ? (
            <>
              {isForClient ? (
                <ButtonMelon
                  onClick={() => {
                    setCompleted();
                  }}
                >
                  Подтвердить получение
                </ButtonMelon>
              ) : null}
              {isForSeller ? 'Заказ отправлен к клиенту' : null}
            </>
          ) : null}

          {orderStep === 4 ? (
            <>
              {isForClient
                ? 'Заказ доставлен, возвращайтесь к нам ещё :)'
                : null}
              {isForSeller ? <div>Заказ завершён. Клиент доволен </div> : null}
            </>
          ) : null}
        </div>
      </div>

      <div className="order-page__products">
        <div className="order-page__products-list">
          <List>
            {orderData?.orderItemDtoList.map((item: IOrderProduct) => (
              <List.Item key={item.productId}>
                <div className="order-page__product-card">
                  <div className="order-page__product-card-img" />
                  <p>{item.productTitle}</p>
                  <p>{item.amount} шт.</p>
                  <p>{item.price}$</p>
                </div>
              </List.Item>
            ))}
            {sellerOrderData?.orderItemDtoList.map((item: IOrderProduct) => (
              <List.Item key={item.productId}>
                <div className="order-page__product-card">
                  <div className="order-page__product-card-img" />
                  <p>{item.productTitle}</p>
                  <p>{item.amount} шт.</p>
                  <p>{item.price}$</p>
                </div>
              </List.Item>
            ))}
          </List>
        </div>
        <div className="order-page__summary">
          <List>
            <List.Item
              extra={orderData?.id || sellerOrderData?.id || 'ID не обнаружен'}
            >
              <p className="order-page__summary-paragraph">
                Идентификатор заказа:
              </p>
            </List.Item>
            <List.Item
              extra={
                isForClient
                  ? `${new Date(orderData?.created!).getFullYear()}-${
                      new Date(orderData?.created!).getMonth() + 1
                    }-${new Date(orderData?.created!).getDate()} ${new Date(
                      orderData?.created!
                    ).getHours()}:${new Date(
                      orderData?.created!
                    ).getMinutes()}:${new Date(
                      orderData?.created!
                    ).getSeconds()}`
                  : `${new Date(sellerOrderData?.created!).getFullYear()}-${
                      new Date(sellerOrderData?.created!).getMonth() + 1
                    }-${new Date(
                      sellerOrderData?.created!
                    ).getDate()} ${new Date(
                      sellerOrderData?.created!
                    ).getHours()}:${new Date(
                      sellerOrderData?.created!
                    ).getMinutes()}:${new Date(
                      sellerOrderData?.created!
                    ).getSeconds()}`
              }
            >
              <p className="order-page__summary-paragraph">Создан</p>
            </List.Item>
            <List.Item
              extra={
                isForClient
                  ? orderData?.sellerName || 'Без имени'
                  : sellerOrderData?.clientName || 'Без имени'
              }
            >
              <p className="order-page__summary-paragraph">
                {isForClient ? 'Продавец' : 'Покупатель'}
              </p>
            </List.Item>
          </List>

          <p className="order-page__summary-price">
            Сумма заказа:{' '}
            {isForClient ? orderData?.sum || 0 : sellerOrderData?.sum || 0} $
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
