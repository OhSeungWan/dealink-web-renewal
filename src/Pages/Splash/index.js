import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Cookies from 'js-cookie';
import { fetchUserByCode } from 'Store/Slice/userSlice';
import splash from 'assets/img/splash.png';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const width = keyframes`
  from{
    width: 50%
  }
  to{
    width: 100%
  }
`;

const opacity = keyframes`
  from{
    opacity: 0
  }
  to{
    opacity: 1
  }
`;
const SplashWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f7;
`;
const SplashImg = styled.img`
  width: 400px;
  animation: ${width} 2s 0s linear alternate;
`;
const SplashImgWrpper = styled.div`
  max-width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${opacity} 2s 0s linear alternate;
`;
const Splash = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [code, setCode] = useState(
    new URLSearchParams(window.location.search).get('code')
  );

  const initUserInfo = () => {
    if (!code) return; // 인가 코드 없다면 리턴.
    //인가코드가 있다면 fetchUserByCode(code)
    dispatch(fetchUserByCode(code));
  };

  useEffect(() => {
    initUserInfo();
    if (code) {
      setTimeout(() => {
        if (Cookies.get('beforePage')) {
          const beforePage = Cookies.get('beforePage');
          Cookies.remove('beforePage');
          history.push(beforePage);
        } else {
          history.push('/ProductEnrollment');
        }
      }, 3000);
    } else {
      history.push('/ProductEnrollment');
    }
  }, []);
  return (
    <SplashWrapper>
      <SplashImgWrpper>
        <SplashImg src={splash}></SplashImg>
      </SplashImgWrpper>
    </SplashWrapper>
  );
};

export default Splash;
