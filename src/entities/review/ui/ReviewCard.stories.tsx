import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ReviewCard from './ReviewCard';

export default {
  title: 'Entities/Review-card',
  component: ReviewCard,
} as ComponentMeta<typeof ReviewCard>;

const Template: ComponentStory<typeof ReviewCard> = (args) => (
  <ReviewCard {...args}>I am checkbox!</ReviewCard>
);

export const Review = Template.bind({});
Review.args = {
  data: {
    name: 'John',
    rating: 3.6,
    title: 'Название обзора',
    date: 'Дата создания',
  },
};
