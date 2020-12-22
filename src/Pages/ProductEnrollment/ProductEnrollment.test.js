import { fireEvent, render, screen, waitFor } from 'Utils/test-utils';

import ProductEnrollment from 'Pages/ProductEnrollment';
import React from 'react';
import { mount } from 'enzyme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// test 에서 사용할 서버와 Url을 생성

describe('<ProductEnrollment />', () => {
  // snapshot Test
  it('matches snapshot', () => {
    const wrapper = mount(<ProductEnrollment />);
    expect(wrapper).toMatchSnapshot();
  });

  // rendering Test
  it('renders', () => {
    const wrapper = mount(<ProductEnrollment />);
    const Header = wrapper.find('Header');
    const inputForm = wrapper.find('ImageBox');
    const submitButton = wrapper.find('button');
    const input = wrapper.find('input');

    expect(Header.length).toBe(1);
    //inputForm 1개
    expect(inputForm.length).toBe(1);
    //submitButton 1개
    expect(submitButton.length).toBe(1);
    //input 1개
    expect(input.length).toBe(7);
  });
});
