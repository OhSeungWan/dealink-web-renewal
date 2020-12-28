import { Button } from 'Components/Atoms/Button';
import { Container } from 'Components/Atoms/Container';
import Header from 'Components/Molecules/Header';
import ImageBox from 'Components/Molecules/ImageBox';
import React from 'react';
import { ScreenWrapper } from 'Components/Atoms';
import kakaoLogin from 'assets/img/kakaoLogin.png';

const SignInPresenter = ({ SignUp, userInfo }) => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <ImageBox url={kakaoLogin} />
        <Button onClick={SignUp} kakao>
          카카오톡으로 로그인
        </Button>
        {userInfo && <p role="alert">{userInfo.userInfo}</p>}
        <a href="http://192.168.0.120:8080/oauth2/authorization/kakao">
          asdfasdf
        </a>
      </Container>
    </ScreenWrapper>
  );
};

export default SignInPresenter;
