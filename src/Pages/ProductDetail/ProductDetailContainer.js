import React, { useState } from 'react';
import { getCookie, setCookie } from 'lib/Cookies';
import { useLocation, useParams } from 'react-router-dom';

import ProductDetailPresenter from 'Pages/ProductDetail/ProductDetailPresenter';
import { REQUEST_URL } from 'Constants/server';
import { useFetch } from 'Hooks/useFetch';
import { useSelector } from 'react-redux';

const ProductDetailContainer = () => {
  const [firstTime, setFirstTime] = useState(true);
  const [isSee, setIsSee] = useState(getCookie('isSee'));
  const isLogin = useSelector(state => state.user.isLogin);
  const closeFirstModal = () => {
    setFirstTime(false);
  };

  const doNotSeeToday = () => {
    setIsSee(true);
    setCookie('isSee', 'true', 1);
  };
  const { url } = useParams();
  const userInfo = sessionStorage.getItem('userId');
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  //로그인 하지 않은 사용자일 경우
  const userId =
    userInfo !== 'undefined' && userInfo !== 'null' && userInfo
      ? userInfo
      : '0';

  const [data, isLoading, refetch] = useFetch(
    `${REQUEST_URL}user/${userId}/auction/${url}`
  );

  const fetchData = () => {
    refetch(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    fetchData();
  };

  const openModal = () => {
    if (!isLogin) {
      sessionStorage.setItem('before', location.pathname);
      localStorage.setItem('before', location.pathname);
      setCookie('before', location.pathname, 1);
    }
    setIsOpen(true);
  };

  return (
    isLoading && (
      <ProductDetailPresenter
        auctionItemdata={data}
        closeModal={closeModal}
        openModal={openModal}
        isOpen={isOpen}
        userInfo={userInfo}
        fetchData={fetchData}
        firstTime={firstTime}
        closeFirstModal={closeFirstModal}
        isSee={isSee}
        doNotSeeToday={doNotSeeToday}
      />
    )
  );
};

export default ProductDetailContainer;
