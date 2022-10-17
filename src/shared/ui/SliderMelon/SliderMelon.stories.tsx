import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SliderMelon from './SliderMelon';

export default {
  title: 'UI-lib/Slider',
  component: SliderMelon,
  argTypes: {
    range: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof SliderMelon>;

const Template: ComponentStory<typeof SliderMelon> = (args) => (
  <SliderMelon {...args} />
);

export const SliderDefault = Template.bind({});

SliderDefault.args = {
  min: 100,
  max: 100000,
  step: 100,
  range: true,
  defaultValue: [100, 50000],
};
