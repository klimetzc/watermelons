import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputNumberMelon from './InputPhoneMelon';

export default {
  title: 'UI-lib/InputPhone',
  component: InputNumberMelon,
} as ComponentMeta<typeof InputNumberMelon>;

const Template: ComponentStory<typeof InputNumberMelon> = (args) => (
  <InputNumberMelon {...args} />
);

export const PhoneInput = Template.bind({});

PhoneInput.args = {
  addonBefore: '+7',
  maxLength: 10,
  type: 'tel',
  controls: false,
};
