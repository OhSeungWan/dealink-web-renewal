import { useHistory, useLocation } from 'react-router-dom';

import { AiOutlineLink } from 'react-icons/ai';
import { BannerTop } from 'Components/Molecules';
import { BiLogIn } from 'react-icons/bi';
import { Button } from 'Components/Atoms';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const HeaderText = styled.div`
  font-weight: 700;
  font-size: 25px;
  text-align: left;
  padding: 15px;
  flex: 1;
  color: black;
`;
const HeaderWrapper = styled.div`
  z-index: ${props => (props.front ? '9999' : '1')};
  position: fixed;
  flex: 1;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  text-align: left;
  height: 5vw;
  max-height: 40px;
  background-color: white;
  padding: 15px 0px 15px 0px;
  justify-content: center;
  align-items: center;
  max-width: 400px;
`;

const HeaderToTalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyLinkWrapper = styled.div``;

const MyLink = ({ type }) => {
  const history = useHistory();

  const goMyLink = () => {
    if (type == 'mylink') {
      history.push('/ProductEnrollment');
    } else {
      history.push('/MyLink');
    }
  };
  return (
    <MyLinkWrapper>
      <Button onClick={goMyLink} secondary>
        {type == 'mylink' ? (
          <>👉 상품 등록하기</>
        ) : (
          <>
            <AiOutlineLink /> 내 링크 보기
          </>
        )}
      </Button>
    </MyLinkWrapper>
  );
};

const SignInLink = () => {
  const history = useHistory();

  const goMyLink = () => {
    history.push('/SignIn');
  };
  return (
    <MyLinkWrapper>
      <Button onClick={goMyLink} secondary>
        <BiLogIn /> 로그인
      </Button>
    </MyLinkWrapper>
  );
};

const Header = ({ banner, front, type }) => {
  const location = useLocation();
  const isLogin = useSelector(state => state.user.isLogin);
  return (
    <HeaderWrapper front={front}>
      <HeaderToTalContainer>
        {banner && <BannerTop></BannerTop>}
        <HeaderContainer>
          <HeaderText> DeaLink</HeaderText>
          {isLogin && <MyLink type={type}></MyLink>}
          {!isLogin && location.pathname != '/SignIn' && <SignInLink />}
        </HeaderContainer>
      </HeaderToTalContainer>
    </HeaderWrapper>
  );
};

export default Header;
