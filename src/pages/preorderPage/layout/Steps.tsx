import React from 'react';
import { Steps as AntSteps } from 'antd';
import moment from 'moment';

const { Step } = AntSteps;

interface ISteps {
  date: string | number;
}

const Steps: React.FC<ISteps> = ({ date }) => (
  <AntSteps current={0} direction="vertical">
    <Step
      title="Предзаказ создан"
      description={`до ${moment(date).format('YYYY-MM-DD HH:mm')}`}
    />
    <Step
      title="Предзаказ оплатило нужное количество участников"
      description="Можно укомплектовать заказ"
    />
    <Step
      title="Партия товара передана курьерам"
      description="Ожидайте доставки"
    />
    <Step
      title="Предзаказ закрыт"
      description="За новыми поступлениями обращайтесь к продавцу"
    />
  </AntSteps>
);

export default Steps;
