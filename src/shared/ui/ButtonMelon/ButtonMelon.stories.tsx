import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ButtonMelon from './ButtonMelon';

export default {
  title: 'UI-lib/ButtonMelon',
  component: ButtonMelon,
  argTypes: {
    type: {
      options: ['default', 'primary', 'dashed'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof ButtonMelon>;

const Template: ComponentStory<typeof ButtonMelon> = (args) => (
  <ButtonMelon {...args}>Click me!</ButtonMelon>
);

export const PrimaryBTN = Template.bind({});
PrimaryBTN.args = {
  type: 'primary',
};
export const SecondaryBTN = Template.bind({});
SecondaryBTN.args = {
  type: 'default',
};

export const DashedBTN = Template.bind({});
DashedBTN.args = {
  type: 'dashed',
};
