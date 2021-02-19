import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import SignInPresenter from 'Pages/SignIn/SignInPresenter';
import { fetchUserByCode } from 'Store/Slice/userSlice';
import { useDispatch } from 'react-redux';

const SignInContainer = () => {
  const { Kakao } = window;
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  //인가코드
  const code = new URLSearchParams(window.location.search).get('code');

  const signIn = async () => {
    return dispatch(fetchUserByCode(code));
  };

  const initUserInfo = async before => {
    if (!code) return; // 인가 코드 없다면 리턴.
    console.log('1');
    await signIn();
    console.log('done');

    if (before && before !== 'undefined') {
      console.log(before);
      history.push(before);
      localStorage.removeItem('before');
    } else {
      history.push('/');
    }
  };

  //카카오 로그인
  // TODO: 리다이렉트 url 변경해야함
  const SignUp = async () => {
    await Kakao.Auth.authorize({
      redirectUri: 'https://www.dealink.co.kr/SignIn'
      // redirectUri: 'http://192.168.0.107:3000/SignIn'
    });
  };

  const guestSignUp = async () => {
    history.push('/guestSignIn');
  };

  useEffect(() => {
    if (location.state?.from) {
      console.log(location.state.from.pathname);
      localStorage.setItem('before', location.state.from.pathname);
    }
    initUserInfo(localStorage.getItem('before'));
  }, []);

  return <SignInPresenter SignUp={SignUp} guestSignUp={guestSignUp} />;
};

export default SignInContainer;
