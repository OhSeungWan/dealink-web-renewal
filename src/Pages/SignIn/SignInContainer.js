import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import Cookies from 'js-cookie';
import SignInPresenter from 'Pages/SignIn/SignInPresenter';
import { fetchUserByCode } from 'Store/Slice/userSlice';

const SignInContainer = () => {
  const userInfo = useSelector(state => state.user);
  const location = useLocation();
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

  useEffect(() => {
    if (location.state?.from?.pathname) {
      Cookies.set('beforePage', location.state.from.pathname);
      console.log(Cookies.get('beforePage'));
    }
    console.log(location.state);
  }, []);
  return <SignInPresenter SignUp={SignUp} userInfo={userInfo} />;
};

export default SignInContainer;
