import { CheckButton } from 'Components/Atoms/CheckButton';
import React from 'react';

export default {
  title: 'Components/Atoms/CheckButton',
  component: CheckButton,
  argTypes: { onClick: { action: 'clicked' } }
};

const Template = args => <CheckButton {...args} text="CheckButton" />;

export const Button_type = Template.bind({});
Button_type.args = {
  checked: true
};
