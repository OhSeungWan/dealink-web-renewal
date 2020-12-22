import { PageWrapper } from 'Components/Atoms/PageWrapper';
import React from 'react';

export default {
  title: 'Components/Atoms/PageWrapper',
  component: PageWrapper,
  argTypes: {}
};

const Template = args => (
  <PageWrapper {...args}>This is PageWrapper </PageWrapper>
);

export const Input_type = Template.bind({});
Input_type.args = {
  primary: true,
  secondary: false,
  tertiary: false,
  kakao: false
};
