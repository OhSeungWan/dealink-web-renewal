import { Input } from 'Components/Atoms/Input';
import React from 'react';

export default {
  title: 'Components/Atoms/Input',
  component: Input,
  argTypes: {}
};

const Template = args => <Input />;

export const Input_type = Template.bind({});
Input_type.args = {
  primary: true,
  secondary: false,
  tertiary: false,
  kakao: false
};
