import { Button } from 'Components/Atoms';
import React from 'react';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
};

const Template = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  tertiary: true
};
