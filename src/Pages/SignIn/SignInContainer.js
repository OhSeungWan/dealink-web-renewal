import React, { useEffect } from 'react';
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
  // TODO: 리다이렉트 url 변경해야함
  const SignUp = async () => {
    await Kakao.Auth.authorize({
      redirectUri: 'http://www.dealink.co.kr'
      // redirectUri: 'http://192.168.0.107:3000'
    });
  };

  useEffect(() => {}, []);
  return <SignInPresenter SignUp={SignUp} userInfo={userInfo} />;
};

export default SignInContainer;
