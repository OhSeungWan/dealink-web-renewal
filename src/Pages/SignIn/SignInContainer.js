import React, { useEffect, useState } from 'react';

import SignInPresenter from 'Pages/SignIn/SignInPresenter';

const SignInContainer = () => {
  const [userInfo, setUserInfo] = useState();
  const { Kakao } = window;
  // TODO: 로그인 api 적용해야함
  const SignUp = async () => {
    // Kakao.Auth.logout();
    Kakao.Auth.login({
      success: function (authOBJ) {
        fetch('http://192.168.0.120:8080/ping', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_token: authOBJ.access_token
          })
        }).then(res => {
          console.log(res);
        });
      }
    });
    // Kakao.API.request({
    //   url: '/v2/user/me'
    // });
    // Kakao.Auth.authorize({
    //   redirectUri: 'http://192.168.0.120:8080/ping'
    // });
    // const fetchData = await fetch(
    //   'http://192.168.0.120:8080/oauth2/authorization/kakao'
    // );
    // if (fetchData.status == 200) {
    //   const data = await fetchData.json();
    //   setUserInfo(data);
    // } else {
    //   setUserInfo({ userInfo: 'failed to SignIn' });
    // }
  };

  return <SignInPresenter SignUp={SignUp} userInfo={userInfo} />;
};

export default SignInContainer;
