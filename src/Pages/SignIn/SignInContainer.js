import React, { useEffect, useState } from 'react';

import SignInPresenter from 'Pages/SignIn/SignInPresenter';

const SignInContainer = () => {
  const [userInfo, setUserInfo] = useState();

  const SignUp = async () => {
    const fetchData = await fetch('/Signin');
    if (fetchData.status == 200) {
      const data = await fetchData.json();
      setUserInfo(data);
    } else {
      setUserInfo({ userInfo: 'failed to SignIn' });
    }
  };

  return <SignInPresenter SignUp={SignUp} userInfo={userInfo} />;
};

export default SignInContainer;
