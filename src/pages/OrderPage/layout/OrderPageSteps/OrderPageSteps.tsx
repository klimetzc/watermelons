import React, { useContext } from 'react';
import { Steps } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const pageContext = useContext(OrderPageContext);

  return (
    <Steps current={pageContext.orderStep} direction="horizontal">
      <Step
        title={t('Created')}
        description={pageContext.data?.created}
        icon={<UnorderedListOutlined />}
      />
      <Step
        title={t('Processing payment')}
        description={t('Receipt is sent to email')}
        icon={<CreditCardOutlined />}
      />
      <Step
        title={t('Waiting to be shipped')}
        description={t('Ask seller for details')}
        icon={<CoffeeOutlined />}
      />
      <Step
        title={t('Shipped')}
        description={t('Order shipped to customer')}
        icon={<MailOutlined />}
      />
      <Step
        title={t('Completed')}
        description={t('Order completed')}
        icon={<CheckCircleOutlined />}
      />
    </Steps>
  );
};

export default OrderPageSteps;
