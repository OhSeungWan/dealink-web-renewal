import { Container } from 'Components/Atoms/Container';
import React from 'react';

export default {
  title: 'Components/Atoms/Container',
  component: Container,
  argTypes: {}
};

const Template = args => (
  <Container {...args}>
    <div>child1</div>
    <div>child2</div>
    <div>child3</div>
    <div>child4</div>
    <div>child5</div>
  </Container>
);

export const Container_type = Template.bind({});
Container_type.args = {
  row: true,
  border: '1px solid black'
};
