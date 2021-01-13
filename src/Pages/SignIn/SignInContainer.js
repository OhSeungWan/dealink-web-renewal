import React, { useEffect, useState } from 'react';
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
  const [code, setCode] = useState(
    new URLSearchParams(window.location.search).get('code')
  );
  const initUserInfo = () => {
    if (!code) return; // 인가 코드 없다면 리턴.
    //인가코드가 있다면 fetchUserByCode(code)
    dispatch(fetchUserByCode(code));
  };

  //카카오 로그인
  // TODO: 리다이렉트 url 변경해야함
  const SignUp = async () => {
    await Kakao.Auth.authorize({
      redirectUri: 'http://www.dealink.co.kr/SignIn'
      // redirectUri: 'http://192.168.0.107:3000'
    });
  };

  useEffect(() => {
    initUserInfo();
    if (location.state?.from?.pathname) {
      Cookies.set('beforePage', location.state.from.pathname);
      console.log(location.state.from.pathname);
    }
    if (code) {
      if (Cookies.get('beforePage')) {
        console.log(Cookies.get('beforePage'));
        const beforePage = Cookies.get('beforePage');
        Cookies.remove('beforePage');
        history.push(beforePage);
      } else {
        history.push('/ProductEnrollment');
      }
    } else if (userInfo.accessToken) {
      history.push('/ProductEnrollment');
    }
  }, []);
  return <SignInPresenter SignUp={SignUp} userInfo={userInfo} />;
};

export default SignInContainer;
