import ProductInfo from 'Components/Organisms/ProductInfo';
import React from 'react';
export default {
  title: 'Components/Organisms/ProductInfo',
  component: ProductInfo,
  argTypes: {}
};

const Template = args => (
  <ProductInfo {...args} title="PageTitle"></ProductInfo>
);

export const PageTitle_type = Template.bind({});
PageTitle_type.args = {};
