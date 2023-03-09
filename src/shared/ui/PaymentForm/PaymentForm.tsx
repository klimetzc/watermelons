import React from 'react';
import { Col, DatePicker, Form, FormProps, Row, Typography } from 'antd';
import { RangePickerProps } from 'antd/lib/date-picker';
import moment from 'moment';
import ButtonMelon from 'shared/ui/ButtonMelon/ButtonMelon';
import InputMelon from 'shared/ui/InputMelon/InputMelon';
import InputPasswordMelon from 'shared/ui/InputPasswordMelon/InputPasswordMelon';

interface IPaymentForm extends FormProps {
  submitLoading: boolean;
  sum: number;
}

const PaymentForm: React.FC<IPaymentForm> = ({
  validateMessages,
  onFinish,
  submitLoading,
  sum,
}) => {
  const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    current && current < moment().endOf('day');

  return (
    <Form
      className="payment-form"
      validateMessages={validateMessages}
      onFinish={onFinish}
    >
      <Typography.Title level={3}>Оплата заказа</Typography.Title>
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
        <ButtonMelon type="primary" htmlType="submit" loading={submitLoading}>
          Оплатить
        </ButtonMelon>
      </Form.Item>
      <p>К оплате: {sum} $</p>
    </Form>
  );
};

export default PaymentForm;
