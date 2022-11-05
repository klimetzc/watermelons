import React from 'react';
import { Col, DatePicker, Form, message, Row, Typography } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import { useParams } from 'react-router';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from '../../../shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from '../../../shared/ui/InputPasswordMelon/InputPasswordMelon';
import './PaymentForm.scss';
import { clientEndpoints } from '../../../shared/api/client.endpoints';

const { Title } = Typography;

interface IPaymentForm {
  sum: number;
}

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  return current && current < moment().endOf('day');
};

const PaymentForm: React.FC<IPaymentForm> = ({ sum }) => {
  const params = useParams();
  const validateMessages = {
    required: 'Поле ${label} обязательно',
    types: {
      email: '${label} должен быть валидным',
      password: '${label} должен быть правильным',
    },
  };
  const [setOrderStatus, { isLoading: isSetOrderStatusLoading }] =
    clientEndpoints.useClientSetOrderStatusMutation();
  const onFinish = async () => {
    try {
      await setOrderStatus({
        orderId: params.orderId!,
        status: 'PAYED',
      }).unwrap();
    } catch (error) {
      message.error('При оплате заказа произошла ошибка...');
    }
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
            { pattern: /^[a-zA-Z\s]+$/g, message: 'Только латинские буквы' },
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
              <DatePicker
                picker="month"
                disabledDate={disabledDate}
                placeholder="MM"
                format="MM"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="year" rules={[{ required: true }]} label="Год">
              <DatePicker
                picker="year"
                disabledDate={disabledDate}
                placeholder="YY"
                format="YY"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="cvc"
          label="CVC"
          rules={[
            { required: true },
            { pattern: /^[\d]{3}$/g, message: 'CVC - три цифры' },
          ]}
        >
          <InputPasswordMelon maxLength={3} />
        </Form.Item>
        <Form.Item>
          <ButtonMelon
            type="primary"
            htmlType="submit"
            loading={isSetOrderStatusLoading}
          >
            Оплатить
          </ButtonMelon>
        </Form.Item>
        <p>К оплате: {sum} $</p>
      </Form>
    </div>
  );
};

export default PaymentForm;
