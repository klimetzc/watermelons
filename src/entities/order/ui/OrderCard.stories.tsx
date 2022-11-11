import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BrowserRouter } from 'react-router-dom';
import { Order } from '..';

export default {
  title: 'Entities/Order-card',
  component: Order.Card,
} as ComponentMeta<typeof Order.Card>;

const Template: ComponentStory<typeof Order.Card> = (args) => (
  <BrowserRouter>
    <Order.Card {...args} />
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
