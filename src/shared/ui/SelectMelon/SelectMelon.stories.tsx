import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from 'antd';

import SelectMelon from './SelectMelon';

const { Option } = Select;

export default {
  title: 'UI-lib/Select',
  component: SelectMelon,
  // argTypes: {
  //   type: {
  //     options: ['default', 'primary', 'dashed'],
  //     control: { type: 'select' },
  //   },
  // },
} as ComponentMeta<typeof SelectMelon>;

const Template: ComponentStory<typeof SelectMelon> = (args) => (
  <SelectMelon {...args}>
    <Option>Первый</Option>
    <Option>Второй</Option>
  </SelectMelon>
);

export const DefaultSelect = Template.bind({});

DefaultSelect.args = {
  placeholder: 'Выбери меня',
};
