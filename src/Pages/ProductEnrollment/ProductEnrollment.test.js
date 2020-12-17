import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen, waitFor } from 'Utils/test-utils';

import ProductEnrollment from 'Pages/ProductEnrollment';
import React from 'react';
import { mount } from 'enzyme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// test 에서 사용할 서버와 Url을 생성

describe('<Profile />', () => {
  // snapshot Test
  it('matches snapshot', () => {
    const wrapper = mount(<ProductEnrollment />);
    expect(wrapper).toMatchSnapshot();
  });

  // rendering Test
  it('renders', () => {
    const wrapper = mount(<ProductEnrollment />);
    const inputForm = wrapper.find('form');
    const submitButton = wrapper.find('button');
    const input = wrapper.find('input');

    expect(inputForm.length).toBe(1);
    expect(submitButton.length).toBe(1);
    expect(input.length).toBe(7);
  });
});
