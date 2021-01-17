import React, { useEffect, useState } from 'react';

import { fetchUser } from 'Store/Slice/userSlice';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
`;

export const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(false);
  //TODO: 리펙토링 // 검증코드로 바꾸어야함

  // state 에서 인증 정보 가져옴 해당 정보로 서버에 다시요청하도록
  // const isAuth = useSelector(state => state.user.id);
  const userInfo = sessionStorage.getItem('userInfo');
  const initUserInfo = async () => {
    const auth = await fetch(
      `https://rest.dealink.co.kr/auction/test/history`,
      // `http://192.168.0.102:8080/auction/test/history`,
      {
        headers: { AUTH_TOKEN: userInfo?.accessToken || '' }
      }
    );
    // TODO: 테스트를 위한 코드 반드시 수정해야함
    const isAuth = (await auth.json()) == 'Invalid Access Token' ? false : true;
    const id = sessionStorage.getItem('userId');
    // console.log(`userInfo : ${userInfo} ,isAuth: ${isAuth}`);
    // console.log(`userInfo : ${userInfo}`);

    // 인증정보가 없다면 리턴 >> 인증정보 없다면 로그인 창으로,,? 리다이렉트,,?
    //TODO: 여기 부분 인증 로직 추가해야함
    if (!isAuth || userInfo == 'undefined' || userInfo == null) {
      // history.push('/Signin');
      return;
      // history.push('/SignIn');
    }
    dispatch(
      fetchUser({
        accessToken: 'T1rAqql_ygkHR1kbDTDV7pjjisPtrg6t7gN3gAorDKYAAAF3DrjIMQA',
        id: '1'
      })
    );
  };

  useEffect(() => {
    initUserInfo();
    setIsLogin(true);
  }, []);

  return <AuthWrapper>{isLogin && children}</AuthWrapper>;
};
