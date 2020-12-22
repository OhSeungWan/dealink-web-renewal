import Header from 'Components/Molecules/Header';
import React from 'react';

export default {
  title: 'Components/Molecules/Header',
  component: Header,
  argTypes: {}
};

const Template = args => <Header {...args} />;

export const Button_type = Template.bind({});
Button_type.args = {};
