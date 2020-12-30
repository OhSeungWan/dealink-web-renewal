import Banner1 from 'assets/img/Banner1.png';
import React from 'react';
import Slider from 'Components/Molecules/Slider';

export default {
  title: 'Components/Molecules/Slider',
  component: Slider,
  argTypes: {}
};

const ImageList = [
  Banner1,
  Banner1,
  Banner1,
  Banner1,
  Banner1,
  Banner1,
  Banner1,
  Banner1,
  Banner1
];

const Template = args => <Slider {...args} ImageList={ImageList}></Slider>;

export const PageTitle_type = Template.bind({});
PageTitle_type.args = {};
