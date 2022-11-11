import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Product } from '..';

import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

export default {
  title: 'Entities/Product-card',
  component: Product.Card,
} as ComponentMeta<typeof Product.Card>;

const Template: ComponentStory<typeof Product.Card> = (args) => (
  <Product.Card {...args} />
);

export const Card = Template.bind({});

Card.args = {
  data: {
    id: 0,
    title: 'Iphone',
    description: 'Крутой телефон',
    price: 1000,
    currency: 'USD',
    rating: 4.5,
    quantityOfBuying: 240,
    checked: true,
    image: null,
    idCategory: 0,
  },
  actions: <ButtonMelon type="primary">Купить!</ButtonMelon>,
};
