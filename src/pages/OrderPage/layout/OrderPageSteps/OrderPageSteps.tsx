import React, { useContext } from 'react';
import { Steps } from 'antd';
import {
  CheckCircleOutlined,
  CoffeeOutlined,
  CreditCardOutlined,
  MailOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { OrderPageContext } from '../../OrderPage';

const { Step } = Steps;

const OrderPageSteps = () => {
  const pageContext = useContext(OrderPageContext);

  return (
    <Steps current={pageContext.orderStep} direction="horizontal">
      <Step
        title="Создан"
        description={pageContext.data?.created}
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
  );
};

export default OrderPageSteps;
