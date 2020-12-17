import { Button, Container } from 'Components/Atoms';

import React from 'react';

const SignInPresenter = ({ SignUp, userInfo }) => {
  return (
    <Container>
      <Button onClick={SignUp} kakao>
        카카오톡으로 로그인
      </Button>
      {userInfo && <p role="alert">{userInfo.userInfo}</p>}
    </Container>
  );
};

export default SignInPresenter;
