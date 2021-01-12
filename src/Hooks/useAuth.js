import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchUser } from 'Store/Slice/userSlice';
import { useHistory } from 'react-router-dom';

// TODO: 전부 리펙토링 해야함
export const useAuth = type => {
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch();

  const [auth, setAuth] = useState(isLogin);
  const [complete, setComplete] = useState(false);

  // 로그인 유무 검사
  const certificate = async () => {
    // 세션 스토리지에서 엑세스 토큰 정보 가져옴
    const accessToken = sessionStorage.getItem('accessToken');
    console.log(`accessToken : ${accessToken}`);
    // 엑세스 토큰 유효성 검사
    setComplete(false);
    const isAuth = await accessTokenValidate(accessToken);
    console.log(`isAuth : ${isAuth}`);
    if (isAuth) {
      const accessToken = sessionStorage.getItem('accessToken');
      const id = sessionStorage.getItem('userId');
      dispatch(fetchUser({ id: id, accessToken: accessToken }));
    }
    setAuth(isAuth);
    setComplete(true);

    return isAuth;
  };

  // 엑세스 토큰 유효성 검사
  const accessTokenValidate = async token => {
    console.log(token);
    //토큰 유효성 검사 로직 필요
    const res = await fetch(`https://rest.dealink.co.kr//user/1/sale`, {
      headers: { AUTH_TOKEN: token }
    });
    const effectiveness = await res.json();

    console.log(`effectiveness ${effectiveness}`);
    console.log(effectiveness);

    const validationResult =
      effectiveness.message == 'Invalid Access Token' ? false : true;

    return validationResult;
  };

  useEffect(() => {
    console.log('로그인 인증..');
    certificate();
  }, []);

  return [auth, certificate, complete];
};
