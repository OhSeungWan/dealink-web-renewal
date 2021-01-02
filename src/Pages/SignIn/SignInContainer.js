import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cookies from 'js-cookie';
import SignInPresenter from 'Pages/SignIn/SignInPresenter';
import { fetchUserByCode } from 'Store/Slice/userSlice';
import { useHistory } from 'react-router-dom';

const SignInContainer = () => {
  const userInfo = useSelector(state => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const { Kakao } = window;

  //카카오 로그인
  const SignUp = async () => {
    await Kakao.Auth.authorize({
      redirectUri: 'http://192.168.0.107:3000'
    });
  };

  const initUserInfo = () => {
    // 인가코드
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return; // 인가 코드 없다면 리턴.

    //인가코드가 있다면 fetchUserByCode(code)
    dispatch(fetchUserByCode(code));

    //전에 보던 상품페이지가 있다면 그곳으로
    if (Cookies.get('beforePage')) {
      const beforePage = Cookies.get('beforePage');
      Cookies.remove('beforePage');
      history.push(beforePage);
    } else {
      history.push('/ProductEnrollment');
    }
  };

  useEffect(() => {
    initUserInfo();
  }, []);
  return <SignInPresenter SignUp={SignUp} userInfo={userInfo} />;
};

export default SignInContainer;
