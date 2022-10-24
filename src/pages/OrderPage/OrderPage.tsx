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

interface IOrderPage {
  isForClient: boolean;
  isForSeller: boolean;
}

const OrderPage: React.FC<IOrderPage> = ({
  isForClient = false,
  isForSeller = false,
}) => {
  const params = useParams();
  console.log(isForClient, isForSeller);

  const [orderData, setOrderData] = useState<IOrderProducts | null>();
  const [orderStep, setOrderStep] = useState<number>(0);

  useEffect(() => {
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
            <Link to="/profile">Профиль</Link>
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
            title="Оправлен"
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
            <div>
              <ButtonMelon>Оплатить</ButtonMelon>
            </div>
          ) : null}
          {orderStep === 2 ? (
            <p>
              Пожалуйста, ожидайте отправки товара от поставщика, в среднем это
              занимает до 72 часов...
            </p>
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
            <List.Item>
              <div className="order-page__product-card">
                <div className="order-page__product-card-img" />
                <p>title</p>
                <p>12 шт.</p>
                <p>590$</p>
              </div>
            </List.Item>
            <List.Item>
              <div className="order-page__product-card">
                <div className="order-page__product-card-img" />
                <p>fridge</p>
                <p>42 шт.</p>
                <p>666$</p>
              </div>
            </List.Item>
          </List>
        </div>
        <div className="order-page__summary">
          <List>
            <List.Item extra={orderData?.id || 'ID Не обнаружен'}>
              <p className="order-page__summary-paragraph">
                Идентификатор заказа:
              </p>
            </List.Item>
            <List.Item
              extra={
                `${new Date(orderData?.created!).getFullYear()}-${
                  new Date(orderData?.created!).getMonth() + 1
                }-${new Date(orderData?.created!).getDate()} ${new Date(
                  orderData?.created!
                ).getHours()}:${new Date(
                  orderData?.created!
                ).getMinutes()}:${new Date(
                  orderData?.created!
                ).getSeconds()}` || 'Без имени'
              }
            >
              <p className="order-page__summary-paragraph">Создан</p>
            </List.Item>
            <List.Item extra={orderData?.sellerName || 'Без имени'}>
              <p className="order-page__summary-paragraph">Продавец</p>
            </List.Item>
          </List>

          <p className="order-page__summary-price">
            Сумма заказа:{' '}
            {orderData?.orderItemDtoList.reduce(
              (acc: number, item: IOrderProduct) => {
                const currentSum = acc + item.price * item.amount;
                return currentSum;
              },
              0
            )}{' '}
            $
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
