import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CheckboxMelon from './CheckboxMelon';

export default {
  title: 'UI-lib/Checkbox',
  component: CheckboxMelon,
} as ComponentMeta<typeof CheckboxMelon>;

const Template: ComponentStory<typeof CheckboxMelon> = (args) => (
  <CheckboxMelon {...args}>I am checkbox!</CheckboxMelon>
);

export const Checkbox = Template.bind({});

Checkbox.args = {
  checked: false,
};

export const CheckboxChecked = Template.bind({});

CheckboxChecked.args = {
  checked: true,
};
