import { Button } from 'Components/Atoms/Button';
import { Container } from 'Components/Atoms/Container';
import Header from 'Components/Molecules/Header';
import ImageBox from 'Components/Molecules/ImageBox';
import React from 'react';
import { ScreenWrapper } from 'Components/Atoms';
import kakaoLogin from 'assets/img/kakaoLogin.png';
import kakaoSignIn from 'assets/img/kakaoSignIn.png';

const SignInPresenter = ({ SignUp, userInfo }) => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <ImageBox url={kakaoLogin} />
        <img src={kakaoSignIn} onClick={SignUp} width={'100%'}></img>
      </Container>
    </ScreenWrapper>
  );
};

export default SignInPresenter;
