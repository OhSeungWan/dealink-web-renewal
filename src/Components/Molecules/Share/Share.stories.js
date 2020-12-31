import React from 'react';
import { Share } from 'Components/Molecules';
export default {
  title: 'Components/Molecules/Share',
  component: Share,
  argTypes: {}
};

const Template = args => <Share {...args}></Share>;

export const PageTitle_type = Template.bind({});
PageTitle_type.args = {};
