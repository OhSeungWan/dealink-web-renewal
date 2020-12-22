import React from 'react';
import { Text } from 'Components/Atoms/Text';

export default {
  title: 'Components/Atoms/Text',
  component: Text,
  argTypes: {}
};

const Template = args => <Text {...args}>This is Text </Text>;

export const Text_type = Template.bind({});
Text_type.args = {
  primary: true,
  secondary: false,
  tertiary: false,
  kakao: false
};
