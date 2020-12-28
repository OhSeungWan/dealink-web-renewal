import React from 'react';
import Timer from 'Components/Molecules/Timer';
export default {
  title: 'Components/Molecules/Timer',
  component: Timer,
  argTypes: {}
};

const Template = args => <Timer {...args} title="PageTitle"></Timer>;

export const PageTitle_type = Template.bind({});
PageTitle_type.args = {
  isSet: false
};
