import React from 'react';
import SignIn from 'Pages/SignIn';
export default {
  title: 'Pages/SignIn',
  component: SignIn,
  argTypes: {}
};

const Template = args => <SignIn />;

export const Button_type = Template.bind({});
Button_type.args = {
  upload: true
};
