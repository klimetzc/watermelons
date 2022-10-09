import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputPhoneMelon from './InputPhoneMelon';

export default {
  title: 'UI-lib/InputPhoneMelon',
  component: InputPhoneMelon,
} as ComponentMeta<typeof InputPhoneMelon>;

const Template: ComponentStory<typeof InputPhoneMelon> = (args) => (
  <InputPhoneMelon {...args} />
);

export const PhoneInput = Template.bind({});

PhoneInput.args = {
  addonBefore: '+7',
  maxLength: 10,
  type: 'tel',
  controls: false,
};
