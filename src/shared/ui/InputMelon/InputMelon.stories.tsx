import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import InputMelon from './InputMelon';

export default {
  title: 'UI-lib/Input',
  component: InputMelon,
} as ComponentMeta<typeof InputMelon>;

const Template: ComponentStory<typeof InputMelon> = (args) => (
  <InputMelon {...args} />
);

export const DefaultInput = Template.bind({});
