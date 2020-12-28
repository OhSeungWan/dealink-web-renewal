import List from 'Components/Molecules/List';
import React from 'react';
export default {
  title: 'Components/Molecules/List',
  component: List,
  argTypes: {}
};

const Template = args => (
  <List {...args}>
    <div>item1</div>
    <div>item2</div>
    <div>item3</div>
    <div>item4</div>
  </List>
);

export const ListDirection_type = Template.bind({});
ListDirection_type.args = {
  direction: 'row',
  direction: 'column',
  spaceBetween: false
};
