import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';
import OrderCard from './OrderCard';

export default {
  title: 'Entities/Order-card',
  component: OrderCard,
} as ComponentMeta<typeof OrderCard>;

const Template: ComponentStory<typeof OrderCard> = (args) => (
  <BrowserRouter>
    <OrderCard {...args} />
  </BrowserRouter>
);

export const Card = Template.bind({});

Card.args = {
  rootLink: 'profile',
  data: {
    id: 1,
    created: 'Tuesday',
    changed: 'Friday',
    status: 'PAYED',
    sum: 400,
    sellerName: 'Денис Торговец',
  },
};
