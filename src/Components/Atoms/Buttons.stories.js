import { Button } from 'Components/Atoms/Button';
import React from 'react';

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: { onClick: { action: 'clicked' } }
};

const Template = args => <Button {...args}>Button</Button>;

export const Button_type = Template.bind({});
Button_type.args = {
  primary: true,
  secondary: false,
  tertiary: false,
  kakao: false,
  common: true
};
