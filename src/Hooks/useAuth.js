import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { fetchUser } from 'Store/Slice/userSlice';
import { useHistory } from 'react-router-dom';

// TODO: 전부 리펙토링 해야함
export const useAuth = type => {
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch();

  const [auth, setAuth] = useState(isLogin);

  // 로그인 유무 검사
  const certificate = async () => {
    // 세션 스토리지에서 엑세스 토큰 정보 가져옴
    // const accessToken = sessionStorage.getItem('accessToken');
    // // 엑세스 토큰 유효성 검사
    // const isAuth = await accessTokenValidate(accessToken);
    // if (isAuth) {
    //   const accessToken = sessionStorage.getItem('accessToken');
    //   const id = sessionStorage.getItem('userId');
    //   dispatch(fetchUser(accessToken));
    // }
    // setAuth(isAuth);
    // return isAuth;
  };

  useEffect(() => {
    certificate();
  }, []);

  return [auth];
};
