import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUser } from 'Store/Slice/userSlice';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const AuthWrapper = styled.div``;

export const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  //TODO: 리펙토링 // 검증코드로 바꾸어야함

  // state 에서 인증 정보 가져옴 해당 정보로 서버에 다시요청하도록
  // const isAuth = useSelector(state => state.user.id);
  const initUserInfo = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    const id = sessionStorage.getItem('userId');

    // 인증정보가 없다면 리턴 >> 인증정보 없다면 로그인 창으로,,? 리다이렉트,,?
    //TODO: 여기 부분 인증 로직 추가해야함
    if (!userInfo) {
      console.log('로그인 세션 만료..');
      return;
      // history.push('/SignIn');
    }
    dispatch(fetchUser({ accessToken: userInfo, id: id }));
  };

  useEffect(() => {
    initUserInfo();
    setIsLogin(true);
  }, []);

  return <AuthWrapper>{isLogin && children}</AuthWrapper>;
};
