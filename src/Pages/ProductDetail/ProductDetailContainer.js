import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ProductDetailPresenter from 'Pages/ProductDetail/ProductDetailPresenter';
import { useFetch } from 'Hooks/useFetch';
import { useSelector } from 'react-redux';

const setCookie = (name, value, days) => {
  let exdate = new Date();
  exdate.setDate(exdate.getDate() + days);

  let cookie_value =
    escape(value) + (days == null ? '' : `; expires =` + exdate.toUTCString());
  document.cookie = name + `=` + cookie_value;
};
const ProductDetailContainer = () => {
  const { url } = useParams();
  const userInfo = useSelector(state => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  //로그인 하지 않은 사용자일 경우
  const userId =
    userInfo.id != 'undefined' && userInfo.id != 'null' && userInfo.id
      ? userInfo.id
      : '0';
  const [data, isLoading, error, refetch] = useFetch(
    `https://rest.dealink.co.kr/user/${userId}/auction/${url}`
    // `http://192.168.0.102:8080/user/${userId}/auction/${url}`
  );
  const fetchData = () => {
    refetch(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    fetchData();
  };

  const openModal = () => {
    console.log(location.pathname);
    sessionStorage.setItem('before', location.pathname);
    localStorage.setItem('before', location.pathname);
    setCookie('before', location.pathname, 1);
    setIsOpen(true);
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
        fetchData={fetchData}
      />
    )
  );
};

export default ProductDetailContainer;
