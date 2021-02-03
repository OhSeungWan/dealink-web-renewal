import { fireEvent, render, screen, waitFor } from 'lib/Utils/test-utils';

import React from 'react';
import SignIn from 'Pages/SignIn';
import { mount } from 'enzyme';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// test 에서 사용할 서버와 Url을 생성
const server = setupServer(
  rest.get('/Signin', (req, res, ctx) => {
    return res(ctx.json({ userInfo: 'login complete' }));
  })
);

// test 전, 후 처리
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

//카카오톡 로그인 버튼이 렌더링 확인
test('renders SigIn button', () => {
  render(<SignIn />);
  expect(screen.getByRole('button')).toHaveTextContent('카카오톡으로 로그인');
});

test('renders', () => {
  const wrapper = mount(<SignIn />);
  const Header = wrapper.find('Header');

  expext(Header.length).toBe(1);
});

// 카카오톡 로그인 버튼 클릭시 로그인 확인
test('click SignIn Button', async () => {
  render(<SignIn />);
  fireEvent.click(screen.getByText('카카오톡으로 로그인'));
  await waitFor(() => screen.getByRole('alert'));
  expect(screen.getByRole('alert')).toHaveTextContent('login complete');
});

// 카카오톡 로그인 서버에러 처리 확인
test('handles server error', async () => {
  server.use(
    rest.get('/Signin', (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<SignIn />);

  fireEvent.click(screen.getByText('카카오톡으로 로그인'));

  await waitFor(() => screen.getByRole('alert'));

  expect(screen.getByRole('alert')).toHaveTextContent('failed to SignIn');
});
