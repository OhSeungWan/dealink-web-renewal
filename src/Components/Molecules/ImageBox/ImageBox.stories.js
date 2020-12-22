import ImageBox from 'Components/Molecules/ImageBox';
import React from 'react';
import kakaoLogin from 'assets/img/kakaoLogin.png';
export default {
  title: 'Components/Molecules/ImageBox',
  component: ImageBox,
  argTypes: {}
};

const Template = args => <ImageBox {...args} url={kakaoLogin} type="upload" />;

export const Button_type = Template.bind({});
Button_type.args = {
  upload: true
};
