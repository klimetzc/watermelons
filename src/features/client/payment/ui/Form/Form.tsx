import React from 'react';
import { message } from 'antd';
import { useParams } from 'react-router';
import { clientEndpoints } from 'shared/api/client.endpoints';
import './Form.scss';
import PaymentForm from 'shared/ui/PaymentForm/PaymentForm';

interface IPaymentForm {
  sum: number;
}

export const Form: React.FC<IPaymentForm> = ({ sum }) => {
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
      <PaymentForm
        validateMessages={validateMessages}
        onFinish={onFinish}
        submitLoading={isSetOrderStatusLoading}
        sum={sum}
      />
    </div>
  );
};
