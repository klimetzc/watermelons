import React from 'react';
import 'antd/dist/antd.css';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import SearchMelon from './SearchMelon';

export default {
  title: 'UI-lib/Search',
  component: SearchMelon,
  argTypes: {
    hasShadow: {
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof SearchMelon>;

const Template: ComponentStory<typeof SearchMelon> = (args) => (
  <SearchMelon {...args} />
);

export const DefaultSearch = Template.bind({});

DefaultSearch.args = {
  placeholder: 'Найди меня',
};

export const ShadowedSearch = Template.bind({});

ShadowedSearch.args = {
  placeholder: 'Найди меня',
  hasShadow: true,
};
