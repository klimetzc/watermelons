import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductCard from './ProductCard';
import ButtonMelon from '../../../shared/ui/ButtonMelon/ButtonMelon';

export default {
  title: 'Entities/Product-card',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard {...args} />
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
