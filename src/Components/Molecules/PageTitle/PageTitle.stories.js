import PageTitle from 'Components/Molecules/PageTitle';
import React from 'react';
export default {
  title: 'Components/Molecules/PageTitle',
  component: PageTitle,
  argTypes: {}
};

const Template = args => <PageTitle {...args} title="PageTitle"></PageTitle>;

export const PageTitle_type = Template.bind({});
PageTitle_type.args = {};
