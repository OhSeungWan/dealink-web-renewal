import React, { useEffect, useState } from 'react';

import SignInPresenter from 'Pages/SignIn/SignInPresenter';

const SignInContainer = () => {
  const [userInfo, setUserInfo] = useState();
  const { Kakao } = window;
  // TODO: 로그인 api 적용해야함
  const SignUp = async () => {
    await Kakao.Auth.authorize({
      redirectUri: 'http://192.168.0.107:3000/ProductEnrollment'
    });
  };

  return <SignInPresenter SignUp={SignUp} userInfo={userInfo} />;
};

export default SignInContainer;
