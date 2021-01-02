import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUser } from 'Store/Slice/userSlice';
import styled from 'styled-components';

const AuthWrapper = styled.div``;

export const Auth = ({ children }) => {
  const dispatch = useDispatch();
  //TODO: 리펙토링 // 검증코드로 바꾸어야함
  const isAuth = useSelector(state => state.user.id);
  const initUserInfo = () => {
    const userInfo = sessionStorage.getItem('userInfo');
    const id = sessionStorage.getItem('userId');

    if (!userInfo) return;
    dispatch(fetchUser({ accessToken: userInfo, id: id }));
  };

  useEffect(() => {
    console.log('auth');
    initUserInfo();
  }, [isAuth]);

  return <AuthWrapper>{isAuth && children}</AuthWrapper>;
};
