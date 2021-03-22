import { Container } from 'Components/Atoms/Container';
import Header from 'domain/Header/Header';
import ImageBox from 'Components/Molecules/ImageBox';
import React from 'react';
// import { ScreenWrapper } from 'Components/Atoms';
import kakaoSignIn from 'assets/img/kakaoSignInBtn.png';
import loginBanner from 'assets/img/loginBanner.png';
import styled from 'styled-components';

const iOS = () => {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      // 'iPhone',
      'iPod'
      // `Mac`
    ].includes(navigator.platform) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
  // iPad on iOS 13 detection
  // (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
};

const SignInPresenter = ({ SignUp, guestSignUp }) => {
  return (
    <ScreenWrapper>
      <Container>
        <Header />

        {/* <ImageBox url={loginBanner} /> */}
        <div
          style={{
            position: 'relative',
            height: '100%',
            width: '100%',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div className="big">
            <div className="bold" style={{ marginRight: 5 }}>
              우리끼리
            </div>{' '}
            <div>이용하는</div>
          </div>
          <div className="big">
            <div style={{ marginRight: 5 }}>우리만의</div>
            <div className="bold">중고거래</div>
          </div>
          <div className="small">(안양창조산업진흥원)</div>

          {/* {!iOS() && (
            <img
              src={kakaoSignIn}
              onClick={SignUp}
              width={'100%'}
              alt="no"
              style={{ position: 'absolute', width: '100%', bottom: '5%' }}
            />
          )} */}
          <img
            src={kakaoSignIn}
            onClick={SignUp}
            width={'100%'}
            alt="no"
            style={{ position: 'absolute', width: '100%', bottom: '5%' }}
          />
          {/* {iOS() && (
            <GuestSignInBtn
              onClick={guestSignUp}
              style={{
                position: 'absolute',
                width: '100%',
                bottom: '5%'
              }}
            >
              휴대폰번호로 시작하기
            </GuestSignInBtn>
          )} */}
        </div>
      </Container>
    </ScreenWrapper>
  );
};

const ScreenWrapper = styled.div`
  .big {
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;
    font-size: 35px;
    .bold {
      font-weight: 700;
    }
  }

  .small {
    color: #969799;
    font-size: 14px;
  }

  display: flex;
  flex: 1;
  justify-content: space-evenly;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 85vh;
  overflow: hidden;
  max-width: 100%;
`;
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
