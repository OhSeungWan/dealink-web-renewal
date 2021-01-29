import { Container } from 'Components/Atoms/Container';
import Header from 'Components/Molecules/Header';
import ImageBox from 'Components/Molecules/ImageBox';
import React from 'react';
import { ScreenWrapper } from 'Components/Atoms';
import kakaoSignIn from 'assets/img/kakaoSignInBtn.png';
import loginBanner from 'assets/img/loginBanner.png';

const SignInPresenter = ({ SignUp }) => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <ImageBox url={loginBanner} />
        <img src={kakaoSignIn} onClick={SignUp} width={'100%'}></img>
      </Container>
    </ScreenWrapper>
  );
};

export default SignInPresenter;
