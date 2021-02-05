import { Container } from 'Components/Atoms/Container';
import Header from 'system/Header/Header';
import ImageBox from 'Components/Molecules/ImageBox';
import React from 'react';
import { ScreenWrapper } from 'Components/Atoms';
import kakaoSignIn from 'assets/img/kakaoSignInBtn.png';
import loginBanner from 'assets/img/loginBanner.png';
import styled from 'styled-components';

const iOS = () => {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform);
  // ||
  // // iPad on iOS 13 detection
  // (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
};

const SignInPresenter = ({ SignUp, guestSignUp }) => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />
        <ImageBox url={loginBanner} />
        <img src={kakaoSignIn} onClick={SignUp} width={'100%'} alt="no"></img>
        {iOS() && (
          <GuestSignInBtn onClick={guestSignUp}>
            휴대폰번호로 시작하기
          </GuestSignInBtn>
        )}
      </Container>
    </ScreenWrapper>
  );
};

const GuestSignInBtn = styled.button`
  margin-top: 0.2rem;
  border: none;
  width: 100%;
  background-color: black;
  color: white;
  height: 15vw;
  max-height: 60px;
  font-size: 20px;
`;
export default SignInPresenter;
