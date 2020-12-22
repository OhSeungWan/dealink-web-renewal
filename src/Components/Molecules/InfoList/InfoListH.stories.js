import InfoList from 'Components/Molecules/InfoList';
import React from 'react';
export default {
  title: 'Components/Molecules/InfoListH',
  component: InfoList,
  argTypes: {}
};

const Template = args => (
  <InfoList {...args} title="infoListTitle" content="Contents"></InfoList>
);

export const flexDirection_type = Template.bind({});
flexDirection_type.args = {
  horizon: true,
  border: true
};
