/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Col, DatePicker, Form, Row, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router';
import clientApi from '../../../shared/api/client';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from '../../../shared/ui/InputPasswordMelon/InputPasswordMelon';
import './PaymentForm.scss';

const { Title } = Typography;

interface IPaymentForm {
  setOrderStep: React.Dispatch<React.SetStateAction<number>>;
  sum: number;
}

const PaymentForm: React.FC<IPaymentForm> = ({ setOrderStep, sum }) => {
  const params = useParams();
  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} должен быть валидным',
      password: '${label} должен быть правильным',
    },
  };

  const onFinish = () => {
    clientApi
      .setOrderStatus('PAYED', params.orderId!)
      .then(() => {
        setOrderStep(2);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Form
        className="payment-form"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Title level={3}>Оплата заказа</Title>
        <Form.Item
          name="name"
          rules={[
            { required: true },
            { pattern: /[a-zA-Z\s]+/g, message: 'Только латинские буквы' },
          ]}
          label="Имя на карте (латиница)"
        >
          <InputMelon placeholder="Ivan Ivanov" />
        </Form.Item>
        <Form.Item
          label="Номер карты"
          name="card-number"
          rules={[
            { required: true },
            { pattern: /^[\d]{16}$/g, message: 'Номер карты - 16 цифр' },
          ]}
        >
          <InputMelon
            placeholder="1234 1234 1234 1234"
            maxLength={16}
            type="number"
          />
        </Form.Item>
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name="month" rules={[{ required: true }]} label="Месяц">
              <DatePicker picker="month" placeholder="MM" format="MM" />
            </Form.Item>
          </Col>
          <Form.Item name="year" rules={[{ required: true }]} label="Год">
            <DatePicker picker="year" placeholder="YY" format="YY" />
          </Form.Item>
          <Col span={12} />
        </Row>
        <Form.Item name="cvc" label="CVC" rules={[{ required: true }]}>
          <InputPasswordMelon maxLength={3} />
        </Form.Item>
        <Form.Item>
          <ButtonMelon type="primary" htmlType="submit">
            Оплатить
          </ButtonMelon>
        </Form.Item>
        <p>К оплате: {sum} $</p>
      </Form>
    </div>
  );
};

export default PaymentForm;
