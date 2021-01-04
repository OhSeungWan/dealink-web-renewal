import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Cookies from 'js-cookie';
import ProductDetailPresenter from 'Pages/ProductDetail/ProductDetailPresenter';
import { useFetch } from 'Hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailContainer = () => {
  const { url } = useParams();
  const userInfo = useSelector(state => state.user);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hitory = useHistory();
  //getAuction

  //로그인 하지 않은 사용자일 경우
  const userId = userInfo.id || '0';
  const [data, isLoading, error, refetch] = useFetch(
    `  http://192.168.0.120:8080/user/${userId}/auction/${url}`
  );

  const closeModal = () => {
    setIsOpen(false);
    refetch(true);
  };

  const openModal = () => {
    if (sessionStorage.getItem('userInfo')) {
      setIsOpen(true);
    } else {
      alert('로그인 후 사용해주세요');
      Cookies.set('beforePage', location.pathname);
      hitory.push('/SignIn');
    }
  };

  return (
    isLoading && (
      <ProductDetailPresenter
        data={data}
        closeModal={closeModal}
        openModal={openModal}
        isOpen={isOpen}
        userInfo={userInfo}
        days={data.days}
        hours={data.hours}
        minutes={data.minutes}
        seconds={data.seconds}
      />
    )
  );
};

export default ProductDetailContainer;
